import React, { useState, useEffect } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { Button, Grid, Typography } from '@mui/material';
import { Col, Form, Row } from 'react-bootstrap';
import NumberFormat from 'react-number-format';
import Select from 'react-select';
import { CustomBreadcrumbs, CustomDivider } from '../../utils/MUIStyle';
import { fetchPOST } from '../../utils/NetworkUtils';
import URLConstants from '../../constants/URLConstants';
import { STATUSES_DATA } from '../../constants/Constants';

const NewContactPeople = () => {
  const [validated, setValidated] = useState(false);
  const history = useNavigate();

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [emailAddress, setEmailAddress] = useState('');
  const [landline, setLandline] = useState('');
  const [mobile, setMobile] = useState('');
  const [designationName, setDesignationName] = useState('');
  const [notes, setNotes] = useState('');
  const [statusId, setStatusId] = useState('');

  useEffect(() => {}, []);

  const onContactPeopleSubmit = (event) => {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }
    setValidated(true);
    event.preventDefault();

    const postData = {
      first_name: firstName,
      last_name: lastName,
      email_address: emailAddress,
      landline,
      mobile,
      designation_name: designationName,
      notes,
      status_id: statusId === -1 ? null : statusId,
    };
    postContactPeople(postData);
  };

  const postContactPeople = async (data) => {
    try {
      await fetchPOST(URLConstants.CONTACT_PEOPLES_URL, data);
      history('../../private/contact-peoples');
    } catch (error) {
      console.log(error);
    }
  };

  const onFirstNameChangeHandler = (event) => {
    // console.log(event.target.value);
    setFirstName(event.target.value);
  };
  const onLastNameChangeHandler = (event) => {
    console.log(event.target.value);
    setLastName(event.target.value);
  };
  const onEmailAddressChangeHandler = (event) => {
    console.log(event.target.value);
    setEmailAddress(event.target.value);
  };
  const onDesignationNameChangeHandler = (event) => {
    console.log(event.target.value);
    setDesignationName(event.target.value);
  };
  const onNotesChangeHandler = (event) => {
    console.log(event.target.value);
    setNotes(event.target.value);
  };
  const onStatusIdChangeHandler = (selectedOption) => {
    setStatusId(+selectedOption.value);
    console.log(selectedOption.value);
  };
  return (
    <>
      <Helmet title="Add Contact People" />

      <Grid justifyContent="space-between" container spacing={10}>
        <Grid item>
          <Typography variant="h3" gutterBottom display="inline">
            Contact People
          </Typography>

          <CustomBreadcrumbs aria-label="Breadcrumb" mt={2}>
            <Link component={NavLink} to="/">
              Dashboard
            </Link>
            <Link component={NavLink} to="/private/contact-peoples">
              Equipment
            </Link>
            <Typography>Add Contact Peoples</Typography>
          </CustomBreadcrumbs>
        </Grid>
        <Grid item>
          <div>
            <NavLink to="/private/contact-peoples">
              <Button variant="contained" color="primary">
                Back
              </Button>
            </NavLink>
          </div>
        </Grid>
      </Grid>

      <CustomDivider my={6} />
      <Grid container spacing={6}>
        <Grid item xs={12}>
          <Form
            noValidate
            validated={validated}
            onSubmit={onContactPeopleSubmit}
          >
            <Row>
              <Col md={6}>
                {/* First Name Field */}
                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Form.Label>First Name</Form.Label>
                  <Form.Control
                    required
                    type="text"
                    placeholder="First Name"
                    onChange={onFirstNameChangeHandler}
                  />
                  <Form.Control.Feedback type="invalid">
                    Please provide a valid Name.
                  </Form.Control.Feedback>
                </Form.Group>
              </Col>
              <Col md={6}>
                {/* Last Name */}
                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Form.Label>Last Name</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Last Name"
                    onChange={onLastNameChangeHandler}
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                {/* Email Address */}
                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Form.Label>Email Address</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Email Address"
                    onChange={onEmailAddressChangeHandler}
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                {/* Landline */}
                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Form.Label>Landline</Form.Label>
                  <NumberFormat
                    className="form-control"
                    format="(###) ###-####"
                    mask="_"
                    placeholder="Landline"
                    onValueChange={(value) => {
                      console.log(value.value);
                      setLandline(value.value);
                    }}
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                {/* Mobile */}
                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Form.Label>Mobile</Form.Label>
                  <NumberFormat
                    className="form-control"
                    format="(###) ###-####"
                    mask="_"
                    placeholder="Mobile"
                    onValueChange={(value) => {
                      console.log(value.value);
                      setMobile(value.value);
                    }}
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                {/* Designation Name */}
                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Form.Label>Description Name</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Description Name"
                    onChange={onDesignationNameChangeHandler}
                    value={designationName}
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                {/* Notes */}
                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Form.Label>Notes</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Notes"
                    onChange={onNotesChangeHandler}
                    value={notes}
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Form.Label>Status</Form.Label>
                  <Select
                    required
                    options={STATUSES_DATA.map((status) => {
                      return { value: status.id, label: status.name };
                    })}
                    onChange={onStatusIdChangeHandler}
                  />
                  <Form.Control.Feedback type="invalid">
                    Please provide a valid User Status.
                  </Form.Control.Feedback>
                </Form.Group>
              </Col>
            </Row>
            <Button variant="contained" type="submit" color="primary">
              Submit
            </Button>
          </Form>
        </Grid>
      </Grid>
    </>
  );
};
export default NewContactPeople;
