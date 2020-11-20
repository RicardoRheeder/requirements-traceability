import React, { useState, useRef } from 'react'
import { useAuth0 } from '@auth0/auth0-react'
import { useDispatch, useSelector } from 'react-redux'

import { Hierarchy, CollaboratorPanel, CollaboratorIcon } from '../components'
import SplitPane from 'react-split-pane'
import TextareaAutosize from 'react-textarea-autosize';

import {
  Tree_Update,
  Tree_UpdateIsBeingEdited,
  Tree_UpdateNodeText,
} from '../utils/TreeNodeHelperFunctions'

import {
  updateDataTree,
  updateSelectedNodeID,
} from '../redux/stores/common/actions'

export default function Editor() {
  const { user } = useAuth0()
  const dispatch = useDispatch()
  const paneRef = useRef(null)

  var tempTree

  const storeTreeData = useSelector((state) => state.common.treeData, [])
  const selectedNodeId = useSelector((state) => state.common.selectedID)
  const selectedDocObject = useSelector((state) => state.document.current_doc)
  const userColorObject = useSelector(
    (state) => state.common.userColorObject,
    {}
  )
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
    element.scrollIntoView(true, { behavior: 'smooth' })
  }

  const onFocusRequirement = (id) => {
    console.log('On Focus: ' + id + ' ' + selectedNodeId)
    dispatch(updateSelectedNodeID(id))
    var td = Tree_UpdateIsBeingEdited(storeTreeData, id, user.nickname)
    updateTree(td)
  }

  const offFocusRequirement = (id) => {
    console.log('Off Focus: ' + id)
    dispatch(updateSelectedNodeID(0))
    var td = Tree_UpdateIsBeingEdited(storeTreeData, id, null)
    updateTree(td)
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
      ({ title, text, children, id, order, isBeingEdited }, i) => {
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
            <div>
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
            <TextareaAutosize
              type="text"
              className="editor-input"
              value={text}
              onChange={updateNodeText}
              onFocus={() => onFocusRequirement(id)}
              onBlur={() => offFocusRequirement(id)}
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
        <div className="editor-root-div">
          <h1>
            {selectedDocObject
              ? selectedDocObject.title
              : 'Error retrieving document name'}{' '}
            <CollaboratorPanel />
          </h1>
          {CreateSectionsFromArrayOfStructs(Tree_Update(storeTreeData), 0)}
        </div>
      </SplitPane>
    </div>
  )
}
