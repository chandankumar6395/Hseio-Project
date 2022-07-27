import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Card, Col, Form, Row } from 'react-bootstrap';
import Select from 'react-select';
import { fetchPOST } from '../../utils/NetworkUtils';
import URLConstants from '../../constants/URLConstants';
import { addAuditReportDocuments } from '../../store/actions/audit_report_documents';
import { loadDocumentList } from '../../store/actions/documents';

const NewAuditReportDocument = () => {
  const [validated, setValidated] = useState(false);

  const history = useNavigate();
  // const [auditReportId, setAuditReportId] = useState(-1);
  const [documentId, setDocumentId] = useState(-1);

  const dispatch = useDispatch();
  // const auditReport = useSelector((state) => state.auditReport.auditReport);
  const document = useSelector((state) => state.document.documents);

  useEffect(() => {
    // fetchAuditReport();
    fetchDocument();
  }, []);

  // const fetchAuditReport = async () => {
  //   await dispatch(loadAuditReport(1, '', 'name', 'asc'));
  // };
  const fetchDocument = async () => {
    await dispatch(loadDocumentList(1, '', 'name', 'asc'));
  };
  // @ts-ignore
  const onAuditReportDocumentSubmit = (event) => {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }
    setValidated(true);
    event.preventDefault();
    const postData = {
      // audit_report_id: auditReportId,
      document_id: documentId,
    };
    postAuditReportDocument(postData);
  };
  const postAuditReportDocument = async (data) => {
    try {
      await dispatch(addAuditReportDocuments(data));
      await fetchPOST(URLConstants.AUDIT_REPORT_DOCUMENTS_URL, data);
      history('../../audit-report-documents');
    } catch (error) {
      console.log(error);
    }
  };
  // const onAuditReportIdChangeHandler = (selectedOption) => {
  //   setAuditReportId(+selectedOption.value);
  //   console.log(selectedOption.value);
  // };
  const onDocumentIdChangeHandler = (selectedOption) => {
    setDocumentId(+selectedOption.value);
    console.log(selectedOption.value);
  };
  return (
    <Row>
      <Col>
        <Card>
          <Card.Header>
            Add Audit Report Document
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
              onSubmit={onAuditReportDocumentSubmit}
            >
              <Row>
                {/* <Col md={6}> */}
                {/*  /!* Audit Report id *!/ */}
                {/*  <Form.Group className="mb-3" controlId="formBasicEmail"> */}
                {/*    <Form.Label>Audit Report Id</Form.Label> */}
                {/*    <Select */}
                {/*      options={auditReport.map((auditReport) => { */}
                {/*        return { */}
                {/*          value: auditReport.id, */}
                {/*          label: auditReport.user */}
                {/*        }; */}
                {/*      })} */}
                {/*      onChange={onAuditReportIdChangeHandler} */}
                {/*    /> */}
                {/*  </Form.Group> */}
                {/* </Col> */}

                <Col md={6}>
                  {/* Document id */}
                  <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Document Id</Form.Label>
                    <Select
                      options={document.map((document) => {
                        return {
                          value: document.id,
                          label: document.user,
                        };
                      })}
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
export default NewAuditReportDocument;
