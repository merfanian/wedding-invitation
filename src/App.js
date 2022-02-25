import LottieControl from "./LottieControl";
import React, { Component } from "react";
import "./styles.css";
import ControlledAnimation from "./ControlledAnimation";

class App extends Component {
  state = {
    position: 0,
    ornamentPosition: 1000,
    loading: true,
    data: "",
  };
  componentDidMount() {
    const id = window.location.pathname;
    const url = "http://127.0.0.1:8000" + id;
    console.log(url);

    const that = this;
    fetch(url)
      .then(function (response) {
        return response.json();
      })
      .then(function (jsonData) {
        return JSON.stringify(jsonData);
      })
      .then(function (jsonStr) {
        that.setState({ data: JSON.parse(jsonStr), loading: false });
        console.log(JSON.parse(jsonStr));
      });

    window.addEventListener("scroll", this.listenToScroll);

    setInterval(() => {
      if (
        this.state.position > this.state.ornamentPosition - 1 &&
        this.state.position < 77
      ) {
        window.scrollBy(0, 2);
      }
    }, 1);
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

    const ornamentHeight = document.getElementById("ornament_id").clientHeight;
    const scrolled = (winScroll / height) * 100;

    this.setState({
      position: scrolled,
      ornamentPosition: (ornamentHeight / height) * 100,
    });
  };

  render() {
    if (this.state.loading) {
      return (
        <div>
          <h1>Loading...</h1>
        </div>
      );
    }
    let title;
    if (this.state.data["sex"] == "f") {
      title = <h1>سرکار خانم {this.state.data["name"]}</h1>;
    } else {
      title = <h1>جناب آقای {this.state.data["name"]}</h1>;
    }
    return (
      <div className="App">
        <div id="ornament_id" className="ornament">
          <ControlledAnimation
            name="ornament"
            progress={this.state.position}
            limits={{ start: -1, stop: 6 }}
          />
          <h1>{title}</h1>
        </div>
        <div
          className="start"
          style={{
            "-webkit-filter": `grayscale(${
              30 - this.state.position * 0.3
            }}%)` /* Safari 6.0 - 9.0 */,
            filter: `grayscale(${30 - this.state.position * 0.3}%)`,
          }}
        >
          <LottieControl duration="9000" name="start"></LottieControl>
        </div>
      </div>
    );
  }
}

export default App;
