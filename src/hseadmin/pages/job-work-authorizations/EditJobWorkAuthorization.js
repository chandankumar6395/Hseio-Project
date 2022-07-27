// @ts-ignore

import React, { useEffect, useState } from 'react';
import { NavLink, useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Button, Card, Col, Form, Row } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import URLConstants from '../../constants/URLConstants';
import { fetchGET, fetchPUT, uploadFile } from '../../utils/NetworkUtils';
import CompanySelect from '../../components/widgets/CompanySelect';
import DivisionSelect from '../../components/widgets/DivisionSelect';
import JobSiteSelect from '../../components/widgets/JobSiteSelect';
import CustomSelect from '../../components/widgets/CustomSelect';
import { getJobWorkAuthorization } from '../../store/actions/job_work_authorization';
import EmployeeSelect from '../../components/widgets/EmployeeSelect';

const EditJobWorkAuthorization = () => {
  const [validated, setValidated] = useState(false);

  const history = useNavigate();

  const [name, setName] = useState('');
  const [signature, setSignature] = useState(null);
  const [jobId, setJobId] = useState('');
  const [employeeId, setEmployeeId] = useState(-1);
  const [companyId, setCompanyId] = useState(-1);
  const [divisionId, setDivisionId] = useState(-1);
  const [jobSiteId, setJobSiteId] = useState(-1);

  const dispatch = useDispatch();

  const [jobWorkAuthorization, setJobWorkAuthorization] = useState(null);

  const { id } = useParams();
  const params = useParams();
  useEffect(() => {
    if (jobWorkAuthorization != null) {
      setName(jobWorkAuthorization.name);
      // setSignature(jobWorkAuthorization.signature_id);
      setJobId(jobWorkAuthorization.job_id);
      setEmployeeId(jobWorkAuthorization.employee_id);
      setCompanyId(jobWorkAuthorization.company_id);
      setDivisionId(jobWorkAuthorization.division_id);
      setJobSiteId(jobWorkAuthorization.job_site_id);
    }
  }, [jobWorkAuthorization]);

  useEffect(() => {
    console.log(`param is ${params.id}`);
    loadJobWorkAuthorizations();
  }, []);

  const loadJobWorkAuthorizations = async () => {
    try {
      const url = `${URLConstants.GET_JOB_WORK_AUTHORIZATION_URL}/${id}.json`;

      console.log('getJobWorkAuthorizations url =', url);

      const response = await fetchGET(url);

      console.log('getJobWorkAuthorizations -->', response.data);

      setJobWorkAuthorization(response.data);
    } catch (error) {
      toast(error.message || 'Failed');
    }
    await dispatch(getJobWorkAuthorization(id));
  };

  const onJobWorkAuthorizationsSubmit = (event) => {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }
    setValidated(true);
    event.preventDefault();
    // @ts-ignore
    let postData;
    // eslint-disable-next-line prefer-const
    postData = {
      id,
      name,
      signature_id:
        signature === null ? jobWorkAuthorization.signature_id : signature.id,
      job_id: jobId,
      employee_id: employeeId,
      company_id: companyId,
      division_id: divisionId,
      job_site_id: jobSiteId,
    };
    postJobWorkAuthorization(postData);
  };
  const postJobWorkAuthorization = async (data) => {
    try {
      const url = `${URLConstants.GET_JOB_WORK_AUTHORIZATION_URL}/${id}.json`;

      await fetchPUT(url, data);

      history('../../private/job-work-authorizations');
    } catch (error) {
      toast(error.message || 'Failed');
    }
  };
  const onNameChangeHandler = (event) => {
    // console.log(event.target.value);
    setName(event.target.value);
  };
  const onSignatureFileChange = (event) => {
    onSignatureFileUpload(event.target.files[0]);
  };

  const onSignatureFileUpload = async (value) => {
    // Create an object of formData
    const formData = new FormData();

    // Update the formData object
    formData.append('photo', value, value.name);

    try {
      const response = await uploadFile(
        `${URLConstants.PHOTOS_URL}/upload.json`,
        formData
      );
      setSignature(response.data);
    } catch (error) {
      toast.error('Unable to upload file ' || 'Failed');
    }
  };
  const renderSignature = () => {
    if (signature === null) {
      return (
        <>
          {jobWorkAuthorization !== null &&
            jobWorkAuthorization.signature !== null && (
              // eslint-disable-next-line jsx-a11y/img-redundant-alt
              <img
                src={jobWorkAuthorization.signature.url}
                width={100}
                height={100}
                style={{ backgroundColor: 'grey', padding: '2px' }}
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
          width={100}
          height={100}
          style={{ backgroundColor: 'grey', padding: '2px' }}
          alt="signature"
        />
      </>
    );
  };

  return (
    <Row>
      <Col>
        <Card>
          <Card.Header>
            Edit Job Work Authorizations Details
            <NavLink to="/private/job-work-authorizations">
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
          {jobWorkAuthorization && (
            <Card.Body>
              <Form
                noValidate
                validated={validated}
                onSubmit={onJobWorkAuthorizationsSubmit}
              >
                {/* Name Field */}
                <Row>
                  <Col md={6}>
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
                  {/* Signature Field */}
                  <Col md={6}>
                    {renderSignature()}
                    <Form.Group controlId="formFile" className="mb-3">
                      <Form.Label>Signature</Form.Label>
                      <Form.Control
                        type="file"
                        onChange={onSignatureFileChange}
                      />
                    </Form.Group>
                  </Col>

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
                    {/* job Id */}
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                      <Form.Label>Job</Form.Label>
                      <CustomSelect
                        onChange={(value) => setJobId(value)}
                        entity={jobWorkAuthorization.company}
                      />
                    </Form.Group>
                  </Col>

                  <Col md={6}>
                    {/* Company Id */}
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                      <Form.Label>Company</Form.Label>
                      <CompanySelect
                        onChange={(value) => setCompanyId(value)}
                        entity={jobWorkAuthorization.company}
                      />
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    {/* Division Id */}
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                      <Form.Label>Division</Form.Label>
                      <DivisionSelect
                        onChange={(value) => setDivisionId(value)}
                        companyId={companyId}
                        entity={jobWorkAuthorization.division}
                      />
                    </Form.Group>
                  </Col>

                  <Col md={6}>
                    {/* Job Site Id */}
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
                </Row>

                <Button variant="primary" type="submit">
                  Submit
                </Button>
              </Form>
            </Card.Body>
          )}
        </Card>
      </Col>
    </Row>
  );
};
export default EditJobWorkAuthorization;
