import { Button, Card, Col, Form, Row } from 'react-bootstrap';
import React, { useEffect, useState } from 'react';
// import {useSelector} from 'react-redux';

import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import CompanySelect from '../../components/widgets/CompanySelect';
import DivisionSelect from '../../components/widgets/DivisionSelect';
import { KEY_COMPANY_ID } from '../../constants/Constants';
import URLConstants from '../../constants/URLConstants';
import { fetchGET, fetchPUT } from '../../utils/NetworkUtils';
import JobSiteSelect from '../../components/widgets/JobSiteSelect';
import CustomSelect from '../../components/widgets/CustomSelect';

const EditAuditTask = () => {
  const localCompanyId = localStorage.getItem(KEY_COMPANY_ID);
  const localDivisionId = useSelector((state) => state.auth.selectedDivision);
  const localJobsiteId = useSelector((state) => state.auth.selectedJobSite);

  const [validated, setValidated] = useState(false);

  const history = useNavigate();

  const [name, setName] = useState('');
  const [shortDesc, setShortDesc] = useState('');
  const [longDesc, setLongDesc] = useState('');
  const [companyId, setCompanyId] = useState('');
  const [divisionId, setDivisionId] = useState('');
  const [jobSiteId, setJobSiteId] = useState('');
  const [auditTypeId, setAuditTypeId] = useState('');

  const [auditTask, setAuditTask] = useState(null);

  // const params = useParams();
  const { id } = useParams();

  useEffect(() => {
    if (auditTask != null) {
      setName(auditTask.name);
      setShortDesc(auditTask.short_desc);
      setLongDesc(auditTask.long_desc);
      setCompanyId(auditTask.company_id);
      setDivisionId(auditTask.division_id);
      setJobSiteId(auditTask.job_site_id);
      setAuditTypeId(auditTask.audit_type_id);
    }
  }, [auditTask]);

  useEffect(() => {
    loadAuditTasks();
    // fetchJobSites();
  }, []);

  const loadAuditTasks = async () => {
    try {
      const url = `${URLConstants.GET_AUDIT_TASK_URL}/${id}.json`;
      const response = await fetchGET(url);
      setAuditTask(response.data);
    } catch (error) {
      toast(error.message || 'Failed');
    }
  };

  const onAuditTaskSubmit = (event) => {
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
      short_desc: shortDesc,
      long_desc: longDesc,
      company_id: localCompanyId !== null ? localCompanyId : companyId,
      division_id: divisionId,
      job_site_id: jobSiteId,
      audit_type_id: auditTypeId,
      primary_company_id: localCompanyId !== null ? localCompanyId : companyId,
      // primary_division_id:
      //   localDivisionId !== null ? localDivisionId : divisionId
    };
    postAuditTask(postData);
  };

  const postAuditTask = async (data) => {
    try {
      const url = `${URLConstants.GET_AUDIT_TASK_URL}/${id}.json`;

      await fetchPUT(url, data);

      history('../../private/audit-tasks');
    } catch (error) {
      toast(error.message || 'Failed');
    }
  };

  const onNameChangeHandler = (event) => {
    // console.log(event.target.value);
    setName(event.target.value);
  };

  const onShortDescChangeHandler = (event) => {
    console.log(event.target.value);
    setShortDesc(event.target.value);
  };

  const onLongDescChangeHandler = (event) => {
    console.log(event.target.value);
    setLongDesc(event.target.value);
  };

  return (
    <Row>
      <Col>
        <Card>
          <Card.Header>
            Edit Audit task
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
          {auditTask && (
            <Card.Body>
              <Form
                noValidate
                validated={validated}
                onSubmit={onAuditTaskSubmit}
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

                  <Col md={6}>
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
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                      <Form.Label>Description</Form.Label>
                      <Form.Control
                        as="textarea"
                        placeholder="Description"
                        onChange={onLongDescChangeHandler}
                        value={longDesc}
                      />
                    </Form.Group>
                  </Col>

                  {/* Company id Field */}
                  {localCompanyId === null && (
                    <Col md={6}>
                      <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Company </Form.Label>
                        {auditTask && (
                          <CompanySelect
                            onChange={(value) => setCompanyId(value)}
                            entity={auditTask.company}
                          />
                        )}
                        <Form.Control.Feedback type="invalid">
                          Please provide a valid name.
                        </Form.Control.Feedback>
                      </Form.Group>
                    </Col>
                  )}

                  {/* Division Field */}
                  {/* {localDivisionId === -1 && ( */}
                  {localDivisionId === -1 && (
                    <Col md={6}>
                      <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Division</Form.Label>
                        <DivisionSelect
                          onChange={(value) => setDivisionId(value)}
                          companyId={
                            localCompanyId !== null ? localCompanyId : companyId
                          }
                          entity={auditTask.division}
                        />
                        <Form.Control.Feedback type="invalid">
                          Please provide a valid division.
                        </Form.Control.Feedback>
                      </Form.Group>
                    </Col>
                  )}

                  {localJobsiteId === -1 && (
                    <Col md={6}>
                      {/* Job Site Id */}
                      <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Project</Form.Label>
                        <JobSiteSelect
                          onChange={(value) => setJobSiteId(value)}
                          companyId={companyId}
                          divisionId={divisionId}
                          entity={auditTask.job_site}
                        />
                      </Form.Group>
                    </Col>
                  )}

                  <Col md={6}>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                      <Form.Label>Audit Type</Form.Label>
                      <CustomSelect
                        params={{ url: URLConstants.AUDIT_TYPES_URL }}
                        onChange={(value) => {
                          setAuditTypeId(value);
                        }}
                        entity={auditTask.audit_type}
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

export default EditAuditTask;
