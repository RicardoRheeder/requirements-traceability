import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import SortableTree, {
  toggleExpandedForAll,
  removeNodeAtPath,
} from 'react-sortable-tree'
import FileExplorerTheme from 'react-sortable-tree-theme-full-node-drag'

import {
  updateDataTree,
  updateSelectedNodeID,
} from '../../redux/stores/common/actions'

import {
  Tree_Update,
  Tree_InsertNode,
  Tree_DeleteNode,
  Tree_ExpandData,
  Tree_UpdateNodeName,
} from '../../utils'

export default function Hierarchy({ scrollToElementFunction }) {
  const dispatch = useDispatch()

  // Keeps track of which node ID is selected: Value will update with the selectedID stored in Redux
  const selectedNodeId = useSelector((state) => state.common.selectedID)

  const useCustomTreeData = () =>
    Tree_Update(useSelector((state) => state.common.treeData))
  // customTreeData is the tree object stored in Redux
  const customTreeData = useCustomTreeData()
  // For testing, this should be called whenever customTreeData updates
  // console.log(customTreeData);

  const [searchString, setSearchString] = useState('') // String in the search box
  const [searchFocusIndex, setSearchFocusIndex] = useState(0) // Which tree index to focus on
  const [searchFoundCount, setSearchFoundCount] = useState(null) // Cound of searched items found

  // The 'i' button's function to display more info for a node
  const alertNodeInfo = ({ node, path, treeIndex }) => {
    const objectString = Object.keys(node)
      .map((k) => (k === 'children' ? 'children: Array' : `${k}: '${node[k]}'`))
      .join(',\n   ')
    global.alert(
      'Info passed to the icon and button generators:\n\n' +
        `node: {\n   ${objectString}\n},\n` +
        `path: [${path.join(', ')}],\n` +
        `treeIndex: ${treeIndex}`
    )
  }

  // Goes to the prev searched item
  const selectPrevMatch = () =>
    searchFocusIndex !== null
      ? setSearchFocusIndex(
          (searchFoundCount + searchFocusIndex - 1) % searchFoundCount
        )
      : setSearchFocusIndex(searchFoundCount - 1)
  // Goes to the next searched item
  const selectNextMatch = () =>
    searchFocusIndex !== null
      ? setSearchFocusIndex((searchFocusIndex + 1) % searchFoundCount)
      : setSearchFocusIndex(0)

  // Updates the tree's ID's and pushes to Redux store
  const updateTree = (tree) =>
    dispatch(updateDataTree(JSON.parse(JSON.stringify(Tree_Update(tree)))))

  // Inserts a new node in the structure, then calls the updateTree function on it
  const insertNode = () => {
    // TreeData retrieved from function - has inserted node
    var td = Tree_InsertNode(customTreeData, selectedNodeId)
    // NewTree - just used so that REACT knows to fucking rerender
    var nt = [].concat(td)

    updateTree(nt)
  }

  // Delete a node in the structure, then calls the updateTree function on it
  const deleteNode = () => {
    // TreeData retrieved from function - has deleted node
    var td = Tree_DeleteNode(customTreeData, 'id', selectedNodeId)
    // Get new id to focus on
    let newSelectedNodeID = selectedNodeId - 1
    if (newSelectedNodeID < 0) newSelectedNodeID = 0
    setSelectedNodeId(newSelectedNodeID)
    // NewTree - just used so that REACT knows to fucking rerender
    var nt = [].concat(td)
    updateTree(nt)
  }

  const updateNodeName = (name) => {
    console.log(name)
    var td = Tree_UpdateNodeName(customTreeData, selectedNodeId, name)

    // NewTree - just used so that REACT knows to fucking rerender
    var nt = [].concat(td)
    updateTree(nt)
  }

  // Expands/Collapses all the data in the tree
  const expand = (expanded) => {
    var td = Tree_ExpandData(customTreeData, expanded) // Goes through tree and sets expanded of all nodes

    // NewTree - just used so that REACT knows to fucking rerender
    var nt = [].concat(td)

    updateTree(nt)
  }

  const expandAll = () => expand(true)

  const collapseAll = () => expand(false)

  // Sends the clicked node's ID to Redux's selectedID
  const setSelectedNodeId = (id) => {
    dispatch(updateSelectedNodeID(id))
  }

  // The handler for node click events
  const nodeClicked = (event, node) => {
    if (
      event.target.className.includes('collapseButton') ||
      event.target.className.includes('expandButton')
    ) {
      // ignore the event
    } else {
      console.log(node, 'node data')
      setSelectedNodeId(node.id)
    }
  }

  const executeScroll = () => {
    console.log(selectedNodeId)
    scrollToElementFunction()
    // console.log('Double click')
  }

  return (
    <div
      style={{ display: 'flex', flexDirection: 'column', height: '100vh' }}
    >
      {/* Tree Utilities */}
      <div className="tree-utilities">
        <div>
          <h1>Hierarchy</h1>
        </div>

        {/* Expand/Collapse buttons */}
        <div>
          <button onClick={expandAll}>Expand All</button>
          <button onClick={collapseAll}>Collapse All</button>
        </div>
        <div>
          <button onClick={insertNode}>Insert Node</button>
          <button onClick={deleteNode}>Delete Node</button>
        </div>
        <form
          style={{ display: 'inline-block' }}
          onSubmit={(event) => {
            event.preventDefault()
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
          onChange={updateTree}
          rowHeight={40}
          canDrag={({ node }) => !node.dragDisabled}
          searchQuery={searchString}
          searchFocusOffset={searchFocusIndex}
          searchFinishCallback={(matches) => {
            setSearchFoundCount(matches.length)
            matches.length > 0
              ? setSearchFocusIndex(searchFocusIndex % matches.length)
              : setSearchFocusIndex(0)
          }}
          generateNodeProps={(rowInfo) => {
            // console.log(rowInfo.path);
            let nodeProps = {
              onClick: (event) => nodeClicked(event, rowInfo.node),
              onDoubleClick: executeScroll,
              title: (
                <span>
                  <span>{rowInfo.node.order}</span>
                  <input
                    style={{ fontSize: '1.1rem' }}
                    className="row_inputfield"
                    value={rowInfo.node.title}
                    onChange={(event) => {
                      const name = event.target.value
                      updateNodeName(name)
                    }}
                  />
                </span>
              ),
              buttons: [
                <button onClick={() => alertNodeInfo(rowInfo)}>i</button>,
              ],
              listIndex: 0,
              lowerSiblingCounts: [],
              className:
                'tree-node-styling' +
                (rowInfo.node.customField ? ' type-a' : ''),
            }
            if (rowInfo.node && selectedNodeId === rowInfo.node.id) {
              // console.log(nodeProps);
              nodeProps.className =
                'selected-tree-node' + ' ' + nodeProps.className
              // console.log(nodeProps.className);
            }
            return nodeProps
          }}
        />
      </div>
    </div>
  )
}
