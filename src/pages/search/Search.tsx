import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import {
  IonHeader,
  IonContent,
  IonToolbar,
  IonTitle,
  IonSearchbar,
  IonItemDivider,
  IonItemGroup,
  IonLabel,
  IonList,
  IonButtons,
  IonMenuButton,
  IonSpinner,
  IonPage
} from '@ionic/react';
import { musicKitService } from '../../services/musickit-service';
import SongItem from '../../components/SongItem/SongItem';
import useDebounce from '../../hooks/useDebounce';

export default function SearchPage(_props: RouteComponentProps) {
  const [searchTerm, setSearchTerm] = useState(_props.location.search.slice(1));
  const [musicState, setMusicState] = useState({
    albums: null,
    songs: null,
    playlists: null,
    isLoading: false
  });
  const dispatch = useDispatch();

  const debouncedSearchTerm = useDebounce(searchTerm, 1000);
  const playSong = (index: number) => dispatch({ type: 'play', payload: { queue: musicState.songs, startIndex: index } });
  useEffect( () => {
      if (debouncedSearchTerm) {
        _props.history.replace({ search: debouncedSearchTerm });
        setMusicState({ ...musicState, isLoading: true });
        musicKitService.search(debouncedSearchTerm).then(results => {
          setMusicState({
            songs: results['songs'] ? results['songs']['data'] : null,
            albums: results['albums'] ? results['albums']['data'] : null,
            playlists: results['playlists']
              ? results['playlists']['data']
              : null,
            isLoading: false
          });
        });
      }
    }, [debouncedSearchTerm]);

  const handleInput = async (e: any) => {
    const val = e.target.value;
    if (!val) {
      _props.history.replace({ search: '' });
      setMusicState({
        albums: null,
        songs: null,
        playlists: null,
        isLoading: false
      });
      setSearchTerm('');
      return;
    }
    setSearchTerm(val);
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonMenuButton />
          </IonButtons>
          <IonTitle>Search</IonTitle>
        </IonToolbar>
        <IonToolbar>
          <IonSearchbar
            value={searchTerm}
            debounce={0}
            onIonChange={e => handleInput(e)}
          />
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonList>
          {musicState.isLoading ? (
            <div className="ion-text-center ion-padding">
              <IonSpinner color="primary" />
            </div>
          ) : null}
          {musicState.songs ? (
            <IonItemGroup>
              <IonItemDivider sticky>
                <IonLabel>Songs</IonLabel>
              </IonItemDivider>
              {musicState.songs.map((song: any, idx: number) => (
                <SongItem song={song} key={idx} onClick={() => playSong(idx)} />
              ))}
            </IonItemGroup>
          ) : null}
          {musicState.albums ? (
            <IonItemGroup>
              <IonItemDivider sticky>
                <IonLabel>Albums</IonLabel>
              </IonItemDivider>
              {musicState.albums.map((song: any) => (
                <Link to={'/album/' + song.id} key={song.id}>
                  <SongItem song={song} />
                </Link>
              ))}
            </IonItemGroup>
          ) : null}
          {musicState.playlists ? (
            <IonItemGroup>
              <IonItemDivider sticky>
                <IonLabel>Playlists</IonLabel>
              </IonItemDivider>
              {musicState.playlists.map((song: any) => (
                <Link to={'/playlist/' + song.id} key={song.id}>
                  <SongItem song={song} />
                </Link>
              ))}
            </IonItemGroup>
          ) : null}
        </IonList>
      </IonContent>
    </IonPage>
  );
}
