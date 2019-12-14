import React from "react";
import Tilt from "react-tilt";
import "./Logo.css";
import Brain from "../../assets/brain.png";
const Logo = () => {
  return (
    <div className=" center ma4 mt0">
      <Tilt
        className="Tilt br2 shadow-2"
        options={{ max: 55 }}
        style={{ height: 150, width: 150 }}
      >
        <div className="Tilt-inner">
          <img style={{ paddingTop: "30px" }} alt="logo" src={Brain}></img>
        </div>
      </Tilt>
    </div>
  );
};

export default Logo;
