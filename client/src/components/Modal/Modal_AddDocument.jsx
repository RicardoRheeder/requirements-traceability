import React from 'react'
import { connect, useDispatch } from 'react-redux'
import { useAuth0 } from '@auth0/auth0-react'
import { createDocAsync } from '../../redux/stores/documents/actions'

function Modal_AddDocument({ createDocAsync, documents }) {
  const dispatch = useDispatch()
  const { user } = useAuth0()

  console.log(documents)

  const submitName = () => {
    // slicing the user id to remove "auth0|"
    const oldId = user.sub
    const newID = oldId.slice(6, oldId.length)

    createDocAsync({ title: 'test123', admin: newID })
    // dispatch(createDocAsync({ title: 'test123', admin: newID }))
  }

  return (
    <div>
      <h2>Add document</h2>
      <div>Please enter the name of the empty document to create.</div>
      <form>
        <input />
        <button onClick={submitName}>Submit</button>
      </form>
    </div>
  )
}

const mapStateToProps = (state) => ({
  documents: state.documents.documents,
  error: state.documents.error,
})

const mapDispatchToProps = (dispatch) => ({
  createDocAsync: (doc) => dispatch(createDocAsync(doc)),
})

export default connect(mapStateToProps, mapDispatchToProps)(Modal_AddDocument)
