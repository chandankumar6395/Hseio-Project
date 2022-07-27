// eslint-disable-next-line no-unused-vars
import React, { useEffect } from 'react';
import { Link, NavLink, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
// import {renderTitleAndContent} from '../../constants/CustomFunction';
// import {PAY_ROLL_DATA} from '../../constants/Constants';
import { Helmet } from 'react-helmet-async';
import { Button, Grid, Typography } from '@mui/material';
// import CustomTopSection from '../../components/CustomTopSection';
// import CustomViewSectionWithLogo from '../../components/CustomViewSectionWithLogo';
// import CustomEmployeeProfile from '../../components/CustomEmployeeProfile';
import CustomEmployeeProfile from '../../components/CustomEmployeeProfile';
import { getEmployee } from '../../store/actions/employees';
import { CustomBreadcrumbs, CustomDivider } from '../../utils/MUIStyle';
import CertificateList from './CertificateList';

const ViewEmployee = () => {
  const dispatch = useDispatch();

  const employee = useSelector((state) => state.employee.employee);

  const { id } = useParams();

  useEffect(() => {
    // console.log('param is ' + params.id);
    loadEmployee();
  }, []);

  const loadEmployee = async () => {
    await dispatch(getEmployee(id));
  };
  return (
    <>
      <Helmet title="View Employee" />

      {employee && (
        <Grid justifyContent="space-between" container spacing={10}>
          <Grid item>
            <Typography variant="h3" gutterBottom display="inline">
              {`${employee.user.first_name} ${employee.user.last_name}`}
            </Typography>

            <CustomBreadcrumbs aria-label="Breadcrumb" mt={2}>
              <Link component={NavLink} to="/">
                Dashboard
              </Link>
              <Link component={NavLink} to="/private/employees">
                Employee
              </Link>
              <Typography>{`${employee.user.first_name} ${employee.user.last_name}`}</Typography>
            </CustomBreadcrumbs>
          </Grid>
          <Grid item>
            <div>
              <NavLink to="/private/employees">
                <Button variant="contained" color="primary">
                  Back
                </Button>
              </NavLink>
            </div>
          </Grid>
        </Grid>
      )}
      <CustomDivider my={6} />
      {employee && (
        <div>
          {/* <CustomTopSection */}
          {/*  title={`${employee.user.first_name} ${employee.user.last_name}`} */}
          {/*  link="/employees" */}
          {/* /> */}
          {/* <CustomViewSectionWithLogo
            title={`${employee.user.first_name} ${employee.user.last_name}`}
            subTitle={`${employee.designation}`}
            logoUrl={employee.primary_photo.url}
          >
            <dl className="row">
              {renderTitleAndContent('First Name: ', employee.user.first_name)}

              {renderTitleAndContent('Last Name: ', employee.user.last_name)}

              {renderTitleAndContent('Email: ', employee.user.email)}

              {renderTitleAndContent('Company: ', employee.company.name)}

              {renderTitleAndContent('Emp Number: ', employee.emp_number)}

              {renderTitleAndContent('Region: ', employee.region)}

              {renderTitleAndContent(
                'Personal Mobile Number: ',
                employee.personal_mobile_number
              )}

              {renderTitleAndContent(
                'Personal Email Address: ',
                employee.personal_email_address
              )}

              {renderTitleAndContent(
                'Official Mobile Number: ',
                employee.official_mobile_number
              )}

              {renderTitleAndContent(
                'Official Email Address: ',
                employee.official_email_address
              )}

              {renderTitleAndContent('SSN: ', employee.ssn)}

              {renderTitleAndContent('Division: ', employee.division)}

              {renderTitleAndContent('Joining Date: ', employee.joining_date)}

              {renderTitleAndContent('Date of Birth: ', employee.date_of_birth)}

              {renderTitleAndContent('Designation: ', employee.designation)}

              {renderTitleAndContent(
                'Contractor Start Date: ',
                employee.contractor_start_date
              )}

              {renderTitleAndContent(
                'Contactor End Date: ',
                employee.contractor_end_date
              )}

              {renderTitleAndContent(
                'On Payroll: ',
                employee !== null
                  ? PAY_ROLL_DATA.find((x) => x.id === employee.on_payroll).name
                  : ''
              )}
            </dl>
          </CustomViewSectionWithLogo> */}
          <CustomEmployeeProfile item={employee} />
          <CertificateList
            tableName="employees"
            columnName="employee_id"
            employeeId={id}
            companyId={employee.company_id}
          />
        </div>
      )}
    </>
  );
};

export default ViewEmployee;
