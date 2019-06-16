import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';

import { Album } from '../../classes/album';

import { AlbumService } from '../../services/album.service';

@Component({
  selector: 'app-album-detail',
  templateUrl: './album-detail.component.html',
  styleUrls: ['./album-detail.component.scss']
})
export class AlbumDetailComponent implements OnInit {
  @Input() album: Album = null;
  @Output() albumDelete = new EventEmitter<Album>();
  @Output() albumSave = new EventEmitter<Album>();

  editing = false;
  albumForm: FormGroup;
  conditions: string[] = [];

  constructor(
    private albumService: AlbumService,
  ) { }

  ngOnInit() {
    this.albumForm = this.albumService.getAlbumForm();

    this.conditions = this.albumService.getConditions();
  }

  toggleEdit(force) {
    if (force || !this.editing) {
      this.albumForm.patchValue(this.album);
      this.editing = true;
    } else {
      this.editing = false;
    }
  }

  saveAlbum() {
    this.albumSave.emit(this.albumForm.value);
    this.editing = false;
  }

  deleteAlbum(album) {
    this.albumDelete.emit(album);
  }

}
