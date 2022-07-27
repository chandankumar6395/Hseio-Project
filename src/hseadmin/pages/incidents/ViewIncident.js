import React, { useEffect, useState } from 'react';
import { Link, NavLink, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Helmet } from 'react-helmet-async';
import { Button, Grid, Typography } from '@mui/material';
import { Table } from 'react-bootstrap';
import { renderTitleAndContent } from '../../constants/CustomFunction';
import URLConstants from '../../constants/URLConstants';
import { fetchGET } from '../../utils/NetworkUtils';
// import { YES_NO_DATA } from '../../constants/Constants';
import { toMMDDYYYYHHMMDisplay } from '../../utils/Utils';
import { CustomBreadcrumbs, CustomDivider } from '../../utils/MUIStyle';
import {
  INCIDENT_TYPE_INJURY_ILLNESS,
  INCIDENT_TYPE_PROPERTY_DAMAGE,
  INCIDENT_TYPE_PROPERTY_DAMAGE_VEHICLE_NON_MOVING,
  INCIDENT_TYPE_VEHICLE_MOVING,
  INCIDENT_TYPE_VEHICLE_MOVING_INJURY_ILLNESS,
} from '../../constants/Constants';
// import {
//   INCIDENT_TYPE_INJURY_ILLNESS,
//   INCIDENT_TYPE_VEHICLE_MOVING,
//   INCIDENT_TYPE_VEHICLE_MOVING_INJURY_ILLNESS,
// } from '../../constants/Constants';

