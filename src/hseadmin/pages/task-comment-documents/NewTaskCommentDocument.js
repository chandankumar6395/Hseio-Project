/* eslint-disable camelcase */
// @ts-ignore

import { Button, Card, Col, Form, Row } from 'react-bootstrap';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { fetchPOST, uploadFile } from '../../utils/NetworkUtils';
import URLConstants from '../../constants/URLConstants';
import TaskCommentSelect from '../../components/widgets/TaskCommentSelect';

const NewTaskCommentDocument = () => {
  const [validated, setValidated] = useState(false);

  const history = useNavigate();

  const [taskCommentId, setTaskCommentId] = useState('');
  const [documentId, setDocumentId] = useState('');
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
    const postData = {
      task_comment_id: taskCommentId,
      document_id: documentId,
    };
    postTaskCommentDocuments(postData);
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
    <Row>
      <Col>
        <Card>
          <Card.Header>
            Add Task Comment Document
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
              onSubmit={onTaskCommentDocumentSubmit}
            >
              {/* Task Comment Field */}
              <Row>
                <Col md={6}>
                  <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Task Comment</Form.Label>
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
                    <Form.Label>Document</Form.Label>
                    <Form.Control type="file" onChange={onDocumentFileChange} />
                    <Form.Control.Feedback type="invalid">
                      Please provide a valid document.
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
export default NewTaskCommentDocument;
