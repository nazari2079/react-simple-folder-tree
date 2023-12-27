import { FC } from "react";
import Folder from "./components/Folder";
import { FoldersProvider } from "./context/folderDataContext";
import { FolderDataType } from "./types";
import "./index.css";

type FolderTreePropsType = {
  data: FolderDataType;
};
const FolderTree: FC<FolderTreePropsType> = (props) => {
  return (
    <FoldersProvider data={props.data}>
      <Folder />
    </FoldersProvider>
  );
};

export default FolderTree;
