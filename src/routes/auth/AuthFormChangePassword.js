import React, { useState, useEffect, useRef } from 'react';
// import PropTypes from 'prop-types';
import { Container, Row, Col, Form, Button, Alert } from 'react-bootstrap';

import { validatePassword } from '../../libs/validators';

const AuthFormChangePassword = (props) => {
  
  // пароль успешно изменен
  const [ changeSuccess, setChangeSuccess ] = useState(false);

  // ошибка в процессе изменения пароля
  const [ changeProcessError, setChangeProcessError ] = useState('');
  
  // пароль
  const [ password, setPassword ] = useState('');
  const [ passwordError, setPasswordError ] = useState('');
  
  const changePassword = e => {
    const password = e.target.value;
    setPassword(password);
    if (passwordError) setPasswordError('');
  }
  
  const checkPassword = e => {
    const passwordValid = validatePassword(password);
    if (!passwordValid.status) return setPasswordError(passwordValid.message);
    return true;
  }

  const passwordInput = useRef(null);
  useEffect(() => {
    passwordInput.current.focus();
  }, []);
  
  // повтор пароля
  const [ passwordRepeat, setPasswordRepeat ] = useState('');
  const [ passwordRepeatError, setPasswordRepeatError ] = useState('');
  
  const changePasswordRepeat = e => {
    const passwordRepeat = e.target.value;
    setPasswordRepeat(passwordRepeat);
    if (passwordRepeatError) setPasswordRepeatError('');
  }
  
  const checkPasswordRepeat = e => {
    const passwordRepeatValid = validatePassword(passwordRepeat);
    if (!passwordRepeatValid.status) return setPasswordRepeatError(passwordRepeatValid.message);
    if (password !== passwordRepeat) return setPasswordRepeatError('Пароли не совпадают');
    return true;
  }
  
  // видимость пароля
  const [ passwordVisibility, setPasswordVisibility ] = useState(false);
  
  const togglePasswordVisibility = e => {
    const passwordVisibility = e.target.checked;
    setPasswordVisibility(passwordVisibility);
  }
  
  const inputKeyDown = e => (e.keyCode === 13 && tryChangePassword());
  
  const checkForm = () => {
    if (!checkPassword()) return false;
    if (passwordVisibility && !checkPasswordRepeat()) return false;
    return true;
  }

  const tryChangePassword = () => {
    if (!checkForm()) return;
    props.onTryChangePassword(
      password,
      error => setChangeProcessError(error),
      () => setChangeSuccess(true)
    );
  }
  
  const cancelChangePassword = () => {
    props.onCancel();
  }

  if (changeSuccess) {
    return (
      <Container>
        <Row>
          <Col>
            <h3>Пароль успешно изменен</h3>
          </Col>
        </Row>
        <Row className="pt-5">
          <Col md={{ span : 6, offset : 3, }}>
            <p>Вы успешно изменили пароль и теперь можете использовать новый пароль для входа</p>
          </Col>
        </Row>
        <Row className="pt-5">
          <Col md={{ span : 6, offset : 3, }}>
            <Button
              variant="outline-success"
              onClick={ cancelChangePassword }
            >
              Вернуться
            </Button>
          </Col>
        </Row>
      </Container>
    );
  }
  
  return (
    <Container>
      <Row>
        <Col>
          <h3>Установка нового пароля</h3>
        </Col>
      </Row>
      
      <Row className={ "pt-5" + (!changeProcessError ? " d-none" : "") }>
        <Col md={{ span : 6, offset : 3 }}>
          <Alert variant="danger">{ changeProcessError }</Alert>
        </Col>
      </Row>
      
      <Row className="align-items-center pt-5">
        <Col md={ 4 } className="text-md-right">
          <b>Пароль <span className="text-danger">*</span></b>
        </Col>
        <Col md={ 4 }>
          <div className={ "my-1" + ( !passwordError ? " d-none" : "" ) }>
            <small className="text-danger">{ passwordError }</small>
          </div>
          <Form.Control 
            type={ !passwordVisibility ? "password" : "text" }
            placeholder="Придумайте пароль"
            className={ "text-center" + ( !passwordError ? "" : " border-danger" ) }
            value={ password }
            onChange={ changePassword }
            onKeyDown={ inputKeyDown }
            ref={ passwordInput }
            tabIndex={ 5 }
          />
        </Col>
        <Col md={ 4 } className="text-md-left">
          <Form.Check 
            type="switch" 
            id="auth-form-register__show-password-switch"
            label="Показывать пароль"
            value={ passwordVisibility ? 'on' : 'off' }
            onChange={ togglePasswordVisibility }
            tabIndex={ 8 }
          />
        </Col>
      </Row>
              
      <Row className="align-items-center pt-3">
        <Col md={ 4 } className="text-md-right">
          <b>Повтор пароля { !passwordVisibility && <span className="text-danger">*</span> }</b>
        </Col>
        <Col md={ 4 }>
          {
            !passwordVisibility
            ?
            <>
              <div className={ "my-1" + ( !passwordRepeatError ? " d-none" : "" ) }>
                <small className="text-danger">{ passwordRepeatError }</small>
              </div>
              <Form.Control 
                type="password" 
                placeholder="Повторите пароль"
                className={ "text-center" + ( !passwordRepeatError ? "" : " border-danger" ) }
                value={ passwordRepeat }
                onChange={ changePasswordRepeat }
                onKeyDown={ inputKeyDown }
                tabIndex={ 6 }
              />
            </>
            :
            <small className="text-muted">Если пароль видно, то повтор пароля не требуется</small>
          }
        </Col>
        <Col md={ 4 } className="text-md-left">
          <Button 
            variant="outline-primary" 
            size="sm"
            tabIndex={ 9 }
          >
            Создать пароль
          </Button>
        </Col>
      </Row> 

      <Row className="pt-5">
        <Col md={ 4 } className="text-right">
        </Col>
        <Col md={ 4 }>
          <Button 
            variant="success" 
            size="lg"
            onClick={ tryChangePassword }
            tabIndex={ 7 }
          >
            Изменить пароль
          </Button>
        </Col>
      </Row>
      
      <Row className="pt-5">
        <Col md={{ span : 8, offset : 2, }}>
          <p>Передумали менять пароль?</p>
          <Button 
            variant="outline-secondary"
            onClick={ cancelChangePassword }
          >
            Отмена
          </Button>
        </Col>
      </Row>
    </Container>
  );
}

export default AuthFormChangePassword;
