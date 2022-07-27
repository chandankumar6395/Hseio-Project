import {
  GET_ADDRESSES,
  GET_ADDRESSES_PAGINATION,
  GET_ADDRESS,
  POST_ADDRESSES,
  UPDATE_ADDRESS,
} from '../actions/addresses';

const initialState = {
  addresses: [], // we will save token here.
  address: null,
  page: 1,
  pagination: null,
  updateAddress: null,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_ADDRESSES:
      console.log('I am here in addresses --->');
      return {
        ...state,
        addresses: action.payload,
      };

    case GET_ADDRESSES_PAGINATION:
      console.log('I am here in pagination --->');
      return {
        ...state,
        pagination: action.payload,
      };

    case POST_ADDRESSES:
      return {
        ...state,
        address: action.payload,
      };

    // default:
    //   return state;

    case GET_ADDRESS:
      return {
        ...state,
        address: action.payload,
      };
    case UPDATE_ADDRESS:
      return {
        ...state,
        editAddress: action.payload,
      };
    default:
      return state;
  }
};
