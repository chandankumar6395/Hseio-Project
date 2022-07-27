import { Col, Form, Row } from 'react-bootstrap';
import React, { useEffect, useState } from 'react';
import { Button } from '@mui/material';
import Select from 'react-select';
import { toast } from 'react-toastify';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { Delete as DeleteIcon } from '@mui/icons-material';
import { DATA_QUESTION_TYPES } from '../../constants/Constants';
import URLConstants from '../../constants/URLConstants';
import { fetchGET, fetchPUT, fetchDELETE } from '../../utils/NetworkUtils';
import { getQuestion } from '../../store/actions/questions';
import CustomSelect from '../../components/widgets/CustomSelect';

const EditQuestionCategoryForm = (props) => {
  const { QuesID, close } = props;
  console.log('=================== Gyan>>>>', QuesID);
  const [type, setType] = useState('');
  const [auditTaskCategoriesOptions, setAuditTaskCategoriesOptions] = useState(
    []
  );
  const [question, setQuestion] = useState();
  const dispatch = useDispatch();
  const [selectedTypeOption, setSelectedTypeOption] = useState({});
  const [questionTitle, setQuestionTitle] = useState('');
  const { id } = useParams();
  useEffect(() => {
    // eslint-disable-next-line camelcase
    if (question != null) {
      setQuestionTitle(question.name);
      setType(question.type);
      setSelectedTypeOption({
        value: question.type,
        label: DATA_QUESTION_TYPES.find((x) => x.value === question.type).label,
      });
      const localOptions = [];

      question.audit_task_categories.forEach((item) => {
        localOptions.push({
          id: item.id,
        });
      });

      setAuditTaskCategoriesOptions(localOptions);
    }
    // eslint-disable-next-line camelcase
  }, [question]);

  useEffect(() => {
    loadQuestion();
  }, []);

  // Load Question Details
  const loadQuestion = async () => {
    try {
      const url = `${URLConstants.GET_QUESTION_URL}/${QuesID}.json`;

      console.log('getQuestion url =', url);

      const response = await fetchGET(url);

      console.log('EditQuestion -->', response.data);

      setQuestion(response.data);
      setNewAnswerArray(response.data.answers);
    } catch (error) {
      toast(error.message || 'Failed');
    }
    await dispatch(getQuestion(id));
  };

  const onEditQuestionSubmit = (event) => {
    console.log('value come here====>');
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }

    const ansArray = [];
    for (let i = 0; i < newAnswerArray.length; i += 1) {
      const answer = newAnswerArray[i];
      console.log('Data Transfer', newAnswerArray[i]);
      answer.name = answer.label;
      answer.label = answer.name;
      if (answer.correct === 1) {
        answer.correct_value = answer.correct;
      } else {
        answer.correct_value = 0;
      }
      answer.value = 1;
      ansArray.push(answer);
    }

    const postData = {
      id: QuesID,
      name: questionTitle,
      type,
      audit_task_categories: auditTaskCategoriesOptions,
      answers: ansArray,
    };

    console.log('Final Post Data', postData);
    postEditQuestion(postData);
  };

  const postEditQuestion = async (data) => {
    console.log('Post Question data=============>', data);
    try {
      const url = `${URLConstants.GET_QUESTION_URL}/${QuesID}.json`;
      await fetchPUT(url, data);
      console.log('Post form data', url);
      close();
      // findQuestionList(auditTaskCategoryId);
      // history('../../private/questions');
    } catch (error) {
      console.log(error);
    }
  };

  const onQuestionTitleChangeHandler = (event) => {
    console.log(event.target.value);
    setQuestionTitle(event.target.value);
  };

  const onTypeChangeHandler = (selectedOption) => {
    // console.log(event.target.value);
    setType(selectedOption.value);
    setSelectedTypeOption(selectedOption);
  };

  const answerInputObject = {
    type: 'text',
    value: '',
    correct: 0,
  };
  const inputArr = [answerInputObject];

  const [newAnswerArray, setNewAnswerArray] = useState(inputArr);
  console.log('Data for edit', newAnswerArray);
  const addInput = () => {
    setNewAnswerArray((prevState) => {
      return [...prevState, answerInputObject];
    });
  };

  const handleAnswerChange = (e) => {
    e.preventDefault();

    console.log(newAnswerArray);
    const index = e.target.id;
    setNewAnswerArray((s) => {
      const newArr = s.slice();
      newArr[index].question_id = QuesID;
      newArr[index].name = e.target.value;
      newArr[index].label = e.target.value;
      newArr[index].value = 1;
      console.log('==================Gyan', newArr);
      // setanswerList(newArr);
      return newArr;
    });
  };

  function checkCorrectAnswer(event) {
    // setcheckCorrectAns(event.target.id);
    const index = +event.target.id;
    const array = [...newAnswerArray];

    for (let i = 0; i < array.length; i += 1) {
      // const answer = array[i];
      console.log('Correct Answer', array[i]);
      console.log('Click Index', index);
      if (index === i) {
        array[i].correct = 1;
        array[i].correct_value = 1;
      } else {
        array[i].correct = 0;
        array[i].correct_value = 0;
      }
    }

    console.log(array);

    setNewAnswerArray(array);
  }

  const deleteAnswerOption = async (clickID, answerId) => {
    try {
      const url = `${URLConstants.GET_ANSWER_URL}/${answerId}.json`;
      await fetchDELETE(url);
    } catch (error) {
      console.log(error);
    }

    const updateAnswerList = [];
    newAnswerArray.forEach(function (element, index) {
      if (clickID !== index) {
        updateAnswerList.push(element);
      }
    });
    console.log('Update List', updateAnswerList);
    setNewAnswerArray(updateAnswerList);
  };

  // @ts-ignore
  // @ts-ignore
  // @ts-ignore
  return (
    <>
      <Row>
        <Col md={12}>
          {/* Job Stages */}
          <Form.Group className="mb-3">
            <Form.Label>Select category </Form.Label>
            <CustomSelect
              params={{
                url: `${URLConstants.AUDIT_TASK_CATEGORIES_URL}`,
                in_audit_task_id: id,
              }}
              onChange={(value) => {
                console.log(value);
                // setAuditTaskCategories(value);
              }}
              entity={props.auditTaskCategory}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Question</Form.Label>
            <Form.Control
              required
              as="textarea"
              rows={2}
              placeholder="Name"
              onChange={onQuestionTitleChangeHandler}
              value={questionTitle}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Type</Form.Label>
            <Select
              options={DATA_QUESTION_TYPES.map((item) => {
                return { value: item.value, label: item.label };
              })}
              onChange={onTypeChangeHandler}
              value={selectedTypeOption}
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
                    value={item.name}
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
                      checked={+item.correct_value === 1}
                    />
                    Correct Answer
                  </label>
                  <DeleteIcon
                    style={{ color: 'red', cursor: 'pointer' }}
                    onClick={() => {
                      deleteAnswerOption(i, item.id);
                    }}
                  />
                </div>
              </Form.Group>
            );
          })}
          <Form.Group className="mb-3">
            <Button
              mr={2}
              variant="contained"
              color="info"
              size="small"
              onClick={addInput}
            >
              Add other answer
            </Button>
          </Form.Group>
        </Col>
      </Row>
      <Button
        variant="contained"
        type="submit"
        color="primary"
        onClick={onEditQuestionSubmit}
      >
        Submit
      </Button>
    </>
  );
};

export default EditQuestionCategoryForm;
