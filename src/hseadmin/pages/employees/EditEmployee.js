import { Button, Card, Col, Form, Row } from 'react-bootstrap';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, useNavigate, useParams } from 'react-router-dom';
import Select from 'react-select';
import NumberFormat from 'react-number-format';
import { toast } from 'react-toastify';
import moment from 'moment';
import { addPhoto } from '../../store/actions/photos';
import {
  GENDER_DATA,
  KEY_COMPANY_ID,
  LOGIN_TYPE_DATA,
  PAY_ROLL_DATA,
  STATUSES_DATA,
} from '../../constants/Constants';

import DocumentList from '../documents/DocumentList';

import CompanySelect from '../../components/widgets/CompanySelect';
import DivisionSelect from '../../components/widgets/DivisionSelect';
import URLConstants from '../../constants/URLConstants';
import { fetchGET, fetchPUT } from '../../utils/NetworkUtils';
import { toLocalDate, toLocalDateTime, toServerDate } from '../../utils/Utils';

const EditEmployee = () => {
  const localCompanyId = localStorage.getItem(KEY_COMPANY_ID);
  const [validated, setValidated] = useState(false);

  const history = useNavigate();

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  // const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [employeeStatusId, setEmployeeStatusId] = useState('');
  const [gender, setGender] = useState('');
  const [companyId, setCompanyId] = useState(-1);
  const [divisionId, setDivisionId] = useState(-1);
  const [empNumber, setEmpNumber] = useState('');
  const [region, setRegion] = useState('');
  const [personalMobileNumber, setPersonalMobileNumber] = useState('');
  const [personalEmailAddress, setPersonalEmailAddress] = useState('');
  const [officialMobileNumber, setOfficialMobileNumber] = useState('');
  const [officialEmailAddress, setOfficialEmailAddress] = useState('');
  const [ssn, setSsn] = useState('');
  const [joiningDate, setJoiningDate] = useState('');
  const [dateOfBirth, setDateOfBirth] = useState('');
  const [designation, setDesignation] = useState('');
  const [contractorStartDate, setContractorStartDate] = useState('');
  const [contractorEndDate, setContractorEndDate] = useState('');
  const [onPayroll, setOnPayroll] = useState('');
  const [typeOptions, setTypeOptions] = useState([]);
  const [selectedOnPayrollOption, setSelectedOnPayrollOption] = useState({});
  const [selectedGenderOption, setSelectedGenderOption] = useState({});
  const [
    selectedOnEmployeeStatusIdOption,
    setSelectedOnEmployeeStatusIdOption,
  ] = useState({});

  const dispatch = useDispatch();

  const [employee, setEmployee] = useState(null);

  const { id } = useParams();
  const photo = useSelector((state) => state.photoReducers.photo);
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
      // setEmail(employee.user.email);
      setCompanyId(employee.company_id);
      setEmpNumber(employee.emp_number);
      setRegion(employee.region);
      setPersonalMobileNumber(employee.personal_mobile_number);
      setPersonalEmailAddress(employee.personal_email_address);
      setOfficialMobileNumber(employee.official_mobile_number);
      setOfficialEmailAddress(employee.official_email_address);
      setSsn(employee.ssn);
      setDivisionId(employee.primary_division_id);
      setJoiningDate(toLocalDate(employee.joining_date));
      setDateOfBirth(toLocalDate(employee.date_of_birth));
      setDesignation(employee.designation);
      setContractorStartDate(toLocalDate(employee.contractor_start_date));
      setContractorEndDate(toLocalDate(employee.contractor_end_date));
      setOnPayroll(employee.on_payroll);
      setGender(employee.gender);
      setEmployeeStatusId(employee.employee_status_id);
      setSelectedOnEmployeeStatusIdOption({
        value: employee.employee_status_id,
        label: STATUSES_DATA.find((x) => x.id === employee.employee_status_id)
          .name,
      });
      setSelectedGenderOption({
        value: employee.gender,
        label: GENDER_DATA.find((x) => x.id === employee.gender).name,
      });
      setSelectedOnPayrollOption({
        value: employee.gender,
        label: PAY_ROLL_DATA.find((x) => x.id === employee.on_payroll).name,
      });

      const localOptions = [];

      employee.user.types.forEach((type) => {
        localOptions.push({ value: type.id, label: type.name });
      });

      setTypeOptions(localOptions);
      // setParentId(employee.parent_id);
    }
  }, [employee]);

  useEffect(() => {
    // console.log('param is ' + params.id);
    loadEmployee();
  }, []);

  const loadEmployee = async () => {
    // await dispatch(getEmployee(id));

    const url = `${URLConstants.GET_EMPLOYEE_URL}/${id}.json`;

    const resData = await fetchGET(url);
    setEmployee(resData.data);
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

  // const onEmailChangeHandler = (event) => {
  //   // console.log(event.target.value);
  //   setEmail(event.target.value);
  // };
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
    setSelectedOnPayrollOption(selectedOption);
    // console.log(selectedOption.value);
  };
  const onGenderChangeHandler = (selectedOption) => {
    setGender(selectedOption.value);
    setSelectedGenderOption(selectedOption);
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

    if (divisionId === -1) {
      toast('Please Select Division' || 'Failed');
    } else {
      const postData = {
        id,
        user: {
          id: employee.user.id,
          // username: email,
          user_status_id: 1,
          first_name: firstName,
          last_name: lastName,
          // email,
          types: localTypes,
        },
        first_name: firstName,
        last_name: lastName,
        company_id: localCompanyId !== null ? localCompanyId : companyId,
        primary_division_id: divisionId,
        // user_id: userId,
        emp_number: empNumber,
        region,
        personal_mobile_number: personalMobileNumber,
        personal_email_address: personalEmailAddress,
        official_mobile_number: officialMobileNumber,
        official_email_address: officialEmailAddress,
        ssn,
        joining_date: toServerDate(joiningDate),
        date_of_birth: toServerDate(dateOfBirth),
        designation,
        contractor_start_date: toServerDate(contractorStartDate),
        contractor_end_date: toServerDate(contractorEndDate),
        on_payroll: onPayroll,
        primary_photo_id: photo === null ? employee.primary_photo_id : photo.id,
        gender,
        employee_status_id: employeeStatusId,

        // parent_id: parentId === -1 ? null : parentId,
      };

      if (password !== null && password !== '') {
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

    await dispatch(addPhoto(formData));
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
              width={100}
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

  return (
    <>
      <Row>
        <Col>
          <Card>
            <Card.Header>
              Edit Employee
              <NavLink to="/private/employees">
                <Button
                  className="btn-sm"
                  variant="primary"
                  type="button"
                  style={{ float: 'right' }}
                >
                  Back
                </Button>
              </NavLink>
            </Card.Header>
            {employee && (
              <Card.Body>
                <Form
                  noValidate
                  validated={validated}
                  onSubmit={onEmployeeSubmit}
                >
                  {renderPhoto()}
                  <Row>
                    <Col md={6}>
                      <Form.Group controlId="formFile" className="mb-3">
                        <Form.Label>Employee Photo</Form.Label>
                        <Form.Control type="file" onChange={onLogoFileChange} />
                      </Form.Group>
                    </Col>
                    {/* First Name Field */}
                    <Col md={6}>
                      <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>First Name</Form.Label>
                        <Form.Control
                          type="text"
                          placeholder="First Name"
                          onChange={onFirstNameChangeHandler}
                          value={firstName}
                        />
                      </Form.Group>
                    </Col>

                    {/* Last Name Field */}
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

                    {/* Email Field */}
                    {/* <Col md={6}> */}
                    {/*  <Form.Group className="mb-3" controlId="formBasicEmail"> */}
                    {/*    <Form.Label>Email</Form.Label> */}
                    {/*    <Form.Control */}
                    {/*      type="text" */}
                    {/*      placeholder="Email" */}
                    {/*      onChange={onEmailChangeHandler} */}
                    {/*      value={email} */}
                    {/*    /> */}
                    {/*  </Form.Group> */}
                    {/* </Col> */}

                    {/* Password Field */}
                    <Col md={6}>
                      <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Password</Form.Label>
                        <Form.Control
                          type="password"
                          placeholder="Password"
                          onChange={onPasswordChangeHandler}
                        />
                        <Form.Control.Feedback type="invalid">
                          Please provide a valid password.
                        </Form.Control.Feedback>
                      </Form.Group>
                    </Col>
                    <Col md={6}>
                      <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>User Roles</Form.Label>
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
                    {/* Company id Field */}
                    {localCompanyId === null && (
                      <Col md={6}>
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                          <Form.Label>Company </Form.Label>

                          {employee && (
                            <CompanySelect
                              onChange={onCompanyChangeHandler}
                              entity={employee.company}
                            />
                          )}
                        </Form.Group>
                      </Col>
                    )}

                    {/* Company id Field */}

                    <Col md={6}>
                      <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Division </Form.Label>

                        {employee && (
                          <DivisionSelect
                            onChange={onDivisionChangeHandler}
                            entity={employee.primary_division}
                            companyId={
                              localCompanyId !== null
                                ? localCompanyId
                                : companyId
                            }
                          />
                        )}
                      </Form.Group>
                    </Col>

                    {/* On Payroll Field */}
                    <Col md={6}>
                      <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>On Payroll</Form.Label>
                        {employee !== null && (
                          <Select
                            required
                            options={PAY_ROLL_DATA.map((payroll) => {
                              return { value: payroll.id, label: payroll.name };
                            })}
                            onChange={onOnPayrollChangeHandler}
                            value={selectedOnPayrollOption}
                          />
                        )}

                        <Form.Control.Feedback type="invalid">
                          Please provide a valid on active.
                        </Form.Control.Feedback>
                      </Form.Group>
                    </Col>

                    <Col md={6}>
                      {/* Employee Status */}
                      <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Employee Status</Form.Label>
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

                    {/* Gender Field */}
                    <Col md={6}>
                      <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Gender</Form.Label>
                        {employee !== null && (
                          <Select
                            required
                            options={GENDER_DATA.map((gen) => {
                              return { value: gen.id, label: gen.name };
                            })}
                            onChange={onGenderChangeHandler}
                            value={selectedGenderOption}
                          />
                        )}

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
                          value={empNumber}
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
                          value={region}
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
                          value={personalMobileNumber}
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
                          value={personalEmailAddress}
                        />
                      </Form.Group>
                    </Col>

                    {/* Official Mobile Number Field */}
                    <Col md={6}>
                      <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Company Phone</Form.Label>
                        <NumberFormat
                          className="form-control"
                          format="(###) ###-####"
                          mask="_"
                          placeholder="Company Phone"
                          onValueChange={(value) => {
                            console.log(value.value);
                            setOfficialMobileNumber(value.value);
                          }}
                          value={officialMobileNumber}
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
                          value={officialEmailAddress}
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
                          value={ssn}
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
                          value={joiningDate}
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

                    {/* Contractor Start Date Field */}
                    <Col md={6}>
                      <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Start Date</Form.Label>
                        <Form.Control
                          type="date"
                          placeholder="Start Date"
                          onChange={onContractorStartDateChangeHandler}
                          value={contractorStartDate}
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
                          value={contractorEndDate}
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
                          value={designation}
                        />
                      </Form.Group>
                    </Col>
                  </Row>
                  <Button variant="primary" type="submit">
                    Submit
                  </Button>
                </Form>
              </Card.Body>
            )}
          </Card>
        </Col>
      </Row>
      <DocumentList tableName="employees" columnName="employee_id" value={id} />
    </>
  );
};

export default EditEmployee;
