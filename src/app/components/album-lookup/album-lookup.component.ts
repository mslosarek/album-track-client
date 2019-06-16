import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';

import { Observable, of, Subject } from 'rxjs';
import { mergeMap, tap, debounceTime, distinctUntilChanged } from 'rxjs/operators';

import { ModalDirective } from 'ngx-bootstrap/modal';

import { ApiService } from '../../services/api.service';

import { MusicbrainzAlbum } from '../../classes/musicbrainz-album';

@Component({
  selector: 'app-album-lookup',
  templateUrl: './album-lookup.component.html',
  styleUrls: ['./album-lookup.component.scss']
})
export class AlbumLookupComponent implements OnInit {
  @Output() selectAlbum = new EventEmitter<MusicbrainzAlbum>();
  @Input() artist: string;

  possibleAlbums: MusicbrainzAlbum[] = [];
  lookupForm: FormGroup = null;
  modal: ModalDirective;

  constructor(
    private apiService: ApiService,
  ) { }

  ngOnInit() {
    this.lookupForm = new FormGroup({
      artist: new FormControl(),
      albumTitle: new FormControl(),
    });

    this.lookupForm.valueChanges
    .pipe(
      debounceTime(300),
      distinctUntilChanged()
    )
    .subscribe(val => {
      this.performSearch(val.artist, val.albumTitle);
    });
  }

  search() {
    this.performSearch(this.lookupForm.value.artist, this.lookupForm.value.albumTitle);
  }

  performSearch(artist, albumTitle) {
    this.apiService.musicbrainzAlbumSearch(this.artist, albumTitle)
    .subscribe(albums => {
      this.possibleAlbums = albums;
    });
  }

  albumClick(album: MusicbrainzAlbum) {
    this.modal.hide();
    this.selectAlbum.emit(album);
  }

  setModal($event: ModalDirective) {
    this.modal = $event;
  }


}
