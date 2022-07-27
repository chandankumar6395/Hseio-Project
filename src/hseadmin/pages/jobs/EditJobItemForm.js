import { Col, Form, Row } from 'react-bootstrap';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';

import { Button } from '@mui/material';
import URLConstants from '../../constants/URLConstants';
import { fetchGET, fetchPUT } from '../../utils/NetworkUtils';

const EditJobItemForm = (props) => {
  const { jobId, jobItemId, close } = props;
  // console.log('here is jobitem ID', jobItemId);
  const [validated, setValidated] = useState(false);

  const [jobStages, setJobStages] = useState('');
  const [hazardConsequence, setHazardConsequence] = useState('');
  const [controls, setControls] = useState('');

  const params = useParams();

  const [jobItem, setJobItem] = useState(null);

  useEffect(() => {
    if (jobItem != null) {
      setJobStages(jobItem.job_stages);
      setHazardConsequence(jobItem.hazard_consequence);
      setControls(jobItem.controls);
    }
  }, [jobItem]);

  useEffect(() => {
    console.log(`param is ${params.id}`);
    loadJobItem();
  }, []);

  const loadJobItem = async () => {
    try {
      // console.log('JOBITEMID', jobItemId);
      // console.log('JOBID', jobId);
      const url = `${URLConstants.GET_JOB_ITEM_URL}/${jobItemId}.json`;
      const response = await fetchGET(url);
      setJobItem(response.data);
    } catch (error) {
      toast(error.message || 'Failed');
    }
  };

  const onJobItemSubmit = (event) => {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }

    setValidated(true);
    event.preventDefault();
    const postData = {
      id: jobItemId,
      job_id: jobId,
      job_stages: jobStages,
      hazard_consequence: hazardConsequence,
      controls,
    };
    postJobItem(postData);
  };

  const postJobItem = async (data) => {
    try {
      const url = `${URLConstants.GET_JOB_ITEM_URL}/${jobItemId}.json`;

      await fetchPUT(url, data);
      close();
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
      {jobItem && (
        <Form noValidate validated={validated} onSubmit={onJobItemSubmit}>
          <Row>
            <Col md={6}>
              {/* Job Stages */}
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Job Stages</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Job Stages"
                  onChange={onJobStagesChangeHandler}
                  value={jobStages}
                />
              </Form.Group>
            </Col>

            {/* Hazard Consequences */}
            <Col md={6}>
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Hazard Consequences</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Hazard Consequences"
                  onChange={onHazardConsequenceChangeHandler}
                  value={hazardConsequence}
                />
              </Form.Group>
            </Col>

            {/* controls */}
            <Col md={6}>
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Controls</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Controls"
                  onChange={onControlsChangeHandler}
                  value={controls}
                />
              </Form.Group>
            </Col>
          </Row>
          <Button variant="contained" type="submit" color="primary">
            Submit
          </Button>
        </Form>
      )}
    </>
  );
};

export default EditJobItemForm;
