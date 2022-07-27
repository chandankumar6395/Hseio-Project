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
import { CustomBreadcrumbs, CustomDivider } from '../../utils/MUIStyle';

const COLUMNS = [
  { field: 'id', headerName: 'ID', width: 90 },
  { field: 'name', headerName: 'Project Name', width: 90 },
  {
    field: 'short_desc',
    headerName: 'Short Description',
    width: 190,
    hideable: true,
  },
  {
    field: 'long_desc',
    headerName: 'Description',
    width: 190,
    hideable: true,
  },
  {
    field: 'content',
    headerName: 'Content',
    width: 100,
    hideable: true,
  },
  {
    field: 'document',
    headerName: 'Document',
    width: 90,
    // renderCell: (params) => {
    //   return <span> {params.row.document.name}</span>;
    // },
    renderCell: (params) => {
      const value = params.row.document;
      return <a href={value.url}>{value.name}</a>;
    },
  },
  {
    field: 'company',
    headerName: 'Company Name',
    width: 150,

    renderCell: (params) => {
      return <span> {params.row.company.name}</span>;
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

const SampleCertificateListNew = () => {
  const [loading, setLoading] = useState(false);

  const [sampleCertificates, setSampleCertificates] = useState([]);

  const fetchSampleCertificate = async () => {
    try {
      setLoading(true);
      const response = await fetchGET(
        `${URLConstants.SAMPLE_CERTIFICATES_URL}?limit=100&page=1`
      );

      setSampleCertificates(response.data);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      toast(error.message || 'Failed');
    }
  };

  useEffect(() => {
    fetchSampleCertificate();
  }, []);

  return (
    <>
      <Helmet title="Sample Certificates" />

      <Grid justifyContent="space-between" container spacing={10}>
        <Grid item>
          <Typography variant="h3" gutterBottom display="inline">
            Sample Certificates
          </Typography>

          <CustomBreadcrumbs aria-label="Breadcrumb" mt={2}>
            <Link component={NavLink} to="/">
              Dashboard
            </Link>
            <Link component={NavLink} to="/">
              Pages
            </Link>
            <Typography>Sample Certificates</Typography>
          </CustomBreadcrumbs>
        </Grid>
        <Grid item>
          <div>
            <NavLink to="/private/sample-certificates/add">
              <Button variant="contained" color="primary">
                <AddIcon />
                Add Sample Certificate
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
            rows={sampleCertificates}
            loading={loading}
          />
        </Grid>
      </Grid>
    </>
  );
};

export default SampleCertificateListNew;
