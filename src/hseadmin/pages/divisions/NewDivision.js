import { Button, Card, Col, Form, Row } from 'react-bootstrap';
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Select from 'react-select';
import { toast } from 'react-toastify';
import {
  KEY_COMPANY_ID,
  STATUSES_DATA,
  YES_NO_DATA,
} from '../../constants/Constants';
import CompanySelect from '../../components/widgets/CompanySelect';
import CountrySelect from '../../components/widgets/CountrySelect';
import StateSelect from '../../components/widgets/StateSelect';
import CitySelect from '../../components/widgets/CitySelect';
import ManagerSelect from '../../components/widgets/ManagerSelect';
import { addDivisions } from '../../store/actions/divisions';

const NewDivision = () => {
  const localCompanyId = localStorage.getItem(KEY_COMPANY_ID);
  console.log(`localCompanyId =${localCompanyId}`);
  const [validated, setValidated] = useState(false);
  const history = useNavigate();

  const [name, setName] = useState('');
  const [companyId, setCompanyId] = useState(-1);
  const [address1, setAddress1] = useState('');
  const [headOffice, setHeadOffice] = useState('');
  const [statusId, setStatusId] = useState('');

  const [cityId, setCityId] = useState(-1);
  const [stateId, setStateId] = useState(-1);
  const [countryId, setCountryId] = useState(-1);

  const [managers, setManagers] = useState([]);

  const dispatch = useDispatch();

  useEffect(() => {}, []);

  const onDivisionSubmit = (event) => {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }
    setValidated(true);
    event.preventDefault();

    const postData = {
      name,
      company_id: localCompanyId !== null ? localCompanyId : companyId,
      address: {
        name: `${name}address`,
        address1,
        city_id: cityId,
        state_id: stateId,
        country_id: countryId,
      },
      head_office: headOffice,
      status_id: 1,
      managers,
    };
    postDivision(postData);
  };

  const postDivision = async (data) => {
    try {
      await dispatch(addDivisions(data));
      history('../../private/divisions');
    } catch (error) {
      toast(error.message || 'Failed');
    }
  };

  const onNameChangeHandler = (event) => {
    // console.log(event.target.value);
    setName(event.target.value);
  };

  const onCompanyIdChangeHandler = (value) => {
    setCompanyId(value);
    console.log(`NewDivisions companyId${value}`);
  };

  const onAddress1ChangeHandler = (event) => {
    console.log(event.target.value);
    setAddress1(event.target.value);
  };

  // const onHeadOfficeChangeHandler = (event) => {
  //   // console.log(event.target.value);
  //   setHeadOffice(event.target.value);
  // };
  const onStatusIDChangeHandler = (selectedOption) => {
    // console.log(event.target.value);
    setStatusId(+selectedOption.value);
    console.log(statusId);
  };

  const onHeadOfficeChangeHandler = (selectedOption) => {
    setHeadOffice(+selectedOption.value);
    // console.log(selectedOption.value);
  };

  return (
    <Row>
      <Col>
        <Card>
          <Card.Header>
            Add Division
            <>
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
            </>
          </Card.Header>
          <Card.Body>
            <Form noValidate validated={validated} onSubmit={onDivisionSubmit}>
              <Row>
                <Col md={6}>
                  {/* Name Field */}
                  <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Name</Form.Label>
                    <Form.Control
                      required
                      type="text"
                      placeholder="Name"
                      onChange={onNameChangeHandler}
                    />
                    <Form.Control.Feedback type="invalid">
                      Please provide a valid Name.
                    </Form.Control.Feedback>
                  </Form.Group>
                </Col>
                {/* Company id */}
                {localCompanyId === null && (
                  <Col md={6}>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                      <Form.Label>Company </Form.Label>
                      <CompanySelect onChange={onCompanyIdChangeHandler} />
                      <Form.Control.Feedback type="invalid">
                        Please provide a valid Company name.
                      </Form.Control.Feedback>
                    </Form.Group>
                  </Col>
                )}
                <Col md={6}>
                  {/* address id */}
                  <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Address</Form.Label>
                    <Form.Control
                      required
                      type="text"
                      placeholder="Address"
                      onChange={onAddress1ChangeHandler}
                    />
                    <Form.Control.Feedback type="invalid">
                      Please provide a valid Address.
                    </Form.Control.Feedback>
                  </Form.Group>
                </Col>

                <Col md={6}>
                  <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Select Country </Form.Label>
                    <CountrySelect onChange={(value) => setCountryId(value)} />
                    <Form.Control.Feedback type="invalid">
                      Please provide a valid Company name.
                    </Form.Control.Feedback>
                  </Form.Group>
                </Col>

                <Col md={6}>
                  <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Select State</Form.Label>
                    <StateSelect
                      onChange={(value) => setStateId(value)}
                      countryId={countryId}
                    />
                    <Form.Control.Feedback type="invalid">
                      Please provide a valid Company name.
                    </Form.Control.Feedback>
                  </Form.Group>
                </Col>

                <Col md={6}>
                  <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Select City</Form.Label>
                    <CitySelect
                      onChange={(value) => {
                        setCityId(value);
                        console.log(cityId);
                      }}
                      stateId={stateId}
                    />
                    <Form.Control.Feedback type="invalid">
                      Please provide a valid Company name.
                    </Form.Control.Feedback>
                  </Form.Group>
                </Col>
                <Col md={6}>
                  <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Select Managers</Form.Label>
                    <ManagerSelect
                      onChange={(value) => {
                        setManagers(value);
                      }}
                      companyId={
                        localCompanyId !== null ? localCompanyId : companyId
                      }
                    />
                    <Form.Control.Feedback type="invalid">
                      Please provide a valid Company name.
                    </Form.Control.Feedback>
                  </Form.Group>
                </Col>
                <Col md={6}>
                  {/* head office */}
                  <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Head Office</Form.Label>
                    <Select
                      required
                      options={YES_NO_DATA.map((item) => {
                        return { value: item.id, label: item.name };
                      })}
                      onChange={onHeadOfficeChangeHandler}
                    />
                  </Form.Group>
                </Col>
                <Col md={6}>
                  {/* Status ID */}
                  <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Status</Form.Label>
                    <Select
                      required
                      options={STATUSES_DATA.map((status) => {
                        return { value: status.id, label: status.name };
                      })}
                      // value={{
                      //   value: STATUSES_DATA[0].id,
                      //   label: STATUSES_DATA[0].name
                      // }}
                      onChange={onStatusIDChangeHandler}
                    />
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

export default NewDivision;
