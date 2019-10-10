import React from 'react';
import { connect } from 'react-redux';

function Message(props) {
  const { message, style } = props;

  return <div>{message ? <p style={style}>{message}</p> : null}</div>;
}

const mapStateToProps = state => {
  return {
    message: state.reset.message,
    style: state.reset.custom.styles.message
  };
};

export default connect(
  mapStateToProps,
  null
)(Message);
