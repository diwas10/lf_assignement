import React from 'react';
import { FormikErrors, FormikTouched } from 'formik';
import { AiFillWarning } from 'react-icons/all';

interface Props {
  touched: FormikTouched<{ [key: string]: any }>;
  error: FormikErrors<{ [key: string]: any }>;
  name: string;
}

const ErrorComponent: FunctionComponent<Props> = (props) => {
  const { touched, name, error } = props;
  if (!(touched[name] && error[name])) return null;
  return (
    <small className={'text-danger mt-1 text-left d-flex align-items-center'}>
      <AiFillWarning /> {error[name] as string}
    </small>
  );
};

export default ErrorComponent;
