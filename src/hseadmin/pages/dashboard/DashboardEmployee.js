import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Helmet } from 'react-helmet-async';
import { Grid, Link, Typography } from '@mui/material';
import { NavLink } from 'react-router-dom';
import { loadDashboardData } from '../../store/actions/dashboad';
import SmallBox from '../../components/SmallBox';
import { CustomBreadcrumbs, CustomDivider } from '../../utils/MUIStyle';

const DashboardEmployee = () => {
  const dispatch = useDispatch();
  const dashboard = useSelector((state) => {
    return state.dashboardReducer.dashboard;
  });
  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    await dispatch(loadDashboardData());
  };
  return (
    <>
      <Helmet title="Dashboard" />

      <Grid justifyContent="space-between" container spacing={10}>
        <Grid item>
          <Typography variant="h3" gutterBottom display="inline">
            Employee Dashboard
          </Typography>

          <CustomBreadcrumbs aria-label="Breadcrumb" mt={2}>
            <Link component={NavLink} to="/private/dashboard">
              Dashboard
            </Link>
          </CustomBreadcrumbs>
        </Grid>
      </Grid>

      <CustomDivider my={6} />
      <Grid container spacing={6}>
        <Grid item xs={12}>
          <div className="row" style={{ marginTop: '10px' }}>
            <div className="col-lg-3 col-6">
              <SmallBox
                type="warning"
                icon="ion-stats-bars"
                count={dashboard !== null ? dashboard.certificate_count : 0}
                title="Certificates"
                navigateTo="/private/certificates"
                showlink="off"
              />
            </div>
          </div>
        </Grid>
      </Grid>
    </>
  );
};

export default DashboardEmployee;
