// eslint-disable-next-line no-unused-vars
import React, { useEffect } from 'react';
import { Link, NavLink, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Helmet } from 'react-helmet-async';
import { Button, Grid, Typography } from '@mui/material';
import { renderTitleAndContent } from '../../constants/CustomFunction';
import { getTrainingEvent } from '../../store/actions/trainingEvents';
import { YES_NO_DATA } from '../../constants/Constants';
import { toMMMDDYYHHMM } from '../../utils/Utils';
import { CustomBreadcrumbs, CustomDivider } from '../../utils/MUIStyle';

const ViewTrainingEvent = () => {
  const dispatch = useDispatch();
  // const history = useNavigate();

  const trainingEvent = useSelector(
    (state) => state.trainingEvent.trainingEvent
  );

  const { id } = useParams();

  useEffect(() => {
    // console.log('param is ' + params.id);
    loadTrainingEvent();
  }, []);

  const loadTrainingEvent = async () => {
    await dispatch(getTrainingEvent(id));
  };

  return (
    <>
      <Helmet title="Edit Training Event" />

      {trainingEvent && (
        <Grid justifyContent="space-between" container spacing={10}>
          <Grid item>
            <Typography variant="h3" gutterBottom display="inline">
              {trainingEvent.name}
            </Typography>

            <CustomBreadcrumbs aria-label="Breadcrumb" mt={2}>
              <Link component={NavLink} to="/">
                Dashboard
              </Link>
              <Link component={NavLink} to="/private/training-events">
                Training Event
              </Link>
              <Typography>{trainingEvent.name}</Typography>
            </CustomBreadcrumbs>
          </Grid>
          <Grid item>
            <div>
              <NavLink to="/private/training-events">
                <Button variant="contained" color="primary">
                  Back
                </Button>
              </NavLink>
            </div>
          </Grid>
        </Grid>
      )}

      <CustomDivider my={6} />
      <div className="row">
        <div className="col-md-12">
          <div className="card">
            {/* <div className="card-header"> */}
            {/* <h3 className="card-title"> */}
            {/*  <i className="fas fa-text-width" /> */}
            {/*  &nbsp; Training Event Details */}
            {/* </h3> */}
            {/* <NavLink to="/private/training-events"> */}
            {/*  <Button */}
            {/*    className="btn-sm" */}
            {/*    variant="primary" */}
            {/*    type="button" */}
            {/*    style={{ float: 'right' }} */}
            {/*    onClick={() => { */}
            {/*      history(-1); */}
            {/*    }} */}
            {/*  > */}
            {/*    Back */}
            {/*  </Button> */}
            {/* </NavLink> */}
            {/* </div> */}

            <div className="card-body">
              {trainingEvent !== null && (
                <dl className="row">
                  {renderTitleAndContent(
                    'Name: ',
                    // eslint-disable-next-line camelcase
                    trainingEvent !== null ? trainingEvent.name : ''
                  )}
                  {renderTitleAndContent(
                    'Short Desc: ',
                    // eslint-disable-next-line camelcase
                    trainingEvent !== null ? trainingEvent.short_desc : ''
                  )}
                  {renderTitleAndContent(
                    'Long Desc: ',
                    // eslint-disable-next-line camelcase
                    trainingEvent !== null ? trainingEvent.long_desc : ''
                  )}
                  {renderTitleAndContent(
                    'Proposed Start Date: ',
                    // eslint-disable-next-line camelcase
                    trainingEvent !== null
                      ? toMMMDDYYHHMM(trainingEvent.proposed_start_date)
                      : ''
                  )}
                  {renderTitleAndContent(
                    'Proposed End Date: ',
                    // eslint-disable-next-line camelcase
                    trainingEvent !== null
                      ? toMMMDDYYHHMM(trainingEvent.proposed_end_date)
                      : ''
                  )}
                  {renderTitleAndContent(
                    'Actual Start Date: ',
                    // eslint-disable-next-line camelcase
                    trainingEvent !== null
                      ? toMMMDDYYHHMM(trainingEvent.actual_start_date)
                      : ''
                  )}
                  {renderTitleAndContent(
                    'Actual End Date: ',
                    // eslint-disable-next-line camelcase
                    trainingEvent !== null
                      ? toMMMDDYYHHMM(trainingEvent.actual_end_date)
                      : ''
                  )}
                  {renderTitleAndContent(
                    'Expire Date: ',
                    // eslint-disable-next-line camelcase
                    trainingEvent !== null
                      ? toMMMDDYYHHMM(trainingEvent.expire_date)
                      : ''
                  )}
                  {renderTitleAndContent(
                    'Self: ',
                    // eslint-disable-next-line camelcase
                    YES_NO_DATA.find((x) => x.id === trainingEvent.self).name
                  )}
                  {renderTitleAndContent(
                    'Training Event Status: ',
                    // eslint-disable-next-line camelcase
                    trainingEvent !== null
                      ? trainingEvent.training_event_status.name
                      : ''
                  )}
                </dl>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ViewTrainingEvent;
