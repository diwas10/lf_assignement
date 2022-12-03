import React, { useEffect, useRef, useState } from 'react';
import { Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap';
import { useFormik } from 'formik';
import {
  PatientData,
  patientInitialValues,
  PatientResponse,
  patientValidationSchema
} from './patient.schema';
import Form from '../../../components/React/Form/FormGroup';
import { useAddPatient, useEditPatient } from './patient.query';
import Button from '../../../components/React/Form/Button/Button';
import { BsUpload, ImCross } from 'react-icons/all';
import CropImage from '../../../components/React/Crop';
import { Crop } from 'react-image-crop';
import { getCroppedImg } from '../../../components/React/Crop/getCroppedBlob';
import { formatDate } from '../../../utility/date';
import { getServerImage } from '../../../utility/utility';

interface Props {
  isOpen: boolean;

  toggle(): void;

  selectedPatient: PatientResponse | undefined;
}

const PatientModal: FunctionComponent<Props> = (props) => {
  const { isOpen, toggle, selectedPatient } = props;

  const [profileCrop, setProfileCrop] = useState<Crop>();
  const [initialFormData, setInitialFormData] = useState(patientInitialValues);

  const profileImageRef = useRef<HTMLImageElement>(null);
  const fileRef = useRef<HTMLInputElement>(null);

  const addMutation = useAddPatient();
  const editPatient = useEditPatient(selectedPatient?.id!);

  const {
    handleSubmit,
    values,
    errors,
    touched,
    handleBlur,
    handleChange,
    setFieldValue,
    resetForm
  } = useFormik({
    enableReinitialize: true,
    initialValues: initialFormData,
    validationSchema: patientValidationSchema,
    onSubmit: (data) => handleFormSubmit(data)
  });

  useEffect(() => {
    if (selectedPatient) setInitialFormData(selectedPatient);
  }, [selectedPatient]);

  const onToggle = () => {
    toggle();
    setInitialFormData(patientInitialValues);
    resetForm();
  };

  const handleFormSubmit = async (data: PatientData) => {
    try {
      const requestData = {
        ...data,
        dob: formatDate(data.dob)
      };

      if (profileCrop) {
        let fileName: string;
        if (data.profileImage instanceof File) fileName = data.profileImage.name;
        else fileName = data.profileImage?.split('/').pop()!;

        requestData.profileImage = await getCroppedImg(
          profileImageRef.current!,
          profileCrop!,
          fileName
        );
      }

      const mutation = await (data.id
        ? editPatient.mutateAsync(requestData)
        : addMutation.mutateAsync(requestData));

      if (mutation.success) {
        onToggle();
        resetForm();
        setInitialFormData(patientInitialValues);
        setProfileCrop(undefined);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const fileInputClick = () => {
    fileRef.current?.click();
  };

  return (
    <Modal size={'lg'} isOpen={isOpen} toggle={onToggle}>
      <ModalHeader toggle={onToggle}>Add Patient</ModalHeader>
      <Form onSubmit={handleSubmit}>
        <ModalBody>
          <div className="row">
            <div className="col-md-6">
              <Form.Input
                name={'fullName'}
                value={values.fullName}
                onChange={handleChange}
                onBlur={handleBlur}
                errors={errors}
                touched={touched}
                label={'Full Name'}
              />
            </div>
            <div className="col-md-6">
              <Form.Input
                name={'contactNumber'}
                value={values.contactNumber}
                onChange={handleChange}
                onBlur={handleBlur}
                errors={errors}
                touched={touched}
                label={'Contact Number'}
              />
            </div>
            <div className="col-md-6">
              <Form.Input
                name={'email'}
                value={values.email}
                onChange={handleChange}
                onBlur={handleBlur}
                errors={errors}
                touched={touched}
                label={'Email'}
              />
            </div>
            <div className="col-md-6">
              <Form.Date
                name={'dob'}
                value={values.dob as string}
                onChange={handleChange}
                onBlur={handleBlur}
                errors={errors}
                touched={touched}
                label={'Date Of Birth'}
              />
            </div>
            <div className="col-12">
              <Form.Textarea
                name={'address'}
                value={values.address}
                onChange={handleChange}
                onBlur={handleBlur}
                errors={errors}
                touched={touched}
                label={'Address'}
              />
            </div>
            <div className="col-12">
              <label>Image</label>
              <div
                className={
                  'd-flex text-secondary text-center p-3 border rounded-3 mt-1 justify-content-center position-relative'
                }>
                {values.profileImage ? (
                  <>
                    <Button
                      outline
                      color={'danger'}
                      type={'button'}
                      onClick={() => {
                        setProfileCrop(undefined);
                        setFieldValue('profileImage', null);
                      }}
                      className={'border-0 position-absolute top-0 end-0'}>
                      <ImCross />
                    </Button>
                    <CropImage crop={profileCrop!} onChange={setProfileCrop}>
                      <img
                        src={
                          typeof values.profileImage === 'string'
                            ? getServerImage(values.profileImage)
                            : URL.createObjectURL(values.profileImage)
                        }
                        height={'300px'}
                        width={'auto'}
                        ref={profileImageRef}
                        crossOrigin={'anonymous'}
                      />
                    </CropImage>
                  </>
                ) : (
                  <div role={'button'} onClick={fileInputClick}>
                    <div>
                      <h1>
                        <BsUpload />
                      </h1>
                      <p className={'mt-2'}>
                        Upload the image of the patient <br />
                        <small>Max Size: 2mb</small>
                      </p>
                      <input
                        ref={fileRef}
                        accept={'image/*'}
                        id={'profileImage'}
                        name={'profileImage'}
                        type={'file'}
                        className={'d-none'}
                        onChange={(e) => {
                          console.log(e.target.files?.[0]);
                          setFieldValue(e.target.name, e.target.files?.[0]);
                        }}
                      />
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </ModalBody>
        <ModalFooter>
          <Button type={'button'} onClick={onToggle}>
            Cancel
          </Button>

          <Button
            loading={addMutation.isLoading || editPatient.isLoading}
            color={'success'}
            type={'submit'}>
            Save
          </Button>
        </ModalFooter>
      </Form>
    </Modal>
  );
};

export default PatientModal;
