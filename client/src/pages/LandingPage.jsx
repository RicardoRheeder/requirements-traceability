import React from 'react'
import { LoginButton } from '../components'

export default function LandingPage() {
  return (
    <div className="landing-page-root">
      <div className="logo-area">
      <img className="landing-logo-icon" src="/assets/images/Doc_Tracer_Banner_1_dark.png"></img>
      {/* <img className="landing-logo-name" src="/assets/images/Doc_Tracer_Name_dark.png"></img> */}
        <div>Let's get started!</div>
      </div>

      <LoginButton />
    </div>
  )
}
