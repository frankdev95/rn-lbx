import {
  GET_COLLECTION,
  GET_WISHLIST,
  GET_USER_BOTTLES,
  DELETE_COLLECTION_ITEM,
  ADD_TO_COLLECTION,
} from "../actions/portfolio";

const initialState = {
  collection: [],
  wishlist: [],
  userBottles: {},
};

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_COLLECTION || GET_WISHLIST:
      return {
        ...state,
        collection: action.data,
      };
    case ADD_TO_COLLECTION:
      return state;
    case GET_USER_BOTTLES:
      const updatedUserBottles = {
        ...state.userBottles,
        [action.bottleId]: action.data,
      };
      return {
        ...state,
        userBottles: updatedUserBottles,
      };
    case DELETE_COLLECTION_ITEM:
      return {
        ...state,
        collection: state.collection.filter(
          (item) => item.id != action.bottleId
        ),
      };
  }
  return state;
};
