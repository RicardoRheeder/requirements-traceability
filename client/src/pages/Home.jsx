import React from 'react'
import { connect } from 'react-redux'
import { useEffect} from 'react'
import {useAuth0} from '@auth0/auth0-react'
import { createDocAsync} from '../redux/stores/documents/actions'


export default function Home({isFetching, documents, errorMessage}) {
    const {user} = useAuth0()
    let oldID = user.sub;
    let newID = oldID.slice(6, oldID.length); 
    const doc = {title: "New Doc", admin: newID}

    useEffect(()=>{
        if(user){
            createDocAsync(user)
        }
    },[createDocAsync])
  return (
  <div className="home-root">
      <div className="lefter-container">
          <div className="display-area">
            
          </div>
          <div className="add-remove-buttons">
              <button className="orange-button add-button">Add</button>
              <button className="orange-button remove-button">Remove</button>
          </div>
      </div>
    <div className="left-container">
        <div className="home-header">
            Doc Tracer Logo
        </div>
        <div className="home-subheader">
            Recent Documents
        </div>
    </div>
        <div className="right-container">
            Notifications
        </div>
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
  
