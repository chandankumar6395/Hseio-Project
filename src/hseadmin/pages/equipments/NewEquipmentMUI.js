import React, { useState, useEffect } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { Button, Grid, Typography } from '@mui/material';
import { Card, Col, Form, Row } from 'react-bootstrap';
import Select from 'react-select';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import {
  COUNTRY_ID_USA,
  KEY_COMPANY_ID,
  YES_NO_DATA,
} from '../../constants/Constants';
import { CustomBreadcrumbs, CustomDivider } from '../../utils/MUIStyle';
import CompanySelect from '../../components/widgets/CompanySelect';
import { fetchPOST } from '../../utils/NetworkUtils';
import URLConstants from '../../constants/URLConstants';
import DivisionSelect from '../../components/widgets/DivisionSelect';
import JobSiteSelect from '../../components/widgets/JobSiteSelect';
import CustomSelect from '../../components/widgets/CustomSelect';
import CustomManualDropDownSelect from '../../components/widgets/CustomManualDropDownSelect';
import CustomManualDropDownMultiSelect from '../../components/widgets/CustomManualDropDownMultiSelect';
import StateSelect from '../../components/widgets/StateSelect';
import PhotoSelect from '../../components/widgets/PhotoSelect';

const NewEquipmentMUI = () => {
  const localCompanyId = localStorage.getItem(KEY_COMPANY_ID);
  const localDivisionId = useSelector((state) => state.auth.selectedDivision);
  const localJobSiteId = useSelector((state) => state.auth.selectedJobSite);

  console.log('NewEquipmentMUI localCompanyId', localCompanyId);
  console.log('NewEquipmentMUI localDivisionId', localDivisionId);
  console.log('NewEquipmentMUI localJobSiteId', localJobSiteId);
  const [validated, setValidated] = useState(false);
  const history = useNavigate();

  const [name, setName] = useState('');
  // const [shortDesc, setShortDesc] = useState('');
  // const [longDesc, setLongDesc] = useState('');
  const [modelId, setModelId] = useState('');
  const [year, setYear] = useState('');
  const [rental, setRental] = useState(-1);
  const [companyId, setCompanyId] = useState(null);
  const [divisionId, setDivisionId] = useState(null);
  const [jobSiteId, setJobSiteId] = useState(null);
  const [equipmentTypeId, setEquipmentTypeId] = useState('');
  const [equipmentDesignationId, setEquipmentDesignationId] = useState('');
  const [licenseStateId, setLicenseStateId] = useState(null);
  const [licenseNumber, setLicenseNumber] = useState('');
  const [cdlRequiredId, setCdlRequiredId] = useState(0);
  const [requiredCdlEndorsementsId, setRequiredCdlEndorsementsId] =
    useState('');
  const [dvirRequiredId, setDvirRequiredId] = useState(0);
  const [requiredInspectionId, setRequiredInspectionId] = useState([]);
  const [manufacturerId, setManufacturerId] = useState('');
  const [requiredCertificationId, setRequiredCertificationId] = useState('');
  const [requiredPpeId, setRequiredPpeId] = useState([]);
  const [photos, setPhotos] = useState([]);

  useEffect(() => {}, []);

  const onEquipmentSubmit = (event) => {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }
    setValidated(true);
    event.preventDefault();

    console.log('divisionId', divisionId);
    console.log('localDivisionId', localDivisionId);

    console.log('companyId', companyId);
    console.log('localCompanyId', localCompanyId);

    console.log('jobSiteId', jobSiteId);
    console.log('localJobSiteId', localJobSiteId);

    if (companyId === -1) {
      toast('Please select Company');
    } else if (divisionId === -1) {
      toast('Please select Division');
    } else if (jobSiteId === -1) {
      toast('Please select Project');
    } else if (name === '') {
      toast('Please Enter Equipment Name');
    } else if (rental === -1) {
      toast('Please select Rental');
    } else {
      const postData = {
        name,
        // short_desc: shortDesc,
        // long_desc: longDesc,
        model_id: modelId,
        year: year,
        rental: rental,
        division_id: localDivisionId !== -1 ? localDivisionId : divisionId,
        company_id: localCompanyId !== null ? localCompanyId : companyId,
        job_site_id: localJobSiteId !== -1 ? localJobSiteId : jobSiteId,
        equipment_type_id: equipmentTypeId,
        equipment_designation_id: equipmentDesignationId,
        license_state_id: licenseStateId,
        license_number: licenseNumber,
        cdl_required: cdlRequiredId,
        dvir_required: dvirRequiredId,
        required_cdl_endorsements: requiredCdlEndorsementsId,
        required_inspections: requiredInspectionId,
        manufacturer_id: manufacturerId,
        required_certifications: requiredCertificationId,
        required_ppes: requiredPpeId,
        photos,
      };
      console.log('Post Data ====>', postData);
      postEquipment(postData);
    }
  };

  const postEquipment = async (data) => {
    try {
      await fetchPOST(URLConstants.EQUIPMENTS_URL, data);
      history('../../private/equipments');
    } catch (error) {
      toast(error.message || 'Failed');
      console.log(error);
    }
  };

  const maxLengthCheck = (object) => {
    if (object.target.value.length > object.target.maxLength) {
      object.target.value = object.target.value.slice(
        0,
        object.target.maxLength
      );
    }
  };

  const onNameChangeHandler = (event) => {
    // console.log(event.target.value);
    setName(event.target.value);
  };
  // const onShortDescChangeHandler = (event) => {
  //   console.log(event.target.value);
  //   setShortDesc(event.target.value);
  // };
  // const onLongDescChangeHandler = (event) => {
  //   console.log(event.target.value);
  //   setLongDesc(event.target.value);
  // };
  const onYearChangeHandler = (event) => {
    console.log(event.target.value);
    setYear(event.target.value);
  };
  const onRentalChangeHandler = (selectedOption) => {
    // console.log(event.target.value);
    setRental(+selectedOption.value);
  };
  const onLicenseNumberChangeHandler = (event) => {
    console.log(event.value);
    setLicenseNumber(event.target.value);
  };
  const onCdlChangeHandler = (selectedOption) => {
    setCdlRequiredId(+selectedOption.value);
  };
  const onDvirChangeHandler = (selectedOption) => {
    // console.log(event.target.value);
    setDvirRequiredId(+selectedOption.value);
  };
  const onEquipementDesignationChangeHandler = (selectedOption) => {
    console.log('Select Designation', selectedOption);
    setEquipmentDesignationId(selectedOption);
  };
  return (
    <>
      <Helmet title="Add Equipment" />

      <Grid justifyContent="space-between" container spacing={10}>
        <Grid item>
          <Typography variant="h3" gutterBottom display="inline">
            Equipment
          </Typography>

          <CustomBreadcrumbs aria-label="Breadcrumb" mt={2}>
            <Link component={NavLink} to="/">
              Dashboard
            </Link>
            <Link component={NavLink} to="/private/equipments">
              Equipment
            </Link>
            <Typography>Add Equipment</Typography>
          </CustomBreadcrumbs>
        </Grid>
        <Grid item>
          <div>
            <NavLink to="/private/equipments">
              <Button variant="contained" color="primary">
                Back
              </Button>
            </NavLink>
          </div>
        </Grid>
      </Grid>

      <CustomDivider my={6} />
      <Card>
        <Card.Body>
          <Card.Title style={{ marginBottom: '10px' }}>Basic Info</Card.Title>
          <br />
          <Card.Text>
            <Form noValidate validated={validated} onSubmit={onEquipmentSubmit}>
              <Row>
                {localCompanyId === null && (
                  <Col md={6}>
                    {/* Company Id */}
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                      <Form.Label>Company *</Form.Label>
                      <CompanySelect
                        onChange={(value) => {
                          setCompanyId(value);
                        }}
                      />
                      <Form.Control.Feedback type="invalid">
                        Please provide a valid company.
                      </Form.Control.Feedback>
                    </Form.Group>
                  </Col>
                )}
                {localDivisionId === -1 && (
                  <Col md={6}>
                    {/* Division id */}
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                      <Form.Label>Division *</Form.Label>
                      <DivisionSelect
                        onChange={(value) => setDivisionId(value)}
                        companyId={
                          localCompanyId !== null ? localCompanyId : companyId
                        }
                      />
                      <Form.Control.Feedback type="invalid">
                        Please provide a valid division.
                      </Form.Control.Feedback>
                    </Form.Group>
                  </Col>
                )}
                {localJobSiteId === -1 && (
                  <Col md={6}>
                    {/* JobSite Id */}
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                      <Form.Label>Project *</Form.Label>
                      <JobSiteSelect
                        onChange={(value) => setJobSiteId(value)}
                        companyId={
                          localCompanyId !== null ? localCompanyId : companyId
                        }
                        divisionId={
                          localDivisionId !== -1 ? localDivisionId : divisionId
                        }
                      />
                      <Form.Control.Feedback type="invalid">
                        Please provide a valid jobSite.
                      </Form.Control.Feedback>
                    </Form.Group>
                  </Col>
                )}

                {/* Name Field */}
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
                      Please provide a valid Name.
                    </Form.Control.Feedback>
                  </Form.Group>
                </Col>
                {/* rental */}
                <Col md={6}>
                  <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Rental *</Form.Label>
                    <Select
                      required
                      options={YES_NO_DATA.map((item) => {
                        return { value: item.id, label: item.name };
                      })}
                      onChange={onRentalChangeHandler}
                    />
                  </Form.Group>
                </Col>
                <Col md={6}>
                  {/* Year */}
                  <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Year</Form.Label>
                    <Form.Control
                      type="number"
                      maxLength="4"
                      onInput={maxLengthCheck}
                      placeholder="Year"
                      onChange={onYearChangeHandler}
                    />
                  </Form.Group>
                </Col>
                {/* Equipment Type */}
                <CustomManualDropDownSelect
                  title="Equipment Type *"
                  url={URLConstants.EQUIPMENT_TYPES_URL}
                  onSelect={(value) => {
                    setEquipmentTypeId(value);
                    console.log('I am here in custom manual drop down.', value);
                  }}
                />
                {/* Manufacturer */}
                <CustomManualDropDownSelect
                  title="Manufacturer"
                  url={URLConstants.MANUFACTURERS_URL}
                  onSelect={(value) => {
                    setManufacturerId(value);
                    console.log('I am here in custom manual drop down.', value);
                  }}
                />
                {/* Model */}
                <CustomManualDropDownSelect
                  title="Model"
                  url={URLConstants.MODELS_URL}
                  onSelect={(value) => {
                    setModelId(value);
                    console.log('I am here in custom manual drop down.', value);
                  }}
                />
                <CustomManualDropDownMultiSelect
                  title="Required Inspections"
                  url={URLConstants.REQUIRED_INSPECTIONS_URL}
                  onSelect={(value) => {
                    setRequiredInspectionId(value);
                    console.log('I am here in custom manual drop down.', value);
                  }}
                />
                {/* Equipment Photos */}
                <Col md={12}>
                  <PhotoSelect
                    onChange={(values) => {
                      console.log('Photo Select', values);
                      setPhotos(values);
                    }}
                  />
                </Col>

                {/* Equipment Designation */}
                <Col md={12}>
                  <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Equipment Designation *</Form.Label>
                    <CustomSelect
                      params={{ url: URLConstants.EQUIPMENT_DESIGNATIONS_URL }}
                      onChange={(value) => {
                        onEquipementDesignationChangeHandler(value);
                      }}
                    />

                    <Form.Control.Feedback type="invalid">
                      Please provide a valid company.
                    </Form.Control.Feedback>
                  </Form.Group>
                </Col>
                {/* Short Desc Field */}
                {/* <Col md={6}> */}
                {/*  <Form.Group className="mb-3" controlId="formBasicEmail"> */}
                {/*    <Form.Label>Short Desc</Form.Label> */}
                {/*    <Form.Control */}
                {/*      type="text" */}
                {/*      placeholder="Short Desc" */}
                {/*      onChange={onShortDescChangeHandler} */}
                {/*    /> */}
                {/*  </Form.Group> */}
                {/* </Col> */}
                {/* /!* Long Desc Field *!/ */}
                {/* <Col md={6}> */}
                {/*  <Form.Group className="mb-3" controlId="formBasicEmail"> */}
                {/*    <Form.Label>Long Desc</Form.Label> */}
                {/*    <Form.Control */}
                {/*      as="textarea" */}
                {/*      rows={2} */}
                {/*      placeholder="Long Desc" */}
                {/*      onChange={onLongDescChangeHandler} */}
                {/*    /> */}
                {/*  </Form.Group> */}
                {/* </Col> */}
                {/* Registration Number */}
                {equipmentDesignationId === 1 && (
                  <>
                    <Col md={6}>
                      {/* Equipment Type Id */}
                      <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>License State</Form.Label>
                        <StateSelect
                          params={{ url: URLConstants.STATES_URL }}
                          onChange={(value) => setLicenseStateId(value)}
                          countryId={COUNTRY_ID_USA}
                        />

                        <Form.Control.Feedback type="invalid">
                          Please provide a valid company.
                        </Form.Control.Feedback>
                      </Form.Group>
                    </Col>
                    <Col md={6}>
                      {/* Model */}
                      <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>License Number</Form.Label>
                        <Form.Control
                          type="text"
                          rows={2}
                          placeholder="License Number"
                          onChange={onLicenseNumberChangeHandler}
                        />
                      </Form.Group>
                    </Col>
                    <Col md={6}>
                      <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>CDL Required *</Form.Label>
                        <Select
                          required
                          options={YES_NO_DATA.map((cdl) => {
                            return { value: cdl.id, label: cdl.name };
                          })}
                          onChange={onCdlChangeHandler}
                        />

                        <Form.Control.Feedback type="invalid">
                          Please provide a va lid cdl.
                        </Form.Control.Feedback>
                      </Form.Group>
                    </Col>
                    {cdlRequiredId === 1 && (
                      <>
                        <Col md={6}>
                          {/* rental */}
                          <Form.Group
                            className="mb-3"
                            controlId="formBasicEmail"
                          >
                            <Form.Label>DVIR Required *</Form.Label>
                            <Select
                              required
                              options={YES_NO_DATA.map((item) => {
                                return { value: item.id, label: item.name };
                              })}
                              onChange={onDvirChangeHandler}
                            />
                          </Form.Group>
                        </Col>
                        <CustomManualDropDownMultiSelect
                          title="Required Cdl Endorsements"
                          url={URLConstants.REQUIRED_CDL_ENDORSEMENTS_URL}
                          onSelect={(value) => {
                            setRequiredCdlEndorsementsId(value);
                            console.log(
                              'I am here in custom manual drop down.',
                              value
                            );
                          }}
                        />
                      </>
                    )}
                  </>
                )}

                {equipmentDesignationId === 2 && (
                  <>
                    <CustomManualDropDownMultiSelect
                      title="Required Certification"
                      url={URLConstants.REQUIRED_CERTIFICATIONS_URL}
                      onSelect={(value) => {
                        setRequiredCertificationId(value);
                        console.log(
                          'I am here in custom manual drop down.',
                          value
                        );
                      }}
                    />
                    <CustomManualDropDownMultiSelect
                      title="Required PPE"
                      url={URLConstants.REQUIRED_PPES_URL}
                      onSelect={(value) => {
                        setRequiredPpeId(value);
                        console.log(
                          'I am here in custom manual drop down.',
                          value
                        );
                      }}
                    />
                  </>
                )}
              </Row>
              <Button variant="contained" type="submit" color="primary">
                Submit
              </Button>
            </Form>
          </Card.Text>
        </Card.Body>
      </Card>
    </>
  );
};
export default NewEquipmentMUI;
