import { KEY_TOKEN } from '../constants/Constants';

export const fetchGET = async (url) => {
  console.log(`URL ===>${url}`);
  // any async code you want!
  const bearer = localStorage.getItem(KEY_TOKEN);
  const token = `Bearer ${bearer}`;
  const response = await fetch(url, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      Authorization: token,
    },
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
  console.log('Response', resData);

  // console.log(`RESPONSE DATA ===> ${JSON.stringify(resData)}`);
  if (resData.data.error_code !== undefined) {
    throw new Error(resData.data.error_message);
  }

  return resData;
};

export const fetchDELETE = async (url) => {
  console.log(`URL ===>${url}`);
  // any async code you want!
  const bearer = localStorage.getItem(KEY_TOKEN);
  const token = `Bearer ${bearer}`;
  const response = await fetch(url, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      Authorization: token,
    },
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

  // console.log(`RESPONSE DATA ===> ${JSON.stringify(resData)}`);
  if (resData.data.error_code !== undefined) {
    throw new Error(resData.data.error_message);
  }

  return resData;
};

export const fetchPOST = async (url, postData) => {
  console.log(`URL ===>${url}`);
  console.log(`POST DATA ===> ${JSON.stringify(postData)}`);

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
    body: JSON.stringify(postData),
  });

  if (!response.ok) {
    if (response.status === 500) {
      throw new Error('Internal Server Error');
    }

    if (response.status === 401) {
      throw new Error('Unauthorized Access');
    }
    if (response.status === 422) {
      console.log(response);
      throw new Error('Validation Error');
    }
  }

  const resData = await response.json();
  console.log(`RESPONSE DATA ===> ${JSON.stringify(resData)}`);

  if (resData.data.error_code !== undefined) {
    throw new Error(resData.data.error_message);
  }

  return resData;
};

export const fetchPUT = async (url, postData) => {
  console.log(`URL ===>${url}`);
  console.log(`POST DATA ===> ${JSON.stringify(postData)}`);

  // any async code you want!
  const bearer = localStorage.getItem(KEY_TOKEN);
  const token = `Bearer ${bearer}`;

  const response = await fetch(url, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      Authorization: token,
    },
    body: JSON.stringify(postData),
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

  return resData;
};

export const uploadFile = async (url, data) => {
  const token = localStorage.getItem(KEY_TOKEN);

  const response = await fetch(url, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body: data,
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

  if (resData.data.error_code !== undefined) {
    throw new Error(resData.data.error_message);
  }

  return resData;
};
