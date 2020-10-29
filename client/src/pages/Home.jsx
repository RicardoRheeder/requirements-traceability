import React from 'react'
import { connect, useDispatch } from 'react-redux'
import { useEffect } from 'react'
import { useAuth0 } from '@auth0/auth0-react'
import { fetchUserInfoAsync } from '../redux/stores/user/actions'

function Home({ fetchUserInfoAsync, isFetching, info, errorMessage }) {
  const { user } = useAuth0()

  useEffect(() => {
    if (user) {
      fetchUserInfoAsync(user)
    }
  }, [fetchUserInfoAsync])

  console.log(info)

  return (
    <div className="home-root">
      <div className="lefter-container">
        <div className="display-area"></div>
        <div className="add-remove-buttons">
          <button className="orange-button add-button">Add</button>
          <button className="orange-button remove-button">Remove</button>
        </div>
      </div>
      <div className="left-container">
        <div className="home-header">Doc Tracer Logo</div>
        <div className="home-subheader">Recent Documents</div>
      </div>
      <div className="right-container">Notifications</div>
    </div>
  )
}

const mapStateToProps = (state) => ({
  isFetching: state.user.isFetching,
  info: state.user.info,
  errorMessage: state.user.errorMessage,
})
const mapDispatchToProps = (dispatch) => ({
  fetchUserInfoAsync: (user) => dispatch(fetchUserInfoAsync(user)),
})

export default connect(mapStateToProps, mapDispatchToProps)(Home)
