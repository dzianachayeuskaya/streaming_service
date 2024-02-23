import { el, setChildren } from 'redom';
import { AbstractComponent } from '../../types/AbstractComponent';
import { IPlaylist } from '../../types/Interfaces/IPlaylist';
import { randomNumberImg } from '../../../core/constants';

export class PlaylistItem extends AbstractComponent {
  constructor({ id, name, songs }: IPlaylist) {
    super({
      id,
      name,
      songs,
    });
  }

  protected getTemplate({ id, name, songs }: IPlaylist) {
    const playlistEl = el('li.playlist__item', { 'data-id': id });

    const picture = el('picture', [
      el('img.playlist__img', {
        src: `/img/playlists (${randomNumberImg()}).jpg`,
        alt: name,
      }),
    ]);

    const plContent = el('.playlist__content', [
      el(
        'h3.playlist__h3',
        el('a.playlist__h3__link', { href: `/?playlistId=${id}` }, name)
      ),
      el('span.playlist__count', songs.length),
    ]);
    setChildren(playlistEl, [picture, plContent]);
    return playlistEl;
  }
}
