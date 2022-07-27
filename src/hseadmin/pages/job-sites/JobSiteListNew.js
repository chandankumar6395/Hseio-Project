import React, { useEffect, useState } from 'react';

import { NavLink } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { Grid, Typography, Button, Link } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { GridActionsCellItem } from '@mui/x-data-grid-pro';
import EditIcon from '@mui/icons-material/Edit';
import TVIcon from '@mui/icons-material/Tv';
import { toast } from 'react-toastify';
import { useSelector } from 'react-redux';
import { fetchGET } from '../../utils/NetworkUtils';
import URLConstants from '../../constants/URLConstants';
import CustomDataTable from '../../components/CustomDataTable';
import { CustomBreadcrumbs, CustomDivider } from '../../utils/MUIStyle';
// import { toMMMDDYY } from '../../utils/Utils';

const COLUMNS = [
  { field: 'id', headerName: 'ID', width: 90, hide: true },
  { field: 'name', headerName: 'Project Name', width: 200 },
  {
    field: 'short_desc',
    headerName: 'Short Description',
    width: 90,
    hide: true,
  },
  {
    field: 'long_desc',
    headerName: 'Description',
    width: 90,
    hide: true,
  },
  // {
  //   field: 'superwiser_employee_id',
  //   headerName: 'Superwiser ',
  //   width: 90,
  //
  //   renderCell: (params) => {
  //     // eslint-disable-next-line camelcase
  //     const { supervisor_employee } = params.row;
  //     return <span>{supervisor_employee.name}</span>;
  //   },
  // },
  {
    field: 'address',
    headerName: 'Address',
    width: 150,
    valueFormatter: (params) => {
      return params.value ? params.value.address1 : '';
    },
    renderCell: (params) => {
      const { address } = params.row;
      return <span> {address !== null ? address.address1 : ''}</span>;
    },
  },
  {
    field: 'company',
    headerName: 'Company Name',
    width: 150,
    hide: true,
    valueFormatter: (params) => {
      return params.value ? params.value.name : '';
    },
    renderCell: (params) => {
      return <span> {params.row.company.name}</span>;
    },
  },
  {
    field: 'primary_division',
    headerName: 'Division',
    width: 150,
    valueFormatter: (params) => {
      return params.value ? params.value.name : '';
    },
    renderCell: (params) => {
      const { primary_division: primaryDivision } = params.row;
      return <span> {`${primaryDivision ? primaryDivision.name : ''}`}</span>;
    },
  },
  // { field: 'latitude', headerName: 'Latitude', width: 90, hide: true },
  // { field: 'longitude', headerName: 'Longitude', width: 90, hide: true },
  {
    field: 'client',
    headerName: 'Client Name',
    width: 200,
    valueFormatter: (params) => {
      return params.value ? params.value.name : '';
    },
    renderCell: (params) => {
      const { client } = params.row;
      return <span> {client ? client.name : ''}</span>;
    },
  },
  // {
  //   field: 'primary_division',
  //   headerName: 'Primary Division',
  //   width: 90,
  //   renderCell: (params) => {
  //     return <span> {params.row.primary_division.name}</span>;
  //   },
  // },
  // {
  //   field: 'terms_and_condition_url',
  //   headerName: 'Terms and Conditions',
  //   width: 90,
  //   hide: true,
  // },
  {
    field: 'job_site_status',
    headerName: 'Status',
    width: 90,
    hide: true,
    valueFormatter: (params) => {
      return params.value ? params.value.name : '';
    },
    renderCell: (params) => {
      const item = params.row.job_site_status;
      return <span> {item && item.name}</span>;
    },
  },
  // {
  //   field: 'proposed_start_date',
  //   headerName: 'Proposed Start Date',
  //   width: 90,
  //   hide: true,
  //   renderCell: (params) => {
  //     const { proposed_start_date: date } = params.row;
  //     return <span> {`${date ? toMMDDYYYY(date) : ''}`}</span>;
  //   },
  // },
  // {
  //   field: 'proposed_end_date',
  //   headerName: 'Proposed End Date',
  //   width: 90,
  //   hide: true,
  //   renderCell: (params) => {
  //     const { proposed_end_date: date } = params.row;
  //     return <span> {`${date ? toMMDDYYYY(date) : ''}`}</span>;
  //   },
  // },
  // {
  //   field: 'actual_start_date',
  //   headerName: 'Actual Start Date',
  //   width: 90,
  //   hide: true,
  //   renderCell: (params) => {
  //     const { actual_start_date: date } = params.row;
  //     return <span> {`${date ? toMMDDYYYY(date) : ''}`}</span>;
  //   },
  // },
  // {
  //   field: 'actual_end_date',
  //   headerName: 'Actual End Date',
  //   width: 90,
  //   hide: true,
  //   renderCell: (params) => {
  //     const { actual_end_date: date } = params.row;
  //     return <span> {`${date ? toMMDDYYYY(date) : ''}`}</span>;
  //   },
  // },
  // {
  //   field: 'total_budget',
  //   headerName: 'Total Budget',
  //   width: 90,
  //   hide: true,
  // },
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

const JobSiteListNew = () => {
  const localDivisionId = useSelector((state) => state.auth.selectedDivision);
  // const { id: companyId } = useParams();
  const [loading, setLoading] = useState(false);

  const [jobSites, setJobSites] = useState([]);

  const fetchJobSite = async () => {
    try {
      setLoading(true);
      let url = `${URLConstants.JOB_SITES_URL}?limit=1000&page=1`;

      if (
        localDivisionId !== null &&
        localDivisionId !== undefined &&
        localDivisionId !== -1
      ) {
        url = `${url}&division_id=${localDivisionId}`;
      }
      const response = await fetchGET(url);

      setJobSites(response.data);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      toast(error.message || 'Failed');
    }
  };

  useEffect(() => {
    fetchJobSite();
  }, [localDivisionId]);

  return (
    <>
      <Helmet title="Projects" />

      <Grid justifyContent="space-between" container spacing={10}>
        <Grid item>
          <Typography variant="h3" gutterBottom display="inline">
            Projects
          </Typography>

          <CustomBreadcrumbs aria-label="Breadcrumb" mt={2}>
            <Link component={NavLink} to="/">
              Dashboard
            </Link>
            <Typography>Projects</Typography>
          </CustomBreadcrumbs>
        </Grid>
        <Grid item>
          <div>
            <NavLink to="/private/job-sites/add">
              <Button variant="contained" color="primary">
                <AddIcon />
                Add Project
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
            rows={jobSites}
            loading={loading}
          />
        </Grid>
      </Grid>
    </>
  );
};

export default JobSiteListNew;
