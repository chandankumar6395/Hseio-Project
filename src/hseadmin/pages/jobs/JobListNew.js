import React, { useEffect, useState } from 'react';

import { Link, NavLink } from 'react-router-dom';
import { GridActionsCellItem } from '@mui/x-data-grid-pro';
import EditIcon from '@mui/icons-material/Edit';
import TVIcon from '@mui/icons-material/Tv';

import { Helmet } from 'react-helmet-async';
import {
  Breadcrumbs as MuiBreadcrumbs,
  Button,
  Divider as MuiDivider,
  Grid,
  Typography,
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { toast } from 'react-toastify';
import styled from '@emotion/styled';
import { spacing } from '@mui/system';
import { useSelector } from 'react-redux';
import CustomDataTable from '../../components/CustomDataTable';
import { fetchGET } from '../../utils/NetworkUtils';
import URLConstants from '../../constants/URLConstants';
import { KEY_COMPANY_ID } from '../../constants/Constants';

const Divider = styled(MuiDivider)(spacing);

const Breadcrumbs = styled(MuiBreadcrumbs)(spacing);

const COLUMNS = [
  { field: 'id', headerName: 'ID', width: 90 },
  { field: 'name', headerName: 'Name', width: 90 },

  {
    field: 'short_desc',
    headerName: 'Short Desc',
    width: 100,
    hide: true,
  },

  {
    field: 'long_desc',
    headerName: 'Desc',
    width: 100,
    hide: true,
  },

  {
    field: 'company',
    headerName: 'Company Name',
    width: 200,
    valueFormatter: (params) => {
      return params.value ? params.value.name : '';
    },

    renderCell: (params) => {
      const { company } = params.row;
      return <span>{company ? company.name : ''}</span>;
    },
    hide: true,
  },

  {
    field: 'division',
    headerName: 'Division Name',
    width: 200,
    valueFormatter: (params) => {
      return params.value ? params.value.name : '';
    },

    renderCell: (params) => {
      const { division } = params.row;
      return <span>{division ? division.name : ''}</span>;
    },
    hide: true,
  },

  {
    field: 'job_site',
    headerName: 'Project Name',
    width: 200,
    valueFormatter: (params) => {
      return params.value ? params.value.name : '';
    },

    renderCell: (params) => {
      // eslint-disable-next-line camelcase
      const { job_site } = params.row;
      // eslint-disable-next-line camelcase
      return <span>{job_site ? job_site.name : ''}</span>;
    },
    hide: true,
  },

  {
    field: 'medical_facility_contact',
    headerName: 'Medical Facility Contact',
    width: 100,
  },

  {
    field: 'muster_point_alarm',
    headerName: 'Muster Point Alarm',
    width: 100,
  },

  {
    field: 'latitude',
    headerName: 'Latitude',
    width: 100,
  },

  {
    field: 'longitude',
    headerName: 'Longitude',
    width: 90,
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

const JobListNew = () => {
  const localCompanyId = localStorage.getItem(KEY_COMPANY_ID);
  const localDivisionId = useSelector((state) => state.auth.selectedDivision);
  const localJobSiteId = useSelector((state) => state.auth.selectedJobSite);

  console.log('NewEquipmentMUI localCompanyId', localCompanyId);
  console.log('NewEquipmentMUI localDivisionId', localDivisionId);
  console.log('NewEquipmentMUI localJobSiteId', localJobSiteId);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // console.log('inside useEffect search text box');

    const timer = setTimeout(async () => {}, 400);

    return () => {
      clearTimeout(timer);
    };
  }, []);

  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    fetchJobs();
  }, [localCompanyId, localJobSiteId, localDivisionId]);

  const fetchJobs = async () => {
    try {
      setLoading(true);
      let url = `${URLConstants.JOBS_URL}?limit=100&page=1`;

      if (localCompanyId !== null) {
        url = `${url}&company_id=${localCompanyId}`;
      }
      if (localDivisionId !== -1) {
        url = `${url}&division_id=${localDivisionId}`;
      }
      if (localJobSiteId !== -1) {
        url = `${url}&job_site_id=${localJobSiteId}`;
      }

      console.log('url == ', url);
      const response = await fetchGET(url);

      setJobs(response.data);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      toast(error.message || 'Failed');
    }
  };

  return (
    <>
      <Helmet title="Jobs" />

      <Grid justifyContent="space-between" container spacing={10}>
        <Grid item>
          <Typography variant="h3" gutterBottom display="inline">
            Jobs
          </Typography>

          <Breadcrumbs aria-label="Breadcrumb" mt={2}>
            <Link component={NavLink} to="/private/dashboard">
              Dashboard
            </Link>
            <Typography>Jobs</Typography>
          </Breadcrumbs>
        </Grid>
        <Grid item>
          <div>
            <NavLink to="/private/jobs/add">
              <Button variant="contained" color="primary">
                <AddIcon />
                Add Job
              </Button>
            </NavLink>
          </div>
        </Grid>
      </Grid>

      <Divider my={6} />
      <Grid container spacing={6}>
        <Grid item xs={12}>
          <CustomDataTable columns={COLUMNS} rows={jobs} loading={loading} />
        </Grid>
      </Grid>
    </>
  );
};

export default JobListNew;
