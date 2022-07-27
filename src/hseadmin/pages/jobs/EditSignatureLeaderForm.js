import React, { useEffect, useState, useRef } from 'react';
import { toast } from 'react-toastify';
import { Col, Form, Row } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import SignaturePad from 'react-signature-canvas';
import { Button } from '@mui/material';
import URLConstants from '../../constants/URLConstants';
import { fetchGET, fetchPUT, uploadFile } from '../../utils/NetworkUtils';

import CompanySelect from '../../components/widgets/CompanySelect';
import DivisionSelect from '../../components/widgets/DivisionSelect';
import JobSiteSelect from '../../components/widgets/JobSiteSelect';

import { KEY_COMPANY_ID } from '../../constants/Constants';
import EmployeeSelect from '../../components/widgets/EmployeeSelect';
import { toLocalDateTime, toServerDateTime } from '../../utils/Utils';

const EditSignatureLeaderForm = ({ jobId, closeModal, id }) => {
  const signaturePadRef = useRef();
  const localCompanyId = localStorage.getItem(KEY_COMPANY_ID);
  const localDivisionId = useSelector((state) => state.auth.selectedDivision);
  const localJobSiteId = useSelector((state) => state.auth.selectedJobSite);

  // console.log('NewJobWorkAuthorization localCompanyId', localCompanyId);
  // console.log('NewJobWorkAuthorization localDivisionId', localDivisionId);
  // console.log('NewJobWorkAuthorization localJobSiteId', localJobSiteId);
  const [validated, setValidated] = useState(false);

  const [name, setName] = useState('');
  const [signature, setSignature] = useState(null);
  const [employeeId, setEmployeeId] = useState('');
  const [companyId, setCompanyId] = useState(-1);
  const [divisionId, setDivisionId] = useState(-1);
  const [jobSiteId, setJobSiteId] = useState(-1);

  const [jobWorkAuthorization, setJobWorkAuthorization] = useState(null);
  const [signatureDate, setSignatureDate] = useState('');

  useEffect(() => {
    if (jobWorkAuthorization != null) {
      setName(jobWorkAuthorization.name);
      // setSignature(jobWorkAuthorization.signature_id);

      setEmployeeId(jobWorkAuthorization.employee_id);
      setCompanyId(jobWorkAuthorization.company_id);
      setDivisionId(jobWorkAuthorization.division_id);
      setJobSiteId(jobWorkAuthorization.job_site_id);
      setSignatureDate(toLocalDateTime(jobWorkAuthorization.signature_date));
    }
  }, [jobWorkAuthorization]);

  useEffect(() => {
    loadJobWorkAuthorizations();
  }, []);

  const loadJobWorkAuthorizations = async () => {
    try {
      const url = `${URLConstants.GET_JOB_WORK_AUTHORIZATION_URL}/${id}.json`;

      // console.log('getJobWorkAuthorizations url =', url);

      const response = await fetchGET(url);

      // console.log('getJobWorkAuthorizations -->', response.data);

      setJobWorkAuthorization(response.data);
    } catch (error) {
      toast(error.message || 'Failed');
    }
  };

  const onJobWorkAuthorizationsSubmit = (event) => {
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
      signature_id:
        signature === null ? jobWorkAuthorization.signature_id : signature.id,
      job_id: jobId,
      employee_id: employeeId,
      company_id: companyId,
      division_id: divisionId,
      job_site_id: jobSiteId,
      signature_date: toServerDateTime(signatureDate),
    };
    postJobWorkAuthorization(postData);
  };
  const postJobWorkAuthorization = async (data) => {
    try {
      const url = `${URLConstants.GET_JOB_WORK_AUTHORIZATION_URL}/${id}.json`;

      await fetchPUT(url, data);

      closeModal();
    } catch (error) {
      toast(error.message || 'Failed');
    }
  };
  const onNameChangeHandler = (event) => {
    // console.log(event.target.value);
    setName(event.target.value);
  };
  // const onSignatureFileChange = (event) => {
  //   onSignatureFileUpload(event.target.files[0]);
  // };

  // const onSignatureFileUpload = async (value) => {
  //   // Create an object of formData
  //   const formData = new FormData();
  //
  //   // Update the formData object
  //   formData.append('photo', value, value.name);
  //
  //   try {
  //     const response = await uploadFile(
  //       `${URLConstants.PHOTOS_URL}/upload.json`,
  //       formData
  //     );
  //     setSignature(response.data);
  //   } catch (error) {
  //     toast.error('Unable to upload file ' || 'Failed');
  //   }
  // };
  const renderSignature = () => {
    if (signature === null) {
      return (
        <>
          {jobWorkAuthorization !== null &&
            jobWorkAuthorization.signature !== null && (
              // eslint-disable-next-line jsx-a11y/img-redundant-alt
              <img
                src={jobWorkAuthorization.signature.url}
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
      {jobWorkAuthorization && (
        <Form
          noValidate
          validated={validated}
          onSubmit={onJobWorkAuthorizationsSubmit}
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
            <Col md={6}>
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Name *</Form.Label>
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
            {/* Signature Field */}
            <Col md={6}>{renderSignature()}</Col>
            {/* Employee Field */}
            <Col md={6}>
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Employee</Form.Label>
                <EmployeeSelect
                  onChange={(value) => {
                    setEmployeeId(value);
                  }}
                  entity={jobWorkAuthorization.employee}
                />
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Signature Date</Form.Label>
                <Form.Control
                  type="datetime-local"
                  placeholder="Completion Date"
                  onChange={(event) => {
                    setSignatureDate(event.target.value);
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
                    onChange={(value) => setCompanyId(value)}
                    entity={jobWorkAuthorization.company}
                  />
                </Form.Group>
              </Col>
            )}
            {/* Division Id */}
            {localDivisionId === -1 && (
              <Col md={6}>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Form.Label>Division</Form.Label>
                  <DivisionSelect
                    onChange={(value) => setDivisionId(value)}
                    companyId={companyId}
                    entity={jobWorkAuthorization.division}
                  />
                </Form.Group>
              </Col>
            )}

            {/* Job Site Id */}
            {localJobSiteId === -1 && (
              <Col md={6}>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Form.Label>Project</Form.Label>
                  <JobSiteSelect
                    onChange={(value) => setJobSiteId(value)}
                    companyId={companyId}
                    divisionId={divisionId}
                    entity={jobWorkAuthorization.job_site}
                  />
                </Form.Group>
              </Col>
            )}
          </Row>

          <Button type="submit" variant="contained" color="primary">
            Submit
          </Button>
        </Form>
      )}
    </>
  );
};
export default EditSignatureLeaderForm;
