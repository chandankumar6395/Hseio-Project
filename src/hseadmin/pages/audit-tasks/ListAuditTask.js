import * as React from 'react';
import { Helmet } from 'react-helmet-async';
import EditIcon from '@mui/icons-material/Edit';
import { GridActionsCellItem } from '@mui/x-data-grid-pro';
import AddIcon from '@mui/icons-material/Add';
import PrintIcon from '@mui/icons-material/Print';
import { Button, Grid, Link, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { NavLink, useNavigate } from 'react-router-dom';
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
    valueFormatter: (params) => {
      return params.value ? params.value.name : '';
    },
    renderCell: (params) => {
      const auditTask = params.row.audit_task;
      return <span>{auditTask ? auditTask.name : ''}</span>;
    },
  },
  { field: 'contactor_name', headerName: 'Contactor Name', width: 90 },
  { field: 'city_name', headerName: 'City', width: 90 },
  {
    field: 'auditor',
    headerName: 'Auditor',
    width: 150,
    valueFormatter: (params) => {
      return params.value
        ? params.value.first_name + params.value.last_name
        : '';
    },

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
    field: 'actions',
    type: 'actions',
    headerName: 'Actions',
    width: 100,
    getActions: (params) => [
      <GridActionsCellItem
        icon={<PrintIcon />}
        component={NavLink}
        to={`/private/print-audit-form/${params.row.id}`}
        label="Edit"
      />,
      <GridActionsCellItem
        icon={<EditIcon />}
        component={NavLink}
        to={`../../private/edit-audit-form/${params.row.id}`}
        label="Edit"
      />,
    ],
  },
];

export default function ListAuditTask() {
  const history = useNavigate();
  const [auditReports, setAuditReports] = useState([]);
  const [loading, setLoading] = useState(false);
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
      // @ts-ignore
      const response = await fetchGET(`${URLConstants.AUDIT_REPORTS_URL}`);

      setAuditReports(response.data);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      toast(error.message || 'Failed');
    }
  };

  const OnAddAuditReport = () => {
    history(`../../private/perform-audit-task`);
  };
  return (
    <>
      <Helmet title="Weekly Audit Report" />

      <Grid justifyContent="space-between" container spacing={10}>
        <Grid item>
          <Typography variant="h3" gutterBottom display="inline">
            List of Audit Report
          </Typography>

          <CustomBreadcrumbs aria-label="Breadcrumb" mt={2}>
            <Link component={NavLink} to="/">
              Dashboard
            </Link>
            <Typography>List of Audit Report</Typography>
          </CustomBreadcrumbs>
        </Grid>
        <Grid item>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              flexWrap: 'wrap',
            }}
          >
            <Button
              variant="contained"
              color="primary"
              onClick={OnAddAuditReport}
            >
              <AddIcon />
              Perform Audit Task
            </Button>
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
