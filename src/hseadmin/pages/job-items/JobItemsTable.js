import React, { useEffect, useState } from 'react';

import { NavLink } from 'react-router-dom';
import { GridActionsCellItem } from '@mui/x-data-grid-pro';
import EditIcon from '@mui/icons-material/Edit';
import TVIcon from '@mui/icons-material/Tv';
import { Grid } from '@mui/material';

import { toast } from 'react-toastify';

import CustomDataTable from '../../components/CustomDataTable';
import { fetchGET } from '../../utils/NetworkUtils';
import URLConstants from '../../constants/URLConstants';

const COLUMNS = [
  { field: 'id', headerName: 'ID', width: 90 },

  {
    field: 'job_id',
    headerName: 'Job',
    width: 200,

    renderCell: (params) => {
      const { job } = params.row;
      return <span>{job ? job.name : ''}</span>;
    },
  },
  {
    field: 'job_stages',
    headerName: 'Job Stages',
    width: 100,
  },

  {
    field: 'hazard_consequence',
    headerName: 'Hazard Consequence',
    width: 100,
  },

  {
    field: 'controls',
    headerName: 'Controls',
    width: 100,
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

const JobItemsTable = (props) => {
  const { jobId } = props;

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // console.log('inside useEffect search text box');

    const timer = setTimeout(async () => {}, 400);

    return () => {
      clearTimeout(timer);
    };
  }, []);

  const [jobItems, setJobItems] = useState([]);

  useEffect(() => {
    fetchJobItems();
  }, []);

  const fetchJobItems = async () => {
    try {
      setLoading(true);
      let url = `${URLConstants.JOB_ITEMS_URL}?limit=100&page=1`;

      if (jobId !== null && jobId !== undefined) {
        url = `${url}&job_id=${jobId}`;
      }
      const response = await fetchGET(url);

      setJobItems(response.data);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      toast(error.message || 'Failed');
    }
  };

  return (
    <>
      <Grid container spacing={6}>
        <Grid item xs={12}>
          <CustomDataTable
            columns={COLUMNS}
            rows={jobItems}
            loading={loading}
          />
        </Grid>
      </Grid>
    </>
  );
};

export default JobItemsTable;
