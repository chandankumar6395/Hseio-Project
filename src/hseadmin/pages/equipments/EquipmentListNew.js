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
import { useSelector } from 'react-redux';
import { KEY_COMPANY_ID, YES_NO_DATA } from '../../constants/Constants';
import { fetchGET } from '../../utils/NetworkUtils';
import URLConstants from '../../constants/URLConstants';
import CustomDataTable from '../../components/CustomDataTable';

const Divider = styled(MuiDivider)(spacing);

const Breadcrumbs = styled(MuiBreadcrumbs)(spacing);

const COLUMNS = [
  { field: 'id', headerName: 'ID', width: 90 },
  { field: 'name', headerName: 'Name', width: 90 },
  // {
  //   field: 'registration_number',
  //   headerName: 'Registration Number',
  //   width: 90,
  //   hideable: true,
  // },
  // { field: 'make', headerName: 'Make', width: 90 },
  {
    field: 'model',
    headerName: 'Model',
    width: 90,
    valueFormatter: (params) => {
      return params.value ? params.value.name : '';
    },
    renderCell: (params) => {
      const { model } = params.row;
      return <span>{model ? model.name : ''}</span>;
    },
  },
  { field: 'year', headerName: 'Year', width: 90, hideable: true },
  // {
  //   field: 'miles_hours',
  //   headerName: 'Miles Hours',
  //   width: 90,
  //   hideable: true,
  // },
  {
    field: 'rental',
    headerName: 'Rental',
    width: 90,
    valueFormatter: (params) => {
      // const { value } = params;
      return params.value === 1 ? 'YES' : 'NO';
    },

    renderCell: (params) => {
      const { rental } = params.row;
      console.log('---->', YES_NO_DATA.find((x) => x.id === rental).name);
      return <span>{YES_NO_DATA.find((x) => x.id === rental).name}</span>;
    },
  },
  {
    field: 'company',
    headerName: 'Company',
    width: 150,
    valueFormatter: (params) => {
      return params.value ? params.value.name : '';
    },

    renderCell: (params) => {
      const { company } = params.row;
      return <span>{company ? company.name : ''}</span>;
    },
  },
  {
    field: 'division',
    headerName: 'Division',
    width: 150,
    valueFormatter: (params) => {
      return params.value ? params.value.name : '';
    },
    renderCell: (params) => {
      const { division } = params.row;
      return <span>{division ? division.name : ''}</span>;
    },
  },
  {
    field: 'job_site',
    headerName: 'Project',
    width: 150,
    valueFormatter: (params) => {
      return params.value ? params.value.name : '';
    },

    renderCell: (params) => {
      // eslint-disable-next-line camelcase
      const { job_site } = params.row;
      // eslint-disable-next-line camelcase
      return <span>{job_site ? job_site.name : ''}</span>;
    },
  },
  {
    field: 'equipment_type',
    headerName: 'Equipment Type',
    width: 150,
    valueFormatter: (params) => {
      return params.value ? params.value.name : '';
    },

    renderCell: (params) => {
      // eslint-disable-next-line camelcase
      const { equipment_type } = params.row;
      // eslint-disable-next-line camelcase
      return <span>{equipment_type ? equipment_type.name : ''}</span>;
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
const EquipmentListNew = () => {
  const localCompanyId = localStorage.getItem(KEY_COMPANY_ID);
  const localDivisionId = useSelector((state) => state.auth.selectedDivision);
  const localJobSiteId = useSelector((state) => state.auth.selectedJobSite);

  console.log('NewEquipmentMUI localCompanyId', localCompanyId);
  console.log('NewEquipmentMUI localDivisionId', localDivisionId);
  console.log('NewEquipmentMUI localJobSiteId', localJobSiteId);
  const [equipment, setEquipment] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // console.log('inside useEffect search text box');

    fetchEquipments();
  }, [localCompanyId, localJobSiteId, localDivisionId]);
  const fetchEquipments = async () => {
    try {
      setLoading(true);
      let url = `${URLConstants.EQUIPMENTS_URL}?limit=1000&page=1`;

      if (localCompanyId !== null) {
        url = `${url}&company_id=${localCompanyId}`;
      }
      if (localDivisionId !== -1) {
        url = `${url}&division_id=${localDivisionId}`;
      }
      if (localJobSiteId !== -1) {
        url = `${url}&job_site_id=${localJobSiteId}`;
      }

      console.log('url == ', url);
      const response = await fetchGET(url);

      setEquipment(response.data);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      toast(error.message || 'Failed');
    }
  };
  return (
    <>
      <Helmet title="Equipments" />

      <Grid justifyContent="space-between" container spacing={10}>
        <Grid item>
          <Typography variant="h3" gutterBottom display="inline">
            Equipment
          </Typography>

          <Breadcrumbs aria-label="Breadcrumb" mt={2}>
            <Link component={NavLink} to="/">
              Dashboard
            </Link>
            <Typography>Equipment</Typography>
          </Breadcrumbs>
        </Grid>
        <Grid item>
          <div>
            <NavLink to="/private/equipments/add">
              <Button variant="contained" color="primary">
                <AddIcon />
                Add Equipment
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
            rows={equipment}
            loading={loading}
          />
        </Grid>
      </Grid>
    </>
  );
};
export default EquipmentListNew;
