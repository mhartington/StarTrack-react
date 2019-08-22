import React, { useState, useEffect } from 'react';
import {
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonList,
  IonSpinner,
  IonCol,
  IonRow,
  IonGrid,
  IonButtons,
  IonMenuButton
} from '@ionic/react';
import { musicKitService } from '../../services/musickit-service';
import AlbumPreviewItem from '../../components/AlbumPreviewItem/AlbumPreviewItem';
import { Link } from 'react-router-dom';
import SongItem from '../../components/SongItem/SongItem';
import { player } from '../../services/player';
export default function BrowsePage() {
  const [state, setState] = useState({
    isLoading: true,
    topAlbums: null,
    topPlaylists: null,
    topSongs: null
  });
  const playSong = (index:number) => {
    console.log(index);
    player.setQueueFromItems(state.topSongs, index).subscribe();
  }
  useEffect(() => {
    musicKitService.fetchChart().then(res =>
      setState({
        topAlbums: res.albums[0].data,
        topPlaylists: res.playlists[0].data,
        topSongs: res.songs[0].data,
        isLoading: false
      })
    );
  }, [state]);
  return (
    <>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonMenuButton />
          </IonButtons>
          <IonTitle>Browse</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonList>
          {!state.isLoading ? (
            <>
              <div className="topAlbum ion-padding">
                <IonGrid fixed={true} className="ion-no-padding">
                  <h1>Top Albums</h1>
                  <IonRow>
                    {state.topAlbums.map((album: any, idx: number) => (
                      <IonCol sizeMd="6" sizeLg="4" sizeXl="3" key={album.id}>
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
                  <h1>Top Playlists</h1>
                  <IonRow>
                    {state.topPlaylists.map((playlist: any, idx: number) => (
                      <IonCol
                        sizeMd="6"
                        sizeLg="4"
                        sizeXl="3"
                        key={playlist.id}
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
                    <SongItem song={song} index={idx} key={idx} onClick={() => playSong(idx)} />
                  ))}
                </IonGrid>
              </div>
            </>
          ) : (
            <div className="ion-text-center ion-padding">
              <IonSpinner />
            </div>
          )}
        </IonList>
      </IonContent>
    </>
  );
}
