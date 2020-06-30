import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import { Container, Row, Col, Form, Button, Alert } from 'react-bootstrap';

import { validatePassword } from '../../libs/validators';

function AuthFormLogin(props) {
  
  const setModeToRegister = () => props.onSetMode('register');
  const setModeToRestore = () => props.onSetMode('restore');
  
  const changeLogin = e => {
    const login = e.target.value;
    if (logInProcessError) setLogInProcessError('');
    props.onChangeLogin(login);
  }
  
  const checkLogin = e => props.onCheckLogin();
  
  const [ password, setPassword ] = useState('');
  const [ passwordError, setPasswordError ] = useState('');
  
  const changePassword = e => {
    const password = e.target.value;
    setPassword(password);
    if (passwordError) setPasswordError('');
    if (logInProcessError) setLogInProcessError('');
  }
  
  const checkPassword = e => {
    const passwordValid = validatePassword(password);
    if (!passwordValid.status) return setPasswordError(passwordValid.message);
    return true;
  }
  
  const [ passwordVisibility, setPasswordVisibility ] = useState(false);
  const togglePasswordVisibility = e => {
    const visibility = e.target.checked;
    setPasswordVisibility(visibility);
  }
  
  const [ logInProcessError, setLogInProcessError ] = useState('');
  
  const inputKeyDown = e => (e.keyCode === 13 && tryLogIn());
  
  const checkAll = () => {
    const checks = [ checkLogin(), checkPassword() ];
    for (let check of checks) if (!check) return false;
    return true;
  }
  
  const tryLogIn = () => {
    if (!checkAll()) return;
    props.onTryLogIn(
      password, 
      error => setLogInProcessError(error)
    );
  }
  
  const loginInput = useRef(null);
  useEffect(() => {
    loginInput.current.focus();
  }, []);
  
  return (
    <Container>
      <Row>
        <Col>
          <h3>Вход</h3>
        </Col>
      </Row>
      
      <Row className={ "pt-5" + (!logInProcessError ? " d-none" : "") }>
        <Col md={{ span : 6, offset : 3 }}>
          <Alert variant="danger">{ logInProcessError }</Alert>
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
            onChange={ changeLogin }
            onKeyDown={ inputKeyDown }
            ref={ loginInput }
            tabIndex={ 1 }
          />
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
            placeholder="Введите пароль"
            className={ "text-center" + ( !passwordError ? "" : " border-danger" ) }
            value={ password }
            onChange={ changePassword }
            onKeyDown={ inputKeyDown }
            tabIndex={ 2 }
          />
        </Col>
        <Col md={ 4 } className="pt-2 pt-md-0 text-md-left">
          <Form.Check 
            type="switch" 
            id="auth-form-login__show-password-switch"
            label="Показать пароль"
            value={ passwordVisibility ? 'on' : 'off' }
            onChange={ e => togglePasswordVisibility(e) }
            tabIndex={ 4 }
          />
        </Col>
      </Row>
      
      <Row className="pt-5">
        <Col md={ 4 } className="pb-2 pb-md-0 text-left text-md-right">
          <Button 
            variant="outline-warning"
            onClick={ setModeToRestore }
            tabIndex={ 5 }
          >
            Не помню пароль
          </Button>
        </Col>
        <Col md={ 4 }>
          <Button 
            variant="success" 
            size="lg"
            onClick={ tryLogIn }
            tabIndex={ 3 }
          >
            Войти
          </Button>
        </Col>
      </Row>
      
      <Row className="pt-5">
        <Col>
          <p>Ещё не зарегистрированы?</p>
          <Button 
            variant="outline-info" 
            onClick={ setModeToRegister }
          >
            Зарегистрироваться
          </Button>
        </Col>
      </Row>
    </Container>
  );
}

AuthFormLogin.propTypes = {
  onSetMode : PropTypes.func.isRequired,
  login : PropTypes.string.isRequired,
  loginError : PropTypes.string,
  onChangeLogin : PropTypes.func.isRequired,
  onCheckLogin : PropTypes.func.isRequired,
  onTryLogIn : PropTypes.func.isRequired,
}

export default AuthFormLogin;
