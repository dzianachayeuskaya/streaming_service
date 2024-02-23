import { TrackPopup } from '../components/tracks/TrackPopup';
import { TrackComponent } from '../components/tracks/TrackComponent';
import { ActionsEnum } from '../types/Enums/ActionsEnum';
import { ITrack, ITrackFromApi } from '../types/Interfaces/ITrack';
import { Presenter } from '../types/Presenter';
import { TracksSection } from '../components/tracks/TracksSection';
import { PlaylistsModel } from '../model/PlaylistsModel';
import { PlaylistPopup } from '../components/playlistPopup/PlaylistPopup';
import { FooterPlayerComponent } from '../components/FooterPlayerComponent';
import { convertSongDataForTrackComponent } from '../../core/conversion';
import { Header } from '../components/header/Header';
import { WAIT_TIME_MS } from '../../core/constants';

export class TracksListPresenter extends Presenter {
  private trackComponents: TrackComponent[] = [];
  private view: TracksSection;

  constructor(
    private model: PlaylistsModel,
    private header: Header,
    private plId: string | null,
    private songList: ITrackFromApi[],
    private footerPlayer: FooterPlayerComponent
  ) {
    super();
    let playlistName: string;
    if (plId) {
      const playlist = this.model.getPlaylist(plId);
      playlistName = playlist ? playlist.name : 'Треки';
    } else playlistName = 'Треки';

    this.view = new TracksSection(
      this.getTrackComponentList(
        songList.map((track) => convertSongDataForTrackComponent(track))
      ),
      playlistName
    );

    this.activate();
  }

  protected activate() {
    this.header.input.addEventListener('input', this.onInput);
  }

  protected deactivate() {
    this.header.input.removeEventListener('input', this.onInput);
  }

  protected onInput = () => {
    if (this.timeout) clearTimeout(this.timeout);

    this.timeout = setTimeout(async () => {
      this.model
        .getConvertedPlSongsFromApi(this.plId, this.header.input.value)
        .then((result) => {
          this.renderEl(result);
        });
    }, WAIT_TIME_MS);
  };

  private async addUserListener(eventType: ActionsEnum, trackId: number) {
    switch (eventType) {
      case ActionsEnum.Delete:
        if (!this.plId) {
          alert('Вы не можете удалять треки из секции "Треки"');
          return;
        }
        const updatedList = await this.model.deleteTrackAndGetUpdatedList(
          this.plId,
          trackId
        );
        if (updatedList) this.renderEl(updatedList);
        break;
      case ActionsEnum.Add:
        this.openPlaylistModal(trackId);
        break;
    }
  }

  private addAndRemoveListenersInPlaylistModal(
    plPopup: PlaylistPopup,
    id: number
  ) {
    plPopup.plElements.forEach((item) => {
      const targetPlaylistId = item.getAttribute('data-id');
      if (targetPlaylistId) {
        const plClick = (id: number) => () => {
          this.model.addTrack(id, targetPlaylistId);
          removeListenerAndClosePopup();
        };

        const onPlaylistClick = plClick(id);

        item.addEventListener('click', onPlaylistClick);

        const removeListenerAndClosePopup = () => {
          plPopup.closePopup();
          plPopup.plElements.forEach((item) => {
            item.removeEventListener('click', onPlaylistClick);
          });
          plPopup.closeBtn.removeEventListener(
            'click',
            removeListenerAndClosePopup
          );
          window.removeEventListener('click', onWindowClick);
        };

        const onWindowClick = (e: Event) => {
          const target = e.target;
          if (target instanceof Element) {
            if (!target.closest('.playlists-modal')) {
              removeListenerAndClosePopup();
            }
          }
        };
        window.addEventListener('click', onWindowClick);

        plPopup.closeBtn.addEventListener('click', removeListenerAndClosePopup);
      }
    });
  }

  private async openPlaylistModal(trackId: number) {
    const plPopup = PlaylistPopup.getInstance();
    plPopup.updatePopup(await this.model.getConvertedPlaylistsFromApi());
    plPopup.addPopup();

    this.addAndRemoveListenersInPlaylistModal(plPopup, trackId);
  }

  private addAndRemoveListenersInActionModal(
    popup: TrackPopup,
    trackId: number
  ) {
    if (popup.addBtn && popup.deleteBtn) {
      const removeListenerAndHidePopup = () => {
        if (popup.addBtn && popup.deleteBtn) {
          popup.hidePopup();
          popup.addBtn.removeEventListener('click', onAddBtn);
          popup.deleteBtn.removeEventListener('click', onDeleteBtn);
          window.removeEventListener('click', onWindowClick);
        }
      };

      const onWindowClick = (e: Event) => {
        const target = e.target;
        if (target instanceof Element) {
          if (!target.closest('.tracks__item__drop')) {
            removeListenerAndHidePopup();
          }
        }
      };

      window.addEventListener('click', onWindowClick);

      const onAddBtn = async (e: Event) => {
        e.stopPropagation();
        await this.addUserListener(ActionsEnum.Add, trackId);
        removeListenerAndHidePopup();
      };

      const onDeleteBtn = async () => {
        await this.addUserListener(ActionsEnum.Delete, trackId);
        removeListenerAndHidePopup();
      };

      popup.addBtn.addEventListener('click', onAddBtn);
      popup.deleteBtn.addEventListener('click', onDeleteBtn);
    }
  }

  openActionModal(trackId: number) {
    const popup = TrackPopup.getInstance();
    popup.addPopup(trackId);
    this.addAndRemoveListenersInActionModal(popup, trackId);
  }

  private pushToTrackComponents(list: ITrack[]) {
    list.forEach((item) => {
      const trackComponent = new TrackComponent(
        this.model,
        item,
        this.plId,
        this,
        this.footerPlayer
      );
      this.trackComponents.push(trackComponent);
    });
  }

  private getTrackComponentList(list: ITrack[]) {
    if (this.trackComponents.length === 0) {
      this.pushToTrackComponents(list);
    } else {
      this.trackComponents = [];
      this.pushToTrackComponents(list);
    }
    return this.trackComponents;
  }

  renderEl(list?: ITrack[]) {
    const main = document.querySelector('main.main');
    if (main) {
      main.innerHTML = '';
      main.append(
        list
          ? this.view.updateElement(this.getTrackComponentList(list))
          : this.view.getElement()
      );
    }
  }
}
