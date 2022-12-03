import React from 'react';
import classNames from 'classnames';

interface Props {
  scrollable?: boolean;
  children?: React.ReactNode;
  className?: string;
  responsive?: boolean;
}

const AbsoluteLayout: FunctionComponent<Props> = (props) => {
  let { scrollable, className, responsive } = props;
  return (
    <div
      className={classNames(
        'app-absolute-layout',
        { scrollable: scrollable, responsive: responsive },
        className
      )}>
      {props.children}
    </div>
  );
};

export default AbsoluteLayout;
