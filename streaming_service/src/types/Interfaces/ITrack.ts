import { IAlbum } from './IAlbum';
import { IUser } from './IUser';

export interface ITrack {
  readonly id: number;
  readonly image: string;
  readonly name: string;
  readonly path: string;
  readonly filename: string;
  readonly artist: IAlbum;
  readonly album: IAlbum;
  readonly createdAt: string;
  readonly duration: string;
  readonly playlists?: string[];
  readonly likes: boolean;
}

export interface IFooterTrack {
  readonly id: number;
  readonly image: string;
  readonly name: string;
  readonly path: string;
  readonly filename: string;
  readonly artist: IAlbum;
  readonly album: IAlbum;
  readonly createdAt: string;
  readonly duration: number;
  readonly playlists?: string[];
  readonly likes: boolean;
}

export interface ITrackFromApi {
  readonly id: number;
  readonly name: string;
  readonly filename: string;
  readonly path: string;
  readonly image: string;
  readonly artist: IAlbum;
  readonly album: IAlbum;
  readonly createdAt: string;
  readonly duration: number;
  readonly playlists?: string[];
  readonly likes: IUser[];
}
