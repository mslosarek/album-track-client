import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { NgxSpinnerModule } from 'ngx-spinner';

// ngx-bootstrap
import { TypeaheadModule } from 'ngx-bootstrap/typeahead';
import { ModalModule } from 'ngx-bootstrap/modal';

// pages
import { HomeComponent } from './pages/home/home.component';

// components
import { AlbumLookupComponent } from './components/album-lookup/album-lookup.component';
import { ArtistListComponent } from './components/artist-list/artist-list.component';
import { ArtistDetailComponent } from './components/artist-detail/artist-detail.component';
import { AlbumDetailComponent } from './components/album-detail/album-detail.component';
import { InlineEditableComponent } from './components/inline-editable/inline-editable.component';
import { SpinnerComponent } from './components/spinner/spinner.component';
import { AddArtistComponent } from './components/add-artist/add-artist.component';
import { AddAlbumComponent } from './components/add-album/add-album.component';
import { DeleteArtistComponent } from './components/delete-artist/delete-artist.component';
import { DeleteAlbumComponent } from './components/delete-album/delete-album.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    AlbumLookupComponent,
    ArtistListComponent,
    ArtistDetailComponent,
    AlbumDetailComponent,
    InlineEditableComponent,
    SpinnerComponent,
    AddArtistComponent,
    AddAlbumComponent,
    DeleteArtistComponent,
    DeleteAlbumComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    AppRoutingModule,
    NgxSpinnerModule,
    TypeaheadModule.forRoot(),
    ModalModule.forRoot(),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
