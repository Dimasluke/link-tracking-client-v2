import _ from 'lodash';

const initialState = {
  urls: [],
  selectedUrl: {
    alias: '',
    destination: '',
    createdAt: '',
    updatedAt: '',
    id: '',
    visits: []
  }
};

const SET_URL = 'SET_URL';
const SET_URLS = 'SET_URLS';
const RESET_URL = 'RESET_URL';

function reducer(state = initialState, action) {
  switch (action.type) {
    case SET_URL:
      return {
        ...state,
        selectedUrl: _.find(state.urls, { alias: action.payload })
      };

    case SET_URLS:
      return { ...state, urls: action.payload };

    case RESET_URL:
      return {
        ...state,
        url: {
          alias: '',
          destination: '',
          createdAt: '',
          updatedAt: '',
          id: '',
          visits: []
        }
      };

    default:
      return state;
  }
}

export function handleUrlSelect(alias) {
  return {
    type: 'SET_URL',
    payload: alias
  };
}

export function handleUrls(urls) {
  return {
    type: 'SET_URLS',
    payload: urls
  };
}

export function handleResetUrl() {
  return {
    type: 'RESET_URL'
  };
}

export default reducer;
