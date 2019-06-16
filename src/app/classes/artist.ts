import { Album } from './album';

export class Artist {
  id?: string;
  name?: string;
  albums?: Album[];
  years?: string[] | number[];
  albumCount?: number;
}
