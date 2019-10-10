const initialState = {
  message: '',
  email: '',
  submitted: false,
  loading: false,
  custom: {
    header: 'Password Reset',
    client: {
      baseUrl: undefined,
      clientId: undefined,
      clientSecret: undefined
    },
    styles: {
      input: undefined,
      button: undefined,
      header: undefined,
      message: undefined
    }
  }
};

const SET_RESET_EMAIL = 'SET_RESET_EMAIL';
const SET_RESET_MESSAGE = 'SET_RESET_MESSAGE';
const SET_RESET_CUSTOM = 'SET_RESET_CUSTOM';
const SET_RESET_SUBMITTED = 'SET_RESET_SUBMITTED';
const SET_RESET_LOADING = 'SET_RESET_LOADING';

function reducer(state = initialState, action) {
  switch (action.type) {
    case SET_RESET_EMAIL:
      return { ...state, email: action.payload };

    case SET_RESET_MESSAGE:
      return { ...state, message: action.payload };

    case SET_RESET_CUSTOM:
      return { ...state, custom: action.payload };

    case SET_RESET_SUBMITTED:
      return { ...state, submitted: action.payload };

    case SET_RESET_LOADING:
      return { ...state, loading: action.payload };

    default:
      return state;
  }
}

export function handleEmail(inputs) {
  return {
    type: 'SET_RESET_EMAIL',
    payload: inputs.email
  };
}

export function handleMessage(inputs) {
  return {
    type: 'SET_RESET_MESSAGE',
    payload: inputs.message
  };
}

export function handleCustom(inputs) {
  return {
    type: 'SET_RESET_CUSTOM',
    payload: inputs.custom
  };
}

export function handleSubmitted(inputs) {
  return {
    type: 'SET_RESET_SUBMITTED',
    payload: inputs.submitted
  };
}

export function handleLoading(inputs) {
  return {
    type: 'SET_RESET_LOADING',
    payload: inputs.loading
  };
}

export default reducer;
