import React, { useEffect, useState } from 'react';
import Layout from '../../../components/UI/Layouts';
import { Badge, Table } from 'reactstrap';
import PatientModal from './PatientModal';
import useToggle from '../../../hooks/useToggle';
import { useApp } from '../../../providers/AppProvider';
import { useDeletePatient, useGetPatientList } from './patient.query';
import Button from '../../../components/React/Form/Button/Button';
import { BiEdit, BiPlus, BiTrash } from 'react-icons/all';
import Avatar from '../../../components/React/Avatar';
import { PatientResponse } from './patient.schema';
import DeleteModal from '../../../components/React/Modal/DeleteModal';

const Patient = () => {
  const [selectedPatient, setSelectedPatient] = useState<PatientResponse>();

  // custom hooks
  const [showAddModal, toggleAddModal] = useToggle();
  const [showDeleteModal, toggleDeleteModal] = useToggle();
  const { setHeaderText } = useApp();

  const patientList = useGetPatientList();
  const deletePatient = useDeletePatient(selectedPatient?.id!);

  useEffect(() => {
    setHeaderText('Patient');
  }, []);

  const onToggle = () => {
    toggleAddModal();
    if (!showAddModal) setSelectedPatient(undefined);
  };

  const onDeleteToggle = () => {
    toggleDeleteModal();
    if (selectedPatient) setSelectedPatient(undefined);
  };

  return (
    <Layout.Main>
      <div className={'d-flex justify-content-end px-5 py-3'}>
        <Button onClick={toggleAddModal} color={'primary'} className={'d-flex align-items-center'}>
          <h5 className={'mb-1 mr-5'}>
            <BiPlus />
          </h5>
          Add Patient
        </Button>
      </div>

      <div className={'flex-grow-1 px-5'}>
        <Table hover striped responsive>
          <thead className={'bg-secondary text-white'}>
            <tr>
              <th>#</th>
              <th>Image</th>
              <th>Full Name</th>
              <th>Urgent Status</th>
              <th>Email</th>
              <th>Contact Number</th>
              <th>DOB</th>
              <th>Address</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {patientList.data?.length ? (
              patientList.data?.map((patient, index) => (
                <tr key={patient.id}>
                  <th scope="row">{index + 1}</th>
                  <td>
                    {patient.profileImage ? (
                      <Avatar
                        path={patient.profileImage}
                        style={{ height: '1.8rem', width: '1.8rem', borderRadius: '50%' }}
                      />
                    ) : (
                      'n/a'
                    )}
                  </td>
                  <td>{patient.fullName}</td>
                  <td>
                    <Badge color={patient.isUrgent ? 'danger' : 'info'}>
                      {patient.isUrgent ? 'Urgent' : 'Not Urgent'}
                    </Badge>
                  </td>
                  <td>{patient.email}</td>
                  <td>{patient.contactNumber}</td>
                  <td>{patient.dob}</td>
                  <td title={patient.address}>{patient.address.slice(0, 20)}...</td>

                  <td>
                    <div className={'d-flex'}>
                      <Button
                        color={'primary'}
                        title={'Edit'}
                        outline
                        className={'border-0'}
                        size={'sm'}
                        onClick={() => {
                          onToggle();
                          setSelectedPatient({ ...patient });
                        }}>
                        <BiEdit fontSize={'1.3rem'} />
                      </Button>
                      <Button
                        color={'danger'}
                        outline
                        title={'Delete'}
                        className={'border-0'}
                        size={'sm'}
                        onClick={() => {
                          onDeleteToggle();
                          setSelectedPatient({ ...patient });
                        }}>
                        <BiTrash fontSize={'1.3rem'} />
                      </Button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={9} className={'mt-3 text-center'}>
                  Data Not Available
                </td>
              </tr>
            )}
          </tbody>
        </Table>
      </div>
      <PatientModal isOpen={showAddModal} toggle={onToggle} selectedPatient={selectedPatient} />
      <DeleteModal
        isOpen={showDeleteModal}
        onDelete={async () => {
          try {
            const mutation = await deletePatient.mutateAsync();
            if (mutation.success) onDeleteToggle();
          } catch (err) {
            console.log(err);
          }
        }}
        toggle={toggleDeleteModal}
        isDeleteLoading={deletePatient.isLoading}
      />
    </Layout.Main>
  );
};

export default Patient;
