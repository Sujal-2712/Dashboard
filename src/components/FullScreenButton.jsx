import React, { useState } from 'react';
import screenfull from 'screenfull';
import { BsFullscreen } from "react-icons/bs";
import { RxExitFullScreen } from "react-icons/rx";



const FullScreenButton = () => {
  const [isFullScreen, setIsFullScreen] = useState(false);

  const toggleFullScreen = () => {
    if (screenfull.isEnabled) {
      screenfull.toggle();
      setIsFullScreen(screenfull.isFullscreen);
    }
  };

  screenfull.on('change', () => {
    setIsFullScreen(screenfull.isFullscreen);
  });

  return (
    <>
      <button onClick={toggleFullScreen}>
      {isFullScreen ? <RxExitFullScreen /> : <BsFullscreen/>}
      </button>
    </>
  );
};

export default FullScreenButton;