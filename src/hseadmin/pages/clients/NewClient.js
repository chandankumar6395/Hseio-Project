/* eslint-disable no-unused-vars */
import { Button, Card, Col, Form, Row } from 'react-bootstrap';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import NumberFormat from 'react-number-format';
import { addBanner } from '../../store/actions/banners';
import { loadCompanies } from '../../store/actions/companies';
import { KEY_COMPANY_ID, KEY_TOKEN } from '../../constants/Constants';
import CompanySelect from '../../components/widgets/CompanySelect';
import {
  addClient,
  loadClients,
  resetClient,
} from '../../store/actions/clients';
import { ADD_LOGO, addLogo } from '../../store/actions/logos';
import URLConstants from '../../constants/URLConstants';

const NewClient = () => {
  const localCompanyId = localStorage.getItem(KEY_COMPANY_ID);
  const [selectedLogoFile, setSelectedLogoFile] = useState('');
  const [validated, setValidated] = useState(false);
  const logo = useSelector((state) => state.logo.logo);
  const banner = useSelector((state) => state.banner.banner);

  const history = useNavigate();

  const [name, setName] = useState('');
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
  const [companyId, setCompanyId] = useState(-1);
  const companies = useSelector((state) => state.company.companies);
  const dispatch = useDispatch();

  useEffect(() => {
    fetchClients();
  }, []);

  const fetchClients = async () => {
    await dispatch(loadClients());
    await dispatch(loadCompanies(1, '', 'name', 'asc', 100));
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
    setSelectedLogoFile(event.target.files[0]);
    onLogoFileUpload(event.target.files[0]);
  };

  // On file upload (click the upload button)
  const onLogoFileUpload = async (value) => {
    // Create an object of formData
    const formData = new FormData();

    // Update the formData object
    formData.append('logo', value, value.name);

    // await dispatch(addLogo(formData));

    try {
      const url = `${URLConstants.LOGOS_URL}/upload.json`;

      console.log('addLogo url =', url);

      const token = localStorage.getItem(KEY_TOKEN);

      // const body = JSON.stringify(logo);
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });

      if (!response.ok) {
        if (response.status === 500) {
          throw new Error('Internal Server Error');
        }

        if (response.status === 401) {
          throw new Error('Unauthorized Access');
        }
      }

      const resData = await response.json();

      if (resData.data.error_code !== undefined) {
        throw new Error(resData.data.error_message);
      }

      console.log('addType --->', resData);
    } catch (error) {
      console.log(error);
      throw error;
    }
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

    await dispatch(addBanner(formData));
  };

  const onClientSubmit = (event) => {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }

    setValidated(true);
    event.preventDefault();
    const postData = {
      name,
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
      companies: [
        {
          id: localCompanyId !== null ? localCompanyId : companyId,
        },
      ],
    };
    postClient(postData);
  };

  const postClient = async (data) => {
    await dispatch(addClient(data));
    history('../../private/clients');
    dispatch(resetClient());
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

  const renderLogo = () => {
    return (
      <>
        {logo !== null && (
          // eslint-disable-next-line jsx-a11y/img-redundant-alt
          <img
            src={logo.url}
            // width={100}
            // height={100}
            style={{
              backgroundColor: 'grey',
              padding: '2px',
              height: 'auto',
              width: '100px',
            }}
            alt="employee photo"
          />
        )}
      </>
    );
  };

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

  const onCompanyChangeHandler = (selectedOption) => {
    setCompanyId(+selectedOption.value);
    // console.log(selectedOption.value);
  };

  return (
    <Row>
      <Col>
        <Card>
          <Card.Header>
            Add Client
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
            <Form noValidate validated={validated} onSubmit={onClientSubmit}>
              <Row>
                <Col md={6}>
                  {renderLogo()}
                  <Form.Group controlId="formFile" className="mb-3">
                    <Form.Label>Client Logo</Form.Label>
                    <Form.Control type="file" onChange={onLogoFileChange} />
                  </Form.Group>
                </Col>
                <Col md={6}>
                  {renderBanner()}
                  <Form.Group controlId="formFile" className="mb-3">
                    <Form.Label>Client Banner</Form.Label>
                    <Form.Control type="file" onChange={onBannerFileChange} />
                  </Form.Group>
                </Col>
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
                {localCompanyId === null && (
                  <Col md={6}>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                      <Form.Label>Company </Form.Label>
                      <CompanySelect
                        onChange={(value) => setCompanyId(companyId)}
                      />
                      <Form.Control.Feedback type="invalid">
                        Please provide a valid name.
                      </Form.Control.Feedback>
                    </Form.Group>
                  </Col>
                )}
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
                        console.log(value.value);
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
                      placeholder="Website"
                      onChange={onWebsiteChangeHandler}
                    />
                  </Form.Group>
                </Col>
                {/* <Col md={6}> */}
                {/*  /!* About Us *!/ */}
                {/*  <Form.Group className="mb-3" controlId="formBasicEmail"> */}
                {/*    <Form.Label>About Us URL</Form.Label> */}
                {/*    <Form.Control */}
                {/*      type="text" */}
                {/*      placeholder="About Us" */}
                {/*      onChange={onAboutUsChangeHandler} */}
                {/*    /> */}
                {/*  </Form.Group> */}
                {/* </Col> */}
                {/* <Col md={6}> */}
                {/*  /!* Privacy Policy *!/ */}
                {/*  <Form.Group className="mb-3" controlId="formBasicEmail"> */}
                {/*    <Form.Label>Privacy Policy URL</Form.Label> */}
                {/*    <Form.Control */}
                {/*      type="text" */}
                {/*      placeholder="Privacy Policy" */}
                {/*      onChange={onPrivacyPolicyChangeHandler} */}
                {/*    /> */}
                {/*  </Form.Group> */}
                {/* </Col> */}
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

export default NewClient;
