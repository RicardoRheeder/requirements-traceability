import React, { useState, useRef } from 'react'

import { Hierarchy } from '../components'

import SplitPane from 'react-split-pane'

import { useDispatch, useSelector } from 'react-redux'

import { Tree_Update, Tree_UpdateNodeText } from '../utils'

import {
  updateDataTree,
  updateSelectedNodeID,
} from '../redux/stores/common/actions'

export default function Editor() {
  const dispatch = useDispatch()
  const paneRef = useRef(null)

  const storeTreeData = useSelector((state) => state.common.treeData, [])
  const selectedNodeId = useSelector((state) => state.common.selectedID)

  // Updates the tree's ID's and pushes to Redux store
  const updateTree = (tree) => dispatch(updateDataTree(tree))

  const updateNodeText = (event) => {
    var td = Tree_UpdateNodeText(
      storeTreeData,
      selectedNodeId,
      event.target.value
    )
    // NewTree - just used so that REACT knows to rerender
    var nt = [].concat(td)
    updateTree(nt)
  }

  const scrollToElement = (element) => {
    element.scrollIntoView(true, { behavior: 'smooth' })
  }

  const ParseTreeData = (struct, level) => {
    window.test = paneRef

    var indentVal = String(level * 20) + 'px'
    level += 1
    // console.log(indentVal);
    return struct.map(({ title, text, children, id, order }) => {
      return (
        <div
          style={{ marginLeft: indentVal }}
          key={title + '' + id}
          className={
            parseInt(id) == parseInt(selectedNodeId)
              ? 'selected ' + parseInt(id)
              : 'not-selected ' + parseInt(id)
          }
          id={id}
        >
          <div>
            {order} {title}
          </div>
          <textarea
            type="text"
            className="editor-input"
            value={text}
            onChange={updateNodeText}
            onFocus={() => dispatch(updateSelectedNodeID(id))}
          ></textarea>
          {children != null ? ParseTreeData(children, level) : <></>}
        </div>
      )
    })
  }

  return (
    <div className="editor-root">
      <SplitPane
        split="vertical"
        minSize={200}
        ref={paneRef}
        // defaultSize={201}
        defaultSize={parseInt(localStorage.getItem('splitPos'), 200)}
        onChange={(size) => localStorage.setItem('splitPos', size)}
      >
        <div>
          <Hierarchy
            scrollToElementFunction={(el) =>
              scrollToElement(paneRef.current.pane2.querySelector('.selected'))
            }
          />
        </div>
        <>
          Editor
          {ParseTreeData(Tree_Update(storeTreeData), 0)}
        </>
      </SplitPane>
    </div>
  )
}
