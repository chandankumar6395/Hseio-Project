import {
  // eslint-disable-next-line import/named
  GET_INSPECTIONS,
  GET_INSPECTIONS_PAGINATION,
  POST_INSPECTIONS,
  GET_INSPECTION,
  UPDATE_INSPECTION,
} from '../actions/ inspections';

const initialState = {
  inspections: [], // we will save token here.
  inspection: null,
  page: 1,
  pagination: null,
  updateInspection: null,
};
// eslint-disable-next-line default-param-last
export default (state = initialState, action) => {
  switch (action.type) {
    case GET_INSPECTIONS:
      console.log('I am here in inspections --->');
      return {
        ...state,
        inspections: action.payload,
      };

    case GET_INSPECTIONS_PAGINATION:
      console.log('I am here in pagnation --->');
      return {
        ...state,
        pagination: action.payload,
      };

    case POST_INSPECTIONS:
      return {
        ...state,
        inspection: action.payload,
      };
    case GET_INSPECTION:
      return {
        ...state,
        inspection: action.payload,
      };
    case UPDATE_INSPECTION:
      return {
        ...state,
        editInspection: action.payload,
      };

    default:
      return state;
  }
};
