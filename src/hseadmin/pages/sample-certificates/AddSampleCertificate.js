import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { Button, Card, Col, Form, Row } from 'react-bootstrap';
import { toast } from 'react-toastify';
import { KEY_COMPANY_ID } from '../../constants/Constants';
import CompanySelect from '../../components/widgets/CompanySelect';
import { uploadDocumentFile } from '../../store/actions/documents';
import { loadCompanies } from '../../store/actions/companies';
import { addSampleCertificates } from '../../store/actions/sample_certificates';

const AddSampleCertificate = () => {
  const localCompanyId = localStorage.getItem(KEY_COMPANY_ID);
  const dispatch = useDispatch();
  const history = useNavigate();
  const [name, setName] = useState('');
  const [shortDesc, setShortDesc] = useState('');
  const [longDesc, setLongDesc] = useState('');
  const [companyId, setCompanyId] = useState(-1);
  const [validated, setValidated] = useState(false);
  const document = useSelector((state) => state.document.document);
  const [certiContent, setCertiContent] = useState('');

  useEffect(() => {
    fetchCompanies();
  }, []);

  const fetchCompanies = async () => {
    await dispatch(loadCompanies(1, '', 'name', 'asc', 100));
  };

  const onCertificateSubmit = (event) => {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    } else if (document === null) {
      toast('Please select Certificate Document' || 'Failed');
    } else {
      console.log('state', certiContent);
      const postData = {
        name,
        short_desc: shortDesc,
        long_desc: longDesc,
        content: certiContent,
        company_id: localCompanyId !== null ? localCompanyId : companyId,
        document_id: document != null ? document.id : null,
      };
      postSampleCertificate(postData);
    }
    setValidated(true);
    event.preventDefault();
  };

  const postSampleCertificate = async (data) => {
    try {
      await dispatch(addSampleCertificates(data));
      history('../../private/sample-certificates');
    } catch (error) {
      toast(error.message || 'Failed');
    }
  };

  const onNameChangeHandler = (event) => {
    // console.log(event.target.value);
    setName(event.target.value);
  };

  const onShortDescChangeHandler = (event) => {
    // console.log(event.target.value);
    setShortDesc(event.target.value);
  };

  const onContentChangeHandler = (event) => {
    setCertiContent(event.target.value);
  };

  const onLongDescChangeHandler = (event) => {
    // console.log(event.target.value);
    setLongDesc(event.target.value);
  };

  // On file select (from the pop up)
  const onDocumentFileChange = (event) => {
    // const {files} = event.target;
    // Object.values(files).forEach(function (file, index) {
    //   // myformData.append(index, file);
    //   // console.log('index = ', index, ` file = ${file}`);
    // });
    // // console.log(event.target.files[0]);
    const file = event.target.files[0];

    // console.log(`---->${file.type}`);
    if (file.type !== 'application/pdf') {
      toast.error('Please select PDF file.' || 'Failed');
    } else {
      onDocumentFileUpload(event.target.files[0]);
    }
  };

  // On file upload (click the upload button)
  const onDocumentFileUpload = async (value) => {
    // Create an object of formData
    const formData = new FormData();

    // Update the formData object
    formData.append('document', value, value.name);

    await dispatch(uploadDocumentFile(formData));
  };
  return (
    <Row>
      <Col>
        <Card>
          <Card.Header>
            Add Sample Certificate
            <>
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
            </>
          </Card.Header>
          <Card.Body>
            <Form
              noValidate
              validated={validated}
              onSubmit={onCertificateSubmit}
            >
              <Row>
                {/* Employee Certificate Document */}
                <Col md={12}>
                  <Form.Group controlId="formFile" className="mb-3">
                    <Form.Label>Sample Certificate Document</Form.Label>
                    <Form.Control
                      type="file"
                      accept="application/pdf"
                      onChange={onDocumentFileChange}
                    />
                  </Form.Group>
                </Col>
                <Col md={6}>
                  {/* Company id */}
                  <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Company Name</Form.Label>
                    <CompanySelect
                      onChange={(value) => {
                        setCompanyId(value);
                      }}
                    />
                  </Form.Group>
                </Col>
                <Col md={6}>
                  {/* Name Field */}
                  <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Name</Form.Label>
                    <Form.Control
                      required
                      type="text"
                      placeholder="Name"
                      onChange={onNameChangeHandler}
                    />
                    <Form.Control.Feedback type="invalid">
                      Please provide a valid name.
                    </Form.Control.Feedback>
                  </Form.Group>
                </Col>
                <Col md={6}>
                  {/* Short Desc */}
                  <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Short Desc</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Short Desc"
                      onChange={onShortDescChangeHandler}
                    />
                  </Form.Group>
                </Col>
                <Col md={6}>
                  {/* Long Desc */}
                  <Form.Group className="mb-3" controlId="formBasicLong Dec">
                    <Form.Label>Long Desc</Form.Label>
                    <Form.Control
                      as="textarea"
                      rows={2}
                      placeholder="Long Desc"
                      onChange={onLongDescChangeHandler}
                    />
                  </Form.Group>
                </Col>
                <Col md={6}>
                  <Form.Group className="mb-3" controlId="formBasicContent">
                    <Form.Label>Content</Form.Label>
                    <Form.Control
                      as="textarea"
                      rows={2}
                      placeholder="Content"
                      onChange={onContentChangeHandler}
                    />
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

export default AddSampleCertificate;
