import { el } from 'redom';
import { IPlaylist } from '../../types/Interfaces/IPlaylist';
import { AbstractComponent } from '../../types/AbstractComponent';
import { randomNumberImg } from '../../../core/constants';

export class PopupPlaylistItemEl extends AbstractComponent {
  constructor({ id, name, songs }: IPlaylist) {
    super({
      id,
      name,
      songs,
    });
  }

  protected getTemplate({ id, name, songs }: IPlaylist) {
    return el('.playlists-modal__playlist', { 'data-id': id }, [
      el('img.playlists-modal__playlist__image', {
        src: `/img/playlists (${randomNumberImg()}).jpg`,
        alt: name,
      }),
      el('.playlists-modal__playlist__title', name),
      el('.playlists-modal__playlist__info', songs.length),
    ]);
  }
}
