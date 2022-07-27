/* eslint-disable jsx-a11y/control-has-associated-label */
import React from 'react';
import CustomPhoneNumberView from './CustomPhoneNumberView';
import SmallBox from './SmallBox';

const CustomDivisionProfile = ({ item }) => {
  console.log(`------------${JSON.stringify(item)}`);
  return (
    <div className="container">
      <div className="main-body">
        <div className="row gutters-sm">
          <div className="col-md-4 mb-3">
            <div className="card">
              <div className="card-body">
                {/* <div className="d-flex flex-column align-items-center text-center"> */}
                {/* </div> */}
              </div>
            </div>
            <div className="card mt-3">
              <ul className="list-group list-group-flush">
                <li className="list-group-item d-flex justify-content-between align-items-center flex-wrap">
                  <h6 className="mb-0">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="feather feather-globe mr-2 icon-inline"
                    >
                      <circle cx="12" cy="12" r="10" />
                      <line x1="2" y1="12" x2="22" y2="12" />
                      <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
                    </svg>
                    Name
                  </h6>
                  <span className="text-secondary">{item.name}</span>
                </li>
                <li className="list-group-item d-flex justify-content-between align-items-center flex-wrap">
                  <h6 className="mb-0">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="feather feather-github mr-2 icon-inline"
                    >
                      <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
                    </svg>
                    Company
                  </h6>
                  <span className="text-secondary">{item.company_id}</span>
                </li>
                <li className="list-group-item d-flex justify-content-between align-items-center flex-wrap">
                  <h6 className="mb-0">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="feather feather-globe mr-2 icon-inline"
                    >
                      <circle cx="12" cy="12" r="10" />
                      <line x1="2" y1="12" x2="22" y2="12" />
                      <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
                    </svg>
                    Address
                  </h6>
                  <span className="text-secondary">{item.address_id}</span>
                </li>
                <li className="list-group-item d-flex justify-content-between align-items-center flex-wrap">
                  <h6 className="mb-0">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="feather feather-globe mr-2 icon-inline"
                    >
                      <circle cx="12" cy="12" r="10" />
                      <line x1="2" y1="12" x2="22" y2="12" />
                      <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
                    </svg>
                    Head Office
                  </h6>
                  <span className="text-secondary">{item.head_office}</span>
                </li>
              </ul>
            </div>
          </div>
          <div className="col-md-8">
            <div className="card mb-3">
              <div className="card-body">
                <div className="row">
                  <div className="col-sm-3">
                    <h6 className="mb-0">Status</h6>
                  </div>
                  <div className="col-sm-9 text-secondary">
                    {item.status_id}
                  </div>
                </div>
                <hr />
                <div className="row">
                  <div className="col-sm-3">
                    <h6 className="mb-0">Landline</h6>
                  </div>
                  <div className="col-sm-9 text-secondary">
                    <a href={`tel://${item.landline}`}>
                      <CustomPhoneNumberView value={item.landline} />
                    </a>
                  </div>
                </div>
                <hr />
                <div className="row">
                  <div className="col-sm-3">
                    <h6 className="mb-0">Fax</h6>
                  </div>
                  <div className="col-sm-9 text-secondary">
                    <a href={`tel://${item.fax}`}>
                      <CustomPhoneNumberView value={item.fax} />
                    </a>
                  </div>
                </div>
                <hr />
                <div className="row">
                  <div className="col-sm-3">
                    <h6 className="mb-0">Mobile</h6>
                  </div>
                  <div className="col-sm-9 text-secondary">
                    <a href={`tel://${item.mobile}`}>
                      <CustomPhoneNumberView value={item.mobile} />
                    </a>
                  </div>
                </div>
                <hr />
              </div>
            </div>

            <div className="row" style={{ marginTop: '10px' }}>
              {/* <div className="col-lg-3 col-6"> */}
              {/*  <SmallBox */}
              {/*    type="info" */}
              {/*    icon="ion-stats-bars" */}
              {/*    count={company !== null ? 10 : 0} */}
              {/*    title="Companies" */}
              {/*    navigateTo="/companies" */}
              {/*  /> */}
              {/* </div> */}
              <div className="col-lg-3 col-6">
                <SmallBox
                  type="success"
                  icon="ion-stats-bars"
                  count={item !== null ? item.employee_count : 0}
                  title="Employees"
                  navigateTo={`/companies/${item.id}/employees`}
                />
              </div>
              {/* <div className="col-lg-3 col-6"> */}
              {/*  <SmallBox */}
              {/*    type="warning" */}
              {/*    icon="ion-stats-bars" */}
              {/*    count={company !== null ? 10 : 0} */}
              {/*    title="Certificates" */}
              {/*    navigateTo="/certificates" */}
              {/*  /> */}
              {/* </div> */}
              <div className="col-lg-3 col-6">
                <SmallBox
                  type="danger"
                  icon="ion-stats-bars"
                  count={item !== null ? item.client_count : 0}
                  title="Clients"
                  navigateTo={`/private/companies/${item.id}/clients`}
                />
              </div>
              <div className="col-lg-3 col-6">
                <SmallBox
                  type="info"
                  icon="ion-stats-bars"
                  count={item !== null ? item.job_site_count : 0}
                  title="Projects"
                  navigateTo={`/private/companies/${item.id}/job-sites`}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomDivisionProfile;
