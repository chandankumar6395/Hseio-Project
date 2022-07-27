/* eslint-disable camelcase */
import { Col, Form, Row } from 'react-bootstrap';
import React, { useEffect, useState } from 'react';
import { Link, NavLink, useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Helmet } from 'react-helmet-async';
import { Button, Grid, Typography } from '@mui/material';
import CustomSelect from '../../components/widgets/CustomSelect';
import URLConstants from '../../constants/URLConstants';
import { fetchGET, fetchPUT } from '../../utils/NetworkUtils';
import { CustomBreadcrumbs, CustomDivider } from '../../utils/MUIStyle';

const EditTaskCommentMUI = () => {
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
    if (notes === '') {
      toast('Please Enter Notes');
    } else if (taskId === -1) {
      toast('Please Enter Task');
    } else {
      const postData = {
        id,
        notes,
        task_id: taskId,
      };
      postTaskComment(postData);
    }
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
    <>
      <Helmet title="Edit Task Comment" />

      <Grid justifyContent="space-between" container spacing={10}>
        <Grid item>
          <Typography variant="h3" gutterBottom display="inline">
            Task Comment
          </Typography>

          <CustomBreadcrumbs aria-label="Breadcrumb" mt={2}>
            <Link component={NavLink} to="/">
              Dashboard
            </Link>
            <Link component={NavLink} to="/private/task-comments">
              Task Comments
            </Link>
            <Typography>Edit Task Comment</Typography>
          </CustomBreadcrumbs>
        </Grid>
        <Grid item>
          <div>
            <NavLink to="/private/task-comments">
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
          {taskComment && (
            <Form
              noValidate
              validated={validated}
              onSubmit={onTaskCommentSubmit}
            >
              <Row>
                <Col md={6}>
                  {/* Notes Field */}
                  <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Notes *</Form.Label>
                    <Form.Control
                      required
                      type="text"
                      placeholder="Notes *"
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
                    <Form.Label>Task *</Form.Label>
                    <CustomSelect
                      params={{
                        url: URLConstants.TASKS_URL,
                      }}
                      onChange={(value) => {
                        setTaskId(value);
                      }}
                      entity={taskComment.task}
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
    </>
  );
};

export default EditTaskCommentMUI;
