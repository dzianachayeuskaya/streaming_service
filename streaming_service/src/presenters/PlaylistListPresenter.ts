import { WAIT_TIME_MS } from '../../core/constants';
import { Header } from '../components/header/Header';
import { PlaylistsSection } from '../components/playlists/PlaylistsSection';
import { PlaylistsModel } from '../model/PlaylistsModel';
import { IPlaylist } from '../types/Interfaces/IPlaylist';
import { Presenter } from '../types/Presenter';

export class PlaylistListPresenter extends Presenter {
  private view: PlaylistsSection;

  constructor(
    private model: PlaylistsModel,
    private header: Header
  ) {
    super();
    this.view = new PlaylistsSection(this.model.getPlaylists());
    this.activate();
  }

  protected activate() {
    this.header.input.addEventListener('input', this.onInput);
  }

  protected deactivate(): void {
    this.header.input.removeEventListener('input', this.onInput);
  }

  protected onInput = () => {
    if (this.timeout) clearTimeout(this.timeout);
    this.timeout = setTimeout(
      () => this.renderEl(this.model.getPlaylists(this.header.input.value)),
      WAIT_TIME_MS
    );
  };

  renderEl(list?: IPlaylist[]) {
    const main = document.querySelector('main.main');
    if (main) {
      main.innerHTML = '';
      main.append(
        list ? this.view.updateElement(list) : this.view.getElement()
      );
    }
  }
}
