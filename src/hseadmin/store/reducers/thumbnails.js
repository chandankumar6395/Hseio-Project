import {
  ADD_THUMBNAIL,
  DELETE_THUMBNAIL,
  EDIT_THUMBNAIL,
  THUMBNAILS_LIST,
  THUMBNAILS_LIST_PAGINATION,
} from '../actions/thumbnails';

const initialState = {
  thumbnails: [], // we will save token here.
  thumbnail: null,
  page: 1,
  pagination: null,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case THUMBNAILS_LIST:
      return {
        ...state,
        thumbnails: action.payload,
      };

    case THUMBNAILS_LIST_PAGINATION:
      console.log('I am here in pagnation --->');

      return {
        ...state,
        pagination: action.payload,
      };

    case ADD_THUMBNAIL:
      return {
        ...state,
        thumbnail: action.payload,
      };

    case EDIT_THUMBNAIL:
      return {
        ...state,
        thumbnail: action.payload,
      };

    case DELETE_THUMBNAIL:
      return {
        ...state,
        thumbnail: action.payload,
      };

    default:
      return state;
  }
};
