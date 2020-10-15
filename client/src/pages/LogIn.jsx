import React from "react";

import { setLoggedIn } from "../redux/stores/common/actions";
import { useDispatch } from "react-redux";

export default function LogIn() {
  const dispatch = useDispatch();

  return (
    <div>
      <button
        id="LogInButton"
        onClick={() => {
          dispatch(setLoggedIn(true));
        }}
      >
        Log in
      </button>
    </div>
  );
}
