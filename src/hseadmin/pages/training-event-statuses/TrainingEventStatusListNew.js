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
  {
    field: 'name',
    headerName: 'Status Name',
    width: 150,
  },
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

const TrainingEventStatusListNew = () => {
  const [loading, setLoading] = useState(false);

  const [trainingEventStatus, setTrainingEventStatus] = useState([]);

  const fetchTrainingEventStatus = async () => {
    try {
      setLoading(true);
      const response = await fetchGET(
        `${URLConstants.TRAINING_EVENT_STATUSES_URL}?limit=100&page=1`
      );

      setTrainingEventStatus(response.data);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      toast(error.message || 'Failed');
    }
  };

  useEffect(() => {
    fetchTrainingEventStatus();
  }, []);

  return (
    <>
      <Helmet title="Training Event Statuses" />

      <Grid justifyContent="space-between" container spacing={10}>
        <Grid item>
          <Typography variant="h3" gutterBottom display="inline">
            Training Event Status
          </Typography>

          <CustomBreadcrumbs aria-label="Breadcrumb" mt={2}>
            <Link component={NavLink} to="/">
              Dashboard
            </Link>
            <Typography>Training Event Status</Typography>
          </CustomBreadcrumbs>
        </Grid>
        <Grid item>
          <div>
            <NavLink to="/private/training-event-statuses/add">
              <Button variant="contained" color="primary">
                <AddIcon />
                Add Training Event Status
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
            rows={trainingEventStatus}
            loading={loading}
          />
        </Grid>
      </Grid>
    </>
  );
};

export default TrainingEventStatusListNew;
