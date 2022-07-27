/* eslint-disable camelcase,react/destructuring-assignment */
import { Button, Card, Col, Form, Row } from 'react-bootstrap';
import React, { useEffect, useState } from 'react';

// import {useNavigate} from 'react-router-dom';

import { toast } from 'react-toastify';
import { fetchPUT, uploadFile } from '../../utils/NetworkUtils';
import URLConstants from '../../constants/URLConstants';

const NewDocument = (props) => {
  const [validated, setValidated] = useState(false);

  // const history = useNavigate();

  const [id, setId] = useState('');
  const [name, setName] = useState('');
  const [shortDesc, setShortDesc] = useState('');
  const [issueDate, setIssueDate] = useState('');
  const [expireDate, setExpireDate] = useState('');

  // const [document, setDocument] = useState(null);

  useEffect(() => {}, []);

  const onDocumentSubmit = (event) => {
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
      issue_date: issueDate,
      expire_date: expireDate,
    };
    postDocument(postData);
  };

  const postDocument = async (data) => {
    try {
      await fetchPUT(`${URLConstants.DOCUMENTS_URL}/${id}.json`, data);

      props.onDocumentUpload(id);
    } catch (error) {
      console.log(error);
    }
  };

  // On file select (from the pop up)
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
      setName(response.data.name);
      setId(response.data.id);
    } else {
      toast.error('Unable to upload file.' || 'Failed');
    }
  };

  return (
    <Row>
      <Col>
        <Card>
          <Card.Header>Upload Document</Card.Header>
          <Card.Body>
            <Form noValidate validated={validated} onSubmit={onDocumentSubmit}>
              <Row>
                <Col md={6}>
                  <Form.Group controlId="formFile" className="mb-3">
                    <Form.Label>File</Form.Label>
                    <Form.Control type="file" onChange={onDocumentFileChange} />
                  </Form.Group>
                </Col>
                {/* Name Field */}
                <Col md={6}>
                  <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Name</Form.Label>
                    <Form.Control
                      required
                      type="text"
                      placeholder="Name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                    />
                    <Form.Control.Feedback type="invalid">
                      Please provide a valid name.
                    </Form.Control.Feedback>
                  </Form.Group>
                </Col>
                {/* Short Desc Field */}
                <Col md={6}>
                  <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Short Desccription</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Short Description"
                      onChange={(e) => setShortDesc(e.target.value)}
                    />
                    <Form.Control.Feedback type="invalid">
                      Please provide a valid Short Desc.
                    </Form.Control.Feedback>
                  </Form.Group>
                </Col>
                {/* Issue Date Field */}
                <Col md={6}>
                  <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Issue Date</Form.Label>
                    <Form.Control
                      type="datetime-local"
                      placeholder="Issue Date"
                      onChange={(e) => setIssueDate(e.target.value)}
                    />
                    <Form.Control.Feedback type="invalid">
                      Please provide a valid Description.
                    </Form.Control.Feedback>
                  </Form.Group>
                </Col>

                {/* Expire Date Field */}
                <Col md={6}>
                  <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Expire Date</Form.Label>
                    <Form.Control
                      type="datetime-local"
                      placeholder="Expire Date"
                      onChange={(e) => setExpireDate(e.target.value)}
                    />
                    <Form.Control.Feedback type="invalid">
                      Please provide a valid Description.
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

export default NewDocument;
