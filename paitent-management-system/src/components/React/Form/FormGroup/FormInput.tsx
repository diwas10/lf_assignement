import React, { forwardRef } from 'react';
import { Input } from 'reactstrap';
import { FormInputProps } from './Form';
import FormWrapper from './FormWrapper';

const FormInput: FunctionComponent<FormInputProps> = forwardRef<HTMLInputElement, FormInputProps>(
  (props, ref) => {
    const { errors, touched, label, ...inputProps } = props;
    return (
      <FormWrapper {...props}>
        <Input {...inputProps} ref={ref as any} />
      </FormWrapper>
    );
  }
);

FormInput.defaultProps = {
  type: 'text'
};

export default FormInput;
