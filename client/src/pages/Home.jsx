import React from 'react'

export default function Home() {
  return (
  <div className="home-root">
      <div className="lefter-container">
          <div className="display_area">
            
          </div>
          <div className="add_remove_buttons">
              <button className="orange-button add_button">Add</button>
              <button className="orange-button remove_button">Remove</button>
          </div>
      </div>
    <div className="left-container">
        <div className="home-header">
            Doc Tracer Logo
        </div>
        <div className="home-subheader">
            Recent Documents
        </div>
    </div>
        <div className="right-container">
            Notifications
        </div>
    </div>
  )
}
