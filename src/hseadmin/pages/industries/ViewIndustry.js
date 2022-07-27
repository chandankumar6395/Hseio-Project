import React, { useEffect, useState } from 'react';
import { Link, NavLink, useParams } from 'react-router-dom';
// import EmployeeList from '../../pages/employees/EmployeeList';
import { toast } from 'react-toastify';
import { Helmet } from 'react-helmet-async';
import { Grid, Typography, Button } from '@mui/material';
import { renderTitleAndContent } from '../../constants/CustomFunction';
import URLConstants from '../../constants/URLConstants';
import { fetchGET } from '../../utils/NetworkUtils';
import { CustomBreadcrumbs, CustomDivider } from '../../utils/MUIStyle';

const ViewIndustry = () => {
  const [industry, setIndustry] = useState(null);

  // const history = useNavigate();

  const { id } = useParams();

  useEffect(() => {
    loadIndustry();
  }, []);

  const loadIndustry = async () => {
    try {
      const url = `${URLConstants.GET_INDUSTRY_URL}/${id}.json`;

      console.log('getIndustry url =', url);

      const response = await fetchGET(url);
      setIndustry(response.data);
      console.log(response.data);
    } catch (error) {
      toast(error.message || 'Failed');
    }
  };

  return (
    <>
      <Helmet title="Edit Division" />

      {industry && (
        <Grid justifyContent="space-between" container spacing={10}>
          <Grid item>
            <Typography variant="h3" gutterBottom display="inline">
              {industry.name}
            </Typography>

            <CustomBreadcrumbs aria-label="Breadcrumb" mt={2}>
              <Link component={NavLink} to="/">
                Dashboard
              </Link>
              <Link component={NavLink} to="/private/industries">
                Industry
              </Link>
              <Typography>{industry.name}</Typography>
            </CustomBreadcrumbs>
          </Grid>
          <Grid item>
            <div>
              <NavLink to="/private/industries">
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
            {/*  <h3 className="card-title"> */}
            {/*    <i className="fas fa-text-width" /> */}
            {/*    &nbsp; Industry Details */}
            {/*  </h3> */}
            {/*  <> */}
            {/*    <Button */}
            {/*      className="btn-sm" */}
            {/*      variant="primary" */}
            {/*      type="button" */}
            {/*      style={{ */}
            {/*        float: 'right', */}
            {/*      }} */}
            {/*      onClick={() => { */}
            {/*        history(-1); */}
            {/*      }} */}
            {/*    > */}
            {/*      Back */}
            {/*    </Button> */}
            {/*  </> */}
            {/* </div> */}
            {industry && (
              <div className="card-body">
                <dl className="row">
                  {renderTitleAndContent(
                    'Name: ',
                    industry !== null ? industry.name : ''
                  )}
                  {renderTitleAndContent(
                    'Parent Industry: ',
                    industry.parent_industry && industry.parent_industry.name
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

export default ViewIndustry;
