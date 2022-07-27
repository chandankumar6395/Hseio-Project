/* eslint-disable jsx-a11y/control-has-associated-label */
import React from 'react';
import CustomPhoneNumberView from './CustomPhoneNumberView';
import { STATUSES_DATA, YES_NO_DATA } from '../constants/Constants';
import { toMMDDYYYY } from '../utils/Utils';
// import SmallBox from './SmallBox';

const CustomCompanyProfile = ({ item }) => {
  console.log(`------------${JSON.stringify(item)}`);

  const renderListGroup = (icon, title, value) => {
    return (
      <li className="list-group-item d-flex justify-content-between align-items-center flex-wrap">
        <h6 className="mb-0">
          <i className={`fa ${icon} fa-flip-horizontal`} /> {` ${title}`}
        </h6>
        <span className="text-secondary">{value}</span>
      </li>
    );
  };

  return (
    <div className="container">
      <div className="main-body">
        {/* <nav aria-label="breadcrumb" className="main-breadcrumb"> */}
        {/*  <ol className="breadcrumb"> */}
        {/*    <li className="breadcrumb-item"> */}
        {/*      <a href="index.html">Home</a> */}
        {/*    </li> */}
        {/*    <li className="breadcrumb-item"> */}
        {/*      <a href="index.html">User</a> */}
        {/*    </li> */}
        {/*    <li className="breadcrumb-item active" aria-current="page"> */}
        {/*      User Profile */}
        {/*    </li> */}
        {/*  </ol> */}
        {/* </nav> */}

        <div className="row gutters-sm">
          <div className="col-md-4 mb-3">
            <div className="card">
              <div className="card-body">
                <div className="d-flex flex-column align-items-center text-center">
                  <div className="widget-user-image">
                    <img
                      width={75}
                      height={75}
                      className="img-circle elevation-2"
                      src={
                        item.primary_photo !== null
                          ? item.primary_photo.url
                          : '/img/default-profile.png'
                      }
                      alt="User Avatar"
                      style={{}}
                    />

                    {/* <div className="mt-3"> */}
                    {/*  <h4> */}
                    {/*    {`${item.user.first_name} ${item.user.last_name}`} */}
                    {/*  </h4> */}
                    {/*  <p className="text-secondary mb-1">{item.user.email}</p> */}
                    {/*  <p className="text-muted font-size-sm"> */}
                    {/*    {item.designation !== null ? item.designation.name : ''} */}
                    {/*  </p> */}
                    {/* </div> */}
                  </div>
                </div>
              </div>
            </div>
            <div className="card mt-3">
              <ul className="list-group list-group-flush">
                {/* {renderListGroup( */}
                {/*  'fa-envelope', */}
                {/*  'Official E-mail', */}
                {/*  item.official_email_address */}
                {/* )} */}
                {/* {renderListGroup( */}
                {/*  'fa-phone', */}
                {/*  'Company Phone', */}
                {/*  <a href={`tel://${item.official_mobile_number}`}> */}
                {/*    <CustomPhoneNumberView */}
                {/*      value={item.official_mobile_number} */}
                {/*    /> */}
                {/*  </a> */}
                {/* )} */}
                {renderListGroup(
                  'fa-envelope',
                  'Personal E-mail',
                  item.personal_email_address
                )}
                {renderListGroup(
                  'fa-phone',
                  'Phone',
                  <a href={`tel://${item.personal_mobile_number}`}>
                    <CustomPhoneNumberView
                      value={item.personal_mobile_number}
                    />
                  </a>
                )}
                {renderListGroup(
                  'fa-receipt',
                  'Employee Status',
                  STATUSES_DATA.find((x) => x.id === item.employee_status_id)
                    .name
                )}
                {/* {renderListGroup( */}
                {/*  'fa-receipt', */}
                {/*  'On Payroll', */}
                {/*  PAY_ROLL_DATA.find((x) => x.id === item.on_payroll).name */}
                {/* )} */}
                {renderListGroup(
                  'fa-receipt',
                  'CDL',
                  YES_NO_DATA.find((x) => x.id === item.cdl).name
                )}
                {item.cdl === 1 &&
                  renderListGroup(
                    'fa-receipt',
                    'Medical Card',
                    YES_NO_DATA.find((x) => x.id === item.medical_card).name
                  )}
                {item.cdl === 1 &&
                  renderListGroup(
                    'fa-receipt',
                    'Random Pool',
                    YES_NO_DATA.find((x) => x.id === item.random_pool).name
                  )}
                {/* {renderListGroup( */}
                {/*  'fa-receipt', */}
                {/*  'Program Level ', */}
                {/*  LOGIN_TYPE_DATA.find((x) => x.id === item.type).name */}
                {/* )} */}
              </ul>
            </div>
          </div>
          <div className="col-md-8">
            <div className="card mb-3">
              <div className="card-body">
                <div className="row">
                  <div className="col-sm-3">
                    <h6 className="mb-0">Company</h6>
                  </div>
                  <div className="col-sm-9 text-secondary">
                    {item.company.name}
                  </div>
                </div>
                <hr />
                {/* <div className="row"> */}
                {/*  <div className="col-sm-3"> */}
                {/*    <h6 className="mb-0">Region</h6> */}
                {/*  </div> */}
                {/*  <div className="col-sm-9 text-secondary">{item.region}</div> */}
                {/* </div> */}
                {/* <hr /> */}

                {/* <div className="row"> */}
                {/*  <div className="col-sm-3"> */}
                {/*    <h6 className="mb-0">SSN</h6> */}
                {/*  </div> */}
                {/*  <div className="col-sm-9 text-secondary">{item.ssn}</div> */}
                {/* </div> */}
                {/* <hr /> */}
                <div className="row">
                  <div className="col-sm-3">
                    <h6 className="mb-0">Division</h6>
                  </div>
                  <div className="col-sm-9 text-secondary">
                    {item.primary_division !== null
                      ? item.primary_division.name
                      : ''}
                  </div>
                </div>
                <hr />
                <div className="row">
                  <div className="col-sm-3">
                    <h6 className="mb-0">DOH</h6>
                  </div>
                  <div className="col-sm-9 text-secondary">
                    {toMMDDYYYY(item.joining_date)}
                  </div>
                </div>
                <hr />
                {/* <div className="row"> */}
                {/*  <div className="col-sm-3"> */}
                {/*    <h6 className="mb-0">Position/Title</h6> */}
                {/*  </div> */}
                {/*  <div className="col-sm-9 text-secondary"> */}
                {/*    {item.designation !== null ? item.designation.name : ''} */}
                {/*  </div> */}
                {/* </div> */}
                {/* <div className="row"> */}
                {/*  <div className="col-sm-3"> */}
                {/*    <h6 className="mb-0">Start Date</h6> */}
                {/*  </div> */}
                {/*  <div className="col-sm-9 text-secondary"> */}
                {/*    {toMMMDDYYHHMM(item.contractor_start_date)} */}
                {/*  </div> */}
                {/* </div> */}
                {/* <hr /> */}
                {/* <div className="row"> */}
                {/*  <div className="col-sm-3"> */}
                {/*    <h6 className="mb-0">End Date</h6> */}
                {/*  </div> */}
                {/*  <div className="col-sm-9 text-secondary"> */}
                {/*    {toMMMDDYYHHMM(item.contractor_end_date)} */}
                {/*  </div> */}
                {/* </div> */}
                {/* <hr /> */}
                {item.primary_address && (
                  <>
                    {/* <div className="row"> */}
                    {/*  <div className="col-sm-3"> */}
                    {/*    <h6 className="mb-0">Address 1</h6> */}
                    {/*  </div> */}
                    {/*  <div className="col-sm-9 text-secondary"> */}
                    {/*    {item.primary_address.address1} */}
                    {/*  </div> */}
                    {/* </div> */}
                    {/* <hr /> */}
                    {/* <div className="row"> */}
                    {/*  <div className="col-sm-3"> */}
                    {/*    <h6 className="mb-0">Address 2</h6> */}
                    {/*  </div> */}
                    {/*  <div className="col-sm-9 text-secondary"> */}
                    {/*    {item.primary_address.address2} */}
                    {/*  </div> */}
                    {/* </div> */}
                    {/* <hr /> */}
                    {/* <div className="row"> */}
                    {/*  <div className="col-sm-3"> */}
                    {/*    <h6 className="mb-0">State</h6> */}
                    {/*  </div> */}
                    {/*  <div className="col-sm-9 text-secondary"> */}
                    {/*    {item.primary_address.state */}
                    {/*      ? item.primary_address.state.name */}
                    {/*      : ''} */}
                    {/*  </div> */}
                    {/* </div> */}
                    {/* <hr /> */}
                    {/* <div className="row"> */}
                    {/*  <div className="col-sm-3"> */}
                    {/*    <h6 className="mb-0">City</h6> */}
                    {/*  </div> */}
                    {/*  <div className="col-sm-9 text-secondary"> */}
                    {/*    {item.primary_address.city */}
                    {/*      ? item.primary_address.city.name */}
                    {/*      : ''} */}
                    {/*  </div> */}
                    {/* </div> */}
                    {/* <hr /> */}
                    {/* <div className="row"> */}
                    {/*  <div className="col-sm-3"> */}
                    {/*    <h6 className="mb-0">Zip</h6> */}
                    {/*  </div> */}
                    {/*  <div className="col-sm-9 text-secondary"> */}
                    {/*    <div className="col-sm-9 text-secondary"> */}
                    {/*      {item.primary_address.zipcode} */}
                    {/*    </div> */}
                    {/*  </div> */}
                    {/* </div> */}
                    {/* <hr /> */}
                    {/* <div className="row"> */}
                    {/*  <div className="col-sm-3"> */}
                    {/*    <h6 className="mb-0">DOB</h6> */}
                    {/*  </div> */}
                    {/*  <div className="col-sm-9 text-secondary"> */}
                    {/*    {toMMDDYYYY(item.date_of_birth)} */}
                    {/*  </div> */}
                    {/* </div> */}
                    {/* <hr /> */}
                    {/* <div className="row"> */}
                    {/*  <div className="col-sm-3"> */}
                    {/*    <h6 className="mb-0">SSN</h6> */}
                    {/*  </div> */}
                    {/*  <div className="col-sm-9 text-secondary">{item.ssn}</div> */}
                    {/* </div> */}
                    {/* <hr /> */}
                  </>
                )}
                <div className="row">
                  <div className="col-sm-3">
                    <h6 className="mb-0">Emergency Contact Name</h6>
                  </div>
                  <div className="col-sm-9 text-secondary">
                    {item.emergency_contact_name}
                  </div>
                </div>
                <hr />
                <div className="row">
                  <div className="col-sm-3">
                    <h6 className="mb-0">Emergency Contact Number</h6>
                  </div>
                  <div className="col-sm-9 text-secondary">
                    <a href={`tel://${item.emergency_contact_phone}`}>
                      <CustomPhoneNumberView
                        value={item.emergency_contact_phone}
                      />
                    </a>
                  </div>
                </div>
                <hr />
                {/* <div className="row"> */}
                {/*  <div className="col-sm-3"> */}
                {/*    <h6 className="mb-0">Driver License State</h6> */}
                {/*  </div> */}
                {/*  <div className="col-sm-9 text-secondary"> */}
                {/*    {item.driver_license_state !== null */}
                {/*      ? item.driver_license_state.name */}
                {/*      : ''} */}
                {/*  </div> */}
                {/* </div> */}
                {/* <hr /> */}
                {/* <div className="row"> */}
                {/*  <div className="col-sm-3"> */}
                {/*    <h6 className="mb-0">Driver License Number</h6> */}
                {/*  </div> */}
                {/*  <div className="col-sm-9 text-secondary"> */}
                {/*    {item.driver_license_number} */}
                {/*  </div> */}
                {/* </div> */}
                {/* <hr /> */}
                {/* <div className="row"> */}
                {/*  <div className="col-sm-3"> */}
                {/*    <h6 className="mb-0">Driver License Expiration</h6> */}
                {/*  </div> */}
                {/*  <div className="col-sm-9 text-secondary"> */}
                {/*    {toMMDDYYYY(item.driver_license_expiration)} */}
                {/*  </div> */}
                {/* </div> */}
                {/* <hr /> */}
                <div className="row">
                  <div className="col-sm-3">
                    <h6 className="mb-0">Designation</h6>
                  </div>
                  {item.designation && (
                    <div className="col-sm-9 text-secondary">
                      {item.designation.name}
                    </div>
                  )}
                </div>
              </div>
            </div>

            <div className="row" style={{ marginTop: '10px' }}>
              <div className="col-lg-3 col-6">
                {/* <SmallBox */}
                {/*  type="warning" */}
                {/*  icon="ion-stats-bars" */}
                {/*  count={item.certificate_count} */}
                {/*  title="Certificates" */}
                {/*  navigateTo="/private/certificates" */}
                {/* /> */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomCompanyProfile;
