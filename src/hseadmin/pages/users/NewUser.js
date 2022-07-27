import React, { useEffect, useState } from 'react';
import { Button, Card, Col, Form, Row } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Select from 'react-select';
import { fetchGET } from '../../utils/NetworkUtils';
import URLConstants from '../../constants/URLConstants';
import { USER_STATUSES } from '../../constants/Constants';
import { addUsers, loadUsers } from '../../store/actions/user';

const NewUser = () => {
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
            Add User
            <Button
              className="btn-sm"
              variant="primary"
              type="button"
              style={{
                float: 'right',
              }}
              onClick={() => {
                history(-1);
              }}
            >
              Back
            </Button>
          </Card.Header>
          <Card.Body>
            <Form noValidate validated={validated} onSubmit={onUsersSubmit}>
              <Row>
                {/* User Name */}
                <Col md={6}>
                  <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Username</Form.Label>
                    <Form.Control
                      required
                      type="text"
                      placeholder="Username"
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
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                      required
                      type="password"
                      placeholder="Password"
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
                    <Form.Label>Email</Form.Label>
                    <Form.Control
                      required
                      type="text"
                      placeholder="Email"
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
                    <Form.Label>First Name</Form.Label>
                    <Form.Control
                      required
                      type="text"
                      placeholder="First Name"
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
                    <Form.Label>Last Name</Form.Label>
                    <Form.Control
                      required
                      type="text"
                      placeholder="Last Name"
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
                    <Form.Label>Active</Form.Label>
                    <Form.Control
                      required
                      type="text"
                      placeholder="Active"
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
                    <Form.Label>User Status</Form.Label>
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
export default NewUser;
