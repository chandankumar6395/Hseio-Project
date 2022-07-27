import { Button, Card, Col, Form, Row } from 'react-bootstrap';
import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Select from 'react-select';
import { toast } from 'react-toastify';
import NumberFormat from 'react-number-format';

import { useSelector } from 'react-redux';
import {
  GENDER_DATA,
  KEY_COMPANY_ID,
  PAY_ROLL_DATA,
  USER_ROLLS_DATA,
  STATUSES_DATA,
} from '../../constants/Constants';
import { fetchPOST, uploadFile } from '../../utils/NetworkUtils';
import URLConstants from '../../constants/URLConstants';
import DivisionSelect from '../../components/widgets/DivisionSelect';
import CompanySelect from '../../components/widgets/CompanySelect';
import NewDivisionModal from '../../components/modals/NewDivisionModal';

const NewEmployee = () => {
  const localCompanyId = localStorage.getItem(KEY_COMPANY_ID);
  // const localDivisionId = localStorage.getItem(KEY_DIVISION_ID);

  // this value should always -1 if the user is logged via system admin and company owner.
  const localDivisionId = useSelector((state) => state.auth.selectedDivision);

  const emailRef = useRef();
  // const photo = useSelector((state) => state.photoReducers.photo);
  const [photo, setPhoto] = useState(null);
  const [validated, setValidated] = useState(false);

  const [showNewDivisionModal, setShowNewDivisionModal] = useState(false);

  // const [isLoading, setIsLoading] = useState(false);

  const history = useNavigate();

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [gender, setGender] = useState('');
  const [companyId, setCompanyId] = useState(-1);
  const [empNumber, setEmpNumber] = useState('');
  const [region, setRegion] = useState('');
  const [personalMobileNumber, setPersonalMobileNumber] = useState('');
  const [personalEmailAddress, setPersonalEmailAddress] = useState('');
  const [officialMobileNumber, setOfficialMobileNumber] = useState('');
  const [officialEmailAddress, setOfficialEmailAddress] = useState('');
  const [ssn, setSsn] = useState('');
  const [divisionId, setDivisionId] = useState('');
  const [joiningDate, setJoiningDate] = useState('');
  const [dateOfBirth, setDateOfBirth] = useState('');
  const [designation, setDesignation] = useState('');
  const [employeeStatusId, setEmployeeStatusId] = useState('');
  const [contractorStartDate, setContractorStartDate] = useState('');
  const [contractorEndDate, setContractorEndDate] = useState('');
  const [onPayroll, setOnPayroll] = useState('');
  const [typeOptions, setTypeOptions] = useState('');

  useEffect(() => {
    console.log('NewEmployee useEffect = ', localDivisionId);
  }, [localDivisionId]);

  const onEmployeeSubmit = (event) => {
    const form = event.currentTarget;
    event.preventDefault();
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    } else if (localCompanyId === null && companyId === -1) {
      toast.error('Please select a company' || 'Failed');
    } else if (onPayroll === null || onPayroll === '') {
      toast.error('Please select on Pay Roll' || 'Failed');
    } else if (gender === null || gender === '') {
      toast.error('Please select a Gender' || 'Failed');
    } else {
      const localTypes = [];

      typeOptions.forEach((type) => {
        localTypes.push({ id: type.value });
      });

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
        emp_number: empNumber,
        region,
        personal_mobile_number: personalMobileNumber,
        personal_email_address: personalEmailAddress,
        official_mobile_number: officialMobileNumber,
        official_email_address: officialEmailAddress,
        ssn,
        primary_division_id:
          localDivisionId !== -1 ? localDivisionId : divisionId,
        joining_date: joiningDate,
        date_of_birth: dateOfBirth,
        designation,
        contractor_start_date: contractorStartDate,
        contractor_end_date: contractorEndDate,
        on_payroll: onPayroll,
        gender,
        primary_photo_id: photo !== null ? photo.id : null,
      };

      // console.log(`data is ${JSON.stringify(postData)}`);
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

  const onEmpNumberChangeHandler = (event) => {
    // console.log(event.target.value);
    setEmpNumber(event.target.value);
  };

  const onFirstNameChangeHandler = (event) => {
    // console.log(event.target.value);
    setFirstName(event.target.value);
  };
  const onLastNameChangeHandler = (event) => {
    // console.log(event.target.value);
    setLastName(event.target.value);
  };

  const onEmailChangeHandler = (event) => {
    // console.log(event.target.value);
    setEmail(event.target.value);
  };
  const onPasswordChangeHandler = (event) => {
    // console.log(event.target.value);
    setPassword(event.target.value);
  };

  const onRegionChangeHandler = (event) => {
    // console.log(event.target.value);
    setRegion(event.target.value);
  };

  const onPersonalEmailAddressChangeHandler = (event) => {
    // console.log(event.target.value);
    setPersonalEmailAddress(event.target.value);
  };

  const onOfficialEmailAddressChangeHandler = (event) => {
    // console.log(event.target.value);
    setOfficialEmailAddress(event.target.value);
  };
  const onSsnChangeHandler = (event) => {
    // console.log(event.target.value);
    setSsn(event.target.value);
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

  const onDesignationChangeHandler = (event) => {
    // console.log(event.target.value);
    setDesignation(event.target.value);
  };

  const onContractorStartDateChangeHandler = (event) => {
    // console.log(event.target.value);
    setContractorStartDate(event.target.value);
  };

  const onContractorEndDateChangeHandler = (event) => {
    // console.log(event.target.value);
    setContractorEndDate(event.target.value);
  };

  const onOnPayrollChangeHandler = (selectedOption) => {
    setOnPayroll(+selectedOption.value);
    // console.log(selectedOption.value);
  };
  const onGenderChangeHandler = (selectedOption) => {
    setGender(selectedOption.value);
    // console.log(selectedOption.value);
  };
  const onEmployeeStatusIdChangeHandler = (selectedOption) => {
    setEmployeeStatusId(+selectedOption.value);
    console.log(selectedOption.value);
  };

  const onCompanyChangeHandler = (value) => {
    setCompanyId(value);
    // console.log(selectedOption.value);
  };

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
    <Row>
      <Col>
        <Card>
          <Card.Header>
            Add Employee{' '}
            <Button
              className="btn-sm"
              variant="primary"
              type="button"
              style={{
                float: 'right',
              }}
              onClick={() => {
                history(-1);
              }}
            >
              Back
            </Button>
          </Card.Header>
          <Card.Body>
            <Form noValidate validated={validated} onSubmit={onEmployeeSubmit}>
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
                      <Form.Label>Company </Form.Label>
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
                    <Form.Label>First Name</Form.Label>
                    <Form.Control
                      required
                      type="text"
                      placeholder="First Name"
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
                    <Form.Label>Last Name</Form.Label>
                    <Form.Control
                      required
                      type="text"
                      placeholder="Last Name"
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
                    <Form.Label>Email</Form.Label>
                    <Form.Control
                      ref={emailRef}
                      required
                      type="text"
                      placeholder="Email"
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
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                      required
                      type="password"
                      placeholder="Password"
                      onChange={onPasswordChangeHandler}
                    />
                    <Form.Control.Feedback type="invalid">
                      Please provide a valid name.
                    </Form.Control.Feedback>
                  </Form.Group>
                </Col>

                <Col md={6}>
                  <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>User Roles</Form.Label>
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

                {/* On Payroll Field */}
                <Col md={6}>
                  <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>On Payroll</Form.Label>
                    <Select
                      required
                      options={PAY_ROLL_DATA.map((payroll) => {
                        return { value: payroll.id, label: payroll.name };
                      })}
                      onChange={onOnPayrollChangeHandler}
                    />

                    <Form.Control.Feedback type="invalid">
                      Please provide a valid on payroll.
                    </Form.Control.Feedback>
                  </Form.Group>
                </Col>

                <Col md={6}>
                  <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Employee Status</Form.Label>
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
                      Please provide a valid on payroll.
                    </Form.Control.Feedback>
                  </Form.Group>
                </Col>

                {/* Gender Field */}
                <Col md={6}>
                  <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Gender</Form.Label>
                    <Select
                      required
                      options={GENDER_DATA.map((gen) => {
                        return { value: gen.id, label: gen.name };
                      })}
                      onChange={onGenderChangeHandler}
                    />

                    <Form.Control.Feedback type="invalid">
                      Please provide a valid on payroll.
                    </Form.Control.Feedback>
                  </Form.Group>
                </Col>

                {/* Employee Number Field */}
                <Col md={6}>
                  <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Emp Number</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Emp Number"
                      onChange={onEmpNumberChangeHandler}
                    />
                  </Form.Group>
                </Col>

                {/* Region Field */}
                <Col md={6}>
                  <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Region</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Region"
                      onChange={onRegionChangeHandler}
                    />
                  </Form.Group>
                </Col>

                {/* Personal Mobile Number Field */}
                <Col md={6}>
                  <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Personal Phone</Form.Label>
                    <NumberFormat
                      className="form-control"
                      format="(###) ###-####"
                      mask="_"
                      placeholder="Personal Phone"
                      onValueChange={(value) => {
                        console.log(value.value);
                        setPersonalMobileNumber(value.value);
                      }}
                    />
                  </Form.Group>
                </Col>

                {/* Personal Email Address Field */}
                <Col md={6}>
                  <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Personal E-mail</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Personal E-mail"
                      onChange={onPersonalEmailAddressChangeHandler}
                    />
                  </Form.Group>
                </Col>

                {/* Official Mobile Number Field */}
                <Col md={6}>
                  <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Company Phone</Form.Label>
                    {/* <Form.Control */}
                    {/*  type="text" */}
                    {/*  placeholder="Official Mobile Number" */}
                    {/*  onChange={onOfficialMobileNumberChangeHandler} */}
                    <NumberFormat
                      className="form-control"
                      format="(###) ###-####"
                      mask="_"
                      placeholder="Company Phone"
                      onValueChange={(value) => {
                        console.log(value.value);
                        setOfficialMobileNumber(value.value);
                      }}
                    />
                  </Form.Group>
                </Col>

                {/* Official Email Address Field */}
                <Col md={6}>
                  <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Official E-mail</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Official E-mail"
                      onChange={onOfficialEmailAddressChangeHandler}
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
                      onChange={onSsnChangeHandler}
                    />
                  </Form.Group>
                </Col>

                {/* Joining Date Field */}
                <Col md={6}>
                  <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Joining Date</Form.Label>
                    <Form.Control
                      type="date"
                      placeholder="Joining Date"
                      onChange={onJoiningDateChangeHandler}
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

                {/* Contractor Start Date Field */}
                <Col md={6}>
                  <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Start Date</Form.Label>
                    <Form.Control
                      type="date"
                      placeholder="Start Date"
                      onChange={onContractorStartDateChangeHandler}
                    />
                  </Form.Group>
                </Col>

                {/* Contractor End Date Field */}
                <Col md={6}>
                  <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>End Date</Form.Label>
                    <Form.Control
                      type="date"
                      placeholder="End Date"
                      onChange={onContractorEndDateChangeHandler}
                    />
                  </Form.Group>
                </Col>

                {/* Designation Field */}
                <Col md={6}>
                  <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Designation</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Designation"
                      onChange={onDesignationChangeHandler}
                    />
                  </Form.Group>
                </Col>
              </Row>
              <Button variant="primary" type="submit">
                Submit
              </Button>
            </Form>
          </Card.Body>
        </Card>
      </Col>
      <NewDivisionModal
        display={showNewDivisionModal}
        handleClose={() => {
          setShowNewDivisionModal(false);
        }}
      />
    </Row>
  );
};

export default NewEmployee;
