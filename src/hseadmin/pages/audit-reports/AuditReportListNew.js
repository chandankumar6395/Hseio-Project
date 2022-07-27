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
  { field: 'name', headerName: 'Audit Report', width: 90 },
  {
    field: 'audit_task',
    headerName: 'Audit Task',
    width: 150,

    renderCell: (params) => {
      const auditTask = params.row.audit_task;
      return <span>{auditTask ? auditTask.name : ''}</span>;
    },
  },
  { field: 'contactor_name', headerName: 'Contactor Name', width: 90 },
  { field: 'city_name', headerName: 'City', width: 90 },
  {
    field: 'auditor_id',
    headerName: 'Auditor',
    width: 150,

    renderCell: (params) => {
      const { auditor } = params.row;
      return (
        <span>
          {auditor ? `${auditor.first_name} ${auditor.last_name}` : ''}
        </span>
      );
    },
  },
  { field: 'auditor_name', headerName: 'Auditor Name', width: 90 },
  {
    field: 'audit_type',
    headerName: 'Audit Type',
    width: 150,

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

export default function AuditReportListNew() {
  const [auditReports, setAuditReports] = useState([]);
  const [loading, setLoading] = useState(false);

  // ------ added by ashish -------

  useEffect(() => {
    // console.log('inside useEffect search text box');

    const timer = setTimeout(async () => {
      fetchAuditReports();
    }, 400);

    return () => {
      clearTimeout(timer);
    };
  }, []);

  const fetchAuditReports = async () => {
    try {
      setLoading(true);
      const response = await fetchGET(
        `${URLConstants.AUDIT_REPORTS_URL}?limit=100&page=1`
      );

      setAuditReports(response.data);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      toast(error.message || 'Failed');
    }
  };

  return (
    <>
      <Helmet title="Audit Reports" />

      <Grid justifyContent="space-between" container spacing={10}>
        <Grid item>
          <Typography variant="h3" gutterBottom display="inline">
            Audit Reports
          </Typography>

          <CustomBreadcrumbs aria-label="Breadcrumb" mt={2}>
            <Link component={NavLink} to="/">
              Dashboard
            </Link>
            <Typography>Audit Reports</Typography>
          </CustomBreadcrumbs>
        </Grid>
        <Grid item>
          <div>
            <NavLink to="/private/audit-reports/add">
              <Button variant="contained" color="primary">
                <AddIcon />
                Add Audit Report
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
            rows={auditReports}
            loading={loading}
          />
        </Grid>
      </Grid>
    </>
  );
}
