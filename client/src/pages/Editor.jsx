import React, { Component } from 'react'

export default class Editor extends Component {
    render() {
        return (
            <div className="editor-root">
                <form>
                    Editor
                    <div>
                        <input type="text" className="editor-input" />
                    </div>
                </form>
            </div>
        )
    }
}
