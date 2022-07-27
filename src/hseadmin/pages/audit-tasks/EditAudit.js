import React, { useEffect, useState } from 'react';
import { NavLink, useNavigate, useParams } from 'react-router-dom';
import styled from '@emotion/styled';
import { Helmet } from 'react-helmet-async';
import { Form } from 'react-bootstrap';

import {
  Card as MuiCard,
  CardContent,
  CardHeader,
  Grid,
  Link,
  TextField as MuiTextField,
  Typography,
  Button,
} from '@mui/material';

import { spacing } from '@mui/system';
import { toast } from 'react-toastify';
import { useSelector } from 'react-redux';
import URLConstants from '../../constants/URLConstants';
import { fetchGET, fetchPUT } from '../../utils/NetworkUtils';
import UserSelect from '../../components/widgets/UserSelect';
import AuditReportSignatureList from './AuditReportSignatureList';
import { KEY_COMPANY_ID } from '../../constants/Constants';
import EmployeeSelect from '../../components/widgets/EmployeeSelect';
import CustomSelect from '../../components/widgets/CustomSelect';
import PhotoSelect from '../../components/widgets/PhotoSelect';
import { toLocalDateTime, toServerDateTime } from '../../utils/Utils';
import { CustomBreadcrumbs, CustomDivider } from '../../utils/MUIStyle';

const Card = styled(MuiCard)(spacing);
const TextField = styled(MuiTextField)(spacing);

// const CenteredContent = styled.div`
//   text-align: center;
// `;
//
// const BigAvatar = styled(Avatar)`
//   width: 120px;
//   height: 120px;
//   margin: 0 auto ${(props) => props.theme.spacing(2)};
// `;

