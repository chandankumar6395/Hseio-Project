/* eslint-disable default-param-last */
import {
  GET_EMPLOYEES,
  GET_EMPLOYEES_PAGINATION,
  POST_EMPLOYEES,
  GET_EMPLOYEE,
  UPDATE_EMPLOYEE,
} from '../actions/employees';

const initialState = {
  employees: [], // we will save token here.
  employee: null,
  updateIndustry: null,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_EMPLOYEES:
      console.log('I am here in employees --->');
      return {
        ...state,
        employees: action.payload,
      };

    case POST_EMPLOYEES:
      return {
        ...state,
        employee: action.payload,
      };

    case GET_EMPLOYEES_PAGINATION:
      console.log('I am here in pagnation --->');
      return {
        ...state,
        pagination: action.payload,
      };
    // default:
    //   return state;

    case GET_EMPLOYEE:
      return {
        ...state,
        employee: action.payload,
      };
    case UPDATE_EMPLOYEE:
      return {
        ...state,
        editEmployee: action.payload,
      };
    default:
      return state;
  }
};
