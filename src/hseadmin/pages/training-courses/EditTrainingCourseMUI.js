/* eslint-disable camelcase */
import { Col, Form, Row } from 'react-bootstrap';
import React, { useEffect, useState } from 'react';
import { Link, NavLink, useNavigate, useParams } from 'react-router-dom';
import Select from 'react-select';
import { Helmet } from 'react-helmet-async';
import { Button, Grid, Typography } from '@mui/material';
import { toast } from 'react-toastify';
import { YES_NO_DATA } from '../../constants/Constants';
import CustomSelect from '../../components/widgets/CustomSelect';

import URLConstants from '../../constants/URLConstants';
import { fetchGET, fetchPUT } from '../../utils/NetworkUtils';
import { CustomBreadcrumbs, CustomDivider } from '../../utils/MUIStyle';
import AddDocument from './AddDocument';
// import DocumentList from '../documents/DocumentList';

const EditTrainingCourseMUI = () => {
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
  const [thumbnailId, setThumbnailId] = useState('');
  const [sampleCertificateId, setSampleCertificateId] = useState(null);
  const [selectedRecurringOption, setSelectedRecurringOption] = useState({});
  const [selectedMandatoryOption, setSelectedMandatoryOption] = useState({});
  const [selectedIssueCertificateOption, setSelectedIssueCertificateOption] =
    useState({});
  const [trainingCourse, setTrainingCourse] = useState(null);
  const params = useParams();
  const { id } = useParams();
  useEffect(() => {
    if (trainingCourse != null) {
      setName(trainingCourse.name);
      setShortDesc(trainingCourse.short_desc);
      setLongDesc(trainingCourse.long_desc);
      setTrainingCourseTypeId(trainingCourse.training_course_type_id);
      setDurations(trainingCourse.durations);
      setRecurring(trainingCourse.recurring);
      setRecurringInDays(trainingCourse.recurring_in_days);
      setMandatory(trainingCourse.mandatory);
      setIssueCertificate(trainingCourse.issue_certificate);
      setSampleCertificateId(trainingCourse.sample_certificate_id);
      setThumbnailId(trainingCourse.thumbnail_id);
      setSelectedRecurringOption({
        value: trainingCourse.recurring,
        label: YES_NO_DATA.find((x) => x.id === trainingCourse.recurring).name,
      });
      console.log(trainingCourse);
      setSelectedMandatoryOption({
        value: trainingCourse.mandatory,
        label: YES_NO_DATA.find((x) => x.id === trainingCourse.mandatory).name,
      });
      setSelectedIssueCertificateOption({
        value: trainingCourse.issue_certificate,
        label: YES_NO_DATA.find(
          (x) => x.id === trainingCourse.issue_certificate
        ).name,
      });
    }
  }, [trainingCourse]);

  useEffect(() => {
    console.log(`param is ${params.id}`);
    loadTrainingCourse();
  }, []);

  const loadTrainingCourse = async () => {
    try {
      const url = `${URLConstants.GET_TRAINING_COURSE_URL}/${id}.json`;

      console.log('getTrainingCourse url =', url);

      const resData = await fetchGET(url);

      console.log('getTrainingCourse --->', resData);
      setTrainingCourse(resData.data);
    } catch (error) {
      console.log(error);
      throw error;
    }
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
    } else if (durations === '') {
      toast('Please Enter Duration In Minutes');
    } else {
      const postData = {
        id,
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
    // await dispatch(updateTrainingCourse(data));

    try {
      const url = `${URLConstants.GET_TRAINING_COURSE_URL}/${id}.json`;

      console.log('updateTrainingCourse url =', url);

      const resData = await fetchPUT(url, data);
      history('../../private/training-courses');
      console.log('updateTrainingCourse --->', resData);
    } catch (error) {
      console.log(error.message);
    }
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

  const onDurationsChangeHandler = (event) => {
    console.log(event.target.value);
    setDurations(event.target.value);
  };

  const onRecurringChangeHandler = (selectedOption) => {
    setRecurring(+selectedOption.value);
    setSelectedRecurringOption(selectedOption);
  };

  const onRecurringInDaysChangeHandler = (event) => {
    console.log(event.target.value);
    setRecurringInDays(event.target.value);
  };

  const onMandatoryChangeHandler = (selectedOption) => {
    setMandatory(+selectedOption.value);
    setSelectedMandatoryOption(selectedOption);
  };

  const onIssueCertificatesChangeHandler = (selectedOption) => {
    setIssueCertificate(+selectedOption.value);
    setSelectedIssueCertificateOption(selectedOption);
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
      <Helmet title="Edit Training Course" />

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
            <Typography>Edit Training Course</Typography>
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
          {trainingCourse && (
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
                      value={name}
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
                      value={shortDesc}
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
                      value={longDesc}
                    />
                  </Form.Group>
                </Col>

                {/* training_course_type_id filed */}
                <Col md={6}>
                  <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Training Course Type *</Form.Label>
                    <CustomSelect
                      params={{
                        url: URLConstants.TRAINING_COURSE_TYPES_URL,
                      }}
                      onChange={(value) => {
                        setTrainingCourseTypeId(value);
                      }}
                      entity={trainingCourse.training_course_type}
                    />
                    <Form.Control.Feedback type="invalid">
                      Please provide a valid name.
                    </Form.Control.Feedback>
                  </Form.Group>
                </Col>

                {/* Duration Field */}
                <Col md={6}>
                  <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Durations *</Form.Label>
                    <Form.Control
                      required
                      type="number"
                      placeholder="Duration *"
                      onChange={onDurationsChangeHandler}
                      value={durations}
                    />
                    <Form.Control.Feedback type="invalid">
                      Please provide a valid long desc.
                    </Form.Control.Feedback>
                  </Form.Group>
                </Col>

                {/* Recurring Field */}
                <Col md={6}>
                  <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Recurring *</Form.Label>
                    {trainingCourse !== null && (
                      <Select
                        required
                        options={YES_NO_DATA.map((recurring) => {
                          return {
                            value: recurring.id,
                            label: recurring.name,
                          };
                        })}
                        onChange={onRecurringChangeHandler}
                        value={selectedRecurringOption}
                      />
                    )}
                    <Form.Control.Feedback type="invalid">
                      Please provide a valid recurring.
                    </Form.Control.Feedback>
                  </Form.Group>
                </Col>

                {/* Recurring In Days Field */}
                <Col md={6}>
                  <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Recurring In Days </Form.Label>
                    <Form.Control
                      type="number"
                      placeholder="Recurring in days"
                      onChange={onRecurringInDaysChangeHandler}
                      value={recurringInDays}
                    />
                  </Form.Group>
                </Col>

                {/* Mandatory Field */}
                <Col md={6}>
                  <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Mandatory *</Form.Label>
                    {trainingCourse !== null && (
                      <Select
                        required
                        options={YES_NO_DATA.map((mandatory) => {
                          return {
                            value: mandatory.id,
                            label: mandatory.name,
                          };
                        })}
                        onChange={onMandatoryChangeHandler}
                        value={selectedMandatoryOption}
                      />
                    )}
                    <Form.Control.Feedback type="invalid">
                      Please provide a valid mandatory.
                    </Form.Control.Feedback>
                  </Form.Group>
                </Col>

                {/* Issue Certificate Field */}
                <Col md={6}>
                  <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Issue Certificate *</Form.Label>
                    {trainingCourse !== null && (
                      <Select
                        required
                        options={YES_NO_DATA.map((issue_certificate) => {
                          return {
                            value: issue_certificate.id,
                            label: issue_certificate.name,
                          };
                        })}
                        onChange={onIssueCertificatesChangeHandler}
                        value={selectedIssueCertificateOption}
                      />
                    )}
                    <Form.Control.Feedback type="invalid">
                      Please provide a valid certificate.
                    </Form.Control.Feedback>
                  </Form.Group>
                </Col>

                {/* sample certificate filed */}
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
                      entity={trainingCourse.sample_certificate}
                    />
                  </Form.Group>
                </Col>

                {/* thumbnail filed */}
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
                      entity={trainingCourse.thumbnail}
                    />
                  </Form.Group>
                </Col>
              </Row>

              <Button variant="contained" type="submit" color="primary">
                Submit
              </Button>
            </Form>
          )}
        </Grid>
      </Grid>
      <p>
        <AddDocument
          tableName="training_courses"
          columnName="training_course_id"
          value={id}
        />
      </p>
    </>
  );
};

export default EditTrainingCourseMUI;
