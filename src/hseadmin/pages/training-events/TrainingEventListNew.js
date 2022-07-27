import React, { useEffect, useState } from 'react';

import { NavLink } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { Grid, Typography, Button, Link } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { GridActionsCellItem } from '@mui/x-data-grid-pro';
import EditIcon from '@mui/icons-material/Edit';
import TVIcon from '@mui/icons-material/Tv';
import { toast } from 'react-toastify';
import { useSelector } from 'react-redux';
import { fetchGET } from '../../utils/NetworkUtils';
import URLConstants from '../../constants/URLConstants';
import CustomDataTable from '../../components/CustomDataTable';
import { toMMDDYYYY } from '../../utils/Utils';
import { KEY_COMPANY_ID, YES_NO_DATA } from '../../constants/Constants';
import { CustomBreadcrumbs, CustomDivider } from '../../utils/MUIStyle';

const COLUMNS = [
  { field: 'id', headerName: 'ID', width: 90, hide: true },
  { field: 'name', headerName: 'Name', width: 150 },
  {
    field: 'short_desc',
    headerName: 'Short Description',
    width: 90,
    hide: true,
  },
  {
    field: 'long_desc',
    headerName: 'Description',
    width: 90,
    hide: true,
  },
  {
    field: 'proposed_start_date',
    headerName: 'Proposed Start Date',
    width: 150,
    renderCell: (params) => {
      const { proposed_start_date: date } = params.row;
      return <span> {`${date ? toMMDDYYYY(date) : ''}`}</span>;
    },
  },
  {
    field: 'proposed_end_date',
    headerName: 'Proposed End Date',
    width: 150,
    renderCell: (params) => {
      const { proposed_end_date: date } = params.row;
      return <span> {`${date ? toMMDDYYYY(date) : ''}`}</span>;
    },
  },
  {
    field: 'actual_start_date',
    headerName: 'Actual Start Date',
    width: 150,
    hide: true,
    renderCell: (params) => {
      const { actual_start_date: date } = params.row;
      return <span> {`${date ? toMMDDYYYY(date) : ''}`}</span>;
    },
  },
  {
    field: 'actual_end_date',
    headerName: 'Actual End Date',
    width: 150,
    hide: true,
    renderCell: (params) => {
      const { actual_end_date: date } = params.row;
      return <span> {`${date ? toMMDDYYYY(date) : ''}`}</span>;
    },
  },
  {
    field: 'expire_date',
    headerName: 'Expire Date',
    width: 150,
    hide: true,
    renderCell: (params) => {
      const { expire_date: date } = params.row;
      return <span> {`${date ? toMMDDYYYY(date) : ''}`}</span>;
    },
  },
  {
    field: 'self',
    headerName: 'Self',
    width: 100,
    valueFormatter: (params) => {
      return params.value === 1 ? 'YES' : 'NO';
    },
    renderCell: (params) => {
      const { self } = params.row;
      return <span> {YES_NO_DATA.find((x) => x.id === self).name}</span>;
    },
  },
  {
    field: 'training_event_status',
    headerName: 'Status',
    width: 150,
    valueFormatter: (params) => {
      return params.value ? params.value.name : '';
    },
    renderCell: (params) => {
      return <span> {params.row.training_event_status.name}</span>;
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

const TrainingEventListNew = () => {
  const localCompanyId = localStorage.getItem(KEY_COMPANY_ID);
  const localDivisionId = useSelector((state) => state.auth.selectedDivision);
  const localJobSiteId = useSelector((state) => state.auth.selectedJobSite);

  console.log('NewIncidentMUI localCompanyId', localCompanyId);
  console.log('NewIncidentMUI localDivisionId', localDivisionId);
  console.log('NewIncidentMUI localJobSiteId', localJobSiteId);
  const [loading, setLoading] = useState(false);

  const [trainingEvents, setTrainingEvents] = useState([]);

  const fetchTrainingEvent = async () => {
    try {
      setLoading(true);
      let url = `${URLConstants.TRAINING_EVENTS_URL}?limit=100&page=1`;
      if (localCompanyId !== null) {
        url = `${url}&company_id=${localCompanyId}`;
      }

      if (localDivisionId !== -1) {
        url = `${url}&division_id=${localDivisionId}`;
      }

      if (localJobSiteId !== -1) {
        url = `${url}&job_site_id=${localJobSiteId}`;
      }

      const response = await fetchGET(url);

      setTrainingEvents(response.data);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      toast(error.message || 'Failed');
    }
  };

  useEffect(() => {
    fetchTrainingEvent();
  }, [localDivisionId, localJobSiteId]);

  return (
    <>
      <Helmet title="Training Events" />

      <Grid justifyContent="space-between" container spacing={10}>
        <Grid item>
          <Typography variant="h3" gutterBottom display="inline">
            Training Events
          </Typography>

          <CustomBreadcrumbs aria-label="Breadcrumb" mt={2}>
            <Link component={NavLink} to="/">
              Dashboard
            </Link>
            <Typography>Training Events</Typography>
          </CustomBreadcrumbs>
        </Grid>
        <Grid item>
          <div>
            <NavLink to="/private/training-events/add">
              <Button variant="contained" color="primary">
                <AddIcon />
                Add Training Event
              </Button>
            </NavLink>
          </div>
        </Grid>
      </Grid>

      <CustomDivider my={6} />
      <Grid container spacing={6}>
        <Grid item xs={12}>
          <CustomDataTable
            columns={COLUMNS}
            rows={trainingEvents}
            loading={loading}
          />
        </Grid>
      </Grid>
    </>
  );
};

export default TrainingEventListNew;
