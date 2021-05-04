import React, { useEffect } from "react";
import WebcamCapture from "./WebcamCapture";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Preview from "./Preview";
import Chats from "./Chats";
import "./App.css";
import ChatView from "./ChatView";
import { useDispatch, useSelector } from "react-redux";
import { login, logout, selectUser } from "./features/appSlice";
import Login from "./Login";
import { auth } from "./firebase";

function App() {
  useEffect(() => {
    auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        console.log("User already logged in");
        dispatch(
          login({
            username: authUser.displayName,
            profilePic: authUser.photoURL,
            id: authUser.uid,
          })
        );
      } else {
        dispatch(logout());
      }
    });
  }, []);
  const user = useSelector(selectUser);
  const dispatch = useDispatch();
  return (
    <div className="app">
      <Router>
        {!user ? (
          <Login />
        ) : (
          <div className="app__body">
            <Switch>
              <Route path="/chats/view">
                <ChatView />
              </Route>
              <Route path="/chats">
                <Chats />
              </Route>
              <Route path="/preview">
                <Preview />
              </Route>
              <Route exact path="/">
                <WebcamCapture />
              </Route>
            </Switch>
          </div>
        )}
      </Router>
    </div>
  );
}

export default App;
