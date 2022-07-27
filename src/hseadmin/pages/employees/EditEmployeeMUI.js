import { Card, Col, Form, Row } from 'react-bootstrap';
import React, { useEffect, useState } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
import { Link, NavLink, useNavigate, useParams } from 'react-router-dom';
import Select from 'react-select';
import NumberFormat from 'react-number-format';
import { toast } from 'react-toastify';
import moment from 'moment';
import { Helmet } from 'react-helmet-async';
import { Button, Grid, Typography } from '@mui/material';
// import AddIcon from '@mui/icons-material/Add';
import validator from 'validator';
// import { addPhoto } from '../../store/actions/photos';
import {
  COUNTRY_ID_USA,
  KEY_COMPANY_ID,
  LOGIN_TYPE_DATA,
  STATUSES_DATA,
  YES_NO_DATA,
} from '../../constants/Constants';

import CompanySelect from '../../components/widgets/CompanySelect';
import DivisionSelect from '../../components/widgets/DivisionSelect';
import URLConstants from '../../constants/URLConstants';
import { fetchGET, fetchPUT, uploadFile } from '../../utils/NetworkUtils';
import { toLocalDate, toLocalDateTime, toServerDate } from '../../utils/Utils';
import { CustomBreadcrumbs, CustomDivider } from '../../utils/MUIStyle';
import StateSelect from '../../components/widgets/StateSelect';
import CitySelect from '../../components/widgets/CitySelect';
import CertificateList from './CertificateList';
import AlcoholDrugList from './AlcoholDrugsList';
// import CustomMultiSelect from '../../components/widgets/CustomMultiSelect';
import CustomManualDropDownSelect from '../../components/widgets/CustomManualDropDownSelect';
import CustomManualDropDownMultiSelect from '../../components/widgets/CustomManualDropDownMultiSelect';
// import CustomManualDropDownMultiSelect from '../../components/widgets/CustomManualDropDownMultiSelect';
// import CertificateList from '../certificates/CertificateList';
// import DocumentList from '../documents/DocumentList';

