import { Component, OnInit } from '@angular/core';
import { map } from 'rxjs/operators';

import { ApiService } from '../../services/api.service';
import { SpinnerService } from '../../services/spinner.service';

import { Artist } from '../../classes/artist';
import { Album } from '../../classes/album';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  selectedArtist: Artist = null;
  artists: Artist[] = [];

  sortKey = 'name';
  sortDir = 1;

  constructor(
    private apiService: ApiService,
    private spinner: SpinnerService,
  ) { }

  ngOnInit() {
    this.loadArtists();
  }

  loadArtists() {
    this.spinner.show();
    this.apiService.getArtists()
    .subscribe(artists => {
      this.artists = artists;
      if (this.selectedArtist) {
        const selectedArtistId = this.selectedArtist.id;
        this.selectedArtist = null;
        this.selectedArtist = this.artists.find(a => a.id === selectedArtistId);
      }
      this.spinner.hide();
    });
  }

  selectArtist(artist: Artist) {
    this.selectedArtist = artist;
  }

  saveArtist(updatedValues: Artist) {
    this.spinner.show();
    this.apiService.updateArtist(this.selectedArtist.id, updatedValues)
    .subscribe(updatedArtist => {
      const originalArtist = this.artists.find(artist => artist.id === this.selectedArtist.id);
      Object.assign(originalArtist, updatedArtist);
      this.spinner.hide();
    });
  }

  deleteArtist(artist: Artist) {
    this.spinner.show();
    this.apiService.deleteArtist(artist.id)
    .subscribe(success => {
      this.selectedArtist = null;
      if (success) {
        this.loadArtists();
      }
      this.spinner.hide();
    });
  }

  deleteAlbum(artist: Artist, album: Album) {
    this.spinner.show();
    this.apiService.deleteAlbum(artist.id, album.id)
    .subscribe(success => {
      this.selectedArtist.albums = this.selectedArtist.albums.filter(a => {
        return a.id !== album.id;
      });
      if (success) {
        this.loadArtists();
      }
      this.spinner.hide();
    });
  }

  addAlbum(artist: Artist, album: Album) {
    this.spinner.show();
    this.apiService.addAlbum(artist.id, album)
    .subscribe((updatedArtist: Artist) => {
      this.selectedArtist.albums = updatedArtist.albums;
      this.loadArtists();
      this.spinner.hide();
    });
  }

  saveAlbum(artist: Artist, album: Album) {
    this.spinner.show();
    this.apiService.saveAlbum(artist.id, album.id, album)
    .subscribe((updatedArtist: Artist) => {
      Object.assign(this.selectedArtist, updatedArtist);
      // this.selectedArtist.albums = updatedArtist.albums;
      this.loadArtists();
      this.spinner.hide();
    });
  }

}
