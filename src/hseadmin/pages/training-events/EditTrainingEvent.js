/* eslint-disable camelcase */
import { Button, Card, Col, Form, Row } from 'react-bootstrap';
import React, { useEffect, useState } from 'react';
import { NavLink, useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import Select from 'react-select';
import moment from 'moment';
import CustomSelect from '../../components/widgets/CustomSelect';
import URLConstants from '../../constants/URLConstants';
import { fetchGET, fetchPUT } from '../../utils/NetworkUtils';
import { YES_NO_DATA } from '../../constants/Constants';
import { toLocalDateTime, toServerDateTime } from '../../utils/Utils';

const EditTrainingEvent = () => {
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
  const [selectedSelfOption, setSelectedSelfOption] = useState({});
  const [trainingEventStatusId, setTrainingEventStatusId] = useState(-1);
  const [trainingEvent, setTrainingEvent] = useState(null);

  const params = useParams();
  const { id } = useParams();

  useEffect(() => {
    if (trainingEvent != null) {
      const date = new Date();
      const offset = date.getTimezoneOffset();
      console.log('time offset----->', offset);
      console.log('time----->', trainingEvent.start_date_time);
      const dt = moment(trainingEvent.start_date_time).format(
        'YYYY-MM-DDTHH:MM'
      );
      console.log('time----->', dt);
      console.log('time----->', dt);

      toLocalDateTime(trainingEvent.start_date_time);

      setName(trainingEvent.name);
      setShortDesc(trainingEvent.short_desc);
      setLongDesc(trainingEvent.long_desc);
      setProposedStartDate(toLocalDateTime(trainingEvent.proposed_start_date));
      setProposedEndDate(toLocalDateTime(trainingEvent.proposed_end_date));
      setActualStartDate(toLocalDateTime(trainingEvent.actual_start_date));
      setActualEndDate(toLocalDateTime(trainingEvent.actual_end_date));
      setExpireDate(toLocalDateTime(trainingEvent.expire_date));
      setSelf(trainingEvent.self);
      setTrainingEventStatusId(trainingEvent.training_event_status_id);
      setSelectedSelfOption({
        value: trainingEvent.self,
        label: YES_NO_DATA.find((x) => x.id === trainingEvent.self).name,
      });
    }
  }, [trainingEvent]);

  useEffect(() => {
    console.log(`param is ${params.id}`);
    loadTrainingEvent();
  }, []);

  const loadTrainingEvent = async () => {
    try {
      const url = `${URLConstants.GET_TRAINING_EVENT_URL}/${id}.json`;
      const response = await fetchGET(url);
      setTrainingEvent(response.data);
    } catch (error) {
      toast(error.message || 'Failed');
    }
  };

  const onTrainingEventSubmit = (event) => {
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
      proposed_start_date: toServerDateTime(proposedStartDate),
      proposed_end_date: toServerDateTime(proposedEndDate),
      actual_start_date: toServerDateTime(actualStartDate),
      actual_end_date: toServerDateTime(actualEndDate),
      expire_date: toServerDateTime(expireDate),
      self,
      training_event_status_id:
        trainingEventStatusId === -1 ? null : trainingEventStatusId,
    };
    postTrainingEvent(postData);
  };

  const postTrainingEvent = async (data) => {
    try {
      const url = `${URLConstants.GET_TRAINING_EVENT_URL}/${id}.json`;

      await fetchPUT(url, data);

      history('../../private/training-events');
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
    setSelectedSelfOption(selectedOption);
  };
  return (
    <Row>
      <Col>
        <Card>
          <Card.Header>
            Edit Training Event
            <NavLink to="/private/training-events">
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
          {trainingEvent && (
            <Card.Body>
              <Form
                noValidate
                validated={validated}
                onSubmit={onTrainingEventSubmit}
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
                        value={name}
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
                        value={shortDesc}
                      />
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    {' '}
                    {/* Long Desc Field */}
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                      <Form.Label>Long Desc</Form.Label>
                      <Form.Control
                        as="textarea"
                        rows={2}
                        placeholder="Long Desc"
                        onChange={onLongDescChangeHandler}
                        value={longDesc}
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
                        value={proposedStartDate}
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
                        value={proposedEndDate}
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
                        value={actualStartDate}
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
                        value={actualEndDate}
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
                        value={expireDate}
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
                        value={selectedSelfOption}
                      />
                      <Form.Control.Feedback type="invalid">
                        Please provide a valid self.
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
                        entity={trainingEvent.training_event_status}
                      />
                      <Form.Control.Feedback type="invalid">
                        Please provide a valid Training Event Status Id.
                      </Form.Control.Feedback>
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

export default EditTrainingEvent;
