import React, { Component } from 'react'


export default class HierarchyTab extends Component {
    constructor(props) {
        super(props)
        this.state = { highlighted : false }
    }

    render() {

        return (
            <div className={this.state.highlighted ? "hierarchy-tab-highlighted" : "hierarchy-tab"}
                onMouseEnter={this.handleMouseEnter}
                onMouseMove={this.handleMouseMove}
                onMouseLeave={this.handleMouseLeave}
            >
                Hierarchy Tab
            </div>
        )
    }

    handleMouseEnter = (e) => {
        if(e){
            console.log('onMouseEnter', e.clientX, e.clientY)
            this.setState({highlighted: true})
        }
    }
    handleMouseMove = (e) =>{
        if(e){
            console.log(
                'onMouseMove',
                e.nativeEvent.clientX, e.nativeEvent.clientY
            )
        }
    }
    handleMouseLeave = (e) =>{
        if(e){
            console.log('onMouseLeave', e.clientX, e.clientY)
            this.setState({highlighted: false})
        }
    }
}
