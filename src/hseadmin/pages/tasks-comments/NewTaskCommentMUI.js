import { Col, Form, Row } from 'react-bootstrap';
import React, { useEffect, useState } from 'react';

import { Link, NavLink, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { Button, Grid, Typography } from '@mui/material';
import { toast } from 'react-toastify';
import { fetchPOST } from '../../utils/NetworkUtils';
import URLConstants from '../../constants/URLConstants';
import CustomSelect from '../../components/widgets/CustomSelect';
import { CustomBreadcrumbs, CustomDivider } from '../../utils/MUIStyle';

const NewTaskCommentMUI = () => {
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
    if (notes === '') {
      toast('Please Enter Notes');
    } else if (taskId === -1) {
      toast('Please Enter Task');
    } else {
      const postData = {
        notes,
        task_id: taskId,
      };
      postTaskComment(postData);
    }
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
    <>
      <Helmet title="Add Task Comment" />

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
            <Typography>Add Task Comment</Typography>
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
          <Form noValidate validated={validated} onSubmit={onTaskCommentSubmit}>
            <Row>
              <Col md={6}>
                {/* Notes Field */}
                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Form.Label>Notes *</Form.Label>
                  <Form.Control
                    required
                    type="text"
                    rows={2}
                    placeholder="Note *"
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
                  <Form.Label>Task *</Form.Label>
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

            <Button variant="contained" type="submit" color="primary">
              Submit
            </Button>
          </Form>
        </Grid>
      </Grid>
    </>
  );
};
export default NewTaskCommentMUI;
