/* eslint-disable no-shadow */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem
} from 'reactstrap';
import FontAwesome from 'react-fontawesome';
import { handleTeamsSelect } from '../../redux/reducers/team-list-reducer';
import { handleResetUrl } from '../../redux/reducers/url-list-reducer';

class TeamDropdown extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: false
    };

    this.toggle = this.toggle.bind(this);
  }

  async resetTeam() {
    const { handleTeamsSelect, handleResetUrl } = this.props;

    handleTeamsSelect({
      id: undefined,
      title: undefined,
      captain: undefined,
      admins: undefined,
      members: undefined
    });

    handleResetUrl();
  }

  async toggle() {
    this.setState(prevState => ({
      isOpen: !prevState.isOpen
    }));
  }

  render() {
    const { isOpen } = this.state;
    const { teams, handleTeamsSelect } = this.props;

    const mappedTeams = teams.map(team => {
      return (
        <DropdownItem key={team.id} onClick={() => handleTeamsSelect(team)}>
          {team.title}
        </DropdownItem>
      );
    });

    return (
      <Dropdown size="sm" isOpen={isOpen} toggle={this.toggle}>
        <DropdownToggle>
          {isOpen ? (
            <FontAwesome name="chevron-down" />
          ) : (
            <FontAwesome name="chevron-right" />
          )}
        </DropdownToggle>
        <DropdownMenu>
          <DropdownItem header>My Teams</DropdownItem>
          <DropdownItem divider />
          <DropdownItem onClick={() => this.resetTeam()}>Personal</DropdownItem>
          {mappedTeams}
        </DropdownMenu>
      </Dropdown>
    );
  }
}

const mapStateToProps = state => {
  return {
    teams: state.getTeams.teams
  };
};

export default connect(
  mapStateToProps,
  { handleTeamsSelect, handleResetUrl }
)(TeamDropdown);
