import React, { useState, useRef, useEffect } from 'react'
import { useAuth0 } from '@auth0/auth0-react'
import { useDispatch, useSelector } from 'react-redux'

import { Hierarchy, CollaboratorPanel, CollaboratorIcon, RequirementStatusContainer } from '../components'
import SplitPane from 'react-split-pane'
import TextareaAutosize from 'react-textarea-autosize'

import {
  Tree_Update,
  Tree_UpdateIsBeingEdited,
  Tree_UpdateNodeText,
  Tree_CombineLocalAndDatabaseTrees,
  Tree_GetRequirementObject,
} from '../utils/TreeNodeHelperFunctions'

import {
  updateDataTree,
  updateSelectedNodeID,
  setShouldPullFromDB,
} from '../redux/stores/common/actions'
import {
  getTreeAsync,
  sendDocAsync,
  sendReqAsync,
} from '../redux/stores/document/actions'

function useInterval(callback, delay) {
  const savedCallback = useRef()

  // Remember the latest function.
  useEffect(() => {
    savedCallback.current = callback
  }, [callback])

  // Set up the interval.
  useEffect(() => {
    function tick() {
      savedCallback.current()
    }
    if (delay !== null) {
      let id = setInterval(tick, delay)
      return () => clearInterval(id)
    }
  }, [delay])
}

