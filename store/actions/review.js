export const SUBMIT_REVIEW = "SUBMIT_REVIEW";
import { URL } from "../../constants/API";
import Review from "../../models/Review";

export const getReviews = (bottleId) => {
  return async (dispatch, token) => {
    try {
    } catch (error) {}
  };
};

export const submitReview = (review) => {
  return async (dispatch, getState) => {
    try {
      const token = getState().auth.token;

      const response = await fetch(`${URL}/reviews`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(review),
      });

      const data = await response.json();

      if (!response.ok)
        throw new Error("There was an error - code " + response.status);
    } catch (error) {
      console.log(error.message);
    }
  };
};
