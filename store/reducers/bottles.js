import { GET_BOTTLES } from "../actions/bottles";

const initialState = {
  bottles: [],
};

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_BOTTLES: {
      return {
        bottles: action.bottles,
      };
    }
  }
  return state;
};
