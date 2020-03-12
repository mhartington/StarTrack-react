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
  useIonViewDidEnter,
  IonPage
} from '@ionic/react';

import { fetchAlbum } from '../../services/musickit-service';
import { PreviewHeader } from '../../components/PreviewHeader/PreviewHeader';
import SongItem from '../../components/SongItem/SongItem';

export default function AlbumPage(props: any) {
  const [state, setState] = useState({ isLoading: true, collection: null });
  const dispatch = useDispatch();
  useIonViewDidEnter(() => {
    const id = props.match.params.albumId;
    fetchAlbum(id).then(res => {
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
              <IonSpinner color="primary" />
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
