const initialState = {
  user: {
    user: {
      username: undefined
    },
    accessToken: undefined,
    accessTokenExpiresAt: undefined,
    refreshToken: undefined,
    refreshTokenExpiresAt: undefined
  },
  loading: false
};

const SET_DASHBOARD_USER = 'SET_DASHBOARD_USER';
const SET_DASHBOARD_LOADING = 'SET_DASHBOARD_LOADING';

function reducer(state = initialState, action) {
  switch (action.type) {
    case SET_DASHBOARD_USER:
      return { ...state, user: action.payload };

    case SET_DASHBOARD_LOADING:
      return { ...state, loading: action.payload };

    default:
      return state;
  }
}

export function handleUser(user) {
  return {
    type: 'SET_DASHBOARD_USER',
    payload: user
  };
}

export function handleLoading(loading) {
  return {
    type: 'SET_DASHBOARD_LOADING',
    payload: loading
  };
}

export default reducer;
