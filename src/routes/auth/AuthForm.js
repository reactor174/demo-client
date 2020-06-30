import React, { useState } from 'react';
import PropTypes from 'prop-types';

import { checkLoginType, validateLogin } from '../../libs/validators';

import AuthFormLogin from './AuthFormLogin';
import AuthFormRegister from './AuthFormRegister';
import AuthRestore from './AuthRestore';
import AuthFormConfirm from './AuthFormConfirm';
import AuthSuccess from './AuthSuccess';

const loginTitles = {
  'unknown' : 'Телефон или E-mail',
  'phone' : 'Телефон',
  'mail' : 'E-mail',
};

const AuthForm = (props) => {
  
  const [ mode, setMode ] = useState('login');
  const [ login, setLogin ] = useState('');
  const [ loginType, setLoginType ] = useState('unknown');
  const [ loginTitle, setLoginTitle ] = useState(loginTitles['unknown']);
  const [ loginError, setLoginError ] = useState('');
  
  const changeLogin = newLogin => {
    const newLoginType = checkLoginType(newLogin);
    setLogin(newLogin);
    if (newLoginType !== loginType) {      
      setLoginType(newLoginType);
      setLoginTitle(loginTitles[newLoginType]);
    }
    if (loginError) setLoginError('');
  }
  
  const checkLogin = () => {
    const loginValid = validateLogin(login);
    if (!loginValid.status) return setLoginError(loginValid.message);
    return true;
  }
  
  const tryLogIn = (password, onError) => props.onTryLogIn(login, password, onError);
  const tryRegister = (surname, firstname, patronymic, password, onError) => {
    props.onTryRegister(surname, firstname, patronymic, login, password, onError);
  };
  const tryRestore = (captcha, onError, onSuccess) => {
    props.onTryRestore(login, captcha, onError, onSuccess);
  };
  const tryConfirmRegister = (action, target, code, onError) => {
    props.onTryConfirm(action, target, '', code, onError);
  };
  const tryConfirmRestore = (action, target, code, onError) => {
    props.onTryConfirm(action, target, login, code, onError);
  }
  const tryRepeatConfirmCode = (action, target, onError, onSuccess) => {
    props.onTryRepeatCode(action, target, '', onError, onSuccess);
  }
  const tryRepeatRestoreCode = (action, target, onError, onSuccess) => {
    props.onTryRepeatCode(action, target, login, onError, onSuccess);
  }
  const tryLogOut = (onError) => {
    props.onTryLogOut(
      onError,
      () => {   // onSuccess
        setMode('login');
        setLogin('');
      },
    );
  }
  
  // formBody = <AuthFormChangePassword />;
  
  return (
	  <section className="bg-light py-5">
      {
        !props.userId
        &&
        <>
          {
            mode === 'login'
            &&
            <AuthFormLogin
              onSetMode={ setMode }
              login={ login }
              loginTitle={ loginTitle }
              loginError={ loginError }
              onChangeLogin={ changeLogin }
              onCheckLogin={ checkLogin }
              onTryLogIn={ tryLogIn }
            />
          }
          {
            mode === 'register'
            &&
            <AuthFormRegister
              onSetMode={ setMode }
              login={ login }
              loginTitle={ loginTitle }
              loginError={ loginError }
              onChangeLogin={ changeLogin }
              onCheckLogin={ checkLogin }
              onTryRegister={ tryRegister }
            />
          }
          {
            mode === 'restore'
            &&
            <AuthRestore
              onSetMode={ setMode }
              login={ login }
              loginType={ loginType }
              loginTitle={ loginTitle }
              loginError={ loginError }
              onChangeLogin={ changeLogin }
              onCheckLogin={ checkLogin }
              onTryRestore={ tryRestore }
              onTryRepeatCode={ tryRepeatRestoreCode }
              onTryConfirm={ tryConfirmRestore }
              onTryLogOut={ tryLogOut }
            />
          }
        </>
      }
      {
        props.userId
        &&
        <>
          {
            props.needConfirmation
            &&
            <AuthFormConfirm
              target={ props.needConfirmation }
              action={ 'register' }
              onTryConfirm={ tryConfirmRegister }
              onTryRepeatCode={ tryRepeatConfirmCode }
              onTryLogOut={ tryLogOut }
            />
          }
          {
            !props.needConfirmation
            &&
            <AuthSuccess
              userName={ props.userName }
              onTryLogOut={ tryLogOut }
              onTryChangePassword={ props.onTryChangePassword }
              onTryRemoveAccount={ props.onTryRemoveAccount }
            />
          }
        </>
      }
	  </section>
  );
}

AuthForm.propTypes = {
  userId : PropTypes.oneOfType([ PropTypes.number, PropTypes.bool, ]).isRequired,
  needConfirmation : PropTypes.oneOfType([ PropTypes.bool, PropTypes.string, ]).isRequired,
  onTryLogIn : PropTypes.func.isRequired,
  onTryRegister : PropTypes.func.isRequired,
  onTryRestore : PropTypes.func.isRequired,
  onTryRepeatCode : PropTypes.func.isRequired,
  onTryLogOut : PropTypes.func.isRequired,
}

export default AuthForm;