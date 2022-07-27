import React, { useEffect, useState, useRef } from 'react';
import { toast } from 'react-toastify';
import { Col, Form, Row } from 'react-bootstrap';
import SignaturePad from 'react-signature-canvas';
import { Button } from '@mui/material';
import URLConstants from '../../constants/URLConstants';
import { fetchGET, fetchPUT, uploadFile } from '../../utils/NetworkUtils';
import EmployeeSelect from '../../components/widgets/EmployeeSelect';

const EditAuditWorkAuthorization = ({
  auditReportId,
  id,
  closeModal,
  companyId,
}) => {
  const signaturePadRef = useRef();
  const [validated, setValidated] = useState(false);
  const [signature, setSignature] = useState(null);
  const [employeeId, setEmployeeId] = useState('');

  const [auditWorkAuthorization, setAuditWorkAuthorization] = useState(null);

  useEffect(() => {
    if (auditWorkAuthorization != null) {
      setEmployeeId(auditWorkAuthorization.employee_id);
    }
  }, [auditWorkAuthorization]);

  useEffect(() => {
    loadAuditWorkAuthorizations();
  }, []);

  const loadAuditWorkAuthorizations = async () => {
    try {
      const url = `${URLConstants.GET_AUDIT_WORK_AUTHORIZATIONS_URL}/${id}.json`;
      const response = await fetchGET(url);
      setAuditWorkAuthorization(response.data);
    } catch (error) {
      toast(error.message || 'Failed');
    }
  };

  const onAuditWorkAuthorizationsSubmit = (event) => {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }
    setValidated(true);
    event.preventDefault();
    event.stopPropagation();
    const postData = {
      id,
      name: ' ',
      signature_id:
        signature === null ? auditWorkAuthorization.signature_id : signature.id,
      audit_report_Id: auditReportId,
      employee_id: employeeId,
      company_id: companyId,
    };
    postAuditWorkAuthorization(postData);
  };
  const postAuditWorkAuthorization = async (data) => {
    try {
      const url = `${URLConstants.GET_AUDIT_WORK_AUTHORIZATIONS_URL}/${id}.json`;

      await fetchPUT(url, data);
      if (closeModal) {
        closeModal();
      }
    } catch (error) {
      toast(error.message || 'Failed');
    }
  };

  const renderSignature = () => {
    if (signature === null) {
      return (
        <>
          {auditWorkAuthorization !== null &&
            auditWorkAuthorization.signature !== null && (
              // eslint-disable-next-line jsx-a11y/img-redundant-alt
              <img
                src={auditWorkAuthorization.signature.url}
                // width={100}
                // height={100}
                style={{
                  backgroundColor: 'white',
                  padding: '2px',
                  width: '200px',
                  height: 'auto',
                }}
                alt="signature"
              />
            )}
        </>
      );
    }

    return (
      // eslint-disable-next-line react/jsx-no-comment-textnodes
      <>
        {/* eslint-disable-next-line jsx-a11y/img-redundant-alt */}
        <img
          src={signature.url}
          style={{
            backgroundColor: 'white',
            padding: '2px',
            width: '200px',
            height: 'auto',
          }}
          alt="signature"
        />
      </>
    );
  };

  return (
    <>
      {' '}
      {auditWorkAuthorization && (
        <Form
          noValidate
          validated={validated}
          onSubmit={onAuditWorkAuthorizationsSubmit}
        >
          {/* Name Field */}
          <Row>
            <Col md={12} style={{ border: '1px solid #000' }}>
              <SignaturePad
                ref={signaturePadRef}
                penColor="black"
                canvasProps={{
                  width: 'auto',
                  height: 200,
                  className: 'sigCanvas',
                }}
              />
            </Col>
            <Col md={6}>
              <Button
                style={{ marginTop: '10px' }}
                variant="contained"
                type="button"
                color="primary"
                onClick={async () => {
                  const value = signaturePadRef;

                  console.log(
                    signaturePadRef.current.getCanvas().toDataURL('image/png')
                  );
                  console.log(value);

                  const canvas = signaturePadRef.current.getCanvas();

                  canvas.toBlob(async (blob) => {
                    // Create an object of formData
                    const formData = new FormData();

                    // Update the formData object
                    formData.append('photo', blob, 'signature.png');

                    try {
                      const response = await uploadFile(
                        `${URLConstants.PHOTOS_URL}/upload.json`,
                        formData
                      );
                      setSignature(response.data);
                    } catch (error) {
                      toast.error('Unable to upload file ' || 'Failed');
                    }
                  });
                }}
              >
                Upload Signature
              </Button>
            </Col>
          </Row>
          <Row>
            {/* Signature Field */}
            <Col md={12}>{renderSignature()}</Col>
            {/* Employee Field */}
            <Col md={12}>
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Employee</Form.Label>
                <EmployeeSelect
                  onChange={(value) => {
                    setEmployeeId(value);
                  }}
                  entity={auditWorkAuthorization.employee}
                />
              </Form.Group>
            </Col>
          </Row>

          <Button type="submit" variant="contained" color="primary">
            Submit
          </Button>
        </Form>
      )}
    </>
  );
};
export default EditAuditWorkAuthorization;
