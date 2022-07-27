import { Card, Col, Form, Row } from 'react-bootstrap';
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link, NavLink, useNavigate } from 'react-router-dom';
// import Select from 'react-select';
import { toast } from 'react-toastify';
import { Helmet } from 'react-helmet-async';
import { Button, Grid, Typography } from '@mui/material';
import NumberFormat from 'react-number-format';
import {
  COUNTRY_ID_USA,
  KEY_COMPANY_ID,
  // STATUSES_DATA,
  // YES_NO_DATA,
} from '../../constants/Constants';
import CompanySelect from '../../components/widgets/CompanySelect';
import StateSelect from '../../components/widgets/StateSelect';
import CitySelect from '../../components/widgets/CitySelect';
import ManagerSelect from '../../components/widgets/ManagerSelect';
import { addDivisions } from '../../store/actions/divisions';
import { CustomBreadcrumbs, CustomDivider } from '../../utils/MUIStyle';
import EmployeeSelect from '../../components/widgets/EmployeeSelect';

const NewDivisionMUI = () => {
  const localCompanyId = localStorage.getItem(KEY_COMPANY_ID);
  console.log(`localCompanyId =${localCompanyId}`);
  const [validated, setValidated] = useState(false);
  const history = useNavigate();

  const [name, setName] = useState('');
  const [companyId, setCompanyId] = useState(-1);
  const [address1, setAddress1] = useState('');
  const [address2, setAddress2] = useState('');
  const [zipcode, setZipcode] = useState('');
  const [landline, setLandline] = useState('');
  const [fax, setFax] = useState('');
  // const [headOffice, setHeadOffice] = useState('');
  // const [statusId, setStatusId] = useState('');

  const [cityId, setCityId] = useState(-1);
  const [stateId, setStateId] = useState(-1);
  const [countryId, setCountryId] = useState(-1);

  const [managers, setManagers] = useState([]);
  const [primaryContactId, setPrimaryContactId] = useState(null);
  const [alternateContactId, setAlternateContactId] = useState(null);

  const dispatch = useDispatch();

  useEffect(() => {
    setCountryId(COUNTRY_ID_USA);
  }, []);

  const onDivisionSubmit = (event) => {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }
    setValidated(true);
    event.preventDefault();
    if (name === '') {
      toast('Please Enter Name');
    } else {
      const postData = {
        name,
        company_id: localCompanyId !== null ? localCompanyId : companyId,
        address: {
          name: `${name}address`,
          address1: address1 === '' ? ' ' : address1,
          address2,
          city_id: cityId !== -1 ? cityId : null,
          state_id: stateId !== -1 ? stateId : null,
          country_id: countryId,
          zipcode,
        },
        landline,
        fax,
        head_office: 0,
        status_id: 1,
        managers,
        primary_contact_id: primaryContactId,
        alternate_contact_id: alternateContactId,
      };
      postDivision(postData);
    }
  };

  const postDivision = async (data) => {
    console.log('Post Data======>', data);
    try {
      await dispatch(addDivisions(data));
      history('../../private/divisions');
    } catch (error) {
      toast(error.message || 'Failed');
    }
  };

  const onNameChangeHandler = (event) => {
    // console.log(event.target.value);
    setName(event.target.value);
  };

  const onCompanyIdChangeHandler = (value) => {
    setCompanyId(value);
    console.log(`NewDivisions companyId${value}`);
  };

  const onAddress1ChangeHandler = (event) => {
    console.log(event.target.value);
    setAddress1(event.target.value);
  };
  const onAddress2ChangeHandler = (event) => {
    // console.log(event.target.value);
    setAddress2(event.target.value);
  };
  // const onHeadOfficeChangeHandler = (event) => {
  //   // console.log(event.target.value);
  //   setHeadOffice(event.target.value);
  // };
  // const onStatusIDChangeHandler = (selectedOption) => {
  //   // console.log(event.target.value);
  //   setStatusId(+selectedOption.value);
  //   console.log(statusId);
  // };
  //
  // const onHeadOfficeChangeHandler = (selectedOption) => {
  //   setHeadOffice(+selectedOption.value);
  //   // console.log(selectedOption.value);
  // };
  const onZipcodeChangeHandler = (event) => {
    // console.log(event.target.value);
    setZipcode(event.target.value);
  };

  const maxLengthCheck = (object) => {
    if (object.target.value.length > object.target.maxLength) {
      object.target.value = object.target.value.slice(
        0,
        object.target.maxLength
      );
    }
  };

  return (
    <>
      <Helmet title="Add Division" />

      <Grid justifyContent="space-between" container spacing={10}>
        <Grid item>
          <Typography variant="h3" gutterBottom display="inline">
            Divisions
          </Typography>

          <CustomBreadcrumbs aria-label="Breadcrumb" mt={2}>
            <Link component={NavLink} to="/">
              Dashboard
            </Link>
            <Link component={NavLink} to="/private/divisions">
              Divisions
            </Link>
            <Typography>Add Division</Typography>
          </CustomBreadcrumbs>
        </Grid>
        <Grid item>
          <div>
            <NavLink to="/private/divisions">
              <Button variant="contained" color="primary">
                Back
              </Button>
            </NavLink>
          </div>
        </Grid>
      </Grid>

      <CustomDivider my={6} />
      <Card>
        <Card.Body>
          <Card.Title style={{ marginBottom: '10px' }}>Basic Info</Card.Title>
          <br />
          <Card.Text>
            <Form noValidate validated={validated} onSubmit={onDivisionSubmit}>
              <Row>
                <Col md={6}>
                  {/* Name Field */}
                  <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Name *</Form.Label>
                    <Form.Control
                      required
                      type="text"
                      placeholder="Name *"
                      onChange={onNameChangeHandler}
                    />
                    <Form.Control.Feedback type="invalid">
                      Please provide a valid Name.
                    </Form.Control.Feedback>
                  </Form.Group>
                </Col>
                {/* Company id */}
                {localCompanyId === null && (
                  <Col md={6}>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                      <Form.Label>Company *</Form.Label>
                      <CompanySelect onChange={onCompanyIdChangeHandler} />
                    </Form.Group>
                  </Col>
                )}
                <Col md={6}>
                  {/* address id */}
                  <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Address 1</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Address 1"
                      onChange={onAddress1ChangeHandler}
                    />
                  </Form.Group>
                </Col>
                <Col md={6}>
                  <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Address 2</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Address 2"
                      onChange={onAddress2ChangeHandler}
                    />
                  </Form.Group>
                </Col>
                <Col md={6}>
                  <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Select State</Form.Label>
                    <StateSelect
                      onChange={(value) => setStateId(value)}
                      countryId={countryId}
                    />
                    <Form.Control.Feedback type="invalid">
                      Please provide a valid Company name.
                    </Form.Control.Feedback>
                  </Form.Group>
                </Col>

                <Col md={6}>
                  <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Select City</Form.Label>
                    <CitySelect
                      onChange={(value) => {
                        setCityId(value);
                        console.log(cityId);
                      }}
                      stateId={stateId}
                    />
                    <Form.Control.Feedback type="invalid">
                      Please provide a valid city name.
                    </Form.Control.Feedback>
                  </Form.Group>
                </Col>
                <Col md={6}>
                  <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Zip</Form.Label>
                    <Form.Control
                      type="number"
                      maxLength="5"
                      onInput={maxLengthCheck}
                      placeholder="Zip"
                      onChange={onZipcodeChangeHandler}
                    />
                  </Form.Group>
                </Col>
                <Col md={6}>
                  {/* Landline */}
                  <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Main Phone</Form.Label>
                    <NumberFormat
                      className="form-control"
                      format="(###) ###-####"
                      mask="_"
                      placeholder="Main Phone"
                      onValueChange={(value) => {
                        console.log(value.value);
                        setLandline(value.value);
                      }}
                    />
                  </Form.Group>
                </Col>
                <Col md={6}>
                  {/* Fax */}
                  <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Main Fax</Form.Label>
                    <NumberFormat
                      className="form-control"
                      format="(###) ###-####"
                      mask="_"
                      placeholder="Main Fax"
                      onValueChange={(value) => {
                        console.log(value.value);
                        setFax(value.value);
                      }}
                    />
                  </Form.Group>
                </Col>
                <Col md={6}>
                  <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Select Managers</Form.Label>
                    <ManagerSelect
                      onChange={(value) => {
                        setManagers(value);
                      }}
                      companyId={
                        localCompanyId !== null ? localCompanyId : companyId
                      }
                    />
                    <Form.Control.Feedback type="invalid">
                      Please provide a valid Company name.
                    </Form.Control.Feedback>
                  </Form.Group>
                </Col>
                {/* <Col md={6}> */}
                {/*  /!* head office *!/ */}
                {/*  <Form.Group className="mb-3" controlId="formBasicEmail"> */}
                {/*    <Form.Label>Head Office</Form.Label> */}
                {/*    <Select */}
                {/*      required */}
                {/*      options={YES_NO_DATA.map((item) => { */}
                {/*        return { value: item.id, label: item.name }; */}
                {/*      })} */}
                {/*      value={{ value: 0, label: 'No' }} */}
                {/*      onChange={onHeadOfficeChangeHandler} */}
                {/*    /> */}
                {/*  </Form.Group> */}
                {/* </Col> */}
                {/* <Col md={6}> */}
                {/*  /!* Status ID *!/ */}
                {/*  <Form.Group className="mb-3" controlId="formBasicEmail"> */}
                {/*    <Form.Label>Status</Form.Label> */}
                {/*    <Select */}
                {/*      required */}
                {/*      options={STATUSES_DATA.map((status) => { */}
                {/*        return { value: status.id, label: status.name }; */}
                {/*      })} */}
                {/*      // value={{ */}
                {/*      //   value: STATUSES_DATA[0].id, */}
                {/*      //   label: STATUSES_DATA[0].name */}
                {/*      // }} */}
                {/*      onChange={onStatusIDChangeHandler} */}
                {/*    /> */}
                {/*  </Form.Group> */}
                {/* </Col> */}
                <Col md={6}>
                  {/* Primary Contact */}
                  <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Primary Contact Name</Form.Label>
                    <EmployeeSelect
                      onChange={(value) => {
                        setPrimaryContactId(value);
                      }}
                      companyId={
                        localCompanyId != null ? localCompanyId : companyId
                      }
                    />
                  </Form.Group>
                </Col>
                <Col md={6}>
                  {/* Alternate Contact */}
                  <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Alternate Contact Name</Form.Label>
                    <EmployeeSelect
                      onChange={(value) => {
                        setAlternateContactId(value);
                      }}
                      companyId={
                        localCompanyId != null ? localCompanyId : companyId
                      }
                    />
                  </Form.Group>
                </Col>
              </Row>

              {/* <RBButton variant="primary" type="submit"> */}
              {/*  Submit */}
              {/* </RBButton> */}
              <Button variant="contained" type="submit" color="primary">
                Submit
              </Button>
            </Form>
          </Card.Text>
        </Card.Body>
      </Card>
      {/* <Grid container spacing={6}> */}
      {/*  <Grid item xs={12}> */}

      {/*  </Grid> */}
      {/* </Grid> */}
    </>
  );
};

export default NewDivisionMUI;
