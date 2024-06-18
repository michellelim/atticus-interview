import { useMemo } from "react";
import { useParams } from "react-router-dom";

import PageHeader from "../components/PageHeader";
import PageContainer from "../components/PageContainer";
import SongList from "../components/SongList";
import { useGetSongQuery } from "../hooks/useGetSongQuery";
import type { Song } from "../types";

export default function Artist() {
  const { artistName = "" } = useParams<{ artistName: string }>();
  const { data, error, isError, isPending } = useGetSongQuery();

  const songsByArtist = useMemo(() => {
    return (data?.songs ?? []).filter((song) => song.artist === artistName);
  }, [artistName, data?.songs]);

  const groupedSongs = useMemo(() => {
    return songsByArtist.reduce<Record<string, Song[]>>((acc, song) => {
      if (!acc[song.album]) {
        acc[song.album] = [];
      }
      acc[song.album].push(song);
      return acc;
    }, {});
  }, [songsByArtist]);

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

  return (
    <PageContainer>
      <PageHeader title={artistName} />
      {Object.keys(groupedSongs).map((album) => (
        <div key={album} className="py-4 px-2">
          <h2 className="text-2xl font-medium mb-1">{album}</h2>
          <SongList songs={groupedSongs[album]} />
        </div>
      ))}
    </PageContainer>
  );
}
