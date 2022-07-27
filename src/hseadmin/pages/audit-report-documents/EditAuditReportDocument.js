import { Button, Card, Col, Form, Row } from 'react-bootstrap';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { NavLink, useNavigate, useParams } from 'react-router-dom';
import {
  getAuditReportDocument,
  updateAuditReportDocument,
} from '../../store/actions/audit_report_documents';
import Select from 'react-select';
import URLConstants from '../../constants/URLConstants';
import { fetchPUT } from '../../utils/NetworkUtils';
import { loadAuditReports } from '../../store/actions/audit_reports';
// import {loadDocumentList} from "../../store/actions/documents";

const EditAuditReportDocument = () => {
  const [validated, setValidated] = useState(false);

  const history = useNavigate();

  const [auditReportId, setAuditReportId] = useState(-1);
  const [documentId, setDocumentId] = useState(-1);
  const [selectedAuditReportId, setSelectedAuditReportIdOption] = useState({});
  const [selectedDocumentId, setSelectedDocumentIdOption] = useState({});

  const dispatch = useDispatch();

  useEffect(() => {
    fetchAuditReport();
    fetchDocument();
  }, []);

  const fetchAuditReport = async () => {
    await dispatch(loadAuditReportDocument());
  };
  const fetchDocument = async () => {
    await dispatch(loadAuditReportDocument());
  };
  const auditReportDocuments = useSelector(
    (state) => state.auditReportDocument.auditReportDocuments
  );
  const documents = useSelector((state) => state.document.documents);

  const params = useParams();
  const { id } = useParams();

  useEffect(() => {
    if (auditReportDocuments != null) {
      setAuditReportId(auditReportDocuments.audit_report_id);
      setSelectedAuditReportIdOption({
        value: auditReportDocuments.audit_report.id,
        label: auditReportDocuments.audit_report.name,
      });

      setSelectedDocumentIdOption({
        value: auditReportDocuments.document.id,
        label: auditReportDocuments.document.name,
      });
    }
  }, [auditReportDocuments]);

  useEffect(() => {
    console.log(`param is ${params.id}`);
    loadAuditReportDocument();
    fetchAuditReports();
    // fetchDocuments();
  }, []);
  const loadAuditReportDocument = async () => {
    await dispatch(getAuditReportDocument(id));
  };

  const fetchAuditReports = async () => {
    await dispatch(loadAuditReports(1, '', 'name', 'asc', 100));
  };
  // const fetchDocuments = async () => {
  //   await dispatch(loadDocuments(1, '', 'name', 'asc', 100));
  // };

  const onAuditReportDocumentSubmit = (event) => {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }
    setValidated(true);
    event.preventDefault();
    const postData = {
      audit_report_id: auditReportId,
      document_id: documentId,
    };

    postAuditReportDocument(postData);
  };
  const postAuditReportDocument = async (data) => {
    try {
      let auditReportDocument;
      const url = `${URLConstants.GET_AUDIT_REPORT_DOCUMENT_URL}/${auditReportDocument.id}.json`;
      await fetchPUT(url, data);
      await dispatch(updateAuditReportDocument(data));
      history('../../audit-report-documents');
    } catch (error) {
      console.log(error);
    }
  };

  const onAuditReportIdChangeHandler = (selectedOption) => {
    setAuditReportId(+selectedOption.value);
    setSelectedAuditReportIdOption(selectedOption);
    console.log(selectedOption.value);
  };

  const onDocumentIdChangeHandler = (selectedOption) => {
    setDocumentId(+selectedOption.value);
    setSelectedDocumentIdOption(selectedOption);
    console.log(selectedOption.value);
  };

  return (
    <Row>
      <Col>
        <Card>
          <Card.Header>
            Edit Audit Report Document
            <NavLink to="/audit-report-documents">
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
          <Card.Body>
            <Form
              noValidate
              validated={validated}
              onSubmit={onAuditReportDocumentSubmit}
            >
              <Row>
                <Col md={6}>
                  {/* Audit Report Id */}
                  <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Audit Report</Form.Label>
                    <Select
                      options={auditReportDocuments.map(
                        (auditReportDocument) => {
                          return {
                            value: auditReportDocument.id,
                            label: auditReportDocument.name,
                          };
                        }
                      )}
                      value={selectedAuditReportId}
                      onChange={onAuditReportIdChangeHandler}
                    />
                  </Form.Group>
                </Col>

                <Col md={6}>
                  {/* Document Id */}
                  <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Document Id</Form.Label>
                    <Select
                      options={documents.map((document) => {
                        return {
                          value: document.id,
                          label: document.name,
                        };
                      })}
                      value={selectedDocumentId}
                      onChange={onDocumentIdChangeHandler}
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
export default EditAuditReportDocument;
