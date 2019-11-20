import { createStore } from 'redux';
import { PlaybackStates } from '../types';
let musicKitGlobal = (window as any).MusicKit.getInstance();
let musicKitInstance = (window as any).MusicKit.getInstance();

const defaultState = {
  bitrate: 256,
  playbackState: PlaybackStates.NONE,
  playbackDuration: 0,
  playbackProgress: 0,
  queue: [],
  queuePosition: 0,
  repeatMode: 0,
  isShuffling: false,
  infiniteLoadTimeout: null,
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
      setQueueFromItems(action.payload.queue, action.payload.startIndex);
      state = { ...state, queuePosition: action.payload.startIndex };
      return state;
    case 'playAlbum':
      toggleShuffle(action.payload.shouldShuffle);
      console.log(action.payload)
      setQueueFromItems(action.payload.collection.relationships.tracks.data);
      return state;

    case 'togglePlay':
      if (musicKitGlobal.player.playbackState === PlaybackStates.PAUSED) {
        musicKitGlobal.player.play();
      } else {
        musicKitGlobal.player.pause();
      }
      return state;

    case 'next':
      next();
      return state;

    case 'error':
      console.log('error');
      return state

    case 'playbackStateDidChange':
      return playbackStateDidChange(state, action.payload);

    case 'mediaItemDidChange':
      return mediaItemDidChange(state, action.payload);

    case 'queueItemsDidChange':
      return queueItemsDidChange(state, action.payload);

    case 'queuePositionDidChange':
      return queuePositionDidChange(state, action.payload);

    case 'playbackDurationDidChange':
      return {...state, playbackDuration: action.payload.duration}

    case 'playbackProgressDidChange':
      return {...state, playbackProgress: (action.payload.progress * 100)}


    default:
      return state;
  }
}

export default createStore(rootReducer);

const setQueueFromItems = (items: any[], startPosition = 0) => {
  items.map(item => (item.container = { id: item.id }));
  return musicKitInstance
    .setQueue({ items })
    .then(() => changeQueuePosition(startPosition));
};
const changeQueuePosition = (index: number) => {
  musicKitInstance.changeToMediaAtIndex(index);
};
const playbackStateDidChange = (state, payload) => {
  const playbackState = PlaybackStates[PlaybackStates[payload.state]];
  return { ...state, playbackState };
};
const toggleShuffle = (shouldShuffle: boolean) => {
  if(!!shouldShuffle){

    musicKitGlobal.player.shuffleMode = 1
  } else {
    musicKitGlobal.player.shuffleMode = 0
  }
}

// Global even listeners
const mediaItemDidChange = (state, payload) => {
  return { ...state, nowPlayingItem: payload.item };
};
const next = () => {
  setTimeout(() => {musicKitGlobal.player.skipToNextItem()}, 0)
  return
}
const queueItemsDidChange = (state, payload) => {
  return {
    ...state,
    queue: musicKitGlobal.player.queue.items.slice(payload.position + 1)
  };
};
const queuePositionDidChange = (state, payload) => {
  return {
    ...state,
    queuePosition: payload.position + 1,
    queue: musicKitGlobal.player.queue.items.slice(payload.position + 1)
  };
};


// const mediaPlaybackError = (event: any) => {
//   console.log('mediaPlayBackError', event);
// };
