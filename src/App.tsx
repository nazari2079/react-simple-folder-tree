import { FC } from "react";
import Folder from "./components/Folder";
import { FoldersProvider } from "./context/folderDataContext";

const App: FC = () => {
  return (
    <div className="p-10 max-w-[500px]">
      <FoldersProvider>
        <Folder />
      </FoldersProvider>
    </div>
  );
};

export default App;
