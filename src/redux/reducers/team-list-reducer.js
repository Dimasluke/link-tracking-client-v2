const initialState = {
  selectedTeam: {
    id: undefined,
    title: undefined,
    captain: undefined,
    admins: undefined,
    members: undefined
  },
  teams: []
};

const SET_TEAMS = 'SET_TEAMS';
const SET_TEAMS_SELECTED = 'SET_TEAMS_SELECTED';

function reducer(state = initialState, action) {
  switch (action.type) {
    case SET_TEAMS:
      return { ...state, teams: action.payload };

    case SET_TEAMS_SELECTED: {
      return { ...state, selectedTeam: action.payload };
    }

    default:
      return state;
  }
}

export function handleTeams(teams) {
  return {
    type: 'SET_TEAMS',
    payload: teams
  };
}

export function handleTeamsSelect(team) {
  localStorage.setItem('teamId', team.id);

  return {
    type: 'SET_TEAMS_SELECTED',
    payload: team
  };
}

export default reducer;
