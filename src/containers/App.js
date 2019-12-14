import React from "react";
import Navigation from "../components/Navigation";
import Logo from "../components/Logo";
import ImageLinkForm from "../components/ImageLinkForm";
import Rank from "../components/Rank";

import "./App.css";

function App() {
  return (
    <div className="App">
      <Navigation />
      <Logo />
      <Rank/>
      <ImageLinkForm />
      {/* {<FaceRecognition />} */}
    </div>
  );
}

export default App;
