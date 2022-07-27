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
  { field: 'name', headerName: 'Name', width: 90 },
  { field: 'short_desc', headerName: 'Short Desc', width: 90 },
  { field: 'long_desc', headerName: 'Long Desc', width: 90 },
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
const InjuryClassList = () => {
  const [injuryClass, setInjuryClass] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // console.log('inside useEffect search text box');

    const timer = setTimeout(async () => {
      fetchInjuryClasses();
    }, 400);

    return () => {
      clearTimeout(timer);
    };
  }, []);
  const fetchInjuryClasses = async () => {
    try {
      setLoading(true);
      const response = await fetchGET(
        `${URLConstants.INJURY_CLASSES_URL}?limit=100&page=1`
      );

      setInjuryClass(response.data);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      toast(error.message || 'Failed');
    }
  };
  return (
    <>
      <Helmet title="Injury Classes" />

      <Grid justifyContent="space-between" container spacing={10}>
        <Grid item>
          <Typography variant="h3" gutterBottom display="inline">
            Injury Class
          </Typography>

          <Breadcrumbs aria-label="Breadcrumb" mt={2}>
            <Link component={NavLink} to="/">
              Dashboard
            </Link>
            <Typography>Injury Class</Typography>
          </Breadcrumbs>
        </Grid>
        <Grid item>
          <div>
            <NavLink to="/private/injury-classes/add">
              <Button variant="contained" color="primary">
                <AddIcon />
                Add Injury Classes
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
            rows={injuryClass}
            loading={loading}
          />
        </Grid>
      </Grid>
    </>
  );
};
export default InjuryClassList;
