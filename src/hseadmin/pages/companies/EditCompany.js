import { Button, Card, Col, Collapse, Form, Row } from 'react-bootstrap';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import NumberFormat from 'react-number-format';
import { toast } from 'react-toastify';
import { addBanner } from '../../store/actions/banners';
import { uploadFile } from '../../utils/NetworkUtils';
import URLConstants from '../../constants/URLConstants';
import {
  getCompany,
  loadCompanies,
  resetCompany,
  updateCompany,
} from '../../store/actions/companies';

const EditCompany = () => {
  const [validated, setValidated] = useState(false);

  const history = useNavigate();

  const [name, setName] = useState('');
  // const [parentId, setParentId] = useState(-1);
  const [shortDesc, setShortDesc] = useState('');
  const [longDesc, setLongDesc] = useState('');
  const [emailAddress, setEmailAddress] = useState('');
  const [landline, setLandline] = useState('');
  const [fax, setFax] = useState('');
  const [mobile, setMobile] = useState('');
  const [website, setWebsite] = useState('');
  const [aboutUs, setAboutUs] = useState('');
  const [privacyPolicy, setPrivacyPolicy] = useState('');
  const [termsAndCondition, setTermsAndCondition] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  // eslint-disable-next-line no-unused-vars
  const [email, setEmail] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');

  const dispatch = useDispatch();

  const [open, setOpen] = useState(false);
  useEffect(() => {
    fetchCompanies();
  }, []);

  const fetchCompanies = async () => {
    await dispatch(loadCompanies());
  };

  const company = useSelector((state) => state.company.company);
  // const users = useSelector((state) => state.user.users);
  // const logo = useSelector((state) => state.logo.logo);
  // const banner = useSelector((state) => state.banner.banner);

  const [logo, setLogo] = useState(null);
  const [banner, setBanner] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    if (company != null) {
      setName(company.name);
      setShortDesc(company.short_desc);
      setLongDesc(company.long_desc);
      setEmailAddress(company.email_address);
      setLandline(company.landline);
      setFax(company.fax);
      setMobile(company.mobile);
      setWebsite(company.website_url);
      setAboutUs(company.about_us_url);
      setPrivacyPolicy(company.privacy_policy_url);
      setTermsAndCondition(company.terms_and_condition_url);
      if (company.users.length > 0) {
        setUsername(company.users[0].username);
        // setPassword(company.users[0].password);
        setFirstName(company.users[0].first_name);
        setLastName(company.users[0].last_name);
        setEmail(company.users[0].email);
      }
      // setParentId(company.parent_id);
    }
  }, [company]);

  useEffect(() => {
    // console.log('param is ' + params.id);
    loadCompany();
  }, []);

  const loadCompany = async () => {
    await dispatch(getCompany(id));
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
      id,
      name,
      short_desc: shortDesc,
      long_desc: longDesc,
      email_address: emailAddress,
      landline,
      fax,
      primary_logo_id: logo !== null ? logo.id : company.primary_logo_id,
      primary_banner_id:
        banner !== null ? banner.id : company.primary_banner_id,
      mobile,
      website_url: website,
      about_us_url: aboutUs,
      privacy_policy_url: privacyPolicy,
      terms_and_condition_url: termsAndCondition,
      // parent_id: parentId === -1 ? null : parentId
    };

    if (company.users.length > 0) {
      postData.users = [
        {
          id: company.users[0].id,
          username,
          email: username,
          password,
          first_name: firstName,
          last_name: lastName,
        },
      ];
    } else {
      postData.users = [
        {
          username,
          email: username,
          password,
          first_name: firstName,
          last_name: lastName,
          active: 1,
          user_status_id: 1,
        },
      ];
    }
    console.log(postData);

    postCompany(postData);
  };

  const postCompany = async (data) => {
    try {
      await dispatch(updateCompany(data));
      history('../../private/companies');
      dispatch(resetCompany());
    } catch (error) {
      toast(error.message || 'Failed');
    }
  };

  const onNameChangeHandler = (event) => {
    // console.log(event.target.value);
    setName(event.target.value);
  };
  // const onParentChangeHandler = (selectedOption) => {
  //
  //     setParentId(+selectedOption.value);
  //     console.log(selectedOption.value);
  // }
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
  // const onLandlineChangeHandler = (event) => {
  //   // console.log(event.target.value);
  //   setLandline(event.target.value);
  // };
  // const onFaxChangeHandler = (event) => {
  //   // console.log(event.target.value);
  //   setFax(event.target.value);
  // };
  // const onMobileChangeHandler = (event) => {
  //   // console.log(event.target.value);
  //   setMobile(event.target.value);
  // };

  const onWebsiteChangeHandler = (event) => {
    // console.log(event.target.value);
    setWebsite(event.target.value);
  };

  // const onAboutUsChangeHandler = (event) => {
  //   // console.log(event.target.value);
  //   setAboutUs(event.target.value);
  // };

  // const onPrivacyPolicyChangeHandler = (event) => {
  //   // console.log(event.target.value);
  //   setPrivacyPolicy(event.target.value);
  // };

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
  // const onEmailChangeHandler = (event) => {
  //   console.log(event.target.value);
  //   setEmail(event.target.value);
  // };

  const onFirstNameChangeHandler = (event) => {
    console.log(event.target.value);
    setFirstName(event.target.value);
  };

  const onLastNameChangeHandler = (event) => {
    console.log(event.target.value);
    setLastName(event.target.value);
  };

  // On file select (from the pop up)
  const onLogoFileChange = (event) => {
    // const {files} = event.target;
    //
    // Object.values(files).forEach(function (file, index) {
    //   // myformData.append(index, file);
    //   console.log('index = ', index, ` file = ${file}`);
    // });
    // console.log(event.target.files[0]);
    // Update the state
    onLogoFileUpload(event.target.files[0]);
  };

  // On file upload (click the upload button)
  const onLogoFileUpload = async (value) => {
    // Create an object of formData
    const formData = new FormData();

    // Update the formData object
    formData.append('logo', value, value.name);

    // await dispatch(addLogo(formData));

    const response = await uploadFile(
      `${URLConstants.LOGOS_URL}/upload.json`,
      formData
    );
    setLogo(response.data);
  };

  // On file select (from the pop up)
  const onBannerFileChange = (event) => {
    onBannerFileUpload(event.target.files[0]);
  };

  // On file upload (click the upload button)
  const onBannerFileUpload = async (value) => {
    // Create an object of formData
    const formData = new FormData();

    // Update the formData object
    formData.append('banner', value, value.name);

    await dispatch(addBanner(formData));
    // await uploadFile(`${URLConstants.LOGOS_URL}/upload.json`, formData);
    const response = await uploadFile(
      `${URLConstants.BANNER_UPLOAD_URL}`,
      formData
    );
    setBanner(response.data);
  };

  const renderLogo = () => {
    if (logo === null) {
      return (
        <>
          {company !== null && company.primary_logo !== null && (
            // eslint-disable-next-line jsx-a11y/img-redundant-alt
            <img
              src={company.primary_logo.url}
              // width={100}
              height={100}
              style={{ backgroundColor: 'grey', padding: '2px' }}
              alt="employee photo"
            />
          )}
        </>
      );
    }
    return (
      // eslint-disable-next-line react/jsx-no-comment-textnodes
      <>
        {/* eslint-disable-next-line jsx-a11y/img-redundant-alt */}
        <img
          src={logo.url}
          width={100}
          height={100}
          style={{ backgroundColor: 'grey', padding: '2px' }}
          alt="employee photo"
        />
      </>
    );
  };

  const renderBanner = () => {
    if (banner === null) {
      return (
        <>
          {company !== null && company.primary_banner !== null && (
            // eslint-disable-next-line jsx-a11y/img-redundant-alt
            <img
              src={company.primary_banner.url}
              height={100}
              style={{ backgroundColor: 'grey', padding: '2px' }}
              alt="employee photo"
            />
          )}
        </>
      );
    }
    return (
      // eslint-disable-next-line react/jsx-no-comment-textnodes
      <>
        {/* eslint-disable-next-line jsx-a11y/img-redundant-alt */}
        <img
          src={banner.url}
          height={100}
          width="auto"
          style={{ backgroundColor: 'grey', padding: '2px' }}
          alt="employee photo"
        />
      </>
    );
  };

  return (
    <Row>
      <Col>
        <Form noValidate validated={validated} onSubmit={onCompanySubmit}>
          <Card>
            <Card.Header>
              Edit Company
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
                      value={name}
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
                      disabled
                      type="text"
                      placeholder="Your Email Address"
                      onChange={onUsernameChangeHandler}
                      value={username}
                    />
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
                      value={password}
                    />
                    <Form.Control.Feedback type="invalid">
                      Please provide a valid Password.
                    </Form.Control.Feedback>
                  </Form.Group>
                </Col>

                {/* <Col md={6}> */}
                {/*  /!* Email Field *!/ */}
                {/*  <Form.Group className="mb-3" controlId="formBasicEmail"> */}
                {/*    <Form.Label>Email</Form.Label> */}
                {/*    <Form.Control */}
                {/*      required */}
                {/*      type="text" */}
                {/*      placeholder="Email" */}
                {/*      onChange={onEmailChangeHandler} */}
                {/*      value={email} */}
                {/*    /> */}
                {/*    <Form.Control.Feedback type="invalid"> */}
                {/*      Please provide a valid email. */}
                {/*    </Form.Control.Feedback> */}
                {/*  </Form.Group> */}
                {/* </Col> */}

                <Col md={6}>
                  {/* First Name Field */}
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
                      value={lastName}
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
                      {/* <Form.Group className="mb-3" controlId="formBasicEmail"> */}
                      {/*    <Form.Label>Parent Industry</Form.Label> */}
                      {/*    {company != null && <Select required options={companies.map(company => { */}

                      {/*        return {value: company.id, label: company.name} */}
                      {/*    }) */}
                      {/*    } */}
                      {/*        // value={{ */}
                      {/*        //     value: industry.parent_id, */}
                      {/*        //     label: industry.parent_industry.name */}
                      {/*        // }} */}
                      {/*                                 onChange={onParentChangeHandler}/>} */}
                      {/*    <Form.Control.Feedback type="invalid"> */}
                      {/*        Please provide a valid name. */}
                      {/*    </Form.Control.Feedback> */}
                      {/* </Form.Group> */}

                      {/* short Desc */}
                      <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Short Desc</Form.Label>
                        <Form.Control
                          type="text"
                          placeholder="Short Desc"
                          onChange={onShortDescChangeHandler}
                          value={shortDesc}
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
                          value={longDesc}
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
                          value={emailAddress}
                        />
                      </Form.Group>
                    </Col>
                    <Col md={6}>
                      {/* Landline */}
                      <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Office</Form.Label>
                        {/* <Form.Control */}
                        {/*  type="text" */}
                        {/*  placeholder="Landline" */}
                        {/*  onChange={onLandlineChangeHandler} */}
                        {/*  value={landline} */}
                        {/* /> */}
                        <NumberFormat
                          className="form-control"
                          format="(###) ###-####"
                          mask="_"
                          placeholder="Office"
                          onValueChange={(value) => {
                            console.log(value.value);
                            setLandline(value.value);
                          }}
                          value={landline}
                        />
                      </Form.Group>
                    </Col>
                    <Col md={6}>
                      {/* Fax Field */}
                      <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Fax</Form.Label>
                        {/* <Form.Control */}
                        {/*  type="text" */}
                        {/*  placeholder="Fax" */}
                        {/*  onChange={onFaxChangeHandler} */}
                        {/*  value={fax} */}
                        {/* /> */}
                        <NumberFormat
                          className="form-control"
                          format="(###) ###-####"
                          mask="_"
                          placeholder="Fax"
                          onValueChange={(value) => {
                            console.log(value.value);
                            setFax(value.value);
                          }}
                          value={fax}
                        />
                      </Form.Group>
                    </Col>
                    <Col md={6}>
                      {/* Mobile Field */}
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
                          value={mobile}
                        />
                      </Form.Group>
                    </Col>
                    <Col md={6}>
                      {/* Website */}
                      <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>WebSite</Form.Label>
                        <Form.Control
                          type="text"
                          placeholder="Website"
                          onChange={onWebsiteChangeHandler}
                          value={website}
                        />
                      </Form.Group>
                    </Col>
                    {/* <Col md={6}> */}
                    {/*  /!* About Us *!/ */}
                    {/*  <Form.Group className="mb-3" controlId="formBasicEmail"> */}
                    {/*    <Form.Label>About Us</Form.Label> */}
                    {/*    <Form.Control */}
                    {/*      type="text" */}
                    {/*      placeholder="About Us" */}
                    {/*      onChange={onAboutUsChangeHandler} */}
                    {/*      value={aboutUs} */}
                    {/*    /> */}
                    {/*  </Form.Group> */}
                    {/* </Col> */}
                    {/* <Col md={6}> */}
                    {/*  /!* Privacy Policy *!/ */}
                    {/*  <Form.Group className="mb-3" controlId="formBasicEmail"> */}
                    {/*    <Form.Label>Privacy Policy</Form.Label> */}
                    {/*    <Form.Control */}
                    {/*      type="text" */}
                    {/*      placeholder="Privacy Policy" */}
                    {/*      onChange={onPrivacyPolicyChangeHandler} */}
                    {/*      value={privacyPolicy} */}
                    {/*    /> */}
                    {/*  </Form.Group> */}
                    {/* </Col> */}
                    <Col md={6}>
                      {/* Terms and conditions */}
                      <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Terms And Conditions</Form.Label>
                        <Form.Control
                          type="text"
                          placeholder="Terms And Conditions"
                          onChange={onTermsAndConditionChangeHandler}
                          value={termsAndCondition}
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

export default EditCompany;