const EditAudit = () => {
  const localCompanyId = localStorage.getItem(KEY_COMPANY_ID);
  const localDivisionId = useSelector((state) => state.auth.selectedDivision);
  const localJobSiteId = useSelector((state) => state.auth.selectedJobSite);

  console.log('UIIIII');
  const [auditTask, setAudtiTask] = useState('');
  const [auditReport, setAuditReport] = useState([]);
  const [auditReportAnswers, setAuditReportAnswers] = useState([]);
  const [validated, setValidated] = useState(false);
  const [name, setName] = useState('');
  const [contractorName, setContractorName] = useState('');
  const [auditorID, setAuditorID] = useState('');
  const [cityName, setCityName] = useState('');
  const { id } = useParams();
  const history = useNavigate();
  const [supervisorId, setSupervisorId] = useState('');
  const [supervisor, setSupervisor] = useState(null);
  const [clientId, setClientId] = useState('');
  const [locationOne, setLocationOne] = useState('');
  const [latitude, setLatitude] = useState('');
  const [longitude, setLongitude] = useState('');
  const [dateTime, setDateTime] = useState('');
  // const [longDesc, setLongDesc] = useState('');

  useEffect(() => {
    console.log(supervisor);
    // console.log('param is ' + params.id);
    loadAuditReport();
  }, []);

  useEffect(() => {
    console.log('auditTask is ', auditTask);
  }, [auditTask]);

  const updateAuditTask = (categoryIndex, questionIndex, answerId) => {
    const temp = { ...auditTask };

    const category = temp.audit_task_categories[categoryIndex];
    const question = category.questions[questionIndex];
    question.correct_answer = answerId;
    setAudtiTask(temp);
  };

  const updateAuditTaskComment = (categoryIndex, questionIndex, comments) => {
    const temp = { ...auditTask };
    const category = temp.audit_task_categories[categoryIndex];
    const question = category.questions[questionIndex];
    question.comments = comments;
    setAudtiTask(temp);
  };
  const loadAuditReport = async () => {
    try {
      const url = `${URLConstants.GET_AUDIT_REPORT_URL}/${id}.json`;
      const response = await fetchGET(url);
      console.log('Load URL', url);
      markDefaultAnswer(response.data);
      setAuditReport(response.data);
      console.log('======================Gyan', response.data);
    } catch (error) {
      toast(`error1${error.message}` || 'Failed');
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
        console.log('ashish = ', temp);
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
          question.original_photos = [];

          console.log('ashish undefined =', question);
        }
      });
    });
  };

  useEffect(() => {
    if (auditReport != null) {
      setName(auditReport.name);
      setAudtiTask(auditReport.audit_task_id);
      setContractorName(auditReport.contactor_name);
      setCityName(auditReport.city_name);
      setAuditorID(auditReport.auditor_id);
      setAudtiTask(auditReport.audit_task);
      setAuditReportAnswers(auditReport.audit_report_answers);
      setSupervisorId(auditReport.supervisor_id);
      setClientId(auditReport.client_id);
      setLocationOne(auditReport.location_1);
      setLatitude(auditReport.latitude);
      setLongitude(auditReport.longitude);
      // setLongDesc(auditReport.tasks_observed);
      setDateTime(toLocalDateTime(auditReport.audit_date_time));

      setSupervisor(auditReport.supervisor);
    }
  }, [auditReport]);

  useEffect(() => {
    console.log('auditReportAnswers =', auditReportAnswers);
  }, [auditReportAnswers]);

  const onAuditFormSubmit = (event) => {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }
    setValidated(true);
    event.preventDefault();
    // console.log("=====================gyan",ViewAuditDet.company)
    const postData = {
      id: +id,
      name,
      audit_type_id: +auditTask.audit_type_id,
      contactor_name: contractorName,
      city_name: cityName,
      auditor_id: auditorID,
      latitude: latitude,
      longitude: longitude,
      location_1: locationOne,
      // tasks_observed: longDesc,
      company_id:
        localCompanyId !== null ? localCompanyId : auditTask.company_id,
      division_id:
        localDivisionId !== -1 ? localDivisionId : auditTask.division_id,
      job_site_id:
        localJobSiteId !== -1 ? localJobSiteId : auditTask.job_site_id,
      client_id: clientId === -1 ? null : clientId,
      supervisor_id: supervisorId,
      audit_date_time: dateTime !== '' ? toServerDateTime(dateTime) : null,
      audit_report_answers: processQuestions(auditTask),
    };
    console.log(postData);
    postAuditReport(postData);
  };

  const processQuestions = (item) => {
    const tempArray = [];

    item.audit_task_categories.forEach((category) => {
      category.questions.forEach((question) => {
        console.log(`id= ${question.id}, name =  ${question.name}`);

        tempArray.push({
          id: question.audit_report_answer_id,
          audit_task_category_id: category.id,
          question_id: question.id,
          answer_id: question.correct_answer,
          comments: question.comments,
          photos: question.photos !== undefined ? question.photos : [],
        });
      });
    });
    console.log('tempArray ', tempArray);

    return tempArray;
  };

  const postAuditReport = async (data) => {
    try {
      const url = `${URLConstants.GET_AUDIT_REPORT_URL}/${id}.json`;
      await fetchPUT(url, data);
      if (+auditTask.audit_type_id === 1) {
        history(`/private/job-site-audit-reports/${+auditTask.audit_type_id}`);
      } else {
        history(`/private/equipment-audit-reports/${+auditTask.audit_type_id}`);
      }
    } catch (error) {
      toast(`error2${error.message}` || 'Failed');
    }
  };

  const onContractorName = (event) => {
    console.log(event.target.value);
    setContractorName(event.target.value);
  };

  const onCityName = (event) => {
    console.log(event.target.value);
    setCityName(event.target.value);
  };
  const onName = (event) => {
    console.log(event.target.value);
    setName(event.target.value);
  };

  const onLatitudeChangeHandler = (event) => {
    // console.log(event.target.value);
    setLatitude(event.target.value);
  };
  const onLongitudeChangeHandler = (event) => {
    // console.log(event.target.value);
    setLongitude(event.target.value);
  };
  // const onLongDescChangeHandler = (event) => {
  //   console.log(event.target.value);
  //   setLongDesc(event.target.value);
  // };
  const onDateTimeChangeHandler = (event) => {
    console.log(event.target.value);
    setDateTime(event.target.value);
  };
  const onLocationoneChangeHandler = (event) => {
    console.log(event.target.value);
    setLocationOne(event.target.value);
  };

  const updateAuditTaskPhotos = (categoryIndex, questionIndex, photos) => {
    const temp = { ...auditTask };
    const category = temp.audit_task_categories[categoryIndex];
    const question = category.questions[questionIndex];
    question.photos = photos;
    setAudtiTask(temp);
  };

  const updateAuditTaskOriginalPhotos = (
    categoryIndex,
    questionIndex,
    photos
  ) => {
    const temp = { ...auditTask };
    const category = temp.audit_task_categories[categoryIndex];
    const question = category.questions[questionIndex];
    question.original_photos = photos;
    setAudtiTask(temp);
  };
  // const maxLongDescCheck = (object) => {
  //   if (object.target.value.length > object.target.maxLength) {
  //     object.target.value = object.target.value.slice(
  //       0,
  //       object.target.maxLength
  //     );
  //   }
  // };

  return (
    <>
      <Helmet title="Settings" />

      <Grid justifyContent="space-between" container spacing={10}>
        <Grid item>
          <Typography variant="h3" gutterBottom display="inline">
            Perform Audit Task
          </Typography>

          <CustomBreadcrumbs aria-label="Breadcrumb" mt={2}>
            <Link component={NavLink} to="/">
              Dashboard
            </Link>
            <Link component={NavLink} to="/">
              Audit
            </Link>
            <Typography>Perform Audit Task</Typography>
          </CustomBreadcrumbs>
        </Grid>
        <Grid item>
          <>
            <Button
              className="btn-sm"
              variant="contained"
              type="button"
              color="primary"
              style={{ float: 'right' }}
              onClick={() => {
                history(-1);
              }}
            >
              Back
            </Button>
          </>
        </Grid>
      </Grid>
      <CustomDivider my={6} />

      {auditReport && (
        <Form noValidate validated={validated} onSubmit={onAuditFormSubmit}>
          <Grid container>
            <Grid item xs={12}>
              <Card mb={6}>
                <CardContent>
                  <div className="row">
                    <Form.Group
                      className="mb-3 col-md-6"
                      controlId="formBasicEmail"
                    >
                      <Form.Label>Audit Task Name</Form.Label>
                      <Form.Control
                        required
                        type="text"
                        placeholder="Name"
                        onChange={onName}
                        value={name}
                      />
                      <Form.Control.Feedback type="invalid">
                        Please provide a valid Name.
                      </Form.Control.Feedback>
                    </Form.Group>

                    <Form.Group
                      className="mb-3 col-md-6"
                      controlId="formBasicEmail"
                    >
                      <Form.Label>Contractor Name</Form.Label>
                      <Form.Control
                        required
                        type="text"
                        placeholder="Contractor Name"
                        onChange={onContractorName}
                        value={contractorName}
                      />
                      <Form.Control.Feedback type="invalid">
                        Please provide a valid Contractor Name.
                      </Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group
                      className="mb-3 col-md-6"
                      controlId="formBasicEmail"
                    >
                      <Form.Label>Client Name</Form.Label>
                      <CustomSelect
                        params={{
                          url: URLConstants.CLIENTS_URL,
                        }}
                        onChange={(value) => {
                          setClientId(value);
                        }}
                        entity={auditReport.client}
                      />
                    </Form.Group>
                    <Form.Group
                      className="mb-3 col-md-6"
                      controlId="formBasicEmail"
                    >
                      <Form.Label>Select Supervisor</Form.Label>
                      <EmployeeSelect
                        onChange={(value) => {
                          setSupervisorId(value);
                        }}
                        companyId={
                          localCompanyId !== null
                            ? localCompanyId
                            : auditReport.company_id
                        }
                        entity={auditReport.supervisor}
                      />
                      <Form.Control.Feedback type="invalid">
                        Please provide a valid Company name.
                      </Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group
                      className="mb-3 col-md-6"
                      controlId="formBasicEmail"
                    >
                      <Form.Label>Select Auditor</Form.Label>
                      <UserSelect
                        onChange={(value) => {
                          setAuditorID(value);
                        }}
                        entity={auditReport.auditor}
                      />
                    </Form.Group>
                    <Form.Group
                      className="mb-3 col-md-6"
                      controlId="formBasicEmail"
                    >
                      <Form.Label>City</Form.Label>
                      <Form.Control
                        required
                        type="text"
                        placeholder="City"
                        onChange={onCityName}
                        value={cityName}
                      />
                      <Form.Control.Feedback type="invalid">
                        Please provide a valid City Name.
                      </Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group
                      className="mb-3 col-md-6"
                      controlId="formBasicEmail"
                    >
                      <Form.Label>Location </Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="Location"
                        onChange={onLocationoneChangeHandler}
                        value={locationOne}
                      />
                    </Form.Group>
                    {/* Latitude Field */}
                    <Form.Group
                      className="mb-3 col-md-6"
                      controlId="formBasicEmail"
                    >
                      <Form.Label>Latitude</Form.Label>
                      <Form.Control
                        type="number"
                        placeholder="Latitude"
                        onChange={onLatitudeChangeHandler}
                        value={latitude}
                      />
                    </Form.Group>
                    <Form.Group
                      className="mb-3 col-md-6"
                      controlId="formBasicEmail"
                    >
                      <Form.Label>Longitude</Form.Label>
                      <Form.Control
                        type="number"
                        placeholder="Longitude"
                        onChange={onLongitudeChangeHandler}
                        value={longitude}
                      />
                    </Form.Group>
                    <Form.Group
                      className="mb-3 col-md-6"
                      controlId="formBasicEmail"
                    >
                      <Form.Label> Date Time</Form.Label>
                      <Form.Control
                        type="datetime-local"
                        placeholder="End Date Time"
                        onChange={onDateTimeChangeHandler}
                        value={dateTime}
                      />
                    </Form.Group>

                    {/* <Form.Group */}
                    {/*  className="mb-3 col-md-6" */}
                    {/*  controlId="formBasicEmail" */}
                    {/* > */}
                    {/*  <Form.Label>Task Observed</Form.Label> */}
                    {/*  <Form.Control */}
                    {/*    as="textarea" */}
                    {/*    maxLength="500" */}
                    {/*    onInput={maxLongDescCheck} */}
                    {/*    placeholder="Task Observed" */}
                    {/*    onChange={onLongDescChangeHandler} */}
                    {/*    value={longDesc} */}
                    {/*  /> */}
                    {/* </Form.Group> */}
                    {/* <Grid item md={4}> */}
                    {/*  <CenteredContent> */}
                    {/*    <BigAvatar */}
                    {/*      alt="Remy Sharp" */}
                    {/*      src="/static/img/avatars/avatar-1.jpg" */}
                    {/*    /> */}
                    {/*    <Typography */}
                    {/*      variant="caption" */}
                    {/*      display="block" */}
                    {/*      gutterBottom */}
                    {/*    > */}
                    {/*      Audit By Name */}
                    {/*    </Typography> */}
                    {/*  </CenteredContent> */}
                    {/* </Grid> */}
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
                  </div>
                </CardContent>
              </Card>
            </Grid>

            {auditTask && (
              <Grid container spacing={12}>
                {auditTask.audit_task_categories?.map((item, catIndex) => {
                  return (
                    <>
                      {item.questions.length > 0 && (
                        <Grid item md={12} className="gridmob6">
                          <Card mb={1}>
                            <CardHeader
                              style={{ backgroundColor: '#eeeeee' }}
                              title={item.name}
                            />
                            <CardContent>
                              {item.questions.map((question, qIndex) => {
                                return (
                                  <div
                                    className="sho"
                                    style={{
                                      borderBottom: 'solid 1px #eee',
                                      paddingBottom: '15px',
                                      marginBottom: '15px',
                                    }}
                                    key={question.id}
                                  >
                                    <p>
                                      <span className="pill1 mr-3">
                                        Q-{+qIndex + 1}
                                      </span>{' '}
                                      <strong>{question.name}</strong>
                                    </p>
                                    {question.answers.map((answer, aIndex) => {
                                      return (
                                        <label
                                          className="btn mr-3 font-12 color-white"
                                          key={answer.id}
                                        >
                                          <input
                                            className={`mr-${aIndex}`}
                                            id={`ans-${question.id}`}
                                            name={`ans-${question.id}`}
                                            type="Radio"
                                            checked={
                                              question.correct_answer ===
                                              answer.id
                                            }
                                            value={answer.id}
                                            onClick={(event) => {
                                              updateAuditTask(
                                                catIndex,
                                                qIndex,
                                                +event.target.value
                                              );
                                            }}
                                            onChange={() => {}}
                                          />
                                          {answer.name}
                                        </label>
                                      );
                                    })}
                                    <TextField
                                      style={{ width: '100%' }}
                                      id={`comment${question.id}`}
                                      label="COMMENT"
                                      type="text"
                                      m={2}
                                      mx={0}
                                      value={
                                        question.comments
                                          ? question.comments
                                          : ''
                                      }
                                      onChange={(event) => {
                                        updateAuditTaskComment(
                                          catIndex,
                                          qIndex,
                                          event.target.value
                                        );
                                      }}
                                    />
                                    <PhotoSelect
                                      onChange={(values) => {
                                        console.log('values is ', values);

                                        updateAuditTaskPhotos(
                                          catIndex,
                                          qIndex,
                                          values
                                        );
                                      }}
                                      onOriginalChange={(values) => {
                                        console.log('values is ', values);
                                        updateAuditTaskOriginalPhotos(
                                          catIndex,
                                          qIndex,
                                          values
                                        );
                                      }}
                                      entities={question.original_photos}
                                    />
                                  </div>
                                );
                              })}
                            </CardContent>
                          </Card>
                        </Grid>
                      )}
                    </>
                  );
                })}
                <Grid item md={12}>
                  <Card mb={1}>
                    <CardContent>
                      <AuditReportSignatureList
                        auditReportId={id}
                        companyId={auditTask.company_id}
                      />
                    </CardContent>
                  </Card>
                </Grid>
                <Grid item md={12}>
                  <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    mt={3}
                  >
                    Save Audit Report
                  </Button>
                </Grid>
              </Grid>
            )}
          </Grid>
        </Form>
      )}
    </>
  );
};

export default EditAudit;
