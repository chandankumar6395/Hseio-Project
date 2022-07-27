import React from 'react';

import { Link, NavLink } from 'react-router-dom';

import { Helmet } from 'react-helmet-async';
import { Button, Grid, Typography } from '@mui/material';
import { CustomBreadcrumbs, CustomDivider } from '../../utils/MUIStyle';

import NewJobItemForm from './NewJobItemForm';

const NewJobItem = () => {
  return (
    <>
      <Helmet title="Add Job Item" />

      <Grid justifyContent="space-between" container spacing={10}>
        <Grid item>
          <Typography variant="h3" gutterBottom display="inline">
            Job Item
          </Typography>

          <CustomBreadcrumbs aria-label="Breadcrumb" mt={2}>
            <Link component={NavLink} to="/private/dashboard">
              Dashboard
            </Link>
            <Link component={NavLink} to="/private/job-items">
              Job Items
            </Link>
            <Typography>Add Job Item</Typography>
          </CustomBreadcrumbs>
        </Grid>
        <Grid item>
          <div>
            <NavLink to="/private/job-items">
              <Button variant="contained" color="primary">
                Back
              </Button>
            </NavLink>
          </div>
        </Grid>
      </Grid>

      <CustomDivider my={6} />
      <Grid container spacing={6}>
        <Grid item xs={12}>
          <NewJobItemForm />
        </Grid>
      </Grid>
    </>
  );
};

export default NewJobItem;
