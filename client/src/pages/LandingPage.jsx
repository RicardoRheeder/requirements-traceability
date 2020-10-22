import React from 'react'
import { LoginButton } from '../components'

export default function LandingPage() {
  return (
    <div className="landing-page-root">
      <div className="logo-area">
        Doc Tracer logo here!
        <div>Let's get started!</div>
      </div>

      <LoginButton />
    </div>
  )
}
