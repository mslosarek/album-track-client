import { Injectable } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class AlbumService {

  constructor() { }

  getAlbumForm(): FormGroup {
    return new FormGroup({
      id: new FormControl(''),
      title: new FormControl('', Validators.required),
      year: new FormControl('', Validators.required),
      condition: new FormControl('', Validators.required),
    });
  }

  getConditions(): string[] {
    return [
      'Mint',
      'Near Mint',
      'Very Good Plus',
      'Very Good',
      'Good Plus',
      'Good',
      'Fair',
      'Poor'
    ];
  }
}
