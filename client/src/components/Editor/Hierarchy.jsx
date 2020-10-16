import React, { useState } from "react";
import { useDispatch } from "react-redux";

import SortableTree, { toggleExpandedForAll } from "react-sortable-tree";
import FileExplorerTheme from "react-sortable-tree-theme-full-node-drag";

import { useSelector } from "react-redux";
import { updateDataTree } from "../../redux/stores/common/actions";

import { Tree_Update, Tree_InsertNode, Tree_DeleteNode } from "../../utils";

export default function Hierarchy() {
  const dispatch = useDispatch();

  const storeTreeData = useSelector((state) => state.common.treeData);
  const [customTreeData, setTreeData] = useState(storeTreeData);
  const [selectedNodeId, setSelectedNodeId] = useState(1);
  const [searchString, setSearchString] = useState("");
  const [searchFocusIndex, setSearchFocusIndex] = useState(0);
  const [searchFoundCount, setSearchFoundCount] = useState(null);

  const alertNodeInfo = ({ node, path, treeIndex }) => {
    const objectString = Object.keys(node)
      .map((k) => (k === "children" ? "children: Array" : `${k}: '${node[k]}'`))
      .join(",\n   ");

    global.alert(
      "Info passed to the icon and button generators:\n\n" +
        `node: {\n   ${objectString}\n},\n` +
        `path: [${path.join(", ")}],\n` +
        `treeIndex: ${treeIndex}`
    );
  };

  const selectPrevMatch = () =>
    searchFocusIndex !== null
      ? setSearchFocusIndex(
          (searchFoundCount + searchFocusIndex - 1) % searchFoundCount
        )
      : setSearchFocusIndex(searchFoundCount - 1);

  const selectNextMatch = () =>
    searchFocusIndex !== null
      ? setSearchFocusIndex((searchFocusIndex + 1) % searchFoundCount)
      : setSearchFocusIndex(0);

  const expand = (expanded) =>
    setTreeData(toggleExpandedForAll({ customTreeData, expanded }));

  const expandAll = () => expand(true);

  const collapseAll = () => expand(false);

  const updateTreeData = () => {
    let modifiedTreeData = Tree_Update(customTreeData);
    dispatch(updateDataTree(modifiedTreeData));
    return setTreeData;
  };

  const nodeClicked = (event, node) => {
    if (
      event.target.className.includes("collapseButton") ||
      event.target.className.includes("expandButton")
    ) {
      // ignore the event
    } else {
      console.log(node, "node data");
      setSelectedNodeId(node.id);
    }
  };

  return (
    <div
      className="root-div"
      style={{ display: "flex", flexDirection: "column", height: "100vh" }}
    >
      {/* Tree Utilities */}
      <div className="tree-utilities">
        <div>Hierarchy</div>

        {/* Expand/Collapse buttons */}
        <div>
          <button onClick={expandAll}>Expand All</button>
          <button onClick={collapseAll}>Collapse All</button>
        </div>
        <form
          style={{ display: "inline-block" }}
          onSubmit={(event) => {
            event.preventDefault();
          }}
        >
          <label htmlFor="find-box">
            <div className="search-panel">
              Search:&nbsp;
              {/* Search box */}
              <input
                id="find-box"
                className="search-box"
                type="text"
                value={searchString}
                onChange={(event) => setSearchString(event.target.value)}
              />
              {/* '<' and '>' buttons */}
              <button
                type="button"
                disabled={!searchFoundCount}
                onClick={selectPrevMatch}
              >
                &lt;
              </button>
              <button
                type="submit"
                disabled={!searchFoundCount}
                onClick={selectNextMatch}
              >
                &gt;
              </button>
              {/* Search results */}
              <span>
                &nbsp;
                {searchFoundCount > 0 ? searchFocusIndex + 1 : 0}
                &nbsp;/&nbsp;
                {searchFoundCount || 0}
              </span>
            </div>
          </label>
        </form>
      </div>

      {/* Tree Visual */}
      <div className="tree-visual">
        <SortableTree
          theme={FileExplorerTheme}
          treeData={customTreeData}
          onChange={updateTreeData()}
          rowHeight={40}
          canDrag={({ node }) => !node.dragDisabled}
          onClick={() => console.log("test")}
          searchQuery={searchString}
          searchFocusOffset={searchFocusIndex}
          searchFinishCallback={(matches) => {
            setSearchFoundCount(matches.length);
            matches.length > 0
              ? setSearchFocusIndex(searchFocusIndex % matches.length)
              : setSearchFocusIndex(0);
          }}
          generateNodeProps={(rowInfo, row, path, node) => {
            console.log(rowInfo);
            let nodeProps = {
              onClick: (event) => nodeClicked(event, rowInfo.node),
              className: "",
              buttons: [
                <button onClick={() => alertNodeInfo(rowInfo)}>i</button>,
              ],
              listIndex: 0,
              lowerSiblingCounts: [],
              className:
                "tree-node-styling" +
                (rowInfo.node.customField ? " type-a" : ""),
            };
            if (rowInfo.node && selectedNodeId === rowInfo.node.id) {
              console.log(nodeProps);
              nodeProps.className =
                "selected-tree-node" + " " + nodeProps.className;
              console.log(nodeProps.className);
            }

            return nodeProps;
          }}
        />
      </div>
    </div>
  );
}
