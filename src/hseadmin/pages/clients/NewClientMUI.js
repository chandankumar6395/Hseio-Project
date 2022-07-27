/* eslint-disable no-unused-vars */
import { Card, Col, Form, Row } from 'react-bootstrap';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import NumberFormat from 'react-number-format';
import { Helmet } from 'react-helmet-async';
import { Button, Grid, Typography } from '@mui/material';
// import Select from 'react-select';
// import { addBanner } from '../../store/actions/banners';
import { toast } from 'react-toastify';
import validator from 'validator';
import { loadCompanies } from '../../store/actions/companies';
import {
  COUNTRY_ID_USA,
  KEY_COMPANY_ID,
  KEY_TOKEN,
  // STATUSES_DATA,
} from '../../constants/Constants';
import CompanySelect from '../../components/widgets/CompanySelect';
import {
  addClient,
  loadClients,
  resetClient,
} from '../../store/actions/clients';
import { CustomBreadcrumbs, CustomDivider } from '../../utils/MUIStyle';
import StateSelect from '../../components/widgets/StateSelect';
import CitySelect from '../../components/widgets/CitySelect';
import CustomMultiSelect from '../../components/widgets/CustomMultiSelect';
import URLConstants from '../../constants/URLConstants';
import { uploadFile } from '../../utils/NetworkUtils';

