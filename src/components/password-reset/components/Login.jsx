import React from 'react';
import { connect } from 'react-redux';
import { Button } from 'reactstrap';

function Login(props) {
  const { submitted } = props;

  const handleClick = async function() {
    window.location.href = `${props.client.baseUrl}/login`;
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center', width: '100%' }}>
      {submitted ? null : (
        <Button
          type="button"
          onClick={e => handleClick(e)}
          color="link"
          size="sm"
        >
          Cancel
        </Button>
      )}
    </div>
  );
}

const mapStateToProps = state => {
  return {
    client: state.reset.custom.client,
    submitted: state.reset.submitted
  };
};

export default connect(
  mapStateToProps,
  null
)(Login);
