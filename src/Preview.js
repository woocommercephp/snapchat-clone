import React, { useEffect } from "react";
import { v4 as uuid } from "uuid";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router";

import { resetCameraImage, selectCameraImage } from "./features/cameraSlice";

import { db, storage } from "./firebase";
import firebase from "firebase";

import TextFieldsIcon from "@material-ui/icons/TextFields";
import CreateIcon from "@material-ui/icons/Create";
import NoteIcon from "@material-ui/icons/Note";
import MusicNoteIcon from "@material-ui/icons/MusicNote";
import AttachFileIcon from "@material-ui/icons/AttachFile";
import CropIcon from "@material-ui/icons/Crop";
import TimerIcon from "@material-ui/icons/Timer";
import SendIcon from "@material-ui/icons/Send";

import CloseIcon from "@material-ui/icons/Close";

import "./Preview.css";
import { selectUser } from "./features/appSlice";

function Preview() {
  const dispatch = useDispatch();
  const cameraImage = useSelector(selectCameraImage);

  const history = useHistory();

  const close = () => {
    dispatch(resetCameraImage());
    history.push("/");
  };

  const user = useSelector(selectUser);

  const sendPost = () => {
    console.log("sending post()");
    const id = uuid();
    const uploadTask = storage
      .ref(`posts/${id}`)
      .putString(cameraImage, "data_url");

    uploadTask.on(
      "state_changed",
      null,
      (err) => {
        console.log(err);
      },
      () => {
        storage
          .ref("posts")
          .child(id)
          .getDownloadURL()
          .then((url) => {
            db.collection("posts")
              .add({
                imageUrl: url,
                userName: user.username,
                read: false,
                timestamp: firebase.firestore.FieldValue.serverTimestamp(),
              })
              .then(() => {
                console.log("Image url added to db!");
                history.push("/chats");
              });
            console.log("Upload complete!");
          });
      }
    );
  };

  return (
    <div className="preview">
      <CloseIcon onClick={close} className="preview__close" />
      <div className="preview__toolbarRight">
        <TextFieldsIcon />
        <CreateIcon />
        <NoteIcon />
        <MusicNoteIcon />
        <AttachFileIcon />
        <CropIcon />
        <TimerIcon />
      </div>
      <img src={cameraImage} />
      <div className="preview__footer" onClick={sendPost}>
        <h2>send</h2>
        <SendIcon fontSize="small" className="preview__sendIcon" />
      </div>
    </div>
  );
}

export default Preview;
