import React from 'react';

import { Link, NavLink } from 'react-router-dom';

import { Helmet } from 'react-helmet-async';
import {
  Breadcrumbs as MuiBreadcrumbs,
  Button,
  Divider as MuiDivider,
  Grid,
  Typography,
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';

import styled from '@emotion/styled';
import { spacing } from '@mui/system';

import JobItemsTable from './JobItemsTable';

const Divider = styled(MuiDivider)(spacing);

const Breadcrumbs = styled(MuiBreadcrumbs)(spacing);

const JobItemList = () => {
  return (
    <>
      <Helmet title="Job Items" />

      <Grid justifyContent="space-between" container spacing={10}>
        <Grid item>
          <Typography variant="h3" gutterBottom display="inline">
            Job Items
          </Typography>

          <Breadcrumbs aria-label="Breadcrumb" mt={2}>
            <Link component={NavLink} to="/private/dashboard">
              Dashboard
            </Link>
            <Typography>Job Items</Typography>
          </Breadcrumbs>
        </Grid>
        <Grid item>
          <div>
            <NavLink to="/private/job-items/add">
              <Button variant="contained" color="primary">
                <AddIcon />
                Add Job Item
              </Button>
            </NavLink>
          </div>
        </Grid>
      </Grid>

      <Divider my={6} />
      <JobItemsTable />
    </>
  );
};

export default JobItemList;
