import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import ConfirmHandler from './../routes/confirm/ConfirmHandler';

import { tryConfirm } from './../actions/authActions';

const ConfirmContainer = (props) => {
  
  return (
    <ConfirmHandler
      userId={ props.userId }
      userName={ props.userName }
      onTryConfirm={ props.onTryConfirm }
    />
  );
}

ConfirmContainer.propTypes = {
  userId : PropTypes.oneOfType([ PropTypes.number, PropTypes.bool, ]).isRequired,
  userName : PropTypes.oneOfType([ PropTypes.string, PropTypes.bool, ]).isRequired,
  onTryConfirm : PropTypes.func.isRequired,
}

const mapStateToProps = (state) => {
  return state.auth;
}

const mapDispatchToProps = dispatch => {
  return {
    onTryConfirm : (action, target, key, code, onError, onSuccess) => {
      dispatch(tryConfirm(action, target, key, code, onError, onSuccess));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ConfirmContainer);