const ViewIncident = () => {
  const [incident, setIncident] = useState(null);
  const [incidentInjuries, setIncidentInjuries] = useState(null);
  const [incidentVehicles, setIncidentVehicles] = useState(null);

  // const history = useNavigate();

  const { id } = useParams();

  useEffect(() => {
    // console.log('param is ' + params.id);
    console.log('useEffect ==> ViewIncident');
    loadIncident();
    fetchIncidentInjuries();
    fetchVehicleMoving();
  }, []);

  const loadIncident = async () => {
    try {
      const url = `${URLConstants.GET_INCIDENT_URL}/${id}.json`;

      console.log('getIncident url =', url);

      const response = await fetchGET(url);
      console.log('Incident ID', response.data.id);
      setIncident(response.data);
    } catch (error) {
      toast(error.message || 'Failed');
    }
  };

  const fetchIncidentInjuries = async () => {
    try {
      console.log('GetID', id);
      let url = `${URLConstants.GET_INCIDENTS_INJURIES_URL}.json?limit=100&page=1`;
      if (id !== -1 && id !== undefined) {
        url = `${url}&incident_id=${id}`;
      }
      console.log('Illness', url);
      const response = await fetchGET(url);
      console.log('Injury', response.data);
      setIncidentInjuries(response.data);
    } catch (error) {
      toast(`${error.message}fail1` || 'Failed');
    }
  };

  const fetchVehicleMoving = async () => {
    try {
      let url = `${URLConstants.INCIDENTS_VEHICLE_MOVING_URL}?limit=100&page=1`;
      if (id !== -1 && id !== undefined) {
        url = `${url}&incident_id=${id}`;
      }
      const response = await fetchGET(url);
      console.log('Vehicle', response.data);
      setIncidentVehicles(response.data);
    } catch (error) {
      toast(`${error.message}fail2` || 'Failed');
    }
  };
  return (
    <>
      <Helmet title="View Users" />

      {incident && (
        <>
          <Grid justifyContent="space-between" container spacing={10}>
            <Grid item>
              <Typography variant="h3" gutterBottom display="inline">
                {incident.name}
              </Typography>

              <CustomBreadcrumbs aria-label="Breadcrumb" mt={2}>
                <Link component={NavLink} to="/">
                  Dashboard
                </Link>
                <Link component={NavLink} to="/private/incidents">
                  Incident
                </Link>
                <Typography>{incident.name}</Typography>
              </CustomBreadcrumbs>
            </Grid>
            <Grid item>
              <div>
                <NavLink to="/private/incidents">
                  <Button variant="contained" color="primary">
                    Back
                  </Button>
                </NavLink>
              </div>
            </Grid>
          </Grid>
          <CustomDivider my={6} />
          <div className="row">
            <div className="col-md-12">
              <div className="card">
                <div className="card-body">
                  <dl className="row">
                    {renderTitleAndContent('Name : ', incident.name)}
                    {renderTitleAndContent(
                      'Supervisor : ',
                      incident.supervisor &&
                        `${incident.supervisor.user.first_name} ${incident.supervisor.user.last_name}`
                    )}
                    {renderTitleAndContent('Location : ', incident.location)}
                    {renderTitleAndContent(
                      'Incident Date/Time: : ',
                      incident &&
                        toMMDDYYYYHHMMDisplay(incident.incident_date_time)
                    )}
                    {renderTitleAndContent(
                      'Client : ',
                      incident.client && incident.client.name
                    )}
                    {renderTitleAndContent(
                      'Incident Type : ',
                      incident.incident_type !== null
                        ? incident.incident_type.name
                        : ''
                    )}
                    {renderTitleAndContent(
                      'Company : ',
                      incident.company && incident.company.name
                    )}
                    {renderTitleAndContent(
                      'Division : ',
                      incident.division && incident.division.name
                    )}
                    {renderTitleAndContent(
                      'Project : ',
                      incident.job_site && incident.job_site.name
                    )}
                  </dl>
                </div>

                <strong className="commentbox">Photos: </strong>
                <div className="photoselbox">
                  {incident &&
                    incident.photos?.map((photo) => {
                      return (
                        <span
                          data-fancybox
                          data-src={photo.url}
                          style={{ cusor: 'pointer' }}
                          key={photo.id}
                        >
                          <img
                            style={{
                              alignItems: 'center',
                              backgroundColor: 'white',
                            }}
                            src={photo.url !== null ? photo.url : ''}
                            alt=""
                          />
                        </span>
                      );
                    })}
                </div>
                {(incident.incident_type_id === INCIDENT_TYPE_INJURY_ILLNESS ||
                  incident.incident_type_id ===
                    INCIDENT_TYPE_VEHICLE_MOVING_INJURY_ILLNESS) && (
                  <>
                    <strong className="commentbox">Incident Injuries: </strong>

                    <div className="table-responsive">
                      <Table striped bordered hover>
                        <thead>
                          <tr>
                            <th>Employee</th>
                            <th>Injuries Class</th>
                            <th>Osha Recordable</th>
                            <th>Fatility</th>
                            <th>Lost Time</th>
                            <th>Total Days</th>
                            <th> Restricted Duty</th>
                            <th>Body Parts</th>
                          </tr>
                        </thead>
                        <tbody>
                          {incidentInjuries &&
                            incidentInjuries.map((incidentInjurie) => {
                              return (
                                <>
                                  <tr>
                                    <td>
                                      {incidentInjurie.employee.user.first_name}{' '}
                                      {incidentInjurie.employee.user.last_name}
                                    </td>
                                    <td>{incidentInjurie.injury_class.name}</td>
                                    <td>
                                      {incidentInjurie.osha_recordable === 1
                                        ? 'YES'
                                        : 'NO'}
                                    </td>
                                    <td>
                                      {incidentInjurie.facility === 1
                                        ? 'YES'
                                        : 'NO'}
                                    </td>
                                    <td>
                                      {incidentInjurie.lost_time === 1
                                        ? 'YES'
                                        : 'No'}
                                    </td>
                                    <td>
                                      {incidentInjurie.lost_time_total_days}
                                    </td>
                                    <td>
                                      {incidentInjurie.restricted_duty === 1
                                        ? 'YES'
                                        : 'NO'}
                                    </td>
                                    <td>
                                      {incidentInjurie.body_parts.map(
                                        (bodyPart) => {
                                          return (
                                            <>
                                              <span>{bodyPart.name}</span>
                                              {', '}
                                            </>
                                          );
                                        }
                                      )}
                                    </td>
                                  </tr>
                                  {/* <tr> */}
                                  {/*  <td>Body Parts</td> */}
                                  {/*  <td colSpan="6"> */}
                                  {/*    {incidentInjuries.body_parts && */}
                                  {/*      incidentInjuries.body_parts.map( */}
                                  {/*        (bodyPart) => { */}
                                  {/*          return ( */}
                                  {/*            <> */}
                                  {/*              <span>{bodyPart.name}</span> */}
                                  {/*            </> */}
                                  {/*          ); */}
                                  {/*        } */}
                                  {/*      )} */}
                                  {/*  </td> */}
                                  {/* </tr> */}
                                </>
                              );
                            })}
                        </tbody>
                      </Table>
                    </div>
                  </>
                )}

                {(incident.incident_type_id === INCIDENT_TYPE_VEHICLE_MOVING ||
                  incident.incident_type_id === INCIDENT_TYPE_PROPERTY_DAMAGE ||
                  incident.incident_type_id ===
                    INCIDENT_TYPE_PROPERTY_DAMAGE_VEHICLE_NON_MOVING ||
                  incident.incident_type_id ===
                    INCIDENT_TYPE_VEHICLE_MOVING_INJURY_ILLNESS) && (
                  <>
                    <strong className="commentbox">Incident Vehicles: </strong>

                    <div className="table-responsive">
                      <Table striped bordered hover>
                        <thead>
                          <tr>
                            <th>Employee</th>
                            <th>Equipment</th>
                            <th>Description</th>
                            {/* <th>Created</th> */}
                            {/* <th>Modified</th> */}
                          </tr>
                        </thead>
                        <tbody>
                          {incidentVehicles &&
                            incidentVehicles.map((incidentVehicle) => {
                              return (
                                <>
                                  <tr>
                                    <td>
                                      {incidentVehicle.employee &&
                                        `${incidentVehicle.employee.user.first_name} ${incidentVehicle.employee.user.last_name}`}
                                    </td>
                                    <td>{incidentVehicle.equipment.name}</td>
                                    <td>
                                      {incidentVehicle.incident_description}
                                    </td>
                                    {/* <td>{incidentVehicle.created}</td> */}
                                    {/* <td>{incidentVehicle.modified}</td> */}
                                  </tr>
                                </>
                              );
                            })}
                        </tbody>
                      </Table>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default ViewIncident;
