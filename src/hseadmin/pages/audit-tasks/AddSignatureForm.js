import { Col, Form, Row } from 'react-bootstrap';
import React, { useEffect, useRef, useState } from 'react';
import { toast } from 'react-toastify';

import { Button } from '@mui/material';
import SignaturePad from 'react-signature-canvas';
import URLConstants from '../../constants/URLConstants';
import EmployeeSelect from '../../components/widgets/EmployeeSelect';
import { fetchPOST, uploadFile } from '../../utils/NetworkUtils';

const AddSignatureForm = ({ auditReportId, closeModal, companyId }) => {
  const signaturePadRef = useRef();

  const [validated, setValidated] = useState(false);
  const [signature, setSignature] = useState(null);
  const [employeeId, setEmployeeId] = useState('');
  console.log('Company', companyId);
  useEffect(() => {}, []);

  const onAuditWorkAuthorizationSubmit = (event) => {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }
    setValidated(true);
    event.preventDefault();
    event.stopPropagation();
    const postData = {
      name: ' ',
      signature_id: signature !== null ? signature.id : null,
      audit_report_id: auditReportId,
      employee_id: employeeId,
      company_id: companyId,
      team: 'worker',
    };
    postAuditWorkAuthorization(postData);
  };

  const postAuditWorkAuthorization = async (data) => {
    try {
      // await dispatch(addJobWorkAuthorizations(data));
      const url = URLConstants.AUDIT_WORK_AUTHORIZATIONS_URL;

      console.log('addJobWorkAuthorizations url =', url);

      const response = await fetchPOST(url, data);

      if (closeModal) {
        closeModal();
      }
      console.log('addJobWorkAuthorizations --->', response);
    } catch (error) {
      toast(error.message || 'Failed');
    }
  };

  return (
    <>
      <Form
        noValidate
        validated={validated}
        onSubmit={onAuditWorkAuthorizationSubmit}
      >
        <Row>
          <Col md={12} style={{ border: '1px solid #000' }}>
            <SignaturePad
              ref={signaturePadRef}
              penColor="black"
              canvasProps={{ width: 500, height: 200, className: 'sigCanvas' }}
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
                  signaturePadRef.current
                    .getTrimmedCanvas()
                    .toDataURL('image/png')
                );
                console.log(value);

                const canvas = signaturePadRef.current.getTrimmedCanvas();

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
          <Col md={12}>
            {signature !== null && (
              // eslint-disable-next-line jsx-a11y/img-redundant-alt
              <img
                src={signature.url}
                width={100}
                height={100}
                style={{ backgroundColor: 'white', padding: '2px' }}
                alt="Signature"
              />
            )}
          </Col>

          {/* Employee Field */}
          <Col md={12}>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Employee</Form.Label>
              <EmployeeSelect
                onChange={(value) => {
                  setEmployeeId(value);
                  companyId = { companyId };
                }}
              />
            </Form.Group>
          </Col>
        </Row>
        <Button variant="contained" type="submit" color="primary">
          Submit
        </Button>
      </Form>
    </>
  );
};

export default AddSignatureForm;
