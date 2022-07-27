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
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBuilding } from '@fortawesome/free-regular-svg-icons';

import { fetchGET } from '../../utils/NetworkUtils';
import URLConstants from '../../constants/URLConstants';

import './CompnayListNew.css';

import CustomDataTable from '../../components/CustomDataTable';
import { CustomBreadcrumbs, CustomDivider } from '../../utils/MUIStyle';

const COLUMNS = [
  { field: 'id', headerName: 'ID', width: 90 },
  {
    field: 'image',
    headerName: 'Image',
    width: 150,
    renderCell: (params) => {
      // console.log('params', params);
      return (
        <div
          style={{ display: 'flex', justifyContent: 'center', width: '100%' }}
        >
          {params.row.primary_logo && (
            <img
              style={{
                width: '50px',
                height: 'auto',
                alignItems: 'center',
                backgroundColor: 'lightgrey',
              }}
              src={params.row.primary_logo ? params.row.primary_logo.url : ''}
              alt=""
            />
          )}
          {params.row.primary_logo === null && (
            <FontAwesomeIcon icon={faBuilding} size="3x" />
          )}
        </div>
      );
    }, // renderCell will render the component
  },
  {
    field: 'name',
    headerName: 'Company Name',
    width: 200,
    valueFormatter: (params) => {
      return params.value;
    },
    renderCell: (params) => {
      return <span> {params.row.name}</span>;
    },
  },

  {
    field: 'short_desc',
    headerName: 'Short Description',
    width: 90,
    hide: true,
  },
  // {
  //   field: 'long_desc',
  //   headerName: 'Description',
  //   width: 90,
  //   hide: true,
  // },
  { field: 'email_address', headerName: 'Email', width: 90, hide: true },
  { field: 'landline', headerName: 'Landline', width: 90, hide: true },
  { field: 'fax', headerName: 'Fax', width: 90, hide: true },
  // { field: 'mobile', headerName: 'Mobile', width: 90, hide: true },
  { field: 'website_url', headerName: 'Website', width: 90, hide: true },
  // { field: 'about_us_url', headerName: 'About Us', width: 90, hide: true },
  // {
  //   field: 'privacy_policy_url',
  //   headerName: 'Privacy Policy',
  //   width: 90,
  //   hide: true,
  // },
  // {
  //   field: 'terms_and_condition_url',
  //   headerName: 'Terms and Conditions',
  //   width: 90,
  //   hide: true,
  // },
  {
    field: 'status',
    headerName: 'Status',
    width: 90,
    valueFormatter: (params) => {
      const { value } = params;
      console.log(`---->${JSON.stringify(value)}`);
      return value.name;
    },
    renderCell: (params) => {
      return <span> {params.row.status.name}</span>;
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

export default function CompanyListNew() {
  const [companies, setCompanies] = useState([]);
  const [loading, setLoading] = useState(false);

  // ------ added by ashish -------

  useEffect(() => {
    // console.log('inside useEffect search text box');

    const timer = setTimeout(async () => {
      fetchCompanies();
    }, 400);

    return () => {
      clearTimeout(timer);
    };
  }, []);

  const fetchCompanies = async () => {
    try {
      setLoading(true);
      const response = await fetchGET(
        `${URLConstants.COMPANIES_URL}?limit=1000&page=1`
      );

      setCompanies(response.data);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      toast(error.message || 'Failed');
    }
  };

  return (
    <>
      <Helmet title="Companies" />

      <Grid justifyContent="space-between" container spacing={10}>
        <Grid item>
          <Typography variant="h3" gutterBottom display="inline">
            Companies
          </Typography>

          <CustomBreadcrumbs aria-label="Breadcrumb" mt={2}>
            <Link component={NavLink} to="/">
              Dashboard
            </Link>
            <Typography>Companies</Typography>
          </CustomBreadcrumbs>
        </Grid>
        <Grid item>
          <div>
            <NavLink to="/private/companies/add">
              <Button variant="contained" color="primary">
                <AddIcon />
                Add Company
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
            rows={companies}
            loading={loading}
          />
        </Grid>
      </Grid>
    </>
  );
}
