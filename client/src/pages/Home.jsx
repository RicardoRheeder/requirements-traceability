import React from 'react'

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
