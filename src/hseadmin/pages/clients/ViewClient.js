import React, { useEffect } from 'react';
import { Link, NavLink, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
// import {renderTitleAndContent} from '../../constants/CustomFunction';
// import {Button} from 'react-bootstrap';
import { Helmet } from 'react-helmet-async';
import { Button, Grid, Typography } from '@mui/material';
// import CustomTopSection from '../../components/CustomTopSection';
// import CustomCompanyProfile from '../../components/CustomCompanyProfile';
import CustomClientProfile from '../../components/CustomClientProfile';
import { getClient } from '../../store/actions/clients';
import { CustomBreadcrumbs, CustomDivider } from '../../utils/MUIStyle';

const ViewClient = () => {
  const dispatch = useDispatch();

  const client = useSelector((state) => state.client.client);

  const { id } = useParams();

  useEffect(() => {
    // console.log('param is ' + params.id);
    loadClient();
  }, []);

  const loadClient = async () => {
    await dispatch(getClient(id));
  };

  // const renderLogo = () => {
  //   return (
  //     <>
  //       {client !== null && client.primary_logo !== null && (
  //         // eslint-disable-next-line jsx-a11y/img-redundant-alt
  //         <img
  //           src={client.primary_logo.url}
  //           width={100}
  //           height={100}
  //           style={{backgroundColor: 'grey', padding: '2px'}}
  //           alt="company logo"
  //         />
  //       )}
  //     </>
  //   );
  // };

  // const renderBanner = () => {
  //   return (
  //     <>
  //       {client !== null && client.primary_banner !== null && (
  //         // eslint-disable-next-line jsx-a11y/img-redundant-alt
  //         <img
  //           src={client.primary_banner.url}
  //           height={100}
  //           style={{backgroundColor: 'grey', padding: '2px'}}
  //           alt="employee photo"
  //         />
  //       )}
  //     </>
  //   );
  // };

  return (
    <>
      <Helmet title="View Client" />

      {client && (
        <Grid justifyContent="space-between" container spacing={10}>
          <Grid item>
            <Typography variant="h3" gutterBottom display="inline">
              {client.name}
            </Typography>

            <CustomBreadcrumbs aria-label="Breadcrumb" mt={2}>
              <Link component={NavLink} to="/">
                Dashboard
              </Link>
              <Link component={NavLink} to="/private/clients">
                Client
              </Link>
              <Typography>{client.name}</Typography>
            </CustomBreadcrumbs>
          </Grid>
          <Grid item>
            <div>
              <NavLink to="/private/clients">
                <Button variant="contained" color="primary">
                  Back
                </Button>
              </NavLink>
            </div>
          </Grid>
        </Grid>
      )}
      <CustomDivider my={6} />
      {client && (
        <div>
          {/* <CustomTopSection title={client.name} link="/private/clients" /> */}
          <CustomClientProfile item={client} />
        </div>
      )}
    </>
  );
};

export default ViewClient;
