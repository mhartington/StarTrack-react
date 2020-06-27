import { createStore } from 'redux';
import { PlaybackStates } from '../types';

const defaultState = {
  bitrate: 256,
  musicKitInstance: null,
  playbackState: PlaybackStates.NONE,
  playbackDuration: 0,
  playbackProgress: 0,
  queue: [],
  queuePosition: 0,
  repeatMode: 0,
  isShuffling: false,
  infiniteLoadTimeout: null,
  backgroundColor: null,
  nowPlayingItem: {
    albumName: '',
    artistName: '',
    artworkURL: './assets/imgs/default.jpeg',
    title: '',
    trackNumber: 1,
    id: '',
    type: '',
    container: { id: '' },
    playbackDuration: 0,
    collectionId: '',
    assets: [
      {
        metadata: {
          artistId: '',
          playlistId: ''
        }
      }
    ]
  }
};
function rootReducer( state = defaultState, action: { type: string; payload?: any }) {
  switch (action.type) {

    case 'play':
      setQueueFromItems( state.musicKitInstance, action.payload.queue, action.payload.startIndex);
      state = { ...state, queuePosition: action.payload.startIndex };
      return state;

    case 'playAlbum':
      toggleShuffle(state.musicKitInstance, action.payload.shouldShuffle);
      setQueueFromItems( state.musicKitInstance, action.payload.collection.relationships.tracks.data);
      return state;

    case 'togglePlay':
      state.musicKitInstance.player.playbackState === PlaybackStates.PAUSED
        ? state.musicKitInstance.player.play()
        : state.musicKitInstance.player.pause();
      return state;

    case 'next':
      next(state.musicKitInstance);
      return state;

    case 'error':
      console.log('error');
      return state;

    case 'playbackStateDidChange':
      return playbackStateDidChange(state, action.payload);

    case 'mediaItemDidChange':
      return mediaItemDidChange(state, action.payload);

    case 'queueItemsDidChange':
      return queueItemsDidChange(state, action.payload);

    case 'queuePositionDidChange':
      return queuePositionDidChange(state, action.payload);

    case 'playbackDurationDidChange':
      return { ...state, playbackDuration: action.payload.duration };

    case 'seekToTime':
      state.musicKitInstance.player.seekToTime(action.payload);
      return state;

    case 'playbackTimeDidChange':
      console.log(action);
      return { ...state, playbackProgress: action.payload.currentPlaybackTime };

    case 'setMusicKitInstance':
      return { ...state, musicKitInstance: action.payload };

    default:
      return state;
  }
}

export default createStore(rootReducer,  (window as any).__REDUX_DEVTOOLS_EXTENSION__ && (window as any).__REDUX_DEVTOOLS_EXTENSION__());

const setQueueFromItems = ( musicKitInstance: any, items: any[], startPosition = 0) => {
  const newItems = items.map(item => (item.container = { id: item.id }));
  return musicKitInstance
    .setQueue({ items: newItems })
    .then(() => changeQueuePosition(musicKitInstance, startPosition));
};
const changeQueuePosition = (musicKitInstance:any, index: number) => {
  musicKitInstance.changeToMediaAtIndex(index);
};
const playbackStateDidChange = (state, payload: { state: string | number }) => {
  const playbackState = PlaybackStates[PlaybackStates[payload.state]];
  return { ...state, playbackState };
};
const toggleShuffle = (musicKitInstance:any, shouldShuffle: boolean) => {
  if (!!shouldShuffle) {
    musicKitInstance.player.shuffleMode = 1;
  } else {
    musicKitInstance.player.shuffleMode = 0;
  }
};

// Global even listeners
const mediaItemDidChange = (state, payload) => {
  return { ...state, nowPlayingItem: payload.item };
};
const next = (musicKitInstance: any) => {
  setTimeout(() => {
    musicKitInstance.player.skipToNextItem();
  }, 0);
  return;
};
const queueItemsDidChange = (state, payload) => {
  return {
    ...state,
    queue: state.musicKitInstance.player.queue.items.slice(payload.position + 1)
  };
};
const queuePositionDidChange = (state, payload) => {
  return {
    ...state,
    queuePosition: payload.position + 1,
    queue: state.musicKitInstance.player.queue.items.slice(payload.position + 1)
  };
};

// const mediaPlaybackError = (event: any) => {
//   console.log('mediaPlayBackError', event);
// };
