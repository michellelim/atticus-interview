import type { Dispatch, SetStateAction } from "react";
import { memo } from "react";
import { Link } from "react-router-dom";

import type { Playlist, Song } from "../types";

type SongListProps = {
  songs: Song[];
  playlistIdToAdd?: string;
  playlists?: Playlist[];
  setPlaylists?: Dispatch<SetStateAction<Playlist[]>>;
};

export default memo(function SongList({
  songs = [],
  playlists,
  playlistIdToAdd,
  setPlaylists,
}: SongListProps) {
  if (songs.length === 0) {
    return <div>There are no songs</div>;
  }

  const addToPlaylist = (song: Song) => {
    const updatedPlaylists =
      playlists?.map((playlist) => {
        if (playlist.id === playlistIdToAdd) {
          return {
            ...playlist,
            songs: [...playlist.songs, song],
          };
        }
        return playlist;
      }) ?? [];
    if (setPlaylists) {
      setPlaylists(updatedPlaylists);
    }
  };

  return (
    <div className="overflow-x-auto">
      <table className="table">
        <thead>
          <tr>
            <th>#</th>
            <th className="min-w-8 box-content"></th>
            <th>Title</th>
            <th>Artist</th>
            <th>Album</th>
            <th>Duration</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {songs.map((song, index) => (
            <tr key={`${song}_${index}`} className="hover:bg-slate-100">
              <th>{index + 1}</th>
              <td>
                <img
                  src=""
                  alt={`${song.album} art`}
                  className="w-8 h-8 object-cover bg-black"
                />
              </td>
              <td>{song.title}</td>
              <td>
                <Link to={`/artist/${song.artist}`} className="hover:underline">
                  {song.artist}
                </Link>
              </td>
              <td>{song.album}</td>
              <td>{song.song_length}</td>
              <td>
                {playlistIdToAdd && (
                  <button className="btn" onClick={() => addToPlaylist(song)}>
                    Add
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
});
