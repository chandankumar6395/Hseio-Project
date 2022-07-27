import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';

import { Helmet } from 'react-helmet-async';
import { Button, Grid, Link, Typography } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { GridActionsCellItem } from '@mui/x-data-grid-pro';
import EditIcon from '@mui/icons-material/Edit';
import TVIcon from '@mui/icons-material/Tv';
import { KEY_COMPANY_ID } from '../../constants/Constants';
import CustomDataTable from '../../components/CustomDataTable';
import CustomPhoneNumberView from '../../components/CustomPhoneNumberView';
import { toMMDDYYYY } from '../../utils/Utils';
import { loadEmployees } from '../../store/actions/employees';
import { CustomBreadcrumbs, CustomDivider } from '../../utils/MUIStyle';

const COLUMNS = [
  { field: 'id', headerName: 'ID', width: 90, hide: true },
  {
    field: 'image',
    headerName: 'Image',
    renderCell: (params) => {
      console.log('params', params);
      // return <img style={{width: '30px', height: 'auto'}}
      //             src={params.row.primary_photo ? params.row.primary_photo.url : ''} alt=""/>
      return (
        <div
          style={{ display: 'flex', justifyContent: 'center', width: '100%' }}
        >
          {params.row.primary_photo !== null && (
            <img
              // className="img-circle elevation-1"
              src={params.row.primary_photo.url}
              alt="User Avatar"
              style={{ width: '50px', height: 'auto' }}
            />
          )}
          {params.row.primary_photo === null && (
            <img
              className="img-circle elevation-1"
              src="/img/default-profile.png"
              alt="User Avatar"
              style={{ width: '50px', height: '50px' }}
            />
          )}
          {/* <img */}
          {/*  style={{ */}
          {/*    width: '50px', */}
          {/*    height: 'auto', */}
          {/*    alignItems: 'center', */}
          {/*    backgroundColor: 'lightgrey', */}
          {/*  }} */}
          {/*  src={params.row.primary_photo ? params.row.primary_photo.url : ''} */}
          {/*  alt="" */}
          {/* /> */}
        </div>
      );
    },
  },
  {
    field: 'user',
    headerName: 'Employee Name',
    width: 150,
    valueFormatter: (params) => {
      const { value } = params;
      return `${value.first_name} ${value.last_name}`;
    },
    renderCell: (params) => {
      const { user } = params.row;
      return <span> {`${user.first_name} ${user.last_name}`}</span>;
    },
  },

  {
    field: 'company',
    headerName: 'Company Name',
    width: 150,
    hide: true,
    valueFormatter: (params) => {
      return params.value ? params.value.name : '';
    },
    renderCell: (params) => {
      const { company } = params.row;
      return <span> {`${company.name}`}</span>;
    },
  },
  // { field: 'emp_number', headerName: 'Employee Number', width: 150 },
  // { field: 'region', headerName: 'Region', width: 100 },
  {
    field: 'personal_mobile_number',
    headerName: 'Mobile ',
    width: 120,
    renderCell: (params) => {
      const value = params.row.personal_mobile_number;
      return (
        <a href={`tel://${value}`}>
          <CustomPhoneNumberView value={value} />
        </a>
      );
    },
  },
  {
    field: 'personal_email_address',
    headerName: 'Email',
    width: 250,
    renderCell: (params) => {
      const { user } = params.row;
      return <a href={`mailto://${user.email}`}>{user.email}</a>;
    },
  },
  {
    field: 'ssn',
    headerName: 'SSN',
    width: 120,
    renderCell: (params) => {
      const { ssn } = params.row;
      return <span>{`${ssn ? ssn.slice(-4) : ''} `}</span>;
    },
  },
  {
    field: 'primary_division',
    headerName: 'Division',
    width: 150,
    valueFormatter: (params) => {
      return params.value ? params.value.name : '';
    },
    renderCell: (params) => {
      const { primary_division: primaryDivision } = params.row;
      return <span> {`${primaryDivision ? primaryDivision.name : ''}`}</span>;
    },
  },
  {
    field: 'joining_date',
    headerName: 'DOH',
    width: 90,
    renderCell: (params) => {
      const { joining_date: joiningDate } = params.row;
      return <span> {`${joiningDate ? toMMDDYYYY(joiningDate) : ''}`}</span>;
    },
  },
  {
    field: 'date_of_birth',
    headerName: 'DOB',
    width: 90,
    renderCell: (params) => {
      const { date_of_birth: date } = params.row;
      return <span> {`${date ? toMMDDYYYY(date) : ''}`}</span>;
    },
  },
  // { field: 'designation', headerName: 'Designation', width: 90 },
  // {
  //   field: 'contractor_start_date',
  //   headerName: 'Contractor Start Date',
  //   width: 90,
  //   renderCell: (params) => {
  //     const { contractor_start_date: date } = params.row;
  //     return <span> {`${date ? toMMDDYYYY(date) : ''}`}</span>;
  //   },
  // },
  // {
  //   field: 'contractor_end_date',
  //   headerName: 'Contractor End Date',
  //   width: 90,
  //   renderCell: (params) => {
  //     const { contractor_end_date: date } = params.row;
  //     return <span> {`${date ? toMMDDYYYY(date) : ''}`}</span>;
  //   },
  // },
  // {
  //   field: 'on_payroll',
  //   headerName: 'Payroll',
  //   width: 90,
  //   renderCell: (params) => {
  //     const { on_payroll: onPayRoll } = params.row;
  //     return (
  //       <span>
  //         {' '}
  //         {onPayRoll ? YES_NO_DATA.find((x) => x.id === onPayRoll).name : ''}
  //       </span>
  //     );
  //   },
  // },
  {
    field: 'employee_status',
    headerName: 'Status',
    width: 90,
    valueFormatter: (params) => {
      return params.value ? params.value.name : '';
    },
    renderCell: (params) => {
      const { employee_status: status } = params.row;
      return <span> {status ? status.name : ''}</span>;
    },
  },
  // { field: 'gender', headerName: 'Gender', width: 90 },
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

const EmployeeListNew = () => {
  // const {id: companyId} = useParams();

  const [loading, setLoading] = useState(false);

  const localDivisionId = useSelector((state) => state.auth.selectedDivision);
  const localCompanyId = localStorage.getItem(KEY_COMPANY_ID);

  console.log(`---------->${JSON.stringify(localCompanyId)}`);

  // const {companyId} = props;
  const dispatch = useDispatch();

  // const [companyId, setCompanyId] = useState(props.companyId);

  useEffect(() => {
    console.log('useEffect Search ==> ViewCompany');
    const timer = setTimeout(async () => {
      if (employees !== null) {
        setLoading(true);
        await dispatch(
          loadEmployees(
            1,
            '',
            'name',
            'asc',
            localCompanyId,
            500,
            localDivisionId
          )
        );
        setLoading(false);
      }
    }, 400);

    return () => {
      clearTimeout(timer);
    };
  }, [localCompanyId, localDivisionId]);

  const employees = useSelector((state) => state.employee.employees);

  return (
    <>
      <Helmet title="Employees" />

      <Grid justifyContent="space-between" container spacing={10}>
        <Grid item>
          <Typography variant="h3" gutterBottom display="inline">
            Employees
          </Typography>

          <CustomBreadcrumbs aria-label="Breadcrumb" mt={2}>
            <Link component={NavLink} to="/">
              Dashboard
            </Link>
            <Typography>Employees</Typography>
          </CustomBreadcrumbs>
        </Grid>
        <Grid item>
          <div>
            <NavLink to="/private/employees/add">
              <Button variant="contained" color="primary">
                <AddIcon />
                Add Employee
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
            rows={employees}
            loading={loading}
          />
        </Grid>
      </Grid>
    </>
  );
};

export default EmployeeListNew;
