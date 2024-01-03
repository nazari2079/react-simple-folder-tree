import { Dispatch, FC, SetStateAction, useState } from "react";
import { TickCircle, CloseCircle } from "iconsax-react";
import { useFolders } from "../../context/folderDataContext";
import { NewEntryType } from "../../types";

type Props = {
  folderId: string;
  iconSize: number;
  newEntryType: NewEntryType;
  setNewEntryType: Dispatch<SetStateAction<NewEntryType>>;
};

const NewEntry: FC<Props> = (props) => {
  const { iconSize, folderId, newEntryType, setNewEntryType } = props;
  const [newEntryName, setNewEntryName] = useState("");
  const { addNewFolder } = useFolders();

  const onAddNewEntry = () => {
    if (newEntryName) {
      addNewFolder(folderId, newEntryType === "folder", newEntryName);
      setNewEntryName("");
    }
    setNewEntryType(null);
  };

  return (
    <div className="flex justify-between items-center my-2 child-svg:cursor-pointer">
      <input
        className="w-[80%]"
        placeholder={`please enter your ${newEntryType} name`}
        autoFocus
        onChange={({ currentTarget }) => setNewEntryName(currentTarget.value)}
        onKeyDown={(e) => e.key === "Enter" && onAddNewEntry()}
      />
      <div className="flex items-center space-x-2">
        <TickCircle size={iconSize} onClick={onAddNewEntry} />
        <CloseCircle size={iconSize} onClick={() => setNewEntryType(null)} />
      </div>
    </div>
  );
};

export default NewEntry;
