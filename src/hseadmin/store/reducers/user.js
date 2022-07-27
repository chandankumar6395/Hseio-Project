/* eslint-disable default-param-last */
import {
  GET_USERS,
  GET_USERS_PAGINATION,
  POST_USERS,
  GET_USER,
  UPDATE_USER,
} from '../actions/user';

const initialState = {
  users: [], // we will save token here.
  user: null,
  page: 1,
  pagination: null,
  updateUser: null,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_USERS:
      console.log('I am here in users --->');
      return {
        ...state,
        users: action.payload,
      };

    case GET_USERS_PAGINATION:
      console.log('I am here in pagnation --->');
      return {
        ...state,
        pagination: action.payload,
      };

    case POST_USERS:
      return {
        ...state,
        user: action.payload,
      };

    case GET_USER:
      return {
        ...state,
        user: action.payload,
      };
    case UPDATE_USER:
      return {
        ...state,
        editUser: action.payload,
      };

    default:
      return state;
  }
};
