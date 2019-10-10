const initialState = {
  updatedTitle: undefined,
  updatedCaptain: undefined,
  updatedAdmins: undefined,
  updatedMembers: undefined,
  display: false,
  loading: false
};

const SET_UPDATE_TITLE = 'SET_UPDATE_TITLE';
const SET_UPDATE_CAPTAIN = 'SET_UPDATE_CAPTAIN';
const SET_UPDATE_ADMINS = 'SET_UPDATE_ADMINS';
const SET_UPDATE_MEMBERS = 'SET_UPDATE_MEMBERS';
const SET_TEAMS_UPDATE_DISPLAY = 'SET_TEAMS_UPDATE_DISPLAY';
const SET_TEAMS_UPDATE_LOADING = 'SET_TEAMS_UPDATE_LOADING';

function reducer(state = initialState, action) {
  switch (action.type) {
    case SET_UPDATE_TITLE:
      return { ...state, updatedTitle: action.payload };

    case SET_UPDATE_CAPTAIN:
      return { ...state, updatedCaptain: action.payload };

    case SET_UPDATE_ADMINS:
      return { ...state, updatedAdmins: action.payload };

    case SET_UPDATE_MEMBERS:
      return { ...state, updatedMembers: action.payload };

    case SET_TEAMS_UPDATE_DISPLAY:
      return { ...state, display: action.payload };

    case SET_TEAMS_UPDATE_LOADING:
      return { ...state, loading: action.payload };

    default:
      return state;
  }
}

export function handleTitle(title) {
  return {
    type: 'SET_UPDATE_TITLE',
    payload: title
  };
}

export function handleCaptain(captain) {
  return {
    type: 'SET_UPDATE_CAPTAIN',
    payload: captain
  };
}

export function handleAdmins(admins) {
  return {
    type: 'SET_UPDATE_ADMINS',
    payload: admins
  };
}

export function handleMembers(members) {
  return {
    type: 'SET_UPDATE_MEMBERS',
    payload: members
  };
}

export function handleDisplay(display) {
  return {
    type: 'SET_TEAMS_UPDATE_DISPLAY',
    payload: display
  };
}

export function handleLoading(loading) {
  return {
    type: 'SET_TEAMS_UPDATE_LOADING',
    payload: loading
  };
}

export default reducer;
