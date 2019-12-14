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

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      input: ""
    };
  }

  onInputChange = event => {
    console.log(event.target.value);
  };
  render() {
    return (
      <div className="App">
        <Particles className="particles" params={paramsOption} />
        <Navigation />
        <Logo />
        <Rank />
        <ImageLinkForm onInputChange={this.onInputChange} />
        {/* {<FaceRecognition />} */}
      </div>
    );
  }
}

export default App;
