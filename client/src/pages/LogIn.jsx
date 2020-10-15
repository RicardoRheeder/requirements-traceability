import React, { Component } from "react";
import { connect } from "../redux";
import { withRouter } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";

// class LogIn extends Component {

//     LogIn = () => {
//         this.props.setLoggedIn(true);
//         // setTimeout(() => {
//         //     this.props.history.push('/');
//         // }, 100);
//     }

//     render() {
//         return (
//             <div>
//                 <button id="LogInButton" onClick={() => { this.LogIn(); }}>
//                     Log in
//                 </button>
//             </div>
//         )
//     }
// }

// export default withRouter(connect({
//     props: {
//         common: ["loggedIn"]
//     },
//     actions: {
//         common: ["setLoggedIn"],
//     }
// })(LogIn));

const LogIn = ({ loggedIn, setLoggedIn }) => {
  const { user } = useAuth0();
  console.log(user);
  const { loginWithRedirect } = useAuth0();
  return <button onClick={() => loginWithRedirect()}>Log In</button>;
};

export default LogIn;
