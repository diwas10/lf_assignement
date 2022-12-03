import React from 'react';
import classNames from 'classnames';

interface Props {
  scrollable?: boolean;
  children?: React.ReactNode;
  centered?: boolean;
  className?: string;
  stretch?: boolean;
  contain?: boolean;
}

const ContainerLayout: FunctionComponent<Props> = (props) => {
  let { scrollable, centered, className, stretch, contain } = props;
  return (
    <div
      className={classNames(
        {
          container: contain,
          'container-fluid': !contain
        },
        {
          scrollable: scrollable,
          'app-max-width': centered,
          'app-height': stretch
        },
        className
      )}>
      {props.children}
    </div>
  );
};

export default ContainerLayout;
