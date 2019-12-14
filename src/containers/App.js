import React from "react";
import Navigation from "../components/Navigation";
import Logo from "../components/Logo";
import ImageLinkForm from "../components/ImageLinkForm";
import FaceRecognition from "../components/FaceRecognition";
import Rank from "../components/Rank";
import Particles from "react-particles-js";
import Clarifai from "clarifai";
import "./App.css";

const app = new Clarifai.App({
  apiKey: "0d8d8178cf1f473991c03d35c2c49394"
});

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
      input: "",
      imageUrl: ""
    };
  }

  onInputChange = event => {
    console.log(event.target.value);
    this.setState({ input: event.target.value });
  };

  onButtonSubmit = () => {
    console.log("click");
    this.setState({ imageUrl: this.state.input });
    app.models
      .predict(
        Clarifai.FACE_DETECT_MODEL,
        "https://samples.clarifai.com/face-det.jpg"
      )
      .then(
        function(response) {
          // do something with response
          console.log(
            response.outputs[0].data.regions[0].region_info.bounding_box
          );
        },
        function(err) {
          // there was an error
        }
      );
  };

  render() {
    return (
      <div className="App">
        <Particles className="particles" params={paramsOption} />
        <Navigation />
        <Logo />
        <Rank />
        <ImageLinkForm
          onInputChange={this.onInputChange}
          onButtonSubmit={this.onButtonSubmit}
        />
        <FaceRecognition imageUrl={this.state.imageUrl} />
      </div>
    );
  }
}

export default App;
