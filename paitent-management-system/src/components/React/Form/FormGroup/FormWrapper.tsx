import React from 'react';
import { FormWrapperProps } from './Form';
import { Label } from 'reactstrap';
import ErrorComponent from '../ErrorComponent';

const FormWrapper: FunctionComponent<FormWrapperProps> = (props) => {
  const { touched, errors, label, name } = props;
  return (
    <div className="form-group mb-3">
      <Label>{label}</Label>
      {props.children}
      <ErrorComponent touched={touched!} error={errors!} name={name} />
    </div>
  );
};

export default FormWrapper;
