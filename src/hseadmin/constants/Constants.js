export const TYPE_SYSTEM_ADMIN = 1;
export const TYPE_COMPANY_OWNER = 2;
export const TYPE_DIVISION_OWNER = 3;
export const TYPE_JOB_SITE_OWNER = 4;
export const TYPE_EMPLOYEE = 5;

export const KEY_TOKEN = 'token';
export const KEY_TYPE_ID = 'type_id';
export const KEY_COMPANY_ID = 'company_id';
export const KEY_DIVISION_ID = 'division_id';
export const KEY_EMPLOYEE_ID = 'employee_id';

export const KEY_DIVISIONS = 'divisions';
export const KEY_JOB_SITES = 'job_sites';

export const COUNTRY_ID_USA = 231;

export const PAY_ROLL_DATA = [
  { id: 1, name: 'Active' },
  { id: 0, name: 'Inactive' },
];

export const STATUSES_DATA = [
  { id: 1, name: 'Active' },
  { id: 2, name: 'Inactive' },
  { id: 3, name: 'Deleted' },
];

export const YES_NO_DATA = [
  { id: 1, name: 'Yes' },
  { id: 0, name: 'No' },
];

export const GENDER_DATA = [
  { id: 'male', name: 'Male' },
  { id: 'female', name: 'Female' },
];

export const LOGIN_TYPE_DATA = [
  { id: 1, name: 'System Administrator' },
  { id: 2, name: 'Company Administrator' },
  { id: 3, name: 'Division Administrator' },
  { id: 4, name: 'Supervisor' },
  { id: 5, name: 'User' },
];

export const USER_ROLLS_DATA = [
  { id: 2, name: 'Company Administrator' },
  { id: 3, name: 'Division Administrator' },
  { id: 4, name: 'Supervisor' },
  { id: 5, name: 'User' },
];

export const USER_STATUSES = [
  { id: 1, name: 'Active' },
  { id: 2, name: 'Inactive' },
  { id: 3, name: 'Deleted' },
];

export const DATA_ANSWERS = [
  {
    key: 1,
    name: 'ADEQUATE',
    label: 'ADEQUATE',
    value: '1',
    correct_value: '1',
  },
  {
    key: 2,
    name: 'DEFICIENT',
    label: 'DEFICIENT',
    value: '1',
    correct_value: '1',
  },
  {
    key: 3,
    name: 'N/A',
    label: 'N/A',
    value: '1',
    correct_value: '1',
  },
];

export const DATA_QUESTION_TYPES = [
  { value: 'radio', label: 'Radio' },
  // { value: 'checkbox', label: 'Checkbox' },
  // { value: 'text', label: 'Text' },
];

export const DATA_INJURY_ITEMS = [
  { id: 1, name: 'Fatility' },
  { id: 2, name: 'Lost Time' },
  { id: 3, name: 'Restricted Duty' },
  { id: 4, name: 'Other Recordable' },
];

export const ALCOHOL_DRUG_STATUSES = [
  { id: 1, name: 'Pending' },
  { id: 2, name: 'Completed' },
];

export const INCIDENT_TYPE_INJURY_ILLNESS = 1;
export const INCIDENT_TYPE_VEHICLE_MOVING = 2;
export const INCIDENT_TYPE_VEHICLE_MOVING_INJURY_ILLNESS = 3;
export const INCIDENT_TYPE_PROPERTY_DAMAGE = 4;
export const INCIDENT_TYPE_ENVIRONMENTAL = 5;
export const INCIDENT_TYPE_COMPLIANCE = 6;
export const INCIDENT_TYPE = 7;
export const INCIDENT_TYPE_PROPERTY_DAMAGE_VEHICLE_NON_MOVING = 8;
