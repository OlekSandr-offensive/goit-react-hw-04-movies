import React from 'react';
import errorImage from '../../images/not-found.png';

const ImageError = () => {
  return (
    <>
      <img src={errorImage} width="186" height="279" alt="not-found" />
    </>
  );
};

export default ImageError;
