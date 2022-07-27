import { Button, Card, Col, Form, Row } from 'react-bootstrap';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { NavLink, useNavigate, useParams } from 'react-router-dom';
// import Select from 'react-select';
import {
  // addAddresses,
  getAddress,
  // loadAddresses,
  updateAddress,
} from '../../store/actions/addresses';
import { COUNTRY_ID_USA } from '../../constants/Constants';

const EditAddress = () => {
  const [validated, setValidated] = useState(false);

  // const handleSubmit = (event) => {
  //   const form = event.currentTarget;
  //   if (form.checkValidity() === false) {
  //     event.preventDefault();
  //     event.stopPropagation();
  //   }
  //
  //   setValidated(true);
  // };

  const history = useNavigate();

  const [name, setName] = useState('');
  const [address1, setAddress1] = useState('');
  const [address2, setAddress2] = useState('');
  const [zipcode, setZipcode] = useState('');
  const [cityName, setCityName] = useState('');
  const [stateName, setStateName] = useState('');
  const [countryName, setCountryName] = useState(COUNTRY_ID_USA);
  const [latitude, setLatitude] = useState('');
  const [longitude, setLongitude] = useState('');

  const dispatch = useDispatch();
  const address = useSelector((state) => state.address.address);

  // const params = useParams();
  const { id } = useParams();

  useEffect(() => {
    if (address != null) {
      setName(address.name);
      setAddress1(address.address1);
      setAddress2(address.address2);
      setZipcode(address.zipcode);
      setCityName(address.city_name);
      setStateName(address.state_name);
      setCountryName(address.country_name);
      setLatitude(address.latitude);
      setLongitude(address.longitude);
      // setParentId(industry.parent_id);
    }
  }, [address]);

  useEffect(() => {
    loadAddress();
  }, []);

  const loadAddress = async () => {
    await dispatch(getAddress(id));
  };

  // const fetchAddresses = async () =>{

  // }

  const onAddressSubmit = (event) => {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }

    setValidated(true);
    event.preventDefault();
    const postData = {
      id,
      name,
      address1,
      address2,
      zipcode,
      city_name: cityName,
      state_name: stateName,
      country_name: countryName,
      latitude,
      longitude,
    };
    postAddress(postData);
  };

  const postAddress = async (data) => {
    await dispatch(updateAddress(data));
    history('../../private/addresses');
  };

  const onNameChangeHandler = (event) => {
    // console.log(event.target.value);
    setName(event.target.value);
  };

  const onAddress1ChangeHandler = (event) => {
    // console.log(event.target.value);
    setAddress1(event.target.value);
  };

  const onAddress2ChangeHandler = (event) => {
    // console.log(event.target.value);
    setAddress2(event.target.value);
  };

  const onCityChangeHandler = (event) => {
    // console.log(event.target.value);
    setCityName(event.target.value);
  };
  const onStateChangeHandler = (event) => {
    // console.log(event.target.value);
    setStateName(event.target.value);
  };
  const onLatitudeChangeHandler = (event) => {
    // console.log(event.target.value);
    setLatitude(event.target.value);
  };
  const onLongitudeChangeHandler = (event) => {
    // console.log(event.target.value);
    setLongitude(event.target.value);
  };
  const onZipcodeChangeHandler = (event) => {
    // console.log(event.target.value);
    setZipcode(event.target.value);
  };

  const maxLengthCheck = (object) => {
    if (object.target.value.length > object.target.maxLength) {
      object.target.value = object.target.value.slice(
        0,
        object.target.maxLength
      );
    }
  };

  return (
    <Row>
      <Col>
        <Card>
          <Card.Header>
            Edit Address
            <NavLink to="/private/addresses">
              <Button
                className="btn-sm"
                variant="primary"
                type="button"
                style={{ float: 'right' }}
              >
                Back
              </Button>
            </NavLink>
          </Card.Header>
          <Card.Body>
            <Form noValidate validated={validated} onSubmit={onAddressSubmit}>
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
                  {/* Address1 Field */}
                  <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Address *</Form.Label>
                    <Form.Control
                      required
                      type="text"
                      placeholder="Address *"
                      onChange={onAddress1ChangeHandler}
                      value={address1}
                    />
                    <Form.Control.Feedback type="invalid">
                      Please provide a valid Address.
                    </Form.Control.Feedback>
                  </Form.Group>
                </Col>
                <Col md={6}>
                  {/* Address2 Field */}
                  <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Address2</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Address2"
                      onChange={onAddress2ChangeHandler}
                      value={address2}
                    />
                  </Form.Group>
                </Col>
                <Col md={6}>
                  <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Zip</Form.Label>
                    <Form.Control
                      type="number"
                      maxLength="5"
                      onInput={maxLengthCheck}
                      placeholder="Zip"
                      onChange={onZipcodeChangeHandler}
                      value={zipcode}
                    />
                  </Form.Group>
                </Col>
                <Col md={6}>
                  {/* City Field */}
                  <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>City</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="City"
                      onChange={onCityChangeHandler}
                      value={cityName}
                    />
                  </Form.Group>
                </Col>
                <Col md={6}>
                  {/* State Field */}
                  <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>State</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="State"
                      onChange={onStateChangeHandler}
                      value={stateName}
                    />
                  </Form.Group>
                </Col>
                <Col md={6}>
                  {/* Latitude Field */}
                  <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Latitude</Form.Label>
                    <Form.Control
                      type="number"
                      placeholder="Latitude"
                      onChange={onLatitudeChangeHandler}
                      value={latitude}
                    />
                  </Form.Group>
                </Col>
                <Col md={6}>
                  {/* Longitude Field */}

                  <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Longitude</Form.Label>
                    <Form.Control
                      type="number"
                      placeholder="Longitude"
                      onChange={onLongitudeChangeHandler}
                      value={longitude}
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

export default EditAddress;
