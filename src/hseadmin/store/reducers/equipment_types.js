import {
  // eslint-disable-next-line import/named
  GET_EQUIPMENT_TYPES,
  GET_EQUIPMENT_TYPES_PAGINATION,
  POST_EQUIPMENT_TYPES,
  GET_EQUIPMENT_TYPE,
  UPDATE_EQUIPMENT_TYPE,
} from '../actions/equipment_types';

const initialState = {
  equipmentTypes: [], // we will save token here.
  equipmentType: null,
  page: 1,
  pagination: null,
  updateEquipment: null,
};
// eslint-disable-next-line default-param-last
export default (state = initialState, action) => {
  switch (action.type) {
    case GET_EQUIPMENT_TYPES:
      console.log('I am here in equipment --->');
      return {
        ...state,
        equipmentTypes: action.payload,
      };

    case GET_EQUIPMENT_TYPES_PAGINATION:
      console.log('I am here in pagnation --->');
      return {
        ...state,
        pagination: action.payload,
      };

    case POST_EQUIPMENT_TYPES:
      return {
        ...state,
        equipmentType: action.payload,
      };
    case GET_EQUIPMENT_TYPE:
      return {
        ...state,
        equipmentType: action.payload,
      };
    case UPDATE_EQUIPMENT_TYPE:
      return {
        ...state,
        editEquipmentType: action.payload,
      };

    default:
      return state;
  }
};
