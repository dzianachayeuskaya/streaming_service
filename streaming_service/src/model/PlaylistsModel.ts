import { IPlaylist } from '../types/Interfaces/IPlaylist';
import {
  getPlaylistsFromApi,
  getSongFromApi,
  getSongsFromApi,
  postLike,
  postUnlike,
  getSongsAfterDeletion,
  getPlSongsFromApi,
  addSongToPlaylist,
} from '../api';
import { ITrack, ITrackFromApi } from '../types/Interfaces/ITrack';
import { IUser } from '../types/Interfaces/IUser';
import { ListPositionEnum } from '../types/Enums/ListPositionEnum';
import { userData } from '..';
import { determinePosition, getRandomIndex } from '../../core/utils';
import {
  convertPlaylistData,
  convertSongDataForTrackComponent,
} from '../../core/conversion';

export class PlaylistsModel {
  private playlists: IPlaylist[] = [];
  public footerSongId: number | null;

  constructor() {
    const footerSongId = localStorage.getItem('footerSongId');
    if (footerSongId) this.footerSongId = JSON.parse(footerSongId);
    else this.footerSongId = null;
  }

  getCurrentFooterSongId(songList: ITrackFromApi[]): number {
    return (this.footerSongId ??= songList[getRandomIndex(songList)].id);
  }

  setCurrentFooterSongId(songId: number) {
    localStorage.setItem('footerSongId', JSON.stringify(songId));
    this.footerSongId = songId;
  }

  async getConvertedPlaylistsFromApi(): Promise<IPlaylist[]> {
    return convertPlaylistData(await getPlaylistsFromApi());
  }

  getPlaylists(string?: string): IPlaylist[] {
    if (string) {
      const filteredPlaylists = this.playlists.filter((playlist) =>
        playlist.name.toLowerCase().includes(string.toLowerCase().trim())
      );
      return filteredPlaylists;
    } else return this.playlists;
  }

  getPlaylist(plId: string): IPlaylist | null {
    const targetPlaylist = this.playlists.find(
      (playlist) => String(playlist.id) === plId
    );
    return targetPlaylist ? targetPlaylist : null;
  }

  async recordPlaylists() {
    this.playlists = convertPlaylistData(await getPlaylistsFromApi());
    return this.playlists;
  }

  async recordSongs() {
    return await getSongsFromApi();
  }

  private filterByString(array: ITrack[], str: string): ITrack[] {
    return array.filter(
      (song) =>
        song.name.toLowerCase().includes(str.toLowerCase().trim()) ||
        song.album.name.toLowerCase().includes(str.toLowerCase().trim()) ||
        song.artist.name.toLowerCase().includes(str.toLowerCase().trim())
    );
  }

  async getConvertedPlSongsFromApi(
    plId: string | null,
    string?: string
  ): Promise<ITrack[]> {
    let songsFromApi;
    if (plId) {
      const playlistId = Number(plId);
      songsFromApi = await getPlSongsFromApi(playlistId);
    } else songsFromApi = await getSongsFromApi();
    const songs = songsFromApi.map((song) =>
      convertSongDataForTrackComponent(song)
    );
    if (string) return this.filterByString(songs, string);
    return songs;
  }

  getTracksFromApi(plId: string): Promise<ITrackFromApi[]> {
    return getPlSongsFromApi(+plId);
  }

  async clickOnLike(id: number): Promise<ITrackFromApi | null> {
    const targetTrackFromApi = await getSongFromApi(id);
    if (targetTrackFromApi) {
      const response = targetTrackFromApi.likes.find(
        (user: IUser) => user.username === userData.username
      )
        ? await postUnlike(id)
        : await postLike(id);
      if (response) {
        return response;
      }
    }
    return null;
  }

  async addTrack(id: number, targetPlId: string) {
    const playlistId = Number(targetPlId);
    await addSongToPlaylist(playlistId, id);
  }

  async deleteTrackAndGetUpdatedList(
    plId: string,
    trackId: number
  ): Promise<ITrack[] | null> {
    const playlistId = Number(plId);
    const newList = await getSongsAfterDeletion(playlistId, trackId);
    return newList
      ? newList.map((s) => convertSongDataForTrackComponent(s))
      : null;
  }

  async getTrackFromApi(
    plId: string | null,
    currentSongId: number,
    direction?: 'Next' | 'Back'
  ): Promise<{
    trackData: ITrackFromApi | null;
    listPosition: ListPositionEnum;
  } | null> {
    let currentSongList;

    switch (plId) {
      case null:
        currentSongList = await getSongsFromApi();
        break;
      case 'all':
        return null;
      default:
        currentSongList = await this.getTracksFromApi(plId);
    }

    const targetTrackIndex = currentSongList.findIndex(
      (track) => track.id === currentSongId
    );

    const mode = localStorage.getItem('mode');

    if (direction && mode) {
      if (JSON.parse(mode).mix) {
        const ind = getRandomIndex(currentSongList);

        return {
          trackData: currentSongList[ind],
          listPosition: determinePosition(ind, currentSongList),
        };
      }
    }

    if (targetTrackIndex > -1) {
      if (direction) {
        switch (direction) {
          case 'Back':
            return targetTrackIndex === 0
              ? {
                  trackData: null,
                  listPosition: ListPositionEnum.First,
                }
              : {
                  trackData: currentSongList[targetTrackIndex - 1],
                  listPosition: determinePosition(
                    targetTrackIndex - 1,
                    currentSongList
                  ),
                };
          case 'Next':
            return targetTrackIndex >= currentSongList.length - 1
              ? {
                  trackData: null,
                  listPosition: ListPositionEnum.Last,
                }
              : {
                  trackData: currentSongList[targetTrackIndex + 1],
                  listPosition: determinePosition(
                    targetTrackIndex + 1,
                    currentSongList
                  ),
                };
        }
      }

      return {
        trackData: currentSongList[targetTrackIndex],
        listPosition:
          targetTrackIndex === 0
            ? ListPositionEnum.First
            : targetTrackIndex === currentSongList.length - 1
            ? ListPositionEnum.Last
            : ListPositionEnum.Medium,
      };
    }

    return null;
  }
}
