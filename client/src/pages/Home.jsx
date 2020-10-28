import React from 'react'
import { connect } from 'react-redux'
import { useEffect} from 'react'
import {useAuth0} from '@auth0/auth0-react'
import { createDocAsync} from '../redux/stores/documents/actions'

import { LeftContainer } from '../components'

export default function Home() {
  return (
    <div className="home-root">
      <div className="left-container">
        <LeftContainer />
      </div>
      <div className="center-container">
        <div className="home-header">Doc Tracer Logo</div>
        <div className="home-subheader">Recent Documents</div>
      </div>
      <div className="right-container">Notifications</div>
    </div>
  )
}

const mapStateToProps = (state) => ({
    isFetching: state.documents.isFetching,
    documents: state.documents.documents,
    errorMessage: state.documents.error,
  });
  const mapDispatchToProps = (dispatch) => ({
    createDocAsync: (doc) => dispatch(createDocAsync(doc)),
  });
  
  export default connect(mapStateToProps, mapDispatchToProps)(Home);
  
