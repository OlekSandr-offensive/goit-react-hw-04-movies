import React from 'react';
import errorImage from '../../images/not-found.png';

const ImageError = ({ width = 186, height = 279 }) => {
  return (
    <>
      <img
        src={errorImage}
        width={`${width}px`}
        height={`${height}px`}
        alt="not-found"
      />
    </>
  );
};

export default ImageError;
