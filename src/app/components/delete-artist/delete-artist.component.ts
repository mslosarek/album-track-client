import { Component, Input, ViewChild, ElementRef, OnInit, Output, EventEmitter } from '@angular/core';

import { ModalDirective } from 'ngx-bootstrap/modal';

import { Artist } from '../../classes/artist';

@Component({
  selector: 'app-delete-artist',
  templateUrl: './delete-artist.component.html',
  styleUrls: ['./delete-artist.component.scss']
})
export class DeleteArtistComponent implements OnInit {
  @Output() delete = new EventEmitter<Artist>();
  @Input() artist: Artist;
  @ViewChild('staticModal') staticModal: ModalDirective;

  constructor() { }

  ngOnInit() {
  }

  promptDelete() {
    this.staticModal.show();
  }

}
