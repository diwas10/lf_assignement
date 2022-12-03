import { ReactDatePickerProps } from 'react-datepicker';
import { InputType } from 'reactstrap/types/lib/Input';
import React, { TextareaHTMLAttributes } from 'react';
import { FormikErrors, FormikTouched } from 'formik';

interface FormWrapperProps {
  name: string;
  label?: string;
  touched?: FormikTouched<{ [p: string]: any }>;
  errors?: FormikErrors<{ [p: string]: any }>;
}

interface FormCommonProps extends FormWrapperProps {
  className?: string;
  type?: InputType;
  placeholder?: string;
}

interface FormInputProps extends FormCommonProps {
  value: string | number;
  onChange: React.ChangeEventHandler<HTMLInputElement> | undefined;
  onBlur: React.FocusEventHandler<HTMLInputElement> | undefined;
}

interface FormDatePickerProps extends FormCommonProps, ReactDatePickerProps {
  value: string;
  onChange: React.ChangeEventHandler<HTMLInputElement> | undefined;
}

interface FormTextAreaProps extends TextareaHTMLAttributes<HTMLTextAreaElement>, FormCommonProps {
  rows?: number;
  maxLength?: number;
  minLength?: number;
  onChange?: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  onBlur?: React.FocusEventHandler<HTMLTextAreaElement>;
}

interface FormChildren {
  Date: FunctionComponent<FormDatePickerProps>;
  Input: FunctionComponent<FormInputProps>;
  Textarea: FunctionComponent<FormTextAreaProps>;
}
