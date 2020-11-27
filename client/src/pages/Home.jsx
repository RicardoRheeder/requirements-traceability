import React from 'react'
import { useDispatch } from 'react-redux'
import { useEffect } from 'react'
import { useAuth0 } from '@auth0/auth0-react'
import {
  fetchUserInfoAsync,
  fetchUserRecentDocsAsync,
} from '../redux/stores/user/actions'
import { fetchUserDocsAsync } from '../redux/stores/document/actions'
import { LeftContainer } from '../components'
import RecentDocCard from '../components/RecentDocCard'

function Home() {
  // getting the current user who is signed in
  const { user } = useAuth0()
  const dispatch = useDispatch()

  // use effect to fetch the user info when the component mounts
  useEffect(() => {
    if (user) {
      // dispatching async call with the user as a parameter
      dispatch(fetchUserInfoAsync(user))
      dispatch(fetchUserDocsAsync(user))
      dispatch(fetchUserRecentDocsAsync(user.email))
    }
  }, [])
  // console.log(recent_docs)
  return (
    <div className="home-root styled-background-blue">
      <div className="left-container">
        <LeftContainer />
      </div>
      <div className="center-container">
        <div className="home-header">
          <img
            className="home-logo-banner"
            src="./assets/images/Doc_Tracer_Logo_2.png"
          ></img>
        </div>
        <RecentDocCard />
      </div>
      <div className="right-container">Notifications</div>
    </div>
  )
}
export default Home
