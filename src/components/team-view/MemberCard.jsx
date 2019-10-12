/* eslint-disable no-shadow */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { ListGroupItem, Row, Col, Button, Badge } from 'reactstrap';
import getTeams from '../../lib/teams-get';
import updateTeam from '../../lib/teams-update';
import {
  handleTeams,
  handleTeamsSelect
} from '../../redux/reducers/team-list-reducer';

class MemberCard extends Component {
  async updateTeamsPage() {
    const { selectedTeam, user, handleTeams, handleTeamsSelect } = this.props;

    const teams = await getTeams(user.user.username);

    handleTeams(teams);
    const team = teams.filter(team => {
      return team.id === selectedTeam.id;
    });
    handleTeamsSelect(team[0]);
  }

  async handleRemoveMember(member) {
    const { selectedTeam } = this.props;

    const memberIndex = selectedTeam.members.findIndex(
      value => value === member
    );
    const adminIndex = selectedTeam.admins.findIndex(value => value === member);

    if (memberIndex > 0) {
      selectedTeam.members.splice(memberIndex, 1);
    }
    if (adminIndex > 0) {
      selectedTeam.admins.splice(adminIndex, 1);
    }

    await updateTeam(
      selectedTeam.id,
      selectedTeam.title,
      selectedTeam.captain,
      [...new Set(selectedTeam.admins)],
      [...new Set(selectedTeam.members)]
    );

    this.updateTeamsPage();
  }

  async handleAddAdmin(member) {
    const { selectedTeam } = this.props;

    selectedTeam.admins.push(member);

    await updateTeam(
      selectedTeam.id,
      selectedTeam.title,
      selectedTeam.captain,
      [...new Set(selectedTeam.admins)],
      selectedTeam.members
    );

    this.updateTeamsPage();
  }

  async handleUpdateCaptain(member) {
    const { selectedTeam } = this.props;

    selectedTeam.captain = member;
    console.log(selectedTeam);
    await updateTeam(
      selectedTeam.id,
      selectedTeam.title,
      selectedTeam.captain,
      selectedTeam.members,
      selectedTeam.admins
    );

    this.updateTeamsPage();
  }

  render() {
    const { selectedTeam, member, user } = this.props;

    const isAdmin = selectedTeam.admins.includes(member);

    return (
      <ListGroupItem>
        <Row>
          <Col xs="5">
            {member}
            {isAdmin ? (
              <Badge style={{ marginLeft: '10px' }}>Admin</Badge>
            ) : null}
          </Col>
          <Col xs="7" className="d-flex justify-content-end">
            {user.user.username !== member &&
            selectedTeam.admins.includes(user.user.username) &&
            selectedTeam.captain !== member ? (
              <Button
                size="sm"
                onClick={() => this.handleRemoveMember(member)}
                color="danger"
              >
                Remove
              </Button>
            ) : null}
            {!isAdmin && selectedTeam.admins.includes(user.user.username) ? (
              <Button
                size="sm"
                style={{ marginLeft: '10px' }}
                onClick={() => this.handleAddAdmin(member)}
              >
                Add Admin
              </Button>
            ) : null}
            {selectedTeam.captain === user.user.username &&
            member !== user.user.username ? (
              <Button
                size="sm"
                style={{ marginLeft: '10px' }}
                onClick={() => this.handleUpdateCaptain(member)}
              >
                Make Team Owner
              </Button>
            ) : null}
          </Col>
        </Row>
      </ListGroupItem>
    );
  }
}

const mapStateToProps = state => {
  return {
    selectedTeam: state.getTeams.selectedTeam,
    user: state.user.user
  };
};

export default connect(
  mapStateToProps,
  { handleTeams, handleTeamsSelect }
)(MemberCard);
