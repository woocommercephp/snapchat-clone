import Avatar from "@material-ui/core/Avatar";
import SearchIcon from "@material-ui/icons/Search";
import ChatBubbleOutlineIcon from "@material-ui/icons/ChatBubbleOutline";
import React, { useEffect, useState } from "react";
import "./Chats.css";
import { db } from "./firebase";
import Chat from "./Chat";
import RadioButtonUncheckedIcon from "@material-ui/icons/RadioButtonUnchecked";
import { useHistory } from "react-router";

function Chats() {
  const history = useHistory();
  const takeSnap = () => {
    history.push("/");
  };
  const [posts, setPosts] = useState([]);
  useEffect(() => {
    db.collection("posts")
      .orderBy("timestamp", "desc")
      .onSnapshot((snapshot) => {
        setPosts(
          snapshot.docs.map((doc) => {
            return {
              id: doc.id,
              data: doc.data(),
            };
          })
        );
      });
  }, []);
  useEffect(() => {
    console.log(posts);
  }, [posts]);
  return (
    <div className="chats">
      <div className="chats__header">
        <Avatar className="chats__avatar" />
        <div className="chats__search">
          <SearchIcon />
          <input placeholder="Friends" type="text" />
          <ChatBubbleOutlineIcon />
        </div>
      </div>
      <div className="chat__posts">
        {posts.map((post) => {
          return (
            <Chat
              key={post.id}
              id={post.id}
              userName={post.data.userName}
              timestamp={post.data.timestamp.seconds}
              imageUrl={post.data.imageUrl}
              read={post.data.read}
            />
          );
        })}
      </div>
      <RadioButtonUncheckedIcon
        className="chats__takePicIcon"
        onClick={takeSnap}
        fontSize="large"
      ></RadioButtonUncheckedIcon>
    </div>
  );
}

export default Chats;
