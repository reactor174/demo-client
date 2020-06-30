import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Button, Modal } from 'react-bootstrap';

function DescriptionModal({ buttonTitle, modalTitle, modalText }) {
  
  const [ show, setShow ] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  
  modalTitle = typeof modalTitle !== "undefined" ? modalTitle : buttonTitle;
  
  return (
    <>
      <Button variant="outline-secondary" size="sm" onClick={handleShow}>{ buttonTitle }</Button>

      <Modal show={ show } size="lg" onHide={ handleClose }>
        <Modal.Header closeButton>
          <Modal.Title>{ modalTitle }</Modal.Title>
        </Modal.Header>
        <Modal.Body>{ modalText }</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={ handleClose }>Закрыть</Button>
        </Modal.Footer>
      </Modal>
    </>
  );
  
}

DescriptionModal.propTypes = {
  buttonTitle: PropTypes.string.isRequired,
  modalTitle: PropTypes.string,
  modalText: PropTypes.string.isRequired,
}

export default DescriptionModal;