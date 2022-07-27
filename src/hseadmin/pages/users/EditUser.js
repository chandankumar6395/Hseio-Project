import { Button, Card, Col, Form, Row } from 'react-bootstrap';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { useNavigate, useParams } from 'react-router-dom';

import Select from 'react-select';
import { USER_STATUSES } from '../../constants/Constants';
import { fetchGET } from '../../utils/NetworkUtils';
import URLConstants from '../../constants/URLConstants';
import { updateUser, getUser } from '../../store/actions/user';

const EditUser = () => {
  const [validated, setValidated] = useState(false);

  const history = useNavigate();

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [firstName, setFirstName] = useState('');
  const [middleName, setMiddleName] = useState('');
  const [lastName, setLastName] = useState('');
  const [active, setActive] = useState('');
  // const [userStatusId, setUserStatusId] = useState(-1);
  const [userStatusId, setUserStatusId] = useState('');

  const [types, setTypes] = useState([]);
  const [typeOptions, setTypeOptions] = useState([]);
  const [statusOptions, setStatusOptions] = useState([]);

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
      setUserStatusId(user.user_status_id);
      setTypes(user.types);
      setStatusOptions({
        value: user.user_status_id,
        label: user.user_status.name,
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
    console.log(event.target.value);
    setFirstName(event.target.value);
  };

  const onMiddleNameChangeHandler = (event) => {
    console.log(event.target.value);
    setMiddleName(event.target.value);
  };

  const onLastNameChangeHandler = (event) => {
    console.log(event.target.value);
    setLastName(event.target.value);
  };
  const onActiveChangeHandler = (event) => {
    console.log(event.target.value);
    setActive(event.target.value);
  };

  const onUserStatusChangeHandler = (selectedOption) => {
    setUserStatusId(+selectedOption.value);
    console.log(selectedOption.value);
    console.log(userStatusId);
  };

  const onTypeChangeHandler = (selectedOption) => {
    setTypeOptions(selectedOption);
    console.log(typeOptions);
    console.log(selectedOption);
  };

  return (
    <Row>
      <Col>
        <Card>
          <Card.Header>
            Edit User
            <>
              <Button
                className="btn-sm"
                variant="primary"
                type="button"
                style={{ float: 'right' }}
                onClick={() => {
                  history(-1);
                }}
              >
                Back
              </Button>
            </>
          </Card.Header>
          <Card.Body>
            <Form noValidate validated={validated} onSubmit={onUserSubmit}>
              <Row>
                {/* Username Field */}
                <Col md={6}>
                  <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Username</Form.Label>
                    <Form.Control
                      required
                      type="text"
                      placeholder="username"
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
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                      required
                      type="password"
                      placeholder="Password"
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
                    <Form.Label>Email</Form.Label>
                    <Form.Control
                      required
                      type="text"
                      placeholder="Email"
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
                    <Form.Label>First Name</Form.Label>
                    <Form.Control
                      required
                      type="text"
                      placeholder="First Name"
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
                    <Form.Label>Last Name</Form.Label>
                    <Form.Control
                      required
                      type="text"
                      placeholder="Last Name"
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
                    <Form.Label>Active</Form.Label>
                    <Form.Control
                      required
                      type="boolean"
                      placeholder="Active"
                      onChange={onActiveChangeHandler}
                      value={active}
                    />
                    <Form.Control.Feedback type="invalid">
                      Please provide a valid active.
                    </Form.Control.Feedback>
                  </Form.Group>
                </Col>

                {/* Status id */}
                <Col md={6}>
                  <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>User Status</Form.Label>
                    <Select
                      required
                      options={USER_STATUSES.map((user) => {
                        return { value: user.id, label: user.name };
                      })}
                      value={statusOptions}
                      onChange={onUserStatusChangeHandler}
                    />
                    <Form.Control.Feedback type="invalid">
                      Please provide a valid User Status.
                    </Form.Control.Feedback>
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

              <Button variant="primary" type="submit">
                Submit
              </Button>
            </Form>
          </Card.Body>
        </Card>
      </Col>
    </Row>
  );
};

export default EditUser;
