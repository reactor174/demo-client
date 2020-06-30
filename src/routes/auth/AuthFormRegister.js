import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import { Container, Row, Col, Form, Button, Alert } from 'react-bootstrap';

import { validateName, validatePassword } from '../../libs/validators';

const AuthFormRegister = (props) => {
  
  // переключение режима формы
  const setModeToLogin = () => props.onSetMode('login');
  
  const formatName = name => {    // Петров-Водкин
    return name[0].toUpperCase() + name.substr(1).toLowerCase();
  }
  
  // фамилия
  const [ surname, setSurname ] = useState('');
  const [ surnameError, setSurnameError ] = useState('');
  
  const changeSurname = e => {
    let surname = e.target.value.trim();
    if (surname) surname = formatName(surname);
    setSurname(surname);
    if (surnameError) setSurnameError('');
  }
  
  const checkSurname = () => {
    const surnameValid = validateName(surname);
    if (!surnameValid.status) return setSurnameError(surnameValid.message);
    return true;
  }

  const surnameInput = useRef(null);
  useEffect(() => {
    surnameInput.current.focus();
  }, []);
  
  // имя
  const [ firstname, setFirstname ] = useState('');
  const [ firstnameError, setFirstnameError ] = useState('');
  
  const changeFirstname = e => {
    let firstname = e.target.value.trim();
    if (firstname) firstname = formatName(firstname);
    setFirstname(firstname);
    if (firstnameError) setFirstnameError('');
  }
  
  const checkFirstname = () => {
    const firstnameValid = validateName(firstname);
    if (!firstnameValid.status) return setFirstnameError(firstnameValid.message);
    return true;
  }
  
  // отчество
  const [ patronymic, setPatronymic ] = useState('');
  const [ patronymicError, setPatronymicError ] = useState('');
  
  const changePatronymic = e => {
    let patronymic = e.target.value.trim();
    if (patronymic) patronymic = formatName(patronymic);
    setPatronymic(patronymic);
    if (patronymicError) setPatronymicError('');
  }
  
  const checkPatronymic = () => {
    if (!patronymic) return true;
    const patronymicValid = validateName(patronymic);
    if (!patronymicValid.status) return setPatronymicError(patronymicValid.message);
    return true;
  }
  
  // логин
  const changeLogin = e => {
    const login = e.target.value;
    props.onChangeLogin(login);
  }
  
  const checkLogin = e => props.onCheckLogin();
  
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
  
  // регистрация
  const [ registerProcessError, setRegisterProcessError ] = useState('');
  
  const checkAll = () => {
    const checks = [ checkSurname(), checkFirstname(), checkPatronymic(), checkLogin(), checkPassword() ];
    if (!passwordVisibility) checks.push(checkPasswordRepeat());
    for (let check of checks) if (!check) return false;
    return true;
  }
  
  const inputKeyDown = e => (e.keyCode === 13 && tryRegister());
  
  const tryRegister = () => {
    if (!checkAll()) return;
    
    props.onTryRegister(
      surname, firstname, patronymic, password,
      error => setRegisterProcessError(error)
    );
  }
    
  return (
    <Container>
      <Row>
        <Col>
          <h3>Регистрация</h3>
        </Col>
      </Row>
      
      <Row className={ "pt-5" + (!registerProcessError ? " d-none" : "") }>
        <Col md={{ span : 6, offset : 3 }}>
          <Alert variant="danger">{ registerProcessError }</Alert>
        </Col>
      </Row>
      
      <Row className="align-items-center pt-3">
        <Col md={ 4 } className="text-md-right" title="Поле «Фамилия» обязательно для заполнения">
          <b>Фамилия <span className="text-danger">*</span></b>
        </Col>
        <Col md={ 4 }>
          <div className={ "my-1" + ( !surnameError ? " d-none" : "" ) }>
            <small className="text-danger">{ surnameError }</small>
          </div>
          <Form.Control 
            type="text" 
            placeholder="Введите Вашу фамилию"
            className={ "text-center" + ( !surnameError ? "" : " border-danger" ) }
            value={ surname }
            onChange={ changeSurname }
            onKeyDown={ inputKeyDown }
            tabIndex={ 1 }
            ref={ surnameInput }
          />
        </Col>
      </Row>
      
      <Row className="align-items-center pt-3">
        <Col md={ 4 } className="text-md-right" title="Поле «Имя» обязательно для заполнения">
          <b>Имя <span className="text-danger">*</span></b>
        </Col>
        <Col md={ 4 }>
          <div className={ "my-1" + ( !firstnameError ? " d-none" : "" ) }>
            <small className="text-danger">{ firstnameError }</small>
          </div>
          <Form.Control 
            type="text" 
            placeholder="Введите Ваше имя"
            className={ "text-center" + ( !firstnameError ? "" : " border-danger" ) }
            value={ firstname }
            onChange={ changeFirstname }
            onKeyDown={ inputKeyDown }
            tabIndex={ 2 }
          />
        </Col>
      </Row>
      
      <Row className="align-items-center pt-3">
        <Col md={ 4 } className="text-md-right">
          <b>Отчество</b>
        </Col>
        <Col md={ 4 }>
          <div className={ "my-1" + ( !patronymicError ? " d-none" : "" ) }>
            <small className="text-danger">{ patronymicError }</small>
          </div>
          <Form.Control 
            type="text" 
            placeholder="Введите Ваше отчество"
            className={ "text-center" + ( !patronymicError ? "" : " border-danger" ) }
            value={ patronymic }
            onChange={ changePatronymic }
            onKeyDown={ inputKeyDown }
            tabIndex={ 3 }
          />
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
            tabIndex={ 4 }
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
            placeholder="Придумайте пароль"
            className={ "text-center" + ( !passwordError ? "" : " border-danger" ) }
            value={ password }
            onChange={ changePassword }
            onKeyDown={ inputKeyDown }
            tabIndex={ 5 }
          />
        </Col>
        <Col md={ 4 } className="pt-2 pt-md-0 text-md-left">
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
            className="d-none"
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
            onClick={ tryRegister }
            tabIndex={ 7 }
          >
            Зарегистрироваться
          </Button>
        </Col>
      </Row>
              
      <Row className="pt-5">
        <Col>
          <p>Уже зарегистрированы?</p>
          <Button 
            variant="outline-info"
            onClick={ setModeToLogin }
          >
            Войти
          </Button>
        </Col>
      </Row>
    </Container>
  );
}

AuthFormRegister.propTypes = {
  onSetMode : PropTypes.func.isRequired,
  login : PropTypes.string.isRequired,
  loginTitle : PropTypes.string.isRequired,
  onChangeLogin : PropTypes.func.isRequired,
  onCheckLogin : PropTypes.func.isRequired,
  onTryRegister : PropTypes.func.isRequired,
};

export default AuthFormRegister;
