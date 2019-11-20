import { musickitConfig } from './musickit-config';
class MusickitService {
  fetchLibrarySongs(offset: number): Promise<any> {
    return musickitConfig.musicKit.api.library.songs(null, { limit: 100, offset: offset });
  }

  fetchLibraryAlbums(offset: number): Promise<any> {
    return musickitConfig.musicKit.api.library.albums(null, { limit: 100, offset: offset });
  }

  fetchLibraryAlbum(id: string): Promise<any> {
    return musickitConfig.musicKit.api.library.album(id);
  }

  fetchAlbum(id: string): Promise<any> {
    return musickitConfig.musicKit.api.album(id);
  }

  fetchLibraryArtists(offset: number): Promise<any> {
    return musickitConfig.musicKit.api.library.artists(null, {
      limit: 100,
      offset: offset
    })
  }

  fetchLibraryArtist(id: string): Promise<any> {
    return musickitConfig.musicKit.api.library.artist(id, {
      include: 'albums'
    })
  }

  fetchArtist(id: string): Promise<any> {
    return musickitConfig.musicKit.api.artist(id, {
      include: 'playlists,albums',
      offset: '26'
    })
  }

  search(query: string): Promise<any> {
    const searchTypes = ['songs', 'albums', 'artists', 'playlists'];
    return  musickitConfig.musicKit.api.search(query, {
      types: searchTypes,
      limit: 50
    })
  }

  searchLibrary(query: string): Promise<any> {
    const searchTypes = [
      'library-songs',
      'library-albums',
      'library-artists',
      'library-playlists'
    ];
    return musickitConfig.musicKit.api.library.search(query, {
      types: searchTypes,
      limit: 20
    })
  }

  fetchPlaylists(offset: number): Promise<any> {
    return musickitConfig.musicKit.api.library.playlists(null, {
      limit: 100,
      offset: offset
    })
  }

  fetchLibraryPlaylist(id: string): Promise<any> {
    return musickitConfig.musicKit.api.library.playlist(id);
  }

  fetchPlaylist(id: string): Promise<any> {
    return musickitConfig.musicKit.api.playlist(id);
  }

  fetchRecentlyAdded(offset: number): Promise<any> {
    return musickitConfig.musicKit.api.library.collection(
      'recently-added',
      null,
      { limit: 10, offset: offset }
    )
  }

  fetchRecommendations(): Promise<any> {
    return musickitConfig.musicKit.api.recommendations();
  }

  fetchRecentPlayed(): Promise<any> {
    return musickitConfig.musicKit.api.recentPlayed();
  }

  fetchHeavyRotation(): Promise<any> {
    return musickitConfig.musicKit.api.historyHeavyRotation();
  }

  fetchChart(): Promise<any> {
    const searchTypes = ['songs', 'albums', 'playlists'];
    return musickitConfig.musicKit.api.charts(null, {
      types: searchTypes,
      limit: 10
    })
  }

}
export const musicKitService = new MusickitService();
