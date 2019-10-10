const initialState = {
  message: '',
  email: '',
  password: '',
  confirmPassword: '',
  firstName: '',
  lastName: '',
  isUser: undefined,
  loading: false,
  formErrors: [],
  custom: {
    header: 'Login',
    client: {
      baseUrl: undefined,
      clientId: undefined,
      clientSecret: undefined
    },
    login: undefined,
    expression: undefined,
    styles: {
      input: undefined,
      button: undefined,
      header: undefined,
      message: undefined
    }
  }
};

const SET_LOGIN_EMAIL = 'SET_LOGIN_EMAIL';
const SET_LOGIN_MESSAGE = 'SET_LOGIN_MESSAGE';
const SET_LOGIN_PASSWORD = 'SET_LOGIN_PASSWORD';
const SET_LOGIN_CONFIRM_PASSWORD = 'SET_LOGIN_CONFIRM_PASSWORD';
const SET_LOGIN_FIRST_NAME = 'SET_LOGIN_FIRST_NAME';
const SET_LOGIN_LAST_NAME = 'SET_LOGIN_LAST_NAME';
const SET_LOGIN_USER = 'SET_LOGIN_USER';
const SET_LOGIN_LOADING = 'SET_LOGIN_LOADING';
const SET_LOGIN_CUSTOM = 'SET_LOGIN_CUSTOM';
const SET_LOGIN_ERRORS = 'SET_LOGIN_ERRORS';

function reducer(state = initialState, action) {
  switch (action.type) {
    case SET_LOGIN_EMAIL:
      return { ...state, email: action.payload };

    case SET_LOGIN_PASSWORD:
      return { ...state, password: action.payload };

    case SET_LOGIN_CONFIRM_PASSWORD:
      return { ...state, confirmPassword: action.payload };

    case SET_LOGIN_FIRST_NAME:
      return { ...state, firstName: action.payload };

    case SET_LOGIN_LAST_NAME:
      return { ...state, lastName: action.payload };

    case SET_LOGIN_USER:
      return { ...state, isUser: action.payload };

    case SET_LOGIN_MESSAGE:
      return { ...state, message: action.payload };

    case SET_LOGIN_CUSTOM:
      return { ...state, custom: action.payload };

    case SET_LOGIN_LOADING:
      return { ...state, loading: action.payload };

    case SET_LOGIN_ERRORS:
      return { ...state, formErrors: action.payload };

    default:
      return state;
  }
}

export function handleEmail(inputs) {
  return {
    type: 'SET_LOGIN_EMAIL',
    payload: inputs.email
  };
}

export function handlePassword(inputs) {
  return {
    type: 'SET_LOGIN_PASSWORD',
    payload: inputs.password
  };
}

export function handleConfirmPassword(inputs) {
  return {
    type: 'SET_LOGIN_CONFIRM_PASSWORD',
    payload: inputs.confirmPassword
  };
}

export function handleFirstName(inputs) {
  return {
    type: 'SET_LOGIN_FIRST_NAME',
    payload: inputs.firstName
  };
}

export function handleLastName(inputs) {
  return {
    type: 'SET_LOGIN_LAST_NAME',
    payload: inputs.lastName
  };
}

export function handleUser(inputs) {
  return {
    type: 'SET_LOGIN_USER',
    payload: inputs.isUser
  };
}

export function handleMessage(inputs) {
  return {
    type: 'SET_LOGIN_MESSAGE',
    payload: inputs.message
  };
}

export function handleCustom(inputs) {
  return {
    type: 'SET_LOGIN_CUSTOM',
    payload: inputs.custom
  };
}

export function handleLoading(inputs) {
  return {
    type: 'SET_LOGIN_LOADING',
    payload: inputs.loading
  };
}

export function handleFormErrors(inputs) {
  return {
    type: 'SET_LOGIN_ERRORS',
    payload: inputs.errors
  };
}

export default reducer;
