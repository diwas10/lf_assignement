import React, { FC } from 'react';

interface Props {
  children?: React.ReactNode;
}

const MainLayout: FC<Props> = (props) => {
  return (
    <main className="app-flex-layout app-main-layout position-relative">{props.children}</main>
  );
};

export default MainLayout;
