import React from 'react';
import classNames from 'classnames';

interface Props {
  children?: React.ReactNode;
  horizontal?: boolean;
  className?: string;
}

const FlexLayout = (props: Props) => {
  return (
    <div
      className={classNames(
        'app-flex-layout',
        { 'app-flex-horizontal': props.horizontal },
        props.className
      )}>
      {props.children}
    </div>
  );
};

export default FlexLayout;
