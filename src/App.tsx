import React, { useState } from 'react';
import {
  IonApp,
  IonContent,
  IonHeader,
  IonIcon,
  IonItem,
  IonList,
  IonMenu,
  IonMenuToggle,
  IonPage,
  IonRouterOutlet,
  IonSplitPane,
  IonTitle,
  IonToolbar,
  IonFooter
} from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';

import '@ionic/react/css/ionic.bundle.css';
import { musicalNotes, search, logIn, logOut } from 'ionicons/icons';

import { Route } from 'react-router-dom';

import AlbumPage from './pages/album/Album';
import BrowsePage from './pages/browse/Browse';
import LandingPage from './pages/landing/Landing';
import PlaylistPage from './pages/playlist/Playlist';
import SearchPage from './pages/search/Search';
import { useDispatch } from 'react-redux';
import { musickitConfig } from './services/musickit-config';
import './theme/variables.css';
import './App.css';
import { TrackPlayer } from './components/TrackPlayer/TrackPlayer';

musickitConfig.configure();
export default function App() {
  const musicKitInstance = (window as any).MusicKit.getInstance();
  const musicKitGlobal = (window as any).MusicKit;
  const [isLoggedIn, setState] = useState(musicKitInstance.isAuthorized);
  const logout = () => {
    console.log('attempting to log out')
    return musicKitInstance.unauthorize().then(() => {
      setState(musicKitInstance.isAuthorized);
    })
  };
  const login = () => {
    return musicKitInstance.authorize().then(() => {
      setState(musicKitInstance.isAuthorized);
    })
  };
  const dispatch = useDispatch();

  musicKitInstance.addEventListener(
    musicKitGlobal.Events.playbackStateDidChange,
    (e: any) => {
      dispatch({ type: 'playbackStateDidChange', payload: e });
    }
  );
  musicKitInstance.addEventListener(
    musicKitGlobal.Events.queueItemsDidChange,
    (e: any) => {
      dispatch({ type: 'queueItemsDidChange', payload: e });
    }
  );
  musicKitInstance.addEventListener(
    musicKitGlobal.Events.mediaItemDidChange,
    (e: any) => {
      dispatch({ type: 'mediaItemDidChange', payload: e });
    }
  );
  musicKitInstance.addEventListener(
    musicKitGlobal.Events.queuePositionDidChange,
    (e: any) => {
      dispatch({ type: 'queuePositionDidChange', payload: e });
    }
  );
  musicKitInstance.addEventListener(
    musicKitGlobal.Events.playbackProgressDidChange,
    (e: any) => {
      dispatch({ type: 'playbackProgressDidChange', payload: e });
    }
  );
  musicKitInstance.addEventListener(
    musicKitGlobal.Events.playbackDurationDidChange,
    (e: any) => {
      dispatch({ type: 'playbackDurationDidChange', payload: e });
    }
  );

  return (
    <IonApp>
      <IonReactRouter>
        <IonSplitPane contentId="main" when="(min-width: 850px)">
          <IonMenu contentId="main">
            <IonHeader>
              <IonToolbar>
                <IonTitle>Star Track</IonTitle>
              </IonToolbar>
            </IonHeader>
            <IonContent>
              <IonList lines="none">
                <IonMenuToggle autoHide={false}>
                  <IonItem routerLink="/browse">
                    <IonIcon icon={musicalNotes} slot="start" />
                    Browse
                  </IonItem>
                </IonMenuToggle>
                <IonMenuToggle autoHide={false}>
                  <IonItem routerLink="/search">
                    <IonIcon icon={search} slot="start" />
                    Search
                  </IonItem>
                </IonMenuToggle>
                {isLoggedIn ? (
                  <IonMenuToggle autoHide={false} class="bottom-item">
                    <IonItem onClick={() => logout()} lines="none" button={true}>
                      <IonIcon slot="start" icon={logOut} />
                      Log Out
                    </IonItem>
                  </IonMenuToggle>
                ) : (
                  <IonMenuToggle autoHide={false} class="bottom-item">
                    <IonItem onClick={() => login()} lines="none" button={true}>
                      <IonIcon slot="start" icon={logIn} />
                      Log In
                    </IonItem>
                  </IonMenuToggle>
                )}
                    <IonItem>Is Logged in:  {JSON.stringify(isLoggedIn)}</IonItem>
              </IonList>
            </IonContent>
          </IonMenu>
          <IonPage id="main">
            <IonRouterOutlet>
              <Route exact path="/" component={LandingPage} />
              <Route exact path="/browse" component={BrowsePage} />
              <Route exact path="/search" component={SearchPage} />
              <Route exact path="/album/:albumId" component={AlbumPage} />
              <Route
                exact
                path="/playlist/:playlistId"
                component={PlaylistPage}
              />
            </IonRouterOutlet>
          </IonPage>
        </IonSplitPane>
        <IonFooter className="mh-footer" translucent={true}>
          <TrackPlayer />
        </IonFooter>
      </IonReactRouter>
    </IonApp>
  );
}
