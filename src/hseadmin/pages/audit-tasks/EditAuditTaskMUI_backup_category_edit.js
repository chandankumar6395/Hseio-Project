import { Col, Form, Modal, Row } from 'react-bootstrap';
import React, { useEffect, useState } from 'react';
import styled from '@emotion/styled';
import { Link, NavLink, useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Helmet } from 'react-helmet-async';
import { spacing } from '@mui/system';
import {
  Button,
  Grid,
  Typography,
  Card as MuiCard,
  CardContent,
  Paper,
  CardHeader,
  IconButton,
} from '@mui/material';
import { Edit as EditIcon, Delete as DeleteIcon } from '@mui/icons-material';
import Select from 'react-select';
import { useSelector } from 'react-redux';
import CompanySelect from '../../components/widgets/CompanySelect';
import DivisionSelect from '../../components/widgets/DivisionSelect';
import { DATA_QUESTION_TYPES, KEY_COMPANY_ID } from '../../constants/Constants';
import URLConstants from '../../constants/URLConstants';
import {
  fetchDELETE,
  fetchGET,
  fetchPOST,
  fetchPUT,
} from '../../utils/NetworkUtils';
import JobSiteSelect from '../../components/widgets/JobSiteSelect';
import CustomSelect from '../../components/widgets/CustomSelect';
import { CustomBreadcrumbs, CustomDivider } from '../../utils/MUIStyle';
import EditQuestionCategoryForm from './EditQuestionCategoryForm';
import EditQuestionForm from './EditQuestionForm';

const Card = styled(MuiCard)(spacing);

