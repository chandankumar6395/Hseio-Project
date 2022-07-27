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
import { YES_NO_DATA } from '../../constants/Constants';
import { CustomBreadcrumbs, CustomDivider } from '../../utils/MUIStyle';

const COLUMNS = [
  { field: 'id', headerName: 'ID', width: 90 },
  { field: 'name', headerName: 'Name', width: 90 },
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
    field: 'training_course_type',
    headerName: 'Training Course ',
    width: 90,
    valueFormatter: (params) => {
      return params.value ? params.value.name : '';
    },
    renderCell: (params) => {
      // eslint-disable-next-line camelcase
      return <span> {params.row.training_course_type.name}</span>;
    },
  },
  {
    field: 'durations',
    headerName: 'Duration',
    width: 90,
  },
  {
    field: 'recurring',
    headerName: 'Recurring',
    width: 90,
    valueFormatter: (params) => {
      return params.value === 1 ? 'YES' : 'NO';
    },
    renderCell: (params) => {
      const { recurring } = params.row;
      return <span> {YES_NO_DATA.find((x) => x.id === recurring).name}</span>;
    },
  },
  {
    field: 'recurring_in_days',
    headerName: 'Recurring In Days',
    width: 90,
  },
  {
    field: 'mandatory',
    headerName: 'Mandatory',
    width: 90,
    valueFormatter: (params) => {
      return params.value === 1 ? 'YES' : 'NO';
    },
    renderCell: (params) => {
      const { mandatory } = params.row;
      return <span> {YES_NO_DATA.find((x) => x.id === mandatory).name}</span>;
    },
  },
  {
    field: 'issue_certificate',
    headerName: 'Issue Certificate',
    width: 90,
    valueFormatter: (params) => {
      return params.value === 1 ? 'YES' : 'NO';
    },
    renderCell: (params) => {
      // eslint-disable-next-line camelcase
      const { issue_certificate } = params.row;
      return (
        <span>
          {' '}
          {/* eslint-disable-next-line camelcase */}
          {YES_NO_DATA.find((x) => x.id === issue_certificate).name}
        </span>
      );
    },
  },
  {
    field: 'sample_certificate',
    headerName: 'Sample Certificate Name',
    width: 90,
    valueFormatter: (params) => {
      return params.value ? params.value.name : '';
    },
    renderCell: (params) => {
      const sampleCertificate = params.row.sample_certificate;
      return <span>{sampleCertificate && sampleCertificate.name}</span>;
    },
  },
  {
    field: 'thumbnail_id',
    headerName: 'Thumbnail Name',
    width: 150,

    renderCell: (params) => {
      const { thumbnail } = params.row;
      return <span>{thumbnail && thumbnail.name}</span>;
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

const TrainingCourseListNew = () => {
  const [loading, setLoading] = useState(false);

  const [trainingCourses, setTrainingCourses] = useState([]);

  const fetchTrainingCourse = async () => {
    try {
      setLoading(true);
      const response = await fetchGET(
        `${URLConstants.TRAINING_COURSES_URL}?limit=100&page=1`
      );

      setTrainingCourses(response.data);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      toast(error.message || 'Failed');
    }
  };

  useEffect(() => {
    fetchTrainingCourse();
  }, []);

  return (
    <>
      <Helmet title="Training Courses" />

      <Grid justifyContent="space-between" container spacing={10}>
        <Grid item>
          <Typography variant="h3" gutterBottom display="inline">
            Training Courses
          </Typography>

          <CustomBreadcrumbs aria-label="Breadcrumb" mt={2}>
            <Link component={NavLink} to="/">
              Dashboard
            </Link>
            <Typography>Training Courses</Typography>
          </CustomBreadcrumbs>
        </Grid>
        <Grid item>
          <div>
            <NavLink to="/private/training-courses/add">
              <Button variant="contained" color="primary">
                <AddIcon />
                Add Training Course
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
            rows={trainingCourses}
            loading={loading}
          />
        </Grid>
      </Grid>
    </>
  );
};

export default TrainingCourseListNew;
