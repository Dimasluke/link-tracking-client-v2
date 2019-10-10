import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import {
  handleToken,
  handleCustom,
  handleExpired,
  handlePageLoading
} from './redux/password-reset-confirm';
import tokenHelpers from './helpers/token';
import Header from './components/Header';
import Message from './components/Message';
import PasswordInput from './components/PasswordInput';
import ConfirmPasswordInput from './components/ConfirmPasswordInput';
import Button from './components/Button';
import InvalidToken from './components/InvalidToken';
import initialConfig from './config/default';

class PasswordResetConfirm extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  async componentDidMount() {
    // eslint-disable-next-line no-shadow
    const { match, handleToken, handleExpired, handlePageLoading } = this.props;
    handlePageLoading({ loading: true });

    let token;

    try {
      token = await tokenHelpers.getToken({ token: match.params.token });
    } catch (error) {
      console.log(error);
    }

    const expired = await tokenHelpers.checkToken({ token: token.token.data });
    await handleExpired({ expired });

    handleToken({ token: token.token.data });
    handlePageLoading({ loading: false });
  }

  render() {
    const { custom, pageLoading } = this.props;

    let config = {};

    config.client = custom.client;

    if (!custom) {
      config = initialConfig;
    } else {
      if (!custom.header) {
        config.header = initialConfig.header;
      } else {
        config.header = custom.header;
      }

      config.styles = {};

      if (!custom.styles) {
        config.styles = initialConfig.styles;
      } else {
        config.styles.input = Object.assign(
          initialConfig.styles.input,
          custom.styles.input
        );

        config.styles.button = Object.assign(
          initialConfig.styles.button,
          custom.styles.button
        );

        config.styles.header = Object.assign(
          initialConfig.styles.header,
          custom.styles.header
        );

        config.styles.message = Object.assign(
          initialConfig.styles.message,
          custom.styles.message
        );

        config.styles.container = Object.assign(
          initialConfig.styles.container,
          custom.styles.container
        );
      }
    }

    return (
      <div style={pageLoading ? { display: 'none' } : null}>
        <InvalidToken />
        <form style={config.styles.container}>
          <Header custom={config} />
          <PasswordInput />
          <ConfirmPasswordInput />
          <Message />
          <Button />
        </form>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    expired: state.reset.expired,
    submitted: state.reset.submitted,
    pageLoading: state.reset.pageLoading
  };
};

export default connect(
  mapStateToProps,
  { handleToken, handleCustom, handleExpired, handlePageLoading }
)(withRouter(PasswordResetConfirm));
