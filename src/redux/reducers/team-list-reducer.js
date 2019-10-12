const initialState = {
  selectedTeam: {
    id: undefined,
    title: undefined,
    captain: undefined,
    admins: [],
    members: []
  },
  teams: [],
  loading: false
};

const SET_TEAMS = 'SET_TEAMS';
const SET_TEAMS_SELECTED = 'SET_TEAMS_SELECTED';
const SET_TEAMS_RESET_SELECTED = 'SET_TEAMS_RESET_SELECTED';
const SET_TEAMS_LOADING = 'SET_TEAMS_LOADING';

function reducer(state = initialState, action) {
  switch (action.type) {
    case SET_TEAMS:
      console.log(action.payload);
      return { ...state, teams: action.payload };

    case SET_TEAMS_SELECTED: {
      return { ...state, selectedTeam: action.payload };
    }

    case SET_TEAMS_RESET_SELECTED:
      return { ...state, selectedTeam: action.payload };

    case SET_TEAMS_LOADING:
      return { ...state, loading: action.payload };

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

export function handleResetTeam() {
  localStorage.setItem('teamId', undefined);

  return {
    type: 'SET_TEAMS_RESET_SELECTED',
    payload: {
      id: undefined,
      title: undefined,
      captain: undefined,
      admins: [],
      members: []
    }
  };
}

export function handleTeamsLoading(loading) {
  return {
    type: 'SET_TEAMS_LOADING',
    payload: loading
  };
}

export default reducer;
