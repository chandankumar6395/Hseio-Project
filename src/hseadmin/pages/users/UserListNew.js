import { GridActionsCellItem } from '@mui/x-data-grid-pro';
import EditIcon from '@mui/icons-material/Edit';
import TVIcon from '@mui/icons-material/Tv';
import React, { useEffect, useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Helmet } from 'react-helmet-async';
import { Button, Grid, Typography } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import URLConstants from '../../constants/URLConstants';
import { fetchGET } from '../../utils/NetworkUtils';
import CustomDataTable from '../../components/CustomDataTable';
import { CustomBreadcrumbs, CustomDivider } from '../../utils/MUIStyle';

const COLUMNS = [
  { field: 'id', headerName: 'ID', width: 90 },
  {
    field: 'username',
    headerName: 'User Name',
    width: 90,
    hideable: true,
  },
  { field: 'password', headerName: 'Password', width: 90, hide: true },
  { field: 'email', headerName: 'Email', width: 90 },
  { field: 'first_name', headerName: 'First Name', width: 90, hideable: true },
  { field: 'last_name', headerName: 'Last Name', width: 90, hideable: true },
  {
    field: 'user_status',
    headerName: 'User Status',
    width: 150,
    valueFormatter: (params) => {
      return params.value.name;
    },

    renderCell: (params) => {
      // eslint-disable-next-line camelcase
      const { user_status } = params.row;
      // eslint-disable-next-line camelcase
      return <span>{user_status && user_status.name}</span>;
    },
  },
  {
    field: 'company_owner',
    headerName: 'Company Owner',
    width: 90,
    hide: true,
    valueFormatter: (params) => {
      return params.value === 1 ? 'YES' : 'NO';
    },

    renderCell: (params) => {
      // eslint-disable-next-line camelcase
      const { company_owner } = params.row;
      // eslint-disable-next-line camelcase
      return <span>{company_owner ? company_owner.name : ''}</span>;
    },
  },
  {
    field: 'primary_company',
    headerName: 'Primary Company',
    width: 150,
    valueFormatter: (params) => {
      return params.value ? params.value.name : '';
    },
    renderCell: (params) => {
      const company = params.row.primary_company;
      return <span>{company ? company.name : ''}</span>;
    },
  },
  {
    field: 'primary_division',
    headerName: 'Primary Division',
    width: 150,
    valueFormatter: (params) => {
      return params.value ? params.value.name : '';
    },
    renderCell: (params) => {
      const division = params.row.primary_division;
      return <span>{division ? division.name : ''}</span>;
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
const UserListNew = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // console.log('inside useEffect search text box');

    const timer = setTimeout(async () => {
      fetchUsers();
    }, 400);

    return () => {
      clearTimeout(timer);
    };
  }, []);
  const fetchUsers = async () => {
    try {
      setLoading(true);
      const response = await fetchGET(
        `${URLConstants.USERS_URL}?limit=100&page=1`
      );

      setUsers(response.data);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      toast(error.message || 'Failed');
    }
  };
  return (
    <>
      <Helmet title="Users" />

      <Grid justifyContent="space-between" container spacing={10}>
        <Grid item>
          <Typography variant="h3" gutterBottom display="inline">
            Users
          </Typography>

          <CustomBreadcrumbs aria-label="Breadcrumb" mt={2}>
            <Link component={NavLink} to="/">
              Dashboard
            </Link>
            <Typography>Users</Typography>
          </CustomBreadcrumbs>
        </Grid>
        <Grid item>
          <div>
            <NavLink to="/private/users/add">
              <Button variant="contained" color="primary">
                <AddIcon />
                Add User
              </Button>
            </NavLink>
          </div>
        </Grid>
      </Grid>

      <CustomDivider my={6} />
      <Grid container spacing={6}>
        <Grid item xs={12}>
          <CustomDataTable columns={COLUMNS} rows={users} loading={loading} />
        </Grid>
      </Grid>
    </>
  );
};

export default UserListNew;
