/* eslint-disable no-unused-vars */
import * as React from 'react';
import { Helmet } from 'react-helmet-async';
/* eslint-disable import/no-extraneous-dependencies */
import PropTypes from 'prop-types';
import EditIcon from '@mui/icons-material/Edit';
import TVIcon from '@mui/icons-material/Tv';
import { GridActionsCellItem } from '@mui/x-data-grid-pro';
// import {useDemoData} from '@mui/x-data-grid-generator';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import AddIcon from '@mui/icons-material/Add';

import FormControl from '@mui/material/FormControl';
import FormGroup from '@mui/material/FormGroup';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import {
  Avatar as MuiAvatar,
  Box,
  Breadcrumbs as MuiBreadcrumbs,
  Button,
  Checkbox,
  Chip as MuiChip,
  Divider as MuiDivider,
  Grid,
  IconButton,
  Link,
  Paper as MuiPaper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  TableSortLabel,
  Toolbar,
  Tooltip,
  Typography,
} from '@mui/material';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { NavLink } from 'react-router-dom';
import styled from '@emotion/styled';
import { spacing } from '@mui/system';
import { green, orange } from '@mui/material/colors';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBuilding } from '@fortawesome/free-regular-svg-icons';
import { fetchGET } from '../../utils/NetworkUtils';
import URLConstants from '../../constants/URLConstants';

// import './CompnayListNew.css';

// import {AntDesignStyledDataGridPro} from "../../utils/MUIStyle";
import CustomDataTable from '../../components/CustomDataTable';
import {
  KEY_COMPANY_ID,
  KEY_TYPE_ID,
  TYPE_SYSTEM_ADMIN,
} from '../../constants/Constants';

const Divider = styled(MuiDivider)(spacing);

const Breadcrumbs = styled(MuiBreadcrumbs)(spacing);

// const Paper = styled(MuiPaper)(spacing);
//
// const Chip = styled(MuiChip)`
//   ${spacing};
//
//   background: ${(props) => props.paid && green[500]};
//   background: ${(props) => props.sent && orange[700]};
//   color: ${(props) =>
//     (props.paid || props.sent) && props.theme.palette.common.white};
// `;
//
// const Spacer = styled.div`
//   flex: 1 1 100%;
// `;
//
// const ToolbarTitle = styled.div`
//   min-width: 150px;
// `;
//
// const Avatar = styled(MuiAvatar)`
//   background: ${(props) => props.theme.palette.primary.main};
// `;
//
// const Customer = styled.div`
//   display: flex;
//   align-items: center;
// `;

function SettingsPanel(props) {
  const { onApply, type, size, theme } = props;
  const [sizeState, setSize] = React.useState(size);
  const [typeState, setType] = React.useState(type);
  const [selectedPaginationValue, setSelectedPaginationValue] =
    React.useState(-1);
  const [activeTheme, setActiveTheme] = React.useState(theme);

  const handleSizeChange = React.useCallback((event) => {
    setSize(Number(event.target.value));
  }, []);

  const handleDatasetChange = React.useCallback((event) => {
    setType(event.target.value);
  }, []);

  const handlePaginationChange = React.useCallback((event) => {
    setSelectedPaginationValue(event.target.value);
  }, []);

  const handleThemeChange = React.useCallback((event) => {
    setActiveTheme(event.target.value);
  }, []);

  const handleApplyChanges = React.useCallback(() => {
    onApply({
      size: sizeState,
      type: typeState,
      pagesize: selectedPaginationValue,
      theme: activeTheme,
    });
  }, [sizeState, typeState, selectedPaginationValue, activeTheme, onApply]);

  return (
    <FormGroup className="MuiFormGroup-options" row>
      <FormControl variant="standard">
        <InputLabel>Dataset</InputLabel>
        <Select value={typeState} onChange={handleDatasetChange}>
          <MenuItem value="Employee">Employee</MenuItem>
          <MenuItem value="Commodity">Commodity</MenuItem>
        </Select>
      </FormControl>
      <FormControl variant="standard">
        <InputLabel>Rows</InputLabel>
        <Select value={sizeState} onChange={handleSizeChange}>
          <MenuItem value={10}>10</MenuItem>
          <MenuItem value={25}>25</MenuItem>
          <MenuItem value={50}>{Number(50).toLocaleString()}</MenuItem>
          <MenuItem value={100}>{Number(100).toLocaleString()}</MenuItem>
          <MenuItem value={1000}>{Number(1000).toLocaleString()}</MenuItem>
        </Select>
      </FormControl>
      <FormControl variant="standard">
        <InputLabel>Page Size</InputLabel>
        <Select
          value={selectedPaginationValue}
          onChange={handlePaginationChange}
        >
          <MenuItem value={-1}>off</MenuItem>
          <MenuItem value={0}>auto</MenuItem>
          <MenuItem value={25}>25</MenuItem>
          <MenuItem value={100}>100</MenuItem>
          <MenuItem value={1000}>{Number(1000).toLocaleString()}</MenuItem>
        </Select>
      </FormControl>
      <FormControl variant="standard">
        <InputLabel>Theme</InputLabel>
        <Select value={activeTheme} onChange={handleThemeChange}>
          <MenuItem value="default">Default Theme</MenuItem>
          <MenuItem value="ant">Ant Design</MenuItem>
        </Select>
      </FormControl>
      <Button
        size="small"
        variant="outlined"
        color="primary"
        onClick={handleApplyChanges}
      >
        <KeyboardArrowRightIcon fontSize="small" /> Apply
      </Button>
    </FormGroup>
  );
}

