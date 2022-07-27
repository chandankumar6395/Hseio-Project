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
import { fetchGET, fetchPOST } from '../../utils/NetworkUtils';
// import CustomSelect from '../../components/widgets/CustomSelect';
import { KEY_COMPANY_ID } from '../../constants/Constants';
import EmployeeSelect from '../../components/widgets/EmployeeSelect';
import PhotoSelect from '../../components/widgets/PhotoSelect';
import UserSelect from '../../components/widgets/UserSelect';
import { toServerDateTime } from '../../utils/Utils';
import { CustomBreadcrumbs, CustomDivider } from '../../utils/MUIStyle';
import JobSiteSelect from '../../components/widgets/JobSiteSelect';
import CustomSelect from '../../components/widgets/CustomSelect';

const Card = styled(MuiCard)(spacing);
const TextField = styled(MuiTextField)(spacing);

// const CenteredContent = styled.div`
//   text-align: center;
// `;

// const BigAvatar = styled(Avatar)`
//   width: 120px;
//   height: 120px;
//   margin: 0 auto ${(props) => props.theme.spacing(2)};
// `;

const AddAudit = () => {
  const localCompanyId = localStorage.getItem(KEY_COMPANY_ID);
  const localDivisionId = useSelector((state) => state.auth.selectedDivision);
  // const localJobSiteId = useSelector((state) => state.auth.selectedJobSite);

  const [auditTask, setAudtiTask] = useState('');
  // const [questions, setQuestions] = useState([]);
  const [validated, setValidated] = useState(false);
  const [name, setName] = useState('');
  const [contractorName, setContractorName] = useState('');
  const [auditorID, setAuditorID] = useState(-1);
  const [cityName, setCityName] = useState('');
  const { id } = useParams();
  const history = useNavigate();
  const [supervisorId, setSupervisorId] = useState('');
  // const [clientId, setClientId] = useState('');
  const [locationOne, setLocationOne] = useState('');
  const [latitude, setLatitude] = useState('');
  const [longitude, setLongitude] = useState('');
  const [dateTime, setDateTime] = useState('');
  // const [longDesc, setLongDesc] = useState('');
  const [lat, setLat] = useState(null);
  const [lng, setLng] = useState(null);
  const [status, setStatus] = useState(null);
  const [jobSiteId, setJobSiteId] = useState(null);
  const [equipmentId, setEquipmentId] = useState(null);

  const loadcontractorname = async (compid) => {
    try {
      const url = `${URLConstants.GET_COMPANY_URL}/${compid}.json`;
      console.log('URL==>>', url);
      const response = await fetchGET(url);
      // console.log('Companey==>>', response.data.name);
      setContractorName(response.data.name);
    } catch (error) {
      toast(`${error.message}Companey error` || 'Failed');
    }
  };

  useEffect(() => {
    // Get the existing form so we can load the form list
    loadAuditTask();
  }, []);

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
    console.log('categoryIndex', categoryIndex);
    console.log('questionIndex', questionIndex);
    console.log('comments', comments);
    setAudtiTask(temp);
  };

  const processQuestions = (item) => {
    const tempArray = [];

    item.audit_task_categories.forEach((category) => {
      category.questions.forEach((question) => {
        console.log(`id= ${question.id}, name =  ${question.name}`);

        tempArray.push({
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

  const loadAuditTask = async () => {
    try {
      const url = `${URLConstants.VIEW_QUES_FORM}/${id}.json`;
      console.log('URL==>>', url);
      const response = await fetchGET(url);
      console.log('Response==>>', response.data);
      markDefaultAnswer(response.data);
      setAudtiTask(response.data);
      setName(response.data.name);
      loadcontractorname(response.data.company_id);
      // processQuestions(response.data);
    } catch (error) {
      toast(`${error.message}Error1` || 'Failed');
    }
  };

  const markDefaultAnswer = (item) => {
    console.log('processQuestions ===>', item);

    item.audit_task_categories.forEach((category) => {
      // console.log(newIndex);
      category.questions.forEach((question) => {
        question.answer_id = question.answers[0].id;
        question.correct_answer = question.answers[0].id;
      });
    });
  };

  const onAuditFormSubmit = (event) => {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }
    setValidated(true);
    event.preventDefault();
    // console.log("=====================gyan",ViewAuditDet.company)

    if (auditorID === -1) {
      toast(`Select Auditor` || 'Failed');
    } else if (name === '') {
      toast(`Select Auditor` || 'Failed');
    } else {
      const postData = {
        name,
        audit_task_id: +id,
        audit_type_id: +auditTask.audit_type_id,
        contactor_name: contractorName,
        city_name: cityName,
        auditor_id: auditorID,
        latitude: latitude,
        longitude: longitude,
        location_1: locationOne,
        // tasks_observed: longDesc,
        equipment_id: equipmentId,
        company_id:
          localCompanyId !== null ? localCompanyId : auditTask.company_id,
        division_id:
          localDivisionId !== -1 ? localDivisionId : auditTask.division_id,
        job_site_id: jobSiteId,
        // client_id: clientId === -1 ? null : clientId,
        supervisor_id: supervisorId,
        audit_date_time: toServerDateTime(dateTime),
        audit_report_answers: processQuestions(auditTask),
      };
      console.log(postData);
      postAuditReport(postData);
    }
  };

  const postAuditReport = async (data) => {
    try {
      const url = URLConstants.AUDIT_REPORTS_URL;
      const response = await fetchPOST(url, data);
      // history('../../private/audit-tasks');
      history(`/private/edit-audit-form/${response.data.id.id}`);
    } catch (error) {
      toast(`${error.message}Error2` || 'Failed');
    }
  };
  const getLocation = () => {
    if (!navigator.geolocation) {
      setStatus('Geolocation is not supported by your browser');
    } else {
      setStatus('Locating...');
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setStatus(null);
          setLat(position.coords.latitude);
          setLng(position.coords.longitude);
          setLatitude(position.coords.latitude);
          setLongitude(position.coords.longitude);
        },
        () => {
          setStatus('Unable to retrieve your location');
        }
      );
    }
  };
  console.log('Geo Location Status', status);
  useEffect(() => {
    getLocation();
  }, []);
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

  console.log('List', auditTask);

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
                    <Form.Label>Contractor Name *</Form.Label>
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
                  {/* <Form.Group */}
                  {/*  className="mb-3 col-md-6" */}
                  {/*  controlId="formBasicEmail" */}
                  {/* > */}
                  {/*  <Form.Label>Company Name</Form.Label> */}
                  {/*  <CustomSelect */}
                  {/*    params={{ */}
                  {/*      url: URLConstants.CLIENTS_URL, */}
                  {/*    }} */}
                  {/*    onChange={(value) => { */}
                  {/*      setClientId(value); */}
                  {/*    }} */}
                  {/*  /> */}
                  {/* </Form.Group> */}
                  {/* {localJobSiteId === -1 && ( */}
                  {/* JobSite Id */}
                  <Form.Group
                    className="mb-3 col-md-6"
                    controlId="formBasicEmail"
                  >
                    <Form.Label>Project *</Form.Label>
                    <JobSiteSelect
                      onChange={(value) => setJobSiteId(value)}
                      companyId={
                        localCompanyId !== null
                          ? localCompanyId
                          : auditTask.company_id
                      }
                      divisionId={
                        localDivisionId !== -1
                          ? localDivisionId
                          : auditTask.division_id
                      }
                    />
                    <Form.Control.Feedback type="invalid">
                      Please provide a valid jobSite.
                    </Form.Control.Feedback>
                  </Form.Group>
                  {/* )} */}
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
                          : auditTask.company_id
                      }
                    />
                    <Form.Control.Feedback type="invalid">
                      Please provide a valid Company name.
                    </Form.Control.Feedback>
                  </Form.Group>
                  <Form.Group
                    className="mb-3 col-md-6"
                    controlId="formBasicEmail"
                  >
                    <Form.Label>Select Auditor *</Form.Label>
                    <UserSelect
                      onChange={(value) => {
                        setAuditorID(value);
                      }}
                    />
                  </Form.Group>
                  {auditTask.audit_type_id === 1 && (
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
                      />
                      <Form.Control.Feedback type="invalid">
                        Please provide a valid City Name.
                      </Form.Control.Feedback>
                    </Form.Group>
                  )}
                  {auditTask.audit_type_id === 2 && (
                    <Form.Group
                      className="mb-3 col-md-6"
                      controlId="formBasicEmail"
                    >
                      <Form.Label>Equipments *</Form.Label>
                      <CustomSelect
                        params={{
                          url: URLConstants.GET_EQUIPMENT_URL,
                        }}
                        onChange={(value) => {
                          setEquipmentId(value);
                        }}
                      />
                      <Form.Control.Feedback type="invalid">
                        Please provide a valid Incident Type Name.
                      </Form.Control.Feedback>
                    </Form.Group>
                  )}
                  <Form.Group
                    className="mb-3 col-md-6"
                    controlId="formBasicEmail"
                  >
                    <Form.Label>Location </Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Location"
                      onChange={onLocationoneChangeHandler}
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
                      value={lat}
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
                      value={lng}
                    />
                  </Form.Group>
                  <Form.Group
                    className="mb-3 col-md-6"
                    controlId="formBasicEmail"
                  >
                    <Form.Label> Date Time *</Form.Label>
                    <Form.Control
                      type="datetime-local"
                      placeholder="End Date Time"
                      onChange={onDateTimeChangeHandler}
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
                  {/*  /> */}
                  {/* </Form.Group> */}
                  {latitude !== '' && (
                    <div className="google-map-code">
                      {/* eslint-disable-next-line jsx-a11y/iframe-has-title */}
                      <iframe
                        width="100%"
                        height="400"
                        frameBorder="0"
                        referrerPolicy="no-referrer-when-downgrade"
                        src={`https://www.google.com/maps/embed/v1/view?key=AIzaSyBQpHfEaNiyKqlj1W1b35XGcTUgY_pp1N4&&center=${latitude},${longitude}&zoom=18&maptype=satellite`}
                        allowFullScreen
                      />
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>

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
                                      </span>
                                      <strong>{question.name}</strong>
                                    </p>
                                    {question.answers.map((answer, aIndex) => {
                                      return (
                                        <label className="btn mr-3 font-12 color-white">
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
                                        question.photos = values;
                                      }}
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
        </Grid>
      </Form>
    </>
  );
};

export default AddAudit;
