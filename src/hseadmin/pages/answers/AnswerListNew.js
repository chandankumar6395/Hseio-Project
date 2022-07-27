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
  {
    field: 'question',
    headerName: 'Question',
    width: 150,

    renderCell: (params) => {
      return <span> {params.row.question.name}</span>;
    },
  },
  { field: 'name', headerName: 'Answer', width: 90 },
  { field: 'label', headerName: 'Label', width: 90 },
  { field: 'value', headerName: 'Value', width: 90 },
  { field: 'correct_value', headerName: 'Correct Value', width: 90 },
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

export default function AnswerListNew() {
  const [answers, setAnswers] = useState([]);
  const [loading, setLoading] = useState(false);

  // ------ added by ashish -------

  useEffect(() => {
    // console.log('inside useEffect search text box');

    const timer = setTimeout(async () => {
      fetchAnswers();
    }, 400);

    return () => {
      clearTimeout(timer);
    };
  }, []);

  const fetchAnswers = async () => {
    try {
      setLoading(true);
      const response = await fetchGET(
        `${URLConstants.ANSWERS_URL}?limit=100&page=1`
      );

      setAnswers(response.data);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      toast(error.message || 'Failed');
    }
  };

  return (
    <>
      <Helmet title="Answers" />

      <Grid justifyContent="space-between" container spacing={10}>
        <Grid item>
          <Typography variant="h3" gutterBottom display="inline">
            Answers
          </Typography>

          <CustomBreadcrumbs aria-label="Breadcrumb" mt={2}>
            <Link component={NavLink} to="/">
              Dashboard
            </Link>
            <Typography>Answers</Typography>
          </CustomBreadcrumbs>
        </Grid>
        <Grid item>
          <div>
            <NavLink to="/private/answers/add">
              <Button variant="contained" color="primary">
                <AddIcon />
                Add Answer
              </Button>
            </NavLink>
          </div>
        </Grid>
      </Grid>

      <CustomDivider my={6} />
      <Grid container spacing={6}>
        <Grid item xs={12}>
          <CustomDataTable columns={COLUMNS} rows={answers} loading={loading} />
        </Grid>
      </Grid>
    </>
  );
}
