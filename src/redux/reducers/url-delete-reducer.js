const initialState = {
  loading: false
};

const SET_DELETE_LOADING = 'SET_DELETE_LOADING';

function reducer(state = initialState, action) {
  switch (action.type) {
    case SET_DELETE_LOADING:
      return { ...state, loading: action.payload };

    default:
      return state;
  }
}

export function handleLoading(loading) {
  return {
    type: 'SET_DELETE_LOADING',
    payload: loading
  };
}

export default reducer;
