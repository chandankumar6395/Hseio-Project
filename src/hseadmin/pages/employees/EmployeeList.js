/* eslint-disable no-unused-vars */
import {
  Button,
  Card,
  Col,
  Form,
  FormControl,
  InputGroup,
  Row,
  Table,
} from 'react-bootstrap';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  Link,
  NavLink,
  useLocation,
  useNavigate,
  useParams,
} from 'react-router-dom';
import CustomSearchComponent from '../../components/CustomSearchComponent';
import { KEY_COMPANY_ID } from '../../constants/Constants';
import { loadEmployees } from '../../store/actions/employees';
import CustomPagination from '../../components/CustomPagination';

const COLUMNS = [{}];

const EmployeeList = (props) => {
  // const {id: companyId} = useParams();

  const localDivisionId = useSelector((state) => state.auth.selectedDivision);
  const localCompanyId = localStorage.getItem(KEY_COMPANY_ID);

  console.log(`---------->${JSON.stringify(localCompanyId)}`);

  // const {companyId} = props;
  const dispatch = useDispatch();
  const [sort, setSort] = useState('name');
  const [direction, setDirection] = useState('asc');

  const [page, setPage] = useState(1);
  const [searchText, setSearchText] = useState('');

  // const [companyId, setCompanyId] = useState(props.companyId);

  useEffect(() => {
    console.log('useEffect Search ==> ViewCompany');
    const timer = setTimeout(async () => {
      if (employees !== null) {
        await dispatch(
          loadEmployees(
            1,
            searchText,
            sort,
            direction,
            localCompanyId,
            5,
            localDivisionId
          )
        );
      }
    }, 400);

    return () => {
      clearTimeout(timer);
    };
  }, [searchText, localCompanyId, sort, direction, localDivisionId]);

  const employees = useSelector((state) => state.employee.employees);
  const pagination = useSelector((state) => state.employee.pagination);

  useEffect(() => {
    // console.log('useEffect ==> ViewCompany');
    // fetchEmployees();
    // if (props.companyId !== undefined) {
    //   // setCompanyId(props.companyId);
    // }
  }, [localDivisionId]);

  const fetchEmployees = async () => {
    await dispatch(
      loadEmployees(
        1,
        searchText,
        sort,
        direction,
        localCompanyId,
        5,
        localDivisionId
      )
    );
  };

  const onSearchTextChangeHandler = (event) => {
    setSearchText(event.target.value);
  };

  const loadNextPage = async () => {
    setPage((prevState) => prevState + 1);
    await dispatch(
      loadEmployees(
        page + 1,
        searchText,
        sort,
        direction,
        localCompanyId,
        5,
        localDivisionId
      )
    );
  };
  const loadPrevPage = async () => {
    setPage((prevState) => prevState - 1);
    await dispatch(
      loadEmployees(
        page - 1,
        searchText,
        sort,
        direction,
        localCompanyId,
        5,
        localDivisionId
      )
    );
  };

  const renderTable = () => {
    return employees.map((employee) => {
      return (
        <tr key={employee.id}>
          {/* <td>{employee.id}</td> */}
          <td>
            {employee.primary_photo !== null && (
              <img
                src={employee.primary_photo.url}
                width={100}
                height={100}
                style={{
                  backgroundColor: 'white',
                  padding: '2px',
                  borderRadius: '10px',
                }}
                alt="company logo"
              />
            )}
          </td>
          <td>{employee.user.first_name}</td>
          <td>{employee.user.last_name}</td>
          <td>{employee.user.email}</td>
          <td>{employee.company.name}</td>
          <td>{employee.emp_number}</td>
          {/* <td>{employee.region}</td> */}
          {/* <td>{employee.personal_mobile_number}</td> */}
          {/* <td>{employee.personal_email_address}</td> */}
          {/* <td>{employee.official_mobile_number}</td> */}
          {/* <td>{employee.official_email_address}</td> */}
          {/* <td>{employee.ssn}</td> */}
          {/* <td>{employee.division}</td> */}
          {/* <td>{employee.joining_date}</td> */}
          {/* <td>{employee.date_of_birth}</td> */}
          {/* <td>{employee.designation}</td> */}
          {/* <td>{employee.contractor_start_date}</td> */}
          {/* <td>{employee.contractor_end_date}</td> */}
          {/* <td>{employee.on_payroll}</td> */}
          <td>
            <Link to={`/employees/view/${employee.id}`}>
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

            <Link to={`/employees/edit/${employee.id}`}>
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

  useEffect(() => {
    // console.log('useEffect inside sort and direction');
    // if (employees !== null) {
    //   dispatch(loadEmployees(1, searchText, sort, direction, companyId, 5));
    // }
  }, [sort, direction]);

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
            List of Employee
            <NavLink to="/employees/add">
              <Button
                className="btn-sm"
                variant="primary"
                type="button"
                style={{ float: 'right' }}
              >
                Add Employee
              </Button>
            </NavLink>
          </Card.Header>

          <Card.Body>
            <CustomPagination
              pagination={pagination}
              loadPrevPage={loadPrevPage}
              loadNextPage={loadNextPage}
            />
            <CustomSearchComponent onSearch={onSearchTextChangeHandler} />
            {/* <Form.Group className="mb-3" controlId="formBasicEmail"> */}
            {/*  <Form.Control */}
            {/*    required */}
            {/*    type="text" */}
            {/*    placeholder="Search" */}
            {/*    onChange={onSearchTextChangeHandler} */}
            {/*  /> */}
            {/* </Form.Group> */}

            <div className="table-responsive">
              <Table striped bordered hover>
                <thead>
                  <tr>
                    {/* <th> */}
                    {/*  <span */}
                    {/*    onClick={() => onArrowClickHandler('id')} */}
                    {/*    aria-hidden="true" */}
                    {/*  > */}
                    {/*    {renderHeaderTitle('ID', 'id')} */}
                    {/*  </span> */}
                    {/* </th> */}
                    <th>Photo</th>

                    {/* First Name */}
                    <th>
                      <span
                        onClick={() => onArrowClickHandler('Users.first_name')}
                        aria-hidden="true"
                      >
                        {renderHeaderTitle('First Name', 'Users.first_name')}
                      </span>
                    </th>
                    <th>
                      <span
                        onClick={() => onArrowClickHandler('Users.last_name')}
                        aria-hidden="true"
                      >
                        {renderHeaderTitle('Last Name', 'Users.last_name')}
                      </span>
                    </th>
                    <th>
                      <span
                        onClick={() => onArrowClickHandler('Users.email')}
                        aria-hidden="true"
                      >
                        {renderHeaderTitle('Email', 'Users.email')}
                      </span>
                    </th>
                    <th>
                      <span
                        onClick={() => onArrowClickHandler('Companies.name')}
                        aria-hidden="true"
                      >
                        {renderHeaderTitle('Company Name', 'Companies.name')}
                      </span>
                    </th>
                    <th>
                      <span
                        onClick={() => onArrowClickHandler('emp_number')}
                        aria-hidden="true"
                      >
                        {renderHeaderTitle('Employee Number', 'emp_number')}
                      </span>
                    </th>
                    {/* <th> */}
                    {/*  <span */}
                    {/*    onClick={() => onArrowClickHandler('region')} */}
                    {/*    aria-hidden="true" */}
                    {/*  > */}
                    {/*    {renderHeaderTitle('Region', 'region')} */}
                    {/*  </span> */}
                    {/* </th> */}
                    {/* <th>Personal Mobile Number</th> */}
                    {/* <th> */}
                    {/*  <span */}
                    {/*    onClick={() => */}
                    {/*      onArrowClickHandler('personal_email_address') */}
                    {/*    } */}
                    {/*    aria-hidden="true" */}
                    {/*  > */}
                    {/*    {renderHeaderTitle( */}
                    {/*      'Personal Email Address', */}
                    {/*      'personal_email_address' */}
                    {/*    )} */}
                    {/*  </span> */}
                    {/* </th> */}
                    {/* <th>Official Mobile Number</th> */}
                    {/* <th> */}
                    {/*  <span */}
                    {/*    onClick={() => */}
                    {/*      onArrowClickHandler('official_email_address') */}
                    {/*    } */}
                    {/*    aria-hidden="true" */}
                    {/*  > */}
                    {/*    {renderHeaderTitle( */}
                    {/*      'Official Email Address', */}
                    {/*      'official_email_address' */}
                    {/*    )} */}
                    {/*  </span> */}
                    {/* </th> */}
                    {/* <th>SSN</th> */}
                    {/* <th>Division</th> */}
                    {/* <th> */}
                    {/*  <span */}
                    {/*    onClick={() => onArrowClickHandler('joining_date')} */}
                    {/*    aria-hidden="true" */}
                    {/*  > */}
                    {/*    {renderHeaderTitle('Joining Date', 'joining_date')} */}
                    {/*  </span> */}
                    {/* </th> */}
                    {/* <th> */}
                    {/*  <span */}
                    {/*    onClick={() => onArrowClickHandler('date_of_birth')} */}
                    {/*    aria-hidden="true" */}
                    {/*  > */}
                    {/*    {renderHeaderTitle('Date of Birth', 'date_of_birth')} */}
                    {/*  </span> */}
                    {/* </th> */}
                    {/* <th>Designation</th> */}
                    {/* <th> */}
                    {/*  <span */}
                    {/*    onClick={() => */}
                    {/*      onArrowClickHandler('contractor_start_date') */}
                    {/*    } */}
                    {/*    aria-hidden="true" */}
                    {/*  > */}
                    {/*    {renderHeaderTitle( */}
                    {/*      'Contractor Start Date', */}
                    {/*      'contractor_start_date' */}
                    {/*    )} */}
                    {/*  </span> */}
                    {/* </th> */}
                    {/* <th> */}
                    {/*  <span */}
                    {/*    onClick={() => */}
                    {/*      onArrowClickHandler('contractor_end_date') */}
                    {/*    } */}
                    {/*    aria-hidden="true" */}
                    {/*  > */}
                    {/*    {renderHeaderTitle( */}
                    {/*      'Contractor End Date', */}
                    {/*      'contractor_end_date' */}
                    {/*    )} */}
                    {/*  </span> */}
                    {/* </th> */}
                    {/* <th>On Payroll</th> */}
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

export default EmployeeList;
