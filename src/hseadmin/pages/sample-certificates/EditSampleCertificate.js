import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { Button, Card, Col, Form, Row } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFilePdf } from '@fortawesome/free-regular-svg-icons';
import { toast } from 'react-toastify';
import { KEY_COMPANY_ID } from '../../constants/Constants';
import CompanySelect from '../../components/widgets/CompanySelect';
import {
  getSampleCertificate,
  updateSampleCertificate,
} from '../../store/actions/sample_certificates';
import { loadCompanies } from '../../store/actions/companies';
import { uploadDocumentFile } from '../../store/actions/documents';

const EditSampleCertificate = () => {
  const { id } = useParams();
  const localCompanyId = localStorage.getItem(KEY_COMPANY_ID);
  const dispatch = useDispatch();
  const history = useNavigate();
  const [name, setName] = useState('');
  const [shortDesc, setShortDesc] = useState('');
  const [longDesc, setLongDesc] = useState('');
  const [companyId, setCompanyId] = useState(-1);
  const [validated, setValidated] = useState(false);
  const [documentId, setDocumentId] = useState('');
  const [certiContent, setCertiContent] = useState('');
  const sampleCertificate = useSelector(
    (state) => state.samplecertificate.samplecertificate
  );
  const document = useSelector((state) => state.document.document);

  useEffect(() => {
    loadCertificate();
    fetchCompanies();
  }, []);

  useEffect(() => {
    if (sampleCertificate != null) {
      setName(sampleCertificate.name);
      setShortDesc(sampleCertificate.short_desc);
      setLongDesc(sampleCertificate.long_desc);
      setCompanyId(sampleCertificate.company_id);
      setDocumentId(sampleCertificate.document_id);
      setCertiContent(sampleCertificate.content);
    }
  }, [sampleCertificate]);

  const fetchCompanies = async () => {
    await dispatch(loadCompanies(1, '', 'name', 'asc', 100));
  };

  const loadCertificate = async () => {
    await dispatch(getSampleCertificate(id));
  };

  const onCertificateSubmit = (event) => {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    } else if (documentId === null) {
      toast('Please select Certificate Document' || 'Failed');
    } else {
      const postData = {
        id,
        name,
        short_desc: shortDesc,
        long_desc: longDesc,
        content: certiContent,
        company_id: localCompanyId !== null ? localCompanyId : companyId,
        document_id:
          document === null ? sampleCertificate.document_id : document.id,
      };
      postCertificate(postData);
    }
    setValidated(true);
    event.preventDefault();
  };

  const postCertificate = async (data) => {
    await dispatch(updateSampleCertificate(data));
    history('../../sample-certificates');
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
    // console.log(event.target.files[0]);
    onDocumentFileUpload(event.target.files[0]);
  };

  // On file upload (click the upload button)
  const onDocumentFileUpload = async (value) => {
    // Create an object of formData
    const formData = new FormData();

    // Update the formData object
    formData.append('document', value, value.name);

    await dispatch(uploadDocumentFile(formData));
  };

  const renderDocument = () => {
    if (document === null) {
      return (
        <>
          {sampleCertificate !== null && sampleCertificate.document !== null && (
            // eslint-disable-next-line jsx-a11y/img-redundant-alt
            <p>
              <a href={sampleCertificate.document.url}>
                <FontAwesomeIcon icon={faFilePdf} size="3x" />{' '}
                {sampleCertificate.document.name}
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
            Update Sample Certificate
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
              {renderDocument()}
              <Row>
                <Col md={12}>
                  {/* Employee Certificate Docunment */}
                  <Form.Group controlId="formFile" className="mb-3">
                    <Form.Label>Employee Certificate Document</Form.Label>
                    <Form.Control
                      type="file"
                      accept="application/pdf"
                      onChange={onDocumentFileChange}
                    />
                  </Form.Group>
                </Col>
                {localCompanyId === null && (
                  <Col md={6}>
                    {/* Company id */}
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                      <Form.Label>Company Name</Form.Label>
                      {sampleCertificate && (
                        <CompanySelect
                          entity={sampleCertificate.company}
                          onChange={(value) => setCompanyId(value)}
                        />
                      )}
                      <Form.Control.Feedback type="invalid">
                        Please provide a valid company.
                      </Form.Control.Feedback>
                    </Form.Group>
                  </Col>
                )}
                <Col md={6}>
                  {/* Name Field */}
                  <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Name</Form.Label>
                    <Form.Control
                      required
                      type="text"
                      placeholder="Name"
                      onChange={onNameChangeHandler}
                      value={name}
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
                      value={shortDesc}
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
                      value={longDesc}
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
                      value={certiContent}
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

export default EditSampleCertificate;
