import React from 'react';
import { Navbar, Nav, NavItem } from 'reactstrap';
import { connect } from 'react-redux';
import TeamDropdown from './TeamDropdown';

function Navigation(props) {
  const { selectedTeam } = props;
  console.log(selectedTeam);

  return (
    <div>
      <Navbar color="light" light expand="md">
        <Nav navbar>
          <NavItem style={{ marginRight: '20px' }}>
            <strong>Current team: </strong>
          </NavItem>
          <NavItem style={{ marginRight: '20px' }}>
            {selectedTeam.id ? selectedTeam.title : 'Personal'}
          </NavItem>
          <NavItem>
            <TeamDropdown />
          </NavItem>
        </Nav>
      </Navbar>
    </div>
  );
}

const mapStateToProps = state => {
  return {
    selectedTeam: state.getTeams.selectedTeam
  };
};

export default connect(
  mapStateToProps,
  null
)(Navigation);
