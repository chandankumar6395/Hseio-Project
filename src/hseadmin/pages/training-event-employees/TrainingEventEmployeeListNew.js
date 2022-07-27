import React, { useEffect, useState } from 'react';

import { NavLink } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { Grid, Typography, Button, Link } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { GridActionsCellItem } from '@mui/x-data-grid-pro';
import EditIcon from '@mui/icons-material/Edit';
import TVIcon from '@mui/icons-material/Tv';
import { toast } from 'react-toastify';
import { fetchGET } from '../../utils/NetworkUtils';
import URLConstants from '../../constants/URLConstants';
import CustomDataTable from '../../components/CustomDataTable';
import { toMMDDYYYY } from '../../utils/Utils';
import { CustomBreadcrumbs, CustomDivider } from '../../utils/MUIStyle';

const COLUMNS = [
  { field: 'id', headerName: 'ID', width: 90 },
  {
    field: 'training_event',
    headerName: 'Training Event',
    width: 90,
    renderCell: (params) => {
      return <span> {params.row.training_event.name}</span>;
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
          {employee && `${employee.user.first_name} ${employee.user.last_name}`}
        </span>
      );
    },
  },
  // {
  //   field: 'user',
  //   headerName: 'User Name',
  //   width: 90,
  //   renderCell: (params) => {
  //     return <span> {params.row.user.username}</span>;
  //   },
  // },
  {
    field: 'primary_photo',
    headerName: 'Primary Photo',
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
            src={params.row.primary_photo ? params.row.primary_photo.url : ''}
            alt=""
          />
        </div>
      );
    },
  },
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
    field: 'training_course',
    headerName: 'Training Course',
    width: 90,
    renderCell: (params) => {
      // eslint-disable-next-line camelcase
      const { training_course } = params.row;
      // eslint-disable-next-line camelcase
      return <span>{training_course && training_course.name}</span>;
    },
  },
  {
    field: 'certificate',
    headerName: 'Certificate',
    width: 90,
    renderCell: (params) => {
      const { certificate } = params.row;
      return <span>{certificate ? certificate.name : ''}</span>;
    },
  },
  {
    field: 'training_event_employee_status',
    headerName: 'Training Event Employee Status',
    width: 150,

    renderCell: (params) => {
      return <span> {params.row.training_event_employee_status.name}</span>;
    },
  },
  {
    field: 'completion_date',
    headerName: 'Completion Date',
    width: 90,
    renderCell: (params) => {
      // eslint-disable-next-line camelcase
      const { completion_date } = params.row;
      // eslint-disable-next-line camelcase
      return (
        // eslint-disable-next-line camelcase
        <span> {`${completion_date ? toMMDDYYYY(completion_date) : ''}`}</span>
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

const TrainingEventEmployeeListNew = () => {
  const [loading, setLoading] = useState(false);

  const [trainingEventEmployee, setTrainingEventEmployee] = useState([]);

  const fetchTrainingEventEmployee = async () => {
    try {
      setLoading(true);
      const response = await fetchGET(
        `${URLConstants.TRAINING_EVENT_EMPLOYEES_URL}?limit=100&page=1`
      );

      setTrainingEventEmployee(response.data);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      toast(error.message || 'Failed');
    }
  };

  useEffect(() => {
    fetchTrainingEventEmployee();
  }, []);

  return (
    <>
      <Helmet title="Training Event Employees" />

      <Grid justifyContent="space-between" container spacing={10}>
        <Grid item>
          <Typography variant="h3" gutterBottom display="inline">
            Training Event Employee
          </Typography>

          <CustomBreadcrumbs aria-label="Breadcrumb" mt={2}>
            <Link component={NavLink} to="/private/dashboard">
              Dashboard
            </Link>
            <Typography>Training Event Employees</Typography>
          </CustomBreadcrumbs>
        </Grid>
        <Grid item>
          <div>
            <NavLink to="/private/training-event-employees/add">
              <Button variant="contained" color="primary">
                <AddIcon />
                Add Training Event Employee
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
            rows={trainingEventEmployee}
            loading={loading}
          />
        </Grid>
      </Grid>
    </>
  );
};

export default TrainingEventEmployeeListNew;
