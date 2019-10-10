import React from 'react';
import { connect } from 'react-redux';

function Message(props) {
  const { message, style } = props;

  return (
    <div style={{ margin: '0 auto' }}>
      {message ? <p style={style}>{message}</p> : null}
    </div>
  );
}

const mapStateToProps = state => {
  return {
    message: state.login.message,
    style: state.login.custom.styles.message
  };
};

export default connect(
  mapStateToProps,
  null
)(Message);
