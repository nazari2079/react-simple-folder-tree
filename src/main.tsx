import React from "react";
import ReactDOM from "react-dom/client";
import FolderTree from "../lib";
import foldersInitialData from "./data/foldersInitialData.json";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <div className="p-10 max-w-[500px]">
      <FolderTree data={foldersInitialData} />
    </div>
  </React.StrictMode>
);
