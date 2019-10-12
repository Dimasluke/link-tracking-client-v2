/* eslint-disable no-shadow */
import React from 'react';
import { connect } from 'react-redux';
import { ListGroupItem, Row, Col } from 'reactstrap';
import { handleTeamsSelect } from '../../redux/reducers/team-list-reducer';

function TeamCard(props) {
  const { team, selectedTeam, handleTeamsSelect } = props;

  return (
    <ListGroupItem
      action
      onClick={() => handleTeamsSelect(team)}
      style={
        selectedTeam.id === team.id
          ? { marginTop: '15px', backgroundColor: '#f8f9fa' }
          : { marginTop: '15px' }
      }
    >
      <Row>
        <Col>{team.title}</Col>
      </Row>
    </ListGroupItem>
  );
}

const mapStateToProps = state => {
  return {
    selectedTeam: state.getTeams.selectedTeam
  };
};

export default connect(
  mapStateToProps,
  { handleTeamsSelect }
)(TeamCard);
