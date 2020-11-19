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
    <div className="aboot-root styled-background-blue">
      <div className="about-content-area">
        <img
          className="about-logo-banner"
          src="/assets/images/Doc_Tracer_Banner_1_lite.png"
        ></img>
        <h1 className="about-description-title">What is Doc Tracer?</h1>
        <div className="about-description">
          <div>
            Doc Tracer is a tool that allows a team to collaboratively work on a
            software requirements document and be able to see how the document
            changes over time. The design allows high level requirements to be
            broken down into low level requirements, then design, and then
            source code in such a way that the relationship between each of
            these components is apparent.
          </div>
          <br />
          <div>
            A key component is the versioning system to ensure that the history
            of the requirements are preserved and that there is a versioning
            identifier to track changes that the document has gone through. In
            addition every component (High level requirement, low level
            requirements, etc) have a unique identifier to differenciate between
            them.
          </div>
        </div>
        <h1 className="about-description-title">Where can I read more?</h1>
        <div className="about-description">
          The Doc Tracer README can be found on our GitLab page:
          <br></br>
          <br></br>
          <a href="https://git.cs.usask.ca/CMPT371-01-2020/requirements-traceability/-/blob/master/README.md">
            Click here
          </a>
          <br></br>
        </div>
        <h1 className="about-description-title">Contact info:</h1>
        <div className="about-description">
          Contact link pending. . .<br></br>
          <br></br>
          <a href="url"></a>
          <br></br>
          <form action="">
            <label for="Name">Name: </label>
            <br></br>
            <input
              className="about-input-field"
              placeholder="Type your name..."
            ></input>
            <br></br>
            <label for="email">Email: </label>
            <br></br>
            <input
              className="about-input-field"
              placeholder="Type your email..."
            ></input>
            <br></br>
            <label for="subject">Subject: </label>
            <br></br>
            <input
              className="about-input-field"
              placeholder="Type your subject..."
            ></input>
            <br></br>
            {/* <textarea id="email-content" name="content" placeholder="Type here..."></textarea> */}
            <br></br>
            <input
              className="orange-button"
              type="submit"
              value="Submit"
            ></input>
          </form>
        </div>
      </div>
    </div>
  )
}

export default About
