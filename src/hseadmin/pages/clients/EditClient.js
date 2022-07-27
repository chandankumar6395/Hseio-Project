import { Card, Col, Form, Row } from 'react-bootstrap';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, NavLink, useNavigate, useParams } from 'react-router-dom';
import NumberFormat from 'react-number-format';
// import Select from 'react-select';
import { Helmet } from 'react-helmet-async';
import { Button, Grid, Typography } from '@mui/material';
import { toast } from 'react-toastify';
import validator from 'validator';
// import { addLogo } from '../../store/actions/logos';
// import { addBanner } from '../../store/actions/banners';
// import Select from 'react-select';
import { loadCompanies } from '../../store/actions/companies';
import {
  COUNTRY_ID_USA,
  KEY_COMPANY_ID,
  // STATUSES_DATA,
} from '../../constants/Constants';
import CompanySelect from '../../components/widgets/CompanySelect';
import {
  getClient,
  resetClient,
  updateClient,
} from '../../store/actions/clients';
import StateSelect from '../../components/widgets/StateSelect';
import CitySelect from '../../components/widgets/CitySelect';
import CustomMultiSelect from '../../components/widgets/CustomMultiSelect';
import URLConstants from '../../constants/URLConstants';
import { CustomBreadcrumbs, CustomDivider } from '../../utils/MUIStyle';
import { uploadFile } from '../../utils/NetworkUtils';

