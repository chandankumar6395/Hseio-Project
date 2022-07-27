/* eslint-disable camelcase */
import { Button, Card, Col, Form, Row } from 'react-bootstrap';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, useNavigate, useParams } from 'react-router-dom';
import Select from 'react-select';
import { YES_NO_DATA } from '../../constants/Constants';
import CustomSelect from '../../components/widgets/CustomSelect';

import URLConstants from '../../constants/URLConstants';
import {
  getTrainingCourse,
  // updateTrainingCourse,
} from '../../store/actions/training_courses';
import { fetchPUT } from '../../utils/NetworkUtils';

const EditTrainingCourse = () => {
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
  const [sampleCertificateId, setSampleCertificateId] = useState('');
  const [selectedRecurringOption, setSelectedRecurringOption] = useState({});
  const [selectedMandatoryOption, setSelectedMandatoryOption] = useState({});
  const [selectedIssueCertificateOption, setSelectedIssueCertificateOption] =
    useState({});

  const dispatch = useDispatch();
  const training_course = useSelector(
    (state) => state.trainingCourse.training_course
  );

  const params = useParams();
  const { id } = useParams();

  useEffect(() => {
    if (training_course != null) {
      setName(training_course.name);
      setShortDesc(training_course.short_desc);
      setLongDesc(training_course.long_desc);
      setTrainingCourseTypeId(training_course.training_course_type_id);
      setDurations(training_course.durations);
      setRecurring(training_course.recurring);
      setRecurringInDays(training_course.recurring_in_days);
      setMandatory(training_course.mandatory);
      setIssueCertificate(training_course.issue_certificate);
      setSampleCertificateId(training_course.sample_certificate_id);
      setThumbnailId(training_course.thumbnail_id);
      setSelectedRecurringOption({
        value: training_course.recurring,
        label: YES_NO_DATA.find((x) => x.id === training_course.recurring).name,
      });
      console.log(training_course);
      setSelectedMandatoryOption({
        value: training_course.mandatory,
        label: YES_NO_DATA.find((x) => x.id === training_course.mandatory).name,
      });
      setSelectedIssueCertificateOption({
        value: training_course.issue_certificate,
        label: YES_NO_DATA.find(
          (x) => x.id === training_course.issue_certificate
        ).name,
      });
    }
  }, [training_course]);

  useEffect(() => {
    console.log(`param is ${params.id}`);
    loadTrainingCourse();
  }, []);

  const loadTrainingCourse = async () => {
    await dispatch(getTrainingCourse(id));
  };

  const onTrainingCourseSubmit = (event) => {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }

    setValidated(true);
    event.preventDefault();
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

  return (
    <Row>
      <Col>
        <Card>
          <Card.Header>
            Edit Training Course
            <NavLink to="/private/training-courses">
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
          {training_course && (
            <Card.Body>
              <Form
                noValidate
                validated={validated}
                onSubmit={onTrainingCourseSubmit}
              >
                <Row>
                  {/* Name Field */}
                  <Col md={6}>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                      <Form.Label>Name</Form.Label>
                      <Form.Control
                        required
                        type="text"
                        placeholder="Name"
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
                        placeholder="Long Desc"
                        onChange={onLongDescChangeHandler}
                        value={longDesc}
                      />
                    </Form.Group>
                  </Col>

                  {/* training_course_type_id filed */}
                  <Col md={6}>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                      <Form.Label>Training Course Type</Form.Label>
                      <CustomSelect
                        params={{
                          url: URLConstants.TRAINING_COURSE_TYPES_URL,
                        }}
                        onChange={(value) => {
                          setTrainingCourseTypeId(value);
                        }}
                        entity={training_course.training_course_type}
                      />
                      <Form.Control.Feedback type="invalid">
                        Please provide a valid name.
                      </Form.Control.Feedback>
                    </Form.Group>
                  </Col>

                  {/* Duration Field */}
                  <Col md={6}>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                      <Form.Label>Durations</Form.Label>
                      <Form.Control
                        required
                        type="number"
                        placeholder="Duration"
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
                      <Form.Label>Recurring</Form.Label>
                      {training_course !== null && (
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
                      <Form.Label>Recurring In Days</Form.Label>
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
                      <Form.Label>Mandatory</Form.Label>
                      {training_course !== null && (
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
                      <Form.Label>Issue Certificate</Form.Label>
                      {training_course !== null && (
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
                        entity={training_course.sample_certificate}
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
                        entity={training_course.thumbnail}
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
  );
};

export default EditTrainingCourse;
