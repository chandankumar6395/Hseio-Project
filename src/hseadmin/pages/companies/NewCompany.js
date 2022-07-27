/* eslint-disable no-unused-vars */
import { Button, Card, Col, Collapse, Form, Row } from 'react-bootstrap';
import React, { useEffect, useState } from 'react';
import NumberFormat from 'react-number-format';

import { toast } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import { styled } from '@mui/material/styles';
import { uploadFile } from '../../utils/NetworkUtils';
import URLConstants from '../../constants/URLConstants';

import {
  addCompanies,
  loadCompanies,
  resetCompany,
} from '../../store/actions/companies';

const NewCompany = () => {
  const [selectedLogoFile, setSelectedLogoFile] = useState('');
  const [validated, setValidated] = useState(false);

  const [logo, setLogo] = useState(null);
  const [banner, setBanner] = useState(null);

  const navigate = useNavigate();

  const [name, setName] = useState('');
  const [shortDesc, setShortDesc] = useState('');
  const [longDesc, setLongDesc] = useState('');
  const [emailAddress, setEmailAddress] = useState('');
  const [landline, setLandline] = useState('');
  const [fax, setFax] = useState('');
  const [formattedFax, setFormattedFax] = useState('');
  const [mobile, setMobile] = useState('');
  const [website, setWebsite] = useState('');
  const [aboutUs, setAboutUs] = useState('');
  const [privacyPolicy, setPrivacyPolicy] = useState('');
  const [termsAndCondition, setTermsAndCondition] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [active, setActive] = useState('');
  const [userStatusId, setUserStatusId] = useState(-1);
  const dispatch = useDispatch();

  const [open, setOpen] = useState(false);
  useEffect(() => {
    fetchCompanies();
  }, []);

  const fetchCompanies = async () => {
    await dispatch(loadCompanies());
  };

  // On file select (from the pop up)
  const onLogoFileChange = (event) => {
    const { files } = event.target;
    setSelectedLogoFile(event.target.files[0]);
    onLogoFileUpload(event.target.files[0]);
  };

  // On file upload (click the upload button)
  const onLogoFileUpload = async (value) => {
    // Create an object of formData
    const formData = new FormData();

    // Update the formData object
    formData.append('logo', value, value.name);
    const url = `${URLConstants.LOGOS_URL}/upload.json`;
    // await dispatch(addLogo(formData));
    const response = await uploadFile(url, formData);
    setLogo(response.data);
  };

  // On file select (from the pop up)
  const onBannerFileChange = (event) => {
    const { files } = event.target;
    onBannerFileUpload(event.target.files[0]);
  };

  // On file upload (click the upload button)
  const onBannerFileUpload = async (value) => {
    // Create an object of formData
    const formData = new FormData();

    // Update the formData object
    formData.append('banner', value, value.name);

    // await dispatch(addBanner(formData));

    const url = `${URLConstants.BANNERS_URL}/upload.json`;

    const response = await uploadFile(url, formData);
    setBanner(response.data);
  };

  const onCompanySubmit = (event) => {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }

    setValidated(true);
    event.preventDefault();
    const postData = {
      name,
      users: [
        {
          username: email,
          email,
          password,
          first_name: firstName,
          last_name: lastName,
          active: 1,
          user_status_id: 1,
        },
      ],
      short_desc: shortDesc,
      long_desc: longDesc,
      email_address: emailAddress,
      landline,
      fax,
      primary_logo_id: logo !== null ? logo.id : null,
      primary_banner_id: banner !== null ? banner.id : null,
      mobile,
      website_url: website,
      about_us_url: aboutUs,
      privacy_policy_url: privacyPolicy,
      terms_and_condition_url: termsAndCondition,
    };
    postCompany(postData);
  };

  const postCompany = async (data) => {
    try {
      await dispatch(addCompanies(data));
      navigate('../../companies');
      dispatch(resetCompany());
    } catch (error) {
      toast(error.message || 'Failed');
    }
  };

  const onNameChangeHandler = (event) => {
    // console.log(event.target.value);
    setName(event.target.value);
  };

  const onShortDescChangeHandler = (event) => {
    // console.log(event.target.value);
    setShortDesc(event.target.value);
  };

  const onLongDescChangeHandler = (event) => {
    // console.log(event.target.value);
    setLongDesc(event.target.value);
  };
  const onEmailAddressChangeHandler = (event) => {
    // console.log(event.target.value);
    setEmailAddress(event.target.value);
  };
  const onLandlineChangeHandler = (event) => {
    // console.log(event.target.value);
    setLandline(event.target.value);
  };
  function formatPhoneNumber(phoneNumberString) {
    const cleaned = `${phoneNumberString}`.replace(/\D/g, '');
    const match = cleaned.match(/^(\d{3})(\d{3})(\d{4})$/);
    if (match) {
      return `(${match[1]}) ${match[2]}-${match[3]}`;
    }
    return '';
  }
  const onFaxChangeHandler = (event) => {
    setFax(event.target.value);
  };
  const onMobileChangeHandler = (event) => {
    // console.log(event.target.value);
    setMobile(event.target.value);
  };

  const onWebsiteChangeHandler = (event) => {
    // console.log(event.target.value);
    setWebsite(event.target.value);
  };

  const onAboutUsChangeHandler = (event) => {
    // console.log(event.target.value);
    setAboutUs(event.target.value);
  };

  const onPrivacyPolicyChangeHandler = (event) => {
    // console.log(event.target.value);
    setPrivacyPolicy(event.target.value);
  };

  const onTermsAndConditionChangeHandler = (event) => {
    // console.log(event.target.value);
    setTermsAndCondition(event.target.value);
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

  const onLastNameChangeHandler = (event) => {
    console.log(event.target.value);
    setLastName(event.target.value);
  };

  const renderLogo = () => {
    return (
      <>
        {logo !== null && (
          // eslint-disable-next-line jsx-a11y/img-redundant-alt
          <img
            src={logo.url}
            width={100}
            height={100}
            style={{ backgroundColor: 'grey', padding: '2px' }}
            alt="employee photo"
          />
        )}
      </>
    );
  };

  const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  }));

  const renderBanner = () => {
    return (
      <>
        {banner !== null && (
          // eslint-disable-next-line jsx-a11y/img-redundant-alt
          <img
            src={banner.url}
            // width={100}
            height={100}
            style={{ backgroundColor: 'grey', padding: '2px' }}
            alt="employee photo"
          />
        )}
      </>
    );
  };

  return (
    <Row>
      <Col>
        <Form noValidate validated={validated} onSubmit={onCompanySubmit}>
          <Card>
            <Card.Header>
              Add Company
              <>
                <Button
                  className="btn-sm"
                  variant="primary"
                  type="button"
                  style={{
                    float: 'right',
                  }}
                  onClick={() => {
                    navigate(-1);
                  }}
                >
                  Back
                </Button>
              </>
            </Card.Header>
            <Card.Body>
              <Row>
                <Col md={6}>
                  {/* Name Field */}
                  <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Company Name</Form.Label>
                    <Form.Control
                      required
                      type="text"
                      placeholder="Company Name"
                      onChange={onNameChangeHandler}
                    />
                    <Form.Control.Feedback type="invalid">
                      Please provide a valid Name.
                    </Form.Control.Feedback>
                  </Form.Group>
                </Col>
                <Col md={6}>
                  {/* Username Field */}
                  <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Username</Form.Label>
                    <Form.Control
                      required
                      type="text"
                      placeholder="Your Email Address"
                      onChange={onEmailChangeHandler}
                    />
                    <Form.Control.Feedback type="invalid">
                      Please provide a valid Name.
                    </Form.Control.Feedback>
                  </Form.Group>
                </Col>
                <Col md={6}>
                  {/* Password Field */}
                  <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                      required
                      type="password"
                      placeholder="Password"
                      onChange={onPasswordChangeHandler}
                    />
                    <Form.Control.Feedback type="invalid">
                      Please provide a valid Password.
                    </Form.Control.Feedback>
                  </Form.Group>
                </Col>
                <Col md={6}>
                  {/* First Name Field */}
                  <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>First Name</Form.Label>
                    <Form.Control
                      required
                      type="text"
                      placeholder="First Name"
                      onChange={onFirstNameChangeHandler}
                    />
                    <Form.Control.Feedback type="invalid">
                      Please provide a valid Name.
                    </Form.Control.Feedback>
                  </Form.Group>
                </Col>
                <Col md={6}>
                  {/* Last Name Field */}
                  <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Last Name</Form.Label>
                    <Form.Control
                      required
                      type="text"
                      placeholder="Last Name"
                      onChange={onLastNameChangeHandler}
                    />
                    <Form.Control.Feedback type="invalid">
                      Please provide a valid Name.
                    </Form.Control.Feedback>
                  </Form.Group>
                </Col>

                <Col md={12}>
                  {' '}
                  <Button
                    onClick={() => setOpen(!open)}
                    aria-controls="company-more-details"
                    aria-expanded={open}
                  >
                    {open ? 'Hide Details' : 'More Details'}
                  </Button>{' '}
                </Col>
              </Row>

              <Collapse in={open}>
                <div id="company-more-details">
                  <Row>
                    <Col md={6}>
                      {renderLogo()}
                      <Form.Group controlId="formFile" className="mb-3">
                        <Form.Label>Company Logo</Form.Label>
                        <Form.Control type="file" onChange={onLogoFileChange} />
                      </Form.Group>
                    </Col>
                    <Col md={6}>
                      {renderBanner()}
                      <Form.Group controlId="formFile" className="mb-3">
                        <Form.Label>Company Banner</Form.Label>
                        <Form.Control
                          type="file"
                          onChange={onBannerFileChange}
                        />
                      </Form.Group>
                    </Col>
                    <Col md={6}>
                      {/* short Desc */}
                      <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Short Desc</Form.Label>
                        <Form.Control
                          type="text"
                          placeholder="Short Desc"
                          onChange={onShortDescChangeHandler}
                        />
                      </Form.Group>
                    </Col>
                    <Col md={6}>
                      {/* Description */}
                      <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Description</Form.Label>
                        <Form.Control
                          as="textarea"
                          rows={2}
                          placeholder="Description"
                          onChange={onLongDescChangeHandler}
                        />
                      </Form.Group>
                    </Col>
                    <Col md={6}>
                      {/* Email */}
                      <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Email Address</Form.Label>
                        <Form.Control
                          type="text"
                          placeholder="Email Address"
                          onChange={onEmailAddressChangeHandler}
                        />
                      </Form.Group>
                    </Col>
                    <Col md={6}>
                      {/* Landline */}
                      <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Office</Form.Label>
                        <NumberFormat
                          className="form-control"
                          format="(###) ###-####"
                          mask="_"
                          placeholder="Office"
                          onValueChange={(value) => {
                            console.log(value.value);
                            setLandline(value.value);
                          }}
                        />
                      </Form.Group>
                    </Col>
                    <Col md={6}>
                      {/* Fax */}
                      <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Fax</Form.Label>
                        <NumberFormat
                          className="form-control"
                          format="(###) ###-####"
                          mask="_"
                          placeholder="Fax"
                          onValueChange={(value) => {
                            setFax(value.value);
                          }}
                        />
                      </Form.Group>
                    </Col>
                    <Col md={6}>
                      {/* Mobile */}
                      <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Mobile</Form.Label>
                        <NumberFormat
                          className="form-control"
                          format="(###) ###-####"
                          mask="_"
                          placeholder="Mobile"
                          onValueChange={(value) => {
                            console.log(value.value);
                            setMobile(value.value);
                          }}
                        />
                      </Form.Group>
                    </Col>
                    <Col md={6}>
                      {/* Website */}
                      <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>WebSite</Form.Label>
                        <Form.Control
                          type="text"
                          placeholder="Website Url"
                          onChange={onWebsiteChangeHandler}
                        />
                      </Form.Group>
                    </Col>
                    <Col md={6}>
                      {/* Terms and condition */}
                      <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Terms And Conditions</Form.Label>
                        <Form.Control
                          type="text"
                          placeholder="Terms And Conditions"
                          onChange={onTermsAndConditionChangeHandler}
                        />
                      </Form.Group>
                    </Col>
                  </Row>
                </div>
              </Collapse>
            </Card.Body>
          </Card>
          <Button variant="primary" type="submit">
            Submit
          </Button>
        </Form>
      </Col>
    </Row>
  );
};

export default NewCompany;
