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
  useIonViewWillEnter
} from '@ionic/react';
import { musicKitService } from '../../services/musickit-service';
import { PreviewHeader } from '../../components/PreviewHeader/PreviewHeader';
import SongItem from '../../components/SongItem/SongItem';
export default function PlaylistPage(props: any) {
  const [state, setState] = useState({ isLoading: true, collection: null });
  useIonViewWillEnter(() => {
      const id = props.match.params.playlistId;
      musicKitService.fetchPlaylist(id).then(res => {
        setState({ isLoading: false, collection: res });
      });
    },
  );
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
              <IonSpinner />
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
