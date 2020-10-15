import React, { useState } from 'react'

import { Hierarchy } from '../components'

import SplitPane from 'react-split-pane';

import { useSelector } from 'react-redux'

export default function Editor() {
    const storeTreeData = useSelector(state => state.common.treeData);

    const ParseTreeData = () => 
        storeTreeData.map(({ title }) => (
            <div>
                <div>{ title }</div>
                <input type="text" className="editor-input" />
            </div>
        ))
    

    return (
        <div>
             <div className="editor-root">
                <SplitPane
                    split="vertical"
                    minSize={150}
                    defaultSize={200}
                    // defaultSize={parseInt(localStorage.getItem('splitPos'), 200)}
                    // onChange={(size) => localStorage.setItem('splitPos', size)}
                >
                    <div>
                        <Hierarchy/>
                    </div>
                    <div>
                        <form>
                            Editor
                            {ParseTreeData()}
                        </form>
                    </div>

                </SplitPane>
            </div>
        </div>
    )
}
