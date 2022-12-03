import React, { useEffect, useState } from 'react';
import throttle from 'lodash/throttle';

interface IProps {}

const WrapperLayout: FunctionComponent<IProps> = (props) => {
  const [dimensions, setDimensions] = useState({
    width: window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth,
    height:
      window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight
  });

  const adjustLayout = throttle(() => {
    setDimensions({
      ...dimensions,
      width: window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth,
      height:
        window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight
    });
  }, 500);

  useEffect(() => {
    window.addEventListener('resize', adjustLayout);
    return () => window.removeEventListener('resize', adjustLayout);
  }, [adjustLayout]);

  return <div id="wrapper">{props.children}</div>;
};

export default WrapperLayout;
