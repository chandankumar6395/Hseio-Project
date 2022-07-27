/* eslint-disable react/destructuring-assignment */
import { createContext, useEffect, useReducer } from 'react';

import axios from '../utils/axios';
// import { isValidToken, setSession } from '../utils/jwt';
import { setSession } from '../utils/jwt';
import {
  KEY_COMPANY_ID,
  KEY_DIVISION_ID,
  KEY_DIVISIONS,
  KEY_EMPLOYEE_ID,
  KEY_JOB_SITES,
  KEY_TOKEN,
  KEY_TYPE_ID,
  TYPE_DIVISION_OWNER,
  TYPE_JOB_SITE_OWNER,
  TYPE_SYSTEM_ADMIN,
} from '../hseadmin/constants/Constants';
import URLConstants from '../hseadmin/constants/URLConstants';
import {
  setDivisions,
  setJobSites,
  setSelectedDivision,
  setSelectedJobSite,
} from '../hseadmin/store/actions/auth';
import { fetchPOST } from '../hseadmin/utils/NetworkUtils';

const INITIALIZE = 'INITIALIZE';
const SIGN_IN = 'SIGN_IN';
const SIGN_OUT = 'SIGN_OUT';
const SIGN_UP = 'SIGN_UP';

const initialState = {
  isAuthenticated: false,
  isInitialized: false,
  user: null,
};

const JWTReducer = (state, action) => {
  switch (action.type) {
    case INITIALIZE:
      return {
        isAuthenticated: action.payload.isAuthenticated,
        isInitialized: true,
        user: action.payload.user,
      };
    case SIGN_IN:
      return {
        ...state,
        isAuthenticated: true,
        user: action.payload.user,
      };
    case SIGN_OUT:
      return {
        ...state,
        isAuthenticated: false,
        user: null,
      };

    case SIGN_UP:
      return {
        ...state,
        isAuthenticated: true,
        user: action.payload.user,
      };

    default:
      return state;
  }
};

const AuthContext = createContext(null);

