import { Col, Form, Row } from 'react-bootstrap';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { Link, NavLink, useNavigate, useParams } from 'react-router-dom';

import Select from 'react-select';
import { Helmet } from 'react-helmet-async';
import { Button, Grid, Typography } from '@mui/material';
import { toast } from 'react-toastify';
import { USER_STATUSES, YES_NO_DATA } from '../../constants/Constants';
import { fetchGET } from '../../utils/NetworkUtils';
import URLConstants from '../../constants/URLConstants';
import { updateUser, getUser } from '../../store/actions/user';
import { CustomBreadcrumbs, CustomDivider } from '../../utils/MUIStyle';

const EditUserMUI = () => {
  const [validated, setValidated] = useState(false);

  const history = useNavigate();

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [firstName, setFirstName] = useState('');
  const [middleName, setMiddleName] = useState('');
  const [lastName, setLastName] = useState('');
  const [active, setActive] = useState('');
  const [activeOptions, setActiveOptions] = useState('');
  // const [userStatusId, setUserStatusId] = useState(-1);
  const [userStatusId, setUserStatusId] = useState(-1);

  const [types, setTypes] = useState([]);
  const [typeOptions, setTypeOptions] = useState([]);
  const [selectedUserStatusOptions, setSelectedUserStatusOptions] = useState(
    {}
  );

  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.user);

  const params = useParams();
  const { id } = useParams();

  useEffect(() => {
    if (user != null) {
      setUsername(user.username);
      setPassword(user.password);
      setEmail(user.email);
      setFirstName(user.first_name);
      setMiddleName(user.middle_name);
      setLastName(user.last_name);
      setActive(user.active);
      setActiveOptions({
        value: user.active,
        label: YES_NO_DATA.find((x) => x.id === user.active).name,
      });
      setUserStatusId(user.user_status_id);
      setTypes(user.types);
      setSelectedUserStatusOptions({
        value: user.user_status_id,
        label: USER_STATUSES.find((x) => x.id === user.user_status_id).name,
      });
      const localOptions = [];

      user.types.forEach((type) => {
        localOptions.push({ value: type.id, label: type.name });
      });

      setTypeOptions(localOptions);
    }
  }, [user]);

  useEffect(() => {
    console.log(`param is ${params.id}`);
    loadUser();
  }, []);

  const loadUser = async () => {
    await dispatch(getUser(id));
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

  const onUserSubmit = (event) => {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }

    const localTypes = [];

    typeOptions.forEach((type) => {
      localTypes.push({ id: type.value });
    });

    setValidated(true);
    event.preventDefault();
    if (username === '') {
      toast('Please Enter Username');
    } else if (email === '') {
      toast('Please Enter Email');
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
        id,
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
      postUser(postData);
    }
  };

  const postUser = async (data) => {
    await dispatch(updateUser(data));
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
    setActive(+selectedOption.value);
    setActiveOptions(selectedOption);
  };

  const onUserStatusIdChangeHandler = (selectedOption) => {
    setUserStatusId(+selectedOption.value);
    console.log(selectedOption.value);
    console.log(userStatusId);
    setSelectedUserStatusOptions(selectedOption);
  };

  const onTypeChangeHandler = (selectedOption) => {
    setTypeOptions(selectedOption);
    console.log(typeOptions);
    console.log(selectedOption);
  };

  return (
    <>
      <Helmet title="Edit User" />

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
            <Typography>Edit User</Typography>
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
          <Form noValidate validated={validated} onSubmit={onUserSubmit}>
            <Row>
              {/* Username Field */}
              <Col md={6}>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Form.Label>Username *</Form.Label>
                  <Form.Control
                    required
                    type="text"
                    placeholder="username *"
                    onChange={onUsernameChangeHandler}
                    value={username}
                  />
                  <Form.Control.Feedback type="invalid">
                    Please provide a valid username.
                  </Form.Control.Feedback>
                </Form.Group>
              </Col>

              {/* Password Field */}
              <Col md={6}>
                {' '}
                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Form.Label>Password *</Form.Label>
                  <Form.Control
                    required
                    type="password"
                    placeholder="Password *"
                    onChange={onPasswordChangeHandler}
                    value={password}
                  />
                  <Form.Control.Feedback type="invalid">
                    Please provide a valid password.
                  </Form.Control.Feedback>
                </Form.Group>
              </Col>

              {/* Email Field */}
              <Col md={6}>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Form.Label>Email *</Form.Label>
                  <Form.Control
                    required
                    type="text"
                    placeholder="Email *"
                    onChange={onEmailChangeHandler}
                    value={email}
                  />
                  <Form.Control.Feedback type="invalid">
                    Please provide a valid email.
                  </Form.Control.Feedback>
                </Form.Group>
              </Col>

              {/* First Name */}
              <Col md={6}>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Form.Label>First Name *</Form.Label>
                  <Form.Control
                    required
                    type="text"
                    placeholder="First Name *"
                    onChange={onFirstNameChangeHandler}
                    value={firstName}
                  />
                  <Form.Control.Feedback type="invalid">
                    Please provide a valid name.
                  </Form.Control.Feedback>
                </Form.Group>
              </Col>

              {/* Middle Name */}
              <Col md={6}>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Form.Label>Middle Name</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Middle Name"
                    onChange={onMiddleNameChangeHandler}
                    value={middleName}
                  />
                </Form.Group>
              </Col>

              {/* Last Name */}
              <Col md={6}>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Form.Label>Last Name *</Form.Label>
                  <Form.Control
                    required
                    type="text"
                    placeholder="Last Name *"
                    onChange={onLastNameChangeHandler}
                    value={lastName}
                  />
                  <Form.Control.Feedback type="invalid">
                    Please provide a valid name.
                  </Form.Control.Feedback>
                </Form.Group>
              </Col>

              {/* Active */}
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
                    value={activeOptions}
                  />
                  <Form.Control.Feedback type="invalid">
                    Please provide a valid active.
                  </Form.Control.Feedback>
                </Form.Group>
              </Col>

              {/* Status id */}
              {/* <Col md={6}> */}
              {/*  <Form.Group className="mb-3" controlId="formBasicEmail"> */}
              {/*    <Form.Label>User Status</Form.Label> */}
              {/*    <Select */}
              {/*      required */}
              {/*      options={USER_STATUSES.map((user) => { */}
              {/*        return { value: user.id, label: user.name }; */}
              {/*      })} */}
              {/*      value={statusOptions} */}
              {/*      onChange={onUserStatusChangeHandler} */}
              {/*    /> */}
              {/*    <Form.Control.Feedback type="invalid"> */}
              {/*      Please provide a valid User Status. */}
              {/*    </Form.Control.Feedback> */}
              {/*  </Form.Group> */}
              {/* </Col> */}
              <Col md={6}>
                {/* Status Id Field */}
                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Form.Label> User Status *</Form.Label>
                  <Select
                    required
                    options={USER_STATUSES.map((status) => {
                      return { value: status.id, label: status.name };
                    })}
                    onChange={onUserStatusIdChangeHandler}
                    value={selectedUserStatusOptions}
                  />
                </Form.Group>
              </Col>

              {/* Types id */}
              <Col md={6}>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Form.Label>User Roles</Form.Label>
                  <Select
                    isMulti
                    required
                    options={types.map((type) => {
                      return { value: type.id, label: type.name };
                    })}
                    value={typeOptions}
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

export default EditUserMUI;
