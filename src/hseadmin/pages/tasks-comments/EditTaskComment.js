/* eslint-disable camelcase */
import { Button, Card, Col, Form, Row } from 'react-bootstrap';
import React, { useEffect, useState } from 'react';
import { NavLink, useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import CustomSelect from '../../components/widgets/CustomSelect';
import URLConstants from '../../constants/URLConstants';
import { fetchGET, fetchPUT } from '../../utils/NetworkUtils';

const EditTaskComment = () => {
  const [validated, setValidated] = useState(false);

  const history = useNavigate();

  const [notes, setNotes] = useState('');
  const [taskId, setTaskId] = useState(-1);
  const [taskComment, setTaskComment] = useState(null);

  const params = useParams();
  const { id } = useParams();

  useEffect(() => {
    if (taskComment != null) {
      setNotes(taskComment.notes);
      setTaskId(taskComment.task_id);
    }
  }, [taskComment]);

  useEffect(() => {
    console.log(`param is ${params.id}`);
    loadTaskComment();
  }, []);

  const loadTaskComment = async () => {
    try {
      const url = `${URLConstants.GET_TASK_COMMENT_URL}/${id}.json`;
      const response = await fetchGET(url);
      setTaskComment(response.data);
    } catch (error) {
      toast(error.message || 'Failed');
    }
  };

  const onTaskCommentSubmit = (event) => {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }

    setValidated(true);
    event.preventDefault();
    const postData = {
      id,
      notes,
      task_id: taskId,
    };
    postTaskComment(postData);
  };

  const postTaskComment = async (data) => {
    try {
      const url = `${URLConstants.GET_TASK_COMMENT_URL}/${id}.json`;

      await fetchPUT(url, data);

      history('../../private/task-comments');
    } catch (error) {
      toast(error.message || 'Failed');
    }
  };

  const onNotesChangeHandler = (event) => {
    console.log(event.target.value);
    setNotes(event.target.value);
  };
  return (
    <Row>
      <Col>
        <Card>
          <Card.Header>
            Edit Task Comments
            <NavLink to="/private/task-comments">
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
          {taskComment && (
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
                        placeholder="Notes"
                        onChange={onNotesChangeHandler}
                        value={notes}
                      />
                      <Form.Control.Feedback type="invalid">
                        Please provide a valid notes.
                      </Form.Control.Feedback>
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    {/* Task */}
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                      <Form.Label>Task</Form.Label>
                      <CustomSelect
                        params={{
                          url: URLConstants.GET_TASK_COMMENT_URL,
                        }}
                        onChange={(value) => {
                          setTaskId(value);
                        }}
                        entity={taskComment.task}
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

export default EditTaskComment;
