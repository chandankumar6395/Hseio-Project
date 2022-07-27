import React, { useEffect, useState } from 'react';

import { Link, NavLink, useParams } from 'react-router-dom';
import { GridActionsCellItem } from '@mui/x-data-grid-pro';
import EditIcon from '@mui/icons-material/Edit';
import TVIcon from '@mui/icons-material/Tv';

import { Helmet } from 'react-helmet-async';
import {
  Breadcrumbs as MuiBreadcrumbs,
  Button,
  Divider as MuiDivider,
  Grid,
  Typography,
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { toast } from 'react-toastify';
import styled from '@emotion/styled';
import { spacing } from '@mui/system';
import { YES_NO_DATA } from '../../constants/Constants';
import CustomDataTable from '../../components/CustomDataTable';
import { fetchGET } from '../../utils/NetworkUtils';
import URLConstants from '../../constants/URLConstants';

const Divider = styled(MuiDivider)(spacing);

const Breadcrumbs = styled(MuiBreadcrumbs)(spacing);

const COLUMNS = [
  { field: 'id', headerName: 'ID', width: 90, hide: true },
  { field: 'name', headerName: 'Division', width: 120 },
  // {
  //   field: 'company',
  //   headerName: 'Company Name',
  //   width: 200,
  //
  //   renderCell: (params) => {
  //     const { company } = params.row;
  //     return <span>{company.name}</span>;
  //   },
  // },
  {
    field: 'address',
    headerName: 'Address',
    width: 200,
    valueFormatter: ({ value }) => `${value.address1}`,
    renderCell: (params) => {
      const { address } = params.row;
      return <span>{address ? address.address1 : ''}</span>;
    },
  },
  // {
  //   field: 'head_office',
  //   headerName: 'Head Office',
  //   width: 90,
  //   hide: true,
  //   renderCell: (params) => {
  //     const { head_office: headOffice } = params.row;
  //     return (
  //       <span>
  //         {' '}
  //         {headOffice
  //           ? STATUSES_DATA.find((x) => x.id === headOffice).name
  //           : ''}
  //       </span>
  //     );
  //   },
  // },
  {
    field: 'status',
    headerName: 'Status',
    width: 90,
    hide: true,
    valueFormatter: (params) => {
      return params.value.name;
    },
    renderCell: (params) => {
      const { status_id: statusId } = params.row;
      return (
        <span>
          {' '}
          {statusId ? YES_NO_DATA.find((x) => x.id === statusId).name : ''}
        </span>
      );
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

const DivisionList = () => {
  const { id: companyId } = useParams();
  const [loading, setLoading] = useState(false);
  console.log(`---------->${JSON.stringify(companyId)}`);

  useEffect(() => {
    // console.log('inside useEffect search text box');

    const timer = setTimeout(async () => {
      fetchDivisions();
    }, 400);

    return () => {
      clearTimeout(timer);
    };
  }, []);

  const [divisions, setDivisions] = useState([]);

  useEffect(() => {
    // fetchDivisions();
  }, []);

  const fetchDivisions = async () => {
    try {
      setLoading(true);
      const response = await fetchGET(
        `${URLConstants.DIVISIONS_URL}?limit=1000&page=1`
      );

      setDivisions(response.data);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      toast(error.message || 'Failed');
    }
  };

  return (
    <>
      <Helmet title="Divisions" />

      <Grid justifyContent="space-between" container spacing={10}>
        <Grid item>
          <Typography variant="h3" gutterBottom display="inline">
            Divisions
          </Typography>

          <Breadcrumbs aria-label="Breadcrumb" mt={2}>
            <Link component={NavLink} to="/private/dashboard">
              Dashboard
            </Link>
            <Typography>Divisions</Typography>
          </Breadcrumbs>
        </Grid>
        <Grid item>
          <div>
            <NavLink to="/private/divisions/add">
              <Button variant="contained" color="primary">
                <AddIcon />
                Add Division
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
            rows={divisions}
            loading={loading}
          />
        </Grid>
      </Grid>
    </>
  );
};

export default DivisionList;
