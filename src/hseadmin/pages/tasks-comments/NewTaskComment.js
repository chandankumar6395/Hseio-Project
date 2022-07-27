import { Button, Card, Col, Form, Row } from 'react-bootstrap';
import React, { useEffect, useState } from 'react';

import { useNavigate } from 'react-router-dom';
import { fetchPOST } from '../../utils/NetworkUtils';
import URLConstants from '../../constants/URLConstants';
import CustomSelect from '../../components/widgets/CustomSelect';

const NewTaskComment = () => {
  const [validated, setValidated] = useState(false);

  const history = useNavigate();
  const [notes, setNotes] = useState('');
  const [taskId, setTaskId] = useState(-1);

  useEffect(() => {}, []);

  const onTaskCommentSubmit = (event) => {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }

    setValidated(true);
    event.preventDefault();
    const postData = {
      notes,
      task_id: taskId,
    };
    postTaskComment(postData);
  };

  const postTaskComment = async (data) => {
    try {
      await fetchPOST(URLConstants.TASK_COMMENTS_URL, data);
      history('../../private/task-comments');
    } catch (error) {
      console.log(error);
    }
  };

  const onNotesChangeHandler = (event) => {
    setNotes(event.target.value);
  };
  return (
    <Row>
      <Col>
        <Card>
          <Card.Header>
            Add Tasks Comments
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
              onSubmit={onTaskCommentSubmit}
            >
              <Row>
                <Col md={6}>
                  {/* Notes Field */}
                  <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Notes</Form.Label>
                    <Form.Control
                      required
                      type="text"
                      rows={2}
                      placeholder="Note"
                      onChange={onNotesChangeHandler}
                    />
                    <Form.Control.Feedback type="invalid">
                      Please provide a valid notes.
                    </Form.Control.Feedback>
                  </Form.Group>
                </Col>

                <Col md={6}>
                  {/* Task Field */}
                  <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Task</Form.Label>
                    <CustomSelect
                      params={{
                        url: URLConstants.TASKS_URL,
                      }}
                      onChange={(value) => {
                        setTaskId(value);
                      }}
                    />
                    <Form.Control.Feedback type="invalid">
                      Please provide a valid Task.
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
export default NewTaskComment;
