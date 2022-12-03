import React, { FC, forwardRef } from 'react';
import FormWrapper from './FormWrapper';
import { FormTextAreaProps } from './Form';
import { Input } from 'reactstrap';

const FormTextarea: FC<FormTextAreaProps> = forwardRef<HTMLTextAreaElement, FormTextAreaProps>(
  (props, ref) => {
    return (
      <FormWrapper
        name={props.name!}
        touched={props.touched}
        label={props.label}
        errors={props.errors}>
        {/* @ts-ignore */}
        <Input type={'textarea'} {...props} ref={ref as any} />
      </FormWrapper>
    );
  }
);

FormTextarea.displayName = 'FormTextarea';

export default FormTextarea;
