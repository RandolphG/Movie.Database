import { initialState } from "../../_data/index";
const FETCH_RESULTS = "FETCH_RESULTS";
const FETCH_DETAILS = "FETCH_DETAILS";
export const movies = (
  state = {
    moviesinfo: {
      results: initialState,
      details: "",
    },
    details: "",
  },
  action
) => {
  // check action type
  if (action.type === FETCH_RESULTS) {
    state = {
      ...state,
      moviesinfo: {
        ...state.moviesinfo,
        results: action.payload,
      },
    };
  }
  if (action.type === FETCH_DETAILS) {
    state = {
      ...state,
      moviesinfo: { ...state.moviesinfo, details: action.payload },
    };
  }

  return state;
};

export default movies;
