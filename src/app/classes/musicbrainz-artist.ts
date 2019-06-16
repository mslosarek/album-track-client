export class MusicbrainzArtist {
  id: string;
  name: string;
  lifespan: {
    begin?: string;
    end?: string;
    ended?: boolean;
  };
  country?: string;
}
