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
  const [equipmentType, setEquipmentType] = useState('');

  const { id } = useParams();

  useEffect(() => {
    // console.log('param is ' + params.id);
    console.log('useEffect ==> ViewEquipment');
    loadEquipmentTypes();
  }, []);

  const loadEquipmentTypes = async () => {
    try {
      const url = `${URLConstants.GET_EQUIPMENT_TYPE_URL}/${id}.json`;

      console.log('getEquipmentType url =', url);

      const response = await fetchGET(url);
      setEquipmentType(response.data);
    } catch (error) {
      toast(error.message || 'Failed');
    }
  };

  return (
    <>
      <Helmet title="Edit Equipment Type" />

      {equipmentType && (
        <Grid justifyContent="space-between" container spacing={10}>
          <Grid item>
            <Typography variant="h3" gutterBottom display="inline">
              {equipmentType.name}
            </Typography>

            <CustomBreadcrumbs aria-label="Breadcrumb" mt={2}>
              <Link component={NavLink} to="/">
                Dashboard
              </Link>
              <Link component={NavLink} to="/private/equipment-types">
                Equipment Type
              </Link>
              <Typography>{equipmentType.name}</Typography>
            </CustomBreadcrumbs>
          </Grid>
          <Grid item>
            <div>
              <NavLink to="/private/equipment-types">
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
            {/*    &nbsp; Equipment Type Details */}
            {/*  </h3> */}
            {/*  <NavLink to="/private/equipment-types"> */}
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
            {equipmentType && (
              <div className="card-body">
                <dl className="row">
                  {renderTitleAndContent(
                    'Name : ',
                    // eslint-disable-next-line camelcase
                    equipmentType !== null ? equipmentType.name : ''
                  )}
                  {renderTitleAndContent(
                    'Short Desc: ',
                    equipmentType !== null ? equipmentType.short_desc : ''
                  )}
                  {renderTitleAndContent(
                    'Long Desc: ',
                    equipmentType !== null ? equipmentType.long_desc : ''
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
