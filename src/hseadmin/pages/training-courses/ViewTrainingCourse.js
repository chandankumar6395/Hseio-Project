import React, { useEffect } from 'react';
import { Link, NavLink, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Helmet } from 'react-helmet-async';
import { Grid, Typography, Button } from '@mui/material';
import { renderTitleAndContent } from '../../constants/CustomFunction';
import DocumentList from '../documents/DocumentList';
import { YES_NO_DATA } from '../../constants/Constants';
import { getTrainingCourse } from '../../store/actions/training_courses';
import { CustomBreadcrumbs, CustomDivider } from '../../utils/MUIStyle';

const ViewTrainingCourse = () => {
  const dispatch = useDispatch();

  const trainingCourse = useSelector(
    (state) => state.trainingCourse.training_course
  );

  const { id } = useParams();

  useEffect(() => {
    // console.log('param is ' + params.id);
    loadTrainingCourse();
  }, []);

  const loadTrainingCourse = async () => {
    await dispatch(getTrainingCourse(id));
  };

  return (
    <>
      <Helmet title="Edit Training Course" />

      {trainingCourse && (
        <Grid justifyContent="space-between" container spacing={10}>
          <Grid item>
            <Typography variant="h3" gutterBottom display="inline">
              {trainingCourse.name}
            </Typography>

            <CustomBreadcrumbs aria-label="Breadcrumb" mt={2}>
              <Link component={NavLink} to="/">
                Dashboard
              </Link>
              <Link component={NavLink} to="/private/training-courses">
                Training Courses
              </Link>
              <Typography>{trainingCourse.name}</Typography>
            </CustomBreadcrumbs>
          </Grid>
          <Grid item>
            <div>
              <NavLink to="/private/training-courses">
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
            {/*  &nbsp; Training Course Details */}
            {/* </h3> */}
            {/* <NavLink to="/private/training-courses"> */}
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
            <div className="card-body">
              {trainingCourse && (
                <dl className="row">
                  {renderTitleAndContent('Name: ', trainingCourse.name)}
                  {renderTitleAndContent(
                    'Short Desc :  ',
                    trainingCourse.short_desc
                  )}
                  {renderTitleAndContent(
                    'Long Desc :  ',
                    trainingCourse.long_desc
                  )}
                  {renderTitleAndContent(
                    'Training Course Type : ',
                    trainingCourse.training_course_type &&
                      trainingCourse.training_course_type.name
                  )}
                  {renderTitleAndContent(
                    'Durations : ',
                    trainingCourse.durations
                  )}
                  {renderTitleAndContent(
                    'Recurring :',
                    YES_NO_DATA.find((x) => x.id === trainingCourse.recurring)
                      .name
                  )}
                  {renderTitleAndContent(
                    'Recurring In Days :',
                    trainingCourse.recurring_in_days &&
                      trainingCourse.recurring_in_days
                  )}
                  {renderTitleAndContent(
                    'Mandatory :',
                    YES_NO_DATA.find((x) => x.id === trainingCourse.mandatory)
                      .name
                  )}
                  {renderTitleAndContent(
                    'Issue Certificate :',
                    YES_NO_DATA.find(
                      (x) => x.id === trainingCourse.issue_certificate
                    ).name
                  )}
                  {renderTitleAndContent(
                    'Sample Certificate : ',
                    trainingCourse.sample_certificate &&
                      trainingCourse.sample_certificate.name
                  )}
                  {renderTitleAndContent(
                    'Thumbnail : ',
                    trainingCourse.thumbnail && trainingCourse.thumbnail.name
                  )}
                </dl>
              )}
            </div>
          </div>
        </div>
      </div>
      <DocumentList
        tableName="training_courses"
        columnName="training_course_id"
        value={id}
      />
    </>
  );
};

export default ViewTrainingCourse;