const EditAuditTaskMUI = () => {
  const localCompanyId = localStorage.getItem(KEY_COMPANY_ID);
  const localDivisionId = useSelector((state) => state.auth.selectedDivision);
  const localJobSiteId = useSelector((state) => state.auth.selectedJobSite);

  console.log('EditAuditTaskMUI localCompanyId', localCompanyId);
  console.log('EditAuditTaskMUI localDivisionId', localDivisionId);
  console.log('EditAuditTaskMUI localJobSiteId', localJobSiteId);

  const [validated, setValidated] = useState(false);
  const history = useNavigate();
  const [name, setName] = useState('');
  const [shortDesc, setShortDesc] = useState('');
  const [longDesc, setLongDesc] = useState('');
  const [companyId, setCompanyId] = useState('');
  const [divisionId, setDivisionId] = useState('');
  const [jobSiteId, setJobSiteId] = useState('');
  const [auditTypeId, setAuditTypeId] = useState('');
  const [auditTask, setAuditTask] = useState(null);
  const [questionTitle, setquestionTitle] = useState(null);
  const [answerList, setanswerList] = useState(null);
  const [getQuestionList, setgetQuestionList] = useState([]);
  const [checkCorrectAns, setcheckCorrectAns] = useState(null);
  const [showCategories, setShowCategories] = useState(false);
  const [showQuestion, setShowQuestion] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [passEditId, setpassEditId] = useState(false);

  const questionCategoriesRef = React.useRef(null);
  const notInAuditTaskQuestionCategoryRef = React.useRef(null);
  const handleClose = () => {
    setShowModal(false);
    setShowCategories(false);
    setShowQuestion(false);
    // fetchJobItems();
  };
  const handleShow = () => setShowModal(true);
  // const params = useParams();
  const { id } = useParams();
  const [questionCategories, setQuestionCategories] = React.useState([]);
  const [auditTaskCategoryId, setAuditTaskCategoryId] = useState(-1);
  const [auditTaskCategoryName, setAuditTaskCategoryName] = useState('');

  const [auditTaskCategory, setAuditTaskCategory] = useState(null);

  const [type, setType] = useState('');
  console.log('llllllllllllllllllll', type);
  useEffect(() => {
    if (auditTask != null) {
      setName(auditTask.name);
      setShortDesc(auditTask.short_desc);
      setLongDesc(auditTask.long_desc);
      setCompanyId(auditTask.company_id);
      setDivisionId(auditTask.division_id);
      setJobSiteId(auditTask.job_site_id);
      setQuestionCategories(auditTask.audit_task_categories);
      setAuditTypeId(auditTask.audit_type_id);
    }
  }, [auditTask]);

  useEffect(() => {
    loadAuditTasks();
    // fetchJobSites();
  }, []);
  // Auidit Task Load Functions
  const loadAuditTasks = async () => {
    try {
      const url = `${URLConstants.GET_AUDIT_TASK_URL}/${id}.json`;
      const response = await fetchGET(url);
      setAuditTask(response.data);
      console.log('Agetting Value', response.data);
    } catch (error) {
      toast(error.message || 'Failed');
    }
  };
  // Auidit Task Submit Functions
  const onAuditTaskSubmit = (event) => {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }

    setValidated(true);
    event.preventDefault();
    const postData = {
      id,
      name,
      short_desc: shortDesc,
      long_desc: longDesc,
      company_id: localCompanyId !== null ? localCompanyId : companyId,
      division_id: divisionId,
      job_site_id: jobSiteId,
      audit_type_id: auditTypeId,
      primary_company_id: localCompanyId !== null ? localCompanyId : companyId,
      // primary_division_id:
      //   localDivisionId !== null ? localDivisionId : divisionId
    };
    postAuditTask(postData);
  };

  const postAuditTask = async (data) => {
    try {
      const url = `${URLConstants.GET_AUDIT_TASK_URL}/${id}.json`;

      await fetchPUT(url, data);

      history('../../private/audit-tasks');
    } catch (error) {
      toast(error.message || 'Failed');
    }
  };

  // Add New Category Name
  const onAuditTaskCategoriesSubmit = (event) => {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      console.log('I am here too');
      event.preventDefault();
      event.stopPropagation();
    } else {
      console.log('I am here');
      event.preventDefault();
      const postData = {
        name: auditTaskCategoryName,
        audit_tasks: [{ id: id }],
      };
      postAuditTaskCategories(postData);
    }
    setValidated(true);
  };

  const postAuditTaskCategories = async (data) => {
    console.log('Submit data===========>', data);
    try {
      await fetchPOST(URLConstants.AUDIT_TASK_CATEGORIES_URL, data);

      const response = await fetchGET(
        `${URLConstants.AUDIT_TASK_CATEGORIES_URL}?in_audit_task_id=${id}`
      );
      console.log('Question Categories', response.data);

      setQuestionCategories(response.data);
      questionCategoriesRef.current();
      //   history('../../private/audit-task-categories');
    } catch (error) {
      console.log(error);
    }
  };

  // Auidit Task Category Add from Dropdown Lisy
  const onAuditTaskCategoriesSubmitLoop = (event) => {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      console.log('I am here too');
      event.preventDefault();
      event.stopPropagation();
    } else {
      console.log('I am here');
      event.preventDefault();
      const postData = {
        id: id,
        audit_task_categories: [{ id: auditTaskCategoryId }],
      };
      postAuditTaskCategoriesMulti(postData);
    }
    setValidated(true);
  };

  const postAuditTaskCategoriesMulti = async (data) => {
    console.log('Submit multi Category data===========>', data);
    const url = `${URLConstants.GET_AUDIT_TASK_URL}/${id}.json`;

    try {
      await fetchPUT(url, data);

      const response = await fetchGET(
        `${URLConstants.AUDIT_TASK_CATEGORIES_URL}?in_audit_task_id=${id}`
      );
      console.log('Question Categories', response.data);

      setQuestionCategories(response.data);
      questionCategoriesRef.current();
      notInAuditTaskQuestionCategoryRef.current();

      //   history('../../private/audit-task-categories');
    } catch (error) {
      console.log(error);
    }
  };

  // Add Category Question with multiple answer
  const onQuestionSubmit = (event) => {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }

    const ansArray = [];
    for (let i = 0; i < answerList.length; i += 1) {
      const temp = answerList[i];
      temp.name = temp.value;
      temp.label = temp.value;
      console.log('=================> My Correct final ans', checkCorrectAns);
      console.log('=================> My Correct final id', i);

      if (+checkCorrectAns === i) {
        console.log('Come in If');
        temp.correct_value = 1;
      } else {
        console.log('Come in else');
        temp.correct_value = 0;
      }
      temp.value = 1;
      ansArray.push(temp);
    }

    setValidated(true);
    event.preventDefault();
    const postData = {
      name: questionTitle,
      type,
      company_id: companyId,
      division_id: divisionId,
      job_site_id: jobSiteId,
      audit_task_categories: [{ id: auditTaskCategoryId }],
      answers: ansArray,
    };
    postQuestion(postData);
  };

  const postQuestion = async (data) => {
    console.log('Post Question data=============>', data);
    try {
      await fetchPOST(URLConstants.QUESTIONS_URL, data);

      findQuestionList(auditTaskCategoryId);
      // history('../../private/questions');
    } catch (error) {
      console.log(error);
    }
  };

  // Show the Question List on select from dropdown
  const findQuestionList = async (catid) => {
    console.log('Post Question catid=============>', catid);
    try {
      const url = `${URLConstants.GET_AUDIT_TASK_CATEGORY_URL}/${catid}`;
      const response = await fetchGET(url);
      setgetQuestionList(response.data.questions);
      console.log('Agetting Value', response.data);
    } catch (error) {
      console.log(error);
    }
  };

  // Handler List
  const onQuestionTitleChangeHandler = (event) => {
    // console.log(event.target.value);
    setquestionTitle(event.target.value);
  };

  const onNameChangeHandler = (event) => {
    // console.log(event.target.value);
    setName(event.target.value);
  };

  const onShortDescChangeHandler = (event) => {
    console.log(event.target.value);
    setShortDesc(event.target.value);
  };
  const onCatNameHandler = (event) => {
    console.log(event.target.value);
    setAuditTaskCategoryName(event.target.value);
  };
  const onLongDescChangeHandler = (event) => {
    console.log(event.target.value);
    setLongDesc(event.target.value);
  };

  // Create array for show multiple answer on click addmore
  const inputArr = [
    {
      type: 'text',
      value: '',
    },
  ];

  const [newAnswerArray, setNewAnswerArray] = useState(inputArr);

  const addInput = () => {
    setNewAnswerArray((prevState) => {
      return [
        ...prevState,
        {
          type: 'text',
          value: '',
        },
      ];
    });
  };

  // Set handler for check correct ans on adding question
  const chkCorrectAns = (event) => {
    setcheckCorrectAns(event.target.id);
  };
  const handleChangeis = (e) => {
    e.preventDefault();

    const index = e.target.id;
    setNewAnswerArray((s) => {
      const newArr = s.slice();
      newArr[index].value = e.target.value;
      console.log('==================Gyan', newArr);
      setanswerList(newArr);
      return newArr;
    });
  };

  // Delete Categories ITem
  const deleteCatItem = async (CatItemId) => {
    try {
      const url = `${URLConstants.GET_AUDIT_TASKS_AUDIT_TASK_CATEGORIES_URL}/${id}.json?audit_task_category_id=${CatItemId}&audit_task_id=${id}`;
      const response = await fetchDELETE(url);
      console.log(response.data);

      const response1 = await fetchGET(
        `${URLConstants.AUDIT_TASK_CATEGORIES_URL}?in_audit_task_id=${id}`
      );
      console.log('Question Categories', response1.data);

      setQuestionCategories(response1.data);
      questionCategoriesRef.current();
      notInAuditTaskQuestionCategoryRef.current();
    } catch (error) {
      toast(error.message || 'Failed');
    }
  };

  // Delete Question  Item
  const deleteQuestionItem = async (QuestionId, CatID) => {
    console.log('CatID======>', CatID);
    console.log('QuestionID======>', QuestionId);
    try {
      const url = `${URLConstants.GET_QUESTION_URL}/${QuestionId}.json`;
      const response = await fetchDELETE(url);
      console.log(response.data);

      findQuestionList(auditTaskCategoryId);
    } catch (error) {
      toast(error.message || 'Failed');
    }
  };

  return (
    <>
      <Helmet title=" Edit Audit Task" />

      <Grid justifyContent="space-between" container spacing={10}>
        <Grid item>
          <Typography variant="h3" gutterBottom display="inline">
            Audit Tasks
          </Typography>

          <CustomBreadcrumbs aria-label="Breadcrumb" mt={2}>
            <Link component={NavLink} to="/">
              Dashboard
            </Link>
            <Link component={NavLink} to="/private/audit-tasks">
              Audit Tasks
            </Link>
            <Typography>Edit Audit Task</Typography>
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

      <CustomDivider my={6} />
      <Grid container spacing={6}>
        <Grid item xs={12}>
          <Card mb={6}>
            <CardContent>
              {auditTask && (
                <Form
                  noValidate
                  validated={validated}
                  onSubmit={onAuditTaskSubmit}
                >
                  {/* Name Field */}
                  <Row>
                    <Col md={6}>
                      <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Name</Form.Label>
                        <Form.Control
                          required
                          type="text"
                          placeholder="Name"
                          onChange={onNameChangeHandler}
                          value={name}
                        />
                        <Form.Control.Feedback type="invalid">
                          Please provide a valid name.
                        </Form.Control.Feedback>
                      </Form.Group>
                    </Col>

                    <Col md={6}>
                      <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Short Desc</Form.Label>
                        <Form.Control
                          type="text"
                          placeholder="Short Desc"
                          onChange={onShortDescChangeHandler}
                          value={shortDesc}
                        />
                      </Form.Group>
                    </Col>

                    <Col md={12}>
                      <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Description</Form.Label>
                        <Form.Control
                          as="textarea"
                          placeholder="Description"
                          onChange={onLongDescChangeHandler}
                          value={longDesc}
                        />
                      </Form.Group>
                    </Col>

                    {/* Company id Field */}
                    {localCompanyId === null && (
                      <Col md={6}>
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                          <Form.Label>Company </Form.Label>
                          {auditTask && (
                            <CompanySelect
                              onChange={(value) => setCompanyId(value)}
                              entity={auditTask.company}
                            />
                          )}
                          <Form.Control.Feedback type="invalid">
                            Please provide a valid name.
                          </Form.Control.Feedback>
                        </Form.Group>
                      </Col>
                    )}

                    {/* Division Field */}
                    {/* {localDivisionId === -1 && ( */}
                    <Col md={6}>
                      <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Division</Form.Label>
                        <DivisionSelect
                          onChange={(value) => setDivisionId(value)}
                          companyId={
                            localCompanyId !== null ? localCompanyId : companyId
                          }
                          entity={auditTask.division}
                        />
                        <Form.Control.Feedback type="invalid">
                          Please provide a valid division.
                        </Form.Control.Feedback>
                      </Form.Group>
                    </Col>
                    {/* )} */}

                    <Col md={6}>
                      {/* Job Site Id */}
                      <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Project</Form.Label>
                        <JobSiteSelect
                          onChange={(value) => setJobSiteId(value)}
                          companyId={companyId}
                          divisionId={divisionId}
                          entity={auditTask.job_site}
                        />
                      </Form.Group>
                    </Col>

                    <Col md={6}>
                      <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Audit Type</Form.Label>
                        <CustomSelect
                          params={{ url: URLConstants.AUDIT_TYPES_URL }}
                          onChange={(value) => {
                            setAuditTypeId(value);
                          }}
                          entity={auditTask.audit_type}
                        />
                      </Form.Group>
                    </Col>
                  </Row>

                  <Button variant="contained" type="submit" color="primary">
                    Submit
                  </Button>
                </Form>
              )}
            </CardContent>
          </Card>
        </Grid>
      </Grid>
      <h5 className="sectitle">Manage Category</h5>
      <Grid container spacing={6}>
        <Grid item xs={6}>
          <Card mb={6} style={{ overflow: 'visible' }}>
            <CardHeader className="cardhead" title="Add Task category" />
            <CardContent>
              <div className="addcatwraper">
                <div className="adgrp">
                  <Form.Group className="mb-3">
                    <Form.Label>Select Task category </Form.Label>
                    <CustomSelect
                      params={{
                        url: `${URLConstants.AUDIT_TASK_CATEGORIES_URL}`,
                        not_in_audit_task_id: id,
                      }}
                      onChange={(value) => {
                        setAuditTaskCategoryId(value);
                      }}
                      customRef={notInAuditTaskQuestionCategoryRef}
                    />
                  </Form.Group>
                  <Button
                    className="mt-10"
                    variant="contained"
                    color="info"
                    onClick={onAuditTaskCategoriesSubmitLoop}
                  >
                    Add
                  </Button>
                </div>
                <h6 className="or">
                  <span>or</span>
                </h6>
                <div className="adgrp">
                  <Form.Group
                    className="mb-3"
                    controlId="formBasicEmail"
                    style={{ flex: '1' }}
                  >
                    <Form.Label>Add Category</Form.Label>
                    <Form.Control type="text" onChange={onCatNameHandler} />
                  </Form.Group>
                  <Button
                    className="mt-10"
                    variant="contained"
                    color="info"
                    onClick={onAuditTaskCategoriesSubmit}
                  >
                    Add
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={6}>
          <Card mb={6}>
            <CardHeader className="cardhead" title="List of category" />
            <CardContent>
              <div className="catwraper">
                <div className="catlist">
                  <ul>
                    {questionCategories.map((quesCategory) => (
                      <li>
                        {/* eslint-disable-next-line jsx-a11y/control-has-associated-label,react/button-has-type */}
                        {quesCategory.name}{' '}
                        <span>
                          <IconButton
                            className="editbtn"
                            aria-label="Edit"
                            size="small"
                            onClick={() => {
                              handleShow();
                              setShowCategories(true);
                              setpassEditId(quesCategory.id);
                            }}
                          >
                            <EditIcon fontSize="small" />
                          </IconButton>
                          <IconButton
                            className="delbtn"
                            aria-label="Delete"
                            size="small"
                          >
                            <DeleteIcon
                              fontSize="small"
                              onClick={() => {
                                deleteCatItem(quesCategory.id);
                              }}
                            />
                          </IconButton>
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
      <h5 className="sectitle">Manage Question</h5>
      <Grid container spacing={6}>
        <Grid item xs={6}>
          <Card mb={6}>
            <CardHeader className="cardhead" title="Add Question/Answer" />
            <CardContent>
              <Paper mt={3}>
                <div className="addqueswraper">
                  <Form.Group className="mb-3">
                    <Form.Label>Select category </Form.Label>
                    <CustomSelect
                      params={{
                        url: `${URLConstants.AUDIT_TASK_CATEGORIES_URL}`,
                        in_audit_task_id: id,
                      }}
                      onChange={(value) => {
                        console.log(
                          'setAuditTaskCategories value --- >',
                          value
                        );
                        setAuditTaskCategoryId(value);

                        const category = questionCategories.find(
                          (x) => x.id === value
                        );
                        setAuditTaskCategory(category);
                        findQuestionList(value);
                      }}
                      customRef={questionCategoriesRef}
                    />
                  </Form.Group>
                  <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Question</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Name"
                      onChange={onQuestionTitleChangeHandler}
                      value={questionTitle}
                    />
                  </Form.Group>
                  <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Type</Form.Label>
                    <Select
                      required
                      options={DATA_QUESTION_TYPES}
                      onChange={(selectedOption) => {
                        console.log(selectedOption);
                        setType(selectedOption.value);
                      }}
                    />
                    <Form.Control.Feedback type="invalid">
                      Please provide a valid name.
                    </Form.Control.Feedback>
                  </Form.Group>

                  {newAnswerArray.map((item, i) => {
                    return (
                      <Form.Group className="mb-3" controlId={i}>
                        <Form.Label>Answer</Form.Label>
                        <div className="adgrp">
                          <Form.Control
                            onChange={handleChangeis}
                            value={item.value}
                            type={item.type}
                          />
                          <label className="applabel">
                            <input
                              type="radio"
                              name="crtanswer"
                              value="1"
                              id={i}
                              onChange={chkCorrectAns}
                              label="Correct Answer"
                            />
                            Correct Answer
                          </label>
                        </div>
                      </Form.Group>
                    );
                  })}

                  <Button
                    mr={2}
                    variant="contained"
                    color="info"
                    size="small"
                    onClick={addInput}
                  >
                    Add other answer
                  </Button>
                  <div className="sub">
                    <Button
                      mr={2}
                      variant="contained"
                      color="primary"
                      size="Large"
                      onClick={onQuestionSubmit}
                    >
                      Submit
                    </Button>
                  </div>
                </div>
              </Paper>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={6}>
          <Card mb={6}>
            <CardHeader className="cardhead" title="Question List" />
            <CardContent>
              <Paper mt={3}>
                <div className="queswraper">
                  <div className="queslist">
                    <ul>
                      {getQuestionList.map((question) => (
                        <li>
                          <div classsName="que">
                            <strong>Question :</strong> {question.name}
                            <span>
                              <IconButton
                                className="editbtn"
                                aria-label="Edit"
                                size="small"
                                onClick={() => {
                                  handleShow();
                                  setShowQuestion(true);
                                  setpassEditId(question.id);
                                }}
                              >
                                <EditIcon fontSize="small" />
                              </IconButton>
                              <IconButton
                                className="delbtn"
                                aria-label="Delete"
                                size="small"
                              >
                                <DeleteIcon
                                  fontSize="small"
                                  onClick={() => {
                                    deleteQuestionItem(question.id, type);
                                  }}
                                />
                              </IconButton>
                            </span>
                          </div>
                          <span>
                            <strong>Ans</strong>
                          </span>
                          <div className="ans">
                            {question.answers?.map((answer) => (
                              <div className="opt">
                                * <span>{answer.name}</span>
                              </div>
                            ))}
                          </div>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </Paper>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
      <Modal style={{ zIndex: '999999' }} show={showModal} onHide={handleClose}>
        <Modal.Header closeButton>
          {/* <Modal.Title>Item Form</Modal.Title> */}
        </Modal.Header>
        <Modal.Body>
          {showQuestion && (
            <EditQuestionForm
              auditTaskCategory={auditTaskCategory}
              QuesID={passEditId}
              close={handleClose}
            />
          )}
          {showCategories && (
            <EditQuestionCategoryForm CatID={passEditId} close={handleClose} />
          )}
        </Modal.Body>
        <Modal.Footer />
      </Modal>
    </>
  );
};

export default EditAuditTaskMUI;