const EditClient = () => {
  const localCompanyId = localStorage.getItem(KEY_COMPANY_ID);
  const [validated, setValidated] = useState(false);

  const history = useNavigate();

  const [name, setName] = useState('');
  const [address1, setAddress1] = useState('');
  const [address2, setAddress2] = useState('');
  const [zipcode, setZipcode] = useState('');
  const [divisions, setDivisions] = useState([]);
  const [divisionOptions, setDivisionOptions] = useState([]);
  const [companyId, setCompanyId] = useState('');
  const [shortDesc, setShortDesc] = useState('');
  const [longDesc, setLongDesc] = useState('');
  const [countryId, setCountryId] = useState(-1);
  const [stateId, setStateId] = useState(-1);
  const [cityId, setCityId] = useState(-1);
  const [emailAddress, setEmailAddress] = useState('');
  const [landline, setLandline] = useState('');
  const [fax, setFax] = useState('');
  const [website, setWebsite] = useState('');
  // const [primaryLogoId, setPrimaryLogoId] = useState(-1);
  const [primaryBannerId, setPrimaryBannerId] = useState(-1);
  // const [primaryAddressId, setPrimaryAddressId] = useState('');
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
  const [primaryContact, setPrimaryContact] = useState([]);
  const [alternateContact, setAlternateContact] = useState([]);
  // const [
  //   selectedOnAlternateContactStatusOption,
  //   setSelectedAlternateContactStatusOption,
  // ] = useState({});
  // const [
  //   selectedOnPrimaryConstantStatusOption,
  //   setSelectedPrimaryContactStatusOption,
  // ] = useState({});
  const dispatch = useDispatch();

  const client = useSelector((state) => state.client.client);
  // const logo = useSelector((state) => state.logo.logo);
  const [logo, setLogo] = useState(null);
  const banner = useSelector((state) => state.banner.banner);
  const { id } = useParams();
  // const [selectedCompanyOption, setSelectedCompanyOption] = useState({});
  const companies = useSelector((state) => state.company.companies);

  useEffect(() => {
    if (client != null) {
      setName(client.name);
      setAddress1(client.primary_address.address1);
      setAddress2(client.primary_address.address2);
      setZipcode(client.primary_address.zipcode);
      setShortDesc(client.short_desc);
      setLongDesc(client.long_desc);
      setCountryId(client.primary_address.country_id);
      setCityId(client.primary_address.city_id);
      setStateId(client.primary_address.state_id);
      setEmailAddress(client.email_address);
      setCompanyId(client.company_id);
      setLandline(client.landline);
      setFax(client.fax);
      setWebsite(client.website_url);
      // setParentId(client.parent_id);
      // TODO we need to fix code where we can map clients for the companies
      // setSelectedCompanyOption({
      //   value: client.company.id,
      //   label: client.company.name
      // });
      // setPrimaryLogoId(client.primary_logo_id);
      setPrimaryBannerId(client.primary_banner_id);
      setPrimaryContact(client.primary_contact_id);
      setAlternateContact(client.alternate_contact_id);

      if (client.primary_contact !== null) {
        setPrimaryContactFirstName(client.primary_contact.first_name);
        setPrimaryContactLastName(client.primary_contact.last_name);
        setPrimaryContactMobile(client.primary_contact.mobile);
        setPrimaryContactEmail(client.primary_contact.email_address);
        setPrimaryContactDesignation(client.primary_contact.designation_name);
        // setPrimaryContactStatus(client.primary_contact.status_id);

        // setSelectedPrimaryContactStatusOption({
        //         //   value: client.primary_contact.status_id,
        //         //   label: STATUSES_DATA.find(
        //         //     (x) => x.id === client.primary_contact.status_id
        //         //   ).name,
        //         // });
      }
      if (client.alternate_contact !== null) {
        setAlternateContactFirstName(client.alternate_contact.first_name);
        setAlternateContactLastName(client.alternate_contact.last_name);
        setAlternateContactMobile(client.alternate_contact.mobile);
        setAlternateContactEmail(client.alternate_contact.email_address);
        setAlternateContactDesignation(
          client.alternate_contact.designation_name
        );
        // setAlternateContactStatus(client.alternate_contact.status_id);

        // setSelectedAlternateContactStatusOption({
        //   value: client.alternate_contact.status_id,
        //   label: STATUSES_DATA.find(
        //     (x) => x.id === client.alternate_contact.status_id
        //   ).name,
        // });

        setDivisions(client.divisions);

        const localOptions = [];

        client.divisions.forEach((user) => {
          localOptions.push({
            id: user.id,
          });
        });

        setDivisionOptions(localOptions);
      }
    }
  }, [client]);

  useEffect(() => {
    // console.log('param is ' + params.id);
    loadClient();
    setCountryId(COUNTRY_ID_USA);
  }, []);

  const loadClient = async () => {
    await dispatch(getClient(id));
    await dispatch(loadCompanies(1, '', 'name', 'asc', 100));
  };

  const onClientSubmit = (event) => {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }

    setValidated(true);
    event.preventDefault();
    if (name === '') {
      toast('Please Enter Name');
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
        id,
        name,
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
          mobile: primaryContactMobile,
          email_address: primaryContactEmail,
          designation_name: primaryContactDesignation,
        },
        alternate_contact: {
          first_name:
            alternateContactFirstName === '' ? ' ' : alternateContactFirstName,
          last_name:
            alternateContactLastName === '' ? ' ' : alternateContactLastName,
          mobile: alternateContactMobile,
          email_address: alternateContactEmail,
          designation_name: alternateContactDesignation,
        },
        divisions: divisionOptions,
        short_desc: shortDesc,
        long_desc: longDesc,
        email_address: emailAddress,
        landline,
        fax,
        primary_logo_id: logo !== null ? logo.id : client.primary_logo_id,
        primary_banner_id: banner !== null ? banner.id : primaryBannerId,
        company_id: companyId,
        website_url: website,
        // primary_address_id: primaryAddressId,
        primary_contact_id: primaryContact,
        alternate_contact_id: alternateContact,
      };

      if (client.primary_address != null) {
        postData.primary_address = {
          id: client.primary_address.id,
          name: 'Client Address',
          address1,
          address2,
          city_id: cityId,
          state_id: stateId,
          country_id: countryId,
          zipcode,
        };
      } else {
        postData.primary_address = {
          name: 'Client Address',
          address1,
          address2,
          city_id: cityId,
          state_id: stateId,
          country_id: countryId,
          zipcode,
        };
      }
      postClient(postData);
    }
  };

  const postClient = async (data) => {
    await dispatch(updateClient(data));
    history('../../private/clients');
    setTimeout(() => {
      dispatch(resetClient());
    }, 2000);
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
  const onZipcodeChangeHandler = (event) => {
    // console.log(event.target.value);
    setZipcode(event.target.value);
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
  // const onPrimaryContactMobileChangeHandler = (event) => {
  //   console.log(event.target.value);
  //   setPrimaryContactMobile(event.target.value);
  // };
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
  //   setSelectedPrimaryContactStatusOption(selectedOption);
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
  // const onAlternateContactMobileChangeHandler = (event) => {
  //   console.log(event.target.value);
  //   setAlternateContactMobile(event.target.value);
  // };
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
  //   setSelectedAlternateContactStatusOption(selectedOption);
  // };
  // On file select (from the pop up)
  const onLogoFileChange = (event) => {
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

  // // On file select (from the pop up)
  // const onBannerFileChange = (event) => {
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

  const renderLogo = () => {
    if (logo === null) {
      return (
        <>
          {client !== null && client.primary_logo !== null && (
            // eslint-disable-next-line jsx-a11y/img-redundant-alt
            <img
              src={client.primary_logo.url}
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
    }
    return (
      // eslint-disable-next-line react/jsx-no-comment-textnodes
      <>
        {/* eslint-disable-next-line jsx-a11y/img-redundant-alt */}
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
      </>
    );
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

  // const renderBanner = () => {
  //   if (banner === null) {
  //     return (
  //       <>
  //         {client !== null && client.primary_banner !== null && (
  //           // eslint-disable-next-line jsx-a11y/img-redundant-alt
  //           <img
  //             src={client.primary_banner.url}
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

  return (
    <>
      <Helmet title="Edit Client" />

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
            <Typography>Edit Client</Typography>
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
                      value={name}
                    />
                    <Form.Control.Feedback type="invalid">
                      Please provide a valid name.
                    </Form.Control.Feedback>
                  </Form.Group>
                </Col>
                <Col md={6}>
                  <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Division</Form.Label>
                    <CustomMultiSelect
                      params={{ url: URLConstants.DIVISIONS_URL }}
                      onChange={(value) => {
                        setDivisionOptions(value);
                      }}
                      entities={divisions}
                    />

                    <Form.Control.Feedback type="invalid">
                      Please provide a valid Audit Task.
                    </Form.Control.Feedback>
                  </Form.Group>
                </Col>
                <Col md={6}>
                  {/* Adderss Field */}
                  <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Address 1</Form.Label>
                    <Form.Control
                      required
                      type="text"
                      placeholder="Address 1"
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
                      required
                      type="text"
                      placeholder="Address 2"
                      onChange={onAddress2ChangeHandler}
                      value={address2}
                    />
                    <Form.Control.Feedback type="invalid">
                      Please provide a valid address name.
                    </Form.Control.Feedback>
                  </Form.Group>
                </Col>
                {localCompanyId === null && (
                  <Col md={6}>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                      <Form.Label>Company </Form.Label>
                      {companies !== null && (
                        <CompanySelect
                          onChange={(value) => setCompanyId(value)}
                          // entity={client.companies[0]} // TODO : fix it later
                          entity={null}
                        />
                      )}
                      <Form.Control.Feedback type="invalid">
                        Please provide a valid name.
                      </Form.Control.Feedback>
                    </Form.Group>
                  </Col>
                )}
                <Col md={6}>
                  {/* State name field */}
                  <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>State</Form.Label>
                    {client && (
                      <StateSelect
                        onChange={(value) => setStateId(value)}
                        countryId={countryId}
                        entity={
                          client.primary_address
                            ? client.primary_address.state
                            : null
                        }
                      />
                    )}
                  </Form.Group>
                </Col>
                <Col md={6}>
                  {/* City name field */}
                  <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>City</Form.Label>
                    {client && (
                      <CitySelect
                        onChange={(value) => setCityId(value)}
                        stateId={stateId}
                        entity={
                          client.primary_address
                            ? client.primary_address.city
                            : null
                        }
                      />
                    )}
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
                <Col md={6}>
                  {/* Email */}
                  <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Email Address</Form.Label>
                    <Form.Control
                      type="email"
                      placeholder="Email Address"
                      onChange={onEmailAddressChangeHandler}
                      value={emailAddress}
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
                      value={longDesc}
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
                      placeholder="First Name"
                      onChange={onPrimaryContactFirstNameChangeHandler}
                      value={primaryContactFirstName}
                    />
                  </Form.Group>
                </Col>
                <Col md={6}>
                  {/* primary contact Last Name Field */}
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
                  {/* primary contact Designation Field */}
                  <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Title</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Title "
                      onChange={onPrimaryContactDesignationChangeHandler}
                      value={primaryContactDesignation}
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
                        console.log(value.value);
                        setPrimaryContactMobile(value.value);
                      }}
                      value={primaryContactMobile}
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
                      value={primaryContactEmail}
                    />
                  </Form.Group>
                </Col>
                {/* <Col md={6}> */}
                {/*  /!* primary contact status Field *!/ */}
                {/*  <Form.Group className="mb-3" controlId="formBasicEmail"> */}
                {/*    <Form.Label>Primary Contact Status</Form.Label> */}
                {/*    <Select */}
                {/*      required */}
                {/*      options={STATUSES_DATA.map((user) => { */}
                {/*        return { value: user.id, label: user.name }; */}
                {/*      })} */}
                {/*      value={selectedOnPrimaryConstantStatusOption} */}
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
                      placeholder="First Name"
                      onChange={onAlternateContactFirstNameChangeHandler}
                      value={alternateContactFirstName}
                    />
                  </Form.Group>
                </Col>
                <Col md={6}>
                  {/* Alternate contact Last Name Field */}
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
                  {/* Alternate contact Designation Field */}
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
                        console.log(value.value);
                        setAlternateContactMobile(value.value);
                      }}
                      value={alternateContactMobile}
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
                      value={alternateContactEmail}
                    />
                  </Form.Group>
                </Col>
                {/* <Col md={6}> */}
                {/*  /!* Alternate contact Status Field *!/ */}
                {/*  <Form.Group className="mb-3" controlId="formBasicEmail"> */}
                {/*    <Form.Label>Alternate Contact Status</Form.Label> */}
                {/*    <Select */}
                {/*      required */}
                {/*      options={STATUSES_DATA.map((user) => { */}
                {/*        return { value: user.id, label: user.name }; */}
                {/*      })} */}
                {/*      value={selectedOnAlternateContactStatusOption} */}
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

export default EditClient;