const EditEmployeeMUI = () => {
  const localCompanyId = localStorage.getItem(KEY_COMPANY_ID);
  const [validated, setValidated] = useState(false);

  const history = useNavigate();

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [employeeStatusId, setEmployeeStatusId] = useState('');
  // const [gender, setGender] = useState('');
  const [companyId, setCompanyId] = useState(-1);
  const [divisionId, setDivisionId] = useState(-1);
  // const [empNumber, setEmpNumber] = useState('');
  // const [region, setRegion] = useState('');
  const [personalMobileNumber, setPersonalMobileNumber] = useState('');
  const [personalEmailAddress, setPersonalEmailAddress] = useState('');
  // const [officialMobileNumber, setOfficialMobileNumber] = useState('');
  // const [officialEmailAddress, setOfficialEmailAddress] = useState('');
  const [ssn, setSsn] = useState('');
  const [hiddenSSN, setHiddenSSN] = useState('');
  const [joiningDate, setJoiningDate] = useState('');
  const [dateOfBirth, setDateOfBirth] = useState('');
  const [designationId, setDesignationId] = useState('');
  const [address1, setAddress1] = useState('');
  const [address2, setAddress2] = useState('');
  const [zipcode, setZipcode] = useState('');
  const [countryId, setCountryId] = useState(null);
  const [stateId, setStateId] = useState(null);
  const [cityId, setCityId] = useState(null);
  const [driverLicenseStateId, setDriverLicenseStateId] = useState('');
  const [driverLicenseNumber, setDriverLicenseNumber] = useState('');
  const [driverLicenseExpiration, setDriverLicenseExpiration] = useState('');
  const [medicalCardExpiration, setMedicalCardExpiration] = useState('');
  const [emergencyContactName, setEmergencyContactName] = useState('');
  const [emergencyContactNumber, setEmergencyContactNumber] = useState('');
  const [cdl, setCdl] = useState('');
  // const [cdlClassName, setCdlClassName] = useState('');
  const [cdlClasses, setCdlClasses] = useState([]);
  const [cdlClassesOptions, setCdlClassesOptions] = useState([]);

  const [medicalCard, setMedicalCard] = useState('');
  const [randomPool, setRandomPool] = useState('');
  const [selectedCdlOption, setSelectedCdlOption] = useState({});
  const [selectedMedicalCardOption, setSelectedMedicalCardOption] = useState(
    {}
  );
  const [photo, setPhoto] = useState(null);
  const [selectedRandomPoolOption, setSelectedRandomPoolOption] = useState({});
  const [typeOptions, setTypeOptions] = useState([]);
  const [
    selectedOnEmployeeStatusIdOption,
    setSelectedOnEmployeeStatusIdOption,
  ] = useState({});

  // const dispatch = useDispatch();
  // const cdlClassRef = React.useRef(null);
  // const cdlClassRef = React.useRef(null);

  const [employee, setEmployee] = useState(null);

  const { id } = useParams();

  // const photo = useSelector((state) => state.photoReducers.photo);
  useEffect(() => {
    if (employee != null) {
      const date = new Date();
      const offset = date.getTimezoneOffset();
      console.log('time offset----->', offset);
      console.log('time----->', employee.start_date_time);
      const dt = moment(employee.start_date_time).format('YYYY-MM-DDTHH:MM');
      console.log('time----->', dt);
      console.log('time----->', dt);

      toLocalDateTime(employee.start_date_time);
      setFirstName(employee.user.first_name);
      setLastName(employee.user.last_name);
      setEmail(employee.user.email);
      setCompanyId(employee.company_id);
      // setEmpNumber(employee.emp_number);
      // setRegion(employee.region);
      setPersonalMobileNumber(employee.personal_mobile_number);
      setPersonalEmailAddress(employee.personal_email_address);
      // setOfficialMobileNumber(employee.official_mobile_number);
      // setOfficialEmailAddress(employee.official_email_address);
      setSsn(employee.ssn);
      setHiddenSSN(maskSSN(employee.ssn));
      setDivisionId(employee.primary_division_id);
      setCdlClasses(employee.cdl_classes);
      setJoiningDate(
        employee.joining_date ? toLocalDate(employee.joining_date) : ''
      );
      setDateOfBirth(
        employee.date_of_birth ? toLocalDate(employee.date_of_birth) : ''
      );
      setDesignationId(employee.designation_id);
      // setContractorStartDate(toLocalDate(employee.contractor_start_date));
      // setContractorEndDate(toLocalDate(employee.contractor_end_date));
      // setOnPayroll(employee.on_payroll);
      // setGender(employee.gender);
      setEmployeeStatusId(employee.employee_status_id);
      setCdlClassesOptions(returnOptionValues(employee.cdl_classes));
      setSelectedOnEmployeeStatusIdOption({
        value: employee.employee_status_id,
        label: STATUSES_DATA.find((x) => x.id === employee.employee_status_id)
          .name,
      });
      if (employee.primary_address !== null) {
        setAddress1(employee.primary_address.address1);
        setAddress2(employee.primary_address.address2);
        setZipcode(employee.primary_address.zipcode);
        setStateId(employee.primary_address.state_id);
        setCountryId(employee.primary_address.country_id);
        setCityId(employee.primary_address.city_id);
      } else {
        setCountryId(COUNTRY_ID_USA);
      }
      setEmergencyContactName(employee.emergency_contact_name);
      setEmergencyContactNumber(employee.emergency_contact_phone);
      setDriverLicenseStateId(employee.driver_license_state_id);
      setDriverLicenseExpiration(
        employee.driver_license_expiration
          ? toLocalDate(employee.driver_license_expiration)
          : ''
      );
      setDriverLicenseNumber(employee.driver_license_number);
      setCdl(employee.cdl);
      // setCdlId(cdl_class_id);
      setRandomPool(employee.random_pool);
      setMedicalCard(employee.medical_card);
      setMedicalCardExpiration(
        employee.medical_card_expiration
          ? toLocalDate(employee.medical_card_expiration)
          : ''
      );
      setSelectedMedicalCardOption({
        value: employee.medical_card,
        label: YES_NO_DATA.find((x) => x.id === employee.medical_card).name,
      });
      setSelectedCdlOption({
        value: employee.cdl,
        label: YES_NO_DATA.find((x) => x.id === employee.cdl).name,
      });
      setSelectedRandomPoolOption({
        value: employee.random_pool,
        label: YES_NO_DATA.find((x) => x.id === employee.random_pool).name,
      });

      const localOptions = [];

      employee.user.types.forEach((type) => {
        localOptions.push({ value: type.id, label: type.name });
      });

      setTypeOptions(localOptions);
      // setParentId(employee.parent_id);
    }
  }, [employee]);

  const returnOptionValues = (entites) => {
    const localOptions = [];
    entites.forEach((entity) => {
      localOptions.push({
        id: entity.id,
      });
    });
    return localOptions;
  };

  useEffect(() => {
    // console.log('param is ' + params.id);
    loadEmployee();
  }, []);

  const maskSSN = (value) => {
    if (value !== null && value.length > 4) {
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
  const loadEmployee = async () => {
    // await dispatch(getEmployee(id));

    const url = `${URLConstants.GET_EMPLOYEE_URL}/${id}.json`;

    const resData = await fetchGET(url);
    setEmployee(resData.data);
    const localOptions = [];

    resData.data.cdl_classes.forEach((cdlID) => {
      localOptions.push({
        id: cdlID.id,
      });
    });

    // setCdlClassIdOptions(localOptions);
    console.log('Get Employee Date', resData.data);
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

  const onEmailChangeHandler = (event) => {
    // console.log(event.target.value);
    setEmail(event.target.value);
  };
  const onPasswordChangeHandler = (event) => {
    // console.log(event.target.value);
    setPassword(event.target.value);
  };

  const onPersonalEmailAddressChangeHandler = (event) => {
    // console.log(event.target.value);
    setPersonalEmailAddress(event.target.value);
  };
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
    console.log(value);
    console.log(`new SSN is${newSSN}`);
    setHiddenSSN(maskSSN(finalValue));
  };
  const maxSSNLengthCheck = (object) => {
    if (object.target.value.length > object.target.maxLength) {
      object.target.value = object.target.value.slice(
        0,
        object.target.maxLength
      );
    }
  };
  // const onCdlClassNameChangeHandler = (event) => {
  //   // console.log(event.target.value);
  //   setCdlClassName(event.target.value);
  // };

  // const onDivisionChangeHandler = (event) => {
  //   // console.log(event.target.value);
  //   setDivision(event.target.value);
  // };

  const onJoiningDateChangeHandler = (event) => {
    // console.log(event.target.value);
    setJoiningDate(event.target.value);
  };

  const onDateOfBirthChangeHandler = (event) => {
    // console.log(event.target.value);
    setDateOfBirth(event.target.value);
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
    setSelectedCdlOption(selectedOption);
  };

  const onMedicalCardChangeHandler = (selectedOption) => {
    setMedicalCard(+selectedOption.value);
    setSelectedMedicalCardOption(selectedOption);
  };

  const onMedicalCardExpirationDateChangeHandler = (event) => {
    // console.log(event.target.value);
    setMedicalCardExpiration(event.target.value);
  };

  const onRandomPoolChangeHandler = (selectedOption) => {
    setRandomPool(+selectedOption.value);
    setSelectedRandomPoolOption(selectedOption);
  };

  const onDriverLicenseNumberChangeHandler = (event) => {
    setDriverLicenseNumber(event.target.value);
    // console.log(selectedOption.value);
  };

  const onCompanyChangeHandler = (value) => {
    setCompanyId(value);

    // console.log(selectedOption.value);
  };

  const onDivisionChangeHandler = (value) => {
    setDivisionId(value);
    console.log(`Edit Employee${value}`);
  };

  const onEmployeeStatusChangeHandler = (selectedOption) => {
    setEmployeeStatusId(+selectedOption.value);
    setSelectedOnEmployeeStatusIdOption(selectedOption);
    console.log(selectedOption);
  };

  const onEmployeeSubmit = (event) => {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }

    const localTypes = [];

    typeOptions.forEach((type) => {
      localTypes.push({ id: type.value });
    });

    setValidated(true);
    event.preventDefault();
    if (firstName === '') {
      toast('Please Enter First Name');
    } else if (lastName === '') {
      toast('Please Enter Last Name');
    } else if (email !== null && !validator.isEmail(email)) {
      toast('Email Address is not valid');
    } else if (typeOptions.length === 0) {
      toast('Please Select Program Level');
    } else if (employeeStatusId === '') {
      toast('Please Select Employee Status');
    } else if (divisionId === -1) {
      toast('Please Select Division' || 'Failed');
    } else if (
      personalEmailAddress !== null &&
      personalEmailAddress !== '' &&
      !validator.isEmail(personalEmailAddress)
    ) {
      toast('Personal Email Address is not valid');
    } else {
      const postData = {
        id,
        user: {
          id: employee.user.id,
          username: email,
          user_status_id: 1,
          first_name: firstName,
          last_name: lastName,
          email,
          types: localTypes,
        },
        first_name: firstName,
        last_name: lastName,
        company_id: localCompanyId !== null ? localCompanyId : companyId,
        primary_division_id: divisionId,
        // user_id: userId,
        personal_mobile_number: personalMobileNumber,
        personal_email_address: personalEmailAddress,
        // official_mobile_number: officialMobileNumber,
        // official_email_address: officialEmailAddress,
        ssn,
        joining_date: joiningDate !== '' ? toServerDate(joiningDate) : null,
        date_of_birth: dateOfBirth !== '' ? toServerDate(dateOfBirth) : null,
        on_payroll: 0,
        primary_photo_id: photo === null ? employee.primary_photo_id : photo.id,
        gender: 0,
        employee_status_id: employeeStatusId,
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
        driver_license_expiration:
          driverLicenseExpiration !== ''
            ? toServerDate(driverLicenseExpiration)
            : null,
        cdl: cdl,
        medical_card: medicalCard,
        medical_card_expiration:
          medicalCardExpiration !== ''
            ? toServerDate(medicalCardExpiration)
            : null,
        random_pool: randomPool,
        // cdl_class_name: cdlClassName,
        cdl_classes: cdlClassesOptions,
        // parent_id: parentId === -1 ? null : parentId,
      };

      // if (password !== null && password !== '') {
      //   postData.user.password = password;
      // }
      if (
        !(password.trim() === '' || password === undefined || password === null)
      ) {
        postData.user.password = password;
      }

      postEmployee(postData);
    }
  };

  const postEmployee = async (data) => {
    try {
      const url = `${URLConstants.GET_EMPLOYEE_URL}/${id}.json`;
      const resData = await fetchPUT(url, data);
      console.log(resData.data);
      history('../../private/employees');
    } catch (error) {
      console.log(error.message);
    }
  };

  // const onCdlClassNameSubmit = (event) => {
  //   const form = event.currentTarget;
  //   if (form.checkValidity() === false) {
  //     console.log('I am here too');
  //
  //     event.preventDefault();
  //     event.stopPropagation();
  //   } else {
  //     console.log('I am here');
  //     event.preventDefault();
  //     const postData = {
  //       name: cdlClassName,
  //     };
  //     postCdlClassName(postData);
  //   }
  //   // setValidated(true);
  // };

  // const postCdlClassName = async (data) => {
  //   console.log('Submit data===========>', data);
  //   try {
  //     await fetchPOST(URLConstants.CDL_CLASSES_URL, data);
  //     // cdlClassRef.current();
  //     cdlClassRef.current();
  //     setCdlClassName('');
  //     //   history('../../private/audit-task-categories');
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  // const onNameChangeHandler = (event) => {

  //     console.log(event.target.value);
  //     setName(event.target.value);
  // }
  // const onParentChangeHandler = (selectedOption) => {

  //     setParentId(+selectedOption.value);
  //     console.log(selectedOption.value);
  // }

  // On file select (from the pop up)
  const onLogoFileChange = (event) => {
    onLogoFileUpload(event.target.files[0]);
  };

  // On file upload (click the upload button)
  const onLogoFileUpload = async (value) => {
    // Create an object of formData
    const formData = new FormData();

    // Update the formData object
    formData.append('photo', value, value.name);

    // await dispatch(addPhoto(formData));
    const response = await uploadFile(
      `${URLConstants.PHOTOS_URL}/upload.json`,
      formData
    );
    setPhoto(response.data);
  };

  const onTypeChangeHandler = (selectedOption) => {
    setTypeOptions(selectedOption);
    console.log(typeOptions);
    console.log(selectedOption);
  };
  const renderPhoto = () => {
    if (photo === null) {
      return (
        <>
          {employee !== null && employee.primary_photo !== null && (
            // eslint-disable-next-line jsx-a11y/img-redundant-alt
            <img
              src={employee.primary_photo.url}
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
          src={photo.url}
          width={100}
          height={100}
          style={{ backgroundColor: 'grey', padding: '2px' }}
          alt="employee photo"
        />
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

  return (
    <>
      <Helmet title="Edit Employee" />

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
            <Typography>Edit Employee</Typography>
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
            {employee && (
              <Form
                noValidate
                validated={validated}
                onSubmit={onEmployeeSubmit}
              >
                {renderPhoto()}
                <Row>
                  <Col md={12}>
                    <Form.Group controlId="formFile" className="mb-3">
                      <Form.Label>Employee Photo</Form.Label>
                      <Form.Control type="file" onChange={onLogoFileChange} />
                    </Form.Group>
                  </Col>

                  {/* Company id Field */}
                  {localCompanyId === null && (
                    <Col md={6}>
                      <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Company * </Form.Label>

                        {employee && (
                          <CompanySelect
                            onChange={onCompanyChangeHandler}
                            entity={employee.company}
                          />
                        )}
                      </Form.Group>
                    </Col>
                  )}

                  {/* Division id Field */}
                  <Col md={6}>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                      <Form.Label>Division </Form.Label>

                      {employee && (
                        <DivisionSelect
                          onChange={onDivisionChangeHandler}
                          entity={employee.primary_division}
                          companyId={
                            localCompanyId !== null ? localCompanyId : companyId
                          }
                        />
                      )}
                    </Form.Group>
                  </Col>

                  {/* First Name Field */}
                  <Col md={6}>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                      <Form.Label>First Name *</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="First Name *"
                        onChange={onFirstNameChangeHandler}
                        value={firstName}
                      />
                    </Form.Group>
                  </Col>

                  {/* Last Name Field */}
                  <Col md={6}>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                      <Form.Label>Last Name *</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="Last Name *"
                        onChange={onLastNameChangeHandler}
                        value={lastName}
                      />
                    </Form.Group>
                  </Col>

                  {/* Email Field */}
                  <Col md={6}>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                      <Form.Label>Email *</Form.Label>
                      <Form.Control
                        disabled
                        type="email"
                        placeholder="Email *"
                        onChange={onEmailChangeHandler}
                        value={email}
                      />
                    </Form.Group>
                  </Col>

                  {/* Password Field */}
                  <Col md={6}>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                      <Form.Label>Password*</Form.Label>
                      <Form.Control
                        type="password"
                        placeholder="Password *"
                        onChange={onPasswordChangeHandler}
                        value={password}
                      />
                      <Form.Control.Feedback type="invalid">
                        Please provide a valid password.
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
                        value={personalMobileNumber}
                      />
                    </Form.Group>
                  </Col>

                  {/* User Roles Field */}
                  <Col md={6}>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                      <Form.Label>Program Level *</Form.Label>
                      <Select
                        isMulti
                        options={LOGIN_TYPE_DATA.map((type) => {
                          return { value: type.id, label: type.name };
                        })}
                        value={typeOptions}
                        onChange={onTypeChangeHandler}
                      />
                    </Form.Group>
                  </Col>

                  {/* Employee Status Field */}
                  <Col md={6}>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                      <Form.Label>Employee Status *</Form.Label>
                      {employee !== null && (
                        <Select
                          required
                          options={STATUSES_DATA.map((employeeStatus) => {
                            return {
                              value: employeeStatus.id,
                              label: employeeStatus.name,
                            };
                          })}
                          onChange={onEmployeeStatusChangeHandler}
                          value={selectedOnEmployeeStatusIdOption}
                        />
                      )}
                      <Form.Control.Feedback type="invalid">
                        Please provide a valid on status.
                      </Form.Control.Feedback>
                    </Form.Group>
                  </Col>

                  <CustomManualDropDownSelect
                    title="Designation"
                    url={URLConstants.GET_DESIGNATION_URL}
                    onSelect={(value) => {
                      setDesignationId(value);
                      console.log(
                        'I am here in custom manual drop down.',
                        value
                      );
                    }}
                    entity={employee.designation}
                  />
                  {/* /!* Designation Id Field *!/ */}
                  {/* <Col md={6}> */}
                  {/*  <Form.Group className="mb-3" controlId="formBasicEmail"> */}
                  {/*    <Form.Label>Position/Title</Form.Label> */}
                  {/*    <CustomSelect */}
                  {/*      params={{ */}
                  {/*        url: URLConstants.DESIGNATIONS_URL, */}
                  {/*      }} */}
                  {/*      onChange={(value) => { */}
                  {/*        setDesignationId(value); */}
                  {/*      }} */}
                  {/*      entity={employee.designation} */}
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

                  {/* Joining Date Field */}
                  <Col md={6}>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                      <Form.Label>DOH</Form.Label>
                      <Form.Control
                        type="date"
                        placeholder="DOH"
                        onChange={onJoiningDateChangeHandler}
                        value={joiningDate}
                      />
                    </Form.Group>
                  </Col>

                  {/* Address1 field */}
                  <Col md={6}>
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
                        Please provide a valid Address 1.
                      </Form.Control.Feedback>
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
                      <StateSelect
                        required
                        onChange={(value) => setStateId(value)}
                        countryId={countryId}
                        entity={
                          employee.primary_address
                            ? employee.primary_address.state
                            : null
                        }
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
                        entity={
                          employee.primary_address
                            ? employee.primary_address.city
                            : null
                        }
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
                        value={zipcode}
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
                        value={dateOfBirth}
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
                        value={personalEmailAddress}
                      />
                    </Form.Group>
                  </Col>

                  {/* Emergency Contact Name Field */}
                  <Col md={6}>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                      <Form.Label>Emergency Contact Name Field</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="Emergency Contact Name Field"
                        onChange={onEmergencyContactName}
                        value={emergencyContactName}
                      />
                    </Form.Group>
                  </Col>

                  {/* Emergency Contact Phone Field */}
                  <Col md={6}>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                      <Form.Label>Emergency Contact Phone</Form.Label>
                      <NumberFormat
                        className="form-control"
                        format="(###) ###-####"
                        mask="_"
                        placeholder="Emergency Contact Phone"
                        onValueChange={(value) => {
                          console.log(value.value);
                          setEmergencyContactNumber(value.value);
                        }}
                        value={emergencyContactNumber}
                      />
                    </Form.Group>
                  </Col>

                  {/* Driver's License State field */}
                  <Col md={6}>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                      <Form.Label>Driver's License State</Form.Label>
                      <StateSelect
                        onChange={(value) => setDriverLicenseStateId(value)}
                        countryId={countryId}
                        entity={employee.driver_license_state}
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
                        value={driverLicenseNumber}
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
                        value={driverLicenseExpiration}
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
                        value={selectedCdlOption}
                      />

                      <Form.Control.Feedback type="invalid">
                        Please provide a valid cdl.
                      </Form.Control.Feedback>
                    </Form.Group>
                  </Col>
                  {cdl === 1 && (
                    <>
                      {/* <CustomManualDropDownMultiSelect */}
                      {/*  url={URLConstants.CDL_CLASSES_URL} */}
                      {/*  onSelect={(value) => { */}
                      {/*    setCdlClassIdOptions(value); */}
                      {/*    console.log( */}
                      {/*      'I am here in custom manual drop down.', */}
                      {/*      value */}
                      {/*    ); */}
                      {/*  }} */}
                      {/*  entities={employee.cdl_classes} */}
                      {/* /> */}

                      {/* Cdl Id Field */}
                      <>
                        {/* <Form.Group className="mb-3" controlId="formBasicEmail"> */}
                        {/*  <Form.Label>CDL Class</Form.Label> */}
                        {/* <CustomMultiSelect */}
                        {/*  params={{ url: URLConstants.CDL_CLASSES_URL }} */}
                        {/*  onChange={(value) => { */}
                        {/*    console.log('selected value', value); */}
                        {/*    console.log('selected array', cdlClassId); */}
                        {/*    setCdlClassIdOptions(value); */}
                        {/*  }} */}
                        {/*  entities={cdlClassId} */}
                        {/* /> */}
                        <CustomManualDropDownMultiSelect
                          title="Cdl Class"
                          url={URLConstants.CDL_CLASSES_URL}
                          onSelect={(value) => {
                            setCdlClassesOptions(value);
                            console.log(
                              'I am here in custom manual drop down.',
                              value
                            );
                          }}
                          entities={cdlClasses}
                        />
                        {/* </Form.Group> */}
                      </>

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
                            value={selectedMedicalCardOption}
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
                            value={medicalCardExpiration}
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
                            value={selectedRandomPoolOption}
                          />

                          <Form.Control.Feedback type="invalid">
                            Please provide a valid random pool.
                          </Form.Control.Feedback>
                        </Form.Group>
                      </Col>
                    </>
                  )}
                  {/* /!* On Payroll Field *!/ */}
                  {/* <Col md={6}> */}
                  {/*  <Form.Group className="mb-3" controlId="formBasicEmail"> */}
                  {/*    <Form.Label>On Payroll</Form.Label> */}
                  {/*    {employee !== null && ( */}
                  {/*      <Select */}
                  {/*        required */}
                  {/*        options={PAY_ROLL_DATA.map((payroll) => { */}
                  {/*          return { value: payroll.id, label: payroll.name }; */}
                  {/*        })} */}
                  {/*        onChange={onOnPayrollChangeHandler} */}
                  {/*        value={selectedOnPayrollOption} */}
                  {/*      /> */}
                  {/*    )} */}

                  {/*    <Form.Control.Feedback type="invalid"> */}
                  {/*      Please provide a valid on active. */}
                  {/*    </Form.Control.Feedback> */}
                  {/*  </Form.Group> */}
                  {/* </Col> */}
                </Row>
                <Button variant="contained" type="submit" color="primary">
                  Submit
                </Button>
              </Form>
            )}
          </Card.Text>
        </Card.Body>
      </Card>
      <CertificateList
        tableName="employees"
        columnName="employee_id"
        employeeId={id}
        companyId={localCompanyId !== null ? localCompanyId : companyId}
      />
      <AlcoholDrugList
        tableName="employees"
        columnName="employee_id"
        employeeId={id}
        companyId={localCompanyId !== null ? localCompanyId : companyId}
      />
      {/* <DocumentList tableName="employees" columnName="employee_id" value={id} /> */}
      {/* <CertificateList */}
      {/*  tableName="certificate" */}
      {/*  columnName="employee_id" */}
      {/*  value={id} */}
      {/* /> */}
    </>
  );
};

export default EditEmployeeMUI;
