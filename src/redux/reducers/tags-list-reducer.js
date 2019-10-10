const initialState = {
  tags: undefined
};

const SET_LIST_TAGS = 'SET_LIST_TAGS';

function reducer(state = initialState, action) {
  switch (action.type) {
    case SET_LIST_TAGS:
      return { ...state, tags: action.payload };

    default:
      return state;
  }
}

export function handleTagsList(tags) {
  return {
    type: 'SET_LIST_TAGS',
    payload: tags
  };
}

export default reducer;
