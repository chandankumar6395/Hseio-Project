/* eslint-disable camelcase */
import { Button, Card, Col, Form, Row } from 'react-bootstrap';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { faFilePdf } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import URLConstants from '../../constants/URLConstants';
import { fetchGET, fetchPUT, uploadFile } from '../../utils/NetworkUtils';
import TaskCommentSelect from '../../components/widgets/TaskCommentSelect';

const EditTaskCommentDocument = () => {
  const [validated, setValidated] = useState(false);

  const history = useNavigate();

  const [taskCommentId, setTaskCommentId] = useState('');
  const [documentId, setDocumentId] = useState('');
  const [taskCommentDocument, setTaskCommentDocument] = useState(null);

  const params = useParams();
  const { id } = useParams();

  useEffect(() => {
    if (taskCommentDocument != null) {
      setTaskCommentId(taskCommentDocument.task_comment_id);
      setDocumentId(taskCommentDocument.document_id);
      console.log(documentId);
    }
  }, [taskCommentDocument]);

  useEffect(() => {
    console.log(`param is ${params.id}`);
    loadTaskCommentDocument();
  }, []);

  const loadTaskCommentDocument = async () => {
    try {
      const url = `${URLConstants.GET_TASK_COMMENT_DOCUMENT_URL}/${id}.json`;
      const response = await fetchGET(url);
      setTaskCommentDocument(response.data);
    } catch (error) {
      toast(error.message || 'Failed');
    }
  };

  const onTaskCommentDocumentSubmit = (event) => {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }

    setValidated(true);
    event.preventDefault();
    const postData = {
      id,
      task_comment_id: taskCommentId,
      document_id:
        document === null ? taskCommentDocument.document_id : document.id,
    };
    postTaskCommentDocument(postData);
  };

  const postTaskCommentDocument = async (data) => {
    try {
      const url = `${URLConstants.GET_TASK_COMMENT_DOCUMENT_URL}/${id}.json`;

      await fetchPUT(url, data);

      history('../../private/task-comment-documents');
    } catch (error) {
      toast(error.message || 'Failed');
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
  const renderDocument = () => {
    if (document === null) {
      return (
        <>
          {taskCommentDocument !== null &&
            taskCommentDocument.document !== null && (
              // eslint-disable-next-line jsx-a11y/img-redundant-alt
              <p>
                <a href={taskCommentDocument.document.url}>
                  <FontAwesomeIcon icon={faFilePdf} size="3x" />{' '}
                  {taskCommentDocument.document.name}
                </a>
              </p>
            )}
        </>
      );
    }
    return (
      <>
        <p>
          <a href={document.url}>
            <FontAwesomeIcon icon={faFilePdf} size="3x" /> {document.name}
          </a>
        </p>
      </>
    );
  };

  return (
    <Row>
      <Col>
        <Card>
          <Card.Header>
            Edit Task Comment Document
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
          {taskCommentDocument && (
            <Card.Body>
              <Form
                noValidate
                validated={validated}
                onSubmit={onTaskCommentDocumentSubmit}
              >
                <Row>
                  <Col md={6}>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                      <Form.Label>Task Comment</Form.Label>
                      <TaskCommentSelect
                        onChange={(value) => {
                          setTaskCommentId(value);
                        }}
                        entity={taskCommentDocument.task_comment}
                      />
                      <Form.Control.Feedback type="invalid">
                        Please provide a valid task comment.
                      </Form.Control.Feedback>
                    </Form.Group>
                  </Col>
                  {renderDocument()}
                  <Col md={6}>
                    {/* Document Field */}
                    <Form.Group className="mb-3" controlId="formFile">
                      <Form.Label>Document</Form.Label>
                      <Form.Control
                        type="file"
                        accept="application/pdf"
                        onChange={onDocumentFileChange}
                        entity={taskCommentDocument.document}
                      />
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
          )}
        </Card>
      </Col>
    </Row>
  );
};

export default EditTaskCommentDocument;
