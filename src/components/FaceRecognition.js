import React from "react";
import "./FaceRecognition.css";

const FaceRecognition = ({ imageUrl, boundingBox }) => {
  return (
    <div className="center ma">
      <div className="absolute mt2">
        <img
          alt=""
          id="inputImage"
          src={imageUrl}
          width="400px"
          height="auto"
        />
        <div
          className="bounding-box"
          style={{
            top: boundingBox.topRow,
            left: boundingBox.leftCol,
            right: boundingBox.rightCol,
            bottom: boundingBox.bottomRow
          }}
        ></div>
      </div>
    </div>
  );
};

export default FaceRecognition;
