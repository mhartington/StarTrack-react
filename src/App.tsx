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
import { IonReactRouter, ViewManager } from '@ionic/react-router';
import '@ionic/react/css/ionic.bundle.css';
import { musicalNotes, search } from 'ionicons/icons';
import React from 'react';
import { Route } from 'react-router-dom';

import AlbumPage from './pages/album/Album';
import BrowsePage from './pages/browse/Browse';
import LandingPage from './pages/landing/Landing';
import PlaylistPage from './pages/playlist/Playlist';
import SearchPage from './pages/search/Search';

import { musickitConfig } from './services/musickit-config';
import './theme/variables.css';
import './App.css';
import { TrackPlayer } from './components/TrackPlayer/TrackPlayer';

musickitConfig.configure();

const App: React.FunctionComponent = () => (
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
            <IonList>
              <IonMenuToggle autoHide={false}>
                <IonItem href="/browse">
                  <IonIcon icon={musicalNotes} slot="start" />
                  Browse
                </IonItem>
              </IonMenuToggle>
              <IonMenuToggle autoHide={false}>
                <IonItem href="/search">
                  <IonIcon icon={search} slot="start" />
                  Search
                </IonItem>
              </IonMenuToggle>
            </IonList>
          </IonContent>
        </IonMenu>
        <IonPage id="main">
          <ViewManager>
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
          </ViewManager>
        </IonPage>
      </IonSplitPane>
      <IonFooter className="mh-footer" translucent={true}>
        <TrackPlayer />
      </IonFooter>
    </IonReactRouter>
  </IonApp>
);

export default App;
