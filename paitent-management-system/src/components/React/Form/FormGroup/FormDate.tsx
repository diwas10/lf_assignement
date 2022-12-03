import React, { forwardRef } from 'react';
import { FormDatePickerProps } from './Form';
import FormWrapper from './FormWrapper';
import ReactDatePicker from 'react-datepicker';

const FormDate: FunctionComponent<FormDatePickerProps> = forwardRef<
  ReactDatePicker,
  FormDatePickerProps
>((props, ref) => {
  return (
    <FormWrapper
      name={props.name}
      touched={props.touched}
      label={props.label}
      errors={props.errors}>
      <div className="react-datepicker-container">
        <ReactDatePicker
          {...props}
          value={props.value}
          autoComplete="off"
          selected={props.selected ?? (props.value ? new Date(props.value) : undefined)}
          className={props.className || 'form-control'}
          onChange={(date, e) => {
            const event = { target: { value: date, name: props.name } };
            props.onChange && props.onChange(event as any);
          }}
          ref={ref}
        />
      </div>
    </FormWrapper>
  );
});

export default FormDate;
