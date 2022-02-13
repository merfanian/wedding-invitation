import LottieControl from "./LottieControl";
import React, { Component } from "react";
import "./styles.css";
import ControlledAnimation from "./ControlledAnimation";

class App extends Component {
  state = {
    position: 0,
    ornamentPosition:1000
  };
  componentDidMount() {
    window.addEventListener("scroll", this.listenToScroll);

    setInterval(()=> {
      if(this.state.position > this.state.ornamentPosition - 1 && this.state.position < 77){
        window.scrollBy(0,2)
      }
    }, 1)
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

      const ornamentHeight = document.getElementById('ornament_id').clientHeight;
    const scrolled = (winScroll / height) * 100;

    console.log(scrolled);
    this.setState({
      position: scrolled,
      ornamentPosition: ornamentHeight/height*100
    });
  };

  render() {
    return (
      <div className="App">
        <div id='ornament_id' className="ornament">
          <ControlledAnimation
            name="ornament"
            progress={this.state.position}
            limits={{ start: -1, stop: 6 }}
          />
        <h1>Dear Mr. Folani</h1>
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
