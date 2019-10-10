const initialState = {
  visits: {
    total: undefined,
    unique: undefined
  },
  start: undefined,
  end: undefined,
  loading: false
};

const SET_VISITS = 'SET_VISITS';
const SET_START = 'SET_START';
const SET_END = 'SET_END';
const SET_VISIT_LOADING = 'SET_VISIT_LOADING';

function reducer(state = initialState, action) {
  switch (action.type) {
    case SET_VISITS:
      return { ...state, visits: action.payload };

    case SET_START:
      return { ...state, start: action.payload };

    case SET_END:
      return { ...state, end: action.payload };

    case SET_VISIT_LOADING:
      return { ...state, loading: action.payload };

    default:
      return state;
  }
}

export function handleVisits(visits) {
  return {
    type: 'SET_VISITS',
    payload: visits
  };
}

export function handleStart(startDateTime) {
  return {
    type: 'SET_START',
    payload: startDateTime
  };
}

export function handleEnd(endDateTime) {
  return {
    type: 'SET_END',
    payload: endDateTime
  };
}

export function handleLoading(loading) {
  return {
    type: 'SET_VISIT_LOADING',
    payload: loading
  };
}

export default reducer;
