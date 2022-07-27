import React, { useEffect, useState } from 'react';
import { NavLink, useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Button, Card, Col, Form, Row } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import URLConstants from '../../constants/URLConstants';
import { fetchGET, fetchPUT } from '../../utils/NetworkUtils';
import CustomSelect from '../../components/widgets/CustomSelect';
import EmployeeSelect from '../../components/widgets/EmployeeSelect';

const EditIncidentVehicle = () => {
  const [validated, setValidated] = useState(false);

  const history = useNavigate();

  const [incidentId, setIncidentId] = useState('');
  const [equipmentId, setEquipmentId] = useState('');
  const [employeeId, setEmployeeId] = useState('');
  const [incidentDescription, setIncidentDescription] = useState('');

  const dispatch = useDispatch();

  const [incidentVehicle, setIncidentVehicle] = useState(null);

  const { id } = useParams();
  const params = useParams();
  useEffect(() => {
    if (incidentVehicle != null) {
      setIncidentId(incidentVehicle.incident_id);
      setEquipmentId(incidentVehicle.equipment_id);
      setEmployeeId(incidentVehicle.employee_id);
      setIncidentDescription(incidentVehicle.incident_description);
    }
  }, [incidentVehicle]);

  useEffect(() => {
    console.log(`param is ${params.id}`);
    loadIncidentVehicle();
  }, []);

  const loadIncidentVehicle = async () => {
    try {
      const url = `${URLConstants.GET_INCIDENTS_VEHICLE_MOVING_URL}/${id}.json`;

      console.log('getIncidentVehicle url =', url);

      const response = await fetchGET(url);

      console.log('getIncidentVehicle -->', response.data);

      setIncidentVehicle(response.data);
    } catch (error) {
      toast(error.message || 'Failed');
    }
    // eslint-disable-next-line no-undef
    await dispatch(getIncidentVehicle(id));
  };

  const onIncidentVehicleSubmit = (event) => {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }
    setValidated(true);
    event.preventDefault();
    // @ts-ignore
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
      const url = `${URLConstants.GET_INCIDENTS_VEHICLE_MOVING_URL}/${id}.json`;

      await fetchPUT(url, data);

      history('../../private/incident-vehicles');
    } catch (error) {
      toast(error.message || 'Failed');
    }
  };

  const onIncidentDescriptionChangeHandler = (event) => {
    console.log(event.target.value);
    setIncidentDescription(event.target.value);
  };
  return (
    <Row>
      <Col>
        <Card>
          <Card.Header>
            Edit Incident Vehicle Details
            <NavLink to="/private/incident-vehicles">
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
          {incidentVehicle && (
            <Card.Body>
              <Form
                noValidate
                validated={validated}
                onSubmit={onIncidentVehicleSubmit}
              >
                <Row>
                  <Col md={6}>
                    {/* incident id */}
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                      <Form.Label>Incident *</Form.Label>
                      <CustomSelect
                        params={{
                          url: URLConstants.INCIDENTS_URL,
                        }}
                        onChange={(value) => {
                          setIncidentId(value);
                        }}
                        entity={incidentVehicle.incident}
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
                        entity={incidentVehicle.equipment}
                      />
                      <Form.Control.Feedback type="invalid">
                        Please provide a valid Incident Type Name.
                      </Form.Control.Feedback>
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    {/* employee id */}
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                      <Form.Label>Employee *</Form.Label>
                      <EmployeeSelect
                        onChange={(value) => {
                          setEmployeeId(value);
                        }}
                        entity={incidentVehicle.employee}
                      />
                    </Form.Group>
                  </Col>
                  {/* Long Desc */}
                  <Col md={6}>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                      <Form.Label>Incident Description</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="Long Desc"
                        onChange={onIncidentDescriptionChangeHandler}
                        value={incidentDescription}
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

export default EditIncidentVehicle;
