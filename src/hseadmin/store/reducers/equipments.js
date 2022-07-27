import {
  // eslint-disable-next-line import/named
  GET_EQUIPMENTS,
  GET_EQUIPMENTS_PAGINATION,
  POST_EQUIPMENTS,
  GET_EQUIPMENT,
  UPDATE_EQUIPMENT,
} from '../actions/equipments';

const initialState = {
  equipments: [], // we will save token here.
  equipment: null,
  page: 1,
  pagination: null,
  updateEquipment: null,
};
// eslint-disable-next-line default-param-last
export default (state = initialState, action) => {
  switch (action.type) {
    case GET_EQUIPMENTS:
      console.log('I am here in equipment --->');
      return {
        ...state,
        equipments: action.payload,
      };

    case GET_EQUIPMENTS_PAGINATION:
      console.log('I am here in pagnation --->');
      return {
        ...state,
        pagination: action.payload,
      };

    case POST_EQUIPMENTS:
      return {
        ...state,
        equipment: action.payload,
      };
    case GET_EQUIPMENT:
      return {
        ...state,
        equipment: action.payload,
      };
    case UPDATE_EQUIPMENT:
      return {
        ...state,
        editEquipment: action.payload,
      };

    default:
      return state;
  }
};
