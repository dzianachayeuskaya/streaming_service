import axios from 'axios';
import { IPlaylistFromApi } from './types/Interfaces/IPlaylist';
import { ITrackFromApi } from './types/Interfaces/ITrack';
import { IUser } from './types/Interfaces/IUser';
import { userData } from '.';
import { API_URL } from '../config';

let token = null;

export async function getToken(userData: IUser): Promise<string> {
  return (token ??= axios
    .post(`${API_URL}/auth/login`, userData)
    .then((res) => {
      createHeaderAuthorization(res.data.access_token);
      return res.data.access_token;
    })
    .catch((error) => {
      console.log(error);
      return '';
    }));
}

axios.defaults.headers.common['accept'] = 'application/json';

axios.defaults.headers.post['Content-Type'] = 'application/json';

function createHeaderAuthorization(token: string) {
  axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
}

export async function getPlaylistsFromApi(): Promise<IPlaylistFromApi[]> {
  return axios
    .get(`${API_URL}/users/${userData.username}/playlists`)
    .then((response) => {
      console.log(response.data);
      return response.data;
    })
    .catch((error) => {
      console.log(error);
      return [];
    });
}

export async function getPlSongsFromApi(
  playlistId: number
): Promise<ITrackFromApi[]> {
  return axios
    .get(`${API_URL}/playlists/${playlistId}/songs`)
    .then((response) => {
      console.log(response.data);
      return response.data;
    })
    .catch((error) => {
      console.log(error);
      return [];
    });
}

export async function getSongsFromApi(): Promise<ITrackFromApi[]> {
  return axios
    .get(`${API_URL}/songs`)
    .then((response) => {
      console.log(response.data);
      return response.data;
    })
    .catch((error) => {
      console.log(error);
      return [];
    });
}

export async function getSongFromApi(
  songId: number
): Promise<ITrackFromApi | null> {
  return axios
    .get(`${API_URL}/songs/${songId}`)
    .then((response) => {
      console.log(response.data);
      return response.data;
    })
    .catch((error) => {
      console.log(error);
      return null;
    });
}

export async function getSongFile(
  songName: string
): Promise<ArrayBuffer | null> {
  const encodedSongName = encodeURIComponent(songName);
  return axios
    .get(`http://localhost:3000/songs/${encodedSongName}`, {
      responseType: 'arraybuffer',
    })
    .then((response) => {
      console.log(response);
      return response.data;
    })
    .catch((error) => {
      console.log(error);
      return null;
    });
}

export async function postLike(songId: number): Promise<ITrackFromApi | null> {
  return axios
    .post(`${API_URL}/songs/${songId}/like`)
    .then((response) => {
      console.log(response.data);
      console.log(songId);

      return response.data;
    })
    .catch((error) => {
      console.log(error);
      return null;
    });
}

export async function postUnlike(
  songId: number
): Promise<ITrackFromApi | null> {
  return axios
    .post(`${API_URL}/songs/${songId}/unlike`)
    .then((response) => {
      console.log(response.data);
      console.log(songId);

      return response.data;
    })
    .catch((error) => {
      console.log(error);
      return null;
    });
}

export async function addSongToPlaylist(
  playlistId: number,
  songId: number
): Promise<ITrackFromApi[] | null> {
  return axios
    .post(`${API_URL}/playlists/${playlistId}/add/${songId}`)
    .then((response) => {
      console.log(response.data);

      return response.data.songs;
    })
    .catch((error) => {
      console.log(error);
      return null;
    });
}

export async function getSongsAfterDeletion(
  playlistId: number,
  songId: number
): Promise<ITrackFromApi[] | null> {
  return axios
    .post(`${API_URL}/playlists/${playlistId}/remove/${songId}`)
    .then((response) => {
      console.log(response.data);

      return response.data.songs;
    })
    .catch((error) => {
      console.log(error);
      return null;
    });
}
