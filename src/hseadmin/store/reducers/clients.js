/* eslint-disable default-param-last */
import {
  GET_CLIENT,
  GET_CLIENTS,
  GET_CLIENTS_PAGINATION,
  POST_CLIENT,
  RESET_CLIENT,
  UPDATE_CLIENT,
} from '../actions/clients';

const initialState = {
  clients: [], // we will save token here.
  client: null,
  page: 1,
  pagination: null,
  updateClient: null,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_CLIENTS:
      console.log('I am here in companies --->');
      return {
        ...state,
        clients: action.payload,
      };
    case GET_CLIENTS_PAGINATION:
      console.log('I am here in pagnation --->');
      return {
        ...state,
        pagination: action.payload,
      };

    case POST_CLIENT:
      return {
        ...state,
        client: action.payload,
      };
    case GET_CLIENT:
      return {
        ...state,
        client: action.payload,
      };
    case UPDATE_CLIENT:
      return {
        ...state,
        updateClient: action.payload,
      };
    case RESET_CLIENT:
      return {
        ...state,
        client: null,
      };

    default:
      return state;
  }
};
