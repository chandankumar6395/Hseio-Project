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
import { fetchGET, fetchPUT } from '../../utils/NetworkUtils';
import CustomManualDropDownMultiSelect from '../../components/widgets/CustomManualDropDownMultiSelect';

const EditInjuryIllness = (props) => {
  const {
    incidentId,
    injuryIllnessID,
    companyId,
    divisionId,
    jobsiteId,
    closeModal,
  } = props;
  console.log('Edit ID', injuryIllnessID);

  const localCompanyId = localStorage.getItem(KEY_COMPANY_ID);
  const localDivisionId = useSelector((state) => state.auth.selectedDivision);
  const localJobSiteId = useSelector((state) => state.auth.selectedJobSite);

  console.log('NewIncidentMUI localCompanyId', localCompanyId);
  console.log('NewIncidentMUI localDivisionId', localDivisionId);
  console.log('NewIncidentMUI localJobSiteId', localJobSiteId);

  const [validated, setValidated] = useState(false);

  const [oshaRecordable, setOshaRecordable] = useState('');
  const [oshaRecordableOptions, setOshaRecordableOptions] = useState('');
  const [outDaysLostTime, setOutDaysLostTime] = useState('');
  useState('');
  const [employeeId, setEmployeeId] = useState('');
  const [injuryClassId, setInjuryClassId] = useState('');
  const [injuryIllness, setInjuryIllness] = useState(null);
  const [bodyParts, setBodyParts] = useState([]);
  const [bodyPartOptions, setBodyPartOptions] = useState([]);
  const [injuryItemId, setInjuryItemId] = useState('');
  const [injuryItemOptions, setInjuryItemOptions] = useState('');
  console.log('Select Item', injuryItemOptions);
  useEffect(() => {
    if (injuryIllness != null) {
      setEmployeeId(injuryIllness.employee_id);
      setOshaRecordable(injuryIllness.osha_recordable);
      setOshaRecordableOptions({
        value: injuryIllness.osha_recordable,
        label: YES_NO_DATA.find((x) => x.id === injuryIllness.osha_recordable)
          .name,
      });
      const GetInjuryItemID = getSelectedInjuryItemId(injuryIllness);
      console.log('GetItemVal', GetInjuryItemID);
      if (GetInjuryItemID !== 0) {
        setInjuryItemId(GetInjuryItemID);

        setInjuryItemOptions({
          value: GetInjuryItemID,
          label: DATA_INJURY_ITEMS.find((x) => x.id === GetInjuryItemID).name,
        });
      }
      setBodyParts(injuryIllness.body_parts);
      setBodyPartOptions(returnOptionValues(injuryIllness.body_parts));

      setOutDaysLostTime(injuryIllness.lost_time_total_days);
      setInjuryClassId(injuryIllness.injury_class_id);
    }
  }, [injuryIllness]);

  const returnOptionValues = (entites) => {
    console.log('test entity', entites);
    const localOptions = [];
    entites.forEach((entity) => {
      localOptions.push({
        id: entity.id,
      });
    });
    return localOptions;
  };

  const getSelectedInjuryItemId = (item) => {
    let returnValue = 0;
    if (item.fatility === 1) {
      returnValue = 1;
    }
    if (item.lost_time === 1) {
      returnValue = 2;
    }
    if (item.restricted_duty === 1) {
      returnValue = 3;
    }
    if (item.other_recordable === 1) {
      returnValue = 4;
    }
    return returnValue;
  };

  useEffect(() => {
    loadInjuryIllness();
  }, []);

  const loadInjuryIllness = async () => {
    // await dispatch(getEmployee(id));

    const url = `${URLConstants.GET_INCIDENTS_INJURIES_URL}/${injuryIllnessID}.json`;
    console.log('URL GET', url);
    const resData = await fetchGET(url);
    console.log('Reponse Data', resData.data);
    setInjuryIllness(resData.data);
  };

  const onInjuryIllnessSubmit = (event) => {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }
    setValidated(true);
    event.preventDefault();

    const postData = {
      id: +injuryIllnessID,
      incident_id: +incidentId,
      employee_id: +employeeId,
      injury_class_id: +injuryClassId,
      osha_recordable: oshaRecordable,
      fatility: injuryItemId === 1 ? 1 : 0,
      lost_time: injuryItemId === 2 ? 1 : 0,
      restricted_duty: injuryItemId === 3 ? 1 : 0,
      other_recordable: injuryItemId === 4 ? 1 : 0,
      lost_time_total_days: outDaysLostTime,
      body_parts: bodyPartOptions,
      division_id: localDivisionId !== -1 ? localDivisionId : divisionId,
      company_id: localCompanyId !== null ? localCompanyId : companyId,
      job_site_id: localJobSiteId !== -1 ? localJobSiteId : jobsiteId,
    };
    postInjuryIllness(postData);
  };

  const postInjuryIllness = async (data) => {
    console.log('Post Data', data);
    try {
      const url = `${URLConstants.GET_INCIDENTS_INJURIES_URL}/${injuryIllnessID}.json`;
      const response = await fetchPUT(url, data);

      console.log('Submit Data', response);
    } catch (error) {
      toast(error.message || 'Failed');
    }
    closeModal();
  };

  const onOshaRecordableChangeHandler = (selectedOption) => {
    // console.log(event.target.value);
    setOshaRecordable(+selectedOption.value);
    setOshaRecordableOptions(selectedOption);
  };

  const onChangeInjuryItem = (selectedOption) => {
    // console.log(event.target.value);
    setInjuryItemId(+selectedOption.value);
    setInjuryItemOptions(selectedOption);
  };

  const onOutDaysLostTimeChangeHandler = (event) => {
    setOutDaysLostTime(event.target.value);
  };

  return (
    <>
      <Helmet title="Edit Injury/Illness" />

      <Grid container spacing={6}>
        <Grid item xs={12}>
          {injuryIllness && (
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
                      entity={injuryIllness.employee}
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
                      value={oshaRecordableOptions}
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
                      value={injuryItemOptions}
                    />
                  </Form.Group>
                </Col>
                {(injuryItemId === 2 || injuryItemId === 3) && (
                  <Col md={6}>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                      <Form.Label>Out of Days</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="Out of Days"
                        onChange={onOutDaysLostTimeChangeHandler}
                        value={outDaysLostTime}
                      />
                    </Form.Group>
                  </Col>
                )}
                <CustomManualDropDownMultiSelect
                  title="Body Parts *"
                  url={URLConstants.BODY_PARTS_URL}
                  onSelect={(value) => {
                    setBodyPartOptions(value);
                    console.log('I am here in custom manual drop down.', value);
                  }}
                  entities={bodyParts}
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
                      entity={injuryIllness.injury_class}
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
          )}
        </Grid>
      </Grid>
    </>
  );
};

export default EditInjuryIllness;
