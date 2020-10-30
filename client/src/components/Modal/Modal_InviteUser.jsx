import React from 'react'

export default function Modal_InviteUser() {
  return (
    <div>
      <h2>Invite user to document</h2>
      <div>Please enter the email address of the user to invite.</div>
      <label for="emails">Enter email addresses:</label>
      <form>
        <input type="email" id="emails" name="emails" multiple />
        <button>Submit</button>
      </form>
    </div>
  )
}
