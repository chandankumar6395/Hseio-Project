import { Button, Card, Col, Form, Row } from 'react-bootstrap';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import URLConstants from '../../constants/URLConstants';
import { fetchGET, fetchPUT } from '../../utils/NetworkUtils';
import CustomSelect from '../../components/widgets/CustomSelect';

const EditIndustry = () => {
  const [validated, setValidated] = useState(false);

  const history = useNavigate();

  const [name, setName] = useState('');
  const [parentId, setParentId] = useState(-1);

  const params = useParams();
  const { id } = useParams();

  const [industry, setIndustry] = useState(null);

  useEffect(() => {
    if (industry != null) {
      setName(industry.name);
      setParentId(industry.parent_id);
    }
  }, [industry]);

  useEffect(() => {
    console.log(`param is ${params.id}`);
    loadIndustry();
  }, []);

  const loadIndustry = async () => {
    try {
      const url = `${URLConstants.GET_INDUSTRY_URL}/${id}.json`;
      const response = await fetchGET(url);
      setIndustry(response.data);
    } catch (error) {
      toast(error.message || 'Failed');
    }
  };

  const onIndustrySubmit = (event) => {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }

    setValidated(true);
    event.preventDefault();
    const postData = {
      name,
      parent_id: parentId,
    };
    postIndustry(postData);
  };

  const postIndustry = async (data) => {
    try {
      const url = `${URLConstants.GET_INDUSTRY_URL}/${id}.json`;

      await fetchPUT(url, data);

      history('../../private/industries');
    } catch (error) {
      toast(error.message || 'Failed');
    }
  };

  const onNameChangeHandler = (event) => {
    console.log(event.target.value);
    setName(event.target.value);
  };

  return (
    <Row>
      <Col>
        <Card>
          <Card.Header>
            Edit Industry
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
          {industry != null && (
            <Card.Body>
              <Form
                noValidate
                validated={validated}
                onSubmit={onIndustrySubmit}
              >
                <Row>
                  {/* Name Field */}
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
                      <Form.Label>Parent Industry</Form.Label>
                      <CustomSelect
                        params={{
                          url: URLConstants.INDUSTRIES_URL,
                        }}
                        onChange={(value) => {
                          setParentId(value);
                        }}
                        entity={industry.parent_industry}
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

export default EditIndustry;
