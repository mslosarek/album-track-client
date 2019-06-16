import { Component, Input, ViewChild, ElementRef, OnInit, Output, EventEmitter } from '@angular/core';

import { ModalDirective } from 'ngx-bootstrap/modal';

import { Album } from '../../classes/album';

@Component({
  selector: 'app-delete-album',
  templateUrl: './delete-album.component.html',
  styleUrls: ['./delete-album.component.scss']
})
export class DeleteAlbumComponent implements OnInit {
  @Output() delete = new EventEmitter<Album>();
  @Input() album: Album;
  @ViewChild('staticModal') staticModal: ModalDirective;

  constructor() { }

  ngOnInit() {
  }

  promptDelete() {
    this.staticModal.show();
  }

}
