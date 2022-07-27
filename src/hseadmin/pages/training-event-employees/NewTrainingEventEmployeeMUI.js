/* eslint-disable */
import {Col, Form, Row} from 'react-bootstrap';
import React, {useEffect, useState} from 'react';
import {Link, NavLink, useNavigate} from 'react-router-dom';
import URLConstants from "../../constants/URLConstants";
import {fetchPOST, uploadFile} from "../../utils/NetworkUtils";
import {toast} from "react-toastify";
import CustomSelect from "../../components/widgets/CustomSelect";
import EmployeeSelect from "../../components/widgets/EmployeeSelect";
import {Helmet} from "react-helmet-async";
import { Button ,Grid, Typography} from "@mui/material";
import {CustomBreadcrumbs, CustomDivider} from "../../utils/MUIStyle";
import {toServerDateTime} from "../../utils/Utils";


const NewTrainingEventEmployeeMUI = () => {
    const [validated, setValidated] = useState(false);

    const history = useNavigate();

    const [trainingEventId, setTrainingEventId] = useState(-1);
    const [employeeId, setEmployeeId] = useState('');
    // const [userId, setUserId] = useState('');
    const [photo, setPhoto] = useState(null);
    const [signature, setSignature] = useState(null);
    const [trainingCourseId, setTrainingCourseId] = useState('');
    const [certificateId, setCertificateId] = useState('');
    const [trainingEventEmployeeStatusId, setTrainingEventEmployeeStatusId] = useState(-1);
    const [completionDate, setCompletionDate] = useState('');

    useEffect(() => {

    }, []);



    const onTrainingEventEmployeeSubmit = (event) => {
        const form = event.currentTarget;
        if (form.checkValidity() === false) {
            event.preventDefault();
            event.stopPropagation();
        }

        setValidated(true);
        event.preventDefault();
        if (trainingEventId === -1) {
            toast('Please select training event');
        } else if (trainingEventEmployeeStatusId === -1) {
            toast('Please select training event employee status');
        } else {
        const postData = {
            training_event_id: trainingEventId,
            employee_id: employeeId,
            // user_id: userId,
            primary_photo_id: photo !== null ? photo.id : null,
            signature_id: signature !== null ? signature.id : null,
            training_course_id: trainingCourseId,
            certificate_id: certificateId,
            training_event_employee_status_id: trainingEventEmployeeStatusId,
            // completion_date: completionDate
            completion_date: completionDate !== '' ? toServerDateTime(completionDate) : null,
        };
        postTrainingEventEmployee(postData);
        }
    };

    const postTrainingEventEmployee = async (data) => {
        try {
            const url = URLConstants.TRAINING_EVENT_EMPLOYEES_URL;
            await fetchPOST(url, data);
            history('../../private/training-event-employees');
        } catch (error) {
            toast(error.message || 'Failed');
        }
    };

    const onCompletionDateChangeHandler = (event) => {
        // console.log(event.target.value);
        setCompletionDate(event.target.value);
    };

    const onPhotoFileChange = (event) => {
        onPhotoFileUpload(event.target.files[0]);
    };

    const onPhotoFileUpload = async (value) => {
        // Create an object of formData
        const formData = new FormData();

        // Update the formData object
        formData.append('photo', value, value.name);

        try {
            const response = await uploadFile(
                `${URLConstants.PHOTOS_URL}/upload.json`,
                formData
            );
            setPhoto(response.data);
        } catch (error) {
            toast.error('Unable to upload file ' || 'Failed');
        }
    };

    const onSignatureFileChange = (event) => {
        onSignatureFileUpload(event.target.files[0]);
    };

    const onSignatureFileUpload = async (value) => {
        // Create an object of formData
        const formData = new FormData();

        // Update the formData object
        formData.append('photo', value, value.name);

        try {
            const response = await uploadFile(
                `${URLConstants.PHOTOS_URL}/upload.json`,
                formData
            );
            setSignature(response.data);
        } catch (error) {
            toast.error('Unable to upload file ' || 'Failed');
        }
    };

    return (
        <>
            <Helmet title="Add Training Event Employee" />

            <Grid justifyContent="space-between" container spacing={10}>
                <Grid item>
                    <Typography variant="h3" gutterBottom display="inline">
                        Training Event Employee
                    </Typography>

                    <CustomBreadcrumbs aria-label="Breadcrumb" mt={2}>
                        <Link component={NavLink} to="/private/dashboard">
                            Dashboard
                        </Link>
                        <Link component={NavLink} to="/private/training-event-employees">
                            Training Event Employee
                        </Link>
                        <Typography>Add Training Event Employee</Typography>
                    </CustomBreadcrumbs>
                </Grid>
                <Grid item>
                    <div>
                        <NavLink to="/private/training-event-employees">
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

                        <Form noValidate validated={validated} onSubmit={onTrainingEventEmployeeSubmit}>
                            <Row>
                                <Col md={6}>
                                    <Form.Group className="mb-3" controlId="formBasicEmail">
                                        <Form.Label>Training Event *</Form.Label>
                                        <CustomSelect
                                            params={{url:URLConstants.TRAINING_EVENTS_URL}}

                                            onChange={(value)=>{
                                                setTrainingEventId(value);
                                            }}

                                        />
                                        <Form.Control.Feedback type="invalid">
                                            Please provide a valid training event.
                                        </Form.Control.Feedback>
                                    </Form.Group>
                                </Col>

                                {/* Employee Field */}
                                <Col md={6}>
                                    <Form.Group className="mb-3" controlId="formBasicEmail">
                                        <Form.Label>Employee</Form.Label>
                                        <EmployeeSelect
                                            onChange={(value) => {
                                                setEmployeeId(value);
                                            }}
                                        />
                                    </Form.Group>
                                </Col>

                                {/* User Field */}
                                {/*<Col md={6}>*/}
                                {/*    <Form.Group className="mb-3" controlId="formBasicEmail">*/}
                                {/*        <Form.Label>User</Form.Label>*/}
                                {/*        <CustomSelect*/}
                                {/*            params={{url:URLConstants.USERS_URL}}*/}

                                {/*            onChange={(value)=>{*/}
                                {/*                setUserId(value);*/}
                                {/*            }}*/}
                                {/*        />*/}
                                {/*    </Form.Group>*/}
                                {/*</Col>*/}

                                {/*<Col md={6}></Col>*/}


                                {/*Primary Photo Field*/}
                                <Col md={6}>
                                    {photo !== null && (
                                        // eslint-disable-next-line jsx-a11y/img-redundant-alt
                                        <img
                                            src={photo.url}
                                            width={100}
                                            height={100}
                                            style={{backgroundColor: 'grey', padding: '2px'}}
                                            alt="employee photo"
                                        />
                                    )}
                                    <Form.Group controlId="formFile" className="mb-3">
                                        <Form.Label>Photo</Form.Label>
                                        <Form.Control type="file" onChange={onPhotoFileChange} />
                                    </Form.Group>
                                </Col>

                                {/* Signature Field */}
                                <Col md={6}>
                                    {signature !== null && (
                                        // eslint-disable-next-line jsx-a11y/img-redundant-alt
                                        <img
                                            src={signature.url}
                                            width={100}
                                            height={100}
                                            style={{backgroundColor: 'grey', padding: '2px'}}
                                            alt="Signature"
                                        />
                                    )}
                                    <Form.Group controlId="formFile" className="mb-3">
                                        <Form.Label>Signature</Form.Label>
                                        <Form.Control type="file" onChange={onSignatureFileChange} />
                                    </Form.Group>
                                </Col>

                                {/* Training Course Field */}
                                <Col md={6}>
                                    <Form.Group className="mb-3" controlId="formBasicEmail">
                                        <Form.Label>Training Course</Form.Label>
                                        <CustomSelect
                                            params={{url:URLConstants.TRAINING_COURSES_URL}}

                                            onChange={(value)=>{
                                                setTrainingCourseId(value);
                                            }}
                                        />
                                    </Form.Group>
                                </Col>

                                {/* Certificate Field */}
                                <Col md={6}>
                                    <Form.Group className="mb-3" controlId="formBasicEmail">
                                        <Form.Label>Certificate</Form.Label>
                                        <CustomSelect
                                            params={{url:URLConstants.CERTIFICATES_URL}}

                                            onChange={(value)=>{
                                                setCertificateId(value);
                                            }}
                                        />
                                    </Form.Group>
                                </Col>

                                {/* Training Event Employee Status Field */}
                                <Col md={6}>
                                    <Form.Group className="mb-3" controlId="formBasicEmail">
                                        <Form.Label>Training Event Employee Status *</Form.Label>
                                        <CustomSelect
                                            params={{url:URLConstants.TRAINING_EVENT_EMPLOYEE_STATUSES_URL}}

                                            onChange={(value)=>{
                                                setTrainingEventEmployeeStatusId(value);
                                            }}
                                        />
                                        <Form.Control.Feedback type="invalid">
                                            Please provide a valid training event employee status.
                                        </Form.Control.Feedback>
                                    </Form.Group>
                                </Col>

                                {/* Completion Date Field */}
                                <Col md={6}>
                                    <Form.Group className="mb-3" controlId="formBasicEmail">
                                        <Form.Label>Completion Date</Form.Label>
                                        <Form.Control
                                            type="datetime-local"
                                            placeholder="Completion Date"
                                            onChange={onCompletionDateChangeHandler}
                                        />
                                    </Form.Group>
                                </Col>
                            </Row>

                            <Button variant="contained" type="submit" color="primary">
                                Submit
                            </Button>
                        </Form>
                </Grid>
            </Grid>
        </>
    );
};

export default NewTrainingEventEmployeeMUI;
