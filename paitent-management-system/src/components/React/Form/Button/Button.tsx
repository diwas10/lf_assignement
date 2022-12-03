import React from 'react';
import { Button as RButton, ButtonProps, Spinner } from 'reactstrap';

interface Props extends ButtonProps {
  loading?: boolean;
}

const Button: FunctionComponent<Props> = ({ loading, ...props }) => {
  return (
    <RButton {...props} disabled={props.disabled || loading}>
      {loading ? <Spinner size={'sm'} /> : props.children}
    </RButton>
  );
};

export default Button;