SettingsPanel.propTypes = {
  onApply: PropTypes.func.isRequired,
  size: PropTypes.number.isRequired,
  theme: PropTypes.oneOf(['ant', 'default']).isRequired,
  type: PropTypes.oneOf(['Commodity', 'Employee']).isRequired,
};

const COLUMNS = [
  { field: 'id', headerName: 'ID', width: 90, hide: true },
  {
    field: 'image',
    headerName: 'Image',
    width: 150,
    renderCell: (params) => {
      console.log('params', params);
      return (
        <div
          style={{ display: 'flex', justifyContent: 'center', width: '100%' }}
        >
          {params.row.primary_logo && (
            <img
              style={{
                width: '50px',
                height: 'auto',
                alignItems: 'center',
                backgroundColor: 'lightgrey',
              }}
              src={params.row.primary_logo ? params.row.primary_logo.url : ''}
              alt=""
            />
          )}
          {params.row.primary_logo === null && (
            <FontAwesomeIcon icon={faBuilding} size="3x" />
          )}
        </div>
      );
    }, // renderCell will render the component
  },
  { field: 'name', headerName: 'Client Name', width: 90 },
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
  { field: 'email_address', headerName: 'Email', width: 90, hide: true },
  { field: 'landline', headerName: 'Landline', width: 90, hide: true },
  { field: 'fax', headerName: 'Fax', width: 90, hide: true },
  // { field: 'mobile', headerName: 'Mobile', width: 90, hide: true },
  { field: 'website_url', headerName: 'Website', width: 90, hide: true },
  // { field: 'about_us_url', headerName: 'About Us', width: 90, hide: true },
  // {
  //   field: 'privacy_policy_url',
  //   headerName: 'Privacy Policy',
  //   width: 90,
  //   hide: true,
  // },
  // {
  //   field: 'terms_and_condition_url',
  //   headerName: 'Terms and Conditions',
  //   width: 90,
  //   hide: true,
  // },
  {
    field: 'status',
    headerName: 'Status',
    width: 90,
    hide: true,
    valueFormatter: (params) => {
      const { value } = params;
      console.log(`---->${JSON.stringify(value)}`);
      return value.name;
    },
    renderCell: (params) => {
      return <span> {params.row.status.name}</span>;
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

export default function ClientListNew() {
  const localCompanyId = localStorage.getItem(KEY_COMPANY_ID);
  const localTypeId = +localStorage.getItem(KEY_TYPE_ID);
  const [clients, setClients] = useState([]);
  const [loading, setLoading] = useState(false);

  // ------ added by ashish -------

  useEffect(() => {
    // console.log('inside useEffect search text box');

    const timer = setTimeout(async () => {
      fetchClients();
    }, 400);

    return () => {
      clearTimeout(timer);
    };
  }, []);

  // const companies = useSelector((state) => state.company.companies);
  // const pagination = useSelector((state) => state.company.pagination);

  const fetchClients = async () => {
    try {
      setLoading(true);
      let url = `${URLConstants.CLIENTS_URL}?limit=1000&page=1`;

      if (localCompanyId !== null) {
        url = `${url}&company_id=${localCompanyId}`;
      }
      const response = await fetchGET(url);

      setClients(response.data);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      toast(error.message || 'Failed');
    }
  };

  // ------ end here -------

  return (
    <>
      <Helmet title="Clients" />

      <Grid justifyContent="space-between" container spacing={10}>
        <Grid item>
          <Typography variant="h3" gutterBottom display="inline">
            Clients
          </Typography>

          <Breadcrumbs aria-label="Breadcrumb" mt={2}>
            <Link component={NavLink} to="/">
              Dashboard
            </Link>
            <Typography>Clients</Typography>
          </Breadcrumbs>
        </Grid>
        <Grid item>
          {localTypeId !== TYPE_SYSTEM_ADMIN && (
            <div>
              <NavLink to="/private/clients/add">
                <Button variant="contained" color="primary">
                  <AddIcon />
                  Add Client
                </Button>
              </NavLink>
            </div>
          )}
        </Grid>
      </Grid>

      <Divider my={6} />
      <Grid container spacing={6}>
        <Grid item xs={12}>
          <CustomDataTable columns={COLUMNS} rows={clients} loading={loading} />
        </Grid>
      </Grid>
    </>
  );
}
