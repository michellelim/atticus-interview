import { useMemo, useState } from "react";
import { useParams } from "react-router-dom";

import PageContainer from "../components/PageContainer";
import PageHeader from "../components/PageHeader";
import SongList from "../components/SongList";
import Dropdown from "../components/Dropdown";
import { useLocalStorage } from "../hooks/useLocalStorage";
import useSortSongs from "../hooks/useSortSongs";
import type { Playlist } from "../types";
import { shuffleList } from "../utils";

export default function Playlist() {
  const { id } = useParams<{ id: string }>();
  const [playlists] = useLocalStorage<Playlist[]>("playlists", []);
  const currPlaylist = useMemo(
    () => playlists.filter((playlist) => playlist.id === id)[0],
    [playlists, id]
  );
  const [isShuffleOn, setIsShuffleOn] = useState(false);

  const orderedSongsToPlay = useMemo(() => {
    return isShuffleOn ? shuffleList(currPlaylist.songs) : currPlaylist.songs;
  }, [isShuffleOn, currPlaylist.songs]);

  const { onSortChange, sortOptions, sortType, sortedList } = useSortSongs({
    originalSongs: currPlaylist.songs,
  });

  const toggleShuffle = () => {
    setIsShuffleOn(!isShuffleOn);
  };

  return (
    <PageContainer>
      <PageHeader title={currPlaylist.title} />
      <div className="flex items-center w-full">
        <div className="flex gap-2 grow items-center">
          <button className="btn btn-sm" onClick={toggleShuffle}>
            {isShuffleOn ? "Disable Shuffle" : "Enable Shuffle"}
          </button>
        </div>
        <Dropdown
          onChange={onSortChange}
          value={sortType}
          options={sortOptions}
        />
      </div>
      <SongList songs={isShuffleOn ? orderedSongsToPlay : sortedList} />
    </PageContainer>
  );
}
