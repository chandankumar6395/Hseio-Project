import React, { useState, useEffect } from 'react';
import { Link, NavLink, useNavigate, useParams } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { Button, Grid, Typography } from '@mui/material';
import { Col, Form, Row } from 'react-bootstrap';
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
import { fetchGET, fetchPUT } from '../../utils/NetworkUtils';
import URLConstants from '../../constants/URLConstants';
import DivisionSelect from '../../components/widgets/DivisionSelect';
import JobSiteSelect from '../../components/widgets/JobSiteSelect';
import CustomSelect from '../../components/widgets/CustomSelect';
import CustomManualDropDownSelect from '../../components/widgets/CustomManualDropDownSelect';
import CustomManualDropDownMultiSelect from '../../components/widgets/CustomManualDropDownMultiSelect';
import StateSelect from '../../components/widgets/StateSelect';
import PhotoSelect from '../../components/widgets/PhotoSelect';

const EditEquipment = () => {
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
  const [rental, setRental] = useState('');
  const [rentalOption, setRentalOption] = useState('');
  const [companyId, setCompanyId] = useState(-1);
  const [divisionId, setDivisionId] = useState(-1);
  const [jobSiteId, setJobSiteId] = useState('');
  const [equipmentTypeId, setEquipmentTypeId] = useState(-1);
  const [equipmentDesignationId, setEquipmentDesignationId] = useState(-1);
  const [licenseStateId, setLicenseStateId] = useState('');
  const [licenseNumber, setLicenseNumber] = useState('');
  const [cdlRequired, setCdlRequired] = useState(0);
  const [cdlRequiredOption, setCdlRequiredOption] = useState('');

  const [dvirRequiredId, setDvirRequiredId] = useState(0);
  const [dvirRequireOptions, setDvirRequiredOptions] = useState('');

  const [manufacturerId, setManufacturerId] = useState('');

  const [equipment, setEquipment] = useState(null);

  const [requiredInspections, setRequiredInspections] = useState([]);
  const [requiredInspectionOptions, setRequiredInspectionOptions] = useState(
    []
  );

  const [requiredPpes, setRequiredPpes] = useState([]);
  const [requiredPpeOptions, setRequiredPpeOptions] = useState([]);

  const [requiredCertifications, setRequiredCertifications] = useState([]);
  const [requiredCertificationOptions, setRequiredCertificationOptions] =
    useState([]);

  const [requiredCdlEndorsements, setRequiredCdlEndorsements] = useState([]);
  const [requiredCdlEndorsementOptions, setRequiredCdlEndorsementOptions] =
    useState([]);
  const [photos, setPhotos] = useState([]);

  const { id } = useParams();

  useEffect(() => {
    console.log(requiredInspections, requiredInspectionOptions, rental);
    if (equipment != null) {
      setName(equipment.name);
      // setShortDesc(equipment.short_desc);
      // setLongDesc(equipment.long_desc);
      setModelId(equipment.model_id);
      setManufacturerId(equipment.manufacturer_id);
      setYear(equipment.year);
      console.log('Rental', equipment.rental);
      setRental(equipment.rental);
      setRentalOption({
        value: equipment.rental,
        label: YES_NO_DATA.find((x) => x.id === equipment.rental).name,
      });
      setDivisionId(equipment.division_id);
      setCompanyId(equipment.company_id);
      setJobSiteId(equipment.job_site_id);
      setEquipmentTypeId(equipment.equipment_type_id);
      setEquipmentDesignationId(equipment.equipment_designation_id);
      setLicenseStateId(equipment.license_state_id);
      setLicenseNumber(equipment.license_number);
      setCdlRequired(equipment.cdl_required);
      setCdlRequiredOption({
        value: equipment.cdl_required,
        label: YES_NO_DATA.find((x) => x.id === equipment.cdl_required).name,
      });
      setDvirRequiredId(equipment.dvir_required);
      setRequiredCdlEndorsements(equipment.required_cdl_endoresments);
      setDvirRequiredId(equipment.dvir_required);
      setDvirRequiredOptions({
        value: equipment.dvir_required,
        label: YES_NO_DATA.find((x) => x.id === equipment.dvir_required).name,
      });

      const localPhotoArray = [];
      equipment.photos.forEach((photo) => {
        localPhotoArray.push({ id: photo.id });
      });
      setPhotos(localPhotoArray);
      // dvir_required: dvirRequiredId,
      // required_cdl_endorsements: requiredCdlEndorsementsId,
      setRequiredInspections(equipment.required_inspections);
      setRequiredCertifications(equipment.required_certifications);
      setRequiredPpes(equipment.required_ppes);
      setRequiredCdlEndorsements(equipment.required_cdl_endorsements);
      // manufacturer_id: manufacturerId,
      // required_certifications: requiredCertificationId,
      // required_ppes: requiredPpeId,
      // const localRequiredInspectionsOptions = [];
      // equipment.required_inspections.forEach((entity) => {
      //   localRequiredInspectionsOptions.push({
      //     id: entity.id,
      //   });
      // });
      // setRequiredInspectionOptions(localRequiredInspectionsOptions);

      setRequiredInspectionOptions(
        returnOptionValues(equipment.required_inspections)
      );

      setRequiredCertificationOptions(
        returnOptionValues(equipment.required_certifications)
      );

      setRequiredPpeOptions(returnOptionValues(equipment.required_ppes));

      setRequiredCdlEndorsementOptions(
        returnOptionValues(equipment.required_cdl_endorsements)
      );
    }
  }, [equipment]);

  const returnOptionValues = (entites) => {
    const localOptions = [];
    entites.forEach((entity) => {
      localOptions.push({
        id: entity.id,
      });
    });
    return localOptions;
  };

  useEffect(() => {
    // console.log('param is ' + params.id);
    loadEquipments();
  }, []);

  const loadEquipments = async () => {
    // await dispatch(getEmployee(id));

    const url = `${URLConstants.GET_EQUIPMENT_URL}/${id}.json`;
    const resData = await fetchGET(url);
    console.log('Get Data', resData.data);
    setEquipment(resData.data);
    console.log('Designation ID', resData.data);

    // console.log('Get Employee Date', resData.data);
  };

  useEffect(() => {}, []);

  const onEquipmentSubmit = (event) => {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }
    setValidated(true);
    event.preventDefault();
    if (name === '') {
      toast('Please Enter Equipment Name');
    } else {
      const postData = {
        id,
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
        cdl_required: cdlRequired,
        dvir_required: dvirRequiredId,
        required_cdl_endorsements: requiredCdlEndorsementOptions,
        required_inspections: requiredInspectionOptions,
        manufacturer_id: manufacturerId,
        required_certifications: requiredCertificationOptions,
        required_ppes: requiredPpeOptions,
        photos: photos,
      };
      console.log('Post Data ====>', postData);
      postEquipment(postData);
    }
  };

  const postEquipment = async (data) => {
    try {
      const url = `${URLConstants.GET_EQUIPMENT_URL}/${id}.json`;
      console.log('URL: ', url);
      const response = await fetchPUT(url, data);
      console.log('Submit Data', response);
      history('../../private/equipments');
    } catch (error) {
      toast(error.message || 'Failed');
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
    setYear(+event.target.value);
  };
  const onRentalChangeHandler = (selectedOption) => {
    // console.log(event.target.value);
    // selectOption  = {value:1, label:'Yes'}
    setRental(+selectedOption.value);
    setRentalOption(selectedOption);
  };
  const onLicenseNumberChangeHandler = (event) => {
    console.log(event.value);
    setLicenseNumber(event.target.value);
  };
  const onCdlChangeHandler = (selectedOption) => {
    setCdlRequired(+selectedOption.value);
    setCdlRequiredOption(selectedOption);
  };
  const onDvirChangeHandler = (selectedOption) => {
    console.log('dvir', selectedOption.value);
    console.log('selected dvir', selectedOption);
    setDvirRequiredId(+selectedOption.value);
    setDvirRequiredOptions(selectedOption);
  };
  const onEquipementDesignationChangeHandler = (value) => {
    console.log('Select Designation', value);
    setEquipmentDesignationId(value);
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
    <>
      <Helmet title="Edit Equipment" />

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
            <Typography>Edit Equipment</Typography>
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
      <Grid container spacing={6}>
        <Grid item xs={12}>
          {equipment && (
            <Form noValidate validated={validated} onSubmit={onEquipmentSubmit}>
              <Row>
                {localCompanyId === null && (
                  <Col md={6}>
                    {/* Company Id */}
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                      <Form.Label>Company</Form.Label>
                      <CompanySelect
                        onChange={(value) => {
                          setCompanyId(value);
                        }}
                        entity={equipment.company}
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
                      <Form.Label>Division</Form.Label>
                      <DivisionSelect
                        onChange={(value) => setDivisionId(value)}
                        companyId={companyId}
                        entity={equipment.division}
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
                      <Form.Label>Project</Form.Label>
                      <JobSiteSelect
                        onChange={(value) => setJobSiteId(value)}
                        companyId={companyId}
                        divisionId={divisionId}
                        entity={equipment.job_site}
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
                      placeholder="Name"
                      onChange={onNameChangeHandler}
                      value={name}
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
                      value={rentalOption}
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
                      value={year}
                    />
                  </Form.Group>
                </Col>
                {/* Equipment Type */}
                <CustomManualDropDownSelect
                  title="Equipment Type *"
                  url={URLConstants.EQUIPMENT_TYPES_URL}
                  entity={equipment.equipment_type}
                  onSelect={(value) => {
                    setEquipmentTypeId(value);
                    console.log('I am here in custom manual drop down.', value);
                  }}
                />
                {/* Manufacturer */}
                <CustomManualDropDownSelect
                  title="Manufacturer"
                  url={URLConstants.MANUFACTURERS_URL}
                  entity={equipment.manufacturer}
                  onSelect={(value) => {
                    setManufacturerId(value);
                    console.log('I am here in custom manual drop down.', value);
                  }}
                />
                {/* Model */}
                <CustomManualDropDownSelect
                  title="Model"
                  url={URLConstants.MODELS_URL}
                  entity={equipment.model}
                  onSelect={(value) => {
                    setModelId(value);
                    console.log('I am here in custom manual drop down.', value);
                  }}
                />
                <CustomManualDropDownMultiSelect
                  title="Required Inspections"
                  url={URLConstants.REQUIRED_INSPECTIONS_URL}
                  onSelect={(value) => {
                    setRequiredInspectionOptions(value);
                    console.log('I am here in custom manual drop down.', value);
                  }}
                  entities={requiredInspections}
                />
                {/* Equipment Photos */}
                <Col md={12}>
                  <PhotoSelect
                    onChange={(values) => {
                      console.log('Photo Select', values);
                      setPhotos(values);
                    }}
                    entities={equipment.photos}
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
                      entity={equipment.equipment_designation}
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
                        {/* <CustomSelect */}
                        {/*  params={{ url: URLConstants.STATES_URL }} */}
                        {/*  onChange={(value) => { */}
                        {/*    setLicenseStateId(value); */}
                        {/*  }} */}
                        {/*  entity={equipment.license_state} */}
                        {/* /> */}
                        <StateSelect
                          onChange={(value) => setLicenseStateId(value)}
                          countryId={COUNTRY_ID_USA}
                          entity={equipment.license_state}
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
                          value={licenseNumber}
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
                          value={cdlRequiredOption}
                        />

                        <Form.Control.Feedback type="invalid">
                          Please provide a va lid cdl.
                        </Form.Control.Feedback>
                      </Form.Group>
                    </Col>
                    {cdlRequired === 1 && (
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
                              value={dvirRequireOptions}
                            />
                          </Form.Group>
                        </Col>
                        <CustomManualDropDownMultiSelect
                          title="Required Cdl Endorsements"
                          url={URLConstants.REQUIRED_CDL_ENDORSEMENTS_URL}
                          onSelect={(value) => {
                            setRequiredCdlEndorsementOptions(value);
                            console.log(
                              'I am here in custom manual drop down.',
                              value
                            );
                          }}
                          entities={requiredCdlEndorsements}
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
                        setRequiredCertificationOptions(value);
                        console.log(
                          'I am here in custom manual drop down.',
                          value
                        );
                      }}
                      entities={requiredCertifications}
                    />
                    <CustomManualDropDownMultiSelect
                      title="Required PPE"
                      url={URLConstants.REQUIRED_PPES_URL}
                      onSelect={(value) => {
                        setRequiredPpeOptions(value);
                        console.log(
                          'I am here in custom manual drop down.',
                          value
                        );
                      }}
                      entities={requiredPpes}
                    />
                  </>
                )}
              </Row>
              <Button variant="contained" type="submit" color="primary">
                Submit
              </Button>
            </Form>
          )}
        </Grid>
      </Grid>
    </>
  );
};
export default EditEquipment;
