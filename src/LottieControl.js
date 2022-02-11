import * as React from "react";
import "./styles.css";
import lottie from "lottie-web";

const LottieControl = (props) => {
  const lottieRef = React.useRef(null);
  

  React.useEffect(() => {
    var animDuration = props.duration;
    const anim = lottie.loadAnimation({
      container: lottieRef.current,
      renderer: "svg",
      loop: false,
      autoplay: false,

      animationData: require(`./lotties/${props.name}.json`),
      rendererSettings: {
        preserveAspectRatio: "xMidYMid slice"
      }
    });

    function animatebodymovin(duration) {
      const scrollPosition = window.scrollY;
      const maxFrames = anim.totalFrames;

      const frame = (maxFrames / 100) * (scrollPosition / (duration / 100));

      anim.goToAndStop(frame, true);
    }
    const onScroll = () => {
      console.log("Scrolling");
      animatebodymovin(animDuration);
    };

    document.addEventListener("scroll", onScroll);

    return () => {
      anim.destroy();
      document.removeEventListener("scroll", onScroll);
    };
  }, []);

  return <div  ref={lottieRef}></div>;
};

export default LottieControl;
