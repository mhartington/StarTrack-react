import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import {
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonSpinner,
  IonCol,
  IonRow,
  IonGrid,
  IonButtons,
  IonMenuButton,
  useIonViewDidEnter,
  IonPage
} from '@ionic/react';
import { musicKitService } from '../../services/musickit-service';
import AlbumPreviewItem from '../../components/AlbumPreviewItem/AlbumPreviewItem';
import { Link } from 'react-router-dom';
import SongItem from '../../components/SongItem/SongItem';
import { ErrorShrug } from '../../components/ErrorShrug/ErrorShrug';

export default function BrowsePage() {
  const dispatch = useDispatch();
  const [state, setState] = useState({
    isLoading: true,
    topAlbums: null,
    topPlaylists: null,
    topSongs: null
  });
  const [isError, setIsError] = useState<boolean>(false);
  const playSong = (index: number) =>
    dispatch({
      type: 'play',
      payload: { queue: state.topSongs, startIndex: index }
    });
  useIonViewDidEnter(() => {
    musicKitService
      .fetchChart()
      .then(res =>
        setState({
          topAlbums: res.albums[0].data,
          topPlaylists: res.playlists[0].data,
          topSongs: res.songs[0].data,
          isLoading: false
        })
      )
      .catch(err => {
        setState(m => {
          return { ...m, isLoading: false };
        });
        setIsError(true);
        console.warn('HERE IS AN ERRO', err);
      });
  });
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonMenuButton />
          </IonButtons>
          <IonTitle>Browse</IonTitle>
        </IonToolbar>
      </IonHeader>
        <IonContent>
          { isError ? <ErrorShrug /> : null }
        {!state.isLoading ? (
          <>
            <div className="topAlbum ion-padding">
              <IonGrid fixed={true} className="ion-no-padding">
                <IonRow>
                  <IonCol>
                    <h1
                      style={{
                        fontWeight: 700,
                        marginTop: 5,
                        marginBottom: 20
                      }}
                    >
                      Top Albums
                    </h1>
                  </IonCol>
                </IonRow>
                <IonRow className="ion-justify-content-start">
                  {state.topAlbums.map((album: any, idx: number) => (
                    <IonCol
                      sizeMd="4"
                      sizeLg="4"
                      sizeXl="3"
                      key={album.id}
                      className="ion-no-padding"
                    >
                      <Link to={'album/' + album.id}>
                        <AlbumPreviewItem album={album} index={idx} />
                      </Link>
                    </IonCol>
                  ))}
                </IonRow>
              </IonGrid>
            </div>
            <div className="topPlaylist ion-padding">
              <IonGrid fixed={true} className="ion-no-padding">
                <h1
                  style={{
                    fontWeight: 700,
                    marginTop: 5,
                    marginBottom: 20
                  }}
                >
                  Top Playlists
                </h1>
                <IonRow className="ion-justify-content-start">
                  {state.topPlaylists.map((playlist: any, idx: number) => (
                    <IonCol
                      sizeMd="6"
                      sizeLg="4"
                      sizeXl="3"
                      key={playlist.id}
                      className="ion-no-padding"
                    >
                      <Link to={'playlist/' + playlist.id}>
                        <AlbumPreviewItem album={playlist} index={idx} />
                      </Link>
                    </IonCol>
                  ))}
                </IonRow>
              </IonGrid>
            </div>
            <div className="topSongs">
              <IonGrid className="ion-no-padding" fixed={true}>
                <h1 className="ion-padding">Top Songs</h1>
                {state.topSongs.map((song: any, idx: number) => (
                  <SongItem
                    song={song}
                    index={idx}
                    key={idx}
                    onClick={() => playSong(idx)}
                  />
                ))}
              </IonGrid>
            </div>
          </>
        ) : (
          <div className="ion-text-center ion-padding">
            <IonSpinner color="primary" />
          </div>
        )}
      </IonContent>
    </IonPage>
  );
}
