import React, { useState } from 'react';
// import PropTypes from 'prop-types';
import { Container, Row, Col, Button, Alert } from 'react-bootstrap';

const AuthFormSuccess = (props) => {

  const [ logOutProcessError, setLogOutProcessError ] = useState('');
  
  const onLogOutBtnClick = () => {
    if (!window.confirm('Вы действительно хотите выйти?')) return;
    props.onTryLogOut(error => {
      setLogOutProcessError('test error');
    });
  };

  const onChangePasswordBtnClick = () => {
    props.onChangePassword();
  };

  const onRemoveAccountBtnClick = () => {
    if (!window.confirm('Вы уверены, что хотите удалить учётную запись с сервера?')) return;
    if (!window.confirm('Точно уверены?')) return;
    props.onTryRemoveAccount(error => alert(error));
  };
  
  return (
    <Container>
      <Row>
        <Col>
          <h3>Вы вошли в учётную запись</h3>
        </Col>
      </Row>
      
      <Row className={ "pt-5" + (!logOutProcessError ? " d-none" : "") }>
        <Col md={{ span : 6, offset : 3 }}>
          <Alert variant="danger">{ logOutProcessError }</Alert>
        </Col>
      </Row>
      
      <Row className="pt-5">
        <Col md={{ span : 8, offset : 2, }}>
          <p>Уважаемый, <b>{ props.userName }</b>!</p>
          <p>Вы успешно выполнили вход в учётную запись, примите мои поздравления!</p>
          <p className="text-muted">Учётная запись хранится в течение 72 часов с момента регистрации, 
            после чего, все данные которые Вы ввели при регистрации будут удалены с сервера.</p>
        </Col>
      </Row>
      
      <Row className="pt-5">
        <Col md={{ span : 6, offset : 3, }}>
          <p>Вы можете изменить пароль от Вашей учётной записи</p>
          <Button 
            variant="outline-success"
            tabIndex={ 5 }
            onClick={ onChangePasswordBtnClick }
          >
            Изменить пароль
          </Button>
        </Col>
      </Row>


      <Row className="pt-5">
        <Col md={{ span : 4, offset : 2, }}>
          <p>Вы можете удалить Вашу учётную запись прямо сейчас</p>
          <Button 
            variant="outline-danger"
            onClick={ onRemoveAccountBtnClick }
            tabIndex={ 5 }
          >
            Удалить учётную запись
          </Button>
        </Col>
        <Col md={ 4 }>
          <p>Также Вы можете выйти из Вашей учётной записи</p>
          <Button 
            variant="primary"
            onClick={ onLogOutBtnClick }
            tabIndex={ 6 }
          >
            Выйти из учётной записи
          </Button>
        </Col>
      </Row>
    </Container>
  );
}

export default AuthFormSuccess;
