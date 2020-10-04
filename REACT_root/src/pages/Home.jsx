import React, { Component } from 'react'

import { ReactFlow_Test, CustomNodeFlow } from './'

export default class Home extends Component {
    constructor(props) {
        super(props);
        this.state = { isBasic: true };
    }

    render() {
        return (
            <div>
                Node REACT-flow prototyping
                <br />
                *Note: Cannot have more than one graph render at a time*
                <br />
                <button onClick={() => { this.setState({ isBasic: !this.state.isBasic }) }}>
                    Switch Graph
                </button>
                {this.state.isBasic ? <ReactFlow_Test /> : <CustomNodeFlow />}
            </div>
        )
    }
}
