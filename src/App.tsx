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
} from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import { logIn, logOut, musicalNotes, search } from 'ionicons/icons';

import '@ionic/react/css/ionic.bundle.css';
import './theme/variables.css';
import './App.css';

import React, { useState } from 'react';

import { useDispatch } from 'react-redux';
import { Route } from 'react-router-dom';

import { TrackPlayer } from './components/TrackPlayer/TrackPlayer';
import { useMusicKit } from './hooks/useMusicKit';
import AlbumPage from './pages/album/Album';
import BrowsePage from './pages/browse/Browse';
import LandingPage from './pages/landing/Landing';
import PlaylistPage from './pages/playlist/Playlist';
import SearchPage from './pages/search/Search';

function App() {
  const [mkGlobal, mkInstance] = useMusicKit();
  const dispatch = useDispatch();

  dispatch({ type: 'setMusicKitInstance', payload: mkInstance });
  const [isLoggedIn, setState] = useState(mkInstance.isAuthorized);

  const logout = async () => {
    await mkInstance.unauthorize();
    setState(false);
  };
  const login = async () => {
    await mkInstance.authorize();
    setState(mkInstance.isAuthorized);
  };

  mkInstance.addEventListener(mkGlobal.Events.playbackStateDidChange, (e: any) => { dispatch({ type: 'playbackStateDidChange', payload: e }); });
  mkInstance.addEventListener(mkGlobal.Events.queueItemsDidChange, (e: any) => { dispatch({ type: 'queueItemsDidChange', payload: e }); });
  mkInstance.addEventListener(mkGlobal.Events.mediaItemDidChange, (e: any) => { dispatch({ type: 'mediaItemDidChange', payload: e }); });
  mkInstance.addEventListener(mkGlobal.Events.queuePositionDidChange, (e: any) => { dispatch({ type: 'queuePositionDidChange', payload: e }); });
  mkInstance.addEventListener(mkGlobal.Events.playbackTimeDidChange, (e: any) => { dispatch({ type: 'playbackTimeDidChange', payload: e }); });
  mkInstance.addEventListener(mkGlobal.Events.playbackDurationDidChange, (e: any) => { dispatch({ type: 'playbackDurationDidChange', payload: e }); });

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
                    <IonItem
                      onClick={() => logout()}
                      lines="none"
                      button={true}
                    >
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
        <TrackPlayer />
      </IonReactRouter>
    </IonApp>
  );
}
export default App;
