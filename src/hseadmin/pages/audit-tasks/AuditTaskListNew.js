import * as React from 'react';
import { Helmet } from 'react-helmet-async';

import EditIcon from '@mui/icons-material/Edit';
import TVIcon from '@mui/icons-material/Tv';
import { GridActionsCellItem } from '@mui/x-data-grid-pro';

import AddIcon from '@mui/icons-material/Add';

import { Button, Grid, Link, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { NavLink } from 'react-router-dom';

import { fetchGET } from '../../utils/NetworkUtils';
import URLConstants from '../../constants/URLConstants';

import CustomDataTable from '../../components/CustomDataTable';
import { CustomBreadcrumbs, CustomDivider } from '../../utils/MUIStyle';

const COLUMNS = [
  { field: 'id', headerName: 'ID', width: 90 },
  { field: 'name', headerName: 'Audit Form Name', width: 150 },
  {
    field: 'short_desc',
    headerName: 'Short Description',
    width: 90,
    hideable: true,
  },
  {
    field: 'long_desc',
    headerName: 'Description',
    width: 90,
    hideable: true,
  },
  {
    field: 'company',
    headerName: 'Company',
    width: 150,
    valueFormatter: (params) => {
      return params.value ? params.value.name : '';
    },
    renderCell: (params) => {
      const item = params.row.company;
      return <span> {item && item.name}</span>;
    },
  },
  // {
  //   field: 'division',
  //   headerName: 'Division',
  //   width: 150,
  //   valueFormatter: (params) => {
  //     return params.value ? params.value.name : '';
  //   },
  //
  //   renderCell: (params) => {
  //     const value = params.row.division;
  //     return <span> {value && value.name}</span>;
  //   },
  // },
  // {
  //   field: 'job_site',
  //   headerName: 'Project',
  //   width: 150,
  //   valueFormatter: (params) => {
  //     return params.value ? params.value.name : '';
  //   },
  //
  //   renderCell: (params) => {
  //     const item = params.row.job_site;
  //     return <span> {item && item.name}</span>;
  //   },
  // },
  {
    field: 'audit_type',
    headerName: 'Audit Type',
    width: 150,
    valueFormatter: (params) => {
      return params.value ? params.value.name : '';
    },

    renderCell: (params) => {
      const value = params.row.audit_type;
      return <span> {value && value.name}</span>;
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

export default function AuditTaskListNew() {
  const [auditTasks, setAuditTasks] = useState([]);
  const [loading, setLoading] = useState(false);

  // ------ added by ashish -------

  useEffect(() => {
    // console.log('inside useEffect search text box');

    const timer = setTimeout(async () => {
      fetchAuditTasks();
    }, 400);

    return () => {
      clearTimeout(timer);
    };
  }, []);

  const fetchAuditTasks = async () => {
    try {
      setLoading(true);
      const response = await fetchGET(
        `${URLConstants.AUDIT_TASKS_URL}?limit=1000&page=1`
      );

      setAuditTasks(response.data);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      toast(error.message || 'Failed');
    }
  };

  return (
    <>
      <Helmet title="Audit Forms" />

      <Grid justifyContent="space-between" container spacing={10}>
        <Grid item>
          <Typography variant="h3" gutterBottom display="inline">
            Audit Forms
          </Typography>

          <CustomBreadcrumbs aria-label="Breadcrumb" mt={2}>
            <Link component={NavLink} to="/">
              Dashboard
            </Link>
            <Typography>Audit Forms</Typography>
          </CustomBreadcrumbs>
        </Grid>
        <Grid item>
          <div>
            <NavLink to="/private/audit-tasks/add">
              <Button variant="contained" color="primary">
                <AddIcon />
                Add Audit Form
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
            rows={auditTasks}
            loading={loading}
          />
        </Grid>
      </Grid>
    </>
  );
}
