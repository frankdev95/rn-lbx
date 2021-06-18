import { AUTHENTICATE, LOGOUT } from "../actions/auth";

const authToken =
  "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJhZG1pbiIsInJvbGUiOiJhZG1pbiIsImlhdCI6MTYyMzE1MTYxMywiZXhwIjoxNjIzNTgzNjEzfQ.9ZO-dkDavS4xqApenzDP7KvtWz-iQdIMUzSVUgVh3dI";

const fakeUser = {
  username: "admin",
};

const initialState = {
  isLoggedIn: false,
  token: null,
  user: null,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case AUTHENTICATE:
      return {
        isLoggedIn: true,
        token: action.token,
        user: action.user,
      };
    case LOGOUT:
      return initialState;
    default:
      return state;
  }
};