function AuthProvider({ children }) {
  const [state, dispatch] = useReducer(JWTReducer, initialState);

  useEffect(() => {
    const initialize = async () => {
      try {
        const accessToken = window.localStorage.getItem(KEY_TOKEN);

        // old code
        /* if (accessToken && isValidToken(accessToken)) {
          setSession(accessToken);

          const response = await axios.get('/api/auth/my-account');
          const { user } = response.data;

          console.log(user);
          console.log('is Authenticated True',user);
          dispatch({
            type: INITIALIZE,
            payload: {
              isAuthenticated: true,
              user,
            },
          });
        } else {
          console.log('is Authenticated false');

          dispatch({
            type: INITIALIZE,
            payload: {
              isAuthenticated: false,
              user: null,
            },
          });
        }

*/

        if (accessToken) {
          setSession(accessToken);

          const typeId = await +localStorage.getItem(KEY_TYPE_ID);

          const resData = await fetchPOST(URLConstants.AUTHENTICATE_URL, {
            type_id: typeId,
          });
          // const response = await axios.get('/api/auth/my-account');
          console.log(resData.data);
          const { user } = resData.data;

          console.log(user);
          console.log('is Authenticated True', user);

          const jobSites = resData.data.user.job_sites;
          const { divisions } = resData.data.user;

          console.log('JobSite --->', jobSites);
          console.log('Divisions --->', divisions);

          if (typeId === TYPE_DIVISION_OWNER && divisions.length <= 0) {
            throw new Error(
              'You do not manage any Division. Please connect to your administrator'
            );
          }

          if (typeId === TYPE_JOB_SITE_OWNER && jobSites.length <= 0) {
            throw new Error(
              'You do not manage any Job Site. Please connect to your administrator'
            );
          }

          // save this data so we can check if we can display the list of jobsite to swtich ui
          localStorage.setItem(KEY_JOB_SITES, JSON.stringify(jobSites));
          // save this data so we can check if we can display the list of divisions to swtich ui
          localStorage.setItem(KEY_DIVISIONS, JSON.stringify(divisions));

          localStorage.setItem(KEY_TYPE_ID, JSON.stringify(typeId));

          if (typeId !== TYPE_SYSTEM_ADMIN) {
            localStorage.setItem(
              KEY_COMPANY_ID,
              resData.data.user.primary_company_id
            );
          }
          if (typeId === TYPE_DIVISION_OWNER) {
            localStorage.setItem(
              KEY_DIVISION_ID,
              resData.data.user.primary_division_id
            );

            dispatch(setSelectedDivision(divisions[0].id));
          }

          if (typeId === TYPE_JOB_SITE_OWNER) {
            console.log(
              `TYPE_JOB_SITE_OWNER ${TYPE_JOB_SITE_OWNER} ${jobSites[0].id}`
            );
            console.log(
              `TYPE_JOB_SITE_OWNER ${TYPE_JOB_SITE_OWNER} ${jobSites[0].primary_division_id}`
            );
            dispatch(setSelectedJobSite(jobSites[0].id));
            dispatch(setSelectedDivision(jobSites[0].primary_division_id));
          }

          dispatch(setJobSites(resData.data.user.job_sites));
          dispatch(setDivisions(resData.data.user.divisions));

          if (resData.data.user.job_sites.length > 0) {
            dispatch(setSelectedJobSite(resData.data.user.job_sites[0].id));
            dispatch(
              setSelectedDivision(
                resData.data.user.job_sites[0].primary_division_id
              )
            );
          }

          if (resData.data.user.divisions.length > 0) {
            dispatch(setSelectedDivision(resData.data.user.divisions[0].id));
          }

          dispatch({
            type: INITIALIZE,
            payload: {
              isAuthenticated: true,
              user,
            },
          });
        } else {
          console.log('is Authenticated false');

          dispatch({
            type: INITIALIZE,
            payload: {
              isAuthenticated: false,
              user: null,
            },
          });
        }
      } catch (err) {
        console.log('is Authenticated false with error');
        console.error(err);
        dispatch({
          type: INITIALIZE,
          payload: {
            isAuthenticated: false,
            user: null,
          },
        });
      }
    };

    initialize();
  }, []);

  const signIn = async (email, password, typeId) => {
    try {
      // code from previous git repo

      // remove all items from localstorage
      localStorage.removeItem(KEY_COMPANY_ID);
      localStorage.removeItem(KEY_DIVISION_ID);
      localStorage.removeItem(KEY_TOKEN);
      localStorage.removeItem(KEY_DIVISIONS);
      localStorage.removeItem(KEY_JOB_SITES);
      localStorage.removeItem(KEY_EMPLOYEE_ID);

      // const token = await Gatekeeper.loginByAuth(email, password);
      const url = URLConstants.AUTHENTICATE_URL;

      const postData = JSON.stringify({
        username: email,
        password: password,
        type_id: typeId,
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

      const { token } = resData.data;

      const jobSites = resData.data.user.job_sites;
      const { divisions } = resData.data.user;

      console.log('JobSite --->', jobSites);
      console.log('Divisions --->', divisions);

      if (typeId === TYPE_DIVISION_OWNER && divisions.length <= 0) {
        throw new Error(
          'You do not manage any Division. Please connect to your administrator'
        );
      }

      if (typeId === TYPE_JOB_SITE_OWNER && jobSites.length <= 0) {
        throw new Error(
          'You do not manage any Job Site. Please connect to your administrator'
        );
      }

      localStorage.setItem(KEY_TOKEN, token);
      // save this data so we can check if we can display the list of jobsite to swtich ui
      localStorage.setItem(KEY_JOB_SITES, JSON.stringify(jobSites));
      // save this data so we can check if we can display the list of divisions to swtich ui
      localStorage.setItem(KEY_DIVISIONS, JSON.stringify(divisions));

      localStorage.setItem(KEY_TYPE_ID, JSON.stringify(typeId));

      if (typeId !== TYPE_SYSTEM_ADMIN) {
        localStorage.setItem(
          KEY_COMPANY_ID,
          resData.data.user.primary_company_id
        );
      }
      if (typeId === TYPE_DIVISION_OWNER) {
        localStorage.setItem(
          KEY_DIVISION_ID,
          resData.data.user.primary_division_id
        );
      }

      // const userTemp = {
      //   id: 'a8553063-7bd5-45ed-adbe-db6f069a3802',
      //   displayName: 'Lucy Lavender',
      //   email: 'demo@bootlab.io',
      //   password: 'unsafepassword',
      //   avatar: '/static/img/avatars/avatar-1.jpg',
      // };

      const userTemp = resData.data.user;

      setSession(token);
      dispatch({
        type: SIGN_IN,
        payload: {
          user: userTemp,
        },
      });
      dispatch(setJobSites(resData.data.user.job_sites));
      dispatch(setDivisions(resData.data.user.divisions));

      if (resData.data.user.job_sites.length > 0) {
        dispatch(setSelectedJobSite(resData.data.user.job_sites[0].id));
      }

      if (resData.data.user.divisions.length > 0) {
        dispatch(setSelectedDivision(resData.data.user.divisions[0].id));
      }

      if (resData.data.user.employees.length > 0) {
        localStorage.setItem(
          KEY_EMPLOYEE_ID,
          resData.data.user.employees[0].id
        );
      }

      // return {
      //   token,
      //   jobSites: resData.data.user.job_sites,
      //   divisions: resData.data.user.divisions
      // };
    } catch (error) {
      console.log(error.message);
      throw new Error(error.message);
    }

    // -------------  Below code is orignal code ------

    // const newResponse = await axios.post('/api/auth/sign-in', {
    //   email,
    //   password,
    // });
    // const { accessToken, user } = newResponse.data;
    //
    // console.log('user is = >',user);
    // console.log('user is = >',JSON.stringify(user));
    //
    // setSession(accessToken);
    // dispatch({
    //   type: SIGN_IN,
    //   payload: {
    //     user,
    //   },
    // });

    // --------------- end here
  };

  const signOut = async () => {
    setSession(null);
    dispatch({ type: SIGN_OUT });
  };

  const signUp = async (email, password, firstName, lastName) => {
    const response = await axios.post('/api/auth/sign-up', {
      email,
      password,
      firstName,
      lastName,
    });
    const { accessToken, user } = response.data;

    window.localStorage.setItem(KEY_TOKEN, accessToken);
    dispatch({
      type: SIGN_UP,
      payload: {
        user,
      },
    });
  };

  const resetPassword = (email) => console.log(email);

  /* eslint-disable-next-line react/jsx-no-constructed-context-values */
  return (
    // eslint-disable-next-line react/react-in-jsx-scope
    <AuthContext.Provider
      value={{
        ...state,
        method: 'jwt',
        signIn,
        signOut,
        signUp,
        resetPassword,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export { AuthContext, AuthProvider };
