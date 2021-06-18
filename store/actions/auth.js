import { URL } from "../../constants/API";
import moment from "moment";
import AsyncStorage from "@react-native-async-storage/async-storage";

import {
  ConflictError,
  UserValidationError,
  PasswordValidationError,
  NotFoundError,
} from "../../classes/Errors";

export const AUTHENTICATE = "AUTHENTICATE_USER";
export const LOGOUT = "LOGOUT";

let logoutTimer;

export const signUp = (fields) => {
  return async () => {
    const { username, email, password } = fields;
    try {
      const response = await fetch(`${URL}/signup`, {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({
          username: username,
          email_address: email,
          password: password,
        }),
      });

      if (!response.ok) {
        if (response.status === 409) {
          throw new ConflictError(
            "User with these credentials already exists."
          );
        }
        if (response.status === 404) {
          throw new NotFoundError(
            "Endpoint not found, please check request url."
          );
        }
      }
    } catch (error) {
      throw new Error(error.message);
    }
  };
};

export const signIn = (fields) => {
  return async (dispatch) => {
    const { username, password } = fields;
    try {
      const response = await fetch(`${URL}/signin`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: username,
          password: password,
        }),
      });

      if (!response.ok) {
        if (response.status === 404)
          throw new UserValidationError(
            "We couldn't find a user with that username in our system, please make sure it is correct."
          );
        if (response.status === 401)
          throw new PasswordValidationError(
            "Incorrect password for username provided, please try again."
          );
      }

      const data = await response.json();
      const { user, token } = data;

      const expirationDate = moment()
        .add(data["expires_in"], "s")
        .toISOString();

      await saveAuthDataToStorage(user, token, expirationDate);

      dispatch(validateSession(user, token, data["expires_in"] * 1000));
    } catch (error) {
      throw new Error(error.message);
    }
  };
};

export const validateSession = (user, token, expirationDate) => {
  return (dispatch) => {
    dispatch(setLogoutTimer(expirationDate));
    dispatch({
      type: AUTHENTICATE,
      user,
      token,
    });
  };
};

export const logoutUser = () => {
  return async (dispatch) => {
    try {
      if (logoutTimer) clearTimeout(logoutTimer);

      await AsyncStorage.removeItem("userData");
      dispatch({ type: LOGOUT });
    } catch (error) {
      console.log(error);
    }
  };
};

const setLogoutTimer = (expirationDate) => {
  return (dispatch) => {
    logoutTimer = setTimeout(() => dispatch(logoutUser()), expirationDate);
  };
};

const saveAuthDataToStorage = async (user, token, expirationDate) => {
  try {
    await AsyncStorage.setItem(
      "userData",
      JSON.stringify({
        user,
        token,
        expirationDate,
      })
    );
  } catch (error) {
    console.log(error);
  }
};
