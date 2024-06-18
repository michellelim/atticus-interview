import { useQuery } from "@tanstack/react-query";

import type { Song } from "../types";

type SongData = {
  songs: Song[];
};

export function useGetSongQuery() {
  return useQuery({
    queryFn: async (): Promise<SongData> => {
      const response = await fetch(
        "https://storage.googleapis.com/atticus-frontend-assessment/api/songs.json"
      );
      if (!response.ok) {
        throw new Error("Failed getting songs.");
      }
      return response.json();
    },
    queryKey: ["songs"],
  });
}
