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
  IonPage,
  IonListHeader,
  IonList
} from '@ionic/react';
import { fetchChart } from '../../services/musickit-service';
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
      fetchChart()
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
      <IonHeader translucent={true}>
        <IonToolbar>
          <IonButtons slot="start">
            <IonMenuButton />
          </IonButtons>
          <IonTitle>Browse</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen={true}>
        <IonHeader collapse="condense" className="ion-no-border">
          <IonToolbar className=" transparent">
            <IonTitle size="large">Browse</IonTitle>
          </IonToolbar>
        </IonHeader>
        {isError ? <ErrorShrug /> : null}
        {!state.isLoading ? (
          <>
            <IonList>
              <IonGrid fixed={true} className="ion-no-padding">
                <IonListHeader>
                  <h1>Top Albums</h1>
                </IonListHeader>
                <IonRow className="ion-justify-content-start">
                  {state.topAlbums.map((album: any, idx: number) => (
                    <IonCol
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
            </IonList>
            <IonList>
              <IonGrid fixed={true} className="ion-no-padding">
                <IonListHeader>
                  <h1>Top Playlists</h1>
                </IonListHeader>
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
            </IonList>
            <IonList>
              <IonGrid className="ion-no-padding" fixed={true}>
                <IonListHeader>
                  <h1>Top Songs</h1>
                </IonListHeader>
                {state.topSongs.map((song: any, idx: number) => (
                  <SongItem
                    song={song}
                    index={idx}
                    key={idx}
                    onClick={() => playSong(idx)}
                  />
                ))}
              </IonGrid>
            </IonList>
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
