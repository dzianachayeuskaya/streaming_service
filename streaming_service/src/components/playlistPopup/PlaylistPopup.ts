import { el, setChildren } from 'redom';
import { PopupPlaylistItemEl } from './PopupPlaylistItemEl';
import { IPlaylist } from '../../types/Interfaces/IPlaylist';

export class PlaylistPopup {
  private static instance: PlaylistPopup;
  private background: HTMLElement = el('.background');
  private contentEl: HTMLElement = el('.playlists-modal__playlist_content');
  public element: HTMLElement;
  public closeBtn: HTMLElement = el('.playlists-modal__close-btn', 'Отменить');
  public plElements: HTMLElement[] = [];
  private constructor() {
    this.element = this.createPopup();
  }

  static getInstance() {
    if (!PlaylistPopup.instance) {
      PlaylistPopup.instance = new PlaylistPopup();
    }
    return PlaylistPopup.instance;
  }

  private createPopup() {
    if (!this.element) {
      const modal = el('.playlists-modal', [
        el('.playlists-modal__title', 'Добавить в плейлист'),
        this.contentEl,
        el('.playlists-modal__footer', this.closeBtn),
      ]);

      return modal;
    } else return this.element;
  }

  addPopup() {
    document.body.append(this.background);
    document.body.append(this.element);
  }

  updatePopup(plList: IPlaylist[]) {
    this.fillListElement(plList);
  }

  private fillListElement(plList: IPlaylist[]) {
    this.plElements = [];
    this.contentEl.innerHTML = '';

    setChildren(
      this.contentEl,
      plList.map((item) => {
        const playlist = new PopupPlaylistItemEl(item);
        const playlistEL = playlist.getElement();
        this.plElements.push(playlistEL);
        return playlistEL;
      })
    );
  }

  public closePopup = () => {
    if (this.element.parentElement && this.background.parentElement) {
      this.element.parentElement.removeChild(this.element);
      this.background.parentElement.removeChild(this.background);
    }
  };
}
