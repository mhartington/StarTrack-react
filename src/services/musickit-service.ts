// import { musickitConfig } from './musickit-config';
export const fetchLibrarySongs = (offset: number): Promise<any> => {
  return (window as any).MusicKit.getInstance().api.library.songs(null, { limit: 100, offset: offset });
}

export const fetchLibraryAlbums = (offset: number): Promise<any> => {
  return (window as any).MusicKit.getInstance().api.library.albums(null, { limit: 100, offset: offset });
}

export const fetchLibraryAlbum = (id: string): Promise<any> => {
  return (window as any).MusicKit.getInstance().api.library.album(id);
}

export const fetchAlbum = (id: string): Promise<any> => {
  return (window as any).MusicKit.getInstance().api.album(id);
}

export const fetchLibraryArtists = (offset: number): Promise<any> => {
  return (window as any).MusicKit.getInstance().api.library.artists(null, {
    limit: 100,
    offset: offset
  })
}

export const fetchLibraryArtist = (id: string): Promise<any> => {
  return (window as any).MusicKit.getInstance().api.library.artist(id, {
    include: 'albums'
  })
}

export const fetchArtist = (id: string): Promise<any> => {
  return (window as any).MusicKit.getInstance().api.artist(id, {
    include: 'playlists,albums',
    offset: '26'
  })
}

export const search = (query: string): Promise<any> => {
  const searchTypes = ['songs', 'albums', 'artists', 'playlists'];
  return (window as any).MusicKit.getInstance().api.search(query, {
    types: searchTypes,
    limit: 50
  })
}

export const searchLibrary = (query: string): Promise<any> => {
  const searchTypes = [
    'library-songs',
    'library-albums',
    'library-artists',
    'library-playlists'
  ];
  return (window as any).MusicKit.getInstance().api.library.search(query, {
    types: searchTypes,
    limit: 20
  })
}

export const fetchPlaylists = (offset: number): Promise<any> => {
  return (window as any).MusicKit.getInstance().api.library.playlists(null, {
    limit: 100,
    offset: offset
  })
}

export const fetchLibraryPlaylist = (id: string): Promise<any> => {
  return (window as any).MusicKit.getInstance().api.library.playlist(id);
}

export const fetchPlaylist = (id: string): Promise<any> => {
  return (window as any).MusicKit.getInstance().api.playlist(id);
}

export const fetchRecentlyAdded = (offset: number): Promise<any> => {
  return (window as any).MusicKit.getInstance().api.library.collection(
    'recently-added',
    null,
    { limit: 10, offset: offset }
  )
}

export const fetchRecommendations = (): Promise<any> => {
  return (window as any).MusicKit.getInstance().api.recommendations();
}

export const fetchRecentPlayed = (): Promise<any> => {
  return (window as any).MusicKit.getInstance().api.recentPlayed();
}

export const fetchHeavyRotation = (): Promise<any> => {
  return (window as any).MusicKit.getInstance().api.historyHeavyRotation();
}

export const fetchChart = (): Promise<any> => {
  const searchTypes = ['songs', 'albums', 'playlists'];
  return (window as any).MusicKit.getInstance().api.charts(null, {
    types: searchTypes,
    limit: 10
  })
}