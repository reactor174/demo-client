import axios from 'axios';

import { AUTH_LOGIN, AUTH_REGISTER, AUTH_CONFIRM, AUTH_LOGOUT } from '../constants/ActionsTypes';

export const getAuthInfo = () => dispatch => {
  axios.post('/api/auth/info', { })
    .then(result => {
      // console.log(result.data);
      if (result.data.status === 'ok') {
        dispatch({
          type: AUTH_LOGIN,
          ...result.data.data
        });
      }
      else {
        throw new Error(result.data.message);
      }        
    })
    .catch (error => {
      console.log(error);
    });
}

export const tryLogIn = (login, password, onError) => dispatch => {
  axios.post('/api/auth/login', { login, password })
    .then(result => {
      console.log(result);
      if (result.data.status === 'ok') {
        dispatch({
          type: AUTH_LOGIN,
          ...result.data.data,
        });
      }
      else {
        onError(result.data.message);
      }        
    })
    .catch (error => {
      console.log(error);
      onError('Ошибка выполнения запроса');
    });
}

export const tryRegister = (surname, firstname, patronymic, login, password, onError) => dispatch => {
  // console.log('actions tryRegister');
  axios.post('/api/auth/register', { surname, firstname, patronymic, login, password })
    .then(result => {
      // console.log(result.data);
      if (result.data.status === 'ok') {
        dispatch({
          type: AUTH_REGISTER,
          ...result.data.data,
        });
      }
      else {
        onError(result.data.message);
      }
    })
    .catch (error => {
      console.log(error);
      onError('Ошибка выполнения запроса');
    });
}

export const tryRepeatCode = (action, target, key, onError, onSuccess) => dispatch => {
  console.log('tryRepeatCode')
  axios.post('/api/auth/repeat', { action, target, key })
    .then(result => {
      console.log(result.data);
      if (result.data.status === 'ok') {
        if (onSuccess) onSuccess();
      }
      else {
        onError(result.data.message);
      }
    })
    .catch (error => {
      console.log(error);
      onError('Ошибка выполнения запроса');
    });
}

export const tryConfirm = (action, target, key, code, onError, onSuccess) => dispatch => {
  // console.log('actions tryConfirm');
  axios.post('/api/auth/confirm', { action, target, key, code })
    .then(result => {
      // console.log(result.data);
      if (result.data.status === 'ok') {
        if (action === 'register') {
          dispatch({
            type: AUTH_CONFIRM,
            ...result.data.data,
          });
        }
        else {    // восстановление входа
          dispatch({
            type : 'AUTH_LOGIN',
            ...result.data.data,
          });
        }
        if (onSuccess) onSuccess();
      }
      else {
        onError(result.data.message);
      }
    })
    .catch (error => {
      console.log(error);
      onError('Ошибка выполнения запроса');
    });
}

export const tryRestore = (login, captcha, onError, onSuccess) => dispatch => {
  // console.log('try restore');
  // console.log({ login, captcha, onError, onSuccess });
  axios.post('/api/auth/restore', { login, captcha })
    .then(result => {
      // console.log(result);
      if (result.data.status === 'ok') {
        onSuccess();
      }
      else {
        console.log(result.data.message);
        onError(result.data.message);
      }        
    })
    .catch (error => {
      console.log(error);
      onError('Ошибка выполнения запроса');
    });
}

export const tryChangePassword = (password, onError, onSuccess) => dispatch => {
  axios.post('/api/auth/changepass', { password })
    .then(result => {
      // console.log(result);
      if (result.data.status === 'ok') {
        if (onSuccess) onSuccess();
      }
      else {
        onError(result.data.message);
      }        
    })
    .catch (error => {
      console.log(error);
      onError('Ошибка выполнения запроса');
    });
}

export const tryLogOut = (onError, onSuccess) => dispatch => {
  axios.post('/api/auth/logout', { })
    .then(result => {
      // console.log(result);
      if (result.data.status === 'ok') {
        dispatch({ type: AUTH_LOGOUT, });
        if (onSuccess) onSuccess();
      }
      else {
        onError(result.data.message);
      }        
    })
    .catch (error => {
      console.log(error);
      onError('Ошибка выполнения запроса');
    });
}

export const tryRemoveAccount = (onError) => dispatch => {
  axios.post('/api/auth/remove', { })
    .then(result => {
      // console.log(result);
      if (result.data.status === 'ok') {
        alert('Ваша учётная запись была удалена');
        dispatch({ type: AUTH_LOGOUT, });
      }
      else {
        onError(result.data.message);
      }        
    })
    .catch (error => {
      console.log(error);
      onError('Ошибка выполнения запроса');
    });
}