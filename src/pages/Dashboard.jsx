/* eslint-disable no-shadow */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';
import { handleUser, handleLoading } from '../redux/reducers/user-reducer';
import {
  handleTeams,
  handleTeamsSelect
} from '../redux/reducers/team-list-reducer';
import { handleUrls, handleResetUrl } from '../redux/reducers/url-list-reducer';
import { handleVisits } from '../redux/reducers/visit-filter-reducer';
import currentSession from '../lib/current-session';
import checkTokenExpiration from '../lib/check-token-expiration';
import getTeams from '../lib/teams-get';
import getUrls from '../lib/urls-get';
import getVisits from '../lib/visits-get';
import Navbar from '../components/navbar/Navbar';

const domain = 'http://localhost:3000';

class Dashboard extends Component {
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
    const {
      user,
      selectedTeam,
      selectedUrl,
      handleTeams,
      handleTeamsSelect,
      handleUrls,
      handleVisits
    } = this.props;

    if (!_.isEqual(user, prevProps.user)) {
      if (!user) {
        window.location.href = `${domain}/login`;
      }

      if (user.user.username) {
        const teams = await getTeams(user.user.username);

        const teamId = localStorage.getItem('teamId');

        let urls;

        if (teamId && teamId !== 'undefined') {
          const team = _.filter(teams, function(team) {
            return team.id === teamId;
          });

          urls = await getUrls(team[0].title);

          handleTeamsSelect(team[0]);
        } else {
          urls = await getUrls(user.user.username);
        }
        console.log(urls);
        handleTeams(teams);
        handleUrls(urls);
      }
    }

    if (!_.isEqual(selectedTeam, prevProps.selectedTeam)) {
      let urls;

      if (selectedTeam.id) {
        urls = await getUrls(selectedTeam.title);
      } else {
        urls = await getUrls(user.user.username);
      }

      handleResetUrl();
      handleUrls(urls);
    }

    if (!_.isEqual(selectedUrl, prevProps.selectedUrl)) {
      const visits = getVisits(selectedUrl.id);

      handleVisits(visits);
    }
  }

  render() {
    return (
      <div>
        <Navbar />
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    user: state.user.user,
    selectedTeam: state.getTeams.selectedTeam,
    selectedUrl: state.getUrls.selectedUrl
  };
};

export default connect(
  mapStateToProps,
  {
    handleUser,
    handleTeams,
    handleTeamsSelect,
    handleUrls,
    handleVisits,
    handleResetUrl
  }
)(Dashboard);
