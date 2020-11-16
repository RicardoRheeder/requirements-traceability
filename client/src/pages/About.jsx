import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'
import { useAuth0 } from '@auth0/auth0-react'
import { fetchUserInfoAsync } from '../redux/stores/user/actions'
import { fetchUserDocsAsync } from '../redux/stores/document/actions'

function About() {
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
  
    return (
      <div className="about-root styled-background-blue">
        <div className="center-container">
          <div className="about-header">
            <img
              className="about-logo-banner"
              src="/assets/images/Doc_Tracer_Logo_2.png"
            ></img>
          </div>
          <div className="about-subheader">Platform Description:</div>
        </div>
      </div>
    )
  }
  export default About