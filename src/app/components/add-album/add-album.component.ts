import { Component, ViewChild, ElementRef, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';

import { Observable, of, Subject } from 'rxjs';
import { mergeMap, tap, debounceTime, distinctUntilChanged } from 'rxjs/operators';

import { Album } from '../../classes/album';
import { Artist } from '../../classes/artist';

import { MusicbrainzArtist } from '../../classes/musicbrainz-artist';
import { MusicbrainzAlbum } from '../../classes/musicbrainz-album';

import { ModalDirective } from 'ngx-bootstrap/modal';

import { ApiService } from '../../services/api.service';
import { AlbumService } from '../../services/album.service';

@Component({
  selector: 'app-add-album',
  templateUrl: './add-album.component.html',
  styleUrls: ['./add-album.component.scss']
})
export class AddAlbumComponent implements OnInit {
  @Input() artist: Artist = null;
  @Output() saveAlbum = new EventEmitter<Album>();

  possibleAlbums: MusicbrainzAlbum[] = [];
  albumForm: FormGroup = null;
  conditions: string[] = [];

  @ViewChild('staticModal') staticModal: ModalDirective;
  @ViewChild('nameInput') nameInput: ElementRef;

  constructor(
    private apiService: ApiService,
    private albumService: AlbumService,
  ) { }

  ngOnInit() {
    this.conditions = this.albumService.getConditions();

    this.albumForm = this.albumService.getAlbumForm();

    this.albumForm.valueChanges
    .pipe(
      debounceTime(300),
      distinctUntilChanged()
    )
    .subscribe(val => {
      this.performSearch(val.title);
    });
  }

  performSearch(album) {
    if (!album) {
      this.possibleAlbums = [];
      return;
    }
    this.apiService.musicbrainzAlbumSearch(this.artist.name, album)
    .subscribe(albums => {
      this.possibleAlbums = albums;
    });
  }

  onSubmit() {
    this.staticModal.hide();
    this.addAlbum(this.albumForm.value);
  }

  addAlbum(album: Album) {
    this.saveAlbum.emit(album);
  }

  albumClick(album: MusicbrainzAlbum) {
    this.albumForm.patchValue(album);
  }

  showModal() {
    this.albumForm.patchValue({
      title: '',
      year: '',
      condition: '',
    });
    this.possibleAlbums = [];
    this.staticModal.show();
  }
}
