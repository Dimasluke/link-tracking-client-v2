/* eslint-disable no-shadow */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Row, Col, Container } from 'reactstrap';
import _ from 'lodash';
import { handleUser, handleLoading } from '../redux/reducers/user-reducer';
import {
  handleTeams,
  handleTeamsSelect
} from '../redux/reducers/team-list-reducer';
import { handleTagsList } from '../redux/reducers/tags-list-reducer';
import { handleUrls, handleResetUrl } from '../redux/reducers/url-list-reducer';
import { handleVisits } from '../redux/reducers/visit-filter-reducer';
import currentSession from '../lib/current-session';
import checkTokenExpiration from '../lib/check-token-expiration';
import getTeams from '../lib/teams-get';
import getUrls from '../lib/urls-get';
import getVisits from '../lib/visits-get';
import getTags from '../lib/tags-get';
import Navbar from '../components/navbar-dashboard/Navbar';
import UrlList from '../components/url-list/UrlList';
import UrlCreate from '../components/url-create/UrlCreate';
import UrlUpdate from '../components/url-update/UrlUpdate';
import UrlMenu from '../components/url-menu/UrlMenu';
import UrlView from '../components/url-view/UrlView';

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
      handleVisits,
      handleTagsList
    } = this.props;

    if (!_.isEqual(user, prevProps.user)) {
      if (!user) {
        window.location.href = `${domain}/login`;
      }

      if (user.user.username) {
        const teams = await getTeams(user.user.username);

        const teamId = localStorage.getItem('teamId');

        let urls;
        let tags;

        if (teamId && teamId !== 'undefined') {
          const team = _.filter(teams, function(team) {
            return team.id === teamId;
          });

          urls = await getUrls(team[0].title);
          tags = await getTags(team[0].title);

          handleTeamsSelect(team[0]);
        } else {
          tags = await getTags(user.user.username);
          urls = await getUrls(user.user.username);
        }

        handleTeams(teams);
        handleUrls(urls);
        handleTagsList(tags);
      }
    }

    if (!_.isEqual(selectedTeam, prevProps.selectedTeam)) {
      let urls;
      let tags;

      if (selectedTeam.id) {
        tags = await getTags(selectedTeam.title);
        urls = await getUrls(selectedTeam.title);
      } else {
        tags = await getTags(user.user.username);
        urls = await getUrls(user.user.username);
      }

      handleResetUrl();
      handleUrls(urls);
      handleTagsList(tags);
    }

    if (!_.isEqual(selectedUrl, prevProps.selectedUrl)) {
      const visits = await getVisits(selectedUrl.id);

      handleVisits(visits);
    }
  }

  render() {
    return (
      <div>
        <Navbar />
        <Container>
          <Row>
            <Col xs="5">
              <Row>
                <UrlMenu />
              </Row>
              <Row style={{ display: 'inherit' }}>
                <UrlList />
              </Row>
            </Col>
            <Col xs="7">
              <Row>
                <UrlView />
              </Row>
            </Col>
          </Row>
        </Container>
        {/* ============== Modals ================ */}
        <UrlCreate />
        <UrlUpdate />
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
    handleResetUrl,
    handleTagsList
  }
)(Dashboard);
