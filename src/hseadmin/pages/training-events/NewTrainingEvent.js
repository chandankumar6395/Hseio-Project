/* eslint-disable camelcase */
// @ts-ignore

import { Button, Card, Col, Form, Row } from 'react-bootstrap';
import React, { useEffect, useState } from 'react';
// import {useDispatch} from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Select from 'react-select';
import { fetchPOST } from '../../utils/NetworkUtils';
import URLConstants from '../../constants/URLConstants';
import CustomSelect from '../../components/widgets/CustomSelect';
import { YES_NO_DATA } from '../../constants/Constants';

const NewTrainingEvent = () => {
  const [validated, setValidated] = useState(false);

  const history = useNavigate();

  const [name, setName] = useState('');
  const [shortDesc, setShortDesc] = useState('');
  const [longDesc, setLongDesc] = useState('');
  const [proposedStartDate, setProposedStartDate] = useState('');
  const [proposedEndDate, setProposedEndDate] = useState('');
  const [actualStartDate, setActualStartDate] = useState('');
  const [actualEndDate, setActualEndDate] = useState('');
  const [expireDate, setExpireDate] = useState('');
  const [self, setSelf] = useState('');
  const [trainingEventStatusId, setTrainingEventStatusId] = useState('');

  useEffect(() => {}, []);

  const onTrainingEventSubmit = (event) => {
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
      long_desc: longDesc,
      proposed_start_date: proposedStartDate,
      proposed_end_date: proposedEndDate,
      actual_start_date: actualStartDate,
      actual_end_date: actualEndDate,
      expire_date: expireDate,
      self,
      training_event_status_id: trainingEventStatusId,
    };
    postTrainingEvent(postData);
  };

  const postTrainingEvent = async (data) => {
    try {
      await fetchPOST(URLConstants.TRAINING_EVENTS_URL, data);
      history('../../private/training-events');
    } catch (error) {
      console.log(error);
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

  const onProposedStartDateChangeHandler = (event) => {
    setProposedStartDate(event.target.value);
    console.log(event.target.value);
  };

  const onProposedEndDateChangeHandler = (event) => {
    console.log(event.target.value);
    setProposedEndDate(event.target.value);
  };

  const onActualStartDateChangeHandler = (event) => {
    console.log(event.target.value);
    setActualStartDate(event.target.value);
  };

  const onActualEndDateChangeHandler = (event) => {
    console.log(event.target.value);
    setActualEndDate(event.target.value);
  };

  const onExpireDateChangeHandler = (event) => {
    console.log(event.target.value);
    setExpireDate(event.target.value);
  };

  const onSelfChangeHandler = (selectedOption) => {
    setSelf(+selectedOption.value);
  };
  return (
    <Row>
      <Col>
        <Card>
          <Card.Header>
            Add Training Event
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
          </Card.Header>
          <Card.Body>
            <Form
              noValidate
              validated={validated}
              onSubmit={onTrainingEventSubmit}
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
                    />
                    <Form.Control.Feedback type="invalid">
                      Please provide a valid name.
                    </Form.Control.Feedback>
                  </Form.Group>
                </Col>
                <Col md={6}>
                  {/* Short Desc Field */}
                  <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Short Desc</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Short Desc"
                      onChange={onShortDescChangeHandler}
                    />
                  </Form.Group>
                </Col>
                <Col md={6}>
                  {/* Long Desc Field */}
                  <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Long Desc</Form.Label>
                    <Form.Control
                      as="textarea"
                      rows={2}
                      placeholder="Long Desc"
                      onChange={onLongDescChangeHandler}
                    />
                  </Form.Group>
                </Col>

                <Col md={6}>
                  {/* Proposed Start Date */}
                  <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Proposed Start Date</Form.Label>
                    <Form.Control
                      type="datetime-local"
                      placeholder="Proposed Start Date"
                      onChange={onProposedStartDateChangeHandler}
                    />
                  </Form.Group>
                </Col>
                <Col md={6}>
                  {/* Proposed End Date */}
                  <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Proposed End Date</Form.Label>
                    <Form.Control
                      type="datetime-local"
                      placeholder="Proposed End Date"
                      onChange={onProposedEndDateChangeHandler}
                    />
                  </Form.Group>
                </Col>
                <Col md={6}>
                  {/* Actual Start Date */}
                  <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Actual Start Date</Form.Label>
                    <Form.Control
                      type="datetime-local"
                      placeholder="Actual Start Date"
                      onChange={onActualStartDateChangeHandler}
                    />
                  </Form.Group>
                </Col>
                <Col md={6}>
                  {/* Actual End Date */}
                  <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Actual End Date</Form.Label>
                    <Form.Control
                      type="datetime-local"
                      placeholder="Actual End Date"
                      onChange={onActualEndDateChangeHandler}
                    />
                  </Form.Group>
                </Col>
                <Col md={6}>
                  {/* Expire Date */}
                  <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Expire Date</Form.Label>
                    <Form.Control
                      type="datetime-local"
                      placeholder="Expire Date"
                      onChange={onExpireDateChangeHandler}
                    />
                  </Form.Group>
                </Col>
                <Col md={6}>
                  {/* Self */}
                  <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Self</Form.Label>
                    <Select
                      required
                      options={YES_NO_DATA.map((item) => {
                        return { value: item.id, label: item.name };
                      })}
                      onChange={onSelfChangeHandler}
                    />
                    <Form.Control.Feedback type="invalid">
                      Please provide a valid Self.
                    </Form.Control.Feedback>
                  </Form.Group>
                </Col>

                <Col md={6}>
                  {/* Training Event Status Id */}
                  <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Training Event Status</Form.Label>
                    <CustomSelect
                      params={{
                        url: URLConstants.TRAINING_EVENT_STATUSES_URL,
                      }}
                      onChange={(value) => {
                        setTrainingEventStatusId(value);
                      }}
                    />
                    <Form.Control.Feedback type="invalid">
                      Please provide a valid Training Event Status.
                    </Form.Control.Feedback>
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
export default NewTrainingEvent;
