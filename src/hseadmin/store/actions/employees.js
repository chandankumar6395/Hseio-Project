/* eslint-disable default-param-last */
import { fetchGET, fetchPUT } from '../../utils/NetworkUtils';
import { KEY_TOKEN } from '../../constants/Constants';
import URLConstants from '../../constants/URLConstants';

export const GET_EMPLOYEES = 'GET_EMPLOYEES';
export const GET_EMPLOYEES_PAGINATION = 'GET_EMPLOYEES_PAGINATION';
export const POST_EMPLOYEES = 'POST_EMPLOYEES';
export const GET_EMPLOYEE = 'GET_EMPLOYEE';
export const UPDATE_EMPLOYEE = 'UPDATE_EMPLOYEE';

export const loadEmployees = (
  page = 1,
  search = '',
  sort,
  direction,
  companyId = -1,
  limit = 10,
  divisionId = -1
) => {
  return async (dispatch) => {
    try {
      let url = `${URLConstants.EMPLOYEES_URL}?limit=${limit}&page=${page}&sort=${sort}&direction=${direction}`;
      if (search !== undefined && search !== '') {
        url = `${url}&search=${search}`;
      }
      if (companyId !== -1 && companyId !== null) {
        url = `${url}&company_id=${companyId}`;
      }

      if (divisionId !== -1) {
        url = `${url}&division_id=${divisionId}`;
      }

      console.log('loadEmployees url =', url);

      const resData = await fetchGET(url);

      console.log('loadEmployees --->', resData);

      dispatch({
        type: GET_EMPLOYEES,
        payload: resData.data,
      });

      dispatch({
        type: GET_EMPLOYEES_PAGINATION,
        payload: resData.pagination,
      });
    } catch (error) {
      console.log(error);
      throw error;
    }
  };
};

export const addEmployees = (employee) => {
  return async (dispatch) => {
    try {
      const url = URLConstants.EMPLOYEES_URL;

      console.log('addEmployees url =', url);

      // any async code you want!
      const bearer = localStorage.getItem(KEY_TOKEN);
      const token = `Bearer ${bearer}`;

      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
          Authorization: token,
        },
        body: JSON.stringify(employee),
      });

      if (!response.ok) {
        if (response.status === 500) {
          throw new Error('Internal Server Error');
        }

        if (response.status === 401) {
          throw new Error('Unauthorized Access');
        }
      }

      const resData = await response.json();
      console.log(`RESPONSE DATA ===> ${JSON.stringify(resData)}`);

      if (resData.data.error_code !== undefined) {
        throw new Error(resData.data.error_message);
      }

      console.log('addEmployees --->', resData);

      dispatch({
        type: POST_EMPLOYEES,
        payload: resData.data,
      });
    } catch (error) {
      console.log(error);
      throw error;
    }
  };
};

export const getEmployee = (id) => {
  return async (dispatch) => {
    try {
      const url = `${URLConstants.GET_EMPLOYEE_URL}/${id}.json`;

      console.log('getEmployee url =', url);

      const resData = await fetchGET(url);

      console.log('getEmployee --->', resData);

      dispatch({
        type: GET_EMPLOYEE,
        payload: resData.data,
      });
    } catch (error) {
      console.log(error);
      throw error;
    }
  };
};

export const updateEmployee = (employee) => {
  return async (dispatch) => {
    try {
      const url = `${URLConstants.GET_EMPLOYEE_URL}/${employee.id}.json`;

      console.log('updateEmployee url =', url);

      const resData = await fetchPUT(url, employee);
      console.log('updateEmployee --->', resData);

      dispatch({
        type: UPDATE_EMPLOYEE,
        payload: resData.data,
      });
    } catch (error) {
      console.log(error);
      throw error;
    }
  };
};
