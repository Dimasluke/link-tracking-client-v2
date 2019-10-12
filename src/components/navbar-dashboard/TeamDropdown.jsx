/* eslint-disable no-shadow */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  Spinner
} from 'reactstrap';
import FontAwesome from 'react-fontawesome';
import {
  handleTeamsSelect,
  handleResetTeam
} from '../../redux/reducers/team-list-reducer';
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
    const { handleResetTeam, handleResetUrl } = this.props;

    handleResetTeam();
    handleResetUrl();
  }

  async toggle() {
    this.setState(prevState => ({
      isOpen: !prevState.isOpen
    }));
  }

  render() {
    const { isOpen } = this.state;
    const { loading, teams, handleTeamsSelect } = this.props;

    const mappedTeams = teams.map(team => {
      return (
        <DropdownItem key={team.id} onClick={() => handleTeamsSelect(team)}>
          {team.title}
        </DropdownItem>
      );
    });

    const handleIcon = function() {
      if (loading) {
        return <Spinner size="sm" />;
      }

      if (isOpen && !loading) {
        return <FontAwesome name="chevron-down" />;
      }

      return <FontAwesome name="chevron-right" />;
    };

    return (
      <Dropdown size="sm" isOpen={isOpen} toggle={this.toggle}>
        <DropdownToggle>{handleIcon()}</DropdownToggle>
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
    teams: state.getTeams.teams,
    loading: state.getTeams.loading
  };
};

export default connect(
  mapStateToProps,
  { handleTeamsSelect, handleResetUrl, handleResetTeam }
)(TeamDropdown);
