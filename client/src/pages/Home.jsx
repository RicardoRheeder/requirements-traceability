import React from 'react'
<<<<<<< HEAD
import { connect, useDispatch } from 'react-redux'
import { useEffect } from 'react'
import { useAuth0 } from '@auth0/auth0-react'
import { fetchUserInfoAsync } from '../redux/stores/user/actions'
import { LeftContainer } from '../components'

function Home({ fetchUserInfoAsync, isFetching, info, errorMessage }) {
  // console.log(isFetching);
  const { user } = useAuth0()
  console.log(user)
  useEffect(() => {
    if (user) {
      fetchUserInfoAsync(user)
    }
  }, [fetchUserInfoAsync])

  console.log(info)
=======
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'
import { useAuth0 } from '@auth0/auth0-react'
import { fetchUserInfoAsync } from '../redux/stores/user/actions'
import { fetchUserDocsAsync } from '../redux/stores/document/actions'
import { LeftContainer } from '../components'

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
      dispatch(fetchUserDocsAsync(user))
    }
  }, [fetchUserInfoAsync, fetchUserDocsAsync])

  // console.log(user)
  // console.log(userInfo)
  // console.log(errorMessage)
>>>>>>> master

  return (
    <div className="home-root">
      <div className="left-container">
        <LeftContainer />
      </div>
      <div className="center-container">
<<<<<<< HEAD
        <div className="home-header">Doc Tracer Logo</div>
=======
        <div className="home-header">
          <img
            className="home-logo-banner"
            src="/assets/images/Doc_Tracer_Logo_2.png"
          ></img>
        </div>
>>>>>>> master
        <div className="home-subheader">Recent Documents</div>
      </div>
      <div className="right-container">Notifications</div>
    </div>
  )
}

<<<<<<< HEAD
const mapStateToProps = (state) => ({
  isFetching: state.user.isFetching,
  info: state.user.info,
  errorMessage: state.user.errorMessage,
})
const mapDispatchToProps = (dispatch) => ({
  fetchUserInfoAsync: (user) => dispatch(fetchUserInfoAsync(user)),
})

export default connect(mapStateToProps, mapDispatchToProps)(Home)
=======
export default Home
>>>>>>> master
