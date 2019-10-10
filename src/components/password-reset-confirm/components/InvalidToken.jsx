import React from 'react';
import { connect } from 'react-redux';
import { handleSubmitted } from '../redux/password-reset-confirm';
import reset from '../helpers/reset';

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  },
  content: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    marginTop: '20px'
  }
};

function InvalidToken(props) {
  const { expired, token, submitted, client } = props;

  const handleSubmit = async function() {
    await reset.retry({ email: token.user, domain: client.baseUrl });

    props.handleSubmitted({ submitted: true });
  };

  return (
    <div style={expired ? null : { display: 'none' }}>
      <div style={styles.container}>
        <h1>Expired Token</h1>
        {submitted ? (
          <div style={styles.content}>
            <p>
              Success! Instructions to update your password have been sent to
              the address provided.
            </p>
            <a href={`${client.baseUrl}/login`}>Return to login</a>
          </div>
        ) : (
          <div style={styles.content}>
            <p>It looks like the token to reset your password has expired.</p>
            <p>Would you like to resend the request?</p>
            <button type="button" onClick={handleSubmit}>
              Resend Email
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

const mapStateToProps = state => {
  return {
    expired: state.reset.expired,
    token: state.reset.token,
    submitted: state.reset.submitted,
    client: state.reset.custom.client
  };
};

export default connect(
  mapStateToProps,
  { handleSubmitted }
)(InvalidToken);
