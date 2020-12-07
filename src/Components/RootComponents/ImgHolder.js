import React from 'react';

function ImgHolder(props) {
  // Import result is the URL of your image
  return <img src={props.horse} width="300px" alt="Horse" />;
}

export default ImgHolder;