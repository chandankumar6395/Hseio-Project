import { Button, Card, Col, Form, Row, Table } from 'react-bootstrap';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, NavLink } from 'react-router-dom';
import { loadQuestions } from '../../store/actions/questions';
import CustomPagination from '../../components/CustomPagination';

const QuestionList = () => {
  const dispatch = useDispatch();

  const [page, setPage] = useState(1);
  const [searchText, setSearchText] = useState('');
  const [sort, setSort] = useState('name');
  const [direction, setDirection] = useState('asc');

  useEffect(() => {}, [sort, direction]);

  const onArrowClickHandler = (title) => {
    setSort(title);
    if (direction === 'asc') {
      setDirection('desc');
    } else {
      setDirection('asc');
    }
  };
  useEffect(() => {
    console.log('inside useEffect search text box');

    const timer = setTimeout(() => {
      fetchQuestions();
    }, 100);

    return () => {
      clearTimeout(timer);
    };
  }, [searchText, sort, direction]);

  const questions = useSelector((state) => state.question.questions);
  const pagination = useSelector((state) => state.question.pagination);

  useEffect(() => {}, []);

  const fetchQuestions = async () => {
    await dispatch(loadQuestions(1, searchText, sort, direction, 5));
  };
  const onSearchTextChangeHandler = (event) => {
    setSearchText(event.target.value);
  };

  const loadNextPage = async () => {
    setPage((prevState) => prevState + 1);
    await dispatch(loadQuestions(page + 1, searchText, sort, direction, 5));
  };
  const loadPrevPage = async () => {
    setPage((prevState) => prevState - 1);
    await dispatch(loadQuestions(page - 1, searchText, sort, direction, 5));
  };

  const renderTable = () => {
    return questions.map((question) => {
      return (
        <tr key={question.id}>
          <td>{question.name}</td>

          <td>
            {question.answers.map((item, index) => {
              return <p key={item.id}>{`${index + 1}. ${item.name}`}</p>;
            })}
          </td>
          <td>
            {question.audit_task_categories.map((item) => {
              return <p key={item.id}>{item.name}</p>;
            })}
          </td>
          <td>{question.type}</td>
          {/* <td>{question.company !== null ? question.company.name : ''}</td> */}
          {/* <td>{question.division !== null ? question.division.name : ''}</td> */}
          {/* <td>{question.job_site !== null ? question.job_site.name : ''}</td> */}
          <td>
            <Link to={`/questions/view/${question.id}`}>
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
            <Link to={`/questions/edit/${question.id}`}>
              <Button
                variant="dark"
                size="sm"
                style={{ marginBottom: '4px', marginRight: '4px' }}
              >
                Edit
              </Button>
            </Link>
          </td>
        </tr>
      );
    });
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
        <>
          {title}
          {arrow}
        </>
      </>
    );
  };

  return (
    <Row>
      <Col md={12}>
        <Card>
          <Card.Header>
            List of Question
            <NavLink to="/questions/add">
              <Button
                className="btn-sm"
                variant="primary"
                type="button"
                style={{ float: 'right' }}
              >
                Add Question
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
                placeholder="Search"
                onChange={onSearchTextChangeHandler}
              />
            </Form.Group>
            <div className="table-responsive">
              <Table striped bordered hover>
                <thead>
                  <tr>
                    <th>
                      <span
                        onClick={() => onArrowClickHandler('name')}
                        aria-hidden="true"
                      >
                        {renderHeaderTitle('Name', 'name')}
                      </span>
                    </th>
                    <th>
                      <span
                        onClick={() => onArrowClickHandler('Answers.name')}
                        aria-hidden="true"
                      >
                        {renderHeaderTitle('Answer', 'Answers.name')}
                      </span>
                    </th>
                    <th>
                      <span
                        onClick={() => onArrowClickHandler('name')}
                        aria-hidden="true"
                      >
                        {renderHeaderTitle('Category', 'name')}
                      </span>
                    </th>
                    <th>
                      <span
                        onClick={() => onArrowClickHandler('type')}
                        aria-hidden="true"
                      >
                        {renderHeaderTitle('Type', 'type')}
                      </span>
                    </th>
                    {/* <th> */}
                    {/*  <span */}
                    {/*    onClick={() => onArrowClickHandler('Companies.name')} */}
                    {/*    aria-hidden="true" */}
                    {/*  > */}
                    {/*    {renderHeaderTitle('Companies Name', 'Companies.name')} */}
                    {/*  </span> */}
                    {/* </th> */}
                    {/* <th> */}
                    {/*  <span */}
                    {/*    onClick={() => onArrowClickHandler('Divisions.name')} */}
                    {/*    aria-hidden="true" */}
                    {/*  > */}
                    {/*    {renderHeaderTitle('Division Name', 'Divisions.name')} */}
                    {/*  </span> */}
                    {/* </th> */}
                    {/* <th> */}
                    {/*  <span */}
                    {/*    onClick={() => onArrowClickHandler('JobSites.name')} */}
                    {/*    aria-hidden="true" */}
                    {/*  > */}
                    {/*    {renderHeaderTitle('JobSite Name', 'JobSites.name')} */}
                    {/*  </span> */}
                    {/* </th> */}
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
        </Card>
      </Col>
    </Row>
  );
};
export default QuestionList;
