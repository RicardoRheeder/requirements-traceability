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

  const storeTreeData = useSelector((state) => state.common.treeData)
  const selectedNodeId = useSelector((state) => state.common.selectedID)

  // Updates the tree's ID's and pushes to Redux store
  const updateTree = (tree) => dispatch(updateDataTree(Tree_Update(tree)))

  const updateNodeText = (event) => {
    var td = Tree_UpdateNodeText(
      storeTreeData,
      selectedNodeId,
      event.target.value
    )

    // NewTree - just used so that REACT knows to fucking rerender
    var nt = [].concat(td)
    // console.log("HERE");
    // console.log(nt);
    updateTree(nt)
  }

  const SectionToFocus = useRef(null)
  const scrollToRef = () => {
    console.log('SCROLL')
    window.scrollTo(0, SectionToFocus.current.offsetTop)
  }

  const ParseTreeData = (struct, level) => {
    var indentVal = String(level * 20) + 'px'
    level += 1
    // console.log(indentVal);
    return struct.map(({ title, text, children, id }) => {
      if (parseInt(id) == parseInt(selectedNodeId)) {
        console.log('Found : ' + title)
      }

      return (
        <div
          ref={parseInt(id) == parseInt(selectedNodeId) ? SectionToFocus : null}
          style={{ marginLeft: indentVal }}
          key={title}
          className={parseInt(id) == parseInt(selectedNodeId) ? 'test' : 'not'}
        >
          <div>{title}</div>
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
    <div>
      <div className="editor-root">
        <SplitPane
          split="vertical"
          minSize={200}
          // defaultSize={201}
          defaultSize={parseInt(localStorage.getItem('splitPos'), 200)}
          onChange={(size) => localStorage.setItem('splitPos', size)}
        >
          <div>
            <Hierarchy scrollFunction={scrollToRef} />
          </div>
          <div>
            Editor
            {ParseTreeData(storeTreeData, 0)}
          </div>
        </SplitPane>
      </div>
    </div>
  )
}
