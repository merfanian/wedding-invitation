import LottieControl from "./LottieControl";
import React, { Component } from "react";
import "./styles.css";
import ControlledAnimation from "./ControlledAnimation";

class App extends Component {
  state = {
    position: 0,
  };
  componentDidMount() {
    window.addEventListener("scroll", this.listenToScroll);
  }

  componentWillUnmount() {
    window.removeEventListener("scroll", this.listenToScroll);
  }

  listenToScroll = () => {
    const winScroll =
      document.body.scrollTop || document.documentElement.scrollTop;

    const height =
      document.documentElement.scrollHeight -
      document.documentElement.clientHeight;

    const scrolled = (winScroll / height) * 100;

    this.setState({
      position: scrolled,
    });
  };

  render() {
    return (
      <div className="App">
        <div className="start">
          <ControlledAnimation
            name="start"
            progress={this.state.position}
            limits={{ start: -1, stop: 30 }}
          />
        </div>
        <div className="intro">
          <LottieControl duration="2000" name="envelope"></LottieControl>
        </div>
      </div>
    );
  }
}

export default App;
