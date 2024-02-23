import { FooterPlayerComponent } from './components/FooterPlayerComponent';
import { Header } from './components/header/Header';
import { PlaylistsModel } from './model/PlaylistsModel';
import { el, setChildren } from 'redom';
import { getToken } from './api';
import { IUser } from './types/Interfaces/IUser';
import { ITrackFromApi } from './types/Interfaces/ITrack';
import { TracksListPresenter } from './presenters/TracksListPresenter';
import { PlaylistListPresenter } from './presenters/PlaylistListPresenter';
import { Aside } from './components/Aside';
import { determinePosition, getDefaultFooterSongData } from '../core/utils';
import { convertSongDataForFooterPlayer } from '../core/conversion';

export const userData: IUser = {
  username: 'diana9',
  password: 'dddd',
  imgSrc: 'img/user.jpg',
};

const header = new Header(userData);

const contentWrap = el('.content-wrap flex');

const wrapper = el(
  '.over-wrapper',
  {
    style: { position: 'relative', overflow: 'hidden' },
  },
  [header.getElement(), contentWrap]
);

document.body.append(wrapper);

const playlistsModel = new PlaylistsModel();

function determinatePresenter(
  playlistId: string | null,
  tracksList: ITrackFromApi[],
  footerPlayerComponent: FooterPlayerComponent
): PlaylistListPresenter | TracksListPresenter {
  if (playlistId === 'all') {
    return new PlaylistListPresenter(playlistsModel, header);
  } else {
    return new TracksListPresenter(
      playlistsModel,
      header,
      playlistId,
      tracksList,
      footerPlayerComponent
    );
  }
}

function renderPage(playlistId: string | null) {
  contentWrap.append(el('div.loader'));

  getToken(userData).then(() => {
    Promise.all([
      playlistsModel.recordPlaylists(),
      playlistsModel.recordSongs(),
      playlistId !== null && playlistId !== 'all'
        ? playlistsModel.getTracksFromApi(playlistId)
        : null,
    ])
      .then(([plList, tracksList, plSongList]) => {
        const router = new Aside(plList, playlistId);
        const main = el('main.main');

        const footerTrackId = playlistsModel.getCurrentFooterSongId(
          plSongList
            ? plSongList.length
              ? plSongList
              : tracksList
            : tracksList
        );

        let footerTrackData: ITrackFromApi;
        let currentSongList = tracksList;
        let footerTrackInd: number;
        let isSongListSectionEmpty = false;

        const defaultFooterSongData = getDefaultFooterSongData(
          tracksList,
          footerTrackId
        );

        if (plSongList) {
          if (plSongList.length === 0) {
            isSongListSectionEmpty = true;
          }
          const trackIndex = plSongList.findIndex(
            (track) => track.id === footerTrackId
          );
          if (trackIndex > -1) {
            footerTrackData = plSongList[trackIndex];
            currentSongList = plSongList;
          } else {
            footerTrackData = defaultFooterSongData.songData;
          }
          footerTrackInd = trackIndex;
        } else if (playlistId === 'all') {
          footerTrackData = defaultFooterSongData.songData;
          isSongListSectionEmpty = true;
          footerTrackInd = -1;
        } else {
          footerTrackData = defaultFooterSongData.songData;
          footerTrackInd = defaultFooterSongData.songInd;
        }

        const footerPlayerComponent = new FooterPlayerComponent(
          playlistsModel,
          playlistId,
          isSongListSectionEmpty,
          convertSongDataForFooterPlayer(
            footerTrackData,
            determinePosition(footerTrackInd, currentSongList)
          )
        );

        const sectionPresenter = determinatePresenter(
          playlistId,
          plSongList ? plSongList : tracksList,
          footerPlayerComponent
        );

        contentWrap.innerHTML = '';

        setChildren(contentWrap, [
          router.getElement(),
          main,
          footerPlayerComponent.getInteractiveElement(),
        ]);

        sectionPresenter.renderEl();
      })
      .catch((err) => console.log(err));
  });
}

function goToPage() {
  const searchParams = new URLSearchParams(location.search);
  const playlistId = searchParams.get('playlistId');
  playlistId ? renderPage(playlistId) : renderPage(null);
}

goToPage();

window.addEventListener('popstate', goToPage);
