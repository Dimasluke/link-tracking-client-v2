const initialState = {
  alias: '',
  destination: '',
  tagInput: '',
  tags: [],
  message: undefined,
  loading: false,
  display: false
};

const SET_CREATE_ALIAS = 'SET_CREATE_ALIAS';
const SET_CREATE_DESTINATION = 'SET_CREATE_DESTINATION';
const SET_CREATE_TAG_INPUT = 'SET_CREATE_TAG_INPUT';
const SET_CREATE_TAGS = 'SET_CREATE_TAGS';
const SET_CREATE_MESSAGE = 'SET_CREATE_MESSAGE';
const SET_CREATE_LOADING = 'SET_CREATE_LOADING';
const SET_CREATE_DISPLAY = 'SET_CREATE_DISPLAY';

function reducer(state = initialState, action) {
  switch (action.type) {
    case SET_CREATE_ALIAS:
      return { ...state, alias: action.payload };

    case SET_CREATE_DESTINATION:
      return { ...state, destination: action.payload };

    case SET_CREATE_TAG_INPUT:
      return { ...state, tagInput: action.payload };

    case SET_CREATE_TAGS:
      return { ...state, tags: action.payload };

    case SET_CREATE_MESSAGE:
      return { ...state, message: action.payload };

    case SET_CREATE_LOADING:
      return { ...state, loading: action.payload };

    case SET_CREATE_DISPLAY:
      return { ...state, display: action.payload };

    default:
      return state;
  }
}

export function handleAlias(alias) {
  return {
    type: 'SET_CREATE_ALIAS',
    payload: alias
  };
}

export function handleDestination(destination) {
  return {
    type: 'SET_CREATE_DESTINATION',
    payload: destination
  };
}

export function handleTagInput(title) {
  return {
    type: 'SET_CREATE_TAG_INPUT',
    payload: title
  };
}

export function handleTags(tags) {
  return {
    type: 'SET_CREATE_TAGS',
    payload: tags
  };
}

export function handleMessage(message) {
  return {
    type: 'SET_CREATE_MESSAGE',
    payload: message
  };
}

export function handleDisplay(display) {
  return {
    type: 'SET_CREATE_DISPLAY',
    payload: display
  };
}

export function handleLoading(loading) {
  return {
    type: 'SET_CREATE_LOADING',
    payload: loading
  };
}

export default reducer;
