import { GridActionsCellItem } from '@mui/x-data-grid-pro';
import EditIcon from '@mui/icons-material/Edit';
import { Link, NavLink } from 'react-router-dom';
import TVIcon from '@mui/icons-material/Tv';
import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { Helmet } from 'react-helmet-async';
import {
  Button,
  Grid,
  Typography,
  Divider as MuiDivider,
  Breadcrumbs as MuiBreadcrumbs,
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
  { field: 'year', headerName: 'Year', width: 90 },
  { field: 'month', headerName: 'Month', width: 90 },
  { field: 'hours_value', headerName: 'Hours Value', width: 90 },
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
const ManHoursList = () => {
  const [manHours, setManHours] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // console.log('inside useEffect search text box');

    const timer = setTimeout(async () => {
      fetchManHours();
    }, 400);

    return () => {
      clearTimeout(timer);
    };
  }, []);
  const fetchManHours = async () => {
    try {
      setLoading(true);
      const response = await fetchGET(
        `${URLConstants.GET_MAN_HOURS_URL}?limit=100&page=1`
      );

      setManHours(response.data);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      toast(error.message || 'Failed');
    }
  };
  return (
    <>
      <Helmet title="Invoices" />

      <Grid justifyContent="space-between" container spacing={10}>
        <Grid item>
          <Typography variant="h3" gutterBottom display="inline">
            Man Hours
          </Typography>

          <Breadcrumbs aria-label="Breadcrumb" mt={2}>
            <Link component={NavLink} to="/">
              Dashboard
            </Link>
            <Typography>Man Hours</Typography>
          </Breadcrumbs>
        </Grid>
        <Grid item>
          <div>
            <NavLink to="/private/man-hours/add">
              <Button variant="contained" color="primary">
                <AddIcon />
                Add Man Hours
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
            rows={manHours}
            loading={loading}
          />
        </Grid>
      </Grid>
    </>
  );
};
export default ManHoursList;
