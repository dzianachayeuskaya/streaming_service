import { TrackComponent } from '../components/tracks/TrackComponent';
import { IPlayerData } from './Interfaces/IPlayerData';
import { IPlaylist } from './Interfaces/IPlaylist';
import { ITrack } from './Interfaces/ITrack';
import { IUser } from './Interfaces/IUser';

export abstract class AbstractComponent {
  private element: HTMLElement | null = null;

  constructor(
    protected data:
      | IUser
      | ITrack
      | IPlayerData
      | IPlaylist
      | IPlaylist[]
      | TrackComponent[]
  ) {}
  protected abstract getTemplate(
    data:
      | IUser
      | ITrack
      | IPlayerData
      | IPlaylist
      | IPlaylist[]
      | TrackComponent[]
  ): HTMLElement;

  getElement(): HTMLElement {
    return (this.element ??= this.getTemplate(this.data));
  }

  protected removeElement() {
    this.element = null;
  }
}
