import { Col, Form, Row } from 'react-bootstrap';
import React, { useEffect, useState } from 'react';
import Select from 'react-select';
import { toast } from 'react-toastify';
import { Helmet } from 'react-helmet-async';
import { Button, Grid } from '@mui/material';
import { useSelector } from 'react-redux';
import {
  DATA_INJURY_ITEMS,
  KEY_COMPANY_ID,
  YES_NO_DATA,
} from '../../constants/Constants';
import URLConstants from '../../constants/URLConstants';
import CustomSelect from '../../components/widgets/CustomSelect';
import EmployeeSelect from '../../components/widgets/EmployeeSelect';
import { fetchPOST } from '../../utils/NetworkUtils';
import CustomManualDropDownMultiSelect from '../../components/widgets/CustomManualDropDownMultiSelect';

const NewInjuryIllness = (props) => {
  const { incidentId, companyId, divisionId, jobsiteId, closeModal } = props;
  const localCompanyId = localStorage.getItem(KEY_COMPANY_ID);
  const localDivisionId = useSelector((state) => state.auth.selectedDivision);
  const localJobSiteId = useSelector((state) => state.auth.selectedJobSite);

  console.log('NewIncidentMUI localCompanyId', localCompanyId);
  console.log('NewIncidentMUI localDivisionId', localDivisionId);
  console.log('NewIncidentMUI localJobSiteId', localJobSiteId);

  const [validated, setValidated] = useState(false);

  const [oshaRecordable, setOshaRecordable] = useState('');
  const [outDaysLostTime, setOutDaysLostTime] = useState('');
  const [employeeId, setEmployeeId] = useState('');
  const [injuryClassId, setInjuryClassId] = useState('');
  const [bodyParts, setBodyParts] = useState('');
  const [injuryItem, setInjuryItem] = useState('');
  useEffect(() => {}, []);

  const onInjuryIllnessSubmit = (event) => {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }
    setValidated(true);
    event.preventDefault();

    const postData = {
      incident_id: +incidentId,
      employee_id: +employeeId,
      injury_class_id: +injuryClassId,
      osha_recordable: oshaRecordable,
      fatility: injuryItem === 1 ? 1 : 0,
      lost_time: injuryItem === 2 ? 1 : 0,
      restricted_duty: injuryItem === 3 ? 1 : 0,
      other_recordable: injuryItem === 4 ? 1 : 0,
      lost_time_total_days: outDaysLostTime,
      body_parts: bodyParts,
      division_id: localDivisionId !== -1 ? localDivisionId : divisionId,
      company_id: localCompanyId !== null ? localCompanyId : companyId,
      job_site_id: localJobSiteId !== -1 ? localJobSiteId : jobsiteId,
    };
    postInjuryIllness(postData);
  };

  const postInjuryIllness = async (data) => {
    console.log('Post Data', data);
    try {
      const response = await fetchPOST(
        URLConstants.INCIDENTS_INJURIES_URL,
        data
      );
      console.log('Submit Data', response);
    } catch (error) {
      toast(error.message || 'Failed');
    }
    closeModal();
  };

  const onOshaRecordableChangeHandler = (selectedOption) => {
    // console.log(event.target.value);
    setOshaRecordable(+selectedOption.value);
  };

  const onChangeInjuryItem = (selectedOption) => {
    // console.log(event.target.value);
    setInjuryItem(+selectedOption.value);
  };

  const onOutDaysLostTimeChangeHandler = (event) => {
    setOutDaysLostTime(event.target.value);
  };

  return (
    <>
      <Helmet title="Add Injury/Illness" />

      <Grid container spacing={6}>
        <Grid item xs={12}>
          <Form
            noValidate
            validated={validated}
            onSubmit={onInjuryIllnessSubmit}
          >
            <Row>
              <Col md={6}>
                {/* Employee id */}
                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Form.Label>Employee *</Form.Label>
                  <EmployeeSelect
                    params={{
                      url: URLConstants.EMPLOYEES_URL,
                    }}
                    onChange={(value) => {
                      setEmployeeId(value);
                    }}
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                {/* osha recordable */}
                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Form.Label>Osha Recordable *</Form.Label>
                  <Select
                    required
                    options={YES_NO_DATA.map((item) => {
                      return { value: item.id, label: item.name };
                    })}
                    onChange={onOshaRecordableChangeHandler}
                  />
                  <Form.Control.Feedback type="invalid">
                    Please provide a valid Osha recordable.
                  </Form.Control.Feedback>
                </Form.Group>
              </Col>
              <Col md={6}>
                {/* lost time */}
                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Form.Label>Injury Item *</Form.Label>
                  <Select
                    options={DATA_INJURY_ITEMS.map((item) => {
                      return { value: item.id, label: item.name };
                    })}
                    onChange={onChangeInjuryItem}
                  />
                </Form.Group>
              </Col>
              {(injuryItem === 2 || injuryItem === 3) && (
                <Col md={6}>
                  <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Out of Days</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Out of Days"
                      onChange={onOutDaysLostTimeChangeHandler}
                    />
                  </Form.Group>
                </Col>
              )}
              <CustomManualDropDownMultiSelect
                title="Body Parts *"
                url={URLConstants.BODY_PARTS_URL}
                onSelect={(value) => {
                  setBodyParts(value);
                  console.log('I am here in custom manual drop down.', value);
                }}
              />
              <Col md={6}>
                {/* Incident Type Id */}
                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Form.Label>Injury/Illness Class *</Form.Label>
                  <CustomSelect
                    params={{
                      url: URLConstants.INJURY_CLASSES_URL,
                    }}
                    onChange={(value) => {
                      setInjuryClassId(value);
                    }}
                  />
                  <Form.Control.Feedback type="invalid">
                    Please provide a valid Incident Type Name.
                  </Form.Control.Feedback>
                </Form.Group>
              </Col>

              <Button variant="contained" type="submit" color="primary">
                Submit
              </Button>
            </Row>
          </Form>
        </Grid>
      </Grid>
    </>
  );
};

export default NewInjuryIllness;
