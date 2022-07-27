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
import { useSelector } from 'react-redux';
import { KEY_COMPANY_ID, YES_NO_DATA } from '../../constants/Constants';
import { fetchGET } from '../../utils/NetworkUtils';
import URLConstants from '../../constants/URLConstants';
import CustomDataTable from '../../components/CustomDataTable';

const Divider = styled(MuiDivider)(spacing);

const Breadcrumbs = styled(MuiBreadcrumbs)(spacing);

const COLUMNS = [
  {
    field: 'incident',
    headerName: 'Incident',
    width: 150,

    renderCell: (params) => {
      const { incident } = params.row;
      return <span>{incident ? incident.name : ''}</span>;
    },
  },
  {
    field: 'employee',
    headerName: 'Employee',
    width: 150,

    renderCell: (params) => {
      const { employee } = params.row;
      return <span>{employee ? employee.user.first_name : ''}</span>;
    },
  },
  {
    field: 'injury_class',
    headerName: 'Injury Class',
    width: 150,

    renderCell: (params) => {
      // eslint-disable-next-line camelcase
      const { injury_class } = params.row;
      // eslint-disable-next-line camelcase
      return <span>{injury_class ? injury_class.name : ''}</span>;
    },
  },
  {
    field: 'osha_recordable',
    headerName: 'Osha Recordable',
    width: 90,
    renderCell: (params) => {
      // eslint-disable-next-line camelcase
      const { osha_recordable } = params.row;
      return (
        // eslint-disable-next-line camelcase
        <span>{YES_NO_DATA.find((x) => x.id === osha_recordable).name}</span>
      );
    },
  },
  {
    field: 'fatility',
    headerName: 'Fatility',
    width: 90,
    renderCell: (params) => {
      // eslint-disable-next-line camelcase
      const { fatility } = params.row;
      return (
        // eslint-disable-next-line camelcase
        <span>{YES_NO_DATA.find((x) => x.id === fatility).name}</span>
      );
    },
  },
  {
    field: 'lost_time',
    headerName: 'Lost Time',
    width: 90,
    renderCell: (params) => {
      // eslint-disable-next-line camelcase
      const { lost_time } = params.row;
      return (
        // eslint-disable-next-line camelcase
        <span>{YES_NO_DATA.find((x) => x.id === lost_time).name}</span>
      );
    },
  },
  {
    field: 'lost_time_total_days',
    headerName: 'Lost Time Total Days',
    width: 90,
  },
  {
    field: 'restricted_duty',
    headerName: 'Restricted Duty',
    width: 90,
    renderCell: (params) => {
      // eslint-disable-next-line camelcase
      const { restricted_duty } = params.row;
      return (
        // eslint-disable-next-line camelcase
        <span>{YES_NO_DATA.find((x) => x.id === restricted_duty).name}</span>
      );
    },
  },
  {
    field: 'restricted_duty_total_days',
    headerName: 'Restricted Duty Total Days',
    width: 90,
  },
  {
    field: 'other_recordable',
    headerName: 'Other Recordable',
    width: 90,
    renderCell: (params) => {
      // eslint-disable-next-line camelcase
      const { other_recordable } = params.row;
      return (
        // eslint-disable-next-line camelcase
        <span>{YES_NO_DATA.find((x) => x.id === other_recordable).name}</span>
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
const IncidentInjuriesList = () => {
  const localCompanyId = localStorage.getItem(KEY_COMPANY_ID);
  const localDivisionId = useSelector((state) => state.auth.selectedDivision);
  const localJobSiteId = useSelector((state) => state.auth.selectedJobSite);

  console.log('NewIncidentInjuries localCompanyId', localCompanyId);
  console.log('NewIncidentInjuries localDivisionId', localDivisionId);
  console.log('NewIncidentInjuries localJobSiteId', localJobSiteId);
  const [incidentInjuries, setIncidentInjuries] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // console.log('inside useEffect search text box');

    fetchIncidentInjuries();
  }, [localCompanyId, localJobSiteId, localDivisionId]);
  const fetchIncidentInjuries = async () => {
    try {
      setLoading(true);
      let url = `${URLConstants.INCIDENTS_INJURIES_URL}?limit=100&page=1`;

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

      setIncidentInjuries(response.data);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      toast(error.message || 'Failed');
    }
  };
  return (
    <>
      <Helmet title="Incident Injuries" />

      <Grid justifyContent="space-between" container spacing={10}>
        <Grid item>
          <Typography variant="h3" gutterBottom display="inline">
            Incident Injuries
          </Typography>

          <Breadcrumbs aria-label="Breadcrumb" mt={2}>
            <Link component={NavLink} to="/">
              Dashboard
            </Link>
            <Typography>Incident Injuries</Typography>
          </Breadcrumbs>
        </Grid>
        <Grid item>
          <div>
            <NavLink to="/private/incident-injuries/add">
              <Button variant="contained" color="primary">
                <AddIcon />
                Add Incident Injuries
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
            rows={incidentInjuries}
            loading={loading}
          />
        </Grid>
      </Grid>
    </>
  );
};
export default IncidentInjuriesList;
