import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { LazyImg } from '../LazyImg/LazyImg';
import { formatArtwork } from '../../pipes/formatArtworkUrl/formatArtworkUrl';
import { play, shuffle, ellipsisVertical } from 'ionicons/icons';
import { IonButton, IonIcon } from '@ionic/react';
import './PreviewHeader.css';
export function PreviewHeader({ album }: { album: any }) {
  const dispatch = useDispatch();
  const [state, setState] = useState({
    collection: null,
    duration: null
  });
  const playAlbum = (shouldShuffle: boolean) => {
    dispatch({
      type: 'playAlbum',
      payload: { collection: state.collection, shouldShuffle }
    });
  };
  const formatDuration = (val: number) => {
    const { hours, minutes } = (window as any).MusicKit.formattedMilliseconds(
      val
    );
    const hourTime = hours === 0 ? `` : `${hours} hours, `;
    const minutesTime = `${minutes} minutes`;
    return `${hourTime} ${minutesTime} `;
  };
  useEffect(
    () => {
      if (Object.keys(album).length !== 0) {
        let duration = 0;
        for (const song of album.relationships.tracks.data) {
          if (song.attributes.durationInMillis) {
            duration += song.attributes.durationInMillis;
          }
        }
        setState({ collection: album, duration });
      }
    },
    [album]
  );

  return (
    <div
      className="preview-header"
      style={{
        backgroundImage: `url("${(window as any).MusicKit.formatArtworkURL(
          {
            url: state.collection ? state.collection.attributes.artwork.url : ''
          },
          1000,
          1000
        )}")`
      }}
    >
      <div
        className="artwork-header"
        style={{
          background: state.collection
            ? `#${state.collection.attributes.artwork.bgColor}70`
            : ''
        }}
      >
        <div className="album-info">
          {state.collection ? (
            <>
              <LazyImg
                className="header-artwork"
                lazySrc={formatArtwork(
                  state.collection.attributes.artwork.url,
                  1500
                )}
                alt="Album Art "
              />
              <div className="album-detail">
                <h3>{state.collection.attributes.name}</h3>
                <p>
                  {state.collection.attributes.artistName
                    ? state.collection.attributes.artistName
                    : state.collection.attributes.curatorName}
                </p>
                <p>
                  {state.collection.attributes.description
                    ? state.collection.attributes.description.short
                    : state.collection.attributes.genreNames[0]}
                </p>
                <p>
                  {state.collection.relationships.tracks.data.length} Songs,{' '}
                  {formatDuration(state.duration)}
                </p>
                <IonButton onClick={() => playAlbum(false)}>
                  <IonIcon slot="start" icon={play} />
                  Play
                </IonButton>
                <IonButton onClick={() => playAlbum(true)}>
                  <IonIcon icon={shuffle} slot="start" />
                  Shuffle
                </IonButton>
                <IonButton>
                  <IonIcon icon={ellipsisVertical} slot="icon-only" />
                </IonButton>
              </div>
            </>
          ) : null}
        </div>
      </div>
    </div>
  );
}
