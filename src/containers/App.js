import React from "react";
import Navigation from "../components/Navigation";
import Logo from "../components/Logo";
import ImageLinkForm from "../components/ImageLinkForm";
import Rank from "../components/Rank";
import Particles from "react-particles-js";
import "./App.css";

const paramsOption = {
  particles: {
    number: {
      value: 30,
      density: {
        enable: true,
        value: 40
      }
    }
  }
};

function App() {
  return (
    <div className="App">
      <Particles className="particles" params={paramsOption} />
      <Navigation />
      <Logo />
      <Rank />
      <ImageLinkForm />
      {/* {<FaceRecognition />} */}
    </div>
  );
}

export default App;
