import { AUTHENTICATE, LOGOUT } from "../actions/auth";

const authToken =
  "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJhZG1pbiIsInJvbGUiOiJhZG1pbiIsImlhdCI6MTYyNDU0NzA0NCwiZXhwIjoxNjI0OTc5MDQ0fQ.PxAiKDPSFDVzFMafZ8Rh5ySbM28aB-lSB5u0iPNPJh4";
const fakeUser = {
  username: "admin",
};

const initialState = {
  isLoggedIn: true,
  token: authToken,
  user: fakeUser,
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
