/* eslint-disable no-unused-vars */
import { Card, Col, Collapse, Form, Modal, Row } from 'react-bootstrap';
import React, { useEffect, useState } from 'react';
import NumberFormat from 'react-number-format';

import { toast } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';
import { Link, NavLink, useNavigate } from 'react-router-dom';

import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import { styled } from '@mui/material/styles';
import { Helmet } from 'react-helmet-async';
import { Button, Grid, Typography } from '@mui/material';
import Select from 'react-select';
import validator from 'validator';
import { uploadFile } from '../../utils/NetworkUtils';
import URLConstants from '../../constants/URLConstants';

import {
  addCompanies,
  loadCompanies,
  resetCompany,
} from '../../store/actions/companies';
import { CustomBreadcrumbs, CustomDivider } from '../../utils/MUIStyle';
import StateSelect from '../../components/widgets/StateSelect';
import CitySelect from '../../components/widgets/CitySelect';
import { COUNTRY_ID_USA, STATUSES_DATA } from '../../constants/Constants';
import UploadAndCropImage from '../../components/UploadAndCropImage';

const NewCompanyMUI = () => {
  const [selectedLogoFile, setSelectedLogoFile] = useState('');
  const [validated, setValidated] = useState(false);

  const [logo, setLogo] = useState(null);
  const [banner, setBanner] = useState(null);

  const navigate = useNavigate();

  const [name, setName] = useState('');
  const [shortDesc, setShortDesc] = useState('');
  // const [longDesc, setLongDesc] = useState('');
  const [emailAddress, setEmailAddress] = useState('');
  const [landline, setLandline] = useState('');
  const [fax, setFax] = useState('');
  const [formattedFax, setFormattedFax] = useState('');
  const [mobile, setMobile] = useState('');
  const [website, setWebsite] = useState('');
  const [aboutUs, setAboutUs] = useState('');
  const [privacyPolicy, setPrivacyPolicy] = useState('');
  const [termsAndCondition, setTermsAndCondition] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [address1, setAddress1] = useState('');
  const [address2, setAddress2] = useState('');
  const [zipcode, setZipcode] = useState('');
  const [countryId, setCountryId] = useState(-1);
  const [stateId, setStateId] = useState(null);
  const [cityId, setCityId] = useState(null);
  const [primaryContact, setPrimaryContact] = useState('');
  const [alternateContact, setAlternateContact] = useState('');
  const [primaryContactFirstName, setPrimaryContactFirstName] = useState('');
  const [primaryContactLastName, setPrimaryContactLastName] = useState('');
  const [primaryContactEmail, setPrimaryContactEmail] = useState('');
  const [primaryContactMobile, setPrimaryContactMobile] = useState('');
  const [primaryContactDesignation, setPrimaryContactDesignation] =
    useState('');
  // const [primaryContactStatus, setPrimaryContactStatus] = useState('');
  const [alternateContactFirstName, setAlternateContactFirstName] =
    useState('');
  const [alternateContactLastName, setAlternateContactLastName] = useState('');
  const [alternateContactEmail, setAlternateContactEmail] = useState('');
  const [alternateContactMobile, setAlternateContactMobile] = useState('');
  const [alternateContactDesignation, setAlternateContactDesignation] =
    useState('');
  // const [alternateContactStatus, setAlternateContactStatus] = useState('');
  const [userStatusId, setUserStatusId] = useState(-1);
  const dispatch = useDispatch();

  const [open, setOpen] = useState(false);

  const [showModal, setShowModal] = useState(false);

  const handleClose = () => {
    setShowModal(false);
  };
  const handleShow = () => setShowModal(true);

  useEffect(() => {
    // handleShow();
    fetchCompanies();
    setCountryId(COUNTRY_ID_USA);
  }, []);

  const fetchCompanies = async () => {
    await dispatch(loadCompanies());
  };

  // On file select (from the pop up)
  const onLogoFileChange = (event) => {
    const { files } = event.target;
    setSelectedLogoFile(event.target.files[0]);
    onLogoFileUpload(event.target.files[0]);
  };

  // On file upload (click the upload button)
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

  // On file select (from the pop up)
  const onBannerFileChange = (event) => {
    const { files } = event.target;
    onBannerFileUpload(event.target.files[0]);
  };

  // On file upload (click the upload button)
  const onBannerFileUpload = async (value) => {
    // Create an object of formData
    const formData = new FormData();

    // Update the formData object
    formData.append('banner', value, value.name);

    // await dispatch(addBanner(formData));

    const url = `${URLConstants.BANNERS_URL}/upload.json`;

    const response = await uploadFile(url, formData);
    setBanner(response.data);
  };

  const onCompanySubmit = (event) => {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }

    setValidated(true);
    event.preventDefault();
    if (name === '') {
      toast('Please Enter Company Name');
    } else if (email === '') {
      toast('Please Enter Username');
    } else if (password === '') {
      toast('Please Enter Password');
    } else if (firstName === '') {
      toast('Please Enter First Name');
    } else if (lastName === '') {
      toast('Please Enter Last Name');
    } else if (email !== null && !validator.isEmail(email)) {
      toast('Email Address is not valid');
    } else if (
      primaryContactEmail !== null &&
      primaryContactEmail !== '' &&
      !validator.isEmail(primaryContactEmail)
    ) {
      toast('Primary Contact Email is not valid');
    } else if (
      alternateContactEmail !== null &&
      alternateContactEmail !== '' &&
      !validator.isEmail(alternateContactEmail)
    ) {
      toast('Alternate Contact Email is not valid');
    } else {
      const postData = {
        name,
        users: [
          {
            username: email,
            email,
            password,
            first_name: firstName,
            last_name: lastName,
            active: 1,
            user_status_id: 1,
          },
        ],
        short_desc: shortDesc,
        // long_desc: longDesc,
        email_address: emailAddress,
        landline,
        fax,
        primary_logo_id: logo !== null ? logo.id : null,
        primary_banner_id: banner !== null ? banner.id : null,
        mobile,
        website_url: website,
        about_us_url: aboutUs,
        privacy_policy_url: privacyPolicy,
        terms_and_condition_url: termsAndCondition,
        primary_address: {
          name: 'Address',
          address1: address1 === '' ? ' ' : address1,
          address2,
          zipcode,
          country_id: countryId,
          state_id: stateId,
          city_id: cityId,
        },
        primary_contact: {
          first_name:
            primaryContactFirstName === '' ? ' ' : primaryContactFirstName,
          last_name:
            primaryContactLastName === '' ? ' ' : primaryContactLastName,
          email_address: primaryContactEmail,
          mobile: primaryContactMobile,
          designation_name: primaryContactDesignation,
          // status_id: primaryContactStatus,
        },
        alternate_contact: {
          first_name:
            alternateContactFirstName === '' ? ' ' : alternateContactFirstName,
          last_name:
            alternateContactLastName === '' ? ' ' : alternateContactLastName,
          email_address: alternateContactEmail,
          mobile: alternateContactMobile,
          designation_name: alternateContactDesignation,
          // status_id: alternateContactStatus,
        },
      };
      postCompany(postData);
    }
  };

  const postCompany = async (data) => {
    try {
      await dispatch(addCompanies(data));
      navigate('/private/companies');
      dispatch(resetCompany());
    } catch (error) {
      toast(error.message || 'Failed');
    }
  };

  const onNameChangeHandler = (event) => {
    // console.log(event.target.value);
    setName(event.target.value);
  };

  const onShortDescChangeHandler = (event) => {
    // console.log(event.target.value);
    setShortDesc(event.target.value);
  };

  // const onLongDescChangeHandler = (event) => {
  //   // console.log(event.target.value);
  //   setLongDesc(event.target.value);
  // };
  const onEmailAddressChangeHandler = (event) => {
    // console.log(event.target.value);
    setEmailAddress(event.target.value);
  };
  const onLandlineChangeHandler = (event) => {
    // console.log(event.target.value);
    setLandline(event.target.value);
  };

  function formatPhoneNumber(phoneNumberString) {
    const cleaned = `${phoneNumberString}`.replace(/\D/g, '');
    const match = cleaned.match(/^(\d{3})(\d{3})(\d{4})$/);
    if (match) {
      return `(${match[1]}) ${match[2]}-${match[3]}`;
    }
    return '';
  }

  const onFaxChangeHandler = (event) => {
    setFax(event.target.value);
  };
  const onMobileChangeHandler = (event) => {
    // console.log(event.target.value);
    setMobile(event.target.value);
  };

  const onWebsiteChangeHandler = (event) => {
    // console.log(event.target.value);
    setWebsite(event.target.value);
  };

  const onAboutUsChangeHandler = (event) => {
    // console.log(event.target.value);
    setAboutUs(event.target.value);
  };

  const onUsernameChangeHandler = (event) => {
    console.log(event.target.value);
    setUsername(event.target.value);
  };
  const onPasswordChangeHandler = (event) => {
    console.log(event.target.value);
    setPassword(event.target.value);
  };
  const onEmailChangeHandler = (event) => {
    console.log(event.target.value);
    setEmail(event.target.value);
  };

  const onFirstNameChangeHandler = (event) => {
    // console.log(event.target.value);
    // setFirstName(event.target.value);

    const { value } = event.target;
    console.log('Input value: ', value);

    const re = /^[A-Za-z ]+$/;
    if (value === '' || re.test(value)) {
      setFirstName(value);
    }
  };
  const onAddress1ChangeHandler = (event) => {
    console.log(event.target.value);
    setAddress1(event.target.value);
  };
  const onAddress2ChangeHandler = (event) => {
    console.log(event.target.value);
    setAddress2(event.target.value);
  };
  const onZipcodeChangeHandler = (event) => {
    console.log(event.target.value);
    setZipcode(event.target.value);
  };

  const onLastNameChangeHandler = (event) => {
    // console.log(event.target.value);
    // setLastName(event.target.value);

    const { value } = event.target;
    console.log('Input value: ', value);

    const re = /^[A-Za-z ]+$/;
    if (value === '' || re.test(value)) {
      setLastName(value);
    }
  };
  const onPrimaryContactChangeHandler = (event) => {
    console.log(event.target.value);
    setPrimaryContact(event.target.value);
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
  const onPrimaryContactEmailChangeHandler = (event) => {
    // console.log(event.target.value);
    setPrimaryContactEmail(event.target.value);
  };
  // const onPrimaryContactMobileChangeHandler = (event) => {
  //   console.log(event.target.value);
  //   setPrimaryContactMobile(event.target.value);
  // };
  const onPrimaryContactDesignationChangeHandler = (event) => {
    // console.log(event.target.value);
    setPrimaryContactDesignation(event.target.value);
  };
  // const onPrimaryContactStatusChangeHandler = (selectedOption) => {
  //   setPrimaryContactStatus(+selectedOption.value);
  //   console.log(primaryContactStatus);
  // };

  // const onAlternateContactChangeHandler = (event) => {
  //   console.log(event.target.value);
  //   setAlternateContact(event.target.value);
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
  const onAlternateContactEmailChangeHandler = (event) => {
    console.log(event.target.value);
    setAlternateContactEmail(event.target.value);
  };
  const onAlternateContactMobileChangeHandler = (event) => {
    console.log(event.target.value);
    setAlternateContactMobile(event.target.value);
  };
  const onAlternateContactDesignationChangeHandler = (event) => {
    console.log(event.target.value);
    setAlternateContactDesignation(event.target.value);
  };
  // const onAlternateContactStatusChangeHandler = (selectedOption) => {
  //   setAlternateContactStatus(+selectedOption.value);
  //   console.log(alternateContactStatus);
  // };
  const renderLogo = () => {
    return (
      <>
        {logo !== null && (
          // eslint-disable-next-line jsx-a11y/img-redundant-alt
          <img
            src={logo.url}
            style={{
              backgroundColor: 'grey',
              padding: '2px',
              width: '100px',
              height: 'auto',
            }}
            alt="employee photo"
          />
        )}
      </>
    );
  };

  const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  }));

  const renderBanner = () => {
    return (
      <>
        {banner !== null && (
          // eslint-disable-next-line jsx-a11y/img-redundant-alt
          <img
            src={banner.url}
            // width={100}
            height={100}
            style={{ backgroundColor: 'grey', padding: '2px' }}
            alt="employee photo"
          />
        )}
      </>
    );
  };

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

  return (
    <>
      <Helmet title="Add Company" />

      <Grid justifyContent="space-between" container spacing={10}>
        <Grid item>
          <Typography variant="h3" gutterBottom display="inline">
            Companies
          </Typography>

          <CustomBreadcrumbs aria-label="Breadcrumb" mt={2}>
            <Link component={NavLink} to="/">
              Dashboard
            </Link>
            <Link component={NavLink} to="/private/companies">
              Companies
            </Link>
            <Typography>Add Company</Typography>
          </CustomBreadcrumbs>
        </Grid>
        <Grid item>
          <div>
            <NavLink to="/private/companies">
              <Button variant="contained" color="primary">
                Back
              </Button>
            </NavLink>
          </div>
        </Grid>
      </Grid>

      <CustomDivider my={6} />
      <Form noValidate validated={validated} onSubmit={onCompanySubmit}>
        <Card>
          <Card.Body>
            <Card.Title style={{ marginBottom: '10px' }}>Basic Info</Card.Title>
            <br />
            <Card.Text>
              <Row>
                <Col md={12}>
                  {renderLogo()}
                  <Form.Group controlId="formFile" className="mb-3">
                    <Form.Label>Company Logo</Form.Label>
                    <Form.Control type="file" onChange={onLogoFileChange} />
                  </Form.Group>
                </Col>
                <Col md={6}>
                  {/* Name Field */}
                  <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Company Name *</Form.Label>
                    <Form.Control
                      required
                      type="text"
                      placeholder="Company Name *"
                      onChange={onNameChangeHandler}
                    />
                    <Form.Control.Feedback type="invalid">
                      Please provide a valid Name.
                    </Form.Control.Feedback>
                  </Form.Group>
                </Col>
                <Col md={6}>
                  {/* Username Field */}
                  <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Login Username *</Form.Label>
                    <Form.Control
                      required
                      type="email"
                      placeholder="Your Email Address *"
                      onChange={onEmailChangeHandler}
                    />
                    <Form.Control.Feedback type="invalid">
                      Please provide a valid Name.
                    </Form.Control.Feedback>
                  </Form.Group>
                </Col>
                <Col md={6}>
                  {/* Password Field */}
                  <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Login Password *</Form.Label>
                    <Form.Control
                      required
                      type="password"
                      placeholder="Password *"
                      onChange={onPasswordChangeHandler}
                    />
                    <Form.Control.Feedback type="invalid">
                      Please provide a valid Password.
                    </Form.Control.Feedback>
                  </Form.Group>
                </Col>
                <Col md={6}>
                  {/* First Name Field */}
                  <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>First Name *</Form.Label>
                    <Form.Control
                      required
                      type="text"
                      value={firstName}
                      placeholder="First Name *"
                      onChange={onFirstNameChangeHandler}
                    />
                    <Form.Control.Feedback type="invalid">
                      Please provide a valid Name.
                    </Form.Control.Feedback>
                  </Form.Group>
                </Col>
                <Col md={6}>
                  {/* Last Name Field */}
                  <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Last Name *</Form.Label>
                    <Form.Control
                      required
                      value={lastName}
                      type="text"
                      placeholder="Last Name *"
                      onChange={onLastNameChangeHandler}
                    />
                    <Form.Control.Feedback type="invalid">
                      Please provide a valid Name.
                    </Form.Control.Feedback>
                  </Form.Group>
                </Col>

                {/* <Col md={6}> */}
                {/*  {renderBanner()} */}
                {/*  <Form.Group controlId="formFile" className="mb-3"> */}
                {/*    <Form.Label>Company Banner</Form.Label> */}
                {/*    <Form.Control type="file" onChange={onBannerFileChange} /> */}
                {/*  </Form.Group> */}
                {/* </Col> */}
                {/* Address1 field */}
                <Col md={6}>
                  <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Address 1</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Address 1"
                      onChange={onAddress1ChangeHandler}
                    />
                  </Form.Group>
                </Col>
                {/* Address2 field */}
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
                      required
                      onChange={(value) => setStateId(value)}
                      countryId={countryId}
                    />
                    <Form.Control.Feedback type="invalid">
                      Please provide a valid State Name.
                    </Form.Control.Feedback>
                  </Form.Group>
                </Col>
                {/* City name field */}
                <Col md={6}>
                  <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>City</Form.Label>
                    <CitySelect
                      required
                      onChange={(value) => setCityId(value)}
                      stateId={stateId}
                    />
                    <Form.Control.Feedback type="invalid">
                      Please provide a valid City Name.
                    </Form.Control.Feedback>
                  </Form.Group>
                </Col>
                {/* Zip field */}
                <Col md={6}>
                  <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Zip</Form.Label>
                    <Form.Control
                      type="number"
                      maxLength="5"
                      onInput={maxLengthCheck}
                      placeholder="zip"
                      onChange={onZipcodeChangeHandler}
                    />
                  </Form.Group>
                </Col>
                {/* <Col md={6}> */}
                {/*  /!* Email *!/ */}
                {/*  <Form.Group className="mb-3" controlId="formBasicEmail"> */}
                {/*    <Form.Label>Email Address</Form.Label> */}
                {/*    <Form.Control */}
                {/*      type="text" */}
                {/*      placeholder="Email Address" */}
                {/*      onChange={onEmailAddressChangeHandler} */}
                {/*    /> */}
                {/*  </Form.Group> */}
                {/* </Col> */}
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
                      maxLength="255"
                      onInput={maxShortDescCheck}
                      placeholder="Short Desc"
                      onChange={onShortDescChangeHandler}
                    />
                  </Form.Group>
                </Col>
                {/* <Col md={6}> */}
                {/*  /!* Description *!/ */}
                {/*  <Form.Group className="mb-3" controlId="formBasicEmail"> */}
                {/*    <Form.Label>Description</Form.Label> */}
                {/*    <Form.Control */}
                {/*      as="textarea" */}
                {/*      rows={2} */}
                {/*      maxLength="255" */}
                {/*      onInput={maxLongDescCheck} */}
                {/*      placeholder="Description" */}
                {/*      onChange={onLongDescChangeHandler} */}
                {/*    /> */}
                {/*  </Form.Group> */}
                {/* </Col> */}
              </Row>
            </Card.Text>
          </Card.Body>
        </Card>

        {/* Primary */}
        <Card>
          <Card.Body>
            <Card.Title style={{ marginBottom: '10px' }}>
              Primary Contact
            </Card.Title>
            <br />
            <Card.Text>
              <Row>
                <Col md={6}>
                  {/* primary contact First Name */}
                  <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>First Name</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="First Name"
                      value={primaryContactFirstName}
                      onChange={onPrimaryContactFirstNameChangeHandler}
                    />
                  </Form.Group>
                </Col>
                <Col md={6}>
                  {/* primary contact Last Name */}
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
                  {/* primary contact Email */}
                  <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Email</Form.Label>
                    <Form.Control
                      type="email"
                      placeholder="Email"
                      onChange={onPrimaryContactEmailChangeHandler}
                    />
                  </Form.Group>
                </Col>
                <Col md={6}>
                  {/* primary contact Mobile */}
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
                  {/* primary contact Designation */}
                  <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Title</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Title"
                      onChange={onPrimaryContactDesignationChangeHandler}
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
              Alternate Contact
            </Card.Title>
            <br />
            <Card.Text>
              <Row>
                <Col md={6}>
                  {/* Alternate contact  Field */}
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
                  {/* Alternate contact Last Name */}
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
                  {/* Alternate contact Email */}
                  <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Email</Form.Label>
                    <Form.Control
                      type="email"
                      placeholder="Email"
                      onChange={onAlternateContactEmailChangeHandler}
                    />
                  </Form.Group>
                </Col>
                <Col md={6}>
                  {/* Alternate contact Mobile */}
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
                  {/* Alternate contact Designation */}
                  <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Title</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Title"
                      onChange={onAlternateContactDesignationChangeHandler}
                    />
                  </Form.Group>
                </Col>
              </Row>
            </Card.Text>
          </Card.Body>
        </Card>

        <br />
        <Button variant="contained" type="submit" color="primary">
          Submit
        </Button>
      </Form>

      <Modal
        style={{ zIndex: '1000000' }}
        show={showModal}
        onHide={handleClose}
      >
        <Modal.Header closeButton>
          <Modal.Title>Upload Image Form</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <UploadAndCropImage />
        </Modal.Body>
        <Modal.Footer>
          {/* <Button variant="secondary" onClick={handleClose}> */}
          {/*  Close */}
          {/* </Button> */}
          {/* <Button variant="primary" onClick={handleClose}> */}
          {/*  Save Changes */}
          {/* </Button> */}
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default NewCompanyMUI;
