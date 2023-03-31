export type FolderDataType = {
  id: number;
  name: string;
  isFolder: boolean;
  children?: FolderDataType[];
};

export type NewEntryType = "file" | "folder" | null;
