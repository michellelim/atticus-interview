import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider, createBrowserRouter } from "react-router-dom";

import PageContainer from "./components/PageContainer";
import ArtistPage from "./pages/Artist";
import Home from "./pages/Home";
import Playlist from "./pages/Playlist";
import "./index.css";

const queryClient = new QueryClient();
const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
    errorElement: (
      <PageContainer>
        <h1 className="text-4xl font-semibold">Page Not Found</h1>
      </PageContainer>
    ),
  },
  { path: "/artist/:artistName", element: <ArtistPage /> },
  { path: "/playlist/:id", element: <Playlist /> },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  </React.StrictMode>
);
