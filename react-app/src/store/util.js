// constants
const ADD_COUNT = 'util/ADD_COUNT';
const RESET_COUNT = 'util/RESET_COUNT'

const addCount = () => ({
  type: ADD_COUNT,
});
const resetCount = () => ({
    type: RESET_COUNT,
});


export const addToCount = () => async (dispatch) => {
    dispatch(addCount());
}

export const resetTheCount = () => async (dispatch) => {
    dispatch(resetCount())
}
const initialState = { 'rcount': 0 };

const utilReducer = (state = initialState, action) => {
    let newState = {...state}
  switch (action.type) {
    case ADD_COUNT:
        newState.rcount = newState.rcount + 1
        return newState;
    case RESET_COUNT:
        newState.rcount = 0;
        return newState;
    default:
      return state;
  }
}

export default utilReducer;
