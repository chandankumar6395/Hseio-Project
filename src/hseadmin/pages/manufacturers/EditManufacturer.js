import React, { useEffect, useState } from 'react';
import { NavLink, useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Button, Card, Col, Form, Row } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import URLConstants from '../../constants/URLConstants';
import { fetchGET, fetchPUT } from '../../utils/NetworkUtils';
import { KEY_COMPANY_ID } from '../../constants/Constants';
import CompanySelect from '../../components/widgets/CompanySelect';
import DivisionSelect from '../../components/widgets/DivisionSelect';
import JobSiteSelect from '../../components/widgets/JobSiteSelect';

const EditManufacturer = () => {
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

  const [manufacturer, setManufacturer] = useState(null);

  const { id } = useParams();
  const params = useParams();
  useEffect(() => {
    if (manufacturer != null) {
      setName(manufacturer.name);
      setShortDesc(manufacturer.short_desc);
      setLongDesc(manufacturer.long_desc);
      setCompanyId(manufacturer.company_id);
      setDivisionId(manufacturer.division_id);
      setJobSiteId(manufacturer.job_site_id);
    }
  }, [manufacturer]);

  useEffect(() => {
    console.log(`param is ${params.id}`);
    loadManufacturer();
  }, []);

  const loadManufacturer = async () => {
    try {
      const url = `${URLConstants.GET_MANUFACTURERS_URL}/${id}.json`;

      console.log('getManufacturers url =', url);

      const response = await fetchGET(url);

      console.log('getManufacturers -->', response.data);

      setManufacturer(response.data);
    } catch (error) {
      toast(error.message || 'Failed');
    }
  };

  const onManufacturerSubmit = (event) => {
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
    postManufacturer(postData);
  };
  const postManufacturer = async (data) => {
    try {
      const url = `${URLConstants.GET_MANUFACTURERS_URL}/${id}.json`;

      await fetchPUT(url, data);

      history('../../private/manufacturers');
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
            Edit Manufacturer Details
            <NavLink to="/private/manufacturers">
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
          {manufacturer && (
            <Card.Body>
              <Form
                noValidate
                validated={validated}
                onSubmit={onManufacturerSubmit}
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
                          entity={manufacturer.company}
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
                          entity={manufacturer.division}
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
                          entity={manufacturer.job_site}
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

export default EditManufacturer;
