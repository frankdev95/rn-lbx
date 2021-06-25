import { GET_DISTILLERS } from "../actions/stats";

const initialState = {
  distillers: [],
};

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_DISTILLERS:
      return {
        ...state,
        distillers: action.distillers,
      };
    default:
      return state;
  }
};
