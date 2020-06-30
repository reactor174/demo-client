// import { } from '../constants/ActionsTypes';

const initialState = {
  center : [53.4, 58.9],
  zoom : 10,
};

const mapReducer = (state = initialState, action) => {
  
  // console.log(action.type);
  
  // const newState = { ...state };
  
  // switch (action.type) {
    // case MAP__SET_CENTER:
      // newState.center = action.center;
      // return newState;
    
    // default:
      return state;
  // }
}

export default mapReducer;