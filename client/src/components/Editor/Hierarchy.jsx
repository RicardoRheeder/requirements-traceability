import React, { useState, useEffect } from 'react'
import { useAuth0 } from '@auth0/auth0-react'
import { useDispatch, useSelector } from 'react-redux'
import AutosizeInput from 'react-input-autosize'
import Dropdown from 'react-dropdown'

import SortableTree, {
  toggleExpandedForAll,
  removeNodeAtPath,
} from 'react-sortable-tree'
import FileExplorerTheme from 'react-sortable-tree-theme-full-node-drag'

import {
  setCurrentDocVersion,
  setModalObject,
  setShouldPullFromDB,
  updateDataTree,
  updateSelectedNodeID,
} from '../../redux/stores/common/actions'
import {
  getTreeAsync,
  sendDocAsync,
  sendReqAsync,
} from '../../redux/stores/document/actions'

import {
  Tree_Update,
  Tree_InsertNode,
  Tree_DeleteNode,
  Tree_ExpandData,
  Tree_UpdateNodeName,
  Tree_GetRequirementObject,
} from '../../utils/TreeNodeHelperFunctions'
import ReactDropdown from 'react-dropdown'

export default function Hierarchy({
  scrollToElementFunction,
  setSelectedNodeId,
  selectedNodeId,
}) {
  const { user } = useAuth0()
  const dispatch = useDispatch()
  const storeTreeData = useSelector((state) => state.common.treeData, [])
  const selectedDocObject = useSelector((state) => state.document.current_doc)
  const selectedDocVersion = useSelector(
    (state) => state.common.currentSelectedDocVersion
  )

  // Keeps track of which node ID is selected: Value will update with the selectedID stored in Redux
  // const selectedNodeId = useSelector((state) => state.common.selectedID)

  const useCustomTreeData = () =>
    Tree_Update(useSelector((state) => state.common.treeData))
  // customTreeData is the tree object stored in Redux
  const customTreeData = useCustomTreeData()

  // console.log(customTreeData); For testing, this should be called whenever customTreeData updates

  const [searchString, setSearchString] = useState('') // String in the search box
  const [searchFocusIndex, setSearchFocusIndex] = useState(0) // Which tree index to focus on
  const [searchFoundCount, setSearchFoundCount] = useState(null) // Count of searched items found

  const [versionList, setVersionList] = useState([]) // setting the version list
  const [currentDropDownVersion, setCurrentDropDownVersion] = useState('') // selecting a item in dropdown

  // refreshing versions list on mount
  useEffect(() => {
    if (selectedDocObject !== null) {
      refreshVersionList()
    }
  }, [selectedDocObject])

  // function for getting the versions list
  function refreshVersionList() {
    let defaultOption = '0.0'
    let tempVersionsList = []
    if (selectedDocObject.versions.length > 0) {
      // looping over versions array and parsing
      selectedDocObject.versions.forEach((version) => {
        const parsedVersion = JSON.parse(version)
        tempVersionsList.push(parsedVersion.versionName)
      })
      tempVersionsList.reverse()
      // setting default option

      defaultOption = tempVersionsList[0]

      setCurrentDropDownVersion(defaultOption)
      setVersionList(tempVersionsList)
    } else {
      setCurrentDropDownVersion(defaultOption)
    }
  }

  // Function for selecting items in dropdown
  const _onDropdownSelect = (selectedItem) => {
    let mostRecentVersion = JSON.parse(
      selectedDocObject.versions[selectedDocObject.versions.length - 1]
    )
    if (selectedItem.value != mostRecentVersion.versionName) {
      dispatch(setShouldPullFromDB(false))
      // dispatch(updateSelectedNodeID(0))
      setSelectedNodeId(0)
    } else {
      dispatch(setShouldPullFromDB(true))
    }
    // finding the corresponding tree for the version that was selected
    selectedDocObject.versions.forEach((version) => {
      const parsedVersion = JSON.parse(version)

      if (selectedItem.value == parsedVersion.versionName) {
        dispatch(updateDataTree(JSON.parse(parsedVersion.tree)))
        setCurrentDropDownVersion(parsedVersion.versionName)
        dispatch(setCurrentDocVersion(selectedItem.value))
      }
    })
  }

  /**
   * The 'i' button's function to display more info for a node
   * @param {Object} rowInfo - object with all information of the node
   * @param {Object} rowInfo.node - contains node specific info
   * @param {string} path - the path of the node, tracked by the library
   * @param {int} treeIndex - the index of the node, tracked by the library
   */
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

  /**
   * Goes to the prev searched item
   */
  const selectPrevMatch = () =>
    searchFocusIndex !== null
      ? setSearchFocusIndex(
          (searchFoundCount + searchFocusIndex - 1) % searchFoundCount
        )
      : setSearchFocusIndex(searchFoundCount - 1)

  /**
   * Goes to the next searched item
   */
  const selectNextMatch = () =>
    searchFocusIndex !== null
      ? setSearchFocusIndex((searchFocusIndex + 1) % searchFoundCount)
      : setSearchFocusIndex(0)

  /**
   * Receives a tree structure, sends it to get the IDs cleaned up, and pushes it to Redux
   * @param {Object} tree - the tree stucture to clean and push to Redux store
   */
  const updateTree = (tree) => {
    // NewTree - a new array just used so that REACT knows to rerender
    var nt = [].concat(tree)
    dispatch(updateDataTree(JSON.parse(JSON.stringify(Tree_Update(nt)))))
  }

  const moveNode = (tree) => {
    // dispatch(updateSelectedNodeID(0)) // Updating visual of node being deselected
    setSelectedNodeId(0)
    updateTree(tree)

    dispatch(sendDocAsync(JSON.stringify(tree), selectedDocObject._id))
  }

  /**
   * Inserts a new node in the structure, then calls the updateTree function on it
   */
  const insertNode = () => {
    // TreeData retrieved from function - has inserted node
    var td = Tree_InsertNode(customTreeData, selectedNodeId)
    updateTree(td)

    dispatch(sendDocAsync(JSON.stringify(td), selectedDocObject._id))
  }

  /**
   * Delete a node in the structure, then calls the updateTree function on it
   */
  const deleteNode = () => {
    // TreeData retrieved from function - has deleted node
    var td = Tree_DeleteNode(customTreeData, 'id', selectedNodeId)
    // Get new id to focus on
    let newSelectedNodeID = selectedNodeId - 1
    if (newSelectedNodeID < 0) newSelectedNodeID = 0
    // dispatch(updateSelectedNodeID(0)) // Updating visual of node being selected
    setSelectedNodeId(0)
    updateTree(td)

    dispatch(sendDocAsync(JSON.stringify(td), selectedDocObject._id))
  }

  /**
   * Delete a node in the structure, then calls the updateTree function on it
   * @param {string} name - the name/title to update the node with
   */
  const updateNodeName = (name) => {
    // console.log(name)
    var td = Tree_UpdateNodeName(customTreeData, selectedNodeId, name)
    updateTree(td)

    // Get requirement we are editing, and remove the user's name from it
    var requirement = JSON.stringify(
      Tree_GetRequirementObject(
        storeTreeData,
        selectedNodeId,
        user.nickname,
        user.nickname
      )
    )

    dispatch(sendReqAsync(requirement, selectedDocObject._id)) // Send the updated requirement to the database
    // dispatch(sendDocAsync(JSON.stringify(td), selectedDocObject._id))
  }

  /**
   * Expands/Collapses all the data in the tree
   * @param {boolean} expanded - Whether or not the expanded nodes should be expanded
   */
  const expand = (expanded) => {
    var td = Tree_ExpandData(customTreeData, expanded) // Goes through tree and sets expanded of all nodes
    updateTree(td)
  }

  const expandAll = () => expand(true)
  const collapseAll = () => expand(false)

  /**
   * The handler for node onClick events
   * @param {Object} event - HTML event that contains the information of what is selected in the browser
   * @param {Object} node - contains node specific info
   */
  const onFocusRequirement = (event, node) => {
    if (
      event.target.className.includes('collapseButton') ||
      event.target.className.includes('expandButton')
    ) {
    } else if (node.isBeingEdited == null) {
      let id = node.id

      if (id != selectedNodeId) {
        // console.log(id + ' ' + selectedNodeId)
        if (selectedNodeId != 0) {
          dispatch(setShouldPullFromDB(false)) // Don't pull when focussing on a requirement

          // Get requirement we are editing, and remove the user's name from it
          var requirement = JSON.stringify(
            Tree_GetRequirementObject(
              storeTreeData,
              selectedNodeId,
              user.nickname,
              null
            )
          )
          dispatch(sendReqAsync(requirement, selectedDocObject._id)) // Send the updated requirement to the database
        }

        // dispatch(updateSelectedNodeID(id)) // Updating visual of node being selected
        setSelectedNodeId(id)

        // Get requirement we are editing, and add username
        var requirement = JSON.stringify(
          Tree_GetRequirementObject(
            storeTreeData,
            id,
            user.nickname,
            user.nickname
          )
        )
        setTimeout(() => {
          dispatch(sendReqAsync(requirement, selectedDocObject._id)) // Send the updated requirement to the database
          dispatch(getTreeAsync(selectedDocObject)) // Get the most up to date document from the db
        }, 100)
      }
    }
  }

  const offFocusRequirement_versioning = (id) => {
    // console.log('Off Focus: ' + id)
    // dispatch(updateSelectedNodeID(0)) // Updating visual of node being deselected
    setSelectedNodeId(0)
    // Get requirement we are editing, and remove the user's name from it
    var requirement = JSON.stringify(
      Tree_GetRequirementObject(storeTreeData, id, user.nickname, null)
    )
    setTimeout(() => {
      dispatch(sendReqAsync(requirement, selectedDocObject._id)) // Send the updated requirement to the database
      // dispatch(getTreeAsync(selectedDocObject)) // Get the most up to date document from the db
      dispatch(setShouldPullFromDB(true)) // Start pulling documents from the database again
    }, 100)
  }

  /**
   * The handler for node onDoubleClick events - tells the editor to scroll to the location of the node's section
   */
  const executeScroll = () => {
    // console.log(selectedNodeId)
    scrollToElementFunction()
    // console.log('Double click')
  }

  const exportDocOnClick = (selectedNodeId) => {
    print()
    offFocusRequirement_versioning(selectedNodeId)
  }

  const saveDocOnClick = (selectedNodeId) => {
    dispatch(setModalObject({ visible: true, mode: 3 }))
    offFocusRequirement_versioning(selectedNodeId)
  }

  return (
    <div className="hierarchy-contents-container">
      {/* Tree Utilities */}
      <div className="tree-utilities">
        <div className="tree-utilities-header">
          <h1 className="utilities-header-style">Hierarchy</h1>
        </div>

        {/* Expand/Collapse buttons */}
        <div className="node-button-div">
          <button
            className="orange-button hierarchy-button"
            onClick={expandAll}
          >
            Expand All
          </button>
          <button
            className="orange-button hierarchy-button"
            onClick={collapseAll}
          >
            Collapse All
          </button>
        </div>
        <div className="node-button-div">
          <button
            className="orange-button hierarchy-button"
            onClick={insertNode}
          >
            Insert Node
          </button>
          <button
            className="orange-button hierarchy-button"
            onClick={deleteNode}
          >
            Delete Node
          </button>
        </div>
        <div className="search-panel">
          Search:&nbsp;
          {/* Search box */}
          <input
            id="find-box"
            className="search-box hierarchy-search"
            type="text"
            value={searchString}
            onChange={(event) => setSearchString(event.target.value)}
          />
          {/* '<' and '>' buttons */}
          <button
            className="hierarchy-search"
            type="button"
            disabled={!searchFoundCount}
            onClick={selectPrevMatch}
          >
            &lt;
          </button>
          <button
            className="hierarchy-search"
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
      </div>

      <div className="node-container">
        {/* Tree Visual */}
        <div className="tree-visual">
          <SortableTree
            theme={FileExplorerTheme}
            treeData={customTreeData}
            onChange={moveNode}
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
              // console.log(rowInfo.path); // Prints all node's info
              let nodeProps = {
                onClick: (event) => onFocusRequirement(event, rowInfo.node),
                // onBlur: (event) => offFocusRequirement(event, rowInfo.node),
                onDoubleClick: executeScroll,
                title: (
                  <span className="node-row-text">
                    <span className="node-ordering-title">
                      {rowInfo.node.order}
                    </span>
                    <AutosizeInput
                      className="row_inputfield"
                      value={rowInfo.node.title}
                      style={{ background: 'transparent' }}
                      onChange={(event) => {
                        const name = event.target.value
                        updateNodeName(name)
                      }}
                    />
                  </span>
                ),
                buttons: [
                  <button
                    className="node-info-button"
                    onClick={() => alertNodeInfo(rowInfo)}
                  >
                    i
                  </button>,
                ],
                listIndex: 0,
                lowerSiblingCounts: [],
                className:
                  'tree-node-styling' +
                  (rowInfo.node.customField ? ' type-a' : ''),
              }

              nodeProps.className =
                nodeProps.className +
                (rowInfo.node && selectedNodeId === rowInfo.node.id
                  ? ' selected-tree-node'
                  : '') +
                (rowInfo.node &&
                rowInfo.node.isBeingEdited != null &&
                rowInfo.node.isBeingEdited != user.nickname
                  ? ' disabled'
                  : '')
              // if (rowInfo.node && selectedNodeId === rowInfo.node.id) {
              //   nodeProps.className =
              //     'selected-tree-node' + ' ' + nodeProps.className
              //   // console.log(nodeProps);
              // }

              return nodeProps
            }}
          />
        </div>
      </div>

      {/* Pull/Commit button panel */}
      <div className="commit-pull-container">
        <div className="center-div">
          <div className="version-list-dropdown">
            <Dropdown
              options={versionList}
              onChange={_onDropdownSelect}
              onFocus={() => offFocusRequirement_versioning(selectedNodeId)}
              value={currentDropDownVersion}
              placeholder="Select an option"
              className="dropdown-custom-wrapper"
              controlClassName="dropdown-custom-control"
              placeholderClassName="dropdown-custom-placeholder"
              menuClassName="dropdown-custom-menu"
              arrowClassName="dropdown-custom-arrow"
            />
          </div>
          <button
            className="orange-button hierarchy-button"
            onClick={() => exportDocOnClick(selectedNodeId)}
          >
            EXPORT
          </button>
          <button
            className="orange-button hierarchy-button"
            onClick={() => saveDocOnClick(selectedNodeId)}
          >
            Save Version
          </button>
        </div>
      </div>
    </div>
  )
}
