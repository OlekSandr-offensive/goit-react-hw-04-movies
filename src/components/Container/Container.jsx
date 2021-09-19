import React from 'react';
import '../Container/Container.scss';

export default function Container({ children }) {
  return <div className="container">{children}</div>;
}
