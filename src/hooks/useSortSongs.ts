import type { ChangeEvent } from "react";
import { useCallback, useMemo, useState } from "react";

import type { Options } from "../components/Dropdown";
import type { Song, SortType } from "../types";

export default function useSortSongs({
  originalSongs,
}: {
  originalSongs: Song[];
}) {
  const [sortType, setSortType] = useState<SortType>("none");

  const sortOptions: Options[] = useMemo(
    () => [
      { value: "none", text: "None" },
      { value: "artist", text: "Artist" },
      { value: "album", text: "Album" },
      { value: "title", text: "Title" },
      { value: "song_length", text: "Duration" },
    ],
    []
  );

  const sortedList = useMemo(() => {
    const sortSongList = <T extends Song>(list: T[], sortBy: SortType): T[] => {
      if (sortBy === "none") {
        return list;
      }
      const sortedList = list.slice().sort((a, b) => {
        if (sortBy === "song_length") {
          return Number(a[sortBy]) - Number(b[sortBy]);
        }
        return a[sortBy].localeCompare(b[sortBy]);
      });
      return sortedList;
    };

    return sortSongList(originalSongs, sortType);
  }, [originalSongs, sortType]);

  const onSortChange = useCallback((ev: ChangeEvent<HTMLSelectElement>) => {
    setSortType(ev.target.value as SortType);
  }, []);

  return {
    onSortChange,
    sortOptions,
    sortedList,
    sortType,
  };
}
