import React from "react";

import { setLoggedIn } from "../redux/stores/common/actions";
import { useDispatch } from "react-redux";
import { useAuth0 } from "@auth0/auth0-react";

export default function LoginButton() {
  const dispatch = useDispatch();
  const { loginWithRedirect } = useAuth0();

  return (
    <button
      id="LogInButton"
      className="login-button"
      onClick={() => {
        // dispatch(setLoggedIn(true));
        loginWithRedirect();
      }}
    >
      Log in
    </button>
  );
}
