import React from 'react';
import horse from './blackKnight.png'; // Tell webpack this JS file uses this image


function ImgHolder() {
  // Import result is the URL of your image
  return <img src={horse} width="300px" alt="Horse" />;
}

export default ImgHolder;