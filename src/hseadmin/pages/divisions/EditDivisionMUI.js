import React, { useEffect, useState } from 'react';
import { Link, NavLink, useNavigate, useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { Card, Col, Form, Row } from 'react-bootstrap';
// import Select from 'react-select';
import { toast } from 'react-toastify';
import { Helmet } from 'react-helmet-async';
import { Button, Grid, Typography } from '@mui/material';
import NumberFormat from 'react-number-format';
import { loadCompanies } from '../../store/actions/companies';
import { updateDivision } from '../../store/actions/divisions';
import { loadAddresses } from '../../store/actions/addresses';
import {
  COUNTRY_ID_USA,
  KEY_COMPANY_ID,
  // STATUSES_DATA,
  // YES_NO_DATA,
} from '../../constants/Constants';
import CompanySelect from '../../components/widgets/CompanySelect';
import StateSelect from '../../components/widgets/StateSelect';
import CitySelect from '../../components/widgets/CitySelect';
import URLConstants from '../../constants/URLConstants';
import { fetchGET } from '../../utils/NetworkUtils';
// import JobSiteCrewTabs from '../../components/tabs/JobSiteCrewTabs';
import ManagerSelect from '../../components/widgets/ManagerSelect';
import { CustomBreadcrumbs, CustomDivider } from '../../utils/MUIStyle';
import EmployeeSelect from '../../components/widgets/EmployeeSelect';

const EditDivisionMUI = () => {
  const localCompanyId = localStorage.getItem(KEY_COMPANY_ID);

  const [validated, setValidated] = useState(false);

  const history = useNavigate();

  const [name, setName] = useState('');
  const [companyId, setCompanyId] = useState(-1);
  // const [addressId, setAddressId] = useState(-1);
  const [address1, setAddress1] = useState('');
  const [address2, setAddress2] = useState('');
  const [headOffice, setHeadOffice] = useState('');
  const [statusId, setStatusId] = useState('');

  const [cityId, setCityId] = useState(-1);
  const [stateId, setStateId] = useState(-1);
  const [countryId, setCountryId] = useState(COUNTRY_ID_USA);
  const [zipcode, setZipcode] = useState('');
  const [landline, setLandline] = useState('');
  const [fax, setFax] = useState('');
  // const [selectedOnHeadOfficeOption, setSelectedOnHeadOfficeOption] = useState(
  //   {}
  // );
  // const [selectedOnStatusIdOption, setSelectedOnStatusIdOption] = useState({});
  const [managers, setManagers] = useState([]);
  const [managerOptions, setManagerOptions] = useState([]);
  const [primaryContactId, setPrimaryContactId] = useState('');
  const [alternateContactId, setAlternateContactId] = useState('');

  const dispatch = useDispatch();
  const [division, setDivision] = useState(null);
  // const division = useSelector((state) => state.division.division);
  // const address = useSelector((state) => state.address.address);
  const { id } = useParams();

  useEffect(() => {
    if (division != null) {
      setName(division.name);
      setCompanyId(division.company_id);

      setHeadOffice(division.head_office);
      setStatusId(division.status_id);
      setLandline(division.landline);
      setFax(division.fax);
      setPrimaryContactId(division.primary_contact_id);
      // setSelectedOnHeadOfficeOption({
      //   value: division.head_office,
      //   label: YES_NO_DATA.find((x) => x.id === division.head_office).name,
      // });
      // setSelectedOnStatusIdOption({
      //   value: division.status_id,
      //   label: STATUSES_DATA.find((x) => x.id === division.status_id).name,
      // });
      if (division.address !== null) {
        console.log('---->', division.address);
        setAddress1(division.address.address1);
        setAddress2(division.address.address2);
        setCityId(division.address.city_id);
        setStateId(division.address.state_id);
        setCountryId(division.address.country_id);
        setZipcode(division.address.zipcode);
      }
      setManagers(division.managers);

      const localOptions = [];

      division.managers.forEach((user) => {
        localOptions.push({
          id: user.id,
        });
      });

      setManagerOptions(localOptions);
    }
  }, [division]);

  useEffect(() => {
    loadDivision();
    fetchCompanies();
    fetchAddress();
  }, []);

  const fetchCompanies = async () => {
    await dispatch(loadCompanies(1, '', 'name', 'asc', 100));
  };

  const fetchAddress = async () => {
    await dispatch(loadAddresses());
  };

  const loadDivision = async () => {
    // await dispatch(getDivision(id));
    try {
      const url = `${URLConstants.GET_DIVISION_URL}/${id}.json`;

      const response = await fetchGET(url);
      console.log('getDivision', response);
      if (response.success === true) {
        setDivision(response.data);
      } else {
        toast(response.data.error_message || 'Failed');
      }
    } catch (error) {
      toast(error.message || 'Failed');
    }
  };

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
        id,
        name,
        company_id: companyId,
        head_office: headOffice,
        statusId,
        managers: managerOptions,
        zipcode,
        landline,
        fax,
        primary_contact_id: primaryContactId,
        alternate_contact_id: alternateContactId,
      };

      if (division.address != null) {
        postData.address = {
          id: division.address.id,
          name: 'Project Address',
          address1: address1 === '' ? ' ' : address1,
          address2,
          city_id: cityId,
          state_id: stateId,
          country_id: countryId,
          zipcode,
        };
      } else {
        postData.address = {
          name: 'Project Address',
          address1: address1 === '' ? ' ' : address1,
          city_id: cityId,
          state_id: stateId,
          country_id: countryId,
          zipcode,
        };
      }
      postDivision(postData);
    }
  };

  const postDivision = async (data) => {
    await dispatch(updateDivision(data));
    history('../../private/divisions');
  };
  const onNameChangeHandler = (event) => {
    // console.log(event.target.value);
    setName(event.target.value);
  };

  const onCompanyIdChangeHandler = (value) => {
    setCompanyId(value);

    // console.log(selectedOption.value);
  };
  const onAddress1ChangeHandler = (event) => {
    console.log(event.target.value);
    setAddress1(event.target.value);
  };
  const onAddress2ChangeHandler = (event) => {
    // console.log(event.target.value);
    setAddress2(event.target.value);
  };
  const onZipcodeChangeHandler = (event) => {
    // console.log(event.target.value);
    setZipcode(event.target.value);
  };
  // const onHeadOfficeChangeHandler = (selectedOption) => {
  //   // console.log(event.target.value);
  //   setHeadOffice(+selectedOption.value);
  //   setSelectedOnHeadOfficeOption(selectedOption);
  // };
  // const onStatusIDChangeHandler = (selectedOption) => {
  //   // console.log(event.target.value);
  //   setStatusId(+selectedOption.value);
  //   setSelectedOnStatusIdOption(selectedOption);
  // };

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
      <Helmet title="Edit Division" />

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
            <Typography>Edit Division</Typography>
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
            {division && (
              <Form
                noValidate
                validated={validated}
                onSubmit={onDivisionSubmit}
              >
                {/* Name Field */}
                <Row>
                  <Col md={6}>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                      <Form.Label>Name *</Form.Label>
                      <Form.Control
                        required
                        type="text"
                        placeholder="Name *"
                        onChange={onNameChangeHandler}
                        value={name}
                      />
                      <Form.Control.Feedback type="invalid">
                        Please provide a valid name.
                      </Form.Control.Feedback>
                    </Form.Group>
                  </Col>
                  {localCompanyId === null && (
                    <Col md={6}>
                      {/* Company Id Field */}
                      <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Company *</Form.Label>
                        {division && (
                          <CompanySelect
                            onChange={onCompanyIdChangeHandler}
                            entity={division.company}
                          />
                        )}
                      </Form.Group>
                    </Col>
                  )}
                  <Col md={6}>
                    {/* Address1 field */}
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                      <Form.Label>Address 1</Form.Label>
                      <Form.Control
                        required
                        type="text"
                        placeholder="Address"
                        onChange={onAddress1ChangeHandler}
                        value={address1}
                      />
                      <Form.Control.Feedback type="invalid">
                        Please provide a valid address name.
                      </Form.Control.Feedback>
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    {/* Address2 Field */}
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                      <Form.Label>Address 2</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="Address 2"
                        onChange={onAddress2ChangeHandler}
                        value={address2}
                      />
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                      <Form.Label>Select State</Form.Label>
                      {division && (
                        <StateSelect
                          onChange={(value) => setStateId(value)}
                          countryId={countryId}
                          entity={
                            division.address ? division.address.state : null
                          }
                        />
                      )}
                      <Form.Control.Feedback type="invalid">
                        Please provide a valid Company name.
                      </Form.Control.Feedback>
                    </Form.Group>
                  </Col>

                  <Col md={6}>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                      <Form.Label>Select City</Form.Label>
                      {division && (
                        <CitySelect
                          onChange={(value) => setCityId(value)}
                          // cityId={cityId}
                          stateId={stateId}
                          entity={
                            division.address ? division.address.city : null
                          }
                        />
                      )}
                      <Form.Control.Feedback type="invalid">
                        Please provide a valid Company name.
                      </Form.Control.Feedback>
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    {/* Zip Field */}
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                      <Form.Label>Zip</Form.Label>
                      <Form.Control
                        type="number"
                        maxLength="5"
                        onInput={maxLengthCheck}
                        placeholder="zip"
                        onChange={onZipcodeChangeHandler}
                        value={zipcode}
                      />
                      <Form.Control.Feedback type="invalid">
                        Please provide a valid address name.
                      </Form.Control.Feedback>
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
                        value={landline}
                      />
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    {/* Fax Field */}
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
                        value={fax}
                      />
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                      <Form.Label>Select Managers</Form.Label>
                      <ManagerSelect
                        onChange={(value) => {
                          console.log('selected value', value);
                          setManagerOptions(value);
                        }}
                        companyId={companyId}
                        entities={managers}
                      />
                      <Form.Control.Feedback type="invalid">
                        Please provide a valid Company name.
                      </Form.Control.Feedback>
                    </Form.Group>
                  </Col>

                  {/* <Col md={6}> */}
                  {/*  /!* Head Office filed *!/ */}
                  {/*  <Form.Group className="mb-3" controlId="formBasicEmail"> */}
                  {/*    <Form.Label>Head Office</Form.Label> */}
                  {/*    <Select */}
                  {/*      required */}
                  {/*      options={YES_NO_DATA.map((item) => { */}
                  {/*        return { value: item.id, label: item.name }; */}
                  {/*      })} */}
                  {/*      onChange={onHeadOfficeChangeHandler} */}
                  {/*      value={selectedOnHeadOfficeOption} */}
                  {/*    /> */}
                  {/*  </Form.Group> */}
                  {/* </Col> */}
                  {/* <Col md={6}> */}
                  {/*  /!* Status Id Field *!/ */}
                  {/*  <Form.Group className="mb-3" controlId="formBasicEmail"> */}
                  {/*    <Form.Label>Status</Form.Label> */}
                  {/*    <Select */}
                  {/*      required */}
                  {/*      options={STATUSES_DATA.map((status) => { */}
                  {/*        return { value: status.id, label: status.name }; */}
                  {/*      })} */}
                  {/*      onChange={onStatusIDChangeHandler} */}
                  {/*      value={selectedOnStatusIdOption} */}
                  {/*    /> */}
                  {/*  </Form.Group> */}
                  {/* </Col> */}
                  <Col md={6}>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                      <Form.Label>Primary Contact Name</Form.Label>
                      <EmployeeSelect
                        onChange={(value) => {
                          setPrimaryContactId(value);
                        }}
                        entity={division.primary_contact}
                      />
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                      <Form.Label>Alternate Contact Name</Form.Label>
                      <EmployeeSelect
                        onChange={(value) => {
                          setAlternateContactId(value);
                        }}
                        entity={division.alternate_contact}
                      />
                    </Form.Group>
                  </Col>
                </Row>

                <Button variant="contained" type="submit" color="primary">
                  Submit
                </Button>
              </Form>
            )}
          </Card.Text>
        </Card.Body>
      </Card>
      <Grid container spacing={6}>
        <Grid item xs={12} />
      </Grid>
    </>
  );
};

export default EditDivisionMUI;