const NewClientMUI = () => {
  const localCompanyId = localStorage.getItem(KEY_COMPANY_ID);
  const [selectedLogoFile, setSelectedLogoFile] = useState('');
  const [validated, setValidated] = useState(false);
  // const logo = useSelector((state) => state.logo.logo);
  const [logo, setLogo] = useState(null);
  const banner = useSelector((state) => state.banner.banner);

  const history = useNavigate();

  const [name, setName] = useState('');
  const [divisions, setDivisions] = useState('');
  const [shortDesc, setShortDesc] = useState('');
  const [longDesc, setLongDesc] = useState('');
  const [address1, setAddress1] = useState('');
  const [address2, setAddress2] = useState('');
  const [zipcode, setZipcode] = useState('');
  const [countryId, setCountryId] = useState(null);
  const [stateId, setStateId] = useState(null);
  const [cityId, setCityId] = useState(null);
  const [emailAddress, setEmailAddress] = useState('');
  const [landline, setLandline] = useState('');
  const [fax, setFax] = useState('');
  const [website, setWebsite] = useState('');
  const [companyId, setCompanyId] = useState(-1);
  const [primaryContactFirstName, setPrimaryContactFirstName] = useState('');
  const [primaryContactLastName, setPrimaryContactLastName] = useState('');
  const [primaryContactMobile, setPrimaryContactMobile] = useState('');
  const [primaryContactDesignation, setPrimaryContactDesignation] =
    useState('');
  const [primaryContactEmail, setPrimaryContactEmail] = useState('');
  // const [primaryContactStatus, setPrimaryContactStatus] = useState('');
  const [alternateContactFirstName, setAlternateContactFirstName] =
    useState('');
  const [alternateContactLastName, setAlternateContactLastName] = useState('');
  const [alternateContactMobile, setAlternateContactMobile] = useState('');
  const [alternateContactDesignation, setAlternateContactDesignation] =
    useState('');
  const [alternateContactEmail, setAlternateContactEmail] = useState('');
  // const [alternateContactStatus, setAlternateContactStatus] = useState('');
  const companies = useSelector((state) => state.company.companies);
  const dispatch = useDispatch();

  useEffect(() => {
    fetchClients();
    setCountryId(COUNTRY_ID_USA);
  }, []);

  const fetchClients = async () => {
    await dispatch(loadClients());
    await dispatch(loadCompanies(1, '', 'name', 'asc', 100));
  };

  // On file select (from the pop up)
  const onLogoFileChange = (event) => {
    const { files } = event.target;
    setSelectedLogoFile(event.target.files[0]);
    onLogoFileUpload(event.target.files[0]);
  };

  // // On file upload (click the upload button)
  // const onLogoFileUpload = async (value) => {
  //   // Create an object of formData
  //   const formData = new FormData();
  //
  //   // Update the formData object
  //   formData.append('logo', value, value.name);
  //
  //   // await dispatch(addLogo(formData));
  //   try {
  //     const url = `${URLConstants.LOGOS_URL}/upload.json`;
  //
  //     console.log('addLogo url =', url);
  //
  //     const token = localStorage.getItem(KEY_TOKEN);
  //
  //     // const body = JSON.stringify(logo);
  //     const response = await fetch(url, {
  //       method: 'POST',
  //       headers: {
  //         Authorization: `Bearer ${token}`,
  //       },
  //       body: formData,
  //     });
  //
  //     if (!response.ok) {
  //       if (response.status === 500) {
  //         throw new Error('Internal Server Error');
  //       }
  //
  //       if (response.status === 401) {
  //         throw new Error('Unauthorized Access');
  //       }
  //     }
  //
  //     const resData = await response.json();
  //
  //     if (resData.data.error_code !== undefined) {
  //       throw new Error(resData.data.error_message);
  //     }
  //     setLogo(resData.data);
  //     console.log('addType --->', resData);
  //   } catch (error) {
  //     console.log(error);
  //     throw error;
  //   }
  // };

  const onLogoFileUpload = async (value) => {
    // Create an object of formData
    const formData = new FormData();

    // Update the formData object
    formData.append('logo', value, value.name);
    const url = `${URLConstants.LOGOS_URL}/upload.json`;
    // await dispatch(addLogo(formData));
    const response = await uploadFile(url, formData);
    setLogo(response.data);
  };

  // // On file select (from the pop up)
  // const onBannerFileChange = (event) => {
  //   const { files } = event.target;
  //   onBannerFileUpload(event.target.files[0]);
  // };
  //
  // // On file upload (click the upload button)
  // const onBannerFileUpload = async (value) => {
  //   // Create an object of formData
  //   const formData = new FormData();
  //
  //   // Update the formData object
  //   formData.append('banner', value, value.name);
  //
  //   await dispatch(addBanner(formData));
  // };

  const onClientSubmit = (event) => {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }

    setValidated(true);
    event.preventDefault();

    if (name === '') {
      toast('Please Enter Client Name');
    } else if (
      emailAddress !== null &&
      emailAddress !== '' &&
      !validator.isEmail(emailAddress)
    ) {
      toast('Email Address is not valid');
    } else if (
      primaryContactEmail !== null &&
      primaryContactEmail !== '' &&
      !validator.isEmail(primaryContactEmail)
    ) {
      toast('Primary Email Address is not valid');
    } else if (
      alternateContactEmail !== null &&
      alternateContactEmail !== '' &&
      !validator.isEmail(alternateContactEmail)
    ) {
      toast('Alternate Email Address is not valid');
    } else {
      const postData = {
        name,
        divisions: divisions,
        short_desc: shortDesc,
        long_desc: longDesc,
        primary_address: {
          name: 'Address',
          address1: address1 === '' ? ' ' : address1,
          address2,
          zipcode,
          state_id: stateId,
          city_id: cityId,
        },
        primary_contact: {
          first_name:
            primaryContactFirstName === '' ? ' ' : primaryContactFirstName,
          last_name:
            primaryContactLastName === '' ? ' ' : primaryContactLastName,
          mobile: primaryContactMobile,
          email_address: primaryContactEmail,
          designation_name: primaryContactDesignation,
          // status_id: primaryContactStatus === -1 ? null : setPrimaryContactStatus,
        },
        alternate_contact: {
          first_name:
            alternateContactFirstName === '' ? ' ' : alternateContactFirstName,
          last_name:
            alternateContactLastName === '' ? ' ' : alternateContactLastName,
          mobile: alternateContactMobile,
          email_address: alternateContactEmail,
          designation_name: alternateContactDesignation,
          // status_id:
          //   alternateContactStatus === -1 ? null : setAlternateContactStatus,
        },
        email_address: emailAddress,
        landline,
        fax,
        primary_logo_id: logo !== null ? logo.id : null,
        primary_banner_id: banner !== null ? banner.id : null,
        website_url: website,
        companies: [
          {
            id: localCompanyId !== null ? localCompanyId : companyId,
          },
        ],
      };
      postClient(postData);
    }
  };

  const postClient = async (data) => {
    await dispatch(addClient(data));
    history('../../private/clients');
    dispatch(resetClient());
  };

  const onNameChangeHandler = (event) => {
    // console.log(event.target.value);
    setName(event.target.value);
  };
  const onAddress1ChangeHandler = (event) => {
    // console.log(event.target.value);
    setAddress1(event.target.value);
  };
  const onAddress2ChangeHandler = (event) => {
    // console.log(event.target.value);
    setAddress2(event.target.value);
  };

  const onShortDescChangeHandler = (event) => {
    // console.log(event.target.value);
    setShortDesc(event.target.value);
  };

  const onLongDescChangeHandler = (event) => {
    // console.log(event.target.value);
    setLongDesc(event.target.value);
  };
  const onEmailAddressChangeHandler = (event) => {
    // console.log(event.target.value);
    setEmailAddress(event.target.value);
  };
  const onWebsiteChangeHandler = (event) => {
    // console.log(event.target.value);
    setWebsite(event.target.value);
  };

  const onZipcodeChangeHandler = (event) => {
    // console.log(event.target.value);
    setZipcode(event.target.value);
  };
  const onPrimaryContactFirstNameChangeHandler = (event) => {
    const { value } = event.target;
    console.log('Input value: ', value);

    const re = /^[A-Za-z ]+$/;
    if (value === '' || re.test(value)) {
      setPrimaryContactFirstName(value);
    }
  };
  const onPrimaryContactLastNameChangeHandler = (event) => {
    const { value } = event.target;
    console.log('Input value: ', value);

    const re = /^[A-Za-z ]+$/;
    if (value === '' || re.test(value)) {
      setPrimaryContactLastName(value);
    }
  };
  const onPrimaryContactMobileChangeHandler = (event) => {
    console.log(event.target.value);
    setPrimaryContactMobile(event.target.value);
  };
  const onPrimaryContactEmailChangeHandler = (event) => {
    console.log(event.target.value);
    setPrimaryContactEmail(event.target.value);
  };
  const onPrimaryContactDesignationChangeHandler = (event) => {
    console.log(event.target.value);
    setPrimaryContactDesignation(event.target.value);
  };
  // const onPrimaryContactStatusChangeHandler = (selectedOption) => {
  //   setPrimaryContactStatus(+selectedOption.value);
  //   console.log(selectedOption.value);
  // };
  const onAlternateContactFirstNameChangeHandler = (event) => {
    const { value } = event.target;
    console.log('Input value: ', value);

    const re = /^[A-Za-z ]+$/;
    if (value === '' || re.test(value)) {
      setAlternateContactFirstName(value);
    }
  };
  const onAlternateContactLastNameChangeHandler = (event) => {
    const { value } = event.target;
    console.log('Input value: ', value);

    const re = /^[A-Za-z ]+$/;
    if (value === '' || re.test(value)) {
      setAlternateContactLastName(value);
    }
  };
  const onAlternateContactMobileChangeHandler = (event) => {
    console.log(event.target.value);
    setAlternateContactMobile(event.target.value);
  };
  const onAlternateContactEmailChangeHandler = (event) => {
    console.log(event.target.value);
    setAlternateContactEmail(event.target.value);
  };
  const onAlternateContactDesignationChangeHandler = (event) => {
    console.log(event.target.value);
    setAlternateContactDesignation(event.target.value);
  };
  // const onAlternateContactStatusChangeHandler = (selectedOption) => {
  //   setAlternateContactStatus(+selectedOption.value);
  //   console.log(selectedOption.value);
  // };

  const maxLengthCheck = (object) => {
    if (object.target.value.length > object.target.maxLength) {
      object.target.value = object.target.value.slice(
        0,
        object.target.maxLength
      );
    }
  };
  const maxLongDescCheck = (object) => {
    if (object.target.value.length > object.target.maxLength) {
      object.target.value = object.target.value.slice(
        0,
        object.target.maxLength
      );
    }
  };

  const maxShortDescCheck = (object) => {
    if (object.target.value.length > object.target.maxLength) {
      object.target.value = object.target.value.slice(
        0,
        object.target.maxLength
      );
    }
  };

  const renderLogo = () => {
    return (
      <>
        {logo !== null && (
          // eslint-disable-next-line jsx-a11y/img-redundant-alt
          <img
            src={logo.url}
            // width={100}
            // height={100}
            style={{
              backgroundColor: 'grey',
              padding: '2px',
              height: 'auto',
              width: '100px',
            }}
            alt="employee photo"
          />
        )}
      </>
    );
  };

  // const renderBanner = () => {
  //   return (
  //     <>
  //       {banner !== null && (
  //         // eslint-disable-next-line jsx-a11y/img-redundant-alt
  //         <img
  //           src={banner.url}
  //           // width={100}
  //           height={100}
  //           style={{ backgroundColor: 'grey', padding: '2px' }}
  //           alt="employee photo"
  //         />
  //       )}
  //     </>
  //   );
  // };

  return (
    <>
      <Helmet title="Add Client" />

      <Grid justifyContent="space-between" container spacing={10}>
        <Grid item>
          <Typography variant="h3" gutterBottom display="inline">
            Clients
          </Typography>

          <CustomBreadcrumbs aria-label="Breadcrumb" mt={2}>
            <Link component={NavLink} to="/">
              Dashboard
            </Link>
            <Link component={NavLink} to="/private/clients">
              Clients
            </Link>
            <Typography>Add Client</Typography>
          </CustomBreadcrumbs>
        </Grid>
        <Grid item>
          <div>
            <NavLink to="/private/clients">
              <Button variant="contained" color="primary">
                Back
              </Button>
            </NavLink>
          </div>
        </Grid>
      </Grid>

      <CustomDivider my={6} />
      <Form noValidate validated={validated} onSubmit={onClientSubmit}>
        <Card>
          <Card.Body>
            <Card.Title style={{ marginBottom: '10px' }}>Basic Info</Card.Title>
            <br />
            <Card.Text>
              <Row>
                <Col md={12}>
                  {renderLogo()}
                  <Form.Group controlId="formFile" className="mb-3">
                    <Form.Label>Client Logo</Form.Label>
                    <Form.Control type="file" onChange={onLogoFileChange} />
                  </Form.Group>
                </Col>
                {/* <Col md={6}> */}
                {/*  {renderBanner()} */}
                {/*  <Form.Group controlId="formFile" className="mb-3"> */}
                {/*    <Form.Label>Client Banner</Form.Label> */}
                {/*    <Form.Control type="file" onChange={onBannerFileChange} /> */}
                {/*  </Form.Group> */}
                {/* </Col> */}
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
                <Col md={6}>
                  <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Division</Form.Label>
                    <CustomMultiSelect
                      params={{ url: URLConstants.DIVISIONS_URL }}
                      onChange={(value) => {
                        setDivisions(value);
                      }}
                    />
                  </Form.Group>
                </Col>
                {localCompanyId === null && (
                  <Col md={6}>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                      <Form.Label>Company </Form.Label>
                      <CompanySelect
                        onChange={(value) => setCompanyId(companyId)}
                      />
                      <Form.Control.Feedback type="invalid">
                        Please provide a valid name.
                      </Form.Control.Feedback>
                    </Form.Group>
                  </Col>
                )}
                <Col md={6}>
                  <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Address 1</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Address 1"
                      onChange={onAddress1ChangeHandler}
                    />
                    {/* <Form.Control.Feedback type="invalid"> */}
                    {/*  Please provide a valid Address. */}
                    {/* </Form.Control.Feedback> */}
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
                {/* State name field */}
                <Col md={6}>
                  <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>State</Form.Label>
                    <StateSelect
                      onChange={(value) => setStateId(value)}
                      countryId={countryId}
                    />
                  </Form.Group>
                </Col>
                {/* City name field */}
                <Col md={6}>
                  <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>City</Form.Label>
                    <CitySelect
                      onChange={(value) => setCityId(value)}
                      stateId={stateId}
                    />
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
                  {/* Website */}
                  <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Website</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Website"
                      onChange={onWebsiteChangeHandler}
                    />
                  </Form.Group>
                </Col>
                <Col md={6}>
                  {/* Email */}
                  <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Email Address</Form.Label>
                    <Form.Control
                      type="email"
                      placeholder="Email Address"
                      onChange={onEmailAddressChangeHandler}
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
                  {/* short Desc */}
                  <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Short Desc</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Short Desc"
                      maxLength="255"
                      onInput={maxShortDescCheck}
                      onChange={onShortDescChangeHandler}
                    />
                  </Form.Group>
                </Col>
                <Col md={6}>
                  {/* Description */}
                  <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Description</Form.Label>
                    <Form.Control
                      as="textarea"
                      rows={2}
                      maxLength="255"
                      onInput={maxLongDescCheck}
                      placeholder="Description"
                      onChange={onLongDescChangeHandler}
                    />
                  </Form.Group>
                </Col>
              </Row>
            </Card.Text>
          </Card.Body>
        </Card>

        <Card>
          <Card.Body>
            <Card.Title style={{ marginBottom: '10px' }}>
              Primary Contact
            </Card.Title>
            <br />
            <Card.Text>
              <Row>
                <Col md={6}>
                  {/* primary contact First Name Field */}
                  <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>First Name</Form.Label>
                    <Form.Control
                      type="text"
                      value={primaryContactFirstName}
                      placeholder="Fist Name"
                      onChange={onPrimaryContactFirstNameChangeHandler}
                    />
                  </Form.Group>
                </Col>
                <Col md={6}>
                  {/* primary contact Last Name Field */}
                  <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Last Name</Form.Label>
                    <Form.Control
                      type="text"
                      value={primaryContactLastName}
                      placeholder="Last Name"
                      onChange={onPrimaryContactLastNameChangeHandler}
                    />
                  </Form.Group>
                </Col>
                <Col md={6}>
                  {/* primary contact Designation Field */}
                  <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Title</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Title"
                      onChange={onPrimaryContactDesignationChangeHandler}
                    />
                  </Form.Group>
                </Col>
                <Col md={6}>
                  {/* primary contact Mobile Field */}
                  <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Mobile</Form.Label>
                    <NumberFormat
                      className="form-control"
                      format="(###) ###-####"
                      mask="_"
                      placeholder="Mobile"
                      onValueChange={(value) => {
                        setPrimaryContactMobile(value.value);
                      }}
                    />
                  </Form.Group>
                </Col>
                <Col md={6}>
                  {/* primary contact Email Field */}
                  <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Email</Form.Label>
                    <Form.Control
                      type="email"
                      placeholder="Email"
                      onChange={onPrimaryContactEmailChangeHandler}
                    />
                  </Form.Group>
                </Col>
                {/* <Col md={6}> */}
                {/*  /!* primary contact status Field *!/ */}
                {/*  <Form.Group className="mb-3" controlId="formBasicEmail"> */}
                {/*    <Form.Label>Primary Contact Status</Form.Label> */}
                {/*    <Select */}
                {/*      required */}
                {/*      options={STATUSES_DATA.map((status) => { */}
                {/*        return { value: status.id, label: status.name }; */}
                {/*      })} */}
                {/*      onChange={onPrimaryContactStatusChangeHandler} */}
                {/*    /> */}
                {/*  </Form.Group> */}
                {/* </Col> */}
              </Row>
            </Card.Text>
          </Card.Body>
        </Card>

        <Card>
          <Card.Body>
            <Card.Title style={{ marginBottom: '10px' }}>
              Alternate Contact
            </Card.Title>
            <br />
            <Card.Text>
              <Row>
                <Col md={6}>
                  {/* Alternate contact First Name Field */}
                  <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>First Name</Form.Label>
                    <Form.Control
                      type="text"
                      value={alternateContactFirstName}
                      placeholder="First Name"
                      onChange={onAlternateContactFirstNameChangeHandler}
                    />
                  </Form.Group>
                </Col>
                <Col md={6}>
                  {/* Alternate contact Last Name Field */}
                  <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Last Name</Form.Label>
                    <Form.Control
                      type="text"
                      value={alternateContactLastName}
                      placeholder="Last Name"
                      onChange={onAlternateContactLastNameChangeHandler}
                    />
                  </Form.Group>
                </Col>
                <Col md={6}>
                  {/* Alternate contact Designation Field */}
                  <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Title</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Title"
                      onChange={onAlternateContactDesignationChangeHandler}
                    />
                  </Form.Group>
                </Col>
                <Col md={6}>
                  {/* Alternate contact Mobile Field */}
                  <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Mobile</Form.Label>
                    <NumberFormat
                      className="form-control"
                      format="(###) ###-####"
                      mask="_"
                      placeholder="Mobile"
                      onValueChange={(value) => {
                        setAlternateContactMobile(value.value);
                      }}
                    />
                  </Form.Group>
                </Col>
                <Col md={6}>
                  {/* Alternate contact Email Field */}
                  <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Email</Form.Label>
                    <Form.Control
                      type="email"
                      placeholder="Email"
                      onChange={onAlternateContactEmailChangeHandler}
                    />
                  </Form.Group>
                </Col>
                {/* <Col md={6}> */}
                {/*  /!* Alternate contact Status Field *!/ */}
                {/*  <Form.Group className="mb-3" controlId="formBasicEmail"> */}
                {/*    <Form.Label>Alternate Contact Status</Form.Label> */}
                {/*    <Select */}
                {/*      required */}
                {/*      options={STATUSES_DATA.map((status) => { */}
                {/*        return { value: status.id, label: status.name }; */}
                {/*      })} */}
                {/*      onChange={onAlternateContactStatusChangeHandler} */}
                {/*    /> */}
                {/*  </Form.Group> */}
                {/* </Col> */}
              </Row>
            </Card.Text>
          </Card.Body>
        </Card>
        <Button variant="contained" type="submit" color="primary">
          Submit
        </Button>
      </Form>
    </>
  );
};

export default NewClientMUI;
