import React, { forwardRef } from 'react';
import FormDate from './FormDate';
import FormInput from './FormInput';
import { FormChildren } from './Form';
import FormTextarea from './FormTextArea';

interface FormProps
  extends React.DetailedHTMLProps<React.FormHTMLAttributes<HTMLFormElement>, HTMLFormElement> {}

type TForm = React.ForwardRefExoticComponent<FormProps & React.RefAttributes<HTMLFormElement>>;

// @ts-ignore
const Form: TForm & FormChildren = forwardRef<HTMLFormElement, FormProps>((props, ref) => {
  return (
    <form {...props} ref={ref} {...props}>
      {props.children}
    </form>
  );
});

Form.Date = FormDate;
Form.Input = FormInput;
Form.Textarea = FormTextarea;

export default Form;
