import React from 'react';
import { IonCard, IonLabel, IonNote } from '@ionic/react';
import { LazyImg } from '../LazyImg/LazyImg';
import { formatArtwork } from '../../pipes/formatArtworkUrl/formatArtworkUrl';
import './AlbumPreviewItem.css';
export default function AlbumPreviewItem({ album, index }: { album: any; index: number; }) {
  return (
    <div className="album-preview-card">
      <IonCard>
        <LazyImg
          lazySrc={formatArtwork(album.attributes.artwork.url, 200)}
          alt="album art"
        />
      </IonCard>
      <IonLabel>
        <h3>
          <span className="index">{index + 1}</span> {album.attributes.name}
          {album.attributes.contentRating === 'explicit' ? (
            <span className="rating"> E </span>
          ) : null}
        </h3>
        <IonNote>
          <p>{album.attributes.artistName}</p>
        </IonNote>
      </IonLabel>
    </div>
  );
}
