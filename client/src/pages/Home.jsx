import React from 'react'

import { LeftContainer } from '../components'

export default function Home() {
  return (
    <div className="home-root">
      <div className="left-container">
        <LeftContainer />
      </div>
      <div className="center-container">
        <div className="home-header">
          <img className="home-logo-banner" src="/assets/images/Doc_Tracer_Logo_2.png"></img>
        </div>
        <div className="home-subheader">Recent Documents</div>
      </div>
      <div className="right-container">Notifications</div>
    </div>
  )
}
