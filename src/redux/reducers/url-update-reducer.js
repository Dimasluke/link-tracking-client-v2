const initialState = {
  updatedAlias: undefined,
  updatedDestination: undefined,
  updatedTags: undefined,
  message: undefined,
  display: false,
  loading: false
};

const SET_UPDATE_ALIAS = 'SET_UPDATE_ALIAS';
const SET_UPDATE_DESTINATION = 'SET_UPDATE_DESTINATION';
const SET_UPDATE_TAGS = 'SET_UPDATE_TAGS';
const SET_UPDATE_MESSAGE = 'SET_UPDATE_MESSAGE';
const SET_UPDATE_LOADING = 'SET_UPDATE_LOADING';
const SET_UPDATE_DISPLAY = 'SET_UPDATE_DISPLAY';

function reducer(state = initialState, action) {
  switch (action.type) {
    case SET_UPDATE_ALIAS:
      return { ...state, updatedAlias: action.payload };

    case SET_UPDATE_DESTINATION:
      return { ...state, updatedDestination: action.payload };

    case SET_UPDATE_TAGS:
      return { ...state, updatedTags: action.payload };

    case SET_UPDATE_DISPLAY:
      return { ...state, display: action.payload };

    case SET_UPDATE_MESSAGE:
      return { ...state, message: action.payload };

    case SET_UPDATE_LOADING:
      return { ...state, loading: action.payload };

    default:
      return state;
  }
}

export function handleUpdatedAlias(updatedAlias) {
  return {
    type: 'SET_UPDATE_ALIAS',
    payload: updatedAlias
  };
}

export function handleUpdatedDestination(updatedDestination) {
  return {
    type: 'SET_UPDATE_DESTINATION',
    payload: updatedDestination
  };
}

export function handleUpdatedTags(updatedTags) {
  return {
    type: 'SET_UPDATE_TAGS',
    payload: updatedTags
  };
}

export function handleDisplay(display) {
  return {
    type: 'SET_UPDATE_DISPLAY',
    payload: display
  };
}

export function handleMessage(message) {
  return {
    type: 'SET_UPDATE_MESSAGE',
    payload: message
  };
}

export function handleLoading(loading) {
  return {
    type: 'SET_UPDATE_LOADING',
    payload: loading
  };
}

export default reducer;
