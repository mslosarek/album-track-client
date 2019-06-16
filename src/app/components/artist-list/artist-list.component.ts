import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

import { ExportToCsv } from 'export-to-csv';

import { Artist } from '../../classes/artist';

import { ApiService } from '../../services/api.service';
import { UtilitiesService } from '../../services/utilities.service';

@Component({
  selector: 'app-artist-list',
  templateUrl: './artist-list.component.html',
  styleUrls: ['./artist-list.component.scss']
})
export class ArtistListComponent implements OnInit {
  @Input() artists: Artist[] = [];
  @Input() addable = false;
  @Input() selectedArtist: Artist = null;
  @Output() selectArtist = new EventEmitter<Artist>();

  artistFilter = '';

  sortKey = 'name';
  sortDir = 1;

  constructor(
    private apiService: ApiService,
    private utils: UtilitiesService,
  ) { }

  ngOnInit() {
  }

  getArtists(): Artist[] {
    const fuzzy = (hay, s) => {
      hay = hay.toLowerCase();
      s = s.toLowerCase().split('');
      let n = -1;

      for (const l of s) {
        n = hay.indexOf(l, n + 1);
        if (n === -1) {
          return false;
        }
      }
      return true;
    };

    if (!this.artistFilter) {
      return [...this.artists];
    }

    return [...this.artists].filter(artist => {
      return fuzzy(artist.name, this.artistFilter);
    });


  }

  sortArtists(): Artist[] {
    const artists = this.getArtists();

    if (this.sortKey === 'album_count') {
      return artists.sort((a, b) => a.albums.length <= b.albums.length ? -1 * this.sortDir : 1 * this.sortDir);
    }

    if (this.sortKey === 'years_active' && this.sortDir === 1) {
      return artists.sort((a, b) => {
        if (a.years[0] === b.years[0]) {
          // if they have the same first year, sort by the last year
          return a.years[a.years.length - 1] <= b.years[b.years.length - 1] ? -1 : 1;
        }
        return a.years[0] <= b.years[0] ? -1 : 1;
      });
    }

    if (this.sortKey === 'years_active' && this.sortDir === -1) {
      return artists.sort((a, b) => {
        if (a.years[a.years.length - 1] === b.years[b.years.length - 1]) {
          // if they have the same last year, sort by the first year
          return a.years[0] <= b.years[0] ? 1 : -1;
        }

        return a.years[a.years.length - 1] <= b.years[b.years.length - 1] ? 1 : -1;
      });
    }

    return artists.sort((a, b) => this.sortDir * ('' + a[this.sortKey]).localeCompare( b[this.sortKey]));
  }

  addArtist(artist: Artist) {
    this.apiService.addArtist(artist)
    .subscribe(a => {
      this.artists.push(a);
      this.selectArtist.emit(a);
    });
  }

  toggleSort(key: string) {
    if (this.sortKey === key) {
      this.sortDir = -1 * this.sortDir;
    } else {
      this.sortKey = key;
      this.sortDir = 1;
    }
  }

  exportToCSV() {
    const data = this.artists.map(artist => {
      const yearRange = [];
      if (artist.years && artist.years.length) {
        yearRange.push(artist.years[0]);
      }
      if (artist.years && artist.years.length > 1) {
        yearRange.push(artist.years[artist.years.length - 1]);
      }

      const wordCounts = this.utils.getMostUsedWordFromAlbumTitles(artist.albums).map(word => word[0]);

      return {
        name: artist.name,
        album_count: (artist.albums || []).length,
        year_range: yearRange.join('-'),
        common_words: wordCounts.join(', '),
      };
    });

    const options = {
      fieldSeparator: ',',
      quoteStrings: '"',
      filename: 'artist_export_' + new Date().getTime(),
      showLabels: true,
      useKeysAsHeaders: false,
      headers: [
        'Artist',
        '# Of Albums',
        'Record Year Range',
        'Common Words',
      ],
    };

    const csvExporter = new ExportToCsv(options);

    csvExporter.generateCsv(data);
  }

}
