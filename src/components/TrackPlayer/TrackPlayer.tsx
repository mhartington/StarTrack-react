import {
  IonButton,
  IonIcon,
  IonLabel,
  IonNote,
  IonRange,
  IonSpinner,
  IonThumbnail,
  IonFooter,
  CreateAnimation
} from '@ionic/react';
import { playForward, pause, play, playBack } from 'ionicons/icons';
import React, { useState } from 'react';
import { formatArtwork } from '../../pipes/formatArtworkUrl/formatArtworkUrl';

import { useSelector, useDispatch } from 'react-redux';
import './TrackPlayer.css';
import { PlaybackStates } from '../../types';

export function TrackPlayer() {

  const store: any = useSelector(state => state);
  const dispatch = useDispatch();
  const [show, shouldShow] = useState(false);

  const togglePlay = (e: React.MouseEvent<HTMLIonButtonElement, MouseEvent>) => {
    e.stopPropagation();
    dispatch({ type: 'togglePlay' });
  };
  const next = (e: React.MouseEvent<HTMLIonButtonElement, MouseEvent>) => {
    e.stopPropagation();
    dispatch({ type: 'next' });
  };
  const handleRangeMove = (e: any) => {
    dispatch({ type: 'seekToTime', payload: e.target.value });
  };

  return (
    <IonFooter
      onClick={() => shouldShow(!show)}
      translucent={true}
      className={`mh-footer ${show ? 'active' : ''}`}
    >
      <div className="track-wrapper">
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
              <IonNote color="primary">
                {store.nowPlayingItem.artistName}
              </IonNote>
            </IonLabel>
          </div>
          <IonRange
            min={0}
            max={store.playbackDuration}
            step={1}
            value={store.playbackProgress}
            onClick={e => e.stopPropagation()}
            onPointerUp={e => handleRangeMove(e)}
            disabled={
              store.playbackDuration === 0 ||
              store.isLoading ||
              store.isNotPlaying
            }
          />
          <div className="song-actions">
            <IonButton class="prev-button" color="primary" fill="clear">
              <IonIcon ariaLabel="Previous Button" icon={playBack} />
            </IonButton>
            <IonButton
              color="primary"
              fill="clear"
              onClick={e => togglePlay(e)}
            >
              {store.playbackState === PlaybackStates.LOADING ||
              store.playbackState === PlaybackStates.ENDED ||
              store.playbackState === PlaybackStates.WAITING ||
              store.playbackState === PlaybackStates.STALLED ? (
                <IonSpinner />
              ) : (
                <IonIcon
                  ariaLabel="Play or Pause button"
                  icon={
                    store.playbackState === PlaybackStates.PLAYING
                      ? pause
                      : play
                  }
                />
              )}
            </IonButton>
            <IonButton color="primary" fill="clear" onClick={e => next(e)}>
              <IonIcon icon={playForward} slot="icon-only" />
            </IonButton>
          </div>
        </div>
      </div>
    </IonFooter>
  );
}
