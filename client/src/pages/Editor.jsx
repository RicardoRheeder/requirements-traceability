import React, { useState } from "react";

import { Hierarchy } from "../components";

import SplitPane from "react-split-pane";

import { useSelector } from "react-redux";

export default function Editor() {
  const storeTreeData = useSelector((state) => state.common.treeData);

  const ParseTreeData = (struct, level, treeIndex) => {
    var indentVal = String(level * 20) + "px";
    level += 1;

    console.log(indentVal);
    return struct.map(({ title, text, children }) => (
      <div style={{ marginLeft: indentVal }} key={title}>
        <div>{title}</div>
        <input
          type="text"
          className="editor-input"
          value={text}
          onChange={() => {}}
        ></input>
        {children != null ? ParseTreeData(children, level) : <></>}
      </div>
    ));
  };

  return (
    <div>
      <div className="editor-root">
        <SplitPane
          split="vertical"
          minSize={200}
          // defaultSize={201}
          defaultSize={parseInt(localStorage.getItem("splitPos"), 200)}
          onChange={(size) => localStorage.setItem("splitPos", size)}
        >
          <div>
            <Hierarchy />
          </div>
          <div>
            <form>
              Editor
              {ParseTreeData(storeTreeData, 0)}
            </form>
          </div>
        </SplitPane>
      </div>
    </div>
  );
}
