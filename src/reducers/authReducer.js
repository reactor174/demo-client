import { AUTH_LOGIN, AUTH_REGISTER, AUTH_CONFIRM, AUTH_LOGOUT } from '../constants/ActionsTypes';

const initialState = {
  userId : false,
  userName : '',
  needConfirmation : false,
};

const authReducer = (state = initialState, action) => {
  
  // console.log(state);
  // console.log(action);
  const newState = { ...state };
    
  switch (action.type) {
    case AUTH_LOGIN:
      newState.userId = action.userId;
      if (action.userName) newState.userName = action.userName;
      if (action.needConfirmation) newState.needConfirmation = action.needConfirmation;
      return newState;
    
    case AUTH_REGISTER:
      newState.userId = action.userId;
      newState.userName = action.userName;
      newState.needConfirmation = action.needConfirmation;
      return newState;

    case AUTH_CONFIRM:
      newState.needConfirmation = action.needConfirmation;
      return newState;

    case AUTH_LOGOUT:
      return { ...initialState };
    
    default:
      return state;
  }
}

export default authReducer;