export default function Editor() {
  const { user } = useAuth0()
  const dispatch = useDispatch()
  const paneRef = useRef(null)

  const shouldPullFromDB = useSelector(
    (state) => state.common.shouldPullFromDB,
    true
  )
  const storeTreeData = useSelector((state) => state.common.treeData, [])
  const selectedNodeId = useSelector((state) => state.common.selectedID)
  const selectedDocObject = useSelector((state) => state.document.current_doc)
  const userColorObject = useSelector(
    (state) => state.common.userColorObject,
    {}
  )
  const fetchedTree = useSelector((state) => state.document.fetchedTree)
  const selectedDocVersion = useSelector(
    (state) => state.common.currentSelectedDocVersion
  )

  useInterval(() => {
    if (selectedDocObject != null && shouldPullFromDB == true) {
      dispatch(getTreeAsync(selectedDocObject))
      console.log('Pull tree from database')

      if (fetchedTree != null) {
        let treeFromDB = null
        // Update the isBeingEdited field with the user's nickname
        treeFromDB = JSON.parse(fetchedTree)
        updateTree(treeFromDB)
      }
    }
  }, 1000)

  useEffect(() => {
    if (selectedDocObject != null) {
      let tree = JSON.parse(selectedDocObject.tree)
      if (!tree[0].hasOwnProperty('uniqueID')) {
        var td = Tree_Update(tree)
        dispatch(sendDocAsync(JSON.stringify(td), selectedDocObject._id))
      }
    }
  }, [selectedDocObject])

  /**
   * Receives a tree structure, sends it to get the IDs cleaned up, and pushes it to Redux
   * @param {Object} tree - the tree stucture to clean and push to Redux store
   */
  const updateTree = (tree) => {
    // NewTree - a new array just used so that REACT knows to rerender
    var nt = [].concat(tree)
    dispatch(updateDataTree(JSON.parse(JSON.stringify(Tree_Update(nt)))))
  }

  /**
   * Updates the node section's text
   * @param {Object} event - HTML event that contains the text being typed into the textarea
   */
  const updateNodeText = (event) => {
    var td = Tree_UpdateNodeText(
      storeTreeData,
      selectedNodeId,
      event.target.value
    )
    updateTree(td)
  }

  /**
   * Uses html's scrollIntoView function
   * @param {Object} element - the element reference to scroll to
   */
  const scrollToElement = (element) => {
    let navbar = $('.navbar-root')
    $('.navbar-root').remove()
    element.scrollIntoView(true, { behavior: 'smooth' })
    $('.app-root').prepend(navbar)
  }

  const onFocusRequirement = (id) => {
    if (id != selectedNodeId) {
      dispatch(setShouldPullFromDB(false)) // Don't pull when focussing on a requirement

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

      // console.log('On Focus: ' + id + ' ' + selectedNodeId)
      dispatch(updateSelectedNodeID(id)) // Updating visual of node being selected

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

  const offFocusRequirement = (id) => {
    // console.log('Off Focus: ' + id)
    dispatch(updateSelectedNodeID(0)) // Updating visual of node being deselected
    // Get requirement we are editing, and remove the user's name from it
    var requirement = JSON.stringify(
      Tree_GetRequirementObject(storeTreeData, id, user.nickname, null)
    )
    setTimeout(() => {
      dispatch(sendReqAsync(requirement, selectedDocObject._id)) // Send the updated requirement to the database
      dispatch(getTreeAsync(selectedDocObject)) // Get the most up to date document from the db
      dispatch(setShouldPullFromDB(true)) // Start pulling documents from the database again
    }, 100)
  }

  /**
   * Receives an array of objects (i.e. the tree or a children property)
   * For each object, a div is returned to represent a section of the tree
   * @param {Object} struct - The array to index through (i.e. [{item1}, {item2}, {item3}])
   * @param {int} level - The depth of the current struct.
   * Root nodes have level 0, children of those nodes have level 1, children of those children have level 2, etc...
   * @returns the HTML elements to render - represents each node of the tree struct
   */
  const CreateSectionsFromArrayOfStructs = (struct, level) => {
    window.test = paneRef
    var indentVal = String(level * 20) + 'px' // Used for the indenting of sections
    level += 1
    // console.log(indentVal);
    return struct.map(
      ({ title, text, children, id, order, status, isBeingEdited }, i) => {
        return (
          <div
            style={{ marginLeft: indentVal }}
            key={title + '' + id}
            className={
              (parseInt(id) == parseInt(selectedNodeId)
                ? 'selected ' + parseInt(id)
                : 'not-selected ' + parseInt(id)) +
              (isBeingEdited != null && isBeingEdited != user.nickname
                ? ' disabled'
                : ' ')
            }
            id={id}
          >
            <div className="req-header-container">
              <div className="left">
                <h2 className="section-headers">
                  {order} {title} 
                </h2>
                <span style={{ display: 'flex' }}>
                  {isBeingEdited != null ? (
                    <CollaboratorIcon
                      key={i}
                      username={isBeingEdited}
                      color={userColorObject[isBeingEdited]}
                      smallIcon={true}
                    />
                  ) : (
                    ''
                  )}
                </span>
              </div>
              <RequirementStatusContainer listOfStatuses={status} />

              {parseInt(id) == parseInt(selectedNodeId) ? (
                <div className="right">
                  <button
                    className="orange-button"
                    onClick={() => offFocusRequirement(id)}
                  >
                    SUBMIT
                  </button>
                </div>
              ) : (
                <></>
              )}
            </div>
            <TextareaAutosize
              type="text"
              className="editor-input"
              value={text}
              onChange={updateNodeText}
              onFocus={() => onFocusRequirement(id)}
              // onBlur={() => offFocusRequirement(id)}
            ></TextareaAutosize>
            {/* If children exist, recurse into it, and create sections out of it */}
            {children != null ? (
              CreateSectionsFromArrayOfStructs(children, level)
            ) : (
              <></>
            )}
          </div>
        )
      }
    )
  }

  return (
    <div className="editor-root">
      <SplitPane
        split="vertical"
        minSize={150}
        ref={paneRef}
        defaultSize={parseInt(localStorage.getItem('splitPos'))}
        onChange={(size) => localStorage.setItem('splitPos', size)}
      >
        <div className="hierarchy-root-div styled-background-blue">
          <Hierarchy
            scrollToElementFunction={(el) =>
              scrollToElement(paneRef.current.pane2.querySelector('.selected'))
            }
          />
        </div>
        <div className="editor-root-div styled-background-grey">
          <h1>
            {selectedDocObject != null ? (
              <>
                {selectedDocObject.title}
                <span className="doc-version-title">
                  {'(version: ' + selectedDocVersion + ')'}
                </span>
              </>
            ) : (
              'Error retrieving document name'
            )}
            <CollaboratorPanel />
          </h1>
          {CreateSectionsFromArrayOfStructs(Tree_Update(storeTreeData), 0)}
        </div>
      </SplitPane>
    </div>
  )
}
