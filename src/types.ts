export type SortType = keyof Song | "none";

export type Song = {
  title: string;
  artist: string;
  album: string;
  song_length: string;
};

export type Playlist = {
  id: string;
  title: string;
  songs: Song[];
};
