import { Col, Form, Row } from 'react-bootstrap';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { Helmet } from 'react-helmet-async';
import { Button, Grid } from '@mui/material';
import { KEY_COMPANY_ID } from '../../constants/Constants';
import URLConstants from '../../constants/URLConstants';
import CustomSelect from '../../components/widgets/CustomSelect';
import EmployeeSelect from '../../components/widgets/EmployeeSelect';
import { fetchGET, fetchPUT } from '../../utils/NetworkUtils';

const EditVehicleMoving = (props) => {
  const { incidentId, incidentTypeId, vehicleMovingId, closeModal } = props;
  console.log('Fetch ID', vehicleMovingId);
  const localCompanyId = localStorage.getItem(KEY_COMPANY_ID);
  const localDivisionId = useSelector((state) => state.auth.selectedDivision);
  const localJobSiteId = useSelector((state) => state.auth.selectedJobSite);
  console.log('NewIncidentMUI localCompanyId', localCompanyId);
  console.log('NewIncidentMUI localDivisionId', localDivisionId);
  console.log('NewIncidentMUI localJobSiteId', localJobSiteId);

  const [validated, setValidated] = useState(false);

  const [employeeId, setEmployeeId] = useState('');
  const [longdesc, setLongDesc] = useState('');
  const [equipmentId, setEquipmentId] = useState('');
  const [vehicleMoving, setVehicleMoving] = useState('');

  useEffect(() => {
    if (vehicleMoving != null) {
      setEmployeeId(vehicleMoving.employee_id);
      setEquipmentId(vehicleMoving.equipment_id);
      setLongDesc(vehicleMoving.incident_description);
    }
  }, [vehicleMoving]);

  useEffect(() => {
    loadvehicleMovig();
  }, []);

  const loadvehicleMovig = async () => {
    // await dispatch(getEmployee(id));

    const url = `${URLConstants.GET_INCIDENTS_VEHICLE_MOVING_URL}/${vehicleMovingId}.json`;
    console.log('URL GET', url);
    const resData = await fetchGET(url);
    console.log('Reponse Data', resData.data);
    setVehicleMoving(resData.data);
  };

  useEffect(() => {}, []);

  const onVehivleMovingSubmit = (event) => {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }
    setValidated(true);
    event.preventDefault();

    const postData = {
      id: vehicleMovingId,
      incident_id: incidentId,
      employee_id: employeeId,
      equipment_id: equipmentId,
      incident_type_id: incidentTypeId,
      incident_description: longdesc,
    };
    postVehicleMoving(postData);
  };

  const postVehicleMoving = async (data) => {
    console.log('Post Data', data);
    try {
      const url = `${URLConstants.GET_INCIDENTS_VEHICLE_MOVING_URL}/${vehicleMovingId}.json`;
      const response = await fetchPUT(url, data);
      console.log('Submit Data', response);
    } catch (error) {
      toast(error.message || 'Failed');
    }
    closeModal();
  };

  const onLongDescChangeHandler = (event) => {
    setLongDesc(event.target.value);
  };
  return (
    <>
      <Helmet title="Edit Vehicle Moving" />

      <Grid container spacing={6}>
        <Grid item xs={12}>
          {vehicleMoving && (
            <Form
              noValidate
              validated={validated}
              onSubmit={onVehivleMovingSubmit}
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
                      entity={vehicleMoving.employee}
                    />
                  </Form.Group>
                </Col>

                <Col md={6}>
                  {/* Equipment Id */}
                  <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Equipments *</Form.Label>
                    <CustomSelect
                      params={{
                        url: URLConstants.GET_EQUIPMENT_URL,
                      }}
                      onChange={(value) => {
                        setEquipmentId(value);
                      }}
                      entity={vehicleMoving.equipment}
                    />
                    <Form.Control.Feedback type="invalid">
                      Please provide a valid Incident Type Name.
                    </Form.Control.Feedback>
                  </Form.Group>
                </Col>
                <Col md={12}>
                  {/* Description Field */}
                  <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Description</Form.Label>
                    <Form.Control
                      as="textarea"
                      rows={2}
                      placeholder="Description"
                      onChange={onLongDescChangeHandler}
                      value={longdesc}
                    />
                  </Form.Group>
                </Col>
              </Row>
              <Button variant="contained" type="submit" color="primary">
                Submit
              </Button>
            </Form>
          )}
        </Grid>
      </Grid>
    </>
  );
};

export default EditVehicleMoving;
