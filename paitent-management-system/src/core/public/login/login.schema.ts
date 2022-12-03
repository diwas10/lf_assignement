import * as Yup from 'yup';

export const loginInitialValues = {
  email: '',
  password: ''
};

export const loginValidationSchema = Yup.object().shape({
  email: Yup.string().email('Invalid Email').required('Email is Required'),
  password: Yup.string()
    .required('Password is Required')
    .min(6, 'Minimum number of password is six')
    .max(8, 'Maximum number of password is eight')
});

export interface LoginResponse {
  user: {
    id: string;
    email: string;
  };
  refreshToken: string;
  accessToken: string;
}
