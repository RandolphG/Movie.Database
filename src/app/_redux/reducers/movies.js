import { initialState } from "../../_data/index";
const FETCH_DATA = "FETCH_DATA";
const FETCH_RESULTS = "FETCH_RESULTS";
export const movies = (
  state = {
    moviesinfo: [],
    results: initialState,
  },
  action
) => {
  // check action type
  if (action.type === FETCH_DATA) {
    state = { ...state, moviesinfo: action.payload };
  }
  if (action.type === FETCH_RESULTS) {
    state = { ...state, results: action.payload };
  }

  return state;
};

export default movies;
