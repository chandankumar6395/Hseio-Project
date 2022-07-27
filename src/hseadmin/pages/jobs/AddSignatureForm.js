import { Col, Form, Row } from 'react-bootstrap';
import React, { useEffect, useRef, useState } from 'react';
import { toast } from 'react-toastify';

import { Button } from '@mui/material';
import { useSelector } from 'react-redux';
import SignaturePad from 'react-signature-canvas';
import CompanySelect from '../../components/widgets/CompanySelect';

import URLConstants from '../../constants/URLConstants';
import DivisionSelect from '../../components/widgets/DivisionSelect';
import JobSiteSelect from '../../components/widgets/JobSiteSelect';

import EmployeeSelect from '../../components/widgets/EmployeeSelect';
import { fetchPOST, uploadFile } from '../../utils/NetworkUtils';
import { KEY_COMPANY_ID } from '../../constants/Constants';

const NewJobWorkAuthorization = ({ jobId, closeModal }) => {
  const signaturePadRef = useRef();
  const localCompanyId = localStorage.getItem(KEY_COMPANY_ID);
  const localDivisionId = useSelector((state) => state.auth.selectedDivision);
  const localJobSiteId = useSelector((state) => state.auth.selectedJobSite);

  console.log('NewJobWorkAuthorization localCompanyId', localCompanyId);
  console.log('NewJobWorkAuthorization localDivisionId', localDivisionId);
  console.log('NewJobWorkAuthorization localJobSiteId', localJobSiteId);

  const [validated, setValidated] = useState(false);

  const [name, setName] = useState('');
  const [signature, setSignature] = useState(null);
  const [employeeId, setEmployeeId] = useState('');
  const [companyId, setCompanyId] = useState('');
  const [divisionId, setDivisionId] = useState('');
  const [jobSiteId, setJobSiteId] = useState('');

  useEffect(() => {}, []);

  const onJobWorkAuthorizationSubmit = (event) => {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }
    setValidated(true);
    event.preventDefault();
    const postData = {
      name,
      signature_id: signature !== null ? signature.id : null,
      job_id: jobId,
      employee_id: employeeId,
      company_id: localCompanyId !== null ? localCompanyId : companyId,
      division_id: localDivisionId !== -1 ? localDivisionId : divisionId,
      job_site_id: localJobSiteId !== -1 ? localJobSiteId : jobSiteId,
      team: 'worker',
    };
    postJobWorkAuthorization(postData);
  };

  const postJobWorkAuthorization = async (data) => {
    try {
      // await dispatch(addJobWorkAuthorizations(data));
      const url = URLConstants.JOB_WORK_AUTHORIZATIONS_URL;

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
        onSubmit={onJobWorkAuthorizationSubmit}
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
          {/* Name Field */}
          <Col md={6}>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Name *</Form.Label>
              <Form.Control
                required
                type="text"
                placeholder="Name"
                onChange={(event) => {
                  setName(event.target.value);
                }}
              />
              <Form.Control.Feedback type="invalid">
                Please provide a valid Name.
              </Form.Control.Feedback>
            </Form.Group>
          </Col>

          {/* Signature Field */}
          <Col md={6}>
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
          <Col md={6}>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Employee</Form.Label>
              <EmployeeSelect
                onChange={(value) => {
                  setEmployeeId(value);
                }}
              />
            </Form.Group>
          </Col>

          {/* Company Id */}
          {localCompanyId === null && (
            <Col md={6}>
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Company</Form.Label>
                <CompanySelect
                  onChange={(value) => {
                    setCompanyId(value);
                  }}
                />
                <Form.Control.Feedback type="invalid">
                  Please provide a valid company.
                </Form.Control.Feedback>
              </Form.Group>
            </Col>
          )}

          {/* Division id */}
          {localDivisionId === -1 && (
            <Col md={6}>
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Division</Form.Label>
                <DivisionSelect
                  onChange={(value) => setDivisionId(value)}
                  companyId={companyId}
                />
                <Form.Control.Feedback type="invalid">
                  Please provide a valid division.
                </Form.Control.Feedback>
              </Form.Group>
            </Col>
          )}
          {/* JobSite Id */}
          {localJobSiteId === -1 && (
            <Col md={6}>
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Project</Form.Label>
                <JobSiteSelect
                  onChange={(value) => setJobSiteId(value)}
                  companyId={companyId}
                  divisionId={divisionId}
                />
                <Form.Control.Feedback type="invalid">
                  Please provide a valid jobSite.
                </Form.Control.Feedback>
              </Form.Group>
            </Col>
          )}
        </Row>
        <Button variant="contained" type="submit" color="primary">
          Submit
        </Button>
      </Form>
    </>
  );
};

export default NewJobWorkAuthorization;
