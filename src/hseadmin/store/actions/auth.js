/* eslint-disable default-param-last */
import URLConstants from '../../constants/URLConstants';

export const AUTHENTICATE = 'AUTHENTICATE';
export const LOGOUT = 'LOGOUT';
export const SET_DIVISIONS = 'SET_DIVISIONS';
export const SET_JOB_SITES = 'SET_JOB_SITES';
export const SET_SELECTED_DIVISION_ID = 'SET_SELECTED_DIVISION_ID';
export const SET_SELECTED_JOB_SITE_ID = 'SET_SELECTED_JOB_SITE_ID';

//
export const authenticate = (username, password) => {
  return async (dispatch) => {
    try {
      const url = URLConstants.AUTHENTICATE_URL;

      const postData = JSON.stringify({
        username,
        password,
      });
      console.log('authenticate url =', url);

      console.log('authenticate postData =', postData);

      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: postData,
      });

      if (!response.ok) {
        if (response.status === 500) {
          throw new Error('Internal Server Error');
        }

        if (response.status === 401) {
          throw new Error('Invalid Username or Password');
        }
      }

      const resData = await response.json();

      if (resData.data.error_code !== undefined) {
        throw new Error(resData.data.error_message);
      }

      console.log('authenticate --->', resData);

      if (resData.success !== undefined && resData.success === true) {
        // AsyncStorage.setItem(KEY_USER_TOKEN, resData.data.token);

        localStorage.setItem('token', resData.data.token);
        dispatch({
          type: AUTHENTICATE,
          payload: resData.data.token,
        });
      }
    } catch (error) {
      console.log(error);
      throw error;
    }
  };
};

export const logout = () => {
  return async (dispatch) => {
    try {
      dispatch({
        type: LOGOUT,
        payload: null,
      });
    } catch (error) {
      console.log(error);
      throw error;
    }
  };
};

export const setJobSites = (jobSites) => {
  return async (dispatch) => {
    try {
      dispatch({
        type: SET_JOB_SITES,
        payload: jobSites,
      });
    } catch (error) {
      console.log(error);
      throw error;
    }
  };
};

export const setDivisions = (divisions) => {
  return async (dispatch) => {
    try {
      dispatch({
        type: SET_DIVISIONS,
        payload: divisions,
      });
    } catch (error) {
      console.log(error);
      throw error;
    }
  };
};

export const setSelectedDivision = (divisionId) => {
  return async (dispatch) => {
    try {
      dispatch({
        type: SET_SELECTED_DIVISION_ID,
        payload: divisionId,
      });
    } catch (error) {
      console.log(error);
      throw error;
    }
  };
};

export const setSelectedJobSite = (jobSiteId) => {
  return async (dispatch) => {
    try {
      dispatch({
        type: SET_SELECTED_JOB_SITE_ID,
        payload: jobSiteId,
      });
    } catch (error) {
      console.log(error);
      throw error;
    }
  };
};
