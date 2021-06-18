import { URL } from "../../constants/API";
import { UnauthorizedError, NotFoundError } from "../../classes/Errors";
import Bottle from "../../models/Bottle";
export const GET_BOTTLES = "GET_BOTTLES";

export const getBottles = () => {
  return async (dispatch, getState) => {
    try {
      const token = getState().auth.token;
      const response = await fetch(`${URL}/bottles`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        if (response.status === 401)
          throw new UnauthorizedError(
            "You are not authorized for this request."
          );

        if (response.status === 400)
          throw new BadRequestError(
            "The request sent to the database is invalid."
          );

        throw new NotFoundError("The requested data could not be found");
      }

      const data = await response.json();

      dispatch({ type: GET_BOTTLES, bottles: data });
    } catch (error) {
      throw error;
    }
  };
};

export const getBottlesWhiskyProject = () => {
  return async (dispatch) => {
    try {
      const response = await fetch(
        "https://evening-citadel-85778.herokuapp.com:443/whiskey/"
      );

      if (!response.ok) {
        const responseText = await response.text();
        console.log(responseText);
        throw new Error(response.status);
      }

      const data = await response.json();

      let bottles = data.results.map(
        (item) =>
          new Bottle(
            item.id,
            item.title,
            item.title.split(" ")[0],
            item["img_url"],
            item["list_img_url"],
            item.region,
            item.price,
            item.description
          )
      );

      dispatch({ type: GET_BOTTLES, bottles });
    } catch (error) {
      console.log(error);
    }
  };
};
