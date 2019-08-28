import React, { useState } from 'react';
import {
  IonHeader,
  IonTitle,
  IonToolbar,
  IonContent,
  IonList,
  IonSpinner,
  IonBackButton,
  IonButtons,
  useIonViewDidEnter
} from '@ionic/react';
import { musicKitService } from '../../services/musickit-service';
import { PreviewHeader } from '../../components/PreviewHeader/PreviewHeader';
import SongItem from '../../components/SongItem/SongItem';
export default function AlbumPage(props: any) {
  const [state, setState] = useState({ isLoading: true, collection: null });
  useIonViewDidEnter(
    () => {
      const id = props.match.params.albumId;
      musicKitService.fetchAlbum(id).then(res => {
        setState({ isLoading: false, collection: res });
      });
    });
  return (
    <>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton defaultHref="/browse" />
          </IonButtons>
          <IonTitle>
            {state.collection ? state.collection.attributes.name : ''}
          </IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <PreviewHeader album={state.collection ? state.collection : {}} />
        <IonList>
          {state.isLoading ? (
            <div className="ion-text-center ion-padding">
              <IonSpinner  color="primary" />
            </div>
          ) : (
            state.collection.relationships.tracks.data.map(
              (song: any, idx: number) => (
                <SongItem song={song} index={idx} key={idx} />
              )
            )
          )}
        </IonList>
      </IonContent>
    </>
  );
}
