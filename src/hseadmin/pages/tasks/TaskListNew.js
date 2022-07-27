import { GridActionsCellItem } from '@mui/x-data-grid-pro';
import EditIcon from '@mui/icons-material/Edit';
import TVIcon from '@mui/icons-material/Tv';
import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { Helmet } from 'react-helmet-async';
import { Button, Grid, Typography } from '@mui/material';
import { Link, NavLink } from 'react-router-dom';
import AddIcon from '@mui/icons-material/Add';
import URLConstants from '../../constants/URLConstants';
import { fetchGET } from '../../utils/NetworkUtils';
import CustomDataTable from '../../components/CustomDataTable';
import { toMMDDYYYY } from '../../utils/Utils';
import { CustomBreadcrumbs, CustomDivider } from '../../utils/MUIStyle';

const COLUMNS = [
  { field: 'id', headerName: 'ID', width: 90 },
  { field: 'name', headerName: 'Name', width: 90 },
  { field: 'short_desc', headerName: 'Short Desc', width: 90 },
  { field: 'long_desc', headerName: 'Description', width: 90 },
  { field: 'priority', headerName: 'Priority', width: 90, hideable: true },
  {
    field: 'start_date_time',
    headerName: 'Start Date Time',
    width: 90,
    renderCell: (params) => {
      const { start_date_time: date } = params.row;
      return <span> {`${date ? toMMDDYYYY(date) : ''}`}</span>;
    },
  },
  {
    field: 'end_date_time',
    headerName: 'End Date Time',
    width: 90,
    renderCell: (params) => {
      const { end_date_time: date } = params.row;
      return <span> {`${date ? toMMDDYYYY(date) : ''}`}</span>;
    },
  },
  { field: 'manpower', headerName: 'Manpower', width: 90, hideable: true },
  { field: 'cost', headerName: 'Cost', width: 90, hideable: true },
  {
    field: 'parent_task',
    headerName: 'Parent Task',
    width: 150,

    renderCell: (params) => {
      // eslint-disable-next-line camelcase
      const { parent_task } = params.row;
      // eslint-disable-next-line no-undef,camelcase
      return <span>{parent_task ? parent_task.name : ''}</span>;
    },
  },
  {
    field: 'completed_date_time',
    headerName: 'Completed Date Time',
    width: 90,
    renderCell: (params) => {
      const { completed_date_time: date } = params.row;
      return <span> {`${date ? toMMDDYYYY(date) : ''}`}</span>;
    },
  },
  {
    field: 'industry',
    headerName: 'Industry',
    width: 150,

    renderCell: (params) => {
      const { industry } = params.row;
      return <span>{industry ? industry.name : ''}</span>;
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
const TaskListNew = () => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // console.log('inside useEffect search text box');

    const timer = setTimeout(async () => {
      fetchTasks();
    }, 400);

    return () => {
      clearTimeout(timer);
    };
  }, []);
  const fetchTasks = async () => {
    try {
      setLoading(true);
      const response = await fetchGET(
        `${URLConstants.TASKS_URL}?limit=100&page=1`
      );

      setTasks(response.data);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      toast(error.message || 'Failed');
    }
  };
  return (
    <>
      <Helmet title="Tasks" />

      <Grid justifyContent="space-between" container spacing={10}>
        <Grid item>
          <Typography variant="h3" gutterBottom display="inline">
            Tasks
          </Typography>

          <CustomBreadcrumbs aria-label="Breadcrumb" mt={2}>
            <Link component={NavLink} to="/">
              Dashboard
            </Link>
            <Typography>Tasks</Typography>
          </CustomBreadcrumbs>
        </Grid>
        <Grid item>
          <div>
            <NavLink to="/private/tasks/add">
              <Button variant="contained" color="primary">
                <AddIcon />
                Add Tasks
              </Button>
            </NavLink>
          </div>
        </Grid>
      </Grid>

      <CustomDivider my={6} />
      <Grid container spacing={6}>
        <Grid item xs={12}>
          <CustomDataTable columns={COLUMNS} rows={tasks} loading={loading} />
        </Grid>
      </Grid>
    </>
  );
};
export default TaskListNew;
