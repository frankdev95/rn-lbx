import { URL } from "../../constants/API";
import {
  ConflictError,
  BadRequestError,
  NotFoundError,
} from "../../classes/Errors";
export const ADD_TO_COLLECTION = "ADD_TO_COLLECTION";
export const ADD_TO_WISHLIST = "ADD_TO_WISHLIST";
export const GET_COLLECTION = "GET_COLLECTION";
export const GET_WISHLIST = "GET_COLLECTION";
export const GET_USER_BOTTLES = "GET_USER_BOTTLES";
export const DELETE_COLLECTION_ITEM = "DELETE_COLLECTION_ITEM";

export const addToCollection = (bottleId) => {
  return async (dispatch, getState) => {
    try {
      const userId = getState().auth.user.id;
      const token = getState().auth.token;

      const response = await fetch(
        `${URL}/portfolio/collection/?bottle_id=${bottleId}&user_id=${userId}`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response.ok) {
        if (response.status === 409)
          throw new ConflictError(
            "This bottle is already a part of your collection"
          );

        if (response.status === 400)
          throw new BadRequestError(
            "The request sent to the database is invalid."
          );

        throw new NotFoundError("The requested data could not be found");
      }
    } catch (error) {
      throw error;
    }
  };
};

export const getCollection = () => {
  return async (dispatch, getState) => {
    try {
      const userId = getState().auth.user.id;
      const token = getState().auth.token;

      const response = await fetch(
        `${URL}/portfolio/items?table=bottles&field=collection&user_id=${userId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (!response.ok) {
        if (response.status === 400)
          throw new BadRequestError(
            "The request sent to the database is invalid."
          );
        throw new NotFoundError("The requested data could not be found");
      }
      const data = await response.json();

      dispatch({ type: GET_COLLECTION, data: data });
    } catch (error) {
      throw error;
    }
  };
};

export const deleteCollectionItem = (bottleId) => {
  return async (dispatch, getState) => {
    try {
      const userId = getState().auth.user.id;
      const token = getState().auth.token;

      const response = await fetch(
        `${URL}/portfolio/collection/?bottle_id=${bottleId}&user_id=${userId}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await response.json();

      if (!response.ok) throw new Error("");

      dispatch({ type: DELETE_COLLECTION_ITEM, bottleId: bottleId });
    } catch (error) {
      console.log(error.message);
    }
  };
};

export const getUserBottles = (bottleId) => {
  return async (dispatch, getState) => {
    try {
      const userId = getState().auth.user.id;
      const token = getState().auth.token;

      const response = await fetch(
        `${URL}/portfolio/bottles/?bottle_id=${bottleId}&user_id=${userId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response.ok) console.log(response.status);

      const data = await response.json();
      dispatch({ type: GET_USER_BOTTLES, bottleId: bottleId, data: data });
    } catch (error) {
      console.log(error.message);
    }
  };
};

// WISHLIST METHODS
