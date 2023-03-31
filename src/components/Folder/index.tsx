import { FC, useState } from "react";
import { FolderDataType, NewEntryType } from "../../types";
import { useFolders } from "../../context/folderDataContext";
import FolderName from "./FolderName";
import NewEntry from "./NewEntry";

type Props = {
  folderChildren?: FolderDataType;
};

const iconSize = 20;

const Folder: FC<Props> = (props) => {
  const { folderChildren } = props;
  const { folders } = useFolders();
  const data = folderChildren || folders;

  const [isExpanded, setIsExpanded] = useState(false);
  const [newEntryType, setNewEntryType] = useState<NewEntryType>(null);

  return (
    <div className="mt-2 first:mt-0 child-input:p-[2px]">
      <FolderName
        folder={data}
        iconSize={iconSize}
        isExpanded={isExpanded}
        setIsExpanded={setIsExpanded}
        setNewEntryType={setNewEntryType}
      />
      {isExpanded && !!data?.children?.length && (
        <div className="mt-2 pl-4">
          {data?.children?.map(
            (folderChild) =>
              folderChild?.id && (
                <Folder key={folderChild?.id} folderChildren={folderChild} />
              )
          )}
        </div>
      )}
      {newEntryType && (
        <NewEntry
          folderId={data?.id}
          iconSize={iconSize}
          newEntryType={newEntryType}
          setNewEntryType={setNewEntryType}
        />
      )}
    </div>
  );
};

export default Folder;
