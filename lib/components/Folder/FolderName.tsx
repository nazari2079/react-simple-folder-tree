import { Dispatch, FC, SetStateAction, useState } from "react";
import { FolderDataType, NewEntryType } from "../../types";
import {
  Folder,
  File,
  Trash2,
  Edit,
  CheckCircle,
  FolderPlus,
  FilePlus,
} from "react-feather";
import { useFolders } from "../../context/folderDataContext";

type Props = {
  folder: FolderDataType;
  iconSize: number;
  isExpanded: boolean;
  setIsExpanded: Dispatch<SetStateAction<boolean>>;
  setNewEntryType: Dispatch<SetStateAction<NewEntryType>>;
};

const FolderName: FC<Props> = (props) => {
  const { folder, iconSize, isExpanded, setIsExpanded, setNewEntryType } =
    props;
  const [isHover, setIsHover] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [newName, setNewName] = useState("");
  const { removeFolder, updateFolderName } = useFolders();

  const onRename = () => {
    if (newName) {
      updateFolderName(folder.id, newName);
      setNewName("");
    }
    setIsEditing(false);
  };

  const handleOpenNewFolderInput = (type: NewEntryType) => {
    setNewEntryType(type);
    setIsExpanded(true);
  };

  return (
    <div
      className="flex items-center justify-between"
      onMouseOver={() => setIsHover(true)}
      onMouseLeave={() => setIsHover(false)}
    >
      <div
        className="flex items-center space-x-3 cursor-pointer"
        onClick={() => setIsExpanded((state) => !state)}
      >
        {folder.isFolder ? (
          <Folder size={iconSize} />
        ) : (
          <File size={iconSize} />
        )}
        {isEditing ? (
          <input
            defaultValue={folder.name}
            placeholder="please enter a name"
            autoFocus
            onChange={({ currentTarget }) => setNewName(currentTarget.value)}
            onKeyDown={(e) => e.key === "Enter" && onRename()}
          />
        ) : (
          <div>{folder.name}</div>
        )}
      </div>
      {isHover && (
        <div className="flex items-center space-x-2 child-svg:cursor-pointer">
          {isEditing ? (
            <CheckCircle size={iconSize} onClick={onRename} />
          ) : (
            <>
              {folder.isFolder && (
                <>
                  <FilePlus
                    size={iconSize}
                    onClick={() => handleOpenNewFolderInput("file")}
                  />
                  <FolderPlus
                    size={iconSize}
                    onClick={() => handleOpenNewFolderInput("folder")}
                  />
                </>
              )}
              <Edit size={iconSize} onClick={() => setIsEditing(true)} />
              {!folder.isRootNode && (
                <Trash2
                  size={iconSize}
                  onClick={() => removeFolder(folder.id)}
                />
              )}
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default FolderName;
