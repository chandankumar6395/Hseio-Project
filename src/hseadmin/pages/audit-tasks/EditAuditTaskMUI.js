import { Col, Form, Modal, Row } from 'react-bootstrap';
import React, { useEffect, useState } from 'react';
import styled from '@emotion/styled';
import { Link, NavLink, useParams } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
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
import CustomSelect from '../../components/widgets/CustomSelect';
import { CustomBreadcrumbs, CustomDivider } from '../../utils/MUIStyle';
import EditQuestionCategoryForm from './EditQuestionCategoryForm';
import EditQuestionForm from './EditQuestionForm';

const Card = styled(MuiCard)(spacing);

const EditAuditTaskMUI = () => {
  const localCompanyId = localStorage.getItem(KEY_COMPANY_ID);
  console.log('NewIncidentMUI localCompanyId', localCompanyId);

  const [validated, setValidated] = useState(false);
  const [name, setName] = useState('');
  const [shortDesc, setShortDesc] = useState('');
  const [longDesc, setLongDesc] = useState('');
  const [companyId, setCompanyId] = useState(localCompanyId);
  const [divisionId, setDivisionId] = useState(null);
  const [auditTypeId, setAuditTypeId] = useState('');
  const [auditTask, setAuditTask] = useState(null);
  const [questionTitle, setQuestionTitle] = useState('');
  // const [answerList, setanswerList] = useState(null);
  const [questionList, setQuestionList] = useState([]);
  // const [checkCorrectAns, setcheckCorrectAns] = useState(null);
  const [showCategories, setShowCategories] = useState(false);
  const [showQuestion, setShowQuestion] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [questionIdToEdit, setQuestionIdToEdit] = useState(false);
  const questionCategoriesRef = React.useRef(null);
  const notInAuditTaskQuestionCategoryRef = React.useRef(null);
  const handleClose = () => {
    setShowModal(false);
    setShowCategories(false);
    setShowQuestion(false);
    findQuestionList(auditTaskCategoryId);
    toast('Question details updated successfully. !');
    // fetchJobItems();
  };
  const handleShow = () => setShowModal(true);
  const { id } = useParams();
  const [questionCategories, setQuestionCategories] = React.useState([]);
  const [auditTaskCategoryId, setAuditTaskCategoryId] = useState('');
  const [auditTaskCategoryName, setAuditTaskCategoryName] = useState('');
  const [auditTaskCategory, setAuditTaskCategory] = useState(null);
  const [type, setType] = useState('');
  useEffect(() => {
    if (auditTask != null) {
      setName(auditTask.name);
      setShortDesc(auditTask.short_desc);
      setLongDesc(auditTask.long_desc);
      setCompanyId(auditTask.company_id);
      setQuestionCategories(auditTask.audit_task_categories);
      setAuditTypeId(auditTask.audit_type_id);
    }
  }, [auditTask]);

  useEffect(() => {
    loadAuditTask();
  }, []);

  // Auidit Task Load Functions
  const loadAuditTask = async () => {
    try {
      const url = `${URLConstants.GET_AUDIT_TASK_URL}/${id}.json`;
      const response = await fetchGET(url);
      setAuditTask(response.data);
    } catch (error) {
      toast(error.message || 'Failed load audit task details');
    }
  };
  // Audit Task Submit Functions
  const onAuditTaskSubmit = (event) => {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }

    setValidated(true);
    event.preventDefault();
    if (name === '') {
      toast('Please Enter audit form Name');
    } else if (companyId === null) {
      toast('Please select Company');
    } else {
      const postData = {
        id,
        name,
        short_desc: shortDesc,
        long_desc: longDesc,
        company_id: localCompanyId !== null ? localCompanyId : companyId,
        division_id: divisionId,
        audit_type_id: auditTypeId,
        primary_company_id:
          localCompanyId !== null ? localCompanyId : companyId,
      };
      postAuditTask(postData);
    }
  };

  const postAuditTask = async (data) => {
    try {
      const url = `${URLConstants.GET_AUDIT_TASK_URL}/${id}.json`;
      await fetchPUT(url, data);
    } catch (error) {
      toast(error.message || 'Audit task updated successfully.');
    }
  };

  // Add New Category Name
  const onAuditTaskCategoriesSubmit = (event) => {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    } else {
      event.preventDefault();
      const postData = {
        name: auditTaskCategoryName,
        company_id: localCompanyId !== null ? localCompanyId : companyId,
        audit_tasks: [{ id: id }],
      };
      postAuditTaskCategories(postData);
    }
    setValidated(true);
  };

  const postAuditTaskCategories = async (data) => {
    try {
      await fetchPOST(URLConstants.AUDIT_TASK_CATEGORIES_URL, data);
      const response = await fetchGET(
        `${URLConstants.AUDIT_TASK_CATEGORIES_URL}?in_audit_task_id=${id}`
      );
      setQuestionCategories(response.data);
      questionCategoriesRef.current();
      toast('Audit task category added successfully.');
    } catch (error) {
      console.log(error);
    }
  };

  // Audit Task Category Add from Dropdown List
  const onAuditTaskCategoriesSubmitLoop = (event) => {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    } else {
      event.preventDefault();
      const postData = {
        id: id,
        company_id: localCompanyId !== null ? localCompanyId : companyId,
        audit_task_categories: [{ id: auditTaskCategoryId }],
      };
      postAuditTaskCategoriesMulti(postData);
    }
    setValidated(true);
  };

  const postAuditTaskCategoriesMulti = async (data) => {
    const url = `${URLConstants.GET_AUDIT_TASK_URL}/${id}.json`;
    try {
      await fetchPUT(url, data);
      const response = await fetchGET(
        `${URLConstants.AUDIT_TASK_CATEGORIES_URL}?in_audit_task_id=${id}`
      );
      setQuestionCategories(response.data);
      questionCategoriesRef.current();
      notInAuditTaskQuestionCategoryRef.current();
      toast('Audit task category added successfully.');
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
    if (type === '') {
      toast('Please select Question Type');
    } else {
      const ansArray = [];
      for (let i = 0; i < newAnswerArray.length; i += 1) {
        const answer = newAnswerArray[i];
        answer.name = answer.value;
        answer.label = answer.value;
        answer.correct_value = answer.correct;
        answer.value = 1;
        ansArray.push(answer);
      }

      setValidated(true);
      event.preventDefault();
      console.log('Type=>', type);

      const postData = {
        name: questionTitle,
        type,
        company_id: companyId,
        audit_task_categories: [{ id: auditTaskCategoryId }],
        answers: ansArray,
      };
      postQuestion(postData);
    }
  };

  const postQuestion = async (data) => {
    try {
      await fetchPOST(URLConstants.QUESTIONS_URL, data);
      setNewAnswerArray([answerInputObject]);
      findQuestionList(auditTaskCategoryId);
      setQuestionTitle('');
      toast('Audit task category question added successfully.');
    } catch (error) {
      console.log(error);
    }
  };

  // Show the Question List on select from dropdown
  const findQuestionList = async (catid) => {
    try {
      const url = `${URLConstants.GET_AUDIT_TASK_CATEGORY_URL}/${catid}`;
      const response = await fetchGET(url);
      setQuestionList(response.data.questions);
      setType('');
    } catch (error) {
      console.log(error);
    }
  };

  // Handler List
  const onQuestionTitleChangeHandler = (event) => {
    // console.log(event.target.value);
    setQuestionTitle(event.target.value);
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

  const answerInputObject = {
    type: 'text',
    value: '',
    correct: 0,
  };
  const inputArr = [answerInputObject];

  const [newAnswerArray, setNewAnswerArray] = useState(inputArr);

  const addInput = () => {
    setNewAnswerArray((prevState) => {
      return [...prevState, answerInputObject];
    });
  };

  // Set handler for check correct ans on adding question
  const checkCorrectAnswer = (event) => {
    // setcheckCorrectAns(event.target.id);
    const index = +event.target.id;
    const array = [...newAnswerArray];

    for (let i = 0; i < array.length; i += 1) {
      const answer = array[i];
      if (index === i) {
        answer.correct = 1;
      } else {
        answer.correct = 0;
      }
    }

    console.log(array);

    setNewAnswerArray(array);
  };
  const handleAnswerChange = (e) => {
    e.preventDefault();

    console.log(newAnswerArray);
    const index = e.target.id;
    setNewAnswerArray((s) => {
      const newArr = s.slice();
      newArr[index].value = e.target.value;
      return newArr;
    });
  };

  const deleteAnswer = (clickID) => {
    const updAnswerList = [];
    newAnswerArray.forEach(function (element, index) {
      if (clickID !== index) {
        updAnswerList.push(element);
      }
    });
    console.log('Update List', updAnswerList);
    setNewAnswerArray(updAnswerList);
  };

  // Delete Categories ITem
  const deleteCategoryItem = async (CatItemId) => {
    try {
      const url = `${URLConstants.GET_AUDIT_TASKS_AUDIT_TASK_CATEGORIES_URL}/${id}.json?audit_task_category_id=${CatItemId}&audit_task_id=${id}`;
      const response = await fetchDELETE(url);
      console.log(response);
      const response1 = await fetchGET(
        `${URLConstants.AUDIT_TASK_CATEGORIES_URL}?in_audit_task_id=${id}`
      );
      setQuestionCategories(response1.data);
      questionCategoriesRef.current();
      notInAuditTaskQuestionCategoryRef.current();
      toast('Audit task category deleted successfully.');
    } catch (error) {
      toast(error.message || 'Failed 2');
    }
  };

  // Delete Question  Item
  const deleteQuestionItem = async (QuestionId) => {
    try {
      const url = `${URLConstants.GET_QUESTION_URL}/${QuestionId}.json`;
      const response = await fetchDELETE(url);
      console.log(response);
      findQuestionList(auditTaskCategoryId);
      toast('Question deleted.');
    } catch (error) {
      toast(error.message || 'Failed 1');
    }
  };

  const maxLongDescCheck = (object) => {
    if (object.target.value.length > object.target.maxLength) {
      object.target.value = object.target.value.slice(
        0,
        object.target.maxLength
      );
    }
  };

  const maxShortDescCheck = (object) => {
    if (object.target.value.length > object.target.maxLength) {
      object.target.value = object.target.value.slice(
        0,
        object.target.maxLength
      );
    }
  };

  return (
    <>
      <Helmet title="Edit Audit Task" />
      <Grid justifyContent="space-between" container spacing={10}>
        <Grid item>
          <Typography variant="h3" gutterBottom display="inline">
            Audit Forms
          </Typography>

          <CustomBreadcrumbs aria-label="Breadcrumb" mt={2}>
            <Link component={NavLink} to="/">
              Dashboard
            </Link>
            <Link component={NavLink} to="/private/audit-tasks">
              Audit Forms
            </Link>
            <Typography>Edit Audit Form</Typography>
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
                        <Form.Label>Name *</Form.Label>
                        <Form.Control
                          required
                          type="text"
                          placeholder="Name *"
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
                          maxLength="255"
                          onInput={maxShortDescCheck}
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
                          maxLength="500"
                          onInput={maxLongDescCheck}
                          placeholder="Long Desc"
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
                    <Col md={6}>
                      {/* Division id */}
                      <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Division Name *</Form.Label>
                        <DivisionSelect
                          onChange={(value) => setDivisionId(value)}
                          companyId={
                            localCompanyId !== null ? localCompanyId : companyId
                          }
                          entity={auditTask.division}
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
        <Grid item md={6} className="gridmob6">
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
        <Grid item md={6} className="gridmob6">
          <Card mb={6}>
            <CardHeader className="cardhead" title="List of category" />
            <CardContent>
              <div className="catwraper">
                <div className="catlist">
                  <ul>
                    {questionCategories.map((quesCategory) => (
                      <li key={quesCategory.id}>
                        {/* eslint-disable-next-line jsx-a11y/control-has-associated-label,react/button-has-type */}
                        {quesCategory.name}{' '}
                        <span>
                          {/* <IconButton */}
                          {/*  className="editbtn" */}
                          {/*  aria-label="Edit" */}
                          {/*  size="small" */}
                          {/*  onClick={() => { */}
                          {/*    handleShow(); */}
                          {/*    setShowCategories(true); */}
                          {/*    setpassEditId(quesCategory.id); */}
                          {/*  }} */}
                          {/* > */}
                          {/*  <EditIcon fontSize="small" /> */}
                          {/* </IconButton> */}
                          <IconButton
                            className="delbtn"
                            aria-label="Delete"
                            size="small"
                            onClick={() => {
                              deleteCategoryItem(quesCategory.id);
                            }}
                          >
                            <DeleteIcon fontSize="small" />
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
        <Grid item md={6} className="gridmob6">
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
                      placeholder="Question"
                      onChange={onQuestionTitleChangeHandler}
                      value={questionTitle}
                    />
                  </Form.Group>
                  <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Question Type</Form.Label>
                    <Select
                      required
                      id="questype"
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
                      // eslint-disable-next-line react/no-array-index-key
                      <Form.Group className="mb-3" controlId={i} key={i}>
                        <Form.Label>Answer</Form.Label>
                        <div className="adgrp">
                          <Form.Control
                            onChange={handleAnswerChange}
                            value={item.value}
                            type={item.type}
                          />
                          <label className="applabel">
                            <input
                              type="radio"
                              name="crtanswer"
                              value="1"
                              id={i}
                              onChange={checkCorrectAnswer}
                              label="Correct Answer"
                              checked={item.correct === 1}
                            />
                            Correct Answer
                          </label>
                          <DeleteIcon
                            style={{ color: 'red', cursor: 'pointer' }}
                            onClick={() => {
                              deleteAnswer(i);
                            }}
                          />
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
        <Grid item md={6} className="gridmob6">
          <Card mb={6}>
            <CardHeader className="cardhead" title="Question List" />
            <CardContent>
              <Paper mt={3}>
                <div className="queswraper">
                  <div className="queslist">
                    <ul>
                      {questionList.map((question) => (
                        <li key={question.id}>
                          <div className="que">
                            <strong>Question :</strong> {question.name}
                            <span>
                              <IconButton
                                className="editbtn"
                                aria-label="Edit"
                                size="small"
                                onClick={() => {
                                  handleShow();
                                  setShowQuestion(true);
                                  setQuestionIdToEdit(question.id);
                                }}
                              >
                                <EditIcon fontSize="small" />
                              </IconButton>
                              <IconButton
                                className="delbtn"
                                aria-label="Delete"
                                size="small"
                                onClick={() => {
                                  deleteQuestionItem(question.id);
                                }}
                              >
                                <DeleteIcon fontSize="small" />
                              </IconButton>
                            </span>
                          </div>
                          <span>
                            <strong>Ans</strong>
                          </span>
                          <div className="ans">
                            {question.answers?.map((answer) => (
                              <div key={answer.id} className="opt">
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
              QuesID={questionIdToEdit}
              close={handleClose}
            />
          )}
          {showCategories && (
            <EditQuestionCategoryForm
              CatID={questionIdToEdit}
              close={handleClose}
            />
          )}
        </Modal.Body>
        <Modal.Footer />
      </Modal>
      <ToastContainer />
    </>
  );
};

export default EditAuditTaskMUI;
