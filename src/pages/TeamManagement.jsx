/* eslint-disable no-shadow */
import React, { Component } from 'react';
import { Container, Col, Row } from 'reactstrap';
import { connect } from 'react-redux';
import _ from 'lodash';
import { handleUser } from '../redux/reducers/user-reducer';
import { handleTeams } from '../redux/reducers/team-list-reducer';
import currentSession from '../lib/current-session';
import checkTokenExpiration from '../lib/check-token-expiration';
import getTeams from '../lib/teams-get';
import Navbar from '../components/navbar-team-management/Navbar';
import TeamMenu from '../components/team-menu/TeamMenu';
import TeamList from '../components/team-list/TeamList';
import Footer from '../components/footer/Footer';
import TeamCreate from '../components/team-create/TeamCreate';
import TeamUpdate from '../components/team-update/TeamUpdate';
import TeamView from '../components/team-view/TeamView';

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
    const { user, teams, handleTeams } = this.props;

    if (!_.isEqual(user, prevProps.user)) {
      if (!user) {
        window.location.href = `${domain}/login`;
      }

      const teams = await getTeams(user.user.username);
      handleTeams(teams);
    }

    if (!_.isEqual(teams, prevProps.teams)) {
      handleTeams(await getTeams(user.user.username));
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
                <TeamMenu />
              </Row>
              <Row style={{ display: 'inherit', overflowY: 'auto' }}>
                <TeamList />
              </Row>
            </Col>
            <Col xs="7">
              <Row>
                <TeamView />
              </Row>
            </Col>
          </Row>
        </Container>
        <Footer />
        {/* ============== Modals ================ */}
        <TeamCreate />
        <TeamUpdate />
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    user: state.user.user,
    teams: state.getTeams.teams
  };
};

export default connect(
  mapStateToProps,
  { handleUser, handleTeams }
)(TeamManagement);
