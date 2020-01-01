import React from "react";
import Navigation from "../components/Navigation/Navigation";
import Logo from "../components/Logo/Logo";
import ImageLinkForm from "../components/ImageLinkForm/ImageLinkForm";
import FaceRecognition from "../components/FaceRecognition/FaceRecognition";
import Rank from "../components/Rank/Rank";
import Signin from "../components/Signin/Signin";
import Register from "../components/Register/Register";
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

const initialState = {
  input: "",
  imageUrl: "",
  box: {},
  route: "signin",
  isSignedIn: false,
  user: {
    id: "",
    name: "",
    email: "",
    password: "",
    entries: 0,
    joined: ""
  }
};

class App extends React.Component {
  constructor() {
    super();
    this.state = initialState;
  }

  componentDidMount() {
    fetch("http://localhost:3000/")
      .then(response => response.json())
      .then(console.log);
  }

  loadUser = data => {
    this.setState({
      user: {
        id: data.id,
        name: data.name,
        email: data.email,
        password: data.password,
        entries: data.entries,
        joined: data.joined
      }
    });
  };

  calculateBoundingBox = data => {
    const clarifaiResponse =
      data.outputs[0].data.regions[0].region_info.bounding_box;
    const image = document.getElementById("inputImage");
    const height = Number(image.height);
    const width = Number(image.width);

    return {
      topRow: clarifaiResponse.top_row * height,
      leftCol: clarifaiResponse.left_col * width,
      bottomRow: height - clarifaiResponse.bottom_row * height,
      rightCol: width - clarifaiResponse.right_col * width
    };
  };

  displayBoundingBox = box => {
    this.setState({ box: box });
  };

  onInputChange = event => {
    this.setState({ input: event.target.value });
  };

  onButtonSubmit = () => {
    this.setState({ imageUrl: this.state.input });
    app.models
      .predict(Clarifai.FACE_DETECT_MODEL, this.state.input)
      .then(response => {
        if (response) {
          fetch("http://localhost:3000/image", {
            method: "post",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              id: this.state.user.id
            })
          })
            .then(response => response.json())
            .then(count => {
              this.setState(Object.assign(this.state.user, { entries: count }));
            });
        }
        this.displayBoundingBox(
          this.calculateBoundingBox(response)
        ).catch(err => console.log(err));
      });
  };

  onRouteChange = route => {
    if (route === "signout" || route === "signin") {
      this.setState(initialState);
    } else if (route === "home") {
      this.setState({ isSignedIn: true });
    }
    this.setState({ route: route });
  };

  render() {
    return (
      <div className="App">
        <Particles className="particles" params={paramsOption} />
        {this.state.route === "signin" ? (
          <div>
            {" "}
            <Navigation
              onRouteChange={this.onRouteChange}
              isSignedIn={this.state.isSignedIn}
            />
            <Logo />
            <Signin
              loadUser={this.loadUser}
              onRouteChange={this.onRouteChange}
            />
          </div>
        ) : this.state.route === "home" ? (
          <div>
            <Navigation
              onRouteChange={this.onRouteChange}
              isSignedIn={this.state.isSignedIn}
            />
            <Logo />
            <Rank
              name={this.state.user.name}
              entries={this.state.user.entries}
            />
            <ImageLinkForm
              onInputChange={this.onInputChange}
              onButtonSubmit={this.onButtonSubmit}
            />
            <FaceRecognition
              boundingBox={this.state.box}
              imageUrl={this.state.imageUrl}
            />
          </div>
        ) : (
          <div>
            {" "}
            <Navigation
              onRouteChange={this.onRouteChange}
              isSignedIn={this.state.isSignedIn}
            />
            <Logo />
            <Register
              loadUser={this.loadUser}
              onRouteChange={this.onRouteChange}
            />
          </div>
        )}
      </div>
    );
  }
}

export default App;
