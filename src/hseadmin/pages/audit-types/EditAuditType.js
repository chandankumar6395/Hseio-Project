import { Button, Card, Col, Form, Row } from 'react-bootstrap';
import React, { useEffect, useState } from 'react';

import { NavLink, useNavigate, useParams } from 'react-router-dom';

import { toast } from 'react-toastify';
import URLConstants from '../../constants/URLConstants';
import { fetchGET, fetchPUT } from '../../utils/NetworkUtils';

const EditAuditType = () => {
  const [validated, setValidated] = useState(false);

  const history = useNavigate();

  const [name, setName] = useState('');
  const [shortDesc, setShortDesc] = useState('');
  const [longDesc, setLongDesc] = useState('');

  // eslint-disable-next-line camelcase
  const [auditType, setAuditType] = useState(null);

  const params = useParams();
  const { id } = useParams();

  useEffect(() => {
    // eslint-disable-next-line camelcase
    if (auditType != null) {
      setName(auditType.name);
      setShortDesc(auditType.short_desc !== null ? auditType.short_desc : '');
      setLongDesc(auditType.long_desc !== null ? auditType.long_desc : '');
    }
    // eslint-disable-next-line camelcase
  }, [auditType]);

  useEffect(() => {
    console.log(`param is ${params.id}`);
    loadAuditType();
  }, []);

  const loadAuditType = async () => {
    // await dispatch(getAuditType(id));

    try {
      const url = `${URLConstants.GET_AUDIT_TYPE_URL}/${id}.json`;
      const response = await fetchGET(url);
      setAuditType(response.data);
    } catch (error) {
      toast(error.message || 'Failed');
    }
  };

  const onAuditTypeSubmit = (event) => {
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
    };
    postAuditType(postData);
  };

  const postAuditType = async (data) => {
    try {
      const url = `${URLConstants.GET_AUDIT_TYPE_URL}/${id}.json`;

      await fetchPUT(url, data);

      history('../../private/audit-types');
    } catch (error) {
      toast(error.message || 'Failed');
    }
  };

  const onNameChangeHandler = (event) => {
    console.log(event.target.value);
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
            Edit Audit Types
            <NavLink to="/private/audit-types">
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
          <Card.Body>
            <Form noValidate validated={validated} onSubmit={onAuditTypeSubmit}>
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

                {/* Short Desc */}
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

                {/* Description */}
                <Col md={6}>
                  <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Description</Form.Label>
                    <Form.Control
                      as="textarea"
                      rows={2}
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
        </Card>
      </Col>
    </Row>
  );
};

export default EditAuditType;
