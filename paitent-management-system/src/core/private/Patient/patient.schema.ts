import * as Yup from 'yup';

export interface PatientData {
  id?: string;
  fullName: string;
  dob: Date | string;
  contactNumber: string;
  email: string;
  address: string;
  profileImage?: File | null | string;
}

export interface PatientResponse {
  id: string;
  fullName: string;
  email: string;
  contactNumber: string;
  dob: string;
  address: string;
  profileImage: string;
}

export const patientInitialValues: PatientData = {
  fullName: '',
  dob: '',
  contactNumber: '',
  email: '',
  address: '',
  profileImage: null
};

export const patientValidationSchema = Yup.object().shape({
  fullName: Yup.string().required('Full Name is Required'),
  dob: Yup.date().nullable().typeError('Invalid Date').required('Date of Birth is Required!'),
  contactNumber: Yup.string()
    .min(10, 'Contact NUmber must be 10 digits')
    .max(10, 'Contact NUmber must be 10 digits')
    .required('Contact Number is Required'),
  email: Yup.string().email().required('Email is Required'),
  address: Yup.string().required('Address is Required')
});
