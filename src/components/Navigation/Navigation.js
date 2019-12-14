import React from "react";
import "./Navigation.css";

const Navigation = ({ onRouteChange, isSignedIn }) => {
  if (isSignedIn === true) {
    return (
      <nav
        style={{ display: "flex", justifyContent: "flex-end" }}
        className="sticky"
      >
        <p
          onClick={() => {
            onRouteChange("signin");
          }}
          className="f3 link dim black underline pa3 pointer"
        >
          Sign Out
        </p>
      </nav>
    );
  } else {
    return (
      <nav className="sticky">
        {" "}
        <nav style={{ display: "flex", justifyContent: "flex-end" }}>
          <p
            onClick={() => {
              onRouteChange("signin");
            }}
            className="f3 link dim black underline pa3 pointer"
          >
            Sign in
          </p>
          <p
            onClick={() => {
              onRouteChange("register");
            }}
            className="f3 link dim black underline pa3 pointer"
          >
            Register
          </p>
        </nav>
      </nav>
    );
  }
};

export default Navigation;
