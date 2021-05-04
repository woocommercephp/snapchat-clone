import React from "react";
import "./Chat.css";
import Avatar from "@material-ui/core/Avatar";
import StopRoundedIcon from "@material-ui/icons/StopRounded";
import ReactTimeago from "react-timeago";
import { selectImage, selectUser } from "./features/appSlice";
import { useDispatch, useSelector } from "react-redux";
import { auth, db } from "./firebase";
import { useHistory } from "react-router";

function Chat({ id, userName, timestamp, imageUrl, read }) {
  const user = useSelector(selectUser);
  const dispatch = useDispatch();
  const history = useHistory();
  const open = () => {
    if (!read) {
      console.log("open()");
      dispatch(selectImage(imageUrl));
      db.collection("posts")
        .doc(id)
        .set(
          {
            read: true,
          },
          { merge: true }
        )
        .then(() => {
          history.push("/chats/view");
        });
    } else {
      console.log("read property is true");
    }
  };
  return (
    <div className="chat" onClick={open}>
      <Avatar
        className="chat__avatar"
        alt={userName}
        src={user.profilePic}
        onClick={() => {
          auth.signOut();
        }}
      />
      <div className="chat__info">
        <h4>{userName}</h4>
        <p>
          <ReactTimeago
            date={new Date(Number(timestamp) * 1000).toUTCString()}
          />
        </p>
      </div>
      {!read && <StopRoundedIcon className="chat__readIcon" />}
    </div>
  );
}

export default Chat;
