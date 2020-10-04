// KEPT AS AN EXAMPLE OF USING THE STORE

import React, { Component } from 'react';
import { connect } from '../redux';

class ReactComponent extends Component {
    render() {
        const onClick = () => this.props.setProp(Math.floor((Math.random() * 100)));
        return (
            <div className="react-component-root" onClick={onClick}>
                Component { this.props.anotherProp }
            </div>
        )
    }
}

export default connect({
    props: {
        common: ["anotherProp"]
    },
    actions: {
        common: ["setProp"],
    }
})(ReactComponent);
