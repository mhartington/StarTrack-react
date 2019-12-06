import React from 'react';
import {
  IonThumbnail,
  IonText,
  IonLabel,
  IonNote,
  IonItem
} from '@ionic/react';
import { LazyImg } from '../LazyImg/LazyImg';
import { formatArtwork } from '../../pipes/formatArtworkUrl/formatArtworkUrl';
import { msToMins } from '../../pipes/msToMins/msToMins';
import './SongItem.css';
export default function SongItem({ song, index, onClick}: any) {
  return (
    <IonItem className="song-item" onClick={onClick}>
      <IonThumbnail>
        <LazyImg
          lazySrc={song.attributes.artwork && song.attributes.artwork.url ? formatArtwork(song.attributes.artwork.url, 60) : null}
          alt={`Album art for ${song.attributes.name}`}
        />
      </IonThumbnail>
      {index != null ? (
        <IonText color="primary" slot="start">
          <p className="index">{index + 1}</p>
        </IonText>
      ) : null}
      <IonLabel>
        <h3>{song.attributes.name}</h3>
        {song.attributes.artistName ? (
          <IonNote>
            <p>{song.attributes.artistName}</p>
          </IonNote>
        ) : null}
      </IonLabel>
      {song.attributes.contentRating === 'explicit' ? (
        <p className="rating" slot="end">
          E
        </p>
      ) : null}
      {song.attributes.durationInMillis ? (
        <IonNote slot="end">
          {' '}
          {msToMins(song.attributes.durationInMillis)}
        </IonNote>
      ) : null}
    </IonItem>
  );
}
