import React from "react";
import { connect, useDispatch } from "react-redux";
import { useEffect } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { fetchUserInfoAsync } from "../redux/stores/user/actions";
import { LeftContainer } from '../components'

function Home({ fetchUserInfoAsync, isFetching, info, errorMessage }) {
  // console.log(isFetching);
  const { user } = useAuth0();

  useEffect(() => {
    if (user) {
      fetchUserInfoAsync(user);
    }
  }, [fetchUserInfoAsync]);

  console.log(info);

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
  );
}

const mapStateToProps = (state) => ({
  isFetching: state.user.isFetching,
  info: state.user.info,
  errorMessage: state.user.errorMessage,
});
const mapDispatchToProps = (dispatch) => ({
  fetchUserInfoAsync: (user) => dispatch(fetchUserInfoAsync(user)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Home);
