/* eslint-disable camelcase */
// @ts-ignore

import { Col, Form, Row } from 'react-bootstrap';
import React, { useEffect, useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Helmet } from 'react-helmet-async';
import { Button, Grid, Typography } from '@mui/material';
import { fetchPOST, uploadFile } from '../../utils/NetworkUtils';
import URLConstants from '../../constants/URLConstants';
import TaskCommentSelect from '../../components/widgets/TaskCommentSelect';
import { CustomBreadcrumbs, CustomDivider } from '../../utils/MUIStyle';

const NewTaskCommentDocumentMUI = () => {
  const [validated, setValidated] = useState(false);

  const history = useNavigate();

  const [taskCommentId, setTaskCommentId] = useState(-1);
  const [documentId, setDocumentId] = useState(-1);
  // const [name, setName] = useState('');

  useEffect(() => {}, []);

  const onTaskCommentDocumentSubmit = (event) => {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }

    setValidated(true);
    event.preventDefault();
    if (taskCommentId === -1) {
      toast('Please enter Task comment');
    } else if (documentId === -1) {
      toast('please enter document');
    } else {
      const postData = {
        task_comment_id: taskCommentId,
        document_id: documentId,
      };
      postTaskCommentDocuments(postData);
    }
  };

  const postTaskCommentDocuments = async (data) => {
    try {
      await fetchPOST(URLConstants.TASK_COMMENT_DOCUMENTS_URL, data);
      history('../../private/task-comment-documents');
    } catch (error) {
      console.log(error);
    }
  };

  const onDocumentFileChange = (event) => {
    onDocumentFileUpload(event.target.files[0]);
  };

  // On file upload (click the upload button)
  const onDocumentFileUpload = async (value) => {
    // Create an object of formData
    const formData = new FormData();

    // Update the formData object
    formData.append('document', value, value.name);
    const response = await uploadFile(
      `${URLConstants.DOCUMENTS_URL}/upload.json`,
      formData
    );

    if (response.success === true) {
      // setName(response.data.name);
      setDocumentId(response.data.id);
    } else {
      toast.error('Unable to upload file.' || 'Failed');
    }
  };

  return (
    <>
      <Helmet title="Add Task Comment Document" />

      <Grid justifyContent="space-between" container spacing={10}>
        <Grid item>
          <Typography variant="h3" gutterBottom display="inline">
            Task Comment Documents
          </Typography>

          <CustomBreadcrumbs aria-label="Breadcrumb" mt={2}>
            <Link component={NavLink} to="/">
              Dashboard
            </Link>
            <Link component={NavLink} to="/private/task-comment-documents">
              Task Comment Documents
            </Link>
            <Typography>Add Task Comment Document</Typography>
          </CustomBreadcrumbs>
        </Grid>
        <Grid item>
          <div>
            <NavLink to="/private/task-comment-documents">
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
            onSubmit={onTaskCommentDocumentSubmit}
          >
            {/* Task Comment Field */}
            <Row>
              <Col md={6}>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Form.Label>Task Comment *</Form.Label>
                  <TaskCommentSelect
                    onChange={(value) => {
                      setTaskCommentId(value);
                    }}
                  />
                  <Form.Control.Feedback type="invalid">
                    Please provide a valid task comment.
                  </Form.Control.Feedback>
                </Form.Group>
              </Col>
              <Col md={6}>
                {/* Document Field */}
                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Form.Label>Document *</Form.Label>
                  <Form.Control type="file" onChange={onDocumentFileChange} />
                  <Form.Control.Feedback type="invalid">
                    Please provide a valid document.
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
export default NewTaskCommentDocumentMUI;
