import React, { useEffect, useState, useRef } from 'react';
import { Helmet } from 'react-helmet-async';
import { NavLink, useNavigate, useParams } from 'react-router-dom';
import { Button, Grid, Link, Typography } from '@mui/material';
import { toast } from 'react-toastify';

import ReactToPrint from 'react-to-print';
import { Col } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBuilding } from '@fortawesome/free-regular-svg-icons';
import { fetchGET } from '../../utils/NetworkUtils';
import check from './check.png';
import nochk from './nochk.png';
import { CustomBreadcrumbs } from '../../utils/MUIStyle';
import URLConstants from '../../constants/URLConstants';
import { toMMDDYYYYHHMMDisplay } from '../../utils/Utils';

const PrintAudit = () => {
  const pdfRef = useRef();

  const history = useNavigate();

  console.log('Edit Audit UI Updating.');
  const [auditReport, setAuditReport] = useState(null);
  const [auditTask, setAuditTask] = useState({});
  const [ranswer, setRanswer] = useState({});
  const [items, setItems] = useState([]);

  const { id } = useParams();
  console.log('============================>', ranswer);
  // const [latitude, setLatitude] = useState('32.779167');
  // const [longitude, setLongitude] = useState('-96.808891');
  // const [locationEnabled, setLocationEnabled] = useState(false);

  // const getLocation = () => {
  //   if (!navigator.geolocation) {
  //     console.log(locationEnabled);
  //     console.log('ashish', 'Geolocation is not supported by your browser');
  //     // setStatus('Geolocation is not supported by your browser');
  //   } else {
  //     console.log('ashish', 'Locating');
  //     navigator.geolocation.getCurrentPosition(
  //       (position) => {
  //         // setStatus(null);
  //         setLatitude(position.coords.latitude);
  //         setLongitude(position.coords.longitude);
  //         setLocationEnabled(true);
  //       },
  //       (positionError) => {
  //         console.log('ashish', 'Error', positionError);
  //         setLocationEnabled(false);
  //         // setStatus('Unable to retrieve your location');
  //       }
  //     );
  //   }
  // };
  useEffect(() => {
    // console.log('param is ' + params.id);
    loadAuditReport();
    loadSignatureList();
    // getLocation();
  }, []);

  const loadAuditReport = async () => {
    try {
      const url = `${URLConstants.GET_AUDIT_REPORT_URL}/${id}.json`;
      const response = await fetchGET(url);
      markDefaultAnswer(response.data);
      console.log('after processing item', response.data);
      setAuditReport(response.data);
      setAuditTask(response.data.audit_task);
      setRanswer(response.data.audit_report_answers);
      console.log('Result Answer ======================Gyan', response.data);
      console.log(
        `Result Answer ======================Gyan${JSON.stringify(
          response.data
        )}`
      );
    } catch (error) {
      toast(error.message || 'Failed');
    }
  };

  const loadSignatureList = async () => {
    try {
      console.log(id);
      try {
        const response = await fetchGET(
          `${URLConstants.AUDIT_WORK_AUTHORIZATIONS_URL}?limit=100&page=1&audit_report_id=${id}`
        );
        console.log('response', response.data);
        setItems(response.data);
      } catch (error) {
        toast(error.message || 'Failed');
      }
    } catch (error) {
      console.log('error', error.message);
    }
  };

  const markDefaultAnswer = (item) => {
    console.log('processQuestions ===>', item.audit_task.audit_task_categories);
    console.log('audit_report_answers ===>', item.audit_report_answers);
    item.audit_task.audit_task_categories.forEach((category) => {
      console.log('category id ', category.id);
      category.questions.forEach((question) => {
        console.log('question id ', question.id);

        const temp = item.audit_report_answers.find(
          (x) => x.question_id === question.id
        );
        console.log('-->', temp);
        // if (temp !== undefined) {
        //   question.correct_answer = temp.answer_id;
        //   question.comments = temp.comments;
        //   question.audit_report_answer_id = temp.id;
        //   console.log('question is = ', question);
        // }
        if (temp !== undefined) {
          question.correct_answer = temp.answer_id;
          question.comments = temp.comments;
          question.audit_report_answer_id = temp.id;
          question.photos = temp.photos;
          question.original_photos = temp.photos;
        } else {
          question.answer_id = question.answers[0].id;
          question.correct_answer = question.answers[0].id;
          question.comments = '';
          question.photos = [];

          console.log('ashish undefined =', question);
        }
      });
    });
  };

  // const matchAnswer = (quasid, ansid) => {
  //   console.log('processQuestions ===>', quasid);
  //   console.log('audit_report_answers ===>', ansid);
  //   console.log('Array_answers ===>', ranswer);
  //   // ranswer.forEach((getarray) => {
  //   //   console.log('question id ', getarray);
  //   // });
  // };

  return (
    <>
      <Helmet title="View Question Form" />

      <Grid justifyContent="space-between" container spacing={20}>
        <Grid item>
          <Typography variant="h3" gutterBottom display="inline">
            Audit Report
          </Typography>

          <CustomBreadcrumbs aria-label="Breadcrumb" mt={2}>
            <Link component={NavLink} to="/">
              Dashboard
            </Link>
            <Typography>Audit Report</Typography>
          </CustomBreadcrumbs>
        </Grid>
        <Grid item>
          <div
            style={{
              display: 'flex',
              justifyContent: 'flex-end',
              alignItems: 'center',
            }}
          >
            <Button
              className="btn-sm"
              variant="contained"
              color="primary"
              type="button"
              style={{
                float: 'right',
                marginLeft: 15,
              }}
              onClick={() => {
                history(-1);
              }}
            >
              Back
            </Button>
            <>
              <span>&ensp;</span>
            </>
            <ReactToPrint
              trigger={() => {
                return (
                  <span
                    className="btn-sm btn-info"
                    style={{
                      float: 'right',
                      padding: 7,
                      cursor: 'pointer',
                    }}
                  >
                    Download Report
                  </span>
                );
              }}
              content={() => pdfRef.current}
            />
          </div>
        </Grid>
      </Grid>
      {auditReport && (
        <div
          className="card prt p-4"
          style={{
            marginTop: '30px',
            display: 'flex',
            flexDirection: 'column',
          }}
          ref={pdfRef}
        >
          <div style={{ display: 'table', width: '100%' }}>
            <div className="printhead">
              <div style={{ flex: 1 }}>
                {auditReport.company.primary_logo !== null ? (
                  <img
                    width={150}
                    // className="img-circle elevation-2"
                    src={auditReport.company.primary_logo.url}
                    alt="User Avatar"
                    style={{}}
                  />
                ) : (
                  // <i className="fas fa-building fa-4x" />
                  <FontAwesomeIcon icon={faBuilding} size="4x" />
                )}
              </div>
            </div>
            <div className="printdetail1">
              <p>
                <strong>Audit Name :</strong> <span>{auditReport.name}</span>{' '}
              </p>
              <p>
                <strong>Contractor Name</strong>{' '}
                <span>{auditReport.contactor_name}</span>{' '}
              </p>
              <p>
                <strong>Client Name</strong>{' '}
                <span>
                  {auditReport.client !== null ? auditReport.client.name : ''}
                </span>{' '}
              </p>
              <p>
                <strong>Supervisor</strong>
                <span>
                  {auditReport.supervisor !== null
                    ? `${auditReport.supervisor.user.first_name} ${auditReport.supervisor.user.last_name}`
                    : ''}
                </span>
              </p>
              <p>
                <strong>Auditor</strong>
                <span>{`${auditReport.auditor.first_name} ${auditReport.auditor.last_name}`}</span>
              </p>
              <p>
                <strong>City</strong> <span>{auditReport.city_name}</span>
              </p>
              <p>
                <strong>Location </strong>
                <span>{auditReport.location_1}</span>{' '}
              </p>
              {/* <p> */}
              {/*  <strong>Location 2</strong> */}
              {/*  <span>{auditReport.location_2}</span>{' '} */}
              {/* </p> */}
              <p>
                <strong>Latitude</strong>
                <span>{auditReport.latitude}</span>{' '}
              </p>
              <p>
                <strong>Longitude</strong>
                <span>{auditReport.longitude}</span>{' '}
              </p>
              <p>
                <strong>Date Time</strong>
                <span>
                  {toMMDDYYYYHHMMDisplay(auditReport.audit_date_time)}
                </span>{' '}
              </p>
              {/* <p> */}
              {/*  <strong>Task Observed</strong> */}
              {/*  <span>{auditReport.tasks_observed}</span>{' '} */}
              {/* </p> */}
            </div>

            {auditReport.latitude && (
              <div className="google-map-code">
                {/* eslint-disable-next-line jsx-a11y/iframe-has-title */}
                <iframe
                  width="100%"
                  height="400"
                  frameBorder="0"
                  referrerPolicy="no-referrer-when-downgrade"
                  src={`https://www.google.com/maps/embed/v1/view?key=AIzaSyBQpHfEaNiyKqlj1W1b35XGcTUgY_pp1N4&&center=${auditReport.latitude},${auditReport.longitude}&zoom=18&maptype=satellite`}
                  allowFullScreen
                />
              </div>
            )}
            {/* {renderHeading()} */}
            {auditTask.audit_task_categories?.map((item) => {
              return (
                <>
                  {item.questions.length > 0 && (
                    <div className="categorybox" key={item.id}>
                      <h6>{item.name}</h6>
                      {item.questions?.map((question, qIndex) => {
                        return (
                          <div
                            className="questioncategorybox"
                            key={question.id}
                          >
                            <p>
                              <span className="pill1 mr-3">
                                Q-{+qIndex + 1}
                              </span>
                              <strong>{question.name}</strong>
                            </p>
                            <div className="questionbox">
                              <div className="answerbox">
                                {question.answers?.map((answer) => {
                                  return (
                                    <div className="answeritem">
                                      <div className="answer">
                                        <span>
                                          <strong>{answer.name}</strong>
                                        </span>
                                        <span>
                                          {question.correct_answer ===
                                          answer.id ? (
                                            <img src={check} alt="yes" />
                                          ) : (
                                            <img src={nochk} alt="no" />
                                          )}
                                        </span>
                                      </div>
                                    </div>
                                  );
                                })}
                              </div>
                              <strong className="commentbox">Photos: </strong>
                              <div className="photoselbox">
                                {question.photos?.map((photo) => {
                                  return (
                                    <span
                                      key={photo.id}
                                      data-fancybox
                                      data-src={photo.url}
                                      style={{ cusor: 'pointer' }}
                                    >
                                      <img
                                        width="100"
                                        style={{
                                          alignItems: 'center',
                                          backgroundColor: 'white',
                                        }}
                                        src={
                                          photo.url !== null ? photo.url : ''
                                        }
                                        alt=""
                                      />
                                    </span>
                                  );
                                })}
                              </div>
                              <div className="commentbox">
                                <strong>COMMENT: </strong>
                                <span>{question.comments}</span>
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
            <Col md={12}>
              <div>
                <div
                  style={{
                    backgroundColor: '#dcdcdc',
                    display: 'block',
                    padding: '10px 15px',
                  }}
                />
                <div className="signbox">
                  {items.map((item) => {
                    return (
                      <div className="signitem">
                        {item.team === 'worker' && (
                          <div key={item.id}>
                            {`${item.employee.user.first_name} ${item.employee.user.last_name}`}
                            <div
                              style={{
                                display: 'flex',
                                justifyContent: 'center',
                                width: '100%',
                              }}
                            >
                              <img
                                style={{
                                  width: '120px',
                                  height: 'auto',
                                  alignItems: 'center',
                                  backgroundColor: 'white',
                                }}
                                src={
                                  item.signature !== null
                                    ? item.signature.url
                                    : ''
                                }
                                alt=""
                              />
                            </div>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
                <br />
              </div>
            </Col>
          </div>
        </div>
      )}
    </>
  );
};

export default PrintAudit;
