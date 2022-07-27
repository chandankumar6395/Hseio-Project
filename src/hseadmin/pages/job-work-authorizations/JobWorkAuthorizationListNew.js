import { GridActionsCellItem } from '@mui/x-data-grid-pro';
import EditIcon from '@mui/icons-material/Edit';
import { Link, NavLink } from 'react-router-dom';
import TVIcon from '@mui/icons-material/Tv';
import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
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
import { fetchGET } from '../../utils/NetworkUtils';
import URLConstants from '../../constants/URLConstants';
import CustomDataTable from '../../components/CustomDataTable';

const Divider = styled(MuiDivider)(spacing);

const Breadcrumbs = styled(MuiBreadcrumbs)(spacing);

const COLUMNS = [
  { field: 'id', headerName: 'ID', width: 90 },
  { field: 'name', headerName: 'Name', width: 90 },
  {
    field: 'signature',
    headerName: 'Signature',
    renderCell: (params) => {
      console.log('params', params);
      return (
        <div
          style={{ display: 'flex', justifyContent: 'center', width: '100%' }}
        >
          <img
            style={{
              width: '50px',
              height: 'auto',
              alignItems: 'center',
              backgroundColor: 'lightgrey',
            }}
            src={params.row.signature ? params.row.signature.url : ''}
            alt=""
          />
        </div>
      );
    },
  },

  {
    field: 'job',
    headerName: 'job',
    width: 150,

    renderCell: (params) => {
      const { job } = params.row;
      return <span>{job ? job.name : ''}</span>;
    },
  },

  {
    field: 'employee',
    headerName: 'Employee',
    width: 90,
    renderCell: (params) => {
      const { employee } = params.row;
      return (
        <span>
          {employee
            ? `${employee.user.first_name} ${employee.user.first_name}`
            : ''}
        </span>
      );
    },
  },
  {
    field: 'company',
    headerName: 'Company',
    width: 150,

    renderCell: (params) => {
      const { company } = params.row;
      return <span>{company ? company.name : ''}</span>;
    },
  },
  {
    field: 'division',
    headerName: 'Division',
    width: 150,

    renderCell: (params) => {
      const { division } = params.row;
      return <span>{division ? division.name : ''}</span>;
    },
  },
  {
    field: 'job_site',
    headerName: 'Project',
    width: 150,

    renderCell: (params) => {
      // eslint-disable-next-line camelcase
      const { job_site } = params.row;
      // eslint-disable-next-line camelcase
      return <span>{job_site ? job_site.name : ''}</span>;
    },
  },
  {
    field: 'actions',
    type: 'actions',
    headerName: 'Actions',
    width: 100,
    getActions: (params) => [
      <GridActionsCellItem
        icon={<EditIcon />}
        component={NavLink}
        to={`edit/${params.row.id}`}
        label="Edit"
      />,
      <GridActionsCellItem
        component={NavLink}
        to={`view/${params.row.id}`}
        icon={<TVIcon />}
        label="View"
      />,
    ],
  },
];
const JobWorkAuthorization = () => {
  const [jobWorkAuthorization, setJobWorkAuthorization] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // console.log('inside useEffect search text box');

    const timer = setTimeout(async () => {
      fetchJobWorkAuthorizations();
    }, 400);

    return () => {
      clearTimeout(timer);
    };
  }, []);
  const fetchJobWorkAuthorizations = async () => {
    try {
      setLoading(true);
      const response = await fetchGET(
        `${URLConstants.JOB_WORK_AUTHORIZATIONS_URL}?limit=100&page=1`
      );

      setJobWorkAuthorization(response.data);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      toast(error.message || 'Failed');
    }
  };
  return (
    <>
      <Helmet title="Job Work Authorizations" />

      <Grid justifyContent="space-between" container spacing={10}>
        <Grid item>
          <Typography variant="h3" gutterBottom display="inline">
            Job Work Authorizations
          </Typography>

          <Breadcrumbs aria-label="Breadcrumb" mt={2}>
            <Link component={NavLink} to="/">
              Dashboard
            </Link>
            <Link component={NavLink} to="/">
              Pages
            </Link>
            <Typography>Job Work Authorizations</Typography>
          </Breadcrumbs>
        </Grid>
        <Grid item>
          <div>
            <NavLink to="/private/job-work-authorizations/add">
              <Button variant="contained" color="primary">
                <AddIcon />
                Add Job Work Authorizations
              </Button>
            </NavLink>
          </div>
        </Grid>
      </Grid>

      <Divider my={6} />
      <Grid container spacing={6}>
        <Grid item xs={12}>
          <CustomDataTable
            columns={COLUMNS}
            rows={jobWorkAuthorization}
            loading={loading}
          />
        </Grid>
      </Grid>
    </>
  );
};
export default JobWorkAuthorization;
