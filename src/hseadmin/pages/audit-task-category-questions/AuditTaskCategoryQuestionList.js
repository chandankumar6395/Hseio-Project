import { Button, Card, Col, Form, Row, Table } from 'react-bootstrap';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, NavLink } from 'react-router-dom';

import { loadAuditTaskCategoryQuestions } from '../../store/actions/audit_task_category_questions';
import { loadQuestions } from '../../store/actions/questions';
import { toast } from 'react-toastify';
import URLConstants from '../../constants/URLConstants';
import { fetchDELETE } from '../../utils/NetworkUtils';
import CustomPagination from '../../components/CustomPagination';

const AuditTaskCategoryQuestionList = () => {
  const [sort, setSort] = useState('id');
  const [direction, setDirection] = useState('asc');

  const dispatch = useDispatch();

  const [page, setPage] = useState(1);
  const [searchText, setSearchText] = useState('');

  useEffect(() => {
    console.log('inside useEffect search text box');

    const timer = setTimeout(async () => {
      fetchAuditTaskCategoryQuestions();
      fetchQuestions();
    }, 400);

    return () => {
      clearTimeout(timer);
    };
  }, [searchText, sort, direction]);

  const auditTaskCategoryQuestions = useSelector(
    (state) => state.auditTaskCategoryQuestion.auditTaskCategoryQuestions
  );

  const pagination = useSelector(
    (state) => state.auditTaskCategoryQuestion.pagination
  );

  const fetchAuditTaskCategoryQuestions = async () => {
    await dispatch(
      loadAuditTaskCategoryQuestions(1, searchText, sort, direction)
    );
  };
  const fetchQuestions = async () => {
    await dispatch(loadQuestions(1, '', 'name', 'asc', 1, 100));
  };

  const onSearchTextChangeHandler = (event) => {
    setSearchText(event.target.value);
  };

  const loadNextPage = async () => {
    setPage((prevState) => prevState + 1);
    await dispatch(
      loadAuditTaskCategoryQuestions(page + 1, searchText, sort, direction)
    );
  };
  const loadPrevPage = async () => {
    setPage((prevState) => prevState - 1);
    await dispatch(
      loadAuditTaskCategoryQuestions(page - 1, searchText, sort, direction)
    );
  };

  const renderTable = () => {
    return auditTaskCategoryQuestions.map((auditTaskCategoryQuestion) => {
      return (
        <tr key={auditTaskCategoryQuestion.id}>
          <td>{auditTaskCategoryQuestion.question.name}</td>
          <td>{auditTaskCategoryQuestion.audit_task_category.name}</td>
          <td>
            <Link
              to={`/audit-task-category-questions/view/${auditTaskCategoryQuestion.id}`}
            >
              <Button
                variant="dark"
                size="sm"
                style={{
                  marginBottom: '4px',
                  marginRight: '4px',
                  backgroundColor: '#007bff',
                }}
              >
                View
              </Button>
            </Link>
            <Link
              to={`/audit-task-category-questions/edit/${auditTaskCategoryQuestion.id}`}
            >
              <Button
                variant="dark"
                size="sm"
                style={{ marginBottom: '4px', marginRight: '4px' }}
              >
                Edit
              </Button>
            </Link>
            <Button
              variant="dark"
              size="sm"
              style={{ marginBottom: '4px', marginRight: '4px' }}
              onClick={async () => {
                try {
                  const url = `${URLConstants.GET_AUDIT_TASK_CATEGORY_QUESTION_URL}/${auditTaskCategoryQuestion.id}.json`;
                  const response = await fetchDELETE(url);
                  console.log(response);
                  fetchAuditTaskCategoryQuestions();
                } catch (error) {
                  toast(error.message || 'Failed');
                }
              }}
            >
              Delete
            </Button>
          </td>
          {/* http://localhost:3000/indusries/edit/1   */}
        </tr>
      );
    });
  };

  useEffect(() => {}, [sort, direction]);

  const onArrowClickHandler = (title) => {
    setSort(title);
    if (direction === 'asc') {
      setDirection('desc');
    } else {
      setDirection('asc');
    }
  };
  const renderHeaderTitle = (title, sortName) => {
    let arrow = '';

    if (sort === sortName) {
      if (direction === 'asc') {
        arrow = <span>&#8593;</span>;
      } else {
        arrow = <span>&#8595;</span>;
      }
    } else {
      arrow = '';
    }

    return (
      <>
        {title}
        {arrow}
      </>
    );
  };

  return (
    <Row>
      <Col>
        <Card>
          <Card.Header>
            List of Audit Task Category Question
            <NavLink to="/audit-task-category-questions/add">
              <Button
                className="btn-sm"
                variant="primary"
                type="button"
                style={{ float: 'right' }}
              >
                Add Audit Task Category Question
              </Button>
            </NavLink>
          </Card.Header>
          <Card.Body>
            <CustomPagination
              pagination={pagination}
              loadPrevPage={loadPrevPage}
              loadNextPage={loadNextPage}
            />
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Control
                required
                type="text"
                placeholder="Search by name"
                onChange={onSearchTextChangeHandler}
              />
            </Form.Group>
            <div className="table-responsive">
              <Table striped bordered hover>
                <thead>
                  <tr>
                    <th>
                      <span
                        onClick={() => onArrowClickHandler('question_id')}
                        aria-hidden="true"
                      >
                        {renderHeaderTitle('Question', 'questions_id.name')}
                      </span>
                    </th>
                    <th>
                      <span
                        onClick={() =>
                          onArrowClickHandler('audit_task_category_id')
                        }
                        aria-hidden="true"
                      >
                        {renderHeaderTitle(
                          'Audit Task Company',
                          'audit_task_category_id.name'
                        )}
                      </span>
                    </th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>{renderTable()}</tbody>
              </Table>
            </div>
            <CustomPagination
              pagination={pagination}
              loadPrevPage={loadPrevPage}
              loadNextPage={loadNextPage}
            />
          </Card.Body>

          {/* <Card.Footer style={{marginBottom:'10px'}}> */}

          {/* </Card.Footer> */}
        </Card>
      </Col>
    </Row>
  );
};

export default AuditTaskCategoryQuestionList;
