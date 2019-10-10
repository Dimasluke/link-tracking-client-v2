/* eslint-disable no-shadow */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';
import { handleUser } from '../redux/reducers/user-reducer';
import { handleTeams } from '../redux/reducers/team-list-reducer';
import currentSession from '../lib/current-session';
import checkTokenExpiration from '../lib/check-token-expiration';
import getTeams from '../lib/teams-get';

const domain = 'http://localhost:3000';

class TeamManagement extends Component {
  async componentDidMount() {
    const { handleUser } = this.props;
    const token = await currentSession();

    const expired = await checkTokenExpiration(token);

    if (!token || expired) {
      window.location.href = `${domain}/login`;
    }

    handleUser(token);
  }

  async componentDidUpdate(prevProps) {
    const { user, handleTeams } = this.props;

    if (!_.isEqual(user, prevProps.user)) {
      if (!user) {
        window.location.href = `${domain}/login`;
      }

      const teams = await getTeams(user.user.username);

      handleTeams(teams);
    }
  }

  render() {
    return <div>hello</div>;
  }
}

const mapStateToProps = state => {
  return {
    user: state.user.user
  };
};

export default connect(
  mapStateToProps,
  { handleUser, handleTeams }
)(TeamManagement);
