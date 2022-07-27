import { Card, Col, Form, Row } from 'react-bootstrap';
import React, { useEffect, useRef, useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import Select from 'react-select';
import { toast } from 'react-toastify';
import NumberFormat from 'react-number-format';

import { useSelector } from 'react-redux';
import { Helmet } from 'react-helmet-async';
import { Button, Grid, Typography } from '@mui/material';
import validator from 'validator';
import {
  KEY_COMPANY_ID,
  USER_ROLLS_DATA,
  STATUSES_DATA,
  COUNTRY_ID_USA,
  YES_NO_DATA,
} from '../../constants/Constants';
import { fetchPOST, uploadFile } from '../../utils/NetworkUtils';
import URLConstants from '../../constants/URLConstants';
import DivisionSelect from '../../components/widgets/DivisionSelect';
import CompanySelect from '../../components/widgets/CompanySelect';
import NewDivisionModal from '../../components/modals/NewDivisionModal';
import { CustomBreadcrumbs, CustomDivider } from '../../utils/MUIStyle';
import StateSelect from '../../components/widgets/StateSelect';
import CitySelect from '../../components/widgets/CitySelect';
import CustomManualDropDownSelect from '../../components/widgets/CustomManualDropDownSelect';
import CustomManualDropDownMultiSelect from '../../components/widgets/CustomManualDropDownMultiSelect';

const NewEmployeeMUI = () => {
  const localCompanyId = localStorage.getItem(KEY_COMPANY_ID);

  // const localDivisionId = localStorage.getItem(KEY_DIVISION_ID);

  // this value should always -1 if the user is logged via system admin and company owner.
  const localDivisionId = useSelector((state) => state.auth.selectedDivision);

  const emailRef = useRef();
  // const photo = useSelector((state) => state.photoReducers.photo);
  const [photo, setPhoto] = useState(null);
  const [validated, setValidated] = useState(false);

  const [showNewDivisionModal, setShowNewDivisionModal] = useState(false);
  // const [newDesignationName, setNewDesignationName] = useState('');

  // const [isLoading, setIsLoading] = useState(false);

  const history = useNavigate();

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  // const [gender, setGender] = useState('');
  const [companyId, setCompanyId] = useState(-1);
  // const [empNumber, setEmpNumber] = useState('');
  // const [region, setRegion] = useState('');
  const [personalMobileNumber, setPersonalMobileNumber] = useState('');
  const [personalEmailAddress, setPersonalEmailAddress] = useState('');
  // const [officialMobileNumber, setOfficialMobileNumber] = useState('');
  // const [officialEmailAddress, setOfficialEmailAddress] = useState('');
  const [ssn, setSsn] = useState('');
  const [hiddenSSN, setHiddenSSN] = useState('');
  const [divisionId, setDivisionId] = useState('');
  const [joiningDate, setJoiningDate] = useState('');
  const [dateOfBirth, setDateOfBirth] = useState('');
  const [designationId, setDesignationId] = useState('');
  const [employeeStatusId, setEmployeeStatusId] = useState('');
  const [address1, setAddress1] = useState('');
  const [address2, setAddress2] = useState('');
  const [zipcode, setZipcode] = useState('');
  const [countryId, setCountryId] = useState(-1);
  const [stateId, setStateId] = useState(null);
  const [cityId, setCityId] = useState(null);
  const [driverLicenseStateId, setDriverLicenseStateId] = useState(null);
  const [driverLicenseNumber, setDriverLicenseNumber] = useState('');
  const [driverLicenseExpiration, setDriverLicenseExpiration] = useState('');
  const [medicalCardExpiration, setMedicalCardExpiration] = useState('');
  const [emergencyContactName, setEmergencyContactName] = useState('');
  const [emergencyContactNumber, setEmergencyContactNumber] = useState('');
  const [cdl, setCdl] = useState(0);
  const [cdlClassId, setCdlId] = useState('');
  const [medicalCard, setMedicalCard] = useState(0);
  const [randomPool, setRandomPool] = useState(0);
  const [typeOptions, setTypeOptions] = useState([]);
  const [selectedPhotoFile, setSelectedPhotoFile] = useState('');
  console.log('CDL Details====', cdlClassId);
  useEffect(() => {
    console.log('NewEmployee useEffect = ', localDivisionId);
    setCountryId(COUNTRY_ID_USA);
  }, [localDivisionId]);

  const onEmployeeSubmit = (event) => {
    const form = event.currentTarget;
    event.preventDefault();
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    } else if (localCompanyId === null && companyId === -1) {
      toast.error('Please select a company' || 'Failed');
    }

    const localTypes = [];

    typeOptions.forEach((type) => {
      localTypes.push({ id: type.value });
    });

    if (firstName === '') {
      toast('Please Enter First Name');
    } else if (lastName === '') {
      toast('Please Enter Last Name');
    } else if (email !== null && !validator.isEmail(email)) {
      toast('Email Address is not valid');
    } else if (password === '') {
      toast('Please Enter Password');
    } else if (typeOptions.length === 0) {
      toast('Please Select Program Level');
    } else if (employeeStatusId === '') {
      toast('Please Select Employee Status');
    } else if (
      personalEmailAddress !== null &&
      personalEmailAddress !== '' &&
      !validator.isEmail(personalEmailAddress)
    ) {
      toast('Personal Email Address is not valid');
    } else {
      const postData = {
        company_id: localCompanyId !== null ? localCompanyId : companyId,
        user: {
          username: email,
          password,
          user_status_id: 1,
          first_name: firstName,
          last_name: lastName,
          email,
          active: 1,
          types: localTypes,
          primary_company_id:
            localCompanyId !== null ? localCompanyId : companyId,
          primary_division_id:
            localDivisionId !== -1 ? localDivisionId : divisionId,
        },
        employee_status_id: employeeStatusId,
        // emp_number: empNumber,
        // region,
        personal_mobile_number: personalMobileNumber,
        personal_email_address: personalEmailAddress,
        // official_mobile_number: officialMobileNumber,
        // official_email_address: officialEmailAddress,
        ssn,
        primary_division_id:
          localDivisionId !== -1 ? localDivisionId : divisionId,
        joining_date: joiningDate,
        date_of_birth: dateOfBirth,
        on_payroll: 0,
        gender: 0,
        primary_photo_id: photo !== null ? photo.id : null,
        primary_address: {
          name: 'Address',
          address1: address1 === '' ? ' ' : address1,
          address2,
          zipcode,
          country_id: countryId,
          state_id: stateId,
          city_id: cityId,
        },
        emergency_contact_name: emergencyContactName,
        emergency_contact_phone: emergencyContactNumber,
        designation_id: designationId,
        driver_license_state_id: driverLicenseStateId,
        driver_license_number: driverLicenseNumber,
        driver_license_expiration: driverLicenseExpiration,
        cdl: cdl,
        medical_card: medicalCard,
        medical_card_expiration: medicalCardExpiration,
        random_pool: randomPool,
        cdl_classes: cdlClassId,
      };
      console.log(`data is ${JSON.stringify(postData)}`);
      postEmployee(postData);
    }
    setValidated(true);
    event.preventDefault();
  };

  const postEmployee = async (data) => {
    try {
      // setIsLoading(true);
      // await dispatch(addEmployees(data));
      const response = await fetchPOST(URLConstants.EMPLOYEES_URL, data);
      console.log(response.data);
      // setIsLoading(false);
      history('../../private/employees');
    } catch (error) {
      // setIsLoading(false);
      toast.error(error.message || 'Failed');
      emailRef.current.focus();
    }
  };

  // const onEmpNumberChangeHandler = (event) => {
  //   // console.log(event.target.value);
  //   setEmpNumber(event.target.value);
  // };

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

  const onEmailChangeHandler = (event) => {
    // console.log(event.target.value);
    setEmail(event.target.value);
  };
  const onPasswordChangeHandler = (event) => {
    // console.log(event.target.value);
    setPassword(event.target.value);
  };

  // const onRegionChangeHandler = (event) => {
  //   // console.log(event.target.value);
  //   setRegion(event.target.value);
  // };

  const onPersonalEmailAddressChangeHandler = (event) => {
    // console.log(event.target.value);
    setPersonalEmailAddress(event.target.value);
  };

  // const onOfficialEmailAddressChangeHandler = (event) => {
  //   // console.log(event.target.value);
  //   setOfficialEmailAddress(event.target.value);
  // };
  const onSsnChangeHandler = (event) => {
    // console.log(event.target.value);
    const finalValue = event.target.value;
    const newSSN = ssn + finalValue.charAt(finalValue.length - 1);
    if (finalValue.length === 0) {
      setSsn('');
    } else {
      setSsn(newSSN);
    }

    const { value } = event.target;
    console.log('ssn = ', ssn);
    console.log(value);
    setHiddenSSN(maskSSN(value));

    // setHiddenSSN(value);
  };

  const maskSSN = (value) => {
    if (value.length > 4) {
      const cardnumber = value;
      const last4 = cardnumber.substring(cardnumber.length - 4);

      const mask = cardnumber
        .substring(0, cardnumber.length - 4)
        .replace(/\d/g, '*');
      console.log(mask + last4);
      console.log(hiddenSSN);
      return mask + last4;
    }
    return value;
  };

  const onDivisionChangeHandler = (value) => {
    // console.log(event.target.value);
    setDivisionId(value);
  };

  const onJoiningDateChangeHandler = (event) => {
    // console.log(event.target.value);
    setJoiningDate(event.target.value);
  };

  const onDateOfBirthChangeHandler = (event) => {
    // console.log(event.target.value);
    setDateOfBirth(event.target.value);
  };

  // const onOnPayrollChangeHandler = (selectedOption) => {
  //   setOnPayroll(+selectedOption.value);
  //   // console.log(selectedOption.value);
  // };
  // const onGenderChangeHandler = (selectedOption) => {
  //   setGender(selectedOption.value);
  //   // console.log(selectedOption.value);
  // };
  const onEmployeeStatusIdChangeHandler = (selectedOption) => {
    setEmployeeStatusId(+selectedOption.value);
    console.log(selectedOption.value);
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

  const onCompanyChangeHandler = (value) => {
    setCompanyId(value);
    // console.log(selectedOption.value);
  };

  const onEmergencyContactName = (event) => {
    // console.log(event.target.value);
    setEmergencyContactName(event.target.value);
  };

  const onDriverLicenseExpirationDateChangeHandler = (event) => {
    // console.log(event.target.value);
    setDriverLicenseExpiration(event.target.value);
  };

  const onCdlChangeHandler = (selectedOption) => {
    setCdl(+selectedOption.value);
    // console.log(cdl);
    // console.log(selectedOption.value);
  };

  const onMedicalCardChangeHandler = (selectedOption) => {
    setMedicalCard(+selectedOption.value);
    // console.log(medicalCard);
  };

  const onMedicalCardExpirationDateChangeHandler = (event) => {
    // console.log(event.target.value);
    setMedicalCardExpiration(event.target.value);
  };

  const onRandomPoolChangeHandler = (selectedOption) => {
    setRandomPool(+selectedOption.value);
    // console.log(randomPool);
  };

  const onDriverLicenseNumberChangeHandler = (event) => {
    setDriverLicenseNumber(event.target.value);
    // console.log(selectedOption.value);
  };

  const maxLengthCheck = (object) => {
    if (object.target.value.length > object.target.maxLength) {
      object.target.value = object.target.value.slice(
        0,
        object.target.maxLength
      );
    }
  };

  const maxSSNLengthCheck = (object) => {
    if (object.target.value.length > object.target.maxLength) {
      object.target.value = object.target.value.slice(
        0,
        object.target.maxLength
      );
    }
  };

  // On file select (from the pop up)
  const onLogoFileChange = (event) => {
    // const { files } = event.target;
    setSelectedPhotoFile(event.target.files[0]);
    console.log(selectedPhotoFile);
    onLogoFileUpload(event.target.files[0]);
  };

  // On file upload (click the upload button)
  const onLogoFileUpload = async (value) => {
    // Create an object of formData
    const formData = new FormData();

    // Update the formData object
    formData.append('photo', value, value.name);

    try {
      const response = await uploadFile(
        `${URLConstants.PHOTOS_URL}/upload.json`,
        formData
      );
      setPhoto(response.data);
    } catch (error) {
      toast.error('Unable to upload file ' || 'Failed');
    }

    // await dispatch(addPhoto(formData));
  };

  const onTypeChangeHandler = (selectedOption) => {
    setTypeOptions(selectedOption);
    console.log(typeOptions);
    console.log(selectedOption);
  };

  return (
    <>
      <Helmet title="New Employee" />

      <Grid justifyContent="space-between" container spacing={10}>
        <Grid item>
          <Typography variant="h3" gutterBottom display="inline">
            Employees
          </Typography>

          <CustomBreadcrumbs aria-label="Breadcrumb" mt={2}>
            <Link component={NavLink} to="/">
              Dashboard
            </Link>
            <Link component={NavLink} to="/private/employees">
              Employees
            </Link>
            <Typography>Add Employee</Typography>
          </CustomBreadcrumbs>
        </Grid>
        <Grid item>
          <div>
            <NavLink to="/private/employees">
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
            <Form noValidate validated={validated} onSubmit={onEmployeeSubmit}>
              <Row>
                <Col md={12}>
                  {photo !== null && (
                    // eslint-disable-next-line jsx-a11y/img-redundant-alt
                    <img
                      src={photo.url}
                      width={100}
                      height={100}
                      style={{ backgroundColor: 'grey', padding: '2px' }}
                      alt="employee photo"
                    />
                  )}
                  <Form.Group controlId="formFile" className="mb-3">
                    <Form.Label>Employee Photo</Form.Label>
                    <Form.Control type="file" onChange={onLogoFileChange} />
                  </Form.Group>
                </Col>

                {/* Company id Field */}
                {localCompanyId === null && (
                  <Col md={6}>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                      <Form.Label>Company *</Form.Label>
                      <CompanySelect onChange={onCompanyChangeHandler} />
                      <Form.Control.Feedback type="invalid">
                        Please provide a valid name.
                      </Form.Control.Feedback>
                    </Form.Group>
                  </Col>
                )}

                {/* Division Field */}
                {localDivisionId === -1 && (
                  <Col md={6}>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                      <Form.Label>Division</Form.Label>
                      <DivisionSelect
                        onChange={onDivisionChangeHandler}
                        companyId={
                          localCompanyId !== null ? localCompanyId : companyId
                        }
                      />
                      {/* <Button */}
                      {/*  className="btn-sm" */}
                      {/*  variant="primary" */}
                      {/*  type="button" */}
                      {/*  style={{ */}
                      {/*    marginLeft: '10px', */}
                      {/*    position: 'absolute', */}
                      {/*    right: '50px', */}
                      {/*    top: '36px' */}
                      {/*  }} */}
                      {/*  onClick={() => { */}
                      {/*    setShowNewDivisionModal(true); */}
                      {/*  }} */}
                      {/* > */}
                      {/*  <i className="fas fa-plus" /> */}
                      {/* </Button> */}
                      <Form.Control.Feedback type="invalid">
                        Please provide a valid division.
                      </Form.Control.Feedback>
                    </Form.Group>
                  </Col>
                )}

                {/* First Name Field */}
                <Col md={6}>
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
                      Please provide a valid name.
                    </Form.Control.Feedback>
                  </Form.Group>
                </Col>

                {/* Last Name Field */}
                <Col md={6}>
                  <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Last Name *</Form.Label>
                    <Form.Control
                      required
                      type="text"
                      value={lastName}
                      placeholder="Last Name *"
                      onChange={onLastNameChangeHandler}
                    />
                    <Form.Control.Feedback type="invalid">
                      Please provide a valid name.
                    </Form.Control.Feedback>
                  </Form.Group>
                </Col>

                {/* Email Field */}
                <Col md={6}>
                  <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Email *</Form.Label>
                    <Form.Control
                      ref={emailRef}
                      required
                      type="email"
                      placeholder="Your Email Address*"
                      onChange={onEmailChangeHandler}
                    />
                    <Form.Control.Feedback type="invalid">
                      Please provide a valid name.
                    </Form.Control.Feedback>
                  </Form.Group>
                </Col>

                {/* Password Field */}
                <Col md={6}>
                  <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Password *</Form.Label>
                    <Form.Control
                      required
                      type="password"
                      placeholder="Password *"
                      onChange={onPasswordChangeHandler}
                    />
                    <Form.Control.Feedback type="invalid">
                      Please provide a valid name.
                    </Form.Control.Feedback>
                  </Form.Group>
                </Col>

                {/* Personal Mobile Number Field */}
                <Col md={6}>
                  <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Phone</Form.Label>
                    <NumberFormat
                      className="form-control"
                      format="(###) ###-####"
                      mask="_"
                      placeholder="Phone"
                      onValueChange={(value) => {
                        console.log(value.value);
                        setPersonalMobileNumber(value.value);
                      }}
                    />
                  </Form.Group>
                </Col>

                {/* User Role Field */}
                <Col md={6}>
                  <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Program Level *</Form.Label>
                    <Select
                      isMulti
                      required
                      options={USER_ROLLS_DATA.map((type) => {
                        return { value: type.id, label: type.name };
                      })}
                      onChange={onTypeChangeHandler}
                    />
                    <Form.Control.Feedback type="invalid">
                      Please provide a valid User Status.
                    </Form.Control.Feedback>
                  </Form.Group>
                </Col>

                {/* Employee status Field */}
                <Col md={6}>
                  <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Employee Status *</Form.Label>
                    <Select
                      required
                      options={STATUSES_DATA.map((employeeStatus) => {
                        return {
                          value: employeeStatus.id,
                          label: employeeStatus.name,
                        };
                      })}
                      onChange={onEmployeeStatusIdChangeHandler}
                    />

                    <Form.Control.Feedback type="invalid">
                      Please provide a valid Employee Status.
                    </Form.Control.Feedback>
                  </Form.Group>
                </Col>

                <CustomManualDropDownSelect
                  title="Designation"
                  url={URLConstants.GET_DESIGNATION_URL}
                  onSelect={(value) => {
                    setDesignationId(value);
                    console.log('I am here in custom manual drop down.', value);
                  }}
                />

                {/* /!* Designation Id Field *!/ */}
                {/* <Col md={6}> */}
                {/*  <Form.Group className="mb-3" controlId="formBasicEmail"> */}
                {/*    <Form.Label>Position/Title</Form.Label> */}
                {/*    <CustomSelect */}
                {/*      params={{ */}
                {/*        url: URLConstants.GET_DESIGNATION_URL, */}
                {/*      }} */}
                {/*      onChange={(value) => { */}
                {/*        setDesignationId(value); */}
                {/*      }} */}
                {/*      entity={designation} */}
                {/*      customRef={positionTitleRef} */}
                {/*    /> */}
                {/*  </Form.Group> */}
                {/* </Col> */}

                {/* /!* Add Position Title *!/ */}
                {/* <Col md={6} className="adgrp"> */}
                {/*  <Form.Group className="mb-3" noValidate> */}
                {/*    <Form.Label>Add Position/Title</Form.Label> */}
                {/*    <Form.Control */}
                {/*      type="text" */}
                {/*      placeholder="Add Position" */}
                {/*      value={designationName} */}
                {/*      onChange={onDesignationChangeHandler} */}
                {/*    /> */}
                {/*  </Form.Group> */}
                {/*  <Button */}
                {/*    className="mt-10" */}
                {/*    variant="contained" */}
                {/*    color="info" */}
                {/*    type="button" */}
                {/*    onClick={onNewDesignationNameSubmit} */}
                {/*  > */}
                {/*    <AddIcon /> */}
                {/*  </Button> */}
                {/* </Col> */}

                {/* Designation Field */}
                {/* <Col md={6}> */}
                {/*  <Form.Group className="mb-3" controlId="formBasicEmail"> */}
                {/*    <Form.Label>Position/Title Name</Form.Label> */}
                {/*    <Form.Control */}
                {/*      type="text" */}
                {/*      placeholder="Position/Title Name" */}
                {/*      onChange={onDesignationChangeHandler} */}
                {/*    /> */}
                {/*  </Form.Group> */}
                {/* </Col> */}

                {/* Joining Date Field */}
                <Col md={6}>
                  <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label> DOH </Form.Label>
                    <Form.Control
                      type="date"
                      placeholder="DOH"
                      onChange={onJoiningDateChangeHandler}
                    />
                  </Form.Group>
                </Col>

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

                {/* Date of Birth Field */}
                <Col md={6}>
                  <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Date of Birth</Form.Label>
                    <Form.Control
                      type="date"
                      placeholder="Date of Birth"
                      onChange={onDateOfBirthChangeHandler}
                    />
                  </Form.Group>
                </Col>

                {/* SSN Field */}
                <Col md={6}>
                  <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>SSN</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="SSN"
                      maxLength="9"
                      onInput={maxSSNLengthCheck}
                      onChange={onSsnChangeHandler}
                      value={hiddenSSN}
                    />
                  </Form.Group>
                </Col>

                {/* Personal Email Address Field */}
                <Col md={6}>
                  <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Personal E-mail</Form.Label>
                    <Form.Control
                      type="email"
                      placeholder="Personal E-mail"
                      onChange={onPersonalEmailAddressChangeHandler}
                    />
                  </Form.Group>
                </Col>

                {/* Emergency Contact Name Field */}
                <Col md={6}>
                  <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Emergency Contact Name</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Emergency Contact Name"
                      onChange={onEmergencyContactName}
                    />
                  </Form.Group>
                </Col>

                {/* Emergency Contact Phone Field */}
                <Col md={6}>
                  <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Emergency Phone</Form.Label>
                    <NumberFormat
                      className="form-control"
                      format="(###) ###-####"
                      mask="_"
                      placeholder="Emergency Phone"
                      onValueChange={(value) => {
                        console.log(value.value);
                        setEmergencyContactNumber(value.value);
                      }}
                    />
                  </Form.Group>
                </Col>

                {/* Driver's License State field */}
                <Col md={6}>
                  <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Driver's License State</Form.Label>
                    <StateSelect
                      required
                      onChange={(value) => setDriverLicenseStateId(value)}
                      countryId={countryId}
                    />
                    <Form.Control.Feedback type="invalid">
                      Please provide a valid State Name.
                    </Form.Control.Feedback>
                  </Form.Group>
                </Col>

                {/* Driver's License Number Field */}
                <Col md={6}>
                  <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Driver's License Number</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Driver's License Number"
                      onChange={onDriverLicenseNumberChangeHandler}
                    />
                  </Form.Group>
                </Col>

                {/* Driver's License Expiration Date Field */}
                <Col md={6}>
                  <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Driver's License Expiration Date</Form.Label>
                    <Form.Control
                      type="date"
                      placeholder="Driver's License Expiration Date"
                      onChange={onDriverLicenseExpirationDateChangeHandler}
                    />
                  </Form.Group>
                </Col>

                {/* CDL Field */}
                <Col md={6}>
                  <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>CDL</Form.Label>
                    <Select
                      required
                      options={YES_NO_DATA.map((cdl) => {
                        return { value: cdl.id, label: cdl.name };
                      })}
                      onChange={onCdlChangeHandler}
                    />

                    <Form.Control.Feedback type="invalid">
                      Please provide a valid cdl.
                    </Form.Control.Feedback>
                  </Form.Group>
                </Col>
                {cdl === 1 && (
                  <>
                    <CustomManualDropDownMultiSelect
                      url={URLConstants.CDL_CLASSES_URL}
                      title="CDL Classes"
                      onSelect={(value) => {
                        setCdlId(value);
                        console.log(
                          'I am here in custom manual drop down.',
                          value
                        );
                      }}
                    />

                    {/* Cdl Id Field */}
                    {/* <Col md={6}> */}
                    {/*  <Form.Group className="mb-3" controlId="formBasicEmail"> */}
                    {/*    <Form.Label>CDL Class</Form.Label> */}
                    {/*    <CustomMultiSelect */}
                    {/*      params={{ url: URLConstants.CDL_CLASSES_URL }} */}
                    {/*      onChange={(value) => { */}
                    {/*        setCdlId(value); */}
                    {/*      }} */}
                    {/*      customRef={cdlClassRef} */}
                    {/*    /> */}
                    {/*  </Form.Group> */}
                    {/* </Col> */}

                    {/* Add cdl Title */}
                    {/* <Col md={6} className="adgrp"> */}
                    {/*  <Form.Group className="mb-3" noValidate> */}
                    {/*    <Form.Label>Add CDL Class</Form.Label> */}
                    {/*    <Form.Control */}
                    {/*      type="text" */}
                    {/*      placeholder="Add CDL Class" */}
                    {/*      value={cdlClassName} */}
                    {/*      onChange={onCdlClassNameChangeHandler} */}
                    {/*    /> */}
                    {/*  </Form.Group> */}
                    {/*  <Button */}
                    {/*    className="mt-10" */}
                    {/*    variant="contained" */}
                    {/*    color="info" */}
                    {/*    type="button" */}
                    {/*    onClick={onCdlClassNameSubmit} */}
                    {/*  > */}
                    {/*    <AddIcon /> */}
                    {/*  </Button> */}
                    {/* </Col> */}

                    {/* Medical Card Field */}
                    <Col md={6}>
                      <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Medical Card</Form.Label>
                        <Select
                          required
                          options={YES_NO_DATA.map((item) => {
                            return {
                              value: item.id,
                              label: item.name,
                            };
                          })}
                          onChange={onMedicalCardChangeHandler}
                        />

                        <Form.Control.Feedback type="invalid">
                          Please provide a valid Medical Card.
                        </Form.Control.Feedback>
                      </Form.Group>
                    </Col>

                    {/* Medical Card Expiration Date Field */}
                    <Col md={6}>
                      <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Medical Card Expiration Date</Form.Label>
                        <Form.Control
                          type="date"
                          placeholder="Medical Card Expiration Date"
                          onChange={onMedicalCardExpirationDateChangeHandler}
                        />
                      </Form.Group>
                    </Col>

                    {/* Random Pool Field */}
                    <Col md={6}>
                      <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Random Pool</Form.Label>
                        <Select
                          required
                          options={YES_NO_DATA.map((item) => {
                            return {
                              value: item.id,
                              label: item.name,
                            };
                          })}
                          onChange={onRandomPoolChangeHandler}
                        />

                        <Form.Control.Feedback type="invalid">
                          Please provide a valid random pool.
                        </Form.Control.Feedback>
                      </Form.Group>
                    </Col>
                  </>
                )}
                {/* /!* Official Email Address Field *!/ */}
                {/* <Col md={6}> */}
                {/*  <Form.Group className="mb-3" controlId="formBasicEmail"> */}
                {/*    <Form.Label>Official E-mail</Form.Label> */}
                {/*    <Form.Control */}
                {/*      type="text" */}
                {/*      placeholder="Official E-mail" */}
                {/*      onChange={onOfficialEmailAddressChangeHandler} */}
                {/*    /> */}
                {/*  </Form.Group> */}
                {/* </Col> */}

                {/* Office Phone Field */}
                {/* <Col md={6}> */}
                {/*  <Form.Group className="mb-3" controlId="formBasicEmail"> */}
                {/*    <Form.Label>Office</Form.Label> */}
                {/*    <NumberFormat */}
                {/*      className="form-control" */}
                {/*      format="(###) ###-####" */}
                {/*      mask="_" */}
                {/*      placeholder="Office" */}
                {/*      onValueChange={(value) => { */}
                {/*        console.log(value.value); */}
                {/*        setOfficialMobileNumber(value.value); */}
                {/*      }} */}
                {/*    /> */}
                {/*  </Form.Group> */}
                {/* </Col> */}

                {/* /!* On Payroll Field *!/ */}
                {/* <Col md={6}> */}
                {/*  <Form.Group className="mb-3" controlId="formBasicEmail"> */}
                {/*    <Form.Label>On Payroll</Form.Label> */}
                {/*    <Select */}
                {/*      required */}
                {/*      options={PAY_ROLL_DATA.map((payroll) => { */}
                {/*        return { value: payroll.id, label: payroll.name }; */}
                {/*      })} */}
                {/*      onChange={onOnPayrollChangeHandler} */}
                {/*    /> */}

                {/*    <Form.Control.Feedback type="invalid"> */}
                {/*      Please provide a valid on payroll. */}
                {/*    </Form.Control.Feedback> */}
                {/*  </Form.Group> */}
                {/* </Col> */}

                {/* Gender Field */}
                {/* <Col md={6}> */}
                {/*  <Form.Group className="mb-3" controlId="formBasicEmail"> */}
                {/*    <Form.Label>Gender</Form.Label> */}
                {/*    <Select */}
                {/*      required */}
                {/*      options={GENDER_DATA.map((gen) => { */}
                {/*        return { value: gen.id, label: gen.name }; */}
                {/*      })} */}
                {/*      onChange={onGenderChangeHandler} */}
                {/*    /> */}

                {/*    <Form.Control.Feedback type="invalid"> */}
                {/*      Please provide a valid on payroll. */}
                {/*    </Form.Control.Feedback> */}
                {/*  </Form.Group> */}
                {/* </Col> */}

                {/* Employee Number Field */}
                {/* <Col md={6}> */}
                {/*  <Form.Group className="mb-3" controlId="formBasicEmail"> */}
                {/*    <Form.Label>Emp Number</Form.Label> */}
                {/*    <Form.Control */}
                {/*      type="text" */}
                {/*      placeholder="Emp Number" */}
                {/*      onChange={onEmpNumberChangeHandler} */}
                {/*    /> */}
                {/*  </Form.Group> */}
                {/* </Col> */}

                {/* Region Field */}
                {/* <Col md={6}> */}
                {/*  <Form.Group className="mb-3" controlId="formBasicEmail"> */}
                {/*    <Form.Label>Region</Form.Label> */}
                {/*    <Form.Control */}
                {/*      type="text" */}
                {/*      placeholder="Region" */}
                {/*      onChange={onRegionChangeHandler} */}
                {/*    /> */}
                {/*  </Form.Group> */}
                {/* </Col> */}
              </Row>
              <Button variant="contained" type="submit" color="primary">
                Submit
              </Button>
            </Form>
          </Card.Text>
        </Card.Body>
      </Card>

      <NewDivisionModal
        display={showNewDivisionModal}
        handleClose={() => {
          setShowNewDivisionModal(false);
        }}
      />
    </>
  );
};

export default NewEmployeeMUI;
