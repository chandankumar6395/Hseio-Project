import React, { useEffect } from 'react';
import { Link, NavLink, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Helmet } from 'react-helmet-async';
import { Grid, Typography, Button } from '@mui/material';
import { renderTitleAndContent } from '../../constants/CustomFunction';
import { getUser } from '../../store/actions/user';
import { YES_NO_DATA } from '../../constants/Constants';
import { CustomBreadcrumbs, CustomDivider } from '../../utils/MUIStyle';

const ViewUser = () => {
  const dispatch = useDispatch();
  // const history = useNavigate();

  const user = useSelector((state) => state.user.user);

  const { id } = useParams();

  useEffect(() => {
    // console.log('param is ' + params.id);
    loadUser();
  }, []);

  const loadUser = async () => {
    await dispatch(getUser(id));
  };

  return (
    <>
      <Helmet title="View Users" />

      {user && (
        <Grid justifyContent="space-between" container spacing={10}>
          <Grid item>
            <Typography variant="h3" gutterBottom display="inline">
              {`${user.first_name} ${user.last_name}`}
            </Typography>

            <CustomBreadcrumbs aria-label="Breadcrumb" mt={2}>
              <Link component={NavLink} to="/">
                Dashboard
              </Link>
              <Link component={NavLink} to="/private/users">
                Users
              </Link>
              <Typography>{`${user.first_name} ${user.last_name}`}</Typography>
            </CustomBreadcrumbs>
          </Grid>
          <Grid item>
            <div>
              <NavLink to="/private/users">
                <Button variant="contained" color="primary">
                  Back
                </Button>
              </NavLink>
            </div>
          </Grid>
        </Grid>
      )}
      <CustomDivider my={6} />
      <div className="row">
        <div className="col-md-12">
          <div className="card">
            {/* <div className="card-header"> */}
            {/* <h3 className="card-title"> */}
            {/*  <i className="fas fa-text-width" /> */}
            {/*  &nbsp; User Details */}
            {/* </h3> */}
            {/* <> */}
            {/*  <Button */}
            {/*    className="btn-sm" */}
            {/*    variant="primary" */}
            {/*    type="button" */}
            {/*    style={{ float: 'right' }} */}
            {/*    onClick={() => { */}
            {/*      history(-1); */}
            {/*    }} */}
            {/*  > */}
            {/*    Back */}
            {/*  </Button> */}
            {/* </> */}
            {/* </div> */}
            {user && (
              <div className="card-body">
                <dl className="row">
                  {renderTitleAndContent(
                    'Username : ',
                    user !== null ? user.username : ''
                  )}
                  {renderTitleAndContent(
                    'Password :  ',
                    user !== null ? user.password : ''
                  )}
                  {renderTitleAndContent(
                    'Email :  ',
                    user !== null ? user.email : ''
                  )}
                  {renderTitleAndContent(
                    'First Name : ',
                    user !== null ? user.first_name : ''
                  )}
                  {renderTitleAndContent(
                    'Middle Name : ',
                    user !== null ? user.middle_name : ''
                  )}
                  {renderTitleAndContent(
                    'Last Name :',
                    user !== null ? user.last_name : ''
                  )}

                  {/* {renderTitleAndContent( */}
                  {/*  'Active :', */}
                  {/*  user !== null ? user.active : '' */}
                  {/* )} */}
                  {renderTitleAndContent(
                    'Active: ',
                    YES_NO_DATA.find((x) => x.id === user.active).name
                  )}
                  {renderTitleAndContent(
                    'User Status :',
                    user !== null ? user.user_status.name : ''
                  )}
                </dl>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default ViewUser;
