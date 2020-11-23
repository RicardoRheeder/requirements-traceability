import React, { useState } from 'react'

function About() {
  const [emailSubject, setEmailSubject] = useState('')
  const [userName, setUserName] = useState('')
  const [userEmail, setUserEmail] = useState('')

  const [emailBody, setEmailBody] = useState('')
  const generateMailToString = () => {
    // A function to open the users mail app to send the feedback to our greenfoot gmail
    var email = 'tony+doctracer@persea.ca'

    var encodedSubject = emailSubject.split(' ').join('%20')
    // %20 refers to a space

    var encodedBody = emailBody.split(' ').join('%20')
    var encodeFooter = (
      '\n\nFrom: ' +
      userName +
      '\nEmail address: ' +
      userEmail
    )
      .split(' ')
      .join('%20')

    encodedBody += encodeFooter

    encodedBody = encodedBody.split('\n').join('%0D%0A')
    // %0D refers to carriage return, %0A refers to line feed (new line and line break)
    return `mailto:${email}?subject=${encodedSubject}&body=${encodedBody}`
  }

  const EditSubject = (event) => {
    setEmailSubject(event.target.value)
  }

  const EditUserName = (event) => {
    setUserName(event.target.value)
  }

  const EditUserEmail = (event) => {
    setUserEmail(event.target.value)
  }

  const EditBody = (event) => {
    setEmailBody(event.target.value)
  }

  return (
    <div className="aboot-root styled-background-blue ">
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
          <br />
          <div>
            For more information, please refer to the Doc Tracer{' '}
            <a href="https://git.cs.usask.ca/CMPT371-01-2020/requirements-traceability/-/blob/master/README.md">
              README
            </a>
          </div>
        </div>
        <h1 className="about-description-title">Features</h1>
        <div className="about-description features">
          <ul className="description-list">
            <li>Document creation and cloud storage</li>
            <li>Document editing and hierarchical management</li>
            <li>Invitation and collaboration within the document</li>
            <li>Document versioning</li>
            <li>Document exporting to PDF</li>
          </ul>
        </div>
        <h1 className="about-description-title">Contact info:</h1>
        <div className="about-description form-container">
          Contact link pending. . .<br></br>
          <br></br>
          <a href="url"></a>
          <br></br>
          <form action="">
            <div className="input-container">
              <div className="label-containers">
                <label className="form-labels" for="Name">
                  Name:{' '}
                </label>{' '}
                <input
                  type="text"
                  value={userName}
                  onChange={EditUserName}
                  className="about-input-field"
                  placeholder="Type your name..."
                ></input>
              </div>
              <div className="label-containers">
                <label className="form-labels" for="email">
                  Email:{' '}
                </label>{' '}
                <input
                  type="text"
                  value={userEmail}
                  onChange={EditUserEmail}
                  className="about-input-field"
                  placeholder="Type your email..."
                ></input>
              </div>
              <div className="label-containers">
                <label className="form-labels" for="subject">
                  Subject:{' '}
                </label>{' '}
                <input
                  type="text"
                  value={emailSubject}
                  onChange={EditSubject}
                  className="about-input-field"
                  placeholder="Type your subject..."
                ></input>
              </div>
            </div>

            <br></br>
            <textarea
              type="text"
              value={emailBody}
              onChange={EditBody}
              className="email-content"
              id="email-content"
              name="content"
              placeholder="Type here..."
            ></textarea>
            <br></br>
            <a href={generateMailToString()}>SUBMIT</a>
          </form>
        </div>
      </div>
    </div>
  )
}

export default About
