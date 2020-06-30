import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Button, Modal, Form, Container, Row, Col } from 'react-bootstrap';

function NoticeModal({ title, text, visibility, onClose }) {
  
  const [ doNotShowAgain, setDoNotShowAgain ] = useState(false);
  
  const toggleDoNotShowAgain = e => {
    const checked = e.target.checked;
    setDoNotShowAgain(checked);
  }
  
  const handleClose = () => onClose(doNotShowAgain);
  
  return (
    <Modal show={ visibility } size="md" onHide={ handleClose }>
      <Modal.Header closeButton>
        <Modal.Title>{ title }</Modal.Title>
      </Modal.Header>
      <Modal.Body>{ text }</Modal.Body>
      <Modal.Footer>
        <Container>
          <Row>
            <Col md={ 6 }>
              <Form.Check 
                type="switch" 
                id={ "notice-modal" + new Date().getTime() }
                label="Больше не показывать"
                value={ doNotShowAgain ? 'on' : 'off' }
                onChange={ toggleDoNotShowAgain }
              />
            </Col>
            <Col md={ 6 } className="text-right">
              <Button 
                variant="primary" 
                onClick={ handleClose }
              >
                Понятно
              </Button>
            </Col>
          </Row>
        </Container>
      </Modal.Footer>
    </Modal>
  );
  
}

NoticeModal.propTypes = {
  title: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
  visibility: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
}

export default NoticeModal;