import React, { useEffect, useState } from 'react';
import { Link, NavLink, useParams } from 'react-router-dom';
// import {  } from 'react-bootstrap';
import { toast } from 'react-toastify';
import { Helmet } from 'react-helmet-async';
import { Grid, Typography, Button } from '@mui/material';
import { renderTitleAndContent } from '../../constants/CustomFunction';
import URLConstants from '../../constants/URLConstants';
import { fetchGET } from '../../utils/NetworkUtils';
import { toMMMDDYYHHMM } from '../../utils/Utils';
import { CustomBreadcrumbs, CustomDivider } from '../../utils/MUIStyle';

const ViewInspection = () => {
  const [inspection, setInspection] = useState(null);

  // const history = useNavigate();

  const { id } = useParams();

  useEffect(() => {
    // console.log('param is ' + params.id);
    console.log('useEffect ==> ViewInspection');
    loadInspections();
  }, []);

  const loadInspections = async () => {
    try {
      const url = `${URLConstants.GET_INSPECTION_URL}/${id}.json`;

      console.log('getInspection url =', url);

      const response = await fetchGET(url);
      setInspection(response.data);
    } catch (error) {
      toast(error.message || 'Failed');
    }
  };

  return (
    <>
      <Helmet title="View Inspection" />

      {inspection && (
        <Grid justifyContent="space-between" container spacing={10}>
          <Grid item>
            <Typography variant="h3" gutterBottom display="inline">
              {inspection.name}
            </Typography>

            <CustomBreadcrumbs aria-label="Breadcrumb" mt={2}>
              <Link component={NavLink} to="/">
                Dashboard
              </Link>
              <Link component={NavLink} to="/private/inspections">
                Inspection
              </Link>
              <Typography>{inspection.name}</Typography>
            </CustomBreadcrumbs>
          </Grid>
          <Grid item>
            <div>
              <NavLink to="/private/inspections">
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
            {/*    &nbsp; Inspections Details */}
            {/*  </h3> */}
            {/*  <> */}
            {/*    <Button */}
            {/*      className="btn-sm" */}
            {/*      variant="primary" */}
            {/*      type="button" */}
            {/*      style={{ */}
            {/*        float: 'right', */}
            {/*      }} */}
            {/*      onClick={() => { */}
            {/*        history(-1); */}
            {/*      }} */}
            {/*    > */}
            {/*      Back */}
            {/*    </Button> */}
            {/*  </> */}
            {/* </div> */}
            {inspection && (
              <div className="card-body">
                <dl className="row">
                  {renderTitleAndContent(
                    'Name : ',
                    inspection !== null ? inspection.name : ''
                  )}
                  {renderTitleAndContent(
                    'Short Desc : ',
                    inspection !== null ? inspection.short_desc : ''
                  )}
                  {renderTitleAndContent(
                    'Long Desc : ',
                    inspection !== null ? inspection.long_desc : ''
                  )}
                  {renderTitleAndContent(
                    'Latitude: ',
                    inspection !== null ? inspection.latitude : ''
                  )}
                  {renderTitleAndContent(
                    'Longitude: ',
                    inspection !== null ? inspection.longitude : ''
                  )}
                  {renderTitleAndContent(
                    'Inspection Date Time : ',
                    inspection !== null
                      ? toMMMDDYYHHMM(inspection.inspection_date_time)
                      : ''
                  )}
                  {renderTitleAndContent(
                    'Company Name : ',
                    inspection.company !== null ? inspection.company.name : ''
                  )}
                  {renderTitleAndContent(
                    'Division Name : ',
                    inspection.division !== null ? inspection.division.name : ''
                  )}
                  {renderTitleAndContent(
                    'Project Name : ',
                    inspection.job_site !== null ? inspection.job_site.name : ''
                  )}
                  {renderTitleAndContent(
                    'Equipment Name : ',
                    inspection.equipment !== null
                      ? inspection.equipment.name
                      : ''
                  )}
                  {renderTitleAndContent(
                    'Miles Hours : ',
                    inspection !== null ? inspection.miles_hours : ''
                  )}
                  {/* {renderTitleAndContent( */}
                  {/*  'Inspector Name : ', */}
                  {/*  inspection.inspector !== null */}
                  {/*    ? inspection.inspector.name */}
                  {/*    : '' */}
                  {/* )} */}
                  {renderTitleAndContent(
                    'Notes : ',
                    inspection !== null ? inspection.notes : ''
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
export default ViewInspection;
