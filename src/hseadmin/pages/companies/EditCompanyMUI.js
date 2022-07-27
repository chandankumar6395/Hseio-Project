import { Card, Col, Form, Row } from 'react-bootstrap';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, NavLink, useNavigate, useParams } from 'react-router-dom';
import NumberFormat from 'react-number-format';

import { toast } from 'react-toastify';
import { Helmet } from 'react-helmet-async';
import { Button, Grid, Typography } from '@mui/material';
// import Select from 'react-select';
// import { addBanner } from '../../store/actions/banners';
import validator from 'validator';
import { uploadFile } from '../../utils/NetworkUtils';
import URLConstants from '../../constants/URLConstants';
import {
  getCompany,
  loadCompanies,
  resetCompany,
  updateCompany,
} from '../../store/actions/companies';
import { CustomBreadcrumbs, CustomDivider } from '../../utils/MUIStyle';
import StateSelect from '../../components/widgets/StateSelect';
import CitySelect from '../../components/widgets/CitySelect';
import {
  COUNTRY_ID_USA,
  KEY_TYPE_ID,
  TYPE_COMPANY_OWNER,
  TYPE_SYSTEM_ADMIN,
} from '../../constants/Constants';

const EditCompanyMUI = () => {
  const [validated, setValidated] = useState(false);

  const history = useNavigate();

  const [name, setName] = useState('');
  // const [parentId, setParentId] = useState(-1);
  const [shortDesc, setShortDesc] = useState('');
  // const [longDesc, setLongDesc] = useState('');
  // const [emailAddress, setEmailAddress] = useState('');
  const [landline, setLandline] = useState('');
  const [fax, setFax] = useState('');
  const [mobile, setMobile] = useState('');
  const [website, setWebsite] = useState('');
  const [aboutUs, setAboutUs] = useState('');
  const [privacyPolicy, setPrivacyPolicy] = useState('');
  const [termsAndCondition, setTermsAndCondition] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  // eslint-disable-next-line no-unused-vars
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
  const [primaryAddressId, setPrimaryAddressId] = useState(-1);
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
  // const [
  //   selectedOnPrimaryContactStatusOption,
  //   setSelectedOnPrimaryContactStatusOption,
  // ] = useState({});
  // const [
  //   selectedOnAlternateContactStatusOption,
  //   setSelectedOnAlternateContactStatusOption,
  // ] = useState({});
  const dispatch = useDispatch();

  useEffect(() => {
    fetchCompanies();
    setCountryId(COUNTRY_ID_USA);
  }, []);

  const fetchCompanies = async () => {
    await dispatch(loadCompanies());
  };

  const company = useSelector((state) => state.company.company);
  // const users = useSelector((state) => state.user.users);
  // const logo = useSelector((state) => state.logo.logo);
  // const banner = useSelector((state) => state.banner.banner);

  const [logo, setLogo] = useState(null);
  // const [banner, setBanner] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    if (company !== null) {
      setName(company.name);
      setShortDesc(company.short_desc);
      // setLongDesc(company.long_desc);
      // setEmailAddress(company.email_address);
      setLandline(company.landline);
      setFax(company.fax);
      setMobile(company.mobile);
      setWebsite(company.website_url);
      setAboutUs(company.about_us_url);
      setPrivacyPolicy(company.privacy_policy_url);
      setTermsAndCondition(company.terms_and_condition_url);
      if (company.primary_address !== null) {
        setAddress1(company.primary_address.address1);
        setAddress2(company.primary_address.address2);
        setZipcode(company.primary_address.zipcode);
        setStateId(company.primary_address.state_id);
        setCountryId(company.primary_address.country_id);
        setCityId(company.primary_address.city_id);
      }
      setPrimaryAddressId(company.primary_address_id);
      setPrimaryContact(company.primary_contact_id);
      setAlternateContact(company.alternate_contact_id);
      // @ts-ignore
      // @ts-ignore
      if (company.primary_contact !== null) {
        setPrimaryContactFirstName(company.primary_contact.first_name);
        setPrimaryContactLastName(company.primary_contact.last_name);
        setPrimaryContactEmail(company.primary_contact.email_address);
        setPrimaryContactMobile(company.primary_contact.mobile);
        setPrimaryContactDesignation(company.primary_contact.designation_name);
        //  setPrimaryContactStatus(company.primary_contact.status_id);
        // setSelectedOnPrimaryContactStatusOption({
        //   value: company.primary_contact.status_id,
        //   label: STATUSES_DATA.find(
        //     (x) => x.id === company.primary_contact.status_id
        //   ).name,
        // });
      }
      if (company.alternate_contact !== null) {
        setAlternateContactFirstName(company.alternate_contact.first_name);
        setAlternateContactLastName(company.alternate_contact.last_name);
        setAlternateContactEmail(company.alternate_contact.email_address);
        setAlternateContactMobile(company.alternate_contact.mobile);
        setAlternateContactDesignation(
          company.alternate_contact.designation_name
        );
        // setAlternateContactStatus(company.alternate_contact.status_id);
        // setSelectedOnAlternateContactStatusOption({
        //   value: company.alternate_contact.status_id,
        //   label: STATUSES_DATA.find(
        //     (x) => x.id === company.alternate_contact.status_id
        //   ).name,
        // });
      }

      if (company.users.length > 0) {
        setUsername(company.users[0].username);
        // setPassword(company.users[0].password);
        setFirstName(company.users[0].first_name);
        setLastName(company.users[0].last_name);
        setEmail(company.users[0].email);
      }
      // setParentId(company.parent_id);
    }
  }, [company]);

  useEffect(() => {
    // console.log('param is ' + params.id);
    loadCompany();
  }, []);

  const loadCompany = async () => {
    await dispatch(getCompany(id));
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
    } else if (firstName === '') {
      toast('Please Enter First Name');
    } else if (lastName === '') {
      toast('Please Enter Last Name');
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
        id,
        name,
        short_desc: shortDesc,
        // long_desc: longDesc,
        // email_address: emailAddress,
        landline,
        fax,
        primary_logo_id: logo !== null ? logo.id : company.primary_logo_id,
        // primary_banner_id:
        //   banner !== null ? banner.id : company.primary_banner_id,
        mobile,
        website_url: website,
        about_us_url: aboutUs,
        privacy_policy_url: privacyPolicy,
        terms_and_condition_url: termsAndCondition,
        // parent_id: parentId === -1 ? null : parentId
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
          first_name: alternateContactFirstName,
          last_name: alternateContactLastName,
          email_address: alternateContactEmail,
          mobile: alternateContactMobile,
          designation_name: alternateContactDesignation,
          // status_id: alternateContactStatus,
        },
        primary_contact_id: primaryContact,
        alternate_contact_id: alternateContact,
        primary_address_id: primaryAddressId,
      };

      const user = {
        username,
        email: username,
        first_name: firstName,
        last_name: lastName,
      };

      if (
        !(password.trim() === '' || password === undefined || password === null)
      ) {
        user.password = password;
      }

      if (company.users.length > 0) {
        user.id = company.users[0].id;
        postData.users = [user];
      } else {
        user.active = 1;
        user.user_status_id = 1;
        postData.users = [user];
      }
      console.log(postData);

      postCompany(postData);
    }
  };

  const postCompany = async (data) => {
    try {
      await dispatch(updateCompany(data));

      const typeId = +localStorage.getItem(KEY_TYPE_ID);
      if (typeId === TYPE_SYSTEM_ADMIN) history('../../private/companies');
      if (typeId === TYPE_COMPANY_OWNER) {
        history('../../private/dashboard');
      }
      dispatch(resetCompany());
    } catch (error) {
      toast(error.message || 'Failed');
    }
  };

  const onNameChangeHandler = (event) => {
    // console.log(event.target.value);
    setName(event.target.value);
  };
  // const onParentChangeHandler = (selectedOption) => {
  //
  //     setParentId(+selectedOption.value);
  //     console.log(selectedOption.value);
  // }
  const onShortDescChangeHandler = (event) => {
    // console.log(event.target.value);
    setShortDesc(event.target.value);
  };

  // const onLongDescChangeHandler = (event) => {
  //   // console.log(event.target.value);
  //   setLongDesc(event.target.value);
  // };
  // const onEmailAddressChangeHandler = (event) => {
  //   // console.log(event.target.value);
  //   setEmailAddress(event.target.value);
  // };
  // const onLandlineChangeHandler = (event) => {
  //   // console.log(event.target.value);
  //   setLandline(event.target.value);
  // };
  // const onFaxChangeHandler = (event) => {
  //   // console.log(event.target.value);
  //   setFax(event.target.value);
  // };
  // const onMobileChangeHandler = (event) => {
  //   // console.log(event.target.value);
  //   setMobile(event.target.value);
  // };

  const onWebsiteChangeHandler = (event) => {
    // console.log(event.target.value);
    setWebsite(event.target.value);
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
  const onUsernameChangeHandler = (event) => {
    console.log(event.target.value);
    setUsername(event.target.value);
  };
  const onPasswordChangeHandler = (event) => {
    console.log(event.target.value);
    setPassword(event.target.value);
  };
  const onFirstNameChangeHandler = (event) => {
    const { value } = event.target;
    console.log('Input value: ', value);

    const re = /^[A-Za-z ]+$/;
    if (value === '' || re.test(value)) {
      setFirstName(value);
    }
  };

  const onLastNameChangeHandler = (event) => {
    const { value } = event.target;
    console.log('Input value: ', value);

    const re = /^[A-Za-z ]+$/;
    if (value === '' || re.test(value)) {
      setLastName(value);
    }
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
  //   // setPrimaryContactStatus(+selectedOption.value);
  //   // setSelectedOnPrimaryContactStatusOption(selectedOption);
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
  // const onAlternateContactMobileChangeHandler = (event) => {
  //   console.log(event.target.value);
  //   setAlternateContactMobile(event.target.value);
  // };
  const onAlternateContactDesignationChangeHandler = (event) => {
    console.log(event.target.value);
    setAlternateContactDesignation(event.target.value);
  };
  // const onAlternateContactStatusChangeHandler = (selectedOption) => {
  //   // setAlternateContactStatus(+selectedOption.value);
  //   // setSelectedOnAlternateContactStatusOption(selectedOption);
  // };

  // On file select (from the pop up)
  const onLogoFileChange = (event) => {
    // const {files} = event.target;
    //
    // Object.values(files).forEach(function (file, index) {
    //   // myformData.append(index, file);
    //   console.log('index = ', index, ` file = ${file}`);
    // });
    // console.log(event.target.files[0]);
    // Update the state
    onLogoFileUpload(event.target.files[0]);
  };

  // On file upload (click the upload button)
  const onLogoFileUpload = async (value) => {
    // Create an object of formData
    const formData = new FormData();

    // Update the formData object
    formData.append('logo', value, value.name);

    // await dispatch(addLogo(formData));

    const response = await uploadFile(
      `${URLConstants.LOGOS_URL}/upload.json`,
      formData
    );
    setLogo(response.data);
  };

  // On file select (from the pop up)
  // const onBannerFileChange = (event) => {
  //   onBannerFileUpload(event.target.files[0]);
  // };

  // On file upload (click the upload button)
  // const onBannerFileUpload = async (value) => {
  //   // Create an object of formData
  //   const formData = new FormData();
  //
  //   // Update the formData object
  //   formData.append('banner', value, value.name);
  //
  //   await dispatch(addBanner(formData));
  //   // await uploadFile(`${URLConstants.LOGOS_URL}/upload.json`, formData);
  //   const response = await uploadFile(
  //     `${URLConstants.BANNER_UPLOAD_URL}`,
  //     formData
  //   );
  //   setBanner(response.data);
  // };

  const renderLogo = () => {
    if (logo === null) {
      return (
        <>
          {company !== null && company.primary_logo !== null && (
            // eslint-disable-next-line jsx-a11y/img-redundant-alt
            <img
              src={company.primary_logo.url}
              // width={100}
              height={100}
              style={{ backgroundColor: 'grey', padding: '2px' }}
              alt="employee photo"
            />
          )}
        </>
      );
    }
    return (
      // eslint-disable-next-line react/jsx-no-comment-textnodes
      <>
        {/* eslint-disable-next-line jsx-a11y/img-redundant-alt */}
        <img
          src={logo.url}
          width={100}
          height={100}
          style={{ backgroundColor: 'grey', padding: '2px' }}
          alt="employee photo"
        />
      </>
    );
  };

  // const renderBanner = () => {
  //   if (banner === null) {
  //     return (
  //       <>
  //         {company !== null && company.primary_banner !== null && (
  //           // eslint-disable-next-line jsx-a11y/img-redundant-alt
  //           <img
  //             src={company.primary_banner.url}
  //             height={100}
  //             style={{ backgroundColor: 'grey', padding: '2px' }}
  //             alt="employee photo"
  //           />
  //         )}
  //       </>
  //     );
  //   }
  //   return (
  //     // eslint-disable-next-line react/jsx-no-comment-textnodes
  //     <>
  //       {/* eslint-disable-next-line jsx-a11y/img-redundant-alt */}
  //       <img
  //         src={banner.url}
  //         height={100}
  //         width="auto"
  //         style={{ backgroundColor: 'grey', padding: '2px' }}
  //         alt="employee photo"
  //       />
  //     </>
  //   );
  // };

  const maxLengthCheck = (object) => {
    if (object.target.value.length > object.target.maxLength) {
      object.target.value = object.target.value.slice(
        0,
        object.target.maxLength
      );
    }
  };
  // const maxLongDescCheck = (object) => {
  //   if (object.target.value.length > object.target.maxLength) {
  //     object.target.value = object.target.value.slice(
  //       0,
  //       object.target.maxLength
  //     );
  //   }
  // };

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
      <Helmet title="Edit Company" />

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
            <Typography>Edit Company</Typography>
          </CustomBreadcrumbs>
        </Grid>
        <Grid item>
          <>
            <Button
              variant="contained"
              type="button"
              color="primary"
              style={{
                float: 'right',
              }}
              onClick={() => {
                history(-1);
              }}
            >
              Back
            </Button>
          </>
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
                      value={name}
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
                      disabled
                      type="email"
                      placeholder="Your Email Address *"
                      onChange={onUsernameChangeHandler}
                      value={username}
                    />
                  </Form.Group>
                </Col>

                <Col md={6}>
                  {/* Password Field */}
                  <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Login Password *</Form.Label>
                    <Form.Control
                      type="password"
                      placeholder="Password *"
                      onChange={onPasswordChangeHandler}
                      value={password}
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
                      placeholder="First Name *"
                      onChange={onFirstNameChangeHandler}
                      value={firstName}
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
                      type="text"
                      placeholder="Last Name *"
                      onChange={onLastNameChangeHandler}
                      value={lastName}
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
                      value={address1}
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
                      value={address2}
                    />
                  </Form.Group>
                </Col>
                {/* State name field */}
                <Col md={6}>
                  <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>State</Form.Label>
                    {company && (
                      <StateSelect
                        onChange={(value) => setStateId(value)}
                        countryId={countryId}
                        entity={
                          company.primary_address
                            ? company.primary_address.state
                            : null
                        }
                      />
                    )}
                  </Form.Group>
                </Col>
                {/* City name field */}
                <Col md={6}>
                  <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>City</Form.Label>
                    {company && (
                      <CitySelect
                        onChange={(value) => setCityId(value)}
                        stateId={stateId}
                        entity={
                          company.primary_address
                            ? company.primary_address.city
                            : null
                        }
                      />
                    )}
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
                      value={zipcode}
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
                      value={website}
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
                {/*      value={emailAddress} */}
                {/*    /> */}
                {/*  </Form.Group> */}
                {/* </Col> */}
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
                  {/* short Desc */}
                  <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Short Desc</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Short Desc"
                      maxLength="255"
                      onInput={maxShortDescCheck}
                      onChange={onShortDescChangeHandler}
                      value={shortDesc}
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
                {/*      value={longDesc} */}
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
                      onChange={onPrimaryContactFirstNameChangeHandler}
                      value={primaryContactFirstName}
                    />
                  </Form.Group>
                </Col>
                <Col md={6}>
                  {/* primary contact Last Name */}
                  <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Last Name</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Last Name"
                      onChange={onPrimaryContactLastNameChangeHandler}
                      value={primaryContactLastName}
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
                      value={primaryContactEmail}
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
                        console.log(value.value);
                        setPrimaryContactMobile(value.value);
                      }}
                      value={primaryContactMobile}
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
                      value={primaryContactDesignation}
                    />
                  </Form.Group>
                </Col>
                {/* <Col md={6}> */}
                {/*  /!* primary contact Status *!/ */}
                {/*  <Form.Group className="mb-3" controlId="formBasicEmail"> */}
                {/*    <Form.Label>Primary Contact Status</Form.Label> */}
                {/*    <Select */}
                {/*      required */}
                {/*      options={STATUSES_DATA.map((status) => { */}
                {/*        return { value: status.id, label: status.name }; */}
                {/*      })} */}
                {/*      onChange={onPrimaryContactStatusChangeHandler} */}
                {/*      value={selectedOnPrimaryContactStatusOption} */}
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
                  {/* Alternate contact  Field */}
                  <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>First Name</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="First Name"
                      onChange={onAlternateContactFirstNameChangeHandler}
                      value={alternateContactFirstName}
                    />
                  </Form.Group>
                </Col>
                <Col md={6}>
                  {/* Alternate contact Last Name */}
                  <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Last Name</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Last Name"
                      onChange={onAlternateContactLastNameChangeHandler}
                      value={alternateContactLastName}
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
                      value={alternateContactEmail}
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
                        console.log(value.value);
                        setAlternateContactMobile(value.value);
                      }}
                      value={alternateContactMobile}
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
                      value={alternateContactDesignation}
                    />
                  </Form.Group>
                </Col>
                {/* <Col md={6}> */}
                {/*  /!* Alternate contact Status *!/ */}
                {/*  <Form.Group className="mb-3" controlId="formBasicEmail"> */}
                {/*    <Form.Label>Alternate Contact Status</Form.Label> */}
                {/*    <Select */}
                {/*      required */}
                {/*      options={STATUSES_DATA.map((status) => { */}
                {/*        return { value: status.id, label: status.name }; */}
                {/*      })} */}
                {/*      onChange={onAlternateContactStatusChangeHandler} */}
                {/*      value={selectedOnAlternateContactStatusOption} */}
                {/*    /> */}
                {/*  </Form.Group> */}
                {/* </Col> */}
              </Row>
            </Card.Text>
          </Card.Body>
        </Card>
        <br />
        <Button variant="contained" type="submit" color="primary">
          Submit
        </Button>
      </Form>
    </>
  );
};

export default EditCompanyMUI;
