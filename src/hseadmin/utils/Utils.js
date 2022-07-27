import moment from 'moment';

export const toServerDateTime = (date) => {
  const dt = new Date(date);
  const dt1 = moment(dt).utcOffset(0, false).format('YYYY-MM-DDTHH:mm:ss');

  return dt1;
};

export const toLocalDateTime = (date) => {
  const dt = new Date(date);

  const dt1 = moment(dt).format('YYYY-MM-DDTHH:mm:ss');

  return dt1;
};

export const toLocalDateTimeWithoutSecond = (date) => {
  const dt = new Date(date);

  const dt1 = moment(dt).format('YYYY-MM-DDTHH:mm');

  return dt1;
};

export const toServerDate = (date) => {
  const dt = new Date(date);
  const dt1 = moment(dt).utcOffset(0, false).format('YYYY-MM-DD');

  return dt1;
};

export const toLocalDate = (date) => {
  const dt = new Date(date);

  const dt1 = moment(dt).format('YYYY-MM-DD');

  return dt1;
};

export const toMMMDDYYHHMM = (date) => {
  if (date) {
    const dt = new Date(date);

    const dt1 = moment(dt).format('MMM-DD-YY hh:mm');

    return dt1;
  }
  return '';
};

export const toMMMDDYYYYHHMM = (date) => {
  if (date) {
    const dt = new Date(date);

    const dt1 = moment(dt).format('MMM-DD-YYYY hh:mm');

    return dt1;
  }
  return '';
};

export const toMMMDDYY = (date) => {
  if (date) {
    const dt = new Date(date);

    const dt1 = moment(dt).format('MMM DD, YY');

    return dt1;
  }
  return '';
};

export const toMMDDYYYY = (date) => {
  if (date) {
    const dt = new Date(date);

    const dt1 = moment(dt).format('MM/DD/YYYY');

    return dt1;
  }
  return '';
};

export const toMMDDYYYYHHMMDisplay = (date) => {
  if (date) {
    const dt = new Date(date);

    const dt1 = moment(dt).format('MM/DD/YYYY hh:mm A');

    return dt1;
  }
  return '';
};

export const getCurrentDateTime = () => {
  const now = new Date();
  now.setMinutes(now.getMinutes() - now.getTimezoneOffset());
  const dt = now.toISOString().slice(0, 16);
  return dt;
};

export const getCurrentDate = () => {
  const now = new Date();
  now.setMinutes(now.getMinutes() - now.getTimezoneOffset());
  const dt = now.toISOString().slice(0, 10);
  return dt;
};
