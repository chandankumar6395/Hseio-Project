import React, { useEffect, useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { Col, Form, Row } from 'react-bootstrap';
import Select from 'react-select';
import { toast } from 'react-toastify';
import { Helmet } from 'react-helmet-async';
import { Button, Grid, Typography } from '@mui/material';
import { uploadDocumentFile } from '../../store/actions/documents';
import { addCertificates } from '../../store/actions/certificates';
import { loadEmployees } from '../../store/actions/employees';
import { loadTrainingCourseList } from '../../store/actions/training_courses';
import { CustomBreadcrumbs, CustomDivider } from '../../utils/MUIStyle';
import { KEY_COMPANY_ID } from '../../constants/Constants';

const NewCertificateMUI = () => {
  const localCompanyId = localStorage.getItem(KEY_COMPANY_ID);
  // const localDivisionId = useSelector((state) => state.auth.selectedDivision);
  // const localJobSiteId = useSelector((state) => state.auth.selectedJobSite);
  const dispatch = useDispatch();
  const history = useNavigate();
  const [name, setName] = useState('');
  const [shortDesc, setShortDesc] = useState('');
  const [longDesc, setLongDesc] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  // const [score, setScore] = useState('');
  const [employeeId, setEmployeeId] = useState('');
  const [trainingCourseId, setTrainingCourseId] = useState('');
  const [validated, setValidated] = useState(false);

  const document = useSelector((state) => state.document.document);
  const employees = useSelector((state) => state.employee.employees);
  const trainingCourses = useSelector(
    (state) => state.trainingCourse.training_courses
  );

  useEffect(() => {
    fetchEmployees();
    fetchTrainingCourses();
  }, []);

  const fetchEmployees = async () => {
    await dispatch(loadEmployees(1, '', 'Users.first_name', 'asc', -1, 100));
  };

  const fetchTrainingCourses = async () => {
    await dispatch(loadTrainingCourseList(1, '', 200));
  };

  const onCertificateSubmit = (event) => {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }
    setValidated(true);
    event.preventDefault();

    if (document === null) {
      toast('Please select Certificate Document' || 'Failed');
    } else if (employeeId === null || employeeId === '') {
      toast('Please select Employee' || 'Failed');
    } else if (trainingCourseId === null || trainingCourseId === '') {
      toast('Please select Training Course' || 'Failed');
    } else if (name === '') {
      toast('Please enter Certificate Name');
    } else {
      const postData = {
        name,
        short_desc: shortDesc,
        long_desc: longDesc,
        start_date: startDate,
        end_date: endDate,
        employee_id: employeeId,
        document_id: document != null ? document.id : null,
        training_course_id: trainingCourseId,
        company_id: localCompanyId != null ? localCompanyId : null,
      };
      // console.log(`data is => ${JSON.stringify(postData)}`);
      postCertificate(postData).then(() => {});
    }

    setValidated(true);
    event.preventDefault();
  };

  const postCertificate = async (data) => {
    try {
      await dispatch(addCertificates(data));
      history('../../private/certificates');
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

  const onLongDescChangeHandler = (event) => {
    // console.log(event.target.value);
    setLongDesc(event.target.value);
  };

  const onIssueDateChangeHandler = (event) => {
    // console.log(event.target.value);
    setStartDate(event.target.value);
  };
  const onExpirationDateChangeHandler = (event) => {
    // console.log(event.target.value);
    setEndDate(event.target.value);
  };
  // const onScoreChangeHandler = (event) => {
  //   // console.log(event.target.value);
  //   setScore(event.target.value);
  // };

  // On file select (from the pop up)
  const onDocumentFileChange = (event) => {
    // const {files} = event.target;
    // Object.values(files).forEach(function (file, index) {
    //   // myformData.append(index, file);
    //   // console.log('index = ', index, ` file = ${file}`);
    // });
    // // console.log(event.target.files[0]);
    const file = event.target.files[0];

    // console.log(`---->${file.type}`);
    if (file.type !== 'application/pdf') {
      toast.error('Please select PDF file.' || 'Failed');
    } else {
      onDocumentFileUpload(event.target.files[0]);
    }
  };

  // On file upload (click the upload button)
  const onDocumentFileUpload = async (value) => {
    // Create an object of formData
    const formData = new FormData();

    // Update the formData object
    formData.append('document', value, value.name);

    await dispatch(uploadDocumentFile(formData));
  };

  const onEmployeeChangeHandler = (selectedOption) => {
    setEmployeeId(+selectedOption.value);
    // console.log(selectedOption.value);
  };

  const onTrainingCourseChangeHandler = (selectedOption) => {
    setTrainingCourseId(+selectedOption.value);
    // console.log(selectedOption.value);
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
      <Helmet title="Add Certificate" />

      <Grid justifyContent="space-between" container spacing={10}>
        <Grid item>
          <Typography variant="h3" gutterBottom display="inline">
            Certificates
          </Typography>

          <CustomBreadcrumbs aria-label="Breadcrumb" mt={2}>
            <Link component={NavLink} to="/">
              Dashboard
            </Link>
            <Link component={NavLink} to="/private/certificates">
              Certificates
            </Link>
            <Typography>Add Certificate</Typography>
          </CustomBreadcrumbs>
        </Grid>
        <Grid item>
          <div>
            <NavLink to="/private/certificates">
              <Button variant="contained" color="primary">
                Back
              </Button>
            </NavLink>
          </div>
        </Grid>
      </Grid>

      <CustomDivider my={6} />
      <Grid container spacing={6}>
        <Grid item xs={12}>
          <Form noValidate validated={validated} onSubmit={onCertificateSubmit}>
            <Row>
              {/* Employee Certificate Document */}
              <Col md={12}>
                <Form.Group controlId="formFile" className="mb-3">
                  <Form.Label>Employee Certificate Document *</Form.Label>
                  <Form.Control
                    type="file"
                    accept="application/pdf"
                    onChange={onDocumentFileChange}
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                {/* Select Employee Field */}
                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Form.Label>Select Employee *</Form.Label>
                  <Select
                    required
                    options={employees.map((employee) => {
                      return {
                        value: employee.id,
                        label: `${employee.user.first_name} ${employee.user.last_name}`,
                      };
                    })}
                    onChange={onEmployeeChangeHandler}
                  />
                  <Form.Control.Feedback type="invalid">
                    Please provide a valid name.
                  </Form.Control.Feedback>
                </Form.Group>
              </Col>
              <Col md={6}>
                {/* Select training course field */}
                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Form.Label>Select Training Course *</Form.Label>
                  <Select
                    required
                    options={trainingCourses.map((trainingCourse) => {
                      return {
                        value: trainingCourse.id,
                        label: trainingCourse.name,
                      };
                    })}
                    onChange={onTrainingCourseChangeHandler}
                  />
                  <Form.Control.Feedback type="invalid">
                    Please provide a valid name.
                  </Form.Control.Feedback>
                </Form.Group>
              </Col>
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
                    Please provide a valid name.
                  </Form.Control.Feedback>
                </Form.Group>
              </Col>
              <Col md={6}>
                {/* Short Desc */}
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
              <Col md={6}>
                {/* Long Desc */}
                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Form.Label>Long Desc</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={2}
                    maxLength="255"
                    onInput={maxLongDescCheck}
                    placeholder="Long Desc"
                    onChange={onLongDescChangeHandler}
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                {/* Issue Date */}
                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Form.Label>Issue Date</Form.Label>
                  <Form.Control
                    type="Date"
                    placeholder="Start Date"
                    onChange={onIssueDateChangeHandler}
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                {/* Expiration Date */}
                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Form.Label>Expiration Date</Form.Label>
                  <Form.Control
                    type="Date"
                    placeholder="End Date"
                    onChange={onExpirationDateChangeHandler}
                  />
                </Form.Group>
              </Col>
              {/* <Col md={6}> */}
              {/*  /!* Score *!/ */}
              {/*  <Form.Group className="mb-3" controlId="formBasicEmail"> */}
              {/*    <Form.Label>Score</Form.Label> */}
              {/*    <Form.Control */}
              {/*      type="Double" */}
              {/*      placeholder="Score" */}
              {/*      onChange={onScoreChangeHandler} */}
              {/*    /> */}
              {/*  </Form.Group> */}
              {/* </Col> */}
            </Row>

            <Button variant="contained" type="submit" color="primary">
              Submit
            </Button>
          </Form>
        </Grid>
      </Grid>
    </>
  );
};

export default NewCertificateMUI;
