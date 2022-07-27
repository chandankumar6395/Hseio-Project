/* eslint-disable */
import {Col, Form, Row} from 'react-bootstrap';
import React, {useEffect, useState} from 'react';
import {Link, NavLink, useNavigate, useParams} from 'react-router-dom';
import URLConstants from "../../constants/URLConstants";
import {fetchGET, fetchPUT} from "../../utils/NetworkUtils";
import {toast} from "react-toastify";
import {Helmet} from "react-helmet-async";
import {Button ,Grid, Typography} from "@mui/material";
import {CustomBreadcrumbs, CustomDivider} from "../../utils/MUIStyle";

const EditTrainingEventStatusMUI = () => {
    const [validated, setValidated] = useState(false);

    const history = useNavigate();

    const [name, setName] = useState('');
    const [shortDesc, setShortDesc] = useState('');
    const [longDesc, setLongDesc] = useState('');
    const [trainingEventStatus, setTrainingEventStatus] = useState(null);

    const params = useParams();
    const {id} = useParams();

    useEffect(() => {
        if (trainingEventStatus != null) {
            setName(trainingEventStatus.name);
            setShortDesc(
                trainingEventStatus.short_desc);
            setLongDesc(trainingEventStatus.long_desc);
        }
    }, [trainingEventStatus]);

    useEffect(() => {
        console.log('param is ' + params.id);
        loadTrainingEventStatus();
    }, []);

    const loadTrainingEventStatus = async () => {
        try {
            const url = `${URLConstants.GET_TRAINING_EVENT_STATUS_URL}/${id}.json`;
            const response = await fetchGET(url);
            setTrainingEventStatus(response.data);
        } catch (error) {
            toast(error.message || 'Failed');
        }
    };

    const onTrainingEventStatusSubmit = (event) => {
        const form = event.currentTarget;
        if (form.checkValidity() === false) {
            event.preventDefault();
            event.stopPropagation();
        }

        setValidated(true);
        event.preventDefault();
        if (name === '') {
            toast('Please Enter training event status  Name');
        } else {
            const postData = {
                name,
                short_desc: shortDesc,
                long_desc: longDesc,
            };
            postTrainingEventStatus(postData);
        }
    };

    const postTrainingEventStatus = async (data) => {
        try {
            const url = `${URLConstants.GET_TRAINING_EVENT_STATUS_URL}/${id}.json`;

            await fetchPUT(url, data);

            history('../../private/training-event-statuses');
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

    return (
        <>
            <Helmet title="Edit Training Event Status" />

            <Grid justifyContent="space-between" container spacing={10}>
                <Grid item>
                    <Typography variant="h3" gutterBottom display="inline">
                        Training Event Status
                    </Typography>

                    <CustomBreadcrumbs aria-label="Breadcrumb" mt={2}>
                        <Link component={NavLink} to="/private/dashboard">
                            Dashboard
                        </Link>
                        <Link component={NavLink} to="/private/training-event-statuses">
                            Training Event Statuses
                        </Link>
                        <Typography>Add Training Event Status</Typography>
                    </CustomBreadcrumbs>
                </Grid>
                <Grid item>
                    <div>
                        <NavLink to="/private/training-event-statuses">
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

                    {trainingEventStatus !== null && (
                            <Form noValidate validated={validated} onSubmit={onTrainingEventStatusSubmit}>
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
                                        <Form.Group className="mb-3" controlId="formBasicEmail">
                                            <Form.Label>Long Desc</Form.Label>
                                            <Form.Control
                                                as={"textarea"}
                                                col={2}
                                                placeholder="Long Desc"
                                                onChange={onLongDescChangeHandler}
                                                value={longDesc}
                                            />
                                        </Form.Group>
                                    </Col>
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

export default EditTrainingEventStatusMUI;

