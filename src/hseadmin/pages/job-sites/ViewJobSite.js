import React, { useEffect, useState } from 'react';
import { Link, NavLink, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Card, Col, Collapse, Row } from 'react-bootstrap';
import { Helmet } from 'react-helmet-async';
import { Grid, Typography, Button } from '@mui/material';
import { renderTitleAndContent } from '../../constants/CustomFunction';
import DashboardJobSite from './DashboardJobSite';
import { getJobSite } from '../../store/actions/jobSites';
import { CustomBreadcrumbs, CustomDivider } from '../../utils/MUIStyle';
// import {loadJobSites} from "../../store/actions/jobSites";

const ViewJobSite = () => {
  const dispatch = useDispatch();
  // const history = useNavigate();

  const jobSite = useSelector((state) => state.jobSite.jobSite);

  const { id } = useParams();

  const [showJobsite, setShowJobsite] = useState(true);

  useEffect(() => {
    // console.log('param is ' + params.id);
    loadJobSite();
  }, []);

  const loadJobSite = async () => {
    await dispatch(getJobSite(id));
  };

  return (
    <>
      <Helmet title="View Project" />

      {jobSite && (
        <Grid justifyContent="space-between" container spacing={10}>
          <Grid item>
            <Typography variant="h3" gutterBottom display="inline">
              {jobSite.name}
            </Typography>

            <CustomBreadcrumbs aria-label="Breadcrumb" mt={2}>
              <Link component={NavLink} to="/">
                Dashboard
              </Link>
              <Link component={NavLink} to="/private/job-sites">
                Project
              </Link>
              <Typography>{jobSite.name}</Typography>
            </CustomBreadcrumbs>
          </Grid>
          <Grid item>
            <div>
              <NavLink to="/private/job-sites">
                <Button variant="contained" color="primary">
                  Back
                </Button>
              </NavLink>
            </div>
          </Grid>
        </Grid>
      )}
      <CustomDivider my={6} />
      {/* <Row> */}
      {/*  /!* <Col md={12}> *!/ */}
      {/*  /!*  <h3 className="card-title"> *!/ */}
      {/*  /!*    <i className="fas fa-text-width" /> *!/ */}
      {/*  /!*    Project - {jobSite !== null && jobSite.name} *!/ */}
      {/*  /!*  </h3> *!/ */}
      {/*  /!*  <Button *!/ */}
      {/*  /!*    className="btn-sm" *!/ */}
      {/*  /!*    variant="primary" *!/ */}
      {/*  /!*    type="button" *!/ */}
      {/*  /!*    style={{ float: 'right' }} *!/ */}
      {/*  /!*    onClick={() => { *!/ */}
      {/*  /!*      history(-1); *!/ */}
      {/*  /!*    }} *!/ */}
      {/*  /!*  > *!/ */}
      {/*  /!*    Back *!/ */}
      {/*  /!*  </Button> *!/ */}
      {/*  /!* </Col> *!/ */}
      <Col>{jobSite && <DashboardJobSite />}</Col>
      {/* </Row> */}
      <br />
      {jobSite && (
        <Row>
          <Col md={12}>
            <Card>
              <Card.Header>
                <h3 className="card-title">
                  <i className="fas fa-text-width" />
                  Project - {jobSite.name}
                </h3>
                <>
                  <Button
                    className="btn-sm"
                    onClick={() => setShowJobsite(!showJobsite)}
                    aria-controls="company-more-details"
                    aria-expanded={showJobsite}
                    style={{ float: 'right' }}
                  >
                    {showJobsite ? 'Hide Details' : 'More Details'}
                  </Button>{' '}
                </>
              </Card.Header>
              <Card.Body
                style={{
                  padding: showJobsite ? '0rem' : '0rem',
                  minHeight: 0,
                }}
              >
                <Collapse in={showJobsite}>
                  <div id="company-more-details">
                    <dl className="row" style={{ padding: '1.25rem' }}>
                      {renderTitleAndContent('Name: ', jobSite.name)}
                      {renderTitleAndContent(
                        'Short Desc: ',
                        jobSite.short_desc
                      )}
                      {renderTitleAndContent(
                        'Description: ',
                        jobSite.long_desc
                      )}
                      {renderTitleAndContent(
                        'Address 1 : ',
                        jobSite.address !== null ? jobSite.address.address1 : ''
                      )}
                      {/* {renderTitleAndContent( */}
                      {/*  'Address 2 : ', */}
                      {/*  jobSite !== null ? jobSite.address.address2 : '' */}
                      {/* )} */}
                      {/* {renderTitleAndContent( */}
                      {/*  'Address 3 : ', */}
                      {/*  jobSite !== null ? jobSite.address.address3 : '' */}
                      {/* )} */}
                      {renderTitleAndContent(
                        'City : ',
                        jobSite.address.city !== null
                          ? jobSite.address.city.name
                          : ''
                      )}
                      {renderTitleAndContent(
                        'State : ',
                        jobSite.address.state !== null
                          ? jobSite.address.state.name
                          : ''
                      )}
                      {renderTitleAndContent(
                        'Country: ',
                        jobSite.address !== null
                          ? jobSite.address.country.name
                          : ''
                      )}
                      {renderTitleAndContent(
                        'Client: ',
                        jobSite.client !== null ? jobSite.client.name : ''
                      )}
                      {renderTitleAndContent(
                        'Managers: ',
                        jobSite.managers.map((manager) => {
                          return (
                            <>
                              <span>
                                {manager.first_name} {manager.last_name}
                              </span>
                              ,{' '}
                            </>
                          );
                        })
                      )}
                      {/* {renderTitleAndContent('Latitude: ', jobSite.latitude)} */}
                      {/* {renderTitleAndContent('Longitude: ', jobSite.longitude)} */}
                    </dl>
                  </div>
                </Collapse>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      )}
    </>
  );
};

export default ViewJobSite;
