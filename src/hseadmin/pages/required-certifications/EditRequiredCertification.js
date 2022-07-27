import React, { useEffect, useState } from 'react';
import { NavLink, useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Button, Card, Col, Form, Row } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import URLConstants from '../../constants/URLConstants';
import { fetchGET, fetchPUT } from '../../utils/NetworkUtils';
import { KEY_COMPANY_ID } from '../../constants/Constants';
import CompanySelect from '../../components/widgets/CompanySelect';
import DivisionSelect from '../../components/widgets/DivisionSelect';
import JobSiteSelect from '../../components/widgets/JobSiteSelect';

const EditRequiredCertification = () => {
  const localCompanyId = localStorage.getItem(KEY_COMPANY_ID);
  const localDivisionId = useSelector((state) => state.auth.selectedDivision);
  const localJobSiteId = useSelector((state) => state.auth.selectedJobSite);

  const [validated, setValidated] = useState(false);

  const history = useNavigate();

  const [name, setName] = useState('');
  const [shortDesc, setShortDesc] = useState('');
  const [longDesc, setLongDesc] = useState('');
  const [companyId, setCompanyId] = useState('');
  const [divisionId, setDivisionId] = useState('');
  const [jobSiteId, setJobSiteId] = useState('');

  const dispatch = useDispatch();

  const [requiredCertification, setRequiredCertification] = useState(null);

  const { id } = useParams();
  const params = useParams();
  useEffect(() => {
    if (requiredCertification != null) {
      setName(requiredCertification.name);
      setShortDesc(requiredCertification.short_desc);
      setLongDesc(requiredCertification.long_desc);
      setCompanyId(requiredCertification.company_id);
      setDivisionId(requiredCertification.division_id);
      setJobSiteId(requiredCertification.job_site_id);
    }
  }, [requiredCertification]);

  useEffect(() => {
    console.log(`param is ${params.id}`);
    loadRequiredCertification();
  }, []);

  const loadRequiredCertification = async () => {
    try {
      const url = `${URLConstants.GET_REQUIRED_CERTIFICATION_URL}/${id}.json`;

      console.log('getRequiredCertification url =', url);

      const response = await fetchGET(url);

      console.log('getRequiredCertification -->', response.data);

      setRequiredCertification(response.data);
    } catch (error) {
      toast(error.message || 'Failed');
    }
    // eslint-disable-next-line no-undef
    await dispatch(getRequiredCertification(id));
  };

  const onRequiredCertificationSubmit = (event) => {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }
    setValidated(true);
    event.preventDefault();
    // @ts-ignore
    const postData = {
      id,
      name,
      short_desc: shortDesc,
      long_desc: longDesc,
      company_id: localCompanyId !== null ? localCompanyId : companyId,
      division_id: localDivisionId !== -1 ? localDivisionId : divisionId,
      job_site_id: localJobSiteId !== -1 ? localJobSiteId : jobSiteId,
    };
    postRequiredCertification(postData);
  };
  const postRequiredCertification = async (data) => {
    try {
      const url = `${URLConstants.GET_REQUIRED_CERTIFICATION_URL}/${id}.json`;

      await fetchPUT(url, data);

      history('../../private/required-certifications');
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
            Edit Required Certification Details
            <NavLink to="/private/required-certifications">
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
          {requiredCertification && (
            <Card.Body>
              <Form
                noValidate
                validated={validated}
                onSubmit={onRequiredCertificationSubmit}
              >
                {/* Name Field */}
                <Row>
                  <Col md={6}>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                      <Form.Label>Name</Form.Label>
                      <Form.Control
                        required
                        rows={2}
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
                  {/* Long Desc */}
                  <Col md={6}>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                      <Form.Label>Long Desc</Form.Label>
                      <Form.Control
                        as="textarea"
                        placeholder="Long Desc"
                        onChange={onLongDescChangeHandler}
                        value={longDesc}
                      />
                    </Form.Group>
                  </Col>
                  {/* Company id */}
                  {localCompanyId === null && (
                    <Col md={6}>
                      <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Company </Form.Label>
                        <CompanySelect
                          onChange={(value) => setCompanyId(value)}
                          entity={requiredCertification.company}
                        />
                      </Form.Group>
                    </Col>
                  )}

                  {localDivisionId === -1 && (
                    <Col md={6}>
                      <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Division </Form.Label>
                        <DivisionSelect
                          onChange={(value) => setDivisionId(value)}
                          companyId={companyId}
                          entity={requiredCertification.division}
                        />
                      </Form.Group>
                    </Col>
                  )}
                  {localJobSiteId && (
                    <Col md={6}>
                      <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Project</Form.Label>
                        <JobSiteSelect
                          onChange={(value) => setJobSiteId(value)}
                          companyId={companyId}
                          divisionId={divisionId}
                          entity={requiredCertification.job_site}
                        />
                      </Form.Group>
                    </Col>
                  )}
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

export default EditRequiredCertification;
