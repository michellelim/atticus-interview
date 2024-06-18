import { ChangeEvent, useEffect, useState } from "react";
import CreatePlaylist from "../components/CreatePlaylist";
import PageContainer from "../components/PageContainer";
import PageHeader from "../components/PageHeader";
import Playlists from "../components/Playlists";
import SongList from "../components/SongList";
import Dropdown from "../components/Dropdown";
import { useGetSongQuery } from "../hooks/useGetSongQuery";
import { useLocalStorage } from "../hooks/useLocalStorage";
import type { Playlist } from "../types";

export default function Home() {
  const [playlistToAdd, setPlaylistToAdd] = useState<string>("");
  const { data, error, isError, isPending } = useGetSongQuery();
  const songs = data?.songs ?? [];
  const [playlists, setPlaylists] = useLocalStorage<Playlist[]>(
    "playlists",
    []
  );

  useEffect(() => {
    if (!playlistToAdd && playlists.length) {
      setPlaylistToAdd(playlists[0].id);
    }
  }, [playlists, playlistToAdd]);

  if (isPending) {
    return (
      <PageContainer>
        <span className="loading loading-dots loading-lg"></span>
      </PageContainer>
    );
  }

  if (isError) {
    return (
      <PageContainer>
        <p>Oops something went wrong. {error.message}</p>
      </PageContainer>
    );
  }

  const onChange = (ev: ChangeEvent<HTMLSelectElement>) => {
    setPlaylistToAdd(ev.target.value);
  };

  const options = playlists.map((playlist) => {
    return { value: playlist.id, text: playlist.title };
  });

  return (
    <PageContainer>
      <PageHeader title="Welcome back!" />
      <div className="py-4">
        <CreatePlaylist onSubmit={setPlaylists} />
        {playlists.length > 0 && <Playlists playlists={playlists} />}
      </div>
      <div>
        <h2 className="text-2xl font-semibold mb-2">List of Songs</h2>
        <h3 className="text-xl">Playlist to add songs to:</h3>
        <Dropdown onChange={onChange} value={playlistToAdd} options={options} />
      </div>
      <SongList
        songs={songs}
        playlistIdToAdd={playlistToAdd}
        setPlaylists={setPlaylists}
        playlists={playlists}
      />
    </PageContainer>
  );
}
