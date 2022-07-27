/* eslint-disable camelcase */
import { Col, Form, Row } from 'react-bootstrap';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { Link, NavLink, useNavigate } from 'react-router-dom';
import Select from 'react-select';
import { Helmet } from 'react-helmet-async';
import { Button, Grid, Typography } from '@mui/material';
import { toast } from 'react-toastify';
import { YES_NO_DATA } from '../../constants/Constants';
import CustomSelect from '../../components/widgets/CustomSelect';
import URLConstants from '../../constants/URLConstants';
import {
  addTrainingCourse,
  loadTrainingCourseList,
} from '../../store/actions/training_courses';
import { loadTrainingCourseTypeList } from '../../store/actions/training_courses_type';
import { CustomBreadcrumbs, CustomDivider } from '../../utils/MUIStyle';

const NewTrainingCourseMUI = () => {
  const [validated, setValidated] = useState(false);

  const history = useNavigate();

  const [name, setName] = useState('');
  const [shortDesc, setShortDesc] = useState('');
  const [longDesc, setLongDesc] = useState('');
  const [trainingCourseTypeID, setTrainingCourseTypeId] = useState(-1);
  const [durations, setDurations] = useState('');
  const [recurring, setRecurring] = useState('');
  const [recurringInDays, setRecurringInDays] = useState('');
  const [mandatory, setMandatory] = useState('');
  const [issueCertificate, setIssueCertificate] = useState('');
  const [sampleCertificateId, setSampleCertificateId] = useState(null);
  const [thumbnailId, setThumbnailId] = useState('');

  const dispatch = useDispatch();
  const training_course_types = useSelector(
    (state) => state.trainingCourseType.training_course_types
  );

  useEffect(() => {
    fetchTrainingCourses();
    fetchTrainingCourseTypes();
  }, []);

  const fetchTrainingCourses = async () => {
    await dispatch(loadTrainingCourseList());
  };
  const fetchTrainingCourseTypes = async () => {
    await dispatch(loadTrainingCourseTypeList());
  };

  const onTrainingCourseSubmit = (event) => {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }

    setValidated(true);
    event.preventDefault();
    if (name === '') {
      toast('Please Enter Name');
    } else if (trainingCourseTypeID === -1) {
      toast('Please Select Training Course Type');
    } else if (durations === '') {
      toast('Please Enter Duration In Minutes');
    } else if (recurring === '') {
      toast('Please Select Recurring');
    } else if (mandatory === '') {
      toast('Please Select Mandatory');
    } else if (issueCertificate === '') {
      toast('Please Select Issue Certificate');
    } else {
      const postData = {
        name,
        short_desc: shortDesc,
        long_desc: longDesc,
        training_course_type_id: trainingCourseTypeID,
        durations,
        recurring,
        recurring_in_days: recurringInDays,
        mandatory,
        issue_certificate: issueCertificate,
        sample_certificate_id: sampleCertificateId,
        thumbnail_id: thumbnailId,
      };
      postTrainingCourse(postData);
    }
  };

  const postTrainingCourse = async (data) => {
    await dispatch(addTrainingCourse(data));
    history('../../private/training-courses');
  };

  const onNameChangeHandler = (event) => {
    console.log(event.target.value);
    setName(event.target.value);
  };

  const onShortDescChangeHandler = (event) => {
    console.log(event.target.value);
    setShortDesc(event.target.value);
  };

  const onLongDescChangeHandler = (event) => {
    console.log(event.target.value);
    setLongDesc(event.target.value);
  };

  const onTrainingCourseTypeIdChangeHandler = (selectedOption) => {
    setTrainingCourseTypeId(+selectedOption.value);
    console.log(selectedOption.value);
  };

  const onDurationsChangeHandler = (event) => {
    console.log(event.target.value);
    setDurations(event.target.value);
  };

  const onRecurringChangeHandler = (selectedOption) => {
    setRecurring(+selectedOption.value);
  };

  const onRecurringInDaysChangeHandler = (event) => {
    console.log(event.target.value);
    setRecurringInDays(event.target.value);
  };

  const onMandatoryChangeHandler = (selectedOption) => {
    setMandatory(+selectedOption.value);
  };

  const onIssueCertificatesChangeHandler = (selectedOption) => {
    setIssueCertificate(+selectedOption.value);
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
      <Helmet title="Add Training Course" />

      <Grid justifyContent="space-between" container spacing={10}>
        <Grid item>
          <Typography variant="h3" gutterBottom display="inline">
            Training Courses
          </Typography>

          <CustomBreadcrumbs aria-label="Breadcrumb" mt={2}>
            <Link component={NavLink} to="/">
              Dashboard
            </Link>
            <Link component={NavLink} to="/private/training-courses">
              Training Courses
            </Link>
            <Typography>Add Training Course</Typography>
          </CustomBreadcrumbs>
        </Grid>
        <Grid item>
          <div>
            <NavLink to="/private/training-courses">
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
          <Form
            noValidate
            validated={validated}
            onSubmit={onTrainingCourseSubmit}
          >
            <Row>
              {/* Name Field */}
              <Col md={6}>
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

              {/* Short Desc Field */}
              <Col md={6}>
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

              {/* Long Desc Field */}
              <Col md={6}>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Form.Label>Long Desc</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={2}
                    maxLength="500"
                    onInput={maxLongDescCheck}
                    placeholder="Long Desc"
                    onChange={onLongDescChangeHandler}
                  />
                </Form.Group>
              </Col>

              {/* Training_course_type_id */}
              <Col md={6}>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Form.Label>Training Course Type *</Form.Label>
                  <Select
                    required
                    options={training_course_types.map(
                      (training_course_type) => {
                        return {
                          value: training_course_type.id,
                          label: training_course_type.name,
                        };
                      }
                    )}
                    onChange={onTrainingCourseTypeIdChangeHandler}
                  />
                  <Form.Control.Feedback type="invalid">
                    Please provide a valid Training Course ID .
                  </Form.Control.Feedback>
                </Form.Group>
              </Col>

              {/* durations Field */}
              <Col md={6}>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Form.Label>Durations in Minutes *</Form.Label>
                  <Form.Control
                    required
                    type="number"
                    placeholder="Duration"
                    onChange={onDurationsChangeHandler}
                  />
                  <Form.Control.Feedback type="invalid">
                    Please provide a valid durations.
                  </Form.Control.Feedback>
                </Form.Group>
              </Col>

              {/* recurring Field */}
              <Col md={6}>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Form.Label>Recurring *</Form.Label>
                  <Select
                    required
                    options={YES_NO_DATA.map((item) => {
                      return { value: item.id, label: item.name };
                    })}
                    onChange={onRecurringChangeHandler}
                  />
                  <Form.Control.Feedback type="invalid">
                    Please provide a valid recurring.
                  </Form.Control.Feedback>
                </Form.Group>
              </Col>

              {/* recurring in Days Field */}
              <Col md={6}>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Form.Label>Recurring In Days</Form.Label>
                  <Form.Control
                    type="number"
                    placeholder="Recurring in days"
                    onChange={onRecurringInDaysChangeHandler}
                  />
                </Form.Group>
              </Col>

              {/* mandatory Field */}
              <Col md={6}>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Form.Label>Mandatory *</Form.Label>
                  <Select
                    required
                    options={YES_NO_DATA.map((item) => {
                      return { value: item.id, label: item.name };
                    })}
                    onChange={onMandatoryChangeHandler}
                  />
                  <Form.Control.Feedback type="invalid">
                    Please provide a valid mandatory.
                  </Form.Control.Feedback>
                </Form.Group>
              </Col>

              {/* issue certificate Field */}
              <Col md={6}>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Form.Label>Issue Certificate *</Form.Label>
                  <Select
                    required
                    options={YES_NO_DATA.map((item) => {
                      return { value: item.id, label: item.name };
                    })}
                    onChange={onIssueCertificatesChangeHandler}
                  />
                  <Form.Control.Feedback type="invalid">
                    Please provide a valid issue certificate.
                  </Form.Control.Feedback>
                </Form.Group>
              </Col>

              {/* Sample_certificate_id */}
              <Col md={6}>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Form.Label>Sample Certificate</Form.Label>
                  <CustomSelect
                    params={{
                      url: URLConstants.SAMPLE_CERTIFICATES_URL,
                    }}
                    onChange={(value) => {
                      setSampleCertificateId(value);
                    }}
                  />
                </Form.Group>
              </Col>

              {/* thumbnail Id */}
              <Col md={6}>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Form.Label>Thumbnail</Form.Label>
                  <CustomSelect
                    params={{
                      url: URLConstants.THUMBNAILS_URL,
                    }}
                    onChange={(value) => {
                      setThumbnailId(value);
                    }}
                  />
                </Form.Group>
              </Col>
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

export default NewTrainingCourseMUI;
