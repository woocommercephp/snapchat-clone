import React, { useCallback, useRef, useState } from "react";
import RadioButtonUncheckedIcon from "@material-ui/icons/RadioButtonUnchecked";
import Webcam from "react-webcam";
import { useDispatch } from "react-redux";
import { setCameraImage } from "./features/cameraSlice";
import { useHistory } from "react-router";
import "./WebcamCapture.css";

const videoConstrains = {
  width: 200,
  height: 400,
  facingMode: "user",
};

function WebcamCapture() {
  const webcamRef = useRef(null);

  const history = useHistory();

  const dispatch = useDispatch();

  const capture = useCallback(() => {
    const imageData = webcamRef.current.getScreenshot();
    dispatch(setCameraImage(imageData));
    history.push("/preview");
  }, [webcamRef]);

  return (
    <div className="webcamCapture">
      <Webcam
        audio={false}
        ref={webcamRef}
        screenshotFormat="image/jpeg"
        videoConstraints={videoConstrains}
      />
      <RadioButtonUncheckedIcon
        className="webcamCapture__button"
        onClick={capture}
        fontSize="large"
      />
    </div>
  );
}

export default WebcamCapture;
