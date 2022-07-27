/* eslint-disable camelcase */

import React, { useEffect } from 'react';
import { Link, NavLink, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Helmet } from 'react-helmet-async';
import { Grid, Typography, Button } from '@mui/material';
import { renderTitleAndContent } from '../../constants/CustomFunction';
import { getTrainingCourseType } from '../../store/actions/training_courses_type';
import { CustomBreadcrumbs, CustomDivider } from '../../utils/MUIStyle';

const ViewTrainingCourseType = () => {
  const dispatch = useDispatch();

  const training_course_type = useSelector(
    (state) => state.trainingCourseType.training_course_type
  );

  const { id } = useParams();

  useEffect(() => {
    // console.log('param is ' + params.id);
    loadTrainingCourseTypeList();
  }, []);

  const loadTrainingCourseTypeList = async () => {
    await dispatch(getTrainingCourseType(id));
  };

  return (
    <>
      <Helmet title="Edit Division" />

      {training_course_type && (
        <Grid justifyContent="space-between" container spacing={10}>
          <Grid item>
            <Typography variant="h3" gutterBottom display="inline">
              {training_course_type.name}
            </Typography>

            <CustomBreadcrumbs aria-label="Breadcrumb" mt={2}>
              <Link component={NavLink} to="/">
                Dashboard
              </Link>
              <Link component={NavLink} to="/private/training-course-types">
                Training Course Type
              </Link>
              <Typography>{training_course_type.name}</Typography>
            </CustomBreadcrumbs>
          </Grid>
          <Grid item>
            <div>
              <NavLink to="/private/training-course-types">
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
            {/*    &nbsp; Training Course Type Details */}
            {/*  </h3> */}
            {/*  <NavLink to="/private/training-course-types"> */}
            {/*    <Button */}
            {/*      className="btn-sm" */}
            {/*      variant="primary" */}
            {/*      type="button" */}
            {/*      style={{ float: 'right' }} */}
            {/*    > */}
            {/*      Back */}
            {/*    </Button> */}
            {/*  </NavLink> */}
            {/* </div> */}

            <div className="card-body">
              <dl className="row">
                {renderTitleAndContent(
                  'Name: ',
                  training_course_type !== null ? training_course_type.name : ''
                )}
                {renderTitleAndContent(
                  'Short Desc: ',
                  training_course_type !== null
                    ? training_course_type.short_desc
                    : ''
                )}
                {renderTitleAndContent(
                  'Long Desc: ',
                  training_course_type !== null
                    ? training_course_type.long_desc
                    : ''
                )}
              </dl>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ViewTrainingCourseType;
