import React from 'react';
import { connect } from 'react-redux';
import { Button } from 'reactstrap';

function ResetPassword(props) {
  const { isUser } = props;

  const handleClick = async function() {
    window.location.href = `${props.client.baseUrl}/password-reset`;
  };

  return (
    <div
      style={
        isUser !== undefined && !isUser
          ? { display: 'none' }
          : { display: 'flex', justifyContent: 'center', width: '100%' }
      }
    >
      <Button
        type="button"
        onClick={e => handleClick(e)}
        color="link"
        size="sm"
      >
        Forgot Password?
      </Button>
    </div>
  );
}

const mapStateToProps = state => {
  return {
    isUser: state.login.isUser,
    client: state.login.custom.client
  };
};

export default connect(
  mapStateToProps,
  null
)(ResetPassword);
