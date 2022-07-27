import * as React from 'react';
import { Helmet } from 'react-helmet-async';

import EditIcon from '@mui/icons-material/Edit';
import TVIcon from '@mui/icons-material/Tv';
import { GridActionsCellItem } from '@mui/x-data-grid-pro';

import AddIcon from '@mui/icons-material/Add';

import { Button, Grid, Link, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { NavLink, useParams } from 'react-router-dom';

import { Dropdown } from 'react-bootstrap';
import moment from 'moment';
import { fetchGET } from '../../utils/NetworkUtils';
import URLConstants from '../../constants/URLConstants';

import CustomDataTable from '../../components/CustomDataTable';
import { CustomBreadcrumbs, CustomDivider } from '../../utils/MUIStyle';
import { toMMDDYYYY } from '../../utils/Utils';
import {
  KEY_EMPLOYEE_ID,
  KEY_TYPE_ID,
  TYPE_EMPLOYEE,
} from '../../constants/Constants';
// import { loadCertificates } from '../../store/actions/certificates';

const COLUMNS = [
  { field: 'id', headerName: 'ID', width: 90, hide: true },
  {
    field: 'employee',
    headerName: 'Employee',
    width: 150,
    valueFormatter: (params) => {
      return params.value
        ? params.value.user.first_name + params.value.user.last_name
        : '';
    },

    renderCell: (params) => {
      // return <span> {params.row.employee.name}</span>;
      const { employee } = params.row;
      return (
        <span>{`${employee.user.first_name} ${employee.user.last_name}`}</span>
      );
    },
  },
  { field: 'name', headerName: 'Certificate Name', width: 90 },
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
  {
    field: 'start_date',
    headerName: 'Issue Date',
    width: 90,
    renderCell: (params) => {
      const { start_date: date } = params.row;
      return <span> {`${date ? toMMDDYYYY(date) : ''}`}</span>;
    },
  },
  {
    field: 'end_date',
    headerName: 'Expiration Date',
    width: 90,
    renderCell: (params) => {
      const { end_date: date } = params.row;
      return <span> {`${date ? toMMDDYYYY(date) : ''}`}</span>;
    },
  },
  // { field: 'score', headerName: 'Score', width: 90, hide: true },
  {
    field: 'document',
    headerName: 'Document',
    width: 150,
    valueFormatter: (params) => {
      return params.value ? params.value.url : '';
    },

    renderCell: (params) => {
      // return <span> {params.row.document.name}</span>;
      const { document } = params.row;
      return <span>{document && document.name}</span>;
    },
  },
  {
    field: 'training_course',
    headerName: 'Training Course',
    width: 150,
    hide: true,
    valueFormatter: (params) => {
      return params.value ? params.value.name : '';
    },

    renderCell: (params) => {
      // return <span> {params.row.training_course.name}</span>;
      const trainingCourse = params.row.training_course;
      return <span>{trainingCourse && trainingCourse.name}</span>;
    },
  },
  {
    field: 'certificate_status',
    headerName: 'Certificate Status',
    width: 150,
    valueFormatter: (params) => {
      return params.value ? params.value.name : '';
    },

    renderCell: (params) => {
      const item = params.row.certificate_status;
      return <span> {item && item.name}</span>;
    },
  },
  // {
  //   field: 'company',
  //   headerName: 'Company',
  //   width: 150,
  //
  //   renderCell: (params) => {
  //     // return <span> {params.row.company.name}</span>;
  //     const { company } = params.row;
  //     return <span>{company && company.name}</span>;
  //   },
  // },
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

export default function CertificateListNew() {
  const { id: employeeId } = useParams();
  const [certificates, setCetificates] = useState([]);
  const [loading, setLoading] = useState(false);

  const [expiredStartDate, setExpiredStartDate] = useState(null);
  const [expiredEndDate, setExpiredEndDate] = useState(null);

  const [expired, setExpired] = useState(false);
  // ------ added by ashish -------

  useEffect(() => {
    // console.log('inside useEffect search text box');
    console.log(expiredStartDate);
    console.log(expiredEndDate);
    console.log(expired);
    const timer = setTimeout(async () => {
      fetchCertificates();
    }, 400);

    return () => {
      clearTimeout(timer);
    };
  }, []);

  const fetchCertificates = async (
    expiredCertificate = false,
    startDate = null,
    endDate = null
  ) => {
    try {
      setLoading(true);
      let url = `${
        URLConstants.CERTIFICATES_URL
      }?limit=1000&page=${1}&sort=${'name'}&direction=${'asc'}`;

      if (employeeId !== -1 && employeeId !== undefined) {
        url = `${url}&employee_id=${employeeId}`;
      }

      const typeId = await +localStorage.getItem(KEY_TYPE_ID);
      if (typeId === TYPE_EMPLOYEE) {
        const empId = await +localStorage.getItem(KEY_EMPLOYEE_ID);
        url = `${url}&employee_id=${empId}`;
      }

      if (
        expiredCertificate === true &&
        startDate !== null &&
        endDate !== null
      ) {
        url = `${url}&expired=${expiredCertificate}&start_date=${startDate}&end_date=${endDate}&`;
      }

      const response = await fetchGET(`${url}`);

      setCetificates(response.data);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      toast(error.message || 'Failed');
    }
  };

  const onClickAllHandler = () => {
    setExpired(false);
    fetchCertificates();
  };

  const onClickExpiredHandler = async () => {
    setExpired(true);
    const date = new Date();
    const startDate = moment(date).subtract(1000, 'days').format('YYYY-MM-DD');
    const endDate = moment(date).subtract(0, 'days').format('YYYY-MM-DD');

    setExpiredStartDate(startDate);
    setExpiredEndDate(endDate);
    fetchCertificates(true, startDate, endDate);
  };

  const onClickExpired30DaysHandler = async () => {
    setExpired(true);
    const date = new Date();
    const startDate = moment(date).add(0, 'days').format('YYYY-MM-DD');
    const endDate = moment(date).add(30, 'days').format('YYYY-MM-DD');

    setExpiredStartDate(startDate);
    setExpiredEndDate(endDate);
    fetchCertificates(true, startDate, endDate);
  };
  const onClickExpired3160DaysHandler = async () => {
    setExpired(true);
    const date = new Date();
    const startDate = moment(date).add(31, 'days').format('YYYY-MM-DD');
    const endDate = moment(date).add(60, 'days').format('YYYY-MM-DD');

    setExpiredStartDate(startDate);
    setExpiredEndDate(endDate);

    fetchCertificates(true, startDate, endDate);
  };

  const onClickExpired6190DaysHandler = async () => {
    const date = new Date();
    const startDate = moment(date).add(61, 'days').format('YYYY-MM-DD');
    const endDate = moment(date).add(90, 'days').format('YYYY-MM-DD');

    setExpiredStartDate(startDate);
    setExpiredEndDate(endDate);

    fetchCertificates(true, startDate, endDate);
  };

  return (
    <>
      <Helmet title="Certificates" />

      <Grid justifyContent="space-between" container spacing={10}>
        <Grid item>
          <Typography variant="h3" gutterBottom display="inline">
            Certificates
          </Typography>

          <CustomBreadcrumbs aria-label="Breadcrumb" mt={2}>
            <Link component={NavLink} to="/">
              Dashboard
            </Link>
            <Typography>Certificates</Typography>
          </CustomBreadcrumbs>
        </Grid>
        <Grid item>
          <div>
            <NavLink to="/private/certificates/add">
              <Button variant="contained" color="primary">
                <AddIcon />
                Add Certificate
              </Button>
            </NavLink>
            <Dropdown style={{ float: 'right' }}>
              <Dropdown.Toggle
                variant="danger"
                id="dropdown-basic"
                style={{ marginLeft: '5px', height: '35px' }}
              >
                Expired
              </Dropdown.Toggle>

              <Dropdown.Menu>
                <Dropdown.Item onClick={onClickAllHandler}>All</Dropdown.Item>
                <Dropdown.Item onClick={onClickExpiredHandler}>
                  Expired
                </Dropdown.Item>
                <Dropdown.Item onClick={onClickExpired30DaysHandler}>
                  Expiring in 30 days
                </Dropdown.Item>
                <Dropdown.Item onClick={onClickExpired3160DaysHandler}>
                  Expiring in 31-60 days
                </Dropdown.Item>

                <Dropdown.Item onClick={onClickExpired6190DaysHandler}>
                  Expiring in 61-90 days
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </div>
        </Grid>
      </Grid>

      <CustomDivider my={6} />
      <Grid container spacing={6}>
        <Grid item xs={12}>
          <CustomDataTable
            columns={COLUMNS}
            rows={certificates}
            loading={loading}
          />
        </Grid>
      </Grid>
    </>
  );
}
