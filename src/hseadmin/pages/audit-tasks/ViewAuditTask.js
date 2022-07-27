import React, { useEffect, useState } from 'react';
import { Link, NavLink, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Helmet } from 'react-helmet-async';
import { Grid, Typography, Button } from '@mui/material';
import { renderTitleAndContent } from '../../constants/CustomFunction';
import URLConstants from '../../constants/URLConstants';
import { fetchGET } from '../../utils/NetworkUtils';
import { CustomBreadcrumbs, CustomDivider } from '../../utils/MUIStyle';

const ViewAuditTask = () => {
  const [auditTask, setAuditTask] = useState('');

  // const history = useNavigate();

  const { id } = useParams();

  useEffect(() => {
    // console.log('param is ' + params.id);
    loadAuditTask();
  }, []);

  const loadAuditTask = async () => {
    try {
      const url = `${URLConstants.GET_AUDIT_TASK_URL}/${id}.json`;

      console.log('getAuditTask url =', url);

      const response = await fetchGET(url);
      setAuditTask(response.data);
    } catch (error) {
      toast(error.message || 'Failed');
    }
  };

  return (
    <>
      <Helmet title="Edit Audit Task" />

      {auditTask && (
        <Grid justifyContent="space-between" container spacing={10}>
          <Grid item>
            <Typography variant="h3" gutterBottom display="inline">
              {auditTask.name}
            </Typography>

            <CustomBreadcrumbs aria-label="Breadcrumb" mt={2}>
              <Link component={NavLink} to="/">
                Dashboard
              </Link>
              <Link component={NavLink} to="/private/audit-tasks">
                Audit Tasks
              </Link>
              <Typography>{auditTask.name}</Typography>
            </CustomBreadcrumbs>
          </Grid>
          <Grid item>
            <div>
              <NavLink to="/private/audit-tasks">
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
            {/*  &nbsp; Audit Form Details */}
            {/* </h3> */}
            {/* <> */}
            {/*  <Button */}
            {/*    className="btn-sm" */}
            {/*    variant="primary" */}
            {/*    type="button" */}
            {/*    style={{ */}
            {/*      float: 'right', */}
            {/*    }} */}
            {/*    onClick={() => { */}
            {/*      history(-1); */}
            {/*    }} */}
            {/*  > */}
            {/*    Back */}
            {/*  </Button> */}
            {/* </> */}
            {/* </div> */}

            {auditTask && (
              <div className="card-body">
                <dl className="row">
                  {renderTitleAndContent('Name: ', auditTask.name)}
                  {renderTitleAndContent('Short Desc: ', auditTask.short_desc)}
                  {renderTitleAndContent('Description: ', auditTask.long_desc)}
                  {renderTitleAndContent(
                    'Company: ',
                    auditTask.company !== null ? auditTask.company.name : ''
                  )}
                  {/* {renderTitleAndContent( */}
                  {/*  'Division: ', */}
                  {/*  auditTask.division !== null ? auditTask.division.name : '' */}
                  {/* )} */}
                  {/* {renderTitleAndContent( */}
                  {/*  'Project: ', */}
                  {/*  auditTask.job_site !== null ? auditTask.job_site.name : '' */}
                  {/* )} */}
                  {renderTitleAndContent(
                    'Audit Type: ',
                    auditTask.audit_type !== null
                      ? auditTask.audit_type.name
                      : ''
                  )}
                </dl>
              </div>
            )}
          </div>
        </div>
      </div>
      {auditTask.audit_task_categories?.map((item) => {
        return (
          <>
            {item.questions.length > 0 && (
              <div className="categorybox" key={item.id}>
                <h6>{item.name}</h6>
                {item.questions?.map((question, qIndex) => {
                  return (
                    <div className="questioncategorybox" key={question.id}>
                      <p>
                        <span className="pill1 mr-3">Q-{+qIndex + 1}</span>
                        <strong>{question.name}</strong>
                      </p>
                      <div className="questionbox">
                        <div className="answerbox">
                          <span className="pill2">Ans</span>

                          {question.answers?.map((answer) => {
                            return (
                              <div className="answeritem">
                                <ul className="answer">
                                  <li>
                                    <strong>{answer.name}</strong>
                                  </li>
                                </ul>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </>
        );
      })}
    </>
  );
};

export default ViewAuditTask;
