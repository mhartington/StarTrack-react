import React, { useState, useEffect } from 'react';
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
  IonSpinner
} from '@ionic/react';
import { Subject } from 'rxjs';
import { filter, debounceTime, switchMap, tap } from 'rxjs/operators';
import { musicKitService } from '../../services/musickit-service';
import SongItem from '../../components/SongItem/SongItem';
export default function SearchPage(props: RouteComponentProps) {
  const [searctTerm, setSearchTerm] = useState('');
  const [musicState, setMusicState] = useState({
    albums: null,
    songs: null,
    playlists: null,
    isLoading: false
  });
  const onInput$ = new Subject<string>();
  useEffect(
    () => {
      setSearchTerm(props.location.search.slice(1));
    },
    [props.location.search]
  );
  onInput$
    .pipe(
      filter((term: any) => {
        if (term) {
          setMusicState({ ...musicState, isLoading: true });
          return term;
        } else {
          props.history.replace({ search: '' });
          setMusicState({
            albums: null,
            songs: null,
            playlists: null,
            isLoading: false
          });
        }
      }),
      debounceTime(1000),
      tap(term => {
        props.history.replace({ search: `${term}` });
        return term;
      }),
      switchMap((term: string) => musicKitService.search(term))
    )
    .subscribe(
      (results: any) => {
        setMusicState({
          songs: results['songs'] ? results['songs']['data'] : null,
          albums: results['albums'] ? results['albums']['data'] : null,
          playlists: results['playlists'] ? results['playlists']['data'] : null,
          isLoading: false
        });
      },
      (err: any) => console.log(err),
      () => console.log('don')
    );
  const handleInput = (e: any) => {
    setSearchTerm(e.target.value);
    onInput$.next(e.target.value);
  };

  return (
    <>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonMenuButton />
          </IonButtons>
          <IonTitle>Search</IonTitle>
        </IonToolbar>
        <IonToolbar>
          <IonSearchbar value={searctTerm} onIonChange={e => handleInput(e)} />
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonList>
          {musicState.isLoading ? (
            <div className="ion-text-center ion-padding">
              <IonSpinner />
            </div>
          ) : null}
          {musicState.songs ? (
            <IonItemGroup>
              <IonItemDivider sticky>
                <IonLabel>Songs</IonLabel>
              </IonItemDivider>
              {musicState.songs.map((song: any) => (
                <SongItem song={song} key={song.id} />
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
    </>
  );
}
