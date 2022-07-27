import { Button, Card, Col, Form, Row } from 'react-bootstrap';
import React, { useEffect, useState } from 'react';
import { NavLink, useNavigate, useParams } from 'react-router-dom';
import URLConstants from '../../constants/URLConstants';
import { fetchGET, fetchPUT } from '../../utils/NetworkUtils';
import { toast } from 'react-toastify';
import CustomSelect from '../../components/widgets/CustomSelect';

const EditAuditReportAnswer = () => {
  const [validated, setValidated] = useState(false);

  const history = useNavigate();

  const [trainingCourseId, setTrainingCourseId] = useState(-1);
  const [trainingEventId, setTrainingEventId] = useState(-1);
  const [trainingCoursesTrainingEvent, setTrainingCoursesTrainingEvent] =
    useState(null);

  const { id } = useParams();
  const params = useParams();

  useEffect(() => {
    if (trainingCoursesTrainingEvent != null) {
      setTrainingCourseId(trainingCoursesTrainingEvent.training_course_id);
      setTrainingEventId(trainingCoursesTrainingEvent.training_event_id);
    }
  }, [trainingCoursesTrainingEvent]);

  useEffect(() => {
    console.log(`param is ${params.id}`);
    loadTrainingCoursesTrainingEvent();
  }, []);

  const loadTrainingCoursesTrainingEvent = async () => {
    try {
      const url = `${URLConstants.GET_TRAINING_COURSES_TRAINING_EVENT_URL}/${id}.json`;
      const response = await fetchGET(url);
      setTrainingCoursesTrainingEvent(response.data);
    } catch (error) {
      toast(error.message || 'Failed');
    }
  };

  const onTrainingCoursesTrainingEventSubmit = (event) => {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }

    setValidated(true);
    event.preventDefault();
    const postData = {
      id,
      training_course_id: trainingCourseId,
      training_event_id: trainingEventId,
    };
    postTrainingCoursesTrainingEvent(postData);
  };

  const postTrainingCoursesTrainingEvent = async (data) => {
    try {
      const url = `${URLConstants.GET_TRAINING_COURSES_TRAINING_EVENT_URL}/${id}.json`;

      await fetchPUT(url, data);

      history('../../training-courses-training-events');
    } catch (error) {
      toast(error.message || 'Failed');
    }
  };
  return (
    <Row>
      <Col>
        <Card>
          <Card.Header>
            Edit Training Courses Training Event
            <NavLink to="/training-courses-training-events">
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
          {trainingCoursesTrainingEvent && (
            <Card.Body>
              <Form
                noValidate
                validated={validated}
                onSubmit={onTrainingCoursesTrainingEventSubmit}
              >
                <Row>
                  <Col md={6}>
                    {/* Training Course */}
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                      <Form.Label>Training Course</Form.Label>
                      <CustomSelect
                        params={{
                          url: URLConstants.TRAINING_COURSES_URL,
                        }}
                        onChange={(value) => {
                          setTrainingCourseId(value);
                        }}
                        entity={trainingCoursesTrainingEvent.training_course}
                      />
                      <Form.Control.Feedback type="invalid">
                        Please provide a valid Training Course.
                      </Form.Control.Feedback>
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    {/* Training Event */}
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                      <Form.Label>Training Event</Form.Label>
                      <CustomSelect
                        params={{
                          url: URLConstants.TRAINING_EVENTS_URL,
                        }}
                        onChange={(value) => {
                          setTrainingEventId(value);
                        }}
                        entity={trainingCoursesTrainingEvent.training_event}
                      />
                      <Form.Control.Feedback type="invalid">
                        Please provide a valid Training Event.
                      </Form.Control.Feedback>
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

export default EditAuditReportAnswer;
