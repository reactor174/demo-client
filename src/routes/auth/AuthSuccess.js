import React, { useState } from 'react';
// import PropTypes from 'prop-types';

import AuthFormSuccess from './AuthFormSuccess';
import AuthFormChangePassword from './AuthFormChangePassword';

const AuthSuccess = (props) => {
  
  const [ mode, setMode ] = useState('success'); // success, change

  const setModeToChange = () => setMode('change');
  const setModeToSuccess = () => setMode('success');

  return (
    <>
      {
        mode === 'success'
        &&
        <AuthFormSuccess
            userName={ props.userName }
            onTryLogOut={ props.onTryLogOut }
            onChangePassword={ setModeToChange }
            onTryRemoveAccount={ props.onTryRemoveAccount }
        />
      }
      {
        mode === 'change'
        &&
        <AuthFormChangePassword
          onCancel={ setModeToSuccess }
          onTryChangePassword={ props.onTryChangePassword }
        />
      }
    </>
  );
}

export default AuthSuccess;
