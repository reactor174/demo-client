import React, { useState, useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Container, Row, Col, Form, Button, Alert } from 'react-bootstrap';

import { validateCaptcha } from '../../libs/validators';

const AuthFormRestore = (props) => {
  
  // console.log(props);
  
  // переключение режима формы
  const setModeToLogin = () => props.onSetMode('login');
  const setModeToRegister = () => props.onSetMode('register');
  
  // логин
  const checkLogin = e => props.onCheckLogin();
  
  const changeLogin = e => {
    const login = e.target.value;
    props.onChangeLogin(login);
  }

  const loginInput = useRef(null);
  
  // капча
  const [ captcha, setCaptcha ] = useState('');
  const [ captchaImage, setCaptchaImage ] = useState('');
  const [ captchaError, setCaptchaError ] = useState('');
  
  const changeCaptcha = e => {
    const captcha = e.target.value;
    setCaptcha(captcha);
  }

  const refreshCaptchaImage = () => {
    const i = Math.floor(Math.random() * 10000000);
    const path = '/captcha/?i=' + i;
    setCaptchaImage(path);
  }
  
  const checkCaptcha = () => {
    const captchaValid = validateCaptcha(captcha);
    if (!captchaValid.status) return setCaptchaError(captchaValid.message);
    return true;
  }

  const captchaInput = useRef(null);
  
  // запрос восстановления пароля
  const [ restoreProcessError, setRestoreProcessError ] = useState('');
  
  const checkAll = () => {
    const checks = [ checkLogin(), checkCaptcha() ];
    for (let check of checks) if (!check) return false;
    return true;
  }
  
  const inputKeyDown = e => (e.keyCode === 13 && tryRestore());
  
  const tryRestore = () => {
    if (!checkAll()) return;
    
    props.onTryRestore(
      captcha,
      error => {
        setRestoreProcessError(error);
        refreshCaptchaImage();
      }
    );
  }

  // didMount
  useEffect(() => {
    refreshCaptchaImage();
    if (!props.login) {
      loginInput.current.focus();
    }
    else {  // если логин заполнен, то сразу фокус на капчу
      captchaInput.current.focus();
    }
  }, []);   // eslint-disable-line


  return (
    <Container>
      <Row>
        <Col>
          <h3>Восстановление доступа</h3>
        </Col>
      </Row>
      
      <Row className={ "pt-5" + ( !restoreProcessError ? " d-none" : "" ) }>
        <Col md={{ span : 6, offset : 3 }}>
          <Alert variant="danger">{ restoreProcessError }</Alert>
        </Col>
      </Row>
    
      <Row className="align-items-center pt-5">
        <Col md={ 4 } className="text-md-right">
          <b>{ props.loginTitle } <span className="text-danger">*</span></b>
        </Col>
        <Col md={ 4 }>
          <div className={ "my-1" + ( !props.loginError ? " d-none" : "" ) }>
            <small className="text-danger">{ props.loginError }</small>
          </div>
          <Form.Control 
            type="text" 
            placeholder="Введите телефон или e-mail"
            className={ "text-center" + ( !props.loginError ? "" : " border-danger" ) }
            value={ props.login }
            onChange={ e => changeLogin(e) }
            onKeyDown={ inputKeyDown }
            tabIndex={ 1 }
            ref={ loginInput }
          />
        </Col>
      </Row>
      
      <Row className="align-items-center pt-5">
        <Col md={{ span : 4, offset : 4, }} className="text-md-right">
          <img
            src={ captchaImage }
            alt="captcha"
          />
        </Col>
        <Col md={ 4 }>
          <Button 
            variant="outline-primary" 
            size="sm"
            tabIndex={ 4 }
            onClick={ refreshCaptchaImage }
          >
            Показать другие цифры
          </Button>
        </Col>
      </Row>
      
      <Row className="align-items-center pt-5">
        <Col md={ 4 } className="text-md-right">
          <b>Цифры с картинки <span className="text-danger">*</span></b>
        </Col>
        <Col md={ 4 }>
          <div className={ "my-1" + ( !captchaError ? " d-none" : "" ) }>
            <small className="text-danger">{ captchaError }</small>
          </div>
          <Form.Control 
            type="text" 
            placeholder="Введите цифры с картинки"
            className={ "text-center" + ( !captchaError ? "" : " border-danger" ) }
            value={ captcha }
            onChange={ changeCaptcha }
            onKeyDown={ inputKeyDown }
            tabIndex={ 2 }
            ref={ captchaInput }
          />
        </Col>
      </Row>
      
      <Row className="pt-5">
        <Col md={{ span : 4, offset : 4, }}>
          <Button 
            variant="success" 
            size="lg"
            onClick={ tryRestore }
            tabIndex={ 3 }
          >
            Восстановить доступ
          </Button>
        </Col>
      </Row>
      
      <Row className="pt-5">
        <Col md={{ span : 4, offset : 2, }}>
          <p>Вспомнили, что не зарегистрированы?</p>
          <Button 
            variant="outline-info"
            onClick={ setModeToRegister }
            tabIndex={ 5 }
          >
            Зарегистрироваться
          </Button>
        </Col>
        <Col md={ 4 }>
          <p>Вспомнили пароль?</p>
          <Button 
            variant="outline-success"
            onClick={ setModeToLogin }
            tabIndex={ 6 }
          >
            Войти
          </Button>
        </Col>
      </Row>
    </Container>
  );
}

AuthFormRestore.propTypes = {
  onSetMode : PropTypes.func.isRequired,
  // login={ login }
  // loginTitle={ loginTitle }
  // loginError={ loginError }
  onChangeLogin : PropTypes.func.isRequired,
  onCheckLogin : PropTypes.func.isRequired,
  onTryRestore : PropTypes.func.isRequired,
};

export default AuthFormRestore;