import React from 'react';
import { connect } from 'react-redux';
import { ListGroup } from 'reactstrap';
import TeamCard from '../team-card/TeamCard';

function TeamList(props) {
  const { teams } = props;

  const mappedTeams = teams.map(team => {
    return <TeamCard key={team.id} title={team.title} />;
  });

  return <ListGroup>{mappedTeams}</ListGroup>;
}

const mapStateToProps = state => {
  return {
    teams: state.getTeams.teams
  };
};

export default connect(
  mapStateToProps,
  null
)(TeamList);
