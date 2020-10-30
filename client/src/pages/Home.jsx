import React from 'react'
import { connect, useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'
import { useAuth0 } from '@auth0/auth0-react'
import { fetchUserInfoAsync } from '../redux/stores/user/actions'

function Home() {
  // getting the current user who is signed in
  const { user } = useAuth0()
  const dispatch = useDispatch()

  // getting info and errorMessage from initial state
  const userInfo = useSelector((state) => state.user.info)
  const errorMessage = useSelector((state) => state.user.errorMessage)

  // use effect to fetch the user info when the component mounts
  useEffect(() => {
    if (user) {
      // dispatching async call with the user as a parameter
      dispatch(fetchUserInfoAsync(user))
    }
  }, [fetchUserInfoAsync])

  console.log(user)
  console.log(userInfo)
  console.log(errorMessage)

  return (
    <div className="home-root">
      <div className="lefter-container">
        <div className="display-area"></div>
        <div className="add-remove-buttons">
          <button className="orange-button add-button">Add</button>
          <button className="orange-button remove-button">Remove</button>
        </div>
      </div>
      <div className="left-container">
        <div className="home-header">Doc Tracer Logo</div>
        <div className="home-subheader">Recent Documents</div>
      </div>
      <div className="right-container">Notifications</div>
    </div>
  )
}

export default Home
