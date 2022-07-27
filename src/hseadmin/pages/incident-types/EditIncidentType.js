import React, { useEffect, useState } from 'react';
import { NavLink, useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Button, Card, Col, Form, Row } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import URLConstants from '../../constants/URLConstants';
import { fetchGET, fetchPUT } from '../../utils/NetworkUtils';
import { getIncidentType } from '../../store/actions/incident_type';

const EditIncidentType = () => {
  const [validated, setValidated] = useState(false);

  const history = useNavigate();

  const [name, setName] = useState('');
  const [shortDesc, setShortDesc] = useState('');
  const [longDesc, setLongDesc] = useState('');

  const dispatch = useDispatch();

  const [incidentType, setIncidentType] = useState(null);

  const { id } = useParams();
  const params = useParams();
  useEffect(() => {
    if (incidentType != null) {
      setName(incidentType.name);
      setShortDesc(incidentType.short_desc);
      setLongDesc(incidentType.long_desc);
    }
  }, [incidentType]);

  useEffect(() => {
    console.log(`param is ${params.id}`);
    loadIncidentTypes();
  }, []);

  const loadIncidentTypes = async () => {
    try {
      const url = `${URLConstants.GET_INCIDENT_TYPE_URL}/${id}.json`;

      console.log('getIncidentTypes url =', url);

      const response = await fetchGET(url);

      console.log('getIncidentTypes -->', response.data);

      setIncidentType(response.data);
    } catch (error) {
      toast(error.message || 'Failed');
    }
    await dispatch(getIncidentType(id));
  };

  const onIncidentTypeSubmit = (event) => {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }
    setValidated(true);
    event.preventDefault();
    // @ts-ignore
    if (name === '') {
      toast('Please enter Name');
    } else {
      const postData = {
        id,
        name,
        short_desc: shortDesc,
        long_desc: longDesc,
      };
      postIncidentType(postData);
    }
  };
  const postIncidentType = async (data) => {
    try {
      const url = `${URLConstants.GET_INCIDENT_TYPE_URL}/${id}.json`;

      await fetchPUT(url, data);

      history('../../private/incident-types');
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
  const maxLongDescCheck = (object) => {
    if (object.target.value.length > object.target.maxLength) {
      object.target.value = object.target.value.slice(
        0,
        object.target.maxLength
      );
    }
  };

  const maxShortDescCheck = (object) => {
    if (object.target.value.length > object.target.maxLength) {
      object.target.value = object.target.value.slice(
        0,
        object.target.maxLength
      );
    }
  };
  return (
    <Row>
      <Col>
        <Card>
          <Card.Header>
            Edit Incident Types Details
            <NavLink to="/private/incident-types">
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
          {incidentType && (
            <Card.Body>
              <Form
                noValidate
                validated={validated}
                onSubmit={onIncidentTypeSubmit}
              >
                {/* Name Field */}
                <Row>
                  <Col md={6}>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                      <Form.Label>Name *</Form.Label>
                      <Form.Control
                        required
                        as="textarea"
                        rows={2}
                        placeholder="Name *"
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
                        maxLength="255"
                        onInput={maxShortDescCheck}
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
                        rows={2}
                        maxLength="500"
                        onInput={maxLongDescCheck}
                        placeholder="Long Desc"
                        onChange={onLongDescChangeHandler}
                        value={longDesc}
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

export default EditIncidentType;
