import { Col, Form, Row } from 'react-bootstrap';
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Helmet } from 'react-helmet-async';
import { Button, Grid, Typography } from '@mui/material';
import CompanySelect from '../../components/widgets/CompanySelect';
import { CustomBreadcrumbs, CustomDivider } from '../../utils/MUIStyle';
import URLConstants from '../../constants/URLConstants';
import CustomSelect from '../../components/widgets/CustomSelect';
import DivisionSelect from '../../components/widgets/DivisionSelect';
import JobSiteSelect from '../../components/widgets/JobSiteSelect';
import { addJobWorkAuthorizations } from '../../store/actions/job_work_authorization';
import EmployeeSelect from '../../components/widgets/EmployeeSelect';
import { uploadFile } from '../../utils/NetworkUtils';

const NewJobWorkAuthorization = () => {
  const [validated, setValidated] = useState(false);
  const history = useNavigate();

  const [name, setName] = useState('');
  const [signature, setSignature] = useState(null);
  const [jobId, setJobId] = useState('');
  const [employeeId, setEmployeeId] = useState('');
  const [companyId, setCompanyId] = useState('');
  const [divisionId, setDivisionId] = useState('');
  const [jobsiteId, setJobSiteId] = useState('');

  const dispatch = useDispatch();

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
      company_id: companyId,
      division_id: divisionId,
      job_site_id: jobsiteId,
    };
    postJobWorkAuthorization(postData);
  };

  const postJobWorkAuthorization = async (data) => {
    try {
      await dispatch(addJobWorkAuthorizations(data));
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

  return (
    <>
      <Helmet title=" Add Job Work Authorization" />

      <Grid justifyContent="space-between" container spacing={10}>
        <Grid item>
          <Typography variant="h3" gutterBottom display="inline">
            Job Work Authorizations
          </Typography>

          <CustomBreadcrumbs aria-label="Breadcrumb" mt={2}>
            <Link component={NavLink} to="/">
              Dashboard
            </Link>
            <Link component={NavLink} to="/private/job-work-authorizations">
              Job Work Authorizations
            </Link>
            <Typography>Add Job Work Authorizations</Typography>
          </CustomBreadcrumbs>
        </Grid>
        <Grid item>
          <div>
            <NavLink to="/private/job-work-authorizations">
              <Button variant="contained" color="primary">
                Back
              </Button>
            </NavLink>
          </div>
        </Grid>
      </Grid>

      <CustomDivider my={6} />
      <Grid container spacing={6}>
        <Grid item xs={12}>
          <Form
            noValidate
            validated={validated}
            onSubmit={onJobWorkAuthorizationSubmit}
          >
            <Row>
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
                    style={{ backgroundColor: 'grey', padding: '2px' }}
                    alt="Signature"
                  />
                )}
                <Form.Group controlId="formFile" className="mb-3">
                  <Form.Label>Signature</Form.Label>
                  <Form.Control type="file" onChange={onSignatureFileChange} />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Form.Label>Jobs</Form.Label>
                  <CustomSelect
                    params={{ url: URLConstants.JOBS_URL }}
                    onChange={(value) => {
                      setJobId(value);
                    }}
                  />
                  <Form.Control.Feedback type="invalid">
                    Please provide a valid training event.
                  </Form.Control.Feedback>
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
                  />
                </Form.Group>
              </Col>

              <Col md={6}>
                {/* Company Id */}
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
              <Col md={6}>
                {/* Division id */}
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
              <Col md={6}>
                {/* JobSite Id */}
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
            </Row>
            <Button variant="contained" type="submit" color="primary">
              Submit
            </Button>
          </Form>
        </Grid>
      </Grid>
    </>
  );
};

export default NewJobWorkAuthorization;
