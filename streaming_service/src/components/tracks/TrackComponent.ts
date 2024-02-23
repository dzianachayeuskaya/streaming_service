import { TracksListPresenter } from '../../presenters/TracksListPresenter';
import { PlaylistsModel } from '../../model/PlaylistsModel';
import { ITrack } from '../../types/Interfaces/ITrack';
import { SmartComponent } from '../../types/SmartComponent';
import { el, setChildren } from 'redom';
import { FooterPlayerComponent } from '../FooterPlayerComponent';
import { convertSongDataForTrackComponent } from '../../../core/conversion';

export class TrackComponent extends SmartComponent {
  private trackBtn: HTMLElement;
  private likeBtn: HTMLElement;
  private dropBtn: HTMLElement;

  constructor(
    private model: PlaylistsModel,
    public data: ITrack,
    private plId: string | null,
    private listPresenter: TracksListPresenter,
    private footerPlayer: FooterPlayerComponent
  ) {
    super(data);
    this.trackBtn = el('button.track__name__button', this.data.name);
    this.likeBtn = el('button.track__like-btn');
    this.dropBtn = el('button.track__btn-dropdown');
  }

  protected repairHandlers(): void {
    this.trackBtn.addEventListener('click', this.changeFooterSong);
    this.likeBtn.addEventListener('click', this.handleLike);
    this.dropBtn.addEventListener('click', this.openPopup);
  }

  protected getTemplate({
    id,
    image,
    name,
    artist,
    album,
    createdAt,
    duration,
    likes,
  }: ITrack) {
    const trackEl = el('li.tracks__item flex', { id: id });
    const trackNumbEl = el('.tracks__item__number', id);
    const trackNameEl = el('.tracks__item__name', [
      el('img.track__img', { src: image, alt: name }),
      el('.track__content', [
        el('h3.track__name', this.trackBtn),
        el('span.track__author', artist.name),
      ]),
    ]);
    const trackAlbumEl = el('.tracks__item__album', album.name);

    this.likeBtn.classList.toggle('like-btn--active', likes);

    this.likeBtn.innerHTML = `<svg width="22" height="18" viewBox="0 0 22 18"
fill="none" xmlns="http://www.w3.org/2000/svg">
<path
  d="M15.5022 8.2786e-06C14.6291 -0.00149138 13.7677 0.200775 12.9865 0.590718C12.2052 0.980661 11.5258 1.54752 11.0022 2.24621C10.293 1.30266 9.30512 0.606001 8.17823 0.254823C7.05134 -0.0963541 5.84256 -0.0842713 4.72291 0.289363C3.60327 0.662997 2.62948 1.37926 1.93932 2.3368C1.24916 3.29434 0.877596 4.44467 0.877197 5.62501C0.877197 12.3621 10.2373 17.6813 10.6357 17.9044C10.7477 17.9671 10.8739 18 11.0022 18C11.1305 18 11.2567 17.9671 11.3687 17.9044C13.0902 16.8961 14.7059 15.7173 16.1914 14.3856C19.4665 11.438 21.1272 8.49047 21.1272 5.62501C21.1255 4.13368 20.5323 2.70393 19.4778 1.6494C18.4233 0.594873 16.9935 0.00169855 15.5022 8.2786e-06V8.2786e-06Z"
  fill="#FC6D3E" />
</svg>`;

    const trackDataEl = el('.tracks__item__data flex', [
      el('span.data__text', createdAt),
      this.likeBtn,
    ]);

    const trackDurationEl = el('time.tracks__item__time', duration);

    this.dropBtn.innerHTML = `<svg width="23" height="4" viewBox="0 0 23 4" fill="none"
  xmlns="http://www.w3.org/2000/svg">
  <circle cx="2" cy="2" r="2" fill="#C4C4C4" />
  <circle cx="11.5" cy="2" r="2" fill="#C4C4C4" />
  <circle cx="21" cy="2" r="2" fill="#C4C4C4" />
</svg>`;

    const trackDrop = el('.tracks__item__drop', this.dropBtn);

    setChildren(trackEl, [
      trackNumbEl,
      trackNameEl,
      trackAlbumEl,
      trackDataEl,
      trackDurationEl,
      trackDrop,
    ]);
    return trackEl;
  }

  private changeFooterSong = () => {
    const currentFooterSongId = this.model.getCurrentFooterSongId([]);
    if (currentFooterSongId === this.data.id) return;
    this.footerPlayer.pausePlayback();
    this.model.getTrackFromApi(this.plId, this.data.id).then((newSongData) => {
      this.footerPlayer.updateDataAndComponent(newSongData);
    });
  };

  private handleLike = async () => {
    const newStateSong = await this.model.clickOnLike(this.data.id);
    const newStateLike = newStateSong
      ? convertSongDataForTrackComponent(newStateSong).likes
      : this.data.likes;

    this.likeBtn.classList.toggle('like-btn--active', newStateLike);
    const currentFooterSongId = this.model.getCurrentFooterSongId([]);
    if (currentFooterSongId === this.data.id) {
      this.footerPlayer.likeBtn.classList.toggle(
        'like-btn--active',
        newStateLike
      );
    }
  };

  private openPopup = () => {
    this.listPresenter.openActionModal(this.data.id);
  };
}
