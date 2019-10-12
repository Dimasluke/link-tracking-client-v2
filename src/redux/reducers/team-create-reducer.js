const initialState = {
  title: '',
  owner: undefined,
  display: false,
  loading: false
};

const SET_TEAMS_CREATE_TITLE = 'SET_TEAMS_CREATE_TITLE';
const SET_TEAMS_CREATE_OWNER = 'SET_TEAMS_CREATE_OWNER';
const SET_TEAMS_CREATE_DISPLAY = 'SET_TEAMS_CREATE_DISPLAY';
const SET_TEAMS_CREATE_LOADING = 'SET_TEAMS_CREATE_LOADING';

function reducer(state = initialState, action) {
  switch (action.type) {
    case SET_TEAMS_CREATE_TITLE:
      return { ...state, title: action.payload };

    case SET_TEAMS_CREATE_OWNER:
      return { ...state, owner: action.payload };

    case SET_TEAMS_CREATE_DISPLAY:
      return { ...state, display: action.payload };

    case SET_TEAMS_CREATE_LOADING:
      return { ...state, loading: action.payload };

    default:
      return state;
  }
}

export function handleTitle(title) {
  return {
    type: 'SET_TEAMS_CREATE_TITLE',
    payload: title
  };
}

export function handleOwner(owner) {
  return {
    type: 'SET_TEAMS_CREATE_OWNER',
    payload: owner
  };
}

export function handleDisplay(display) {
  return {
    type: 'SET_TEAMS_CREATE_DISPLAY',
    payload: display
  };
}

export function handleLoading(loading) {
  return {
    type: 'SET_TEAMS_CREATE_LOADING',
    payload: loading
  };
}

export default reducer;
