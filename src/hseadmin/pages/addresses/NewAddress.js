import { Button, Card, Col, Form, Row } from 'react-bootstrap';
import React, { useEffect, useState } from 'react';

import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { COUNTRY_ID_USA } from '../../constants/Constants';
import { addAddresses } from '../../store/actions/addresses';

const NewAddress = () => {
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
  const [countryId, setCountryId] = useState(-1);
  const [latitude, setLatitude] = useState('');
  const [longitude, setLongitude] = useState('');
  const [lat, setLat] = useState(null);
  const [lng, setLng] = useState(null);
  const [status, setStatus] = useState(null);
  const getLocation = () => {
    if (!navigator.geolocation) {
      setStatus('Geolocation is not supported by your browser');
    } else {
      setStatus('Locating...');
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setStatus(null);
          setLat(position.coords.latitude);
          setLng(position.coords.longitude);
        },
        () => {
          setStatus('Unable to retrieve your location');
        }
      );
    }
  };
  console.log('Geo Location Status', status);
  useEffect(() => {
    getLocation();
  }, []);
  const dispatch = useDispatch();

  useEffect(() => {
    setCountryId(COUNTRY_ID_USA);
  }, []);

  // const fetchIndustries = async () => {};

  const onAddressSubmit = (event) => {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }

    setValidated(true);
    event.preventDefault();
    const postData = {
      name,
      address1,
      address2,
      zipcode,
      city_name: cityName,
      state_name: stateName,
      country_name: countryId,
      latitude,
      longitude,
    };
    postAddress(postData);
  };

  const postAddress = async (data) => {
    await dispatch(addAddresses(data));
    history('../../private/addresses');
  };

  const onNameChangeHandler = (event) => {
    // console.log(event.target.value);
    setName(event.target.value);
  };

  const onAddress1ChangeHandler = (event) => {
    console.log(event.target.value);
    setAddress1(event.target.value);
  };

  const onAddress2ChangeHandler = (event) => {
    console.log(event.target.value);
    setAddress2(event.target.value);
  };

  const onCityChangeHandler = (event) => {
    console.log(event.target.value);
    setCityName(event.target.value);
  };
  const onStateChangeHandler = (event) => {
    console.log(event.target.value);
    setStateName(event.target.value);
  };
  const onLatitudeChangeHandler = (event) => {
    console.log(event.target.value);
    setLatitude(event.target.value);
  };
  const onLongitudeChangeHandler = (event) => {
    console.log(event.target.value);
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
            Add Address
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
                    />
                    <Form.Control.Feedback type="invalid">
                      Please provide a valid name.
                    </Form.Control.Feedback>
                  </Form.Group>
                </Col>
                <Col md={6}>
                  <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Address *</Form.Label>
                    <Form.Control
                      required
                      type="text"
                      placeholder="Address *"
                      onChange={onAddress1ChangeHandler}
                    />
                    <Form.Control.Feedback type="invalid">
                      Please provide a valid Address.
                    </Form.Control.Feedback>
                  </Form.Group>
                </Col>
                <Col md={6}>
                  <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Address2</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Address2"
                      onChange={onAddress2ChangeHandler}
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
                    />
                  </Form.Group>
                </Col>
                <Col md={6}>
                  <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>City</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="City"
                      onChange={onCityChangeHandler}
                    />
                  </Form.Group>
                </Col>
                <Col md={6}>
                  <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>State</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="State"
                      onChange={onStateChangeHandler}
                    />
                  </Form.Group>
                </Col>
                <Col md={6}>
                  <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Latitude</Form.Label>
                    <Form.Control
                      type="number"
                      placeholder="Latitude"
                      onChange={onLatitudeChangeHandler}
                      value={lat}
                    />
                  </Form.Group>
                </Col>
                <Col md={6}>
                  <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Longitude</Form.Label>
                    <Form.Control
                      type="number"
                      placeholder="Longitude"
                      onChange={onLongitudeChangeHandler}
                      value={lng}
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

export default NewAddress;
