type CommonFolderDataType = {
  name: string;
  isFolder: boolean;
};

export type FolderInitialDataType = CommonFolderDataType & {
  children?: FolderInitialDataType[];
};

export type FolderDataType = CommonFolderDataType & {
  id: string;
  isRootNode: boolean;
  children?: FolderDataType[];
};

export type NewEntryType = "file" | "folder" | null;
