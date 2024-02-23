import { ListPositionEnum } from '../src/types/Enums/ListPositionEnum';
import { ITrackFromApi } from '../src/types/Interfaces/ITrack';

export function getRandomIndex<T>(array: Array<T>): number {
  return Math.floor(Math.random() * array.length);
}

export function determinePosition(
  ind: number,
  songList: ITrackFromApi[]
): ListPositionEnum {
  if (ind < 0) {
    return ListPositionEnum.Single;
  } else if (ind === 0) {
    return ListPositionEnum.First;
  } else if (ind === songList.length - 1) {
    return ListPositionEnum.Last;
  } else return ListPositionEnum.Medium;
}

export function getDefaultFooterSongData(
  tracksList: ITrackFromApi[],
  footerTrackId: number
): { songData: ITrackFromApi; songInd: number } {
  const songInd = tracksList.findIndex((track) => track.id === footerTrackId);
  const songData = songInd > -1 ? tracksList[songInd] : tracksList[0];
  return {
    songData: songData,
    songInd: songInd,
  };
}

export function setValue(value: number) {
  localStorage.setItem('value', String(value));
}
