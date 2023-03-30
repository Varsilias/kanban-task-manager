import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { RouterProvider } from "react-router-dom";
import { router } from "./routes";
import "./index.css";
import {
  ThemeContextProvider,
  BoardContextProvider,
  FullScreenContextProvider,
} from "./context/";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <FullScreenContextProvider>
      <ThemeContextProvider>
        <BoardContextProvider>
          <RouterProvider router={router} />
        </BoardContextProvider>
      </ThemeContextProvider>
    </FullScreenContextProvider>
  </React.StrictMode>
);
