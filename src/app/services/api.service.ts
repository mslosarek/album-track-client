import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { map, delay, catchError } from 'rxjs/operators';

import { HttpClient } from '@angular/common/http';

import { MusicbrainzArtist } from '../classes/musicbrainz-artist';
import { MusicbrainzAlbum } from '../classes/musicbrainz-album';

import { Artist } from '../classes/artist';
import { Album } from '../classes/album';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(
    private http: HttpClient,
  ) { }

  musicbrainzArtistSearch(name: string): Observable<MusicbrainzArtist[]> {
    return this.http.post<MusicbrainzArtist[]>(environment.apiUrl + '/musicbrainz/artists', {
      name,
    });
  }

  musicbrainzAlbumSearch(artist: string, title: string): Observable<MusicbrainzAlbum[]> {
    return this.http.post<MusicbrainzAlbum[]>(environment.apiUrl + '/musicbrainz/albums', {
      artist,
      title,
    });
  }

  getArtists(): Observable<Artist[]> {
    return this.http.get<Artist[]>(environment.apiUrl + '/artists')
    .pipe(
      map(artists => {
        return artists.map(artist => {
          artist.years = artist.albums.map(album => album.year);

          artist.years = Array.from(new Set(artist.years));
          artist.years.sort();

          return artist;
        });
      })
    );
  }

  updateArtist(artistId: string, updatedValues: Artist): Observable<Artist> {
    return this.http.put<Artist>(environment.apiUrl + '/artists/' + artistId, updatedValues);
  }

  addArtist(artist: Artist): Observable<Artist> {
    return this.http.post<Artist>(environment.apiUrl + '/artists', artist);
  }

  deleteArtist(artistId: string): Observable<boolean> {
    return this.http.delete<string>(environment.apiUrl + '/artists/' + artistId)
    .pipe(
      map(() => {
        return true;
      }),
      catchError(err => {
        return of(false);
      })
    );
  }

  addAlbum(artistId: string, album: Album): Observable<Artist> {
    return this.http.post<Artist>(environment.apiUrl + '/artists/' + artistId + '/albums', album);
  }

  saveAlbum(artistId: string, albumId: string, album: Album): Observable<Artist> {
    return this.http.put<Artist>(environment.apiUrl + '/artists/' + artistId + '/albums/' + albumId, album);
  }

  deleteAlbum(artistId: string, albumId: string): Observable<boolean> {
    return this.http.delete<string>(environment.apiUrl + '/artists/' + artistId + '/albums/' + albumId)
    .pipe(
      map(() => {
        return true;
      }),
      catchError(err => {
        return of(false);
      })
    );
  }
}
