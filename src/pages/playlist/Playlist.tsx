import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import {
  IonHeader,
  IonTitle,
  IonToolbar,
  IonContent,
  IonList,
  IonSpinner,
  IonBackButton,
  IonButtons,
  useIonViewWillEnter,
  IonPage
} from '@ionic/react';
import { fetchPlaylist } from '../../services/musickit-service';
import { PreviewHeader } from '../../components/PreviewHeader/PreviewHeader';
import SongItem from '../../components/SongItem/SongItem';
export default function PlaylistPage(props: any) {
  const [state, setState] = useState({ isLoading: true, collection: null });
  const dispatch = useDispatch();
  useIonViewWillEnter(() => {
    const id = props.match.params.playlistId;
    fetchPlaylist(id).then(res => {
      setState({ isLoading: false, collection: res });
    });
  });

  const playSong = (index: number) =>
    dispatch({
      type: 'play',
      payload: {
        queue: state.collection.relationships.tracks.data,
        startIndex: index
      }
    });
  return (
    <IonPage>
      <IonHeader translucent={true}>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton defaultHref="/browse" />
          </IonButtons>
          <IonTitle>
            {state.collection ? state.collection.attributes.name : ''}
          </IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen={true}>
        <PreviewHeader album={state.collection ? state.collection : {}} />
        <IonList>
          {state.isLoading ? (
            <div className="ion-text-center ion-padding">
              <IonSpinner />
            </div>
          ) : (
            state.collection.relationships.tracks.data.map(
              (song: any, idx: number) => (
                <SongItem
                  song={song}
                  index={idx}
                  key={idx}
                  onClick={() => playSong(idx)}
                />
              )
            )
          )}
        </IonList>
      </IonContent>
    </IonPage>
  );
}
