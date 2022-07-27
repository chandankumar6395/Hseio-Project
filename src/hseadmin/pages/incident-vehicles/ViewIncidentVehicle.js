import React, { useEffect, useState } from 'react';
import { NavLink, useParams } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import { toast } from 'react-toastify';
import { renderTitleAndContent } from '../../constants/CustomFunction';
import URLConstants from '../../constants/URLConstants';
import { fetchGET } from '../../utils/NetworkUtils';

const ViewIncidentVehicle = () => {
  const [incidentVehicle, setIncidentVehicle] = useState('');

  const { id } = useParams();

  useEffect(() => {
    // console.log('param is ' + params.id);
    console.log('useEffect ==> ViewIncidentVehicle');
    loadIncidentVehicles();
  }, []);

  const loadIncidentVehicles = async () => {
    try {
      const url = `${URLConstants.GET_INCIDENTS_VEHICLE_MOVING_URL}/${id}.json`;

      console.log('getIncidentVehicle url =', url);

      const response = await fetchGET(url);
      setIncidentVehicle(response.data);
    } catch (error) {
      toast(error.message || 'Failed');
    }
  };

  return (
    <>
      <div className="row">
        <div className="col-md-12">
          <div className="card">
            <div className="card-header">
              <h3 className="card-title">
                <i className="fas fa-text-width" />
                &nbsp; Incident Vehicles Details
              </h3>
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
            </div>
            {incidentVehicle && (
              <div className="card-body">
                <dl className="row">
                  {renderTitleAndContent(
                    'Incident : ',
                    incidentVehicle.incident !== null
                      ? incidentVehicle.incident.name
                      : ''
                  )}
                  {renderTitleAndContent(
                    'Equipment : ',
                    incidentVehicle.equipment !== null
                      ? incidentVehicle.equipment.name
                      : ''
                  )}
                  {renderTitleAndContent(
                    'Employee Name : ',
                    incidentVehicle.employee !== null
                      ? `${incidentVehicle.employee.user.first_name} ${incidentVehicle.employee.user.last_name}`
                      : ''
                  )}
                  {renderTitleAndContent(
                    'Incident Description: ',
                    incidentVehicle !== null
                      ? incidentVehicle.incident_description
                      : ''
                  )}
                </dl>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};
export default ViewIncidentVehicle;
