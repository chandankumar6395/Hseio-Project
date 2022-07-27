import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { Button, Card, Col, Form, Row } from 'react-bootstrap';
import { loadCompanies } from '../../store/actions/companies';
import { getSampleCertificate } from '../../store/actions/sample_certificates';

const ViewSampleCertificate = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const history = useNavigate();
  const [name, setName] = useState('');
  const [shortDesc, setShortDesc] = useState('');
  const [longDesc, setLongDesc] = useState('');
  const [companyId, setCompanyId] = useState(-1);
  const [documentId, setDocumentId] = useState(-1);
  const [certiContent, setCertiContent] = useState('');
  const sampleCertificate = useSelector(
    (state) => state.samplecertificate.samplecertificate
  );

  useEffect(() => {
    loadSampleCertificate();
    fetchCompanies();
  }, []);

  useEffect(() => {
    if (sampleCertificate != null) {
      setName(sampleCertificate.name);
      setShortDesc(sampleCertificate.short_desc);
      setLongDesc(sampleCertificate.long_desc);
      setCompanyId(sampleCertificate.document_id);
      setDocumentId(sampleCertificate.document_id);
      setCertiContent(sampleCertificate.content);
    }
  }, [sampleCertificate]);

  const fetchCompanies = async () => {
    await dispatch(loadCompanies(1, '', 'name', 'asc', 100));
  };

  const loadSampleCertificate = async () => {
    await dispatch(getSampleCertificate(id));
  };

  return (
    <Row>
      <Col>
        <Card>
          <Card.Header>
            Add Certificate
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
            <Row>
              <Col md={6}>
                {/* Company id */}
                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Form.Label>Company Name</Form.Label>
                  <Form.Control
                    required
                    type="text"
                    placeholder="Document ID"
                    value={companyId}
                    disabled
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Form.Label>Enter Document Id</Form.Label>
                  <Form.Control
                    required
                    type="text"
                    placeholder="Document ID"
                    value={documentId}
                    disabled
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
                    disabled
                    value={name}
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                {/* Short Desc */}
                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Form.Label>Short Desc</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Short Desc"
                    value={shortDesc}
                    disabled
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
                    value={longDesc}
                    disabled
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
                    disabled
                    value={certiContent}
                  />
                </Form.Group>
              </Col>
            </Row>
          </Card.Body>
        </Card>
      </Col>
    </Row>
  );
};

export default ViewSampleCertificate;
