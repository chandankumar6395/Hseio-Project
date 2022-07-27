import { GridActionsCellItem } from '@mui/x-data-grid-pro';
import EditIcon from '@mui/icons-material/Edit';
import { Link, NavLink } from 'react-router-dom';
import TVIcon from '@mui/icons-material/Tv';
import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { Helmet } from 'react-helmet-async';
import {
  Breadcrumbs as MuiBreadcrumbs,
  Button,
  Divider as MuiDivider,
  Grid,
  Typography,
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import styled from '@emotion/styled';
import { spacing } from '@mui/system';
import { fetchGET } from '../../utils/NetworkUtils';
import URLConstants from '../../constants/URLConstants';
import CustomDataTable from '../../components/CustomDataTable';

const Divider = styled(MuiDivider)(spacing);

const Breadcrumbs = styled(MuiBreadcrumbs)(spacing);

const COLUMNS = [
  { field: 'id', headerName: 'ID', width: 90 },
  { field: 'first_name', headerName: 'First Name', width: 90 },
  { field: 'last_name', headerName: 'Last Name', width: 90 },
  { field: 'email_address', headerName: 'Email Address', width: 90 },
  { field: 'landline', headerName: 'Landline', width: 90 },
  { field: 'mobile', headerName: 'Mobile', width: 90 },
  { field: 'designation_name', headerName: 'Designation Name', width: 90 },
  { field: 'landline', headerName: 'Landline', width: 90 },
  { field: 'notes', headerName: 'Notes', width: 90 },
  {
    field: 'statusId',
    headerName: 'Status',
    width: 150,

    renderCell: (params) => {
      const { status } = params.row;
      return <span>{status && status.name}</span>;
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
const ContactPeopleList = () => {
  const [contactPeople, setContactPeople] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // console.log('inside useEffect search text box');

    const timer = setTimeout(async () => {
      fetchContactPeople();
    }, 400);

    return () => {
      clearTimeout(timer);
    };
  }, []);
  const fetchContactPeople = async () => {
    try {
      setLoading(true);
      const response = await fetchGET(
        `${URLConstants.CONTACT_PEOPLES_URL}?limit=100&page=1`
      );

      setContactPeople(response.data);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      toast(error.message || 'Failed');
    }
  };
  return (
    <>
      <Helmet title="Contact People" />

      <Grid justifyContent="space-between" container spacing={10}>
        <Grid item>
          <Typography variant="h3" gutterBottom display="inline">
            Contact People
          </Typography>

          <Breadcrumbs aria-label="Breadcrumb" mt={2}>
            <Link component={NavLink} to="/">
              Dashboard
            </Link>
            <Typography>Contact People</Typography>
          </Breadcrumbs>
        </Grid>
        <Grid item>
          <div>
            <NavLink to="/private/contact-peoples/add">
              <Button variant="contained" color="primary">
                <AddIcon />
                Add Contact People
              </Button>
            </NavLink>
          </div>
        </Grid>
      </Grid>

      <Divider my={6} />
      <Grid container spacing={6}>
        <Grid item xs={12}>
          <CustomDataTable
            columns={COLUMNS}
            rows={contactPeople}
            loading={loading}
          />
        </Grid>
      </Grid>
    </>
  );
};
export default ContactPeopleList;
