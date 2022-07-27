import React, { useEffect, useState } from 'react';
import { Link, NavLink, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Helmet } from 'react-helmet-async';
import { Grid, Typography, Button } from '@mui/material';
import { renderTitleAndContent } from '../../constants/CustomFunction';

import URLConstants from '../../constants/URLConstants';
import { fetchGET } from '../../utils/NetworkUtils';
import { CustomBreadcrumbs, CustomDivider } from '../../utils/MUIStyle';

const ViewAuditTaskCategories = () => {
  const [auditTaskCategory, setAuditTaskCategory] = useState(null);

  const { id } = useParams();

  useEffect(() => {
    // console.log('param is ' + params.id);
    console.log('useEffect ==> ViewAuditTaskCategory');
    loadAuditTaskCategory();
  }, []);

  const loadAuditTaskCategory = async () => {
    try {
      const url = `${URLConstants.GET_AUDIT_TASK_CATEGORY_URL}/${id}.json`;

      console.log('getAuditTaskCategory url =', url);

      const response = await fetchGET(url);
      setAuditTaskCategory(response.data);
    } catch (error) {
      toast(error.message || 'Failed');
    }
  };

  return (
    <>
      <Helmet title="Edit Division" />

      {auditTaskCategory && (
        <Grid justifyContent="space-between" container spacing={10}>
          <Grid item>
            <Typography variant="h3" gutterBottom display="inline">
              {auditTaskCategory.name}
            </Typography>

            <CustomBreadcrumbs aria-label="Breadcrumb" mt={2}>
              <Link component={NavLink} to="/">
                Dashboard
              </Link>
              <Link component={NavLink} to="/private/audit-task-categories">
                Audit Task Categories
              </Link>
              <Typography>{auditTaskCategory.name}</Typography>
            </CustomBreadcrumbs>
          </Grid>
          <Grid item>
            <div>
              <NavLink to="/private/audit-task-categories">
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
            {/*  &nbsp; Audit Task Category Details */}
            {/* </h3> */}
            {/* <NavLink to="/private/audit-task-categories"> */}
            {/*  <Button */}
            {/*    className="btn-sm" */}
            {/*    variant="primary" */}
            {/*    type="button" */}
            {/*    style={{ float: 'right' }} */}
            {/*  > */}
            {/*    Back */}
            {/*  </Button> */}
            {/* </NavLink> */}
            {/* </div> */}

            {auditTaskCategory && (
              <div className="card-body">
                <dl className="row">
                  {renderTitleAndContent(' Name : ', auditTaskCategory.name)}
                  {renderTitleAndContent(
                    'Audit Tasks : ',
                    auditTaskCategory.audit_tasks.map((item) => {
                      return <p key={item.id}>{item.name}</p>;
                    })
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
export default ViewAuditTaskCategories;
