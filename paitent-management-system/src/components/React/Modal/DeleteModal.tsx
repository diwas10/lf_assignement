import React from 'react';
import { Modal, ModalBody, ModalFooter } from 'reactstrap';
import { AiFillWarning } from 'react-icons/all';
import Button from '../Form/Button/Button';

interface DeleteModalProps {
  isOpen: boolean;
  title?: string;
  // enableTitle?: string;
  // enableAction?: boolean;
  onDelete: () => void;
  description?: string;
  toggle: () => void;
  children?: React.ReactElement;
  isDeleteLoading?: boolean;
  footerContent?: React.ReactElement;
  size?: 'bms' | 'md' | 'lg';
}

function DeleteModal(props: DeleteModalProps) {
  const {
    isOpen,
    size = 'md',
    toggle,
    onDelete,
    footerContent,
    title,
    isDeleteLoading,
    description
  } = props;

  return (
    <Modal size={size} toggle={toggle} isOpen={isOpen} centered className={`modal-${size}`}>
      <ModalBody
        className={'d-flex justify-content-between align-items-center p-4 rounded'}
        style={{ background: '#F5F5F5' }}>
        <AiFillWarning className={'text-danger mt-2'} fontSize={'5rem'} />
        <div className={'flex-grow-1 mx-5'}>
          <h5 className={'text-danger fw-bold'}>
            {title || 'Are You sure you want to delete this item?'}
          </h5>
          <p className={'mt-2 fs-6'}>{description}</p>
        </div>
        <span onClick={toggle} className="ic-cancel fs-4 p-1" style={{ cursor: 'pointer' }} />
      </ModalBody>
      <ModalFooter className={'justify-content-end'}>
        <Button className="btn btn-outline-gray-16" onClick={toggle}>
          Cancel
        </Button>
        <Button className={`btn btn-danger ml-2`} loading={isDeleteLoading} onClick={onDelete}>
          Delete
        </Button>
      </ModalFooter>
    </Modal>
  );
}

export default DeleteModal;
