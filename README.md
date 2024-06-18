## How to Run

1. Clone app
2. Install packages (`npm install`)
3. Run development server (`npm run dev`)
4. Open [http://localhost:5174](http://localhost:5174) to view it in the browser

## Documentation

On the main screen the input field is to create the playlist name. Once inputting text, hit submit to generate the playlist. The list of playlists display below it.
In the dropdown menu, the selected playlist name is the one that songs will be added to in the below table. Hit "Add" at the end of the song row to add that song to the playlist. You can view the playlist and its song in the above list.
You can view the artist page with all songs filtered by album by clicking the artist name in that column.

### Utils:

Within utils.ts, there are reusable functions for the entire app to use. I have a function for shuffleList which is used to randomize the order of the songs given back by the API but can be used for shuffling other types of array.

### Hooks:

I created a few custom hooks as I saw these as logic that can be reused.

- useGetSongQuery uses react-query to fetch from the given API to return the database of songs. It will throw an error if the response does not return properly so that the UI can handle it. I chose to use React query because its useful in handling error & loading states, retries, caching, etc.

- useLocalStorage abstracts out the use of local storage to persist data and handles setting its value. This is where I've used useEffect as generally it's useful in syncing with external systems.

- useSortSongs handles the sorting logic separately. This abstraction keeps the component clean and allows the logic to be reused in other components. Wrapping any functions in useCallback is recommended for custom hooks.

### State Management:

I'm using local storage for managing the created playlists and songs added to it. It also is a simple way to access persisted information globally. Perhaps I could have used react context instead but the added persistence was nice to have. In a real world application, I'd assume that there would instead be an API to grab that data and I could utilize caching from react-query, for example, to limit requests if it doesn't change often.

### Notes:

To display the use of memo, I've memoized SongList as well as the props (songs) that are passed to it. You'll see that SongList only re-renders from Playlist or Artist pages if songs is updated. However, since this is a small list of songs, it's probably not necessary to optimize for rendering as React generally does a good job at doing so and there is overhead in using such functions. A lot of the memoization done in this project was just to demonstrate that I know how to use the function.

### Optimizations:

Here are some optimizations if I had more time:

- Overall styling and responsiveness can all be improved. Addition of icons.
- Display some UI to show that songs have been added to the playlist (eg. via a toast notification). Also would be nice to prevent the same song from being added. Currently it does not check for that.
- If shuffle is enabled in the playlist, you will not see the sorting update until you turn that off. This should be better handled.
- Better loading and error states to be reused across the app. I might have added a toast notification for errors instead of having the entire UI go down so at least the UI stays in tact. Add error boundaries for added error handling.
- SongList could be more flexible with what fields to display. For example, in the Artist page, we probably do not need to show Artist in the SongList table.
- Better accessibility
- Navigation back to Home page
- Add testing
