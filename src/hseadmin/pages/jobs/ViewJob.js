import React, { useEffect, useState } from 'react';
import './ViewJob.css';
import { NavLink, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Button, Grid } from '@mui/material';
import URLConstants from '../../constants/URLConstants';
import { fetchGET } from '../../utils/NetworkUtils';
import { toMMDDYYYY, toMMDDYYYYHHMMDisplay } from '../../utils/Utils';

const ViewJob = () => {
  const params = useParams();
  const { id } = params;

  const [job, setJob] = useState(null);

  useEffect(() => {
    fetchJob();
  }, []);

  const fetchJob = async () => {
    try {
      const url = `${URLConstants.GET_JOB_URL}/${id}.json`;
      const response = await fetchGET(url);
      // console.log(response.data);
      setJob(response.data);
    } catch (error) {
      toast(error.message || 'Failed');
    }
  };

  return (
    // eslint-disable-next-line react/style-prop-object
    <div>
      <Grid item>
        <div>
          <NavLink to="/private/jobs">
            <Button
              variant="contained"
              color="primary"
              style={{ float: 'right' }}
            >
              Back
            </Button>
          </NavLink>
        </div>
      </Grid>
      <h3>Job Briefing</h3>
      {job && (
        <>
          <div>
            <table>
              {/* <thead> */}
              <tr>
                <th colSpan={2} style={{ backgroundColor: '#d6d5d2' }}>
                  Part 1 &ensp; Job Description
                </th>
              </tr>
              {/* </thead> */}
              {/* <tbody> */}
              <tr>
                <th>Job Date:</th>
                <td>{job.jsa_date ? toMMDDYYYY(job.jsa_date) : ''}</td>
                {/* <th>Location:</th> */}
                {/* <td /> */}
              </tr>
              <tr>
                <th>Location:</th>
                <td>
                  {' '}
                  Latitude: {job.latitude}, Longitude: {job.longitude}
                </td>
              </tr>
              <tr>
                <th>Job Description:</th>
                <td>{job.long_desc ? job.long_desc : ''}</td>
              </tr>
              <tr>
                <th>Medical Facility/Contact:</th>
                <td>{job.medical_facility_contact}</td>
              </tr>
              <tr>
                <th>Muster Point/Alarm:</th>
                <td>{job.muster_point_alarm}</td>
              </tr>
              <tr>
                <th>Associated Documentation:</th>
                <td />
              </tr>
              {/* </tbody> */}
            </table>
          </div>
          <br />
          <br />
          <div>
            <table>
              <tr style={{ textAlign: 'center' }}>
                <th colSpan={4}>
                  <strong>
                    <u>PPE assessment (List all required PPE)</u>
                  </strong>{' '}
                </th>

                {/* <th style={{ textAlign: 'center' }}> */}
                {/* */}
                {/* </th> */}
              </tr>
              {job.job_equipments.map((item) => {
                return (
                  <tr key={item.id}>
                    <td colSpan={1}>{item.equipment.name}</td>
                  </tr>
                );
              })}
            </table>
          </div>
          <br />
          <br />
          <div>
            <table>
              <tr style={{ textAlign: 'center' }}>
                <th>
                  <strong>
                    <u>Job Stages</u>
                  </strong>{' '}
                  <br />
                  <span>
                    <i>Break job down into specific steps</i>
                  </span>
                </th>
                <th>
                  <strong>
                    <u>Hazard / Consequence</u>
                  </strong>{' '}
                  <br />
                  <span>
                    <i>
                      Use 7 <b>Hazard Sources</b> to identify hazards
                    </i>
                  </span>
                </th>
                <th>
                  <strong>
                    <u>Controls</u>
                  </strong>{' '}
                  <br />
                  <span>
                    <i>
                      Use <b>Hierarchy of Controls</b> to determine specific
                      controls to protect against the hazard
                    </i>
                  </span>
                </th>
              </tr>
              {job.job_items.map((item) => {
                return (
                  <tr key={item.id}>
                    <td>{item.job_stages}</td>
                    <td>{item.hazard_consequence}</td>
                    <td>{item.controls}</td>
                  </tr>
                );
              })}
            </table>
          </div>
          <br />
          <br />
          <div>
            <table>
              <tr>
                <th colSpan={3} style={{ backgroundColor: '#d6d5d2' }}>
                  Part 3 &ensp; Work Authorization
                </th>
              </tr>
              <tr>
                <td
                  colSpan={3}
                  style={{ textAlign: 'center', backgroundColor: '#fcfcfa' }}
                >
                  <i>
                    By signing below, I confirm that the job has been reviewed
                    with the work team using the 7 Hazard Sources. The Controls
                    protect against the hazards such that residual risk is
                    acceptable. Each Work Team member is clear on their
                    responsibilities.
                  </i>
                </td>
              </tr>
              <tr>
                <th>Work/crew leader (print)</th>
                <th>Signature</th>
                <th>Date</th>
              </tr>
              {job.job_work_authorizations.map((item) => {
                return (
                  <>
                    {item.team === 'leader' && (
                      <tr key={item.id}>
                        <td>{item.name}</td>
                        <td>
                          <div
                            style={{
                              display: 'flex',
                              justifyContent: 'center',
                              width: '100%',
                            }}
                          >
                            <img
                              style={{
                                width: '200px',
                                height: 'auto',
                                alignItems: 'center',
                                backgroundColor: 'white',
                              }}
                              src={
                                item.signature !== null
                                  ? item.signature.url
                                  : ''
                              }
                              alt=""
                            />
                          </div>
                        </td>
                        <td>{toMMDDYYYYHHMMDisplay(item.signature_date)}</td>
                      </tr>
                    )}
                  </>
                );
              })}
              <tr>
                <td />
                <td />
                <td />
              </tr>
              <tr>
                <th colSpan={3} style={{ backgroundColor: '#d6d5d2' }}>
                  Work Execution Team{' '}
                  <span>
                    (Sign if all of your questions have been answered and you
                    are ready to proceed.)
                  </span>
                </th>
              </tr>
            </table>
          </div>
          <br />
          <br />
          <div>
            <table>
              <tr>
                <th>NAME/COMPANY</th>
                <th>SIGNATURE</th>
              </tr>
              {job.job_work_authorizations.map((item) => {
                return (
                  <>
                    {item.team === 'worker' && (
                      <tr key={item.id}>
                        <td>{item.name}</td>
                        <td>
                          <div
                            style={{
                              display: 'flex',
                              justifyContent: 'center',
                              width: '100%',
                            }}
                          >
                            <img
                              style={{
                                width: '200px',
                                height: 'auto',
                                alignItems: 'center',
                                backgroundColor: 'white',
                              }}
                              src={
                                item.signature !== null
                                  ? item.signature.url
                                  : ''
                              }
                              alt=""
                            />
                          </div>
                        </td>
                      </tr>
                    )}
                  </>
                );
              })}
            </table>
          </div>
        </>
      )}
    </div>
  );
};
export default ViewJob;
