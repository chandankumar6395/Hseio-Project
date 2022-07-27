import React, { useEffect, useState } from 'react';
import { Link, NavLink, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Helmet } from 'react-helmet-async';
import { Grid, Typography, Button } from '@mui/material';
import { renderTitleAndContent } from '../../constants/CustomFunction';
import URLConstants from '../../constants/URLConstants';
import { fetchGET } from '../../utils/NetworkUtils';
import { CustomBreadcrumbs, CustomDivider } from '../../utils/MUIStyle';

const ViewEquipmentType = () => {
  const [incidentType, setIncidentType] = useState('');

  const { id } = useParams();

  useEffect(() => {
    // console.log('param is ' + params.id);
    console.log('useEffect ==> ViewIncident');
    loadIncidentTypes();
  }, []);

  const loadIncidentTypes = async () => {
    try {
      const url = `${URLConstants.GET_INCIDENT_TYPE_URL}/${id}.json`;

      console.log('getIncidentType url =', url);

      const response = await fetchGET(url);
      setIncidentType(response.data);
    } catch (error) {
      toast(error.message || 'Failed');
    }
  };

  return (
    <>
      <Helmet title="Edit Incident Type" />

      {incidentType && (
        <Grid justifyContent="space-between" container spacing={10}>
          <Grid item>
            <Typography variant="h3" gutterBottom display="inline">
              {incidentType.name}
            </Typography>

            <CustomBreadcrumbs aria-label="Breadcrumb" mt={2}>
              <Link component={NavLink} to="/">
                Dashboard
              </Link>
              <Link component={NavLink} to="/private/incident-types">
                Incident Type
              </Link>
              <Typography>{incidentType.name}</Typography>
            </CustomBreadcrumbs>
          </Grid>
          <Grid item>
            <div>
              <NavLink to="/private/incident-types">
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
            {/*  <h3 className="card-title"> */}
            {/*    <i className="fas fa-text-width" /> */}
            {/*    &nbsp; Task Details */}
            {/*  </h3> */}
            {/*  <NavLink to="/private/incident-types"> */}
            {/*    <Button */}
            {/*      className="btn-sm" */}
            {/*      variant="primary" */}
            {/*      type="button" */}
            {/*      style={{ float: 'right' }} */}
            {/*    > */}
            {/*      Back */}
            {/*    </Button> */}
            {/*  </NavLink> */}
            {/* </div> */}
            {incidentType && (
              <div className="card-body">
                <dl className="row">
                  {renderTitleAndContent(
                    'Name : ',
                    // eslint-disable-next-line camelcase
                    incidentType !== null ? incidentType.name : ''
                  )}
                  {renderTitleAndContent(
                    'Short Desc: ',
                    incidentType !== null ? incidentType.short_desc : ''
                  )}
                  {renderTitleAndContent(
                    'Long Desc: ',
                    incidentType !== null ? incidentType.long_desc : ''
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
export default ViewEquipmentType;
