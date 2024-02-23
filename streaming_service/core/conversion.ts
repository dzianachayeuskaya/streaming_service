import { userData } from '../src';
import { ListPositionEnum } from '../src/types/Enums/ListPositionEnum';
import { IPlayerData } from '../src/types/Interfaces/IPlayerData';
import { IPlaylist, IPlaylistFromApi } from '../src/types/Interfaces/IPlaylist';
import { ITrack, ITrackFromApi } from '../src/types/Interfaces/ITrack';
import { IUser } from '../src/types/Interfaces/IUser';

import { formatDistance } from 'date-fns';
import { ru } from 'date-fns/locale';

export function convertMsToMinutesAndSeconds(ms: number): string {
  const minutes = Math.floor(ms / 60000);
  const seconds = Math.round((ms % 60000) / 1000);
  return seconds === 60
    ? minutes + 1 + ':00'
    : minutes + ':' + (seconds < 10 ? '0' : '') + seconds;
}

export function convertSongDataForFooterPlayer(
  songData: ITrackFromApi,
  listPosition: ListPositionEnum
): IPlayerData {
  const songPlayerData = {
    ...songData,
    likes: songData.likes.find(
      (user: IUser) => user.username === userData.username
    )
      ? true
      : false,
  };

  const mode = localStorage.getItem('mode');

  return {
    song: songPlayerData,
    listPosition: listPosition,
    mix: mode ? JSON.parse(mode).mix : false,
    repeat: mode ? JSON.parse(mode).repeat : false,
    isPlaying: false,
    currentTime: 0,
  };
}

export function convertPlaylistData(
  playlistsList: IPlaylistFromApi[]
): IPlaylist[] {
  return playlistsList.map((playlist) => ({
    ...playlist,
    id: String(playlist.id),
  }));
}

export function convertSongDataForTrackComponent(song: ITrackFromApi): ITrack {
  return {
    ...song,
    duration: convertMsToMinutesAndSeconds(+song.duration),
    createdAt: formatDistance(
      new Date(song.createdAt.replace(' ', 'T')),
      Date.now(),
      { addSuffix: true, locale: ru }
    ),
    likes: song.likes.find((user: IUser) => user.username === userData.username)
      ? true
      : false,
  };
}
