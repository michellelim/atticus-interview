import { Link } from "react-router-dom";

import { Playlist } from "../types";

export default function Playlists({ playlists }: { playlists: Playlist[] }) {
  return (
    <section>
      <h2 className="text-2xl font-semibold mt-4">Playlists</h2>
      <ul className="flex flex-col gap-3 mt-2">
        {playlists.map(({ id, title }) => (
          <li key={id}>
            <Link className="hover:underline" to={`/playlist/${id}`}>
              {title}
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
