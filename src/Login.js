import { Button } from "@material-ui/core";
import { Restaurant } from "@material-ui/icons";
import React from "react";
import { useDispatch } from "react-redux";
import { login } from "./features/appSlice";
import { auth, provider } from "./firebase";

function Login() {
  const dispatch = useDispatch();
  const signIn = () => {
    auth.signInWithPopup(provider).then((result) => {
      dispatch(
        login({
          username: result.user.displayName,
          profilePic: result.user.photoURL,
          id: result.user.uid,
        })
      );
    }).catch((err) => {
      alert(err.message)
    })

  };
  return (
    <div className="login">
      <div className="login__container">
        <Button onClick={signIn}>Login</Button>
      </div>
    </div>
  );
}

export default Login;
