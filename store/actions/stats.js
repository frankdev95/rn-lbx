import { URL } from "../../constants/API";
export const GET_DISTILLERS = "GET_DISTILLERS";
export const GET_REGION_BY_NAME = "GET_REGION_BY_NAME";

export const getDistillersByName = (name) => {
  return async (dispatch, getState) => {
    try {
      const token = getState().auth.token;
      const response = await fetch(`${URL}/distillers/${name}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) throw new Error("Something went wrong");

      const data = await response.json();

      console.log(data);
    } catch (error) {
      console.log(error.message);
    }
  };
};

export const getDistillers = () => {
  return async (dispatch, getState) => {
    try {
      const token = getState().auth.token;
      const response = await fetch(`${URL}/distillers`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) throw new Error("Something went wrong");

      const data = await response.json();

      console.log(data);
      dispatch({ type: GET_DISTILLERS, distillers: data });
    } catch (error) {
      console.log(error.message);
    }
  };
};
