import React, { ReactElement } from 'react';

interface Props {
  children?: ReactElement;
}

const BaseLayout: FunctionComponent<Props> = (props) => {
  const { children } = props;

  return <div className="app-height app-wrapper-layout">{children}</div>;
};

export default BaseLayout;
