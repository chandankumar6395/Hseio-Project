import { Button, Card, Col, Form, Row } from 'react-bootstrap';
import React, { useState } from 'react';

import { useNavigate } from 'react-router-dom';
import { fetchPOST } from '../../utils/NetworkUtils';
import URLConstants from '../../constants/URLConstants';
import CustomSelect from '../../components/widgets/CustomSelect';

const NewTrainingCoursesTrainingEvent = () => {
  const [validated, setValidated] = useState(false);

  const history = useNavigate();
  const [trainingCourseId, setTrainingCourseId] = useState('');
  const [trainingEventId, setTrainingEventId] = useState('');

  const onTrainingCoursesTrainingEventSubmit = (event) => {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }

    setValidated(true);
    event.preventDefault();
    const postData = {
      training_course_id: trainingCourseId,
      training_event_id: trainingEventId,
    };
    postTrainingCoursesTrainingEvent(postData);
  };

  const postTrainingCoursesTrainingEvent = async (data) => {
    try {
      await fetchPOST(URLConstants.TRAINING_COURSES_TRAINING_EVENTS_URL, data);
      history('../../training-courses-training-events');
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <Row>
      <Col>
        <Card>
          <Card.Header>
            Add Training Courses Training Events
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
            <Form
              noValidate
              validated={validated}
              onSubmit={onTrainingCoursesTrainingEventSubmit}
            >
              <Row>
                <Col md={6}>
                  {/* Training Course Field */}
                  <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Training Course</Form.Label>
                    <CustomSelect
                      params={{
                        url: URLConstants.TRAINING_COURSES_URL,
                      }}
                      onChange={(value) => {
                        setTrainingCourseId(value);
                      }}
                    />
                    <Form.Control.Feedback type="invalid">
                      Please provide a valid audit.
                    </Form.Control.Feedback>
                  </Form.Group>
                </Col>

                <Col md={6}>
                  {/* Training Event Field */}
                  <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Training Event</Form.Label>
                    <CustomSelect
                      params={{
                        url: URLConstants.TRAINING_EVENTS_URL,
                      }}
                      onChange={(value) => {
                        setTrainingEventId(value);
                      }}
                    />
                    <Form.Control.Feedback type="invalid">
                      Please provide a valid audit.
                    </Form.Control.Feedback>
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
    </Row>
  );
};
export default NewTrainingCoursesTrainingEvent;
