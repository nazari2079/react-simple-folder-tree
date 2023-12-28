import renderer from "react-test-renderer";
import { describe, expect, it } from "vitest";
import FolderTree from "../../lib";
import foldersInitialData from "../data/foldersInitialData.json";

describe("FolderTree component", () => {
  it("FolderTree component renders correctly with data", () => {
    const component = renderer.create(<FolderTree data={foldersInitialData} />);
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});
