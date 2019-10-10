const initialState = {
  header: 'Update Password',
  token: {
    token: '',
    tokenExpiresAt: '',
    user: ''
  },
  message: '',
  password: '',
  confirmPassword: '',
  expired: false,
  submitted: false,
  loading: false,
  pageLoading: false,
  formErrors: [],
  custom: {
    header: 'Password Update',
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

const SET_RESET_CONFIRM_HEADER = 'SET_RESET_CONFIRM_HEADER';
const SET_RESET_CONFIRM_MESSAGE = 'SET_RESET_CONFIRM_MESSAGE';
const SET_RESET_CONFIRM_PASSWORD = 'SET_RESET_CONFIRM_PASSWORD';
const SET_RESET_CONFIRM_CONFIRM_PASSWORD = 'SET_RESET_CONFIRM_CONFIRM_PASSWORD';
const SET_RESET_CONFIRM_TOKEN = 'SET_RESET_CONFIRM_TOKEN';
const SET_RESET_CONFIRM_EXPIRED = 'SET_RESET_CONFIRM_EXPIRED';
const SET_RESET_CONFIRM_CUSTOM = 'SET_RESET_CONFIRM_CUSTOM';
const SET_RESET_CONFIRM_SUBMITTED = 'SET_RESET_CONFIRM_SUBMITTED';
const SET_RESET_CONFIRM_LOADING = 'SET_RESET_CONFIRM_LOADING';
const SET_RESET_CONFIRM_PAGE_LOADING = 'SET_RESET_CONFIRM_PAGE_LOADING';
const SET_RESET_CONFIRM_ERRORS = 'SET_RESET_CONFIRM_ERRORS';

function reducer(state = initialState, action) {
  switch (action.type) {
    case SET_RESET_CONFIRM_HEADER:
      return { ...state, header: action.payload };

    case SET_RESET_CONFIRM_MESSAGE:
      return { ...state, message: action.payload };

    case SET_RESET_CONFIRM_PASSWORD:
      return { ...state, password: action.payload };

    case SET_RESET_CONFIRM_CONFIRM_PASSWORD:
      return { ...state, confirmPassword: action.payload };

    case SET_RESET_CONFIRM_EXPIRED:
      return { ...state, expired: action.payload };

    case SET_RESET_CONFIRM_TOKEN:
      return { ...state, token: action.payload };

    case SET_RESET_CONFIRM_CUSTOM:
      return { ...state, custom: action.payload };

    case SET_RESET_CONFIRM_SUBMITTED:
      return { ...state, submitted: action.payload };

    case SET_RESET_CONFIRM_LOADING:
      return { ...state, loading: action.payload };

    case SET_RESET_CONFIRM_PAGE_LOADING:
      return { ...state, pageLoading: action.payload };

    case SET_RESET_CONFIRM_ERRORS:
      return { ...state, formErrors: action.payload };

    default:
      return state;
  }
}

export function handleHeader(inputs) {
  return {
    type: 'SET_RESET_CONFIRM_HEADER',
    payload: inputs.header
  };
}

export function handleMessage(inputs) {
  return {
    type: 'SET_RESET_CONFIRM_MESSAGE',
    payload: inputs.message
  };
}

export function handlePassword(inputs) {
  return {
    type: 'SET_RESET_CONFIRM_PASSWORD',
    payload: inputs.password
  };
}

export function handleConfirmPassword(inputs) {
  return {
    type: 'SET_RESET_CONFIRM_CONFIRM_PASSWORD',
    payload: inputs.confirmPassword
  };
}

export function handleExpired(inputs) {
  return {
    type: 'SET_RESET_CONFIRM_EXPIRED',
    payload: inputs.expired
  };
}

export function handleToken(inputs) {
  return {
    type: 'SET_RESET_CONFIRM_TOKEN',
    payload: inputs.token
  };
}

export function handleCustom(inputs) {
  return {
    type: 'SET_RESET_CONFIRM_CUSTOM',
    payload: inputs.custom
  };
}

export function handleSubmitted(inputs) {
  return {
    type: 'SET_RESET_CONFIRM_SUBMITTED',
    payload: inputs.submitted
  };
}

export function handleLoading(inputs) {
  return {
    type: 'SET_RESET_CONFIRM_LOADING',
    payload: inputs.loading
  };
}

export function handlePageLoading(inputs) {
  return {
    type: 'SET_RESET_CONFIRM_PAGE_LOADING',
    payload: inputs.loading
  };
}

export function handleFormErrors(inputs) {
  return {
    type: 'SET_RESET_CONFIRM_ERRORS',
    payload: inputs.errors
  };
}

export default reducer;
