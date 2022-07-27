import { GridActionsCellItem } from '@mui/x-data-grid-pro';
import EditIcon from '@mui/icons-material/Edit';
import { Link, NavLink } from 'react-router-dom';
import TVIcon from '@mui/icons-material/Tv';
import React, { useEffect, useState } from 'react';
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
import { useSelector } from 'react-redux';
import styled from '@emotion/styled';
import { spacing } from '@mui/system';
import { toMMDDYYYY } from '../../utils/Utils';
import { fetchGET } from '../../utils/NetworkUtils';
import URLConstants from '../../constants/URLConstants';
import CustomDataTable from '../../components/CustomDataTable';
import { KEY_COMPANY_ID } from '../../constants/Constants';

const Divider = styled(MuiDivider)(spacing);

const Breadcrumbs = styled(MuiBreadcrumbs)(spacing);

const COLUMNS = [
  { field: 'id', headerName: 'ID', width: 90 },
  { field: 'name', headerName: 'Name', width: 90 },
  { field: 'short_desc', headerName: 'Short Desc', width: 90 },
  { field: 'long_desc', headerName: 'Long Desc', width: 90 },
  { field: 'latitude', headerName: 'Latitude', width: 90 },
  { field: 'longitude', headerName: 'Longitude', width: 90 },
  {
    field: 'inspection_date_time',
    headerName: 'Inspection Date Time',
    width: 90,
    renderCell: (params) => {
      const { inspection_date_time: inspectionDateTime } = params.row;
      return (
        <span>
          {' '}
          {`${inspectionDateTime ? toMMDDYYYY(inspectionDateTime) : ''}`}
        </span>
      );
    },
  },

  {
    field: 'company',
    headerName: 'Company',
    width: 150,
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
    width: 150,
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
    width: 150,
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
    field: 'equipment',
    headerName: 'Equipment',
    width: 150,
    valueFormatter: (params) => {
      return params.value ? params.value.name : '';
    },
    renderCell: (params) => {
      const { equipment } = params.row;

      return <span>{equipment ? equipment.name : ''}</span>;
    },
  },
  {
    field: 'miles_hours',
    headerName: 'Miles Hours',
    width: 90,
    hideable: true,
  },
  {
    field: 'inspector',
    headerName: 'Inspector',
    width: 150,
    valueFormatter: (params) => {
      return params.value
        ? params.value.user.first_name + params.value.user.last_name
        : '';
    },
    renderCell: (params) => {
      const { inspector } = params.row;
      return (
        <span>
          {inspector
            ? `${inspector.user.first_name} ${inspector.user.last_name}`
            : ''}
        </span>
      );
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
const InspectionList = () => {
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

  const [inspection, setInspection] = useState([]);

  useEffect(() => {
    fetchInspections();
  }, [localCompanyId, localJobSiteId, localDivisionId]);

  const fetchInspections = async () => {
    try {
      setLoading(true);
      let url = `${URLConstants.INSPECTIONS_URL}?limit=100&page=1`;

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

      setInspection(response.data);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      toast(error.message || 'Failed');
    }
  };

  return (
    <>
      <Helmet title="Inspections" />

      <Grid justifyContent="space-between" container spacing={10}>
        <Grid item>
          <Typography variant="h3" gutterBottom display="inline">
            Inspection
          </Typography>

          <Breadcrumbs aria-label="Breadcrumb" mt={2}>
            <Link component={NavLink} to="/private/dashboard">
              Dashboard
            </Link>
            <Typography>Inspection</Typography>
          </Breadcrumbs>
        </Grid>
        <Grid item>
          <div>
            <NavLink to="/private/inspections/add">
              <Button variant="contained" color="primary">
                <AddIcon />
                Add Inspection
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
            rows={inspection}
            loading={loading}
          />
        </Grid>
      </Grid>
    </>
  );
};

export default InspectionList;
