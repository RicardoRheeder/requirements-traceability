import React from 'react'

export default function Modal_InviteUser() {
  return (
    <div>
      <h2>{'Invite user(s) to document'}</h2>
      <div>
        {'Please enter the email address(es) of the user(s) to invite.'}
      </div>
      <div>
        {'When entering multiple email addresses, use commas to separate.'}
      </div>
      <form>
        <input type="email" id="emails" name="emails" multiple />
        <button>Submit</button>
      </form>
    </div>
  )
}
