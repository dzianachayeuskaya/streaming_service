import { ListPositionEnum } from '../Enums/ListPositionEnum';
import { IFooterTrack } from './ITrack';

export interface IPlayerData {
  readonly song: IFooterTrack;
  listPosition: ListPositionEnum;
  mix: boolean;
  repeat: boolean;
  isPlaying: boolean;
  currentTime: number;
}
