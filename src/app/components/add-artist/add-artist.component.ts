import { Component, ViewChild, ElementRef, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';

import { Observable, of, Subject } from 'rxjs';
import { mergeMap, tap, debounceTime, distinctUntilChanged } from 'rxjs/operators';

import { Artist } from '../../classes/artist';
import { MusicbrainzArtist } from '../../classes/musicbrainz-artist';

import { ModalDirective } from 'ngx-bootstrap/modal';

import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-add-artist',
  templateUrl: './add-artist.component.html',
  styleUrls: ['./add-artist.component.scss']
})
export class AddArtistComponent implements OnInit {
  @Output() saveArtist = new EventEmitter<Artist>();
  @Input() name: string = null;

  possibleArtists: MusicbrainzArtist[] = [];
  artistForm: FormGroup = null;

  @ViewChild('staticModal') staticModal: ModalDirective;
  @ViewChild('nameInput') nameInput: ElementRef;

  constructor(
    private apiService: ApiService,
  ) { }

  ngOnInit() {
    this.artistForm = new FormGroup({
      name: new FormControl(),
    });

    this.artistForm.valueChanges
    .pipe(
      debounceTime(300),
      distinctUntilChanged()
    )
    .subscribe(val => {
      this.performSearch(val.name);
    });
  }

  performSearch(artist) {
    if (!artist) {
      this.possibleArtists = [];
      return;
    }
    this.apiService.musicbrainzArtistSearch(artist)
    .subscribe(albums => {
      this.possibleArtists = albums;
    });
  }

  onSubmit() {
    this.staticModal.hide();
    this.addArtist({
      name: this.artistForm.value.name,
    });
  }

  addArtist(artist: Artist) {
    this.saveArtist.emit(artist);
  }

  artistClick(artist: MusicbrainzArtist) {
    this.staticModal.hide();
    this.addArtist({
      id: artist.id,
      name: artist.name,
    });
  }

  showModal() {
    this.artistForm.setValue({
      name: this.name || '',
    });
    this.staticModal.show();
  }


  // setModal($event: ModalDirective) {
  //   this.modal = $event;
  // }


}
