import React, { useEffect, useState } from 'react';
import { Link, NavLink, useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Col, Form, Row } from 'react-bootstrap';
import { Helmet } from 'react-helmet-async';
import { Button, Grid, Typography } from '@mui/material';
import NumberFormat from 'react-number-format';
import Select from 'react-select';
import URLConstants from '../../constants/URLConstants';
import { fetchGET, fetchPUT } from '../../utils/NetworkUtils';
import { CustomBreadcrumbs, CustomDivider } from '../../utils/MUIStyle';
import { USER_STATUSES } from '../../constants/Constants';

const EditContactPeople = () => {
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
  const [statusOptions, setStatusOptions] = useState([]);

  const [contactPeople, setContactPeople] = useState(null);

  const { id } = useParams();
  const params = useParams();
  useEffect(() => {
    if (contactPeople != null) {
      setFirstName(contactPeople.first_name);
      setLastName(contactPeople.last_night);
      setEmailAddress(contactPeople.email_address);
      setLandline(contactPeople.landline);
      setMobile(contactPeople.mobile);
      setDesignationName(contactPeople.designation_name);
      setNotes(contactPeople.notes);
      setStatusId(contactPeople.status_id);
      setStatusOptions({
        value: contactPeople.user_status_id,
        label: contactPeople.user_status.name,
      });
    }
  }, [contactPeople]);

  useEffect(() => {
    console.log(`param is ${params.id}`);
    loadContactPeople();
  }, []);

  const loadContactPeople = async () => {
    try {
      const url = `${URLConstants.GET_CONTACT_PEOPLE_URL}/${id}.json`;

      console.log('getContactPeople url =', url);

      const response = await fetchGET(url);

      console.log('getContactPeople -->', response.data);

      setContactPeople(response.data);
    } catch (error) {
      toast(error.message || 'Failed');
    }
  };

  const onContactPeopleSubmit = (event) => {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }
    setValidated(true);
    event.preventDefault();
    // @ts-ignore
    const postData = {
      id,
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
      const url = `${URLConstants.GET_CONTACT_PEOPLE_URL}/${id}.json`;

      await fetchPUT(url, data);

      history('../../private/contact-peoples');
    } catch (error) {
      toast(error.message || 'Failed');
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
      <Helmet title="Edit Contact People" />

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
              Contact People
            </Link>
            <Typography>Edit Contact People</Typography>
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
          {contactPeople && (
            <Form
              noValidate
              validated={validated}
              onSubmit={onContactPeopleSubmit}
            >
              {/* Name Field */}
              <Row>
                <Col md={6}>
                  <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>First Name</Form.Label>
                    <Form.Control
                      required
                      type="text"
                      placeholder="First Name"
                      onChange={onFirstNameChangeHandler}
                      value={firstName}
                    />
                    <Form.Control.Feedback type="invalid">
                      Please provide a valid name.
                    </Form.Control.Feedback>
                  </Form.Group>
                </Col>
                <Col md={6}>
                  <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Last Name</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Last Name"
                      onChange={onLastNameChangeHandler}
                      value={lastName}
                    />
                  </Form.Group>
                </Col>
                {/* Email Address */}
                <Col md={6}>
                  <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Email Address</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Email Address"
                      onChange={onEmailAddressChangeHandler}
                      value={emailAddress}
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
                      value={landline}
                    />
                  </Form.Group>
                </Col>
                <Col md={6}>
                  {/* mobile */}
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
                      value={mobile}
                    />
                  </Form.Group>
                </Col>
                <Col md={6}>
                  <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Designation Name</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Designation Name"
                      onChange={onDesignationNameChangeHandler}
                      value={designationName}
                    />
                  </Form.Group>
                </Col>
                <Col md={6}>
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
                {/* Status id */}
                <Col md={6}>
                  <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Status</Form.Label>
                    <Select
                      required
                      options={USER_STATUSES.map((user) => {
                        return { value: user.id, label: user.name };
                      })}
                      value={statusOptions}
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
          )}
        </Grid>
      </Grid>
    </>
  );
};
export default EditContactPeople;
