import React from 'react';
import { connect } from 'react-redux';
import {
  handleMessage,
  handleSubmitted,
  handleEmail,
  handleLoading
} from '../redux/reset-reducer';
import reset from '../helpers/reset';
import Loader from './Loader';

function Button(props) {
  const { style, client, submitted, loading } = props;

  // eslint-disable-next-line consistent-return
  const handleSubmit = async function(e) {
    e.preventDefault();

    props.handleLoading({ loading: true });

    const token = await reset.token({
      email: props.email,
      clientId: client.clientId,
      clientSecret: client.clientSecret
    });

    if (token.error) {
      props.handleLoading({ loading: false });
      return props.handleMessage({ message: token.message });
    }

    await reset.send({
      domain: props.client.baseUrl,
      email: props.email,
      token: token.body.token,
      clientId: client.clientId,
      clientSecret: client.clientSecret
    });

    props.handleSubmitted({
      submitted: true
    });
    props.handleMessage({
      message:
        'Success! Instructions to update your password have been sent to the address provided.'
    });
    props.handleEmail({ email: '' });
    props.handleLoading({ loading: false });
  };

  return (
    <div>
      {submitted ? (
        <a href={`${client.baseUrl}/login`}>Return to login</a>
      ) : (
        <button type="submit" onClick={e => handleSubmit(e)} style={style}>
          {loading ? <Loader /> : 'Continue'}
        </button>
      )}
    </div>
  );
}

const mapStateToProps = state => {
  return {
    email: state.reset.email,
    submitted: state.reset.submitted,
    style: state.reset.custom.styles.button,
    client: state.reset.custom.client,
    loading: state.reset.loading
  };
};

export default connect(
  mapStateToProps,
  { handleMessage, handleSubmitted, handleEmail, handleLoading }
)(Button);
