import React, { useEffect } from 'react';
import { Link, NavLink, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { Helmet } from 'react-helmet-async';
import { Button, Grid, Typography } from '@mui/material';
// import CustomTopSection from '../../components/CustomTopSection';

import CustomCompanyProfile from '../../components/CustomCompanyProfile';
import DashboardCompany from './DashboardCompany';
import { getCompany } from '../../store/actions/companies';
import { CustomBreadcrumbs, CustomDivider } from '../../utils/MUIStyle';

const ViewCompany = () => {
  const dispatch = useDispatch();

  const company = useSelector((state) => state.company.company);

  const { id } = useParams();

  useEffect(() => {
    // console.log('param is ' + params.id);
    console.log('useEffect ==> ViewCompany');
    loadCompany();
  }, []);

  const loadCompany = async () => {
    await dispatch(getCompany(id));
  };

  return (
    <>
      <Helmet title="View Company" />

      {company && (
        <Grid justifyContent="space-between" container spacing={10}>
          <Grid item>
            <Typography variant="h3" gutterBottom display="inline">
              {company.name}
            </Typography>

            <CustomBreadcrumbs aria-label="Breadcrumb" mt={2}>
              <Link component={NavLink} to="/">
                Dashboard
              </Link>
              <Link component={NavLink} to="/private/companies">
                Company
              </Link>
              <Typography>{company.name}</Typography>
            </CustomBreadcrumbs>
          </Grid>
          <Grid item>
            <div>
              <NavLink to="/private/companies">
                <Button variant="contained" color="primary">
                  Back
                </Button>
              </NavLink>
            </div>
          </Grid>
        </Grid>
      )}
      <CustomDivider my={6} />
      {company !== undefined && company !== null && (
        <div>
          {/* <CustomTopSection title={company.name} link="/private/companies" /> */}
          <DashboardCompany companyId={company.id} />
          <CustomCompanyProfile item={company} />
        </div>
      )}
    </>
  );
};

export default ViewCompany;
