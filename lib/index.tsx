import { FC } from "react";
import Folder from "./components/Folder";
import { FoldersProvider } from "./context/folderDataContext";
import { FolderInitialDataType } from "./types";
import "./index.css";

type FolderTreePropsType = {
  data: FolderInitialDataType;
};
const FolderTree: FC<FolderTreePropsType> = (props) => {
  return (
    <FoldersProvider data={props.data}>
      <Folder />
    </FoldersProvider>
  );
};

export default FolderTree;
