/* eslint-disable default-param-last */
import {
  ADD_PHOTO,
  DELETE_PHOTO,
  EDIT_PHOTO,
  PHOTO_LIST,
  PHOTO_LIST_PAGINATION,
} from '../actions/photos';

const initialState = {
  photos: [], // we will save token here.
  photo: null,
  page: 1,
  pagination: null,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case PHOTO_LIST:
      return {
        ...state,
        photos: action.payload,
      };

    case PHOTO_LIST_PAGINATION:
      console.log('I am here in pagnation --->');

      return {
        ...state,
        pagination: action.payload,
      };

    case ADD_PHOTO:
      return {
        ...state,
        photo: action.payload,
      };

    case EDIT_PHOTO:
      return {
        ...state,
        photo: action.payload,
      };

    case DELETE_PHOTO:
      return {
        ...state,
        photo: action.payload,
      };

    default:
      return state;
  }
};
