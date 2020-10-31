import React from 'react'
import { connect, useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'
import { useAuth0 } from '@auth0/auth0-react'
import {
  fetchUserDocsAsync,
  fetchUserInfoAsync,
} from '../redux/stores/user/actions'
import { LeftContainer } from '../components'

function Home() {
  // getting the current user who is signed in
  const { user } = useAuth0()
  const dispatch = useDispatch()

  // getting info and errorMessage from initial state
  const userInfo = useSelector((state) => state.user.info)
  const errorMessage = useSelector((state) => state.user.errorMessage)
  const docs = useSelector((state) => state.user.documents)

  // use effect to fetch the user info when the component mounts
  useEffect(() => {
    if (user) {
      // dispatching async call with the user as a parameter
      dispatch(fetchUserInfoAsync(user))
      dispatch(fetchUserDocsAsync(user))
    }
  }, [fetchUserInfoAsync, fetchUserDocsAsync])

  console.log(user)
  console.log(userInfo)
  console.log(errorMessage)
  console.log(docs)

  return (
    <div className="home-root">
      <div className="left-container">
        <LeftContainer docs={docs} />
      </div>
      <div className="center-container">
        <div className="home-header">
          <img
            className="home-logo-banner"
            src="/assets/images/Doc_Tracer_Logo_2.png"
          ></img>
        </div>
        <div className="home-subheader">Recent Documents</div>
      </div>
      <div className="right-container">Notifications</div>
    </div>
  )
}

export default Home
