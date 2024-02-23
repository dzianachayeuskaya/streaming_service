import { ITrack } from './ITrack';

export interface IPlaylist {
  readonly id: string;
  readonly name: string;
  readonly songs: ITrack[];
}

export interface IPlaylistFromApi {
  readonly id: number;
  readonly name: string;
  readonly songs: ITrack[];
}
