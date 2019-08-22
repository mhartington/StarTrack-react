import React, { useState } from 'react';
import { player, PlaybackStates } from '../../services/player';
import { formatArtwork } from '../../pipes/formatArtworkUrl/formatArtworkUrl';
import {
  IonThumbnail,
  IonNote,
  IonLabel,
  IonRange,
  IonButton,
  IonSpinner,
  IonIcon
} from '@ionic/react';
import './TrackPlayer.css';
import { play, pause, fastforward } from 'ionicons/icons';
// import { from } from 'rxjs';
// import { useObservable } from 'rxjs-hooks';

export function TrackPlayer() {
  const [playerState] = useState(() => {
    player.initPlayer();
    return {
      isLoading:
        player.playbackState === PlaybackStates.LOADING ||
        player.playbackState === PlaybackStates.ENDED ||
        player.playbackState === PlaybackStates.WAITING ||
        player.playbackState === PlaybackStates.STALLED,
      isNotPlaying: player.playbackState === PlaybackStates.NONE,
      currentPlaybacktime: player.currentPlaybackTime,
      currentPlaybackDuration: player.currentPlaybackDuration
    };
  });
  return (
    <div className="track-player">
      <div className="song-info">
        <IonThumbnail>
          <img
            src={formatArtwork(player.nowPlayingItem.artworkURL, 100)}
            alt="Song art"
          />
        </IonThumbnail>

        <IonLabel>
          <p>{player.nowPlayingItem.title}</p>
          <IonNote>{player.nowPlayingItem.artistName}</IonNote>
        </IonLabel>
      </div>
      <IonRange
        min={0}
        max={playerState.currentPlaybackDuration}
        step={1}
        value={playerState.currentPlaybacktime}
        disabled={playerState.currentPlaybackDuration === 0 || playerState.isLoading || playerState.isNotPlaying}
      />
      <div className="song-actions">
        <IonButton color="primary" fill="clear">
          {playerState.isLoading ? (
            <IonSpinner />
          ) : (
            <IonIcon
              slot="icon-only"
              icon={
                player.playbackState === PlaybackStates.PLAYING ? play : pause
              }
            />
          )}
        </IonButton>
        <IonButton color="primary" fill="clear">
          <IonIcon icon={fastforward} slot="icon-only" />
        </IonButton>
      </div>
    </div>
  );
}
