import React, { useState, useEffect } from "react";
import Lottie from "react-lottie";

export default function ControlledAnimation({ name, progress, limits }) {
  const [isStopped, setIsStopped] = useState(true);

  const defaultOptions = {
    loop: false,
    autoplay: false,
    animationData: require(`./lotties/${name}.json`),
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  useEffect(() => {
    if (progress > limits.start && progress < limits.stop) {
      setIsStopped(false);
    } else {
      setIsStopped(true);
    }
  }, [progress, limits.start, limits.stop]);

  return (
    <>
      <div className="svg">
        <Lottie options={defaultOptions} isStopped={isStopped} />
      </div>
    </>
  );
}
