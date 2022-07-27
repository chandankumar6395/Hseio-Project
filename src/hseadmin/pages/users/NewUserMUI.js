import React, { useEffect, useState } from 'react';
import { Col, Form, Row } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import Select from 'react-select';
import { Helmet } from 'react-helmet-async';
import { Button, Grid, Typography } from '@mui/material';
import { toast } from 'react-toastify';
import validator from 'validator';
import { fetchGET } from '../../utils/NetworkUtils';
import URLConstants from '../../constants/URLConstants';
import { USER_STATUSES, YES_NO_DATA } from '../../constants/Constants';
import { addUsers, loadUsers } from '../../store/actions/user';
import { CustomBreadcrumbs, CustomDivider } from '../../utils/MUIStyle';

const NewUserMUI = () => {
  const [validated, setValidated] = useState(false);

  const history = useNavigate();

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [firstName, setFirstName] = useState('');
  const [middleName, setMiddleName] = useState('');
  const [lastName, setLastName] = useState('');
  const [active, setActive] = useState('');
  const [userStatusId, setUserStatusId] = useState(-1);

  const [types, setTypes] = useState([]);
  const [typeOptions, setTypeOptions] = useState([]);

  const dispatch = useDispatch();
  // const users = useSelector((state) => state.user.users);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    await dispatch(loadUsers());
    await loadTypes();
  };

  const loadTypes = async () => {
    try {
      const response = await fetchGET(URLConstants.GET_TYPE_URL);
      setTypes(response.data);
    } catch (e) {
      console.log(e);
    }
  };

  const onUsersSubmit = (event) => {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }

    const localTypes = [];

    typeOptions.forEach((type) => {
      localTypes.push({ id: type.value });
    });

    console.log(`userStatusId${userStatusId}`);

    setValidated(true);
    event.preventDefault();
    if (username !== null && !validator.isEmail(username)) {
      toast('Please Enter valid Username Email');
    } else if (password === '') {
      toast('Please Enter Password');
    } else if (email !== null && !validator.isEmail(email)) {
      toast('Email is not valid');
    } else if (firstName === '') {
      toast('Please Enter FirstName');
    } else if (lastName === '') {
      toast('Please Enter LastName');
    } else if (active === '') {
      toast('Please Select Active');
    } else if (userStatusId === -1) {
      toast('Please Select User Status');
    } else {
      const postData = {
        username,
        password,
        email,
        first_name: firstName,
        middle_name: middleName,
        last_name: lastName,
        active,
        user_status_id: userStatusId === -1 ? null : userStatusId,
        types: localTypes,
      };
      postUsers(postData);
    }
  };

  const postUsers = async (data) => {
    await dispatch(addUsers(data));
    history('../../private/users');
  };

  const onUsernameChangeHandler = (event) => {
    console.log(event.target.value);
    setUsername(event.target.value);
  };
  const onPasswordChangeHandler = (event) => {
    console.log(event.target.value);
    setPassword(event.target.value);
  };
  const onEmailChangeHandler = (event) => {
    console.log(event.target.value);
    setEmail(event.target.value);
  };

  const onFirstNameChangeHandler = (event) => {
    const { value } = event.target;
    console.log('Input value: ', value);

    const re = /^[A-Za-z ]+$/;
    if (value === '' || re.test(value)) {
      setFirstName(value);
    }
  };

  const onMiddleNameChangeHandler = (event) => {
    console.log(event.target.value);
    setMiddleName(event.target.value);
  };

  const onLastNameChangeHandler = (event) => {
    const { value } = event.target;
    console.log('Input value: ', value);

    const re = /^[A-Za-z ]+$/;
    if (value === '' || re.test(value)) {
      setLastName(value);
    }
  };
  const onActiveChangeHandler = (selectedOption) => {
    // console.log(event.target.value);
    setActive(+selectedOption.value);
  };

  const onUserStatusChangeHandler = (selectedOption) => {
    setUserStatusId(+selectedOption.value);
    console.log(selectedOption.value);
  };

  const onTypeChangeHandler = (selectedOption) => {
    setTypeOptions(selectedOption);
    console.log(typeOptions);
    console.log(selectedOption);
  };

  return (
    <>
      <Helmet title="Add User" />

      <Grid justifyContent="space-between" container spacing={10}>
        <Grid item>
          <Typography variant="h3" gutterBottom display="inline">
            Users
          </Typography>

          <CustomBreadcrumbs aria-label="Breadcrumb" mt={2}>
            <Link component={NavLink} to="/">
              Dashboard
            </Link>
            <Link component={NavLink} to="/private/users">
              Users
            </Link>
            <Typography>Add User</Typography>
          </CustomBreadcrumbs>
        </Grid>
        <Grid item>
          <div>
            <NavLink to="/private/users">
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
          <Form noValidate validated={validated} onSubmit={onUsersSubmit}>
            <Row>
              {/* User Name */}
              <Col md={6}>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Form.Label>Username *</Form.Label>
                  <Form.Control
                    required
                    type="email"
                    placeholder="Username *"
                    onChange={onUsernameChangeHandler}
                  />
                  <Form.Control.Feedback type="invalid">
                    Please provide a valid username.
                  </Form.Control.Feedback>
                </Form.Group>
              </Col>

              {/* Password */}
              <Col md={6}>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Form.Label>Password *</Form.Label>
                  <Form.Control
                    required
                    type="password"
                    placeholder="Password *"
                    onChange={onPasswordChangeHandler}
                  />
                  <Form.Control.Feedback type="invalid">
                    Please provide a valid password.
                  </Form.Control.Feedback>
                </Form.Group>
              </Col>

              {/* Email Field */}
              <Col md={6}>
                {' '}
                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Form.Label>Email *</Form.Label>
                  <Form.Control
                    required
                    type="email"
                    placeholder="Your Email *"
                    onChange={onEmailChangeHandler}
                  />
                  <Form.Control.Feedback type="invalid">
                    Please provide a valid email.
                  </Form.Control.Feedback>
                </Form.Group>
              </Col>

              {/* First Name */}
              <Col md={6}>
                {' '}
                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Form.Label>First Name *</Form.Label>
                  <Form.Control
                    required
                    type="text"
                    value={firstName}
                    placeholder="First Name *"
                    onChange={onFirstNameChangeHandler}
                  />
                  <Form.Control.Feedback type="invalid">
                    Please provide a valid name.
                  </Form.Control.Feedback>
                </Form.Group>
              </Col>

              {/* Middle Name */}
              <Col md={6}>
                {' '}
                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Form.Label>Middle Name</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Middle Name"
                    onChange={onMiddleNameChangeHandler}
                  />
                </Form.Group>
              </Col>

              {/* Last Name */}
              <Col md={6}>
                {' '}
                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Form.Label>Last Name *</Form.Label>
                  <Form.Control
                    required
                    type="text"
                    value={lastName}
                    placeholder="Last Name *"
                    onChange={onLastNameChangeHandler}
                  />
                  <Form.Control.Feedback type="invalid">
                    Please provide a valid name.
                  </Form.Control.Feedback>
                </Form.Group>
              </Col>

              {/* Active Field */}
              <Col md={6}>
                {' '}
                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Form.Label>Active *</Form.Label>
                  <Select
                    required
                    options={YES_NO_DATA.map((item) => {
                      return { value: item.id, label: item.name };
                    })}
                    onChange={onActiveChangeHandler}
                  />
                  <Form.Control.Feedback type="invalid">
                    Please provide a valid active.
                  </Form.Control.Feedback>
                </Form.Group>
              </Col>

              {/* User status id */}
              <Col md={6}>
                {' '}
                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Form.Label>User Status *</Form.Label>
                  <Select
                    required
                    options={USER_STATUSES.map((status) => {
                      return { value: status.id, label: status.name };
                    })}
                    onChange={onUserStatusChangeHandler}
                  />
                  <Form.Control.Feedback type="invalid">
                    Please provide a valid User Status.
                  </Form.Control.Feedback>
                </Form.Group>
              </Col>

              {/* Types id */}
              <Col md={6}>
                {' '}
                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Form.Label>User Roles</Form.Label>
                  <Select
                    isMulti
                    required
                    options={types.map((type) => {
                      return { value: type.id, label: type.name };
                    })}
                    onChange={onTypeChangeHandler}
                  />
                  <Form.Control.Feedback type="invalid">
                    Please provide a valid User Status.
                  </Form.Control.Feedback>
                </Form.Group>
              </Col>
            </Row>

            <Button variant="contained" type="submit" color="primary">
              Submit
            </Button>
          </Form>
        </Grid>
      </Grid>
    </>
  );
};
export default NewUserMUI;
