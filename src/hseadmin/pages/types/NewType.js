import {Button, Card, Col, Form, Row} from 'react-bootstrap';
import React, {useEffect, useState} from 'react';
import {useDispatch} from 'react-redux';
import {useNavigate} from 'react-router-dom';
import {loadTypes, addTypes} from '../../store/actions/types';

const Type = () => {
  const [validated, setValidated] = useState(false);

  const history = useNavigate();

  const [name, setName] = useState('');
  const [shortDesc, setShortDesc] = useState('');
  const [longDesc, setLongDesc] = useState('');

  const dispatch = useDispatch();

  useEffect(() => {
    fetchTypes();
  }, []);

  const fetchTypes = async () => {
    await dispatch(loadTypes());
  };

  const onTypeSubmit = (event) => {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }

    setValidated(true);
    event.preventDefault();
    const postData = {
      name,
      short_desc: shortDesc,
      long_desc: longDesc
    };
    postType(postData);
  };

  const postType = async (data) => {
    await dispatch(addTypes(data));
    history('../../types');
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
            Add Type
            <>
              <Button
                className="btn-sm"
                variant="primary"
                type="button"
                style={{
                  float: 'right'
                }}
                onClick={() => {
                  history(-1);
                }}
              >
                Back
              </Button>
            </>
          </Card.Header>
          <Card.Body>
            <Form noValidate validated={validated} onSubmit={onTypeSubmit}>
              <Row>
                {/* Name Feild */}
                <Col md={6}>
                  <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Name</Form.Label>
                    <Form.Control
                      required
                      type="text"
                      placeholder="Name"
                      onChange={onNameChangeHandler}
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
                      placeholder="Description"
                      onChange={onLongDescChangeHandler}
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

export default Type;
