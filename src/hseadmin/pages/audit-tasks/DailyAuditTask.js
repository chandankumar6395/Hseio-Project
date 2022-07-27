import * as React from 'react';
import { Helmet } from 'react-helmet-async';
import EditIcon from '@mui/icons-material/Edit';
import { GridActionsCellItem } from '@mui/x-data-grid-pro';
import AddIcon from '@mui/icons-material/Add';
import PrintIcon from '@mui/icons-material/Print';
import { Button, Grid, Link, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { NavLink, useNavigate, useParams } from 'react-router-dom';

import { Form } from 'react-bootstrap';
import { fetchGET } from '../../utils/NetworkUtils';
import URLConstants from '../../constants/URLConstants';

import CustomDataTable from '../../components/CustomDataTable';
import { CustomBreadcrumbs, CustomDivider } from '../../utils/MUIStyle';
import TaskListSelect from '../../components/widgets/TaskListSelect';

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

export default function DailyAuditTask() {
  const history = useNavigate();
  const [auditReports, setAuditReports] = useState([]);
  const [loading, setLoading] = useState(false);
  const [tasklistId, setTasklistId] = useState(false);
  const { id } = useParams();
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
        `${URLConstants.AUDIT_REPORTS_URL}?audit_type_id=${id}`
      );

      setAuditReports(response.data);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      toast(error.message || 'Failed');
    }
  };

  const OnAddAuditReport = () => {
    if (tasklistId !== false) {
      // eslint-disable-next-line no-restricted-globals
      history(`../../private/add-audit-form/${tasklistId}`);
    }
  };
  return (
    <>
      <Helmet title="Daily Audit Report" />

      <Grid justifyContent="space-between" container spacing={10}>
        <Grid item>
          <Typography variant="h3" gutterBottom display="inline">
            Daily Audit Report
          </Typography>

          <CustomBreadcrumbs aria-label="Breadcrumb" mt={2}>
            <Link component={NavLink} to="/">
              Dashboard
            </Link>
            <Typography>Daily Audit Report</Typography>
          </CustomBreadcrumbs>
        </Grid>
        <Grid item>
          <div
            style={{
              display: 'flex',
              justifyContent: 'flex-end',
              alignItems: 'center',
            }}
          >
            {/* Company id */}
            <Form.Label className="mr-3 mb-0">Task List</Form.Label>
            <Form.Group className="mr-3" controlId="formBasicEmail">
              <TaskListSelect
                onChange={(value) => {
                  setTasklistId(value);
                }}
              />
            </Form.Group>
            <Button
              variant="contained"
              color="primary"
              onClick={OnAddAuditReport}
            >
              <AddIcon />
              Add Task List
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
