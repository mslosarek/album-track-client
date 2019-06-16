import {
  Component,
  OnInit,
  OnChanges,
  SimpleChanges,
  Input,
  Output,
  EventEmitter,
  ViewChild,
  ElementRef
} from '@angular/core';

import { Artist } from '../../classes/artist';
import { Album } from '../../classes/album';

import { UtilitiesService } from '../../services/utilities.service';

@Component({
  selector: 'app-artist-detail',
  templateUrl: './artist-detail.component.html',
  styleUrls: ['./artist-detail.component.scss']
})
export class ArtistDetailComponent implements OnInit, OnChanges {
  @Input() artist: Artist = null;
  @Output() edit = new EventEmitter<Artist>();
  @Output() delete = new EventEmitter<Artist>();
  @Output() deleteAlbum = new EventEmitter<Album>();
  @Output() saveAlbum = new EventEmitter<Album>();
  @Output() addAlbum = new EventEmitter<Album>();

  @ViewChild('artistDetail') artistDetail: ElementRef;

  editField: string = null;
  editValueName: string;

  constructor(
    private utils: UtilitiesService,
  ) { }

  ngOnInit() {
  }

  ngOnChanges(changes: SimpleChanges) {
    setTimeout(() => {
      if (this.artistDetail) {
        this.artistDetail.nativeElement.scrollIntoView({
          // behavior: 'smooth',
          block: 'start',
        });
      }
    }, 100);
  }

  getMostUsedWordFromAlbumTitles() {
    return this.utils.getMostUsedWordFromAlbumTitles(this.artist.albums);
  }

  albumAdd(album: Album) {
    this.addAlbum.emit(album);
  }

  saveArtistName(name: string) {
    this.edit.emit({
      name,
    });
  }

  artistDelete(artist: Artist) {
    this.delete.emit(artist);
  }

  albumDelete(album: Album) {
    this.deleteAlbum.emit(album);
  }

  albumSave(album: Album) {
    this.saveAlbum.emit(album);
  }

}
