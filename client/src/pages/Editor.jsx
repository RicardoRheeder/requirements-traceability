import React, { Component } from 'react'

import { Hierarchy } from '../components'

import SplitPane from 'react-split-pane';

export default class Editor extends Component {
    render() {
        return (
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
                            <div>
                                <input type="text" className="editor-input" />
                            </div>
                        </form>
                    </div>

                </SplitPane>
            </div>
        )
    }
}
