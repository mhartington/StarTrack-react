import React from "react";
import {
  IonTitle,
  IonToolbar,
  IonHeader,
  IonIcon,
  IonButton,
  IonContent
} from '@ionic/react';
import { musicalNotes } from 'ionicons/icons';
export default function LandingPage(props: any) {
  return (
    <>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Star Track </IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding ion-text-center">
        <h3>
          Welcome to Star Track <IonIcon icon={musicalNotes} color="primary" />
        </h3>
        <p>Star Track is a simple way to interact with Apple Music.</p>
        <IonButton
          onClick={e => {
            e.preventDefault();
            props.history.push('/browse');
          }}
        >
          Get Started
        </IonButton>
      </IonContent>
    </>
  );
}
