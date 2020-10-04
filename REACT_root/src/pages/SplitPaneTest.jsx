import React, { Component } from 'react'

import SplitPane from "react-split-pane"

export default class SplitPaneTest extends Component {
    render() {
        return (
            <SplitPane
                split="vertical"
                minSize={50}
                defaultSize={parseInt(localStorage.getItem('splitPos'), 10)}
                onChange={(size) => localStorage.setItem('splitPos', size)}
                paneStyle={{ overflow: 'auto' }}
            >
                <div className="Content-Pane">
                    test..................................................................................
                </div>

                <SplitPane split="horizontal"
                    minSize={50}
                    defaultSize={parseInt(localStorage.getItem('splitPos'), 10)}
                    onChange={(size) => localStorage.setItem('splitPos', size)}
                    paneStyle={{ overflow: 'auto' }}
                >
                    <div className="Content-Pane">
                        test <br />
                        test <br />
                        test <br />
                        test <br />

                    </div>
                    <div className="Content-Pane">
                        test
                    </div>
                </SplitPane>
            </SplitPane>
        )
    }
}
