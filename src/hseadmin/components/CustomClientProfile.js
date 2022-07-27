/* eslint-disable jsx-a11y/control-has-associated-label */
import React from 'react';
import {
  CardContent,
  Card as MuiCard,
  Grid as MuiGrid,
  Typography as MuiTypography,
} from '@mui/material';
import styled from '@emotion/styled';
import { spacing } from '@mui/system';
// import SmallBox from './SmallBox';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBuilding } from '@fortawesome/free-regular-svg-icons';
import CustomPhoneNumberView from './CustomPhoneNumberView';

const Spacer = styled.div(spacing);

const Typography = styled(MuiTypography)(spacing);

const Grid = styled(MuiGrid)(spacing);

const Card = styled(MuiCard)(spacing);

const CustomCompanyProfile = ({ item }) => {
  console.log(`------------${JSON.stringify(item)}`);
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
                    {item.primary_logo !== null ? (
                      <img
                        width={150}
                        // className="img-circle elevation-2"
                        src={item.primary_logo.url}
                        alt="User Avatar"
                        style={{}}
                      />
                    ) : (
                      // <i className="fas fa-building fa-4x" />
                      <FontAwesomeIcon icon={faBuilding} size="4x" />
                    )}
                    <div className="mt-3">
                      <h4>{item.name}</h4>
                      <p className="text-secondary mb-1">{item.website_url}</p>
                      <p className="text-muted font-size-sm">
                        {item.email_address}
                      </p>
                    </div>
                  </div>
                </div>
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
                    Website
                  </h6>
                  <span className="text-secondary">{item.website_url}</span>
                </li>
                {/* <li className="list-group-item d-flex justify-content-between align-items-center flex-wrap"> */}
                {/*  <h6 className="mb-0"> */}
                {/*    <svg */}
                {/*      xmlns="http://www.w3.org/2000/svg" */}
                {/*      width="24" */}
                {/*      height="24" */}
                {/*      viewBox="0 0 24 24" */}
                {/*      fill="none" */}
                {/*      stroke="currentColor" */}
                {/*      strokeWidth="2" */}
                {/*      strokeLinecap="round" */}
                {/*      strokeLinejoin="round" */}
                {/*      className="feather feather-github mr-2 icon-inline" */}
                {/*    > */}
                {/*      <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" /> */}
                {/*    </svg> */}
                {/*    About Us */}
                {/*  </h6> */}
                {/*  <span className="text-secondary">{item.about_us_url}</span> */}
                {/* </li> */}
                {/* <li className="list-group-item d-flex justify-content-between align-items-center flex-wrap"> */}
                {/*  <h6 className="mb-0"> */}
                {/*    <svg */}
                {/*      xmlns="http://www.w3.org/2000/svg" */}
                {/*      width="24" */}
                {/*      height="24" */}
                {/*      viewBox="0 0 24 24" */}
                {/*      fill="none" */}
                {/*      stroke="currentColor" */}
                {/*      strokeWidth="2" */}
                {/*      strokeLinecap="round" */}
                {/*      strokeLinejoin="round" */}
                {/*      className="feather feather-globe mr-2 icon-inline" */}
                {/*    > */}
                {/*      <circle cx="12" cy="12" r="10" /> */}
                {/*      <line x1="2" y1="12" x2="22" y2="12" /> */}
                {/*      <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" /> */}
                {/*    </svg> */}
                {/*    Privacy Policy */}
                {/*  </h6> */}
                {/*  <span className="text-secondary"> */}
                {/*    {item.privacy_policy_url} */}
                {/*  </span> */}
                {/* </li> */}
                {/* <li className="list-group-item d-flex justify-content-between align-items-center flex-wrap"> */}
                {/*  <h6 className="mb-0"> */}
                {/*    <svg */}
                {/*      xmlns="http://www.w3.org/2000/svg" */}
                {/*      width="24" */}
                {/*      height="24" */}
                {/*      viewBox="0 0 24 24" */}
                {/*      fill="none" */}
                {/*      stroke="currentColor" */}
                {/*      strokeWidth="2" */}
                {/*      strokeLinecap="round" */}
                {/*      strokeLinejoin="round" */}
                {/*      className="feather feather-globe mr-2 icon-inline" */}
                {/*    > */}
                {/*      <circle cx="12" cy="12" r="10" /> */}
                {/*      <line x1="2" y1="12" x2="22" y2="12" /> */}
                {/*      <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" /> */}
                {/*    </svg> */}
                {/*    Terms & Conditions */}
                {/*  </h6> */}
                {/*  <span className="text-secondary"> */}
                {/*    {item.terms_and_condition_url} */}
                {/*  </span> */}
                {/* </li> */}
              </ul>
            </div>
          </div>
          <div className="col-md-8">
            <div className="card mb-3">
              <div className="card-body">
                {/* <div className="row"> */}
                {/*  <div className="col-sm-3"> */}
                {/*    <h6 className="mb-0">Company</h6> */}
                {/*  </div> */}
                {/*  <div className="col-sm-9 text-secondary"> */}
                {/*    {item.company.name} */}
                {/*  </div> */}
                {/* </div> */}
                {/* <hr /> */}
                <div className="row">
                  <div className="col-sm-3">
                    <h6 className="mb-0">Description</h6>
                  </div>
                  <div className="col-sm-9 text-secondary">
                    {item.long_desc}
                  </div>
                </div>
                <hr />
                {/* <div className="row"> */}
                {/*  <div className="col-sm-3"> */}
                {/*    <h6 className="mb-0">Office</h6> */}
                {/*  </div> */}
                {/*  <div className="col-sm-9 text-secondary"> */}
                {/*    <a href={`tel://${item.landline}`}> */}
                {/*      <CustomPhoneNumberView value={item.landline} /> */}
                {/*    </a> */}
                {/*  </div> */}
                {/* </div> */}
                {/* <hr /> */}
                <div className="row">
                  <div className="col-sm-3">
                    <h6 className="mb-0">Main Phone</h6>
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
                    <h6 className="mb-0">Main Fax</h6>
                  </div>
                  <div className="col-sm-9 text-secondary">
                    <a href={`tel://${item.fax}`}>
                      <CustomPhoneNumberView value={item.fax} />
                    </a>
                  </div>
                </div>
                <hr />
                {/* Address Details */}

                {item.primary_address && (
                  <>
                    <div className="row">
                      <div className="col-sm-3">
                        <h6 className="mb-0">Address 1</h6>
                      </div>
                      <div className="col-sm-9 text-secondary">
                        {item.primary_address.address1}
                      </div>
                    </div>
                    <hr />
                    <div className="row">
                      <div className="col-sm-3">
                        <h6 className="mb-0">Address 2</h6>
                      </div>
                      <div className="col-sm-9 text-secondary">
                        {item.primary_address.address2}
                      </div>
                    </div>
                    <hr />
                    <div className="row">
                      <div className="col-sm-3">
                        <h6 className="mb-0">State</h6>
                      </div>

                      <div className="col-sm-9 text-secondary">
                        {item.primary_address.state
                          ? item.primary_address.state.name
                          : ''}
                      </div>
                    </div>
                    <hr />
                    <div className="row">
                      <div className="col-sm-3">
                        <h6 className="mb-0">City</h6>
                      </div>
                      <div className="col-sm-9 text-secondary">
                        {item.primary_address.city
                          ? item.primary_address.city.name
                          : ''}
                      </div>
                    </div>
                    <hr />
                    <div className="row">
                      <div className="col-sm-3">
                        <h6 className="mb-0">Zip</h6>
                      </div>
                      <div className="col-sm-9 text-secondary">
                        {item.primary_address.zipcode}
                      </div>
                    </div>
                  </>
                )}
              </div>
            </div>
            <div className="row">
              {item.primary_contact && (
                <div className="col-md-6">
                  <Card mb={4}>
                    <CardContent>
                      <Typography variant="h6" gutterBottom>
                        Primary Contact
                      </Typography>

                      <Spacer mb={4} />
                      <hr />

                      <Grid container direction="row" mb={2}>
                        <Grid item xs={4}>
                          <span className="mb-0">First Name : </span>
                        </Grid>
                        <Grid item xs={8}>
                          <div className="text-secondary">
                            {item.primary_contact.first_name}
                          </div>
                        </Grid>
                      </Grid>
                      <Grid
                        container
                        direction="row"
                        alignItems="center"
                        mb={2}
                      >
                        <Grid item xs={4}>
                          <span className="mb-0">Last Name : </span>
                        </Grid>
                        <Grid item xs={8}>
                          <div className="text-secondary">
                            {item.primary_contact.last_name}
                          </div>
                        </Grid>
                      </Grid>
                      <Grid
                        container
                        direction="row"
                        alignItems="center"
                        mb={2}
                      >
                        <Grid item xs={4}>
                          <span className="mb-0">Email : </span>
                        </Grid>
                        <Grid item xs={8}>
                          <div className="text-secondary">
                            <a
                              href={`mailto:${item.primary_contact.email_address}`}
                            >
                              {item.primary_contact.email_address}
                            </a>
                          </div>
                        </Grid>
                      </Grid>
                      <Grid
                        container
                        direction="row"
                        alignItems="center"
                        mb={2}
                      >
                        <Grid item xs={4}>
                          <span className="mb-0">Mobile : </span>
                        </Grid>
                        <Grid item xs={8}>
                          <div className="text-secondary">
                            <a href={`tel://${item.primary_contact.mobile}`}>
                              <CustomPhoneNumberView
                                value={item.primary_contact.mobile}
                              />
                            </a>
                          </div>
                        </Grid>
                      </Grid>
                      <Grid
                        container
                        direction="row"
                        alignItems="center"
                        mb={2}
                      >
                        <Grid item xs={4}>
                          <span className="mb-0">Title : </span>
                        </Grid>
                        <Grid item xs={8}>
                          <div className="text-secondary">
                            {item.primary_contact.designation_name}
                          </div>
                        </Grid>
                      </Grid>
                    </CardContent>
                  </Card>
                </div>
              )}
              {item.alternate_contact && (
                <div className="col-md-6">
                  <Card mb={4}>
                    <CardContent>
                      <Typography variant="h6" gutterBottom>
                        Alternate Contact Detail
                      </Typography>

                      <Spacer mb={4} />
                      <hr />

                      <Grid container direction="row" mb={2}>
                        <Grid item xs={4}>
                          <span className="mb-0">First Name : </span>
                        </Grid>
                        <Grid item xs={8}>
                          <div className="text-secondary">
                            {item.alternate_contact.first_name}
                          </div>
                        </Grid>
                      </Grid>
                      <Grid
                        container
                        direction="row"
                        alignItems="center"
                        mb={2}
                      >
                        <Grid item xs={4}>
                          <span className="mb-0">Last Name : </span>
                        </Grid>
                        <Grid item xs={8}>
                          <div className="text-secondary">
                            {item.alternate_contact.last_name}
                          </div>
                        </Grid>
                      </Grid>
                      <Grid
                        container
                        direction="row"
                        alignItems="center"
                        mb={2}
                      >
                        <Grid item xs={4}>
                          <span className="mb-0">Email : </span>
                        </Grid>
                        <Grid item xs={8}>
                          <div className="text-secondary">
                            <a
                              href={`mailto:${item.alternate_contact.email_address}`}
                            >
                              {item.alternate_contact.email_address}
                            </a>
                          </div>
                        </Grid>
                      </Grid>
                      <Grid
                        container
                        direction="row"
                        alignItems="center"
                        mb={2}
                      >
                        <Grid item xs={4}>
                          <span className="mb-0">Mobile : </span>
                        </Grid>
                        <Grid item xs={8}>
                          <div className="text-secondary">
                            <a href={`tel://${item.alternate_contact.mobile}`}>
                              <CustomPhoneNumberView
                                value={item.alternate_contact.mobile}
                              />
                            </a>
                          </div>
                        </Grid>
                      </Grid>
                      <Grid
                        container
                        direction="row"
                        alignItems="center"
                        mb={2}
                      >
                        <Grid item xs={4}>
                          <span className="mb-0">Title : </span>
                        </Grid>
                        <Grid item xs={8}>
                          <div className="text-secondary">
                            {item.alternate_contact.designation_name}
                          </div>
                        </Grid>
                      </Grid>
                    </CardContent>
                  </Card>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomCompanyProfile;
