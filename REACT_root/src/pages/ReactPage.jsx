// KEPT AS AN EXAMPLE OF USING THE STORE

import React, { Component } from 'react';
import { ReactComponent } from '../components';
import { connect } from '../redux';

class ReactPage extends Component {
    render() {
        return (
            <div className="react-page-root">
                Page w/ Redux Prop: { this.props.prop }
                <ReactComponent/>
            </div>
        )
    }
}

export default connect({
    props: {
        common: ["prop"],
    },
})(ReactPage);
