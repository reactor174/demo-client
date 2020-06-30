import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import { Container, Row, Col, Form, Button, Alert } from 'react-bootstrap';

import { validateConfirmationCode } from '../../libs/validators';

function AuthFormConfirm(props) {

  const [ code, setCode ] = useState('');
  const [ codeError, setCodeError ] = useState('');
  
  const changeCode = e => {
    const code = e.target.value;
    setCode(code);
    if (codeError) setCodeError('');
    if (confirmProcessError) setConfirmProcessError('');
  }

  const codeInput = useRef(null);
  
  const checkCode = e => {
    const codeValid = validateConfirmationCode(code);
    if (!codeValid.status) return setCodeError(codeValid.message);
    return true;
  }
  
  const [ confirmProcessError, setConfirmProcessError ] = useState('');
  
  const inputKeyDown = e => (e.keyCode === 13 && tryConfirm());
  
  const tryConfirm = () => {
    if (!checkCode()) return;
    props.onTryConfirm(
      props.action,
      props.target,
      code, 
      error => setConfirmProcessError(error)
    );
  }
  
  // таймер обратного отсчёта повторной отправки кода подтверждения
  const [ repeatTimer, setRepeatTimer ] = useState(0);
  useEffect(() => {
    let interval = null;
    if (!repeatTimer) return;
    interval = setInterval(() => {
      setRepeatTimer(repeatTimer => repeatTimer - 1);
    }, 1000);
    return () => clearInterval(interval);
  }, [ repeatTimer ]);
  
  // для каждой следующей отправки кода время ожидания увеличивается
  function* repeatTimeGenerator () {
    const begin = 5;                  // начальное значение таймера
    const limit = 3;                  // допустимое число попыток
    const increment = 5;              // прирост для каждой следующей попытки
    for (let i = 0; i < limit; i++) {
      yield begin + (i * increment);
    }
    return begin + (limit * increment);
  }
  const [ generateRepeatTime ] = useState(repeatTimeGenerator());
  
  // начальная установка таймера
  useEffect(() => {
    setRepeatTimer(generateRepeatTime.next().value);
    codeInput.current.focus();
  }, []);                                         // eslint-disable-line react-hooks/exhaustive-deps
  
  const [ repeatCodeProcess, setRepeatCodeProcess ] = useState(false);
  const [ repeatCodeError, setRepeatCodeError ] = useState('');

  // повторная отправка кода и сброс таймера
  const [ repeatsQuotaExceeded, setRepeatsQuotaExceeded ] = useState(false);
  const repeatCodeSending = () => {
    console.log('repeatCodeSending');
    if (repeatCodeProcess || repeatsQuotaExceeded) return;
    if (repeatCodeError) setRepeatCodeError('');
    props.onTryRepeatCode(
      props.action,
      props.target,
      error => {
        setRepeatCodeProcess(false);
        setRepeatCodeError(error);
      },
      () => { // onSuccess
        const newRepeatTime = generateRepeatTime.next();
        if (newRepeatTime.done) return setRepeatsQuotaExceeded(true);
        setRepeatTimer(newRepeatTime.value);
        setRepeatCodeProcess(false);
      }
    );
  }

  const tryLogOut = () => {
    if (!window.confirm('Вы действительно хотите выйти?')) return;
    props.onTryLogOut(error => {
      console.log(error);
    });
  }

  return (
    <Container>
      <Row>
        <Col>
          <h3>Подтверждение контактных данных</h3>
        </Col>
      </Row>
      
      <Row className={ "pt-5" + (!confirmProcessError ? " d-none" : "") }>
        <Col md={{ span : 6, offset : 3 }}>
          <Alert variant="danger">{ confirmProcessError }</Alert>
        </Col>
      </Row>
    
      <Row className={ "pt-5" + (!true ? " d-none" : "") }>
        <Col md={{ span : 8, offset : 2 }}>
          <p>
            Для {
              props.action === 'register' ? 'завершения регистрации' : 'восстановления доступа'
            } необходимо {
              props.target === 'phone'
                ? 'ввести код подтверждения, отправленный на указанный  Вами номер телефона'
                : 'перейти по ссылке в письме, отправленном Вам на указанный адрес электронной почты'
            }.
          </p>
        </Col>
      </Row>
      
      <Row className={ "align-items-center pt-5" + ( props.target === 'mail' ? " d-none" : "" ) }>
        <Col md={ 4 } className="text-md-right">
          <b>Код подтверждения <span className="text-danger">*</span></b>
        </Col>
        <Col md={ 4 }>
          <div className={ "my-1" + ( !props.codeError ? " d-none" : "" ) }>
            <small className="text-danger">{ props.codeError }</small>
          </div>
          <Form.Control 
            type="text" 
            placeholder="Введите код подтверждения"
            className={ "text-center" + ( !props.codeError ? "" : " border-danger" ) }
            value={ code }
            onBlur={ checkCode }
            onChange={ changeCode }
            onKeyDown={ inputKeyDown }
            tabIndex={ 1 }
            ref={ codeInput }
          />
        </Col>
      </Row>
      
      <Row className="pt-5">
        <Col md={{ span : 8, offset : 2, }}>
          <p>
            {
              props.target === "phone" ? 'Смс с кодом' : 'Письмо со ссылкой'
            } для {
              props.action === "register" ? 'подтверждения' : 'восстановления доступа'
            } было отправлено на указанный {
              props.target === "phone" ? 'номер телефона' : 'адрес электронной почты'
            }.
          </p>
          <p>
            Если {
              props.target === "phone" ? 'смс' : 'письмо'
            } не пришло, Вы можете запросить повторную отправку{
              repeatTimer ? ( ' через ' + repeatTimer + ' секунд') : ''
            }.
          </p>
          <p className={ "text-danger" + ( !repeatsQuotaExceeded ? " d-none" : "" ) }>
            {
              props.target === "phone" ? 'Смс' : 'Письмо'
            } было отправлено в последний раз, т.к. превышено допустимое число попыток повтора
          </p>
        </Col>
      </Row>
      
      <Row className={ "pt-5" + (!repeatCodeError ? " d-none" : "") }>
        <Col md={{ span : 6, offset : 3 }}>
          <Alert variant="danger">{ repeatCodeError }</Alert>
        </Col>
      </Row>

      <Row>
        <Col md={{ span : 8, offset : 2, }}>
          <Button
            variant={ ( !repeatTimer && !repeatCodeProcess ) ? "outline-info" : "outline-secondary" }
            size="sm"
            disabled={ !!repeatTimer || repeatCodeError }
            className={ repeatsQuotaExceeded ? "d-none" : "" }
            onClick={ repeatCodeSending }
          >
            Отправить { props.target === "phone" ? 'смс' : 'письмо' } повторно
          </Button>
        </Col>
      </Row>

      <Row className="pt-5">
        <Col md={{ span : 4, offset : 4, }}>
          <Button 
            variant="success" 
            size="lg"
            onClick={ tryConfirm }
            tabIndex={ 3 }
          >
            Подтвердить
          </Button>
        </Col>
      </Row>
      
      <Row className={ "pt-5" + ( props.action ==='restore' ? " d-none" : "" ) }>
        <Col>
          <p>Решили не завершать регистрацию (или зарегистрироваться заново)?</p>
          <Button 
            variant="outline-info" 
            onClick={ tryLogOut }
          >
            Выход
          </Button>
        </Col>
      </Row>
    </Container>
  );
}

AuthFormConfirm.propTypes = {
  action : PropTypes.string.isRequired,
  target : PropTypes.string.isRequired,
  onTryConfirm : PropTypes.func.isRequired,
  onTryRepeatCode : PropTypes.func.isRequired,
  onTryLogOut : PropTypes.func.isRequired,
}

export default AuthFormConfirm;
