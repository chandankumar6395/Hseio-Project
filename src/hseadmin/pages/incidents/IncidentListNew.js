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
import { KEY_COMPANY_ID } from '../../constants/Constants';
import CustomDataTable from '../../components/CustomDataTable';
import { fetchGET } from '../../utils/NetworkUtils';
import URLConstants from '../../constants/URLConstants';
import { toMMDDYYYYHHMMDisplay } from '../../utils/Utils';

const Divider = styled(MuiDivider)(spacing);

const Breadcrumbs = styled(MuiBreadcrumbs)(spacing);

const COLUMNS = [
  { field: 'id', headerName: 'ID', width: 90, hide: true },
  { field: 'name', headerName: 'Name', width: 90 },
  {
    field: 'supervisor',
    headerName: 'Supervisor',
    width: 200,
    valueFormatter: (params) => {
      return params.value
        ? params.value.user.first_name + params.value.user.last_name
        : '';
    },

    renderCell: (params) => {
      const { supervisor } = params.row;
      return (
        <span>
          {supervisor
            ? `${supervisor.user.first_name} ${supervisor.user.last_name}`
            : ''}
        </span>
      );
    },
  },
  {
    field: 'incident_date_time',
    headerName: 'Incident Date/Time:',
    width: 90,
    hide: true,
    renderCell: (params) => {
      const { incident_date_time: incidentDateTime } = params.row;
      return (
        <span>
          {' '}
          {`${incidentDateTime ? toMMDDYYYYHHMMDisplay(incidentDateTime) : ''}`}
        </span>
      );
    },
  },

  {
    field: 'client',
    headerName: 'Client',
    width: 200,
    valueFormatter: (params) => {
      return params.value ? params.value.name : '';
    },
    renderCell: (params) => {
      const { client } = params.row;
      return <span>{client ? client.name : ''}</span>;
    },
  },

  {
    field: 'incident_type',
    headerName: 'Incident Type',
    width: 200,
    valueFormatter: (params) => {
      return params.value ? params.value.name : '';
    },
    renderCell: (params) => {
      // eslint-disable-next-line camelcase
      const { incident_type } = params.row;
      // eslint-disable-next-line camelcase
      return <span>{incident_type ? incident_type.name : ''}</span>;
    },
  },

  {
    field: 'company',
    headerName: 'Company Name',
    width: 200,
    hide: true,
    valueFormatter: (params) => {
      return params.value ? params.value.name : '';
    },
    renderCell: (params) => {
      const { company } = params.row;
      return <span>{company ? company.name : ''}</span>;
    },
  },

  {
    field: 'division',
    headerName: 'Division',
    width: 200,
    valueFormatter: (params) => {
      return params.value ? params.value.name : '';
    },
    renderCell: (params) => {
      const { division } = params.row;
      return <span>{division ? division.name : ''}</span>;
    },
  },

  {
    field: 'job_site',
    headerName: 'Project',
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

const IncidentListNew = () => {
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

  const [incidents, setIncidents] = useState([]);

  useEffect(() => {
    fetchIncidents();
  }, [localCompanyId, localJobSiteId, localDivisionId]);

  const fetchIncidents = async () => {
    try {
      setLoading(true);
      let url = `${URLConstants.INCIDENTS_URL}?limit=1000&page=1`;

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

      setIncidents(response.data);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      toast(error.message || 'Failed');
    }
  };

  return (
    <>
      <Helmet title="Incidents" />

      <Grid justifyContent="space-between" container spacing={10}>
        <Grid item>
          <Typography variant="h3" gutterBottom display="inline">
            Incidents
          </Typography>

          <Breadcrumbs aria-label="Breadcrumb" mt={2}>
            <Link component={NavLink} to="/private/dashboard">
              Dashboard
            </Link>
            <Typography>Incident</Typography>
          </Breadcrumbs>
        </Grid>
        <Grid item>
          <div>
            <NavLink to="/private/incidents/add">
              <Button variant="contained" color="primary">
                <AddIcon />
                Add Incident
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
            rows={incidents}
            loading={loading}
          />
        </Grid>
      </Grid>
    </>
  );
};

export default IncidentListNew;
