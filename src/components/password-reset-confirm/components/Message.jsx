import React from 'react';
import { connect } from 'react-redux';

function Message(props) {
  const { message, style, expired } = props;

  return (
    <div style={expired ? { display: 'none' } : null}>
      {message ? <p style={style}>{message}</p> : null}
    </div>
  );
}

const mapStateToProps = state => {
  return {
    message: state.reset.message,
    style: state.reset.custom.styles.message,
    expired: state.reset.expired
  };
};

export default connect(
  mapStateToProps,
  null
)(Message);
