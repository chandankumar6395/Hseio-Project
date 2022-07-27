import React from 'react';
import { Modal } from 'react-bootstrap';
import NewDivision from '../../pages/divisions/NewDivision';

const NewDivisionModal = (props) => {
  const { display, handleClose } = props;

  return (
    <Modal show={display} onHide={handleClose} size="lg">
      <Modal.Header closeButton>
        <Modal.Title>Modal heading</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <NewDivision />
      </Modal.Body>
      <Modal.Footer />
    </Modal>
  );
};

export default NewDivisionModal;
