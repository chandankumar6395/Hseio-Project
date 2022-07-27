/* eslint-disable */
import {Button, Card, Col, Form, Row} from 'react-bootstrap';
import React, {useEffect, useState} from 'react';
import {useNavigate, useParams} from 'react-router-dom';
import URLConstants from "../../constants/URLConstants";
import {fetchGET, fetchPUT, uploadFile} from "../../utils/NetworkUtils";
import {toast} from "react-toastify";
import CustomSelect from "../../components/widgets/CustomSelect";
import EmployeeSelect from "../../components/widgets/EmployeeSelect";
// import Select from "react-select";
import {toLocalDateTime, toServerDateTime} from '../../utils/Utils';
import moment from "moment";


const EditTrainingEventEmployee = () => {
    const [validated, setValidated] = useState(false);

    const {id} = useParams();

    const history = useNavigate();

    const [trainingEventId, setTrainingEventId] = useState('');
    const [employeeId, setEmployeeId] = useState('');
    // const [userId, setUserId] = useState('');
    const [photo, setPhoto] = useState(null);
    const [signature, setSignature] = useState(null);
    const [trainingCourseId, setTrainingCourseId] = useState('');
    const [certificateId, setCertificateId] = useState('');
    const [trainingEventEmployeeStatusId, setTrainingEventEmployeeStatusId] = useState('');
    const [completionDate, setCompletionDate] = useState('');

    const [trainingEventEmployee, setTrainingEventEmployee] = useState(null);

    useEffect(() => {

    }, []);

    useEffect(() => {
        if (trainingEventEmployee != null) {
            const date = new Date();
            const offset = date.getTimezoneOffset();
            console.log('time offset----->', offset);
            console.log('time----->', trainingEventEmployee.start_date_time);
            const dt = moment(trainingEventEmployee.start_date_time).format('YYYY-MM-DDTHH:MM');
            console.log('time----->', dt);
            console.log('time----->', dt);

            toLocalDateTime(trainingEventEmployee.start_date_time);

            setTrainingEventId(trainingEventEmployee.training_event_id);
            setEmployeeId(trainingEventEmployee.employee_id);
            // setUserId(trainingEventEmployee.user_id);
            // setPhoto(trainingEventEmployee.primary_photo_id);
            // setSignature(trainingEventEmployee.signature_id);
            setTrainingCourseId(trainingEventEmployee.training_course_id);
            setCertificateId(trainingEventEmployee.certificate_id);
            setTrainingEventEmployeeStatusId(trainingEventEmployee.training_event_employee_status_id);
            setCompletionDate(toLocalDateTime(trainingEventEmployee.completion_date));
        }
    }, [trainingEventEmployee]);


    useEffect(() => {
        loadTrainingEventEmployee();
        // fetchJobSites();
    }, []);

    const loadTrainingEventEmployee = async () => {
        try {
            const url = `${URLConstants.GET_TRAINING_EVENT_EMPLOYEE_URL}/${id}.json`;
            const response = await fetchGET(url);
            setTrainingEventEmployee(response.data);
        } catch (error) {
            toast(error.message || 'Failed');
        }
    };


    const onTrainingEventEmployeeSubmit = (event) => {
        const form = event.currentTarget;
        if (form.checkValidity() === false) {
            event.preventDefault();
            event.stopPropagation();
        }

        setValidated(true);
        event.preventDefault();
        const postData = {
            training_event_id: trainingEventId,
            employee_id: employeeId,
            // user_id: userId,
            primary_photo_id: photo === null ? trainingEventEmployee.primary_photo_id : photo.id,
            signature_id: signature === null ? trainingEventEmployee.signature_id : signature.id,
            training_course_id: trainingCourseId,
            certificate_id: certificateId,
            training_event_employee_status_id: trainingEventEmployeeStatusId,
            completion_date: toServerDateTime(completionDate)
        };
        postTrainingEventEmployee(postData);
    };

    const postTrainingEventEmployee = async (data) => {
        try {
            const url = `${URLConstants.GET_TRAINING_EVENT_EMPLOYEE_URL}/${id}.json`;
            await fetchPUT(url, data);
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

        // await dispatch(addPhoto(formData));
    }

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
    const renderPhoto = () => {
        if (photo === null) {
            return (
                <>
                    {trainingEventEmployee !== null && trainingEventEmployee.primary_photo !== null && (
                        // eslint-disable-next-line jsx-a11y/img-redundant-alt
                        <img
                            src={trainingEventEmployee.primary_photo.url}
                            width={100}
                            height={100}
                            style={{backgroundColor: 'grey', padding: '2px'}}
                            alt="photo"
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
                    src={photo.url}
                    width={100}
                    height={100}
                    style={{backgroundColor: 'grey', padding: '2px'}}
                    alt="photo"
                />
            </>
        );
    };

    const renderSignature = () => {
        if (signature === null) {
            return (
                <>
                    {trainingEventEmployee !== null && trainingEventEmployee.signature !== null && (
                        // eslint-disable-next-line jsx-a11y/img-redundant-alt
                        <img
                            src={trainingEventEmployee.signature.url}
                            width={100}
                            height={100}
                            style={{backgroundColor: 'grey', padding: '2px'}}
                            alt="signature"
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
                    src={signature.url}
                    width={100}
                    height={100}
                    style={{backgroundColor: 'grey', padding: '2px'}}
                    alt="signature"
                />
            </>
        );
    };

    return (
        <Row>
            <Col>
                <Card>
                    <Card.Header>
                        Add Training Event Employee
                        <>
                            <Button
                                className="btn-sm"
                                variant="primary"
                                type="button"
                                style={{
                                    float: 'right'
                                }}
                                onClick={() => {
                                    history(-1);
                                }}
                            >
                                Back
                            </Button>
                        </>
                    </Card.Header>
                    {trainingEventEmployee && (
                    <Card.Body>
                        <Form noValidate validated={validated} onSubmit={onTrainingEventEmployeeSubmit}>
                            {/* Training Event Field */}
                            <Row>
                                <Col md={6}>
                                    <Form.Group className="mb-3" controlId="formBasicEmail">
                                        <Form.Label>Training Event</Form.Label>
                                        <CustomSelect
                                            params={{url:URLConstants.TRAINING_EVENTS_URL}}

                                            onChange={(value)=>{
                                                setTrainingEventId(value);
                                            }}
                                            entity={trainingEventEmployee.training_event}

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
                                            entity={trainingEventEmployee.employee}
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
                                {/*            entity={trainingEventEmployee.user}*/}
                                {/*        />*/}
                                {/*    </Form.Group>*/}
                                {/*</Col>*/}

                                {/* Primary Photo Field */}
                                <Col md={6}>
                                    {renderPhoto()}
                                    <Form.Group controlId="formFile" className="mb-3">
                                        <Form.Label>Photo</Form.Label>
                                        <Form.Control type="file" onChange={onPhotoFileChange}/>
                                    </Form.Group>
                                </Col>

                                {/* Signature Field */}
                                <Col md={6}>
                                    {renderSignature()}
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
                                            entity={trainingEventEmployee.training_course}
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
                                            entity={trainingEventEmployee.certificate}
                                        />
                                    </Form.Group>
                                </Col>

                                {/* Training Event Employee Status Field */}
                                <Col md={6}>
                                    <Form.Group className="mb-3" controlId="formBasicEmail">
                                        <Form.Label>Training Event Employee Status</Form.Label>
                                        <CustomSelect
                                            params={{url:URLConstants.TRAINING_EVENT_EMPLOYEE_STATUSES_URL}}

                                            onChange={(value)=>{
                                                setTrainingEventEmployeeStatusId(value);
                                            }}
                                            entity={trainingEventEmployee.training_event_employee_status}
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
                                            value={completionDate}
                                        />
                                    </Form.Group>
                                </Col>
                            </Row>

                            <Button variant="primary" type="submit">

                                Submit
                            </Button>
                        </Form>
                    </Card.Body>
                    )}
                </Card>
            </Col>
        </Row>
    );
};

export default EditTrainingEventEmployee;
