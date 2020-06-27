import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { ErrorShrug } from '../../components/ErrorShrug/ErrorShrug';
import { Link, useLocation, useHistory } from 'react-router-dom';
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
import { search } from '../../services/musickit-service';
import SongItem from '../../components/SongItem/SongItem';
import useDebounce from '../../hooks/useDebounce';

export default function SearchPage() {
  const location = useLocation();
  const history = useHistory();
  const [searchTerm, setSearchTerm] = useState(
    location.search.slice(1).replace('q=', '')
  );
  const [isError, setIsError] = useState<boolean>(false);
  const [musicState, setMusicState] = useState({
    albums: null,
    songs: null,
    playlists: null,
    isLoading: false
  });
  const dispatch = useDispatch();

  const debouncedSearchTerm = useDebounce(searchTerm, 1000);

  const playSong = (index: number) => {
    dispatch({
      type: 'play',
      payload: { queue: musicState.songs, startIndex: index }
    });
  };

  const handleInput = async (e: any) => {
    const val = e.target.value;
    if (!val) {
      history.replace({ search: '' });
      setMusicState({
        albums: null,
        songs: null,
        playlists: null,
        isLoading: false
      });
      setSearchTerm('');
      setIsError(false);
      return;
    }
    setSearchTerm(val);
  };
  useEffect(() => {
    if (debouncedSearchTerm) {
      history.replace({ search: `?q=${debouncedSearchTerm}` });
      setMusicState(m => {
        return { ...m, isLoading: true };
      });
      search(debouncedSearchTerm)
        .then(res => {
          setMusicState({
            albums: res?.albums.data ?? null,
            songs: res?.songs?.data ?? null,
            playlists: res?.playlists?.data ?? null,
            isLoading: false
          });
        })
        .catch(() => {
          setMusicState(m => {
            return { ...m, isLoading: false };
          });
          setIsError(true);
        });
    }
  }, [debouncedSearchTerm, history]);

  return (
    <IonPage>
      <IonHeader translucent={true}>
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
      <IonContent fullscreen={true}>
        {isError ? <ErrorShrug /> : null}
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
