import React, { useState, useEffect } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { Button, Grid, Typography } from '@mui/material';
import { Col, Form, Row } from 'react-bootstrap';
import { CustomBreadcrumbs, CustomDivider } from '../../utils/MUIStyle';
import { fetchPOST } from '../../utils/NetworkUtils';
import URLConstants from '../../constants/URLConstants';
import CustomSelect from '../../components/widgets/CustomSelect';
import EmployeeSelect from '../../components/widgets/EmployeeSelect';

const NewIncidentVehicle = () => {
  const [validated, setValidated] = useState(false);
  const history = useNavigate();

  const [incidentId, setIncidentId] = useState('');
  const [equipmentId, setEquipmentId] = useState('');
  const [employeeId, setEmployeeId] = useState('');
  const [incidentDescription, setIncidentDescription] = useState('');

  useEffect(() => {}, []);

  const onIncidentVehicleSubmit = (event) => {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }
    setValidated(true);
    event.preventDefault();

    const postData = {
      incident_id: incidentId,
      employee_id: employeeId,
      equipment_id: equipmentId,
      incident_description: incidentDescription,
    };
    postIncidentVehicle(postData);
  };

  const postIncidentVehicle = async (data) => {
    try {
      await fetchPOST(URLConstants.INCIDENTS_VEHICLE_MOVING_URL, data);
      history('../../private/incident-vehicles');
    } catch (error) {
      console.log(error);
    }
  };

  const onIncidentDescriptionChangeHandler = (event) => {
    console.log(event.target.value);
    setIncidentDescription(event.target.value);
  };
  return (
    <>
      <Helmet title="Add Incident Vehicle" />

      <Grid justifyContent="space-between" container spacing={10}>
        <Grid item>
          <Typography variant="h3" gutterBottom display="inline">
            Incident Vehicle
          </Typography>

          <CustomBreadcrumbs aria-label="Breadcrumb" mt={2}>
            <Link component={NavLink} to="/">
              Dashboard
            </Link>
            <Link component={NavLink} to="/private/incident-vehicles">
              Incident vehicles
            </Link>
            <Typography>Add Incident Vehicles</Typography>
          </CustomBreadcrumbs>
        </Grid>
        <Grid item>
          <div>
            <NavLink to="/private/incident-vehicles">
              <Button variant="contained" color="primary">
                Back
              </Button>
            </NavLink>
          </div>
        </Grid>
      </Grid>

      <CustomDivider my={6} />
      <Grid container spacing={6}>
        <Grid item xs={12}>
          <Form
            noValidate
            validated={validated}
            onSubmit={onIncidentVehicleSubmit}
          >
            <Row>
              <Col md={6}>
                {/* Incident Id */}
                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Form.Label>Incident *</Form.Label>
                  <CustomSelect
                    params={{
                      url: URLConstants.INCIDENTS_URL,
                    }}
                    onChange={(value) => {
                      setIncidentId(value);
                    }}
                  />
                </Form.Group>
                <Form.Control.Feedback type="invalid">
                  Please provide a valid Name.
                </Form.Control.Feedback>
              </Col>
              <Col md={6}>
                {/* employee id */}
                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Form.Label>Employee *</Form.Label>
                  <EmployeeSelect
                    onChange={(value) => {
                      setEmployeeId(value);
                    }}
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
                  />
                  <Form.Control.Feedback type="invalid">
                    Please provide a valid Incident Type Name.
                  </Form.Control.Feedback>
                </Form.Group>
              </Col>
              <Col md={6}>
                {/* Incident Description Field */}
                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Form.Label>Incident Description</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={2}
                    placeholder="Long Desc"
                    onChange={onIncidentDescriptionChangeHandler}
                  />
                </Form.Group>
              </Col>
            </Row>
            <Button variant="contained" type="submit" color="primary">
              Submit
            </Button>
          </Form>
        </Grid>
      </Grid>
    </>
  );
};
export default NewIncidentVehicle;
