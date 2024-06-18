import type { Dispatch, SetStateAction } from "react";
import { useState } from "react";

import type { Playlist } from "../types";

type CreatePlaylistProps = {
  onSubmit: Dispatch<SetStateAction<Playlist[]>>;
};

export default function CreatePlaylist(props: CreatePlaylistProps) {
  const { onSubmit } = props;
  const [title, setTitle] = useState("");

  const handleOnClick = () => {
    const id = Date.now().toString();
    onSubmit((prev) => [...prev, { title, id, songs: [] }]);
    setTitle("");
  };

  return (
    <>
      <label className="input input-bordered flex items-center gap-2 mb-2">
        Title
        <input
          type="text"
          name="title"
          className="grow"
          placeholder="Playlist title"
          value={title}
          onChange={(ev) => setTitle(ev.target.value)}
        />
      </label>
      <button
        className="btn btn-primary"
        disabled={title.trim().length === 0}
        onClick={handleOnClick}
      >
        Create a playlist
      </button>
    </>
  );
}
