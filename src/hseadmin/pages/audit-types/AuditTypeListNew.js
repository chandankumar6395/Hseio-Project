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
  { field: 'name', headerName: 'Audit Type', width: 90 },
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

export default function AuditTypeListNew() {
  const [auditTypes, setAuditTypes] = useState([]);
  const [loading, setLoading] = useState(false);

  // ------ added by ashish -------

  useEffect(() => {
    // console.log('inside useEffect search text box');

    const timer = setTimeout(async () => {
      fetchAuditTypes();
    }, 400);

    return () => {
      clearTimeout(timer);
    };
  }, []);

  const fetchAuditTypes = async () => {
    try {
      setLoading(true);
      const response = await fetchGET(
        `${URLConstants.AUDIT_TYPES_URL}?limit=100&page=1`
      );

      setAuditTypes(response.data);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      toast(error.message || 'Failed');
    }
  };

  return (
    <>
      <Helmet title="Audit Types" />

      <Grid justifyContent="space-between" container spacing={10}>
        <Grid item>
          <Typography variant="h3" gutterBottom display="inline">
            Audit Types
          </Typography>

          <CustomBreadcrumbs aria-label="Breadcrumb" mt={2}>
            <Link component={NavLink} to="/">
              Dashboard
            </Link>
            <Typography>Audit Types</Typography>
          </CustomBreadcrumbs>
        </Grid>
        <Grid item>
          <div>
            <NavLink to="/private/audit-types/add">
              <Button variant="contained" color="primary">
                <AddIcon />
                Add Audit Type
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
            rows={auditTypes}
            loading={loading}
          />
        </Grid>
      </Grid>
    </>
  );
}
