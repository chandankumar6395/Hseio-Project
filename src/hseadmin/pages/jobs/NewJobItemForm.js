import { Col, Form, Row } from 'react-bootstrap';
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Button } from '@mui/material';

import { addJobItems } from '../../store/actions/job_items';

const NewJobItemForm = (props) => {
  const { close, jobId } = props;
  const [validated, setValidated] = useState(false);
  const history = useNavigate();

  const [jobStages, setJobStages] = useState('');
  const [hazardConsequence, setHazardConsequence] = useState('');
  const [controls, setControls] = useState('');

  const dispatch = useDispatch();

  useEffect(() => {}, []);

  const onJobItemSubmit = (event) => {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }
    setValidated(true);
    event.preventDefault();

    const postData = {
      job_id: jobId,
      job_stages: jobStages,
      hazard_consequence: hazardConsequence,
      controls,
    };
    postJobItem(postData);
  };

  const postJobItem = async (data) => {
    try {
      await dispatch(addJobItems(data));
      if (close !== undefined) {
        close();
        return;
      }
      history('../../private/job-items');
    } catch (error) {
      toast(error.message || 'Failed');
    }
  };

  const onJobStagesChangeHandler = (event) => {
    // console.log(event.target.value);
    setJobStages(event.target.value);
  };

  const onHazardConsequenceChangeHandler = (event) => {
    // console.log(event.target.value);
    setHazardConsequence(event.target.value);
  };

  const onControlsChangeHandler = (event) => {
    // console.log(event.target.value);
    setControls(event.target.value);
  };

  return (
    <>
      <Form noValidate validated={validated} onSubmit={onJobItemSubmit}>
        <Row>
          <Col md={4}>
            {/* Job Stages */}
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Job Stages</Form.Label>
              <Form.Control
                as="textarea"
                rows={2}
                placeholder="Job Stages"
                onChange={onJobStagesChangeHandler}
              />
            </Form.Group>
          </Col>

          {/* Hazard Consequences */}
          <Col md={4}>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Hazard Consequences</Form.Label>
              <Form.Control
                as="textarea"
                rows={2}
                placeholder="Hazard Consequences"
                onChange={onHazardConsequenceChangeHandler}
              />
            </Form.Group>
          </Col>

          {/* controls */}
          <Col md={4}>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Controls</Form.Label>
              <Form.Control
                as="textarea"
                rows={2}
                placeholder="Controls"
                onChange={onControlsChangeHandler}
              />
            </Form.Group>
          </Col>
        </Row>
        <Button variant="contained" type="submit" color="primary">
          Submit
        </Button>
      </Form>
    </>
  );
};

export default NewJobItemForm;
