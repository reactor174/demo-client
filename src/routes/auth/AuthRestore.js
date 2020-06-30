import React, { useState } from 'react';
import PropTypes from 'prop-types';

import AuthFormRestore from './AuthFormRestore';
import AuthFormConfirm from './AuthFormConfirm';

const AuthRestore = (props) => {
  
  const [ mode, setMode ] = useState('restore'); // restore, confirm

  const tryRestore = (captcha, onError) => {
    props.onTryRestore(
      captcha,
      onError,
      () => {   // onSuccess
        setMode('confirm');
      }
    );
  }

  return (
    <>
      {
        mode === 'restore'
        &&
        <AuthFormRestore
          onSetMode={ setMode }
          login={ props.login }
          loginTitle={ props.loginTitle }
          loginError={ props.loginError }
          onChangeLogin={ props.onChangeLogin }
          onCheckLogin={ props.onCheckLogin }
          onTryRepeatCode={ props.onTryRepeatCode }
          onTryRestore={ tryRestore }
        />
      }
      {
        mode === 'confirm'
        &&
        <AuthFormConfirm
          target={ props.loginType }
          action={ 'restore' }
          onTryConfirm={ props.onTryConfirm }
          onTryRepeatCode={ props.onTryRepeatCode }
          onTryLogOut={ props.onTryLogOut }
        />
      }
    </>
  );
}

AuthRestore.propTypes = {
  onSetMode : PropTypes.func.isRequired,
  // login={ login }
  // loginType={ loginType }
  // loginTitle={ loginTitle }
  // loginError={ loginError }
  onChangeLogin : PropTypes.func.isRequired,
  onCheckLogin : PropTypes.func.isRequired,
  onTryRestore : PropTypes.func.isRequired,
  onTryRepeatCode : PropTypes.func.isRequired,
  onTryConfirm : PropTypes.func.isRequired,
  onTryLogOut : PropTypes.func.isRequired,
};



export default AuthRestore;