import { el } from 'redom';
import { AbstractComponent } from '../../types/AbstractComponent';
import { PlaylistItem } from './PlaylistItem';
import { IPlaylist } from '../../types/Interfaces/IPlaylist';

export class PlaylistsSection extends AbstractComponent {
  constructor(playlistsList: IPlaylist[]) {
    super(playlistsList);
  }

  protected getTemplate(list: IPlaylist[]) {
    const playlistsSection = el(
      'section.playlist section tabs-content section--active',
      {
        'data-target': 'playlists',
      },
      [
        el('h2.playlist__h2 visually-hidden', 'Плейлисты'),
        el(
          'ul.playlist__list',
          list.map((item) => {
            const playlist = new PlaylistItem(item);
            return playlist.getElement();
          })
        ),
      ]
    );
    return playlistsSection;
  }

  updateElement(data: IPlaylist[]): HTMLElement {
    this.data = data;
    this.removeElement();
    return this.getElement();
  }
}
