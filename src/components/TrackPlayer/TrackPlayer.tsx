import {
  IonButton,
  IonIcon,
  IonLabel,
  IonNote,
  IonRange,
  IonSpinner,
  IonThumbnail
} from '@ionic/react';
import { playForward, pause, play } from 'ionicons/icons';
import React from 'react';
import { formatArtwork } from '../../pipes/formatArtworkUrl/formatArtworkUrl';

import { useSelector, useDispatch } from 'react-redux';
import './TrackPlayer.css';
import { PlaybackStates } from '../../types';

export function TrackPlayer() {
  const store: any = useSelector(state => state);
  const dispatch = useDispatch();

  const togglePlay = () => dispatch({ type: 'togglePlay' });
  const next = () => dispatch({ type: 'next' });
  return (
    <div className="track-player">
      <div className="song-info">
        <IonThumbnail>
          <img
            src={formatArtwork(store.nowPlayingItem.artworkURL, 100)}
            alt="Song art"
          />
        </IonThumbnail>

        <IonLabel>
          <p>{store.nowPlayingItem.title}</p>
          <IonNote>{store.nowPlayingItem.artistName}</IonNote>
        </IonLabel>
      </div>
      <IonRange
        min={0}
        max={store.playbackDuration}
        step={1}
        value={store.playbackProgress}
        disabled={
          store.playbackDuration === 0 || store.isLoading || store.isNotPlaying
        }
      />
      <div className="song-actions">
        <IonButton color="primary" fill="clear" onClick={() => togglePlay()}>
          {store.playbackState === PlaybackStates.LOADING ||
          store.playbackState === PlaybackStates.ENDED ||
          store.playbackState === PlaybackStates.WAITING ||
          store.playbackState === PlaybackStates.STALLED ? (
            <IonSpinner />
          ) : (
            <IonIcon
              ariaLabel="Play or Pause button"
              icon={
                store.playbackState === PlaybackStates.PLAYING ? pause : play
              }
            />
          )}
        </IonButton>
        <IonButton color="primary" fill="clear" onClick={() => next()}>
          <IonIcon icon={playForward} slot="icon-only" />
        </IonButton>
      </div>
    </div>
  );
}
