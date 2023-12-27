import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useContext,
  useState,
} from "react";
import { FolderDataType } from "../types";

type ContextValueType = {
  folders: FolderDataType;
  setFolders: Dispatch<SetStateAction<FolderDataType>>;
  removeFolder: (id: number) => void;
  updateFolderName: (id: number, newName: string) => void;
  addNewFolder: (parentId: number, isFolder: boolean, name: string) => void;
};

export const foldersContext = createContext<ContextValueType>({
  folders: {
    id: 1,
    name: "",
    isFolder: true,
  },
  setFolders: () => {},
  removeFolder: () => {},
  updateFolderName: () => {},
  addNewFolder: () => {},
});

type ProviderPropsType = {
  data: FolderDataType;
  children: ReactNode;
};
export const FoldersProvider = (props: ProviderPropsType) => {
  const [folders, setFolders] = useState<FolderDataType>(props.data);

  const editNode = (
    id: number,
    createNewNode: (currentNode: FolderDataType) => any,
    node?: FolderDataType
  ) => {
    const currentNode = node || folders;
    if (currentNode.id === id) {
      return createNewNode(currentNode);
    }
    const child: any = currentNode.children?.map((obj) => {
      return editNode(id, createNewNode, obj);
    });
    return { ...currentNode, children: child };
  };

  const removeFolder = (id: number) => {
    setFolders(editNode(id, () => ({})));
  };

  const updateFolderName = (id: number, newName: string) => {
    setFolders(
      editNode(id, (currentNode) => ({ ...currentNode, name: newName }))
    );
  };

  const addNewFolder = (parentId: number, isFolder: boolean, name: string) => {
    setFolders(
      editNode(parentId, (currentNode) => ({
        ...currentNode,
        children: [
          ...(currentNode as any)?.children,
          { id: Date.now(), name, isFolder, children: [] },
        ],
      }))
    );
  };

  const contextValue = {
    folders,
    setFolders,
    removeFolder,
    updateFolderName,
    addNewFolder,
  };

  return (
    <foldersContext.Provider value={contextValue}>
      {props.children}
    </foldersContext.Provider>
  );
};

export const useFolders: () => ContextValueType = () =>
  useContext(foldersContext);
