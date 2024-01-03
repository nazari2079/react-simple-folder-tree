import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useContext,
  useId,
  useState,
} from "react";
import { FolderDataType, FolderInitialDataType } from "../types";

type ContextValueType = {
  folders: FolderDataType;
  setFolders: Dispatch<SetStateAction<FolderDataType>>;
  removeFolder: (id: string) => void;
  updateFolderName: (id: string, newName: string) => void;
  addNewFolder: (parentId: string, isFolder: boolean, name: string) => void;
};

export const foldersContext = createContext<ContextValueType>({
  folders: {
    id: "_id",
    name: "",
    isFolder: true,
    isRootNode: true,
  },
  setFolders: () => {},
  removeFolder: () => {},
  updateFolderName: () => {},
  addNewFolder: () => {},
});

type ProviderPropsType = {
  data: FolderInitialDataType;
  children: ReactNode;
};

const initializeDataWithId = (
  data: FolderInitialDataType,
  recursed = false
): FolderDataType => {
  const newData: FolderDataType = {
    id: useId(),
    name: data.name,
    isFolder: data.isFolder,
    isRootNode: !recursed,
  };

  if (data.children && data.children.length)
    newData.children = data.children.map((child) =>
      initializeDataWithId(child, true)
    );

  return newData;
};

export const FoldersProvider = (props: ProviderPropsType) => {
  const [folders, setFolders] = useState<FolderDataType>(
    initializeDataWithId(props.data)
  );

  const editNode = (
    id: string,
    createNewNode: (currentNode: FolderDataType) => FolderDataType,
    node?: FolderDataType
  ): FolderDataType => {
    const currentNode = node || folders;
    if (currentNode.id === id) {
      return createNewNode(currentNode);
    }
    const children = currentNode.children?.map((child) => {
      return editNode(id, createNewNode, child);
    });
    if (children) return { ...currentNode, children };
    else return { ...currentNode };
  };

  const removeNode = (id: string, node?: FolderDataType): FolderDataType => {
    const currentNode = node || folders;
    let itemDeleted = false;

    if (currentNode.children?.length) {
      const filtredChilds = currentNode.children.filter((child) => {
        if (child.id !== id) return true;
        itemDeleted = true;
      });
      if (itemDeleted) return { ...currentNode, children: filtredChilds };
      else {
        const children = currentNode.children.map((child) =>
          removeNode(id, child)
        );
        return { ...currentNode, children };
      }
    }

    return { ...currentNode };
  };

  const removeFolder = (id: string) => {
    setFolders(removeNode(id));
  };

  const updateFolderName = (id: string, newName: string) => {
    setFolders(
      editNode(id, (currentNode) => ({ ...currentNode, name: newName }))
    );
  };

  const addNewFolder = (parentId: string, isFolder: boolean, name: string) => {
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
