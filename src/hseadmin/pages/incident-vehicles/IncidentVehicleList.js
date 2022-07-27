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
    field: 'equipment',
    headerName: 'Equipment',
    width: 150,

    renderCell: (params) => {
      const { equipment } = params.row;
      return <span>{equipment && equipment.name}</span>;
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
    field: 'incident_description',
    headerName: 'Incident Description',
    width: 200,
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
const IncidentVehicleListNew = () => {
  const [incidentVehicle, setIncidentVehicle] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // console.log('inside useEffect search text box');

    const timer = setTimeout(async () => {
      fetchIncidentVehicles();
    }, 400);

    return () => {
      clearTimeout(timer);
    };
  }, []);
  const fetchIncidentVehicles = async () => {
    try {
      setLoading(true);
      const response = await fetchGET(
        `${URLConstants.INCIDENTS_VEHICLE_MOVING_URL}?limit=100&page=1`
      );

      setIncidentVehicle(response.data);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      toast(error.message || 'Failed');
    }
  };
  return (
    <>
      <Helmet title="Incident Vehicles" />

      <Grid justifyContent="space-between" container spacing={10}>
        <Grid item>
          <Typography variant="h3" gutterBottom display="inline">
            Incident Vehicle
          </Typography>

          <Breadcrumbs aria-label="Breadcrumb" mt={2}>
            <Link component={NavLink} to="/">
              Dashboard
            </Link>
            <Typography>Incident Vehicle</Typography>
          </Breadcrumbs>
        </Grid>
        <Grid item>
          <div>
            <NavLink to="/private/incident-vehicles/add">
              <Button variant="contained" color="primary">
                <AddIcon />
                Add Incident Vwhicle
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
            rows={incidentVehicle}
            loading={loading}
          />
        </Grid>
      </Grid>
    </>
  );
};
export default IncidentVehicleListNew;
