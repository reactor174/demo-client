import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import AuthForm from './../routes/auth/AuthForm';

import { 
  tryLogIn, tryRegister, tryRepeatCode, tryConfirm, tryRestore, 
  tryChangePassword, tryLogOut, tryRemoveAccount, 
} from './../actions/authActions';

const AuthFormContainer = (props) => {
  return (
    <AuthForm
      userId={ props.userId }
      userName={ props.userName }
      needConfirmation={ props.needConfirmation }
      onTryLogIn={ props.onTryLogIn }
      onTryRegister={ props.onTryRegister }
      onTryRepeatCode={ props.onTryRepeatCode }
      onTryConfirm={ props.onTryConfirm }
      onTryRestore={ props.onTryRestore }
      onTryChangePassword={ props.onTryChangePassword }
      onTryRemoveAccount={ props.onTryRemoveAccount }
      onTryLogOut={ props.onTryLogOut }
    />
  );
}

AuthFormContainer.propTypes = {
  userId : PropTypes.oneOfType([ PropTypes.number, PropTypes.bool, ]).isRequired,
  userName : PropTypes.oneOfType([ PropTypes.string, PropTypes.bool, ]).isRequired,
  needConfirmation : PropTypes.oneOfType([ PropTypes.string, PropTypes.bool, ]).isRequired,
  onTryLogIn : PropTypes.func.isRequired,
  onTryRegister : PropTypes.func.isRequired,
  onTryRepeatCode : PropTypes.func.isRequired,
  onTryConfirm : PropTypes.func.isRequired,
  onTryRestore : PropTypes.func.isRequired,
  onTryChangePassword : PropTypes.func.isRequired,
  onTryRemoveAccount : PropTypes.func.isRequired,
  onTryLogOut : PropTypes.func.isRequired,
}

const mapStateToProps = (state) => {
  return state.auth;
}

const mapDispatchToProps = dispatch => {
  return {
    onTryLogIn : (login, password, onError) => dispatch(tryLogIn(login, password, onError)),
    onTryRegister : (surname, firstname, patronymic, login, password, onError) => {
      dispatch(tryRegister(surname, firstname, patronymic, login, password, onError));
    },
    onTryConfirm : (action, target, key, code, onError) => {
      dispatch(tryConfirm(action, target, key, code, onError));
    },
    onTryRestore : (login, captcha, onError, onSuccess) => {
      dispatch(tryRestore(login, captcha, onError, onSuccess));
    },
    onTryRepeatCode : (action, target, key, onError, onSuccess) => {
      dispatch(tryRepeatCode(action, target, key, onError, onSuccess));
    },
    onTryChangePassword : (password, onError, onSuccess) => {
      dispatch(tryChangePassword(password, onError, onSuccess));
    },
    onTryLogOut : (onError, onSuccess) => dispatch(tryLogOut(onError, onSuccess)),
    onTryRemoveAccount : onError => dispatch(tryRemoveAccount(onError)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AuthFormContainer);