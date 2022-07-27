/* eslint-disable */
import {Button, Card, Col, Form, Row} from 'react-bootstrap';
import React, {useEffect, useState} from 'react';

import {useDispatch} from 'react-redux';
import CompanySelect from '../../components/widgets/CompanySelect';
import DivisionSelect from '../../components/widgets/DivisionSelect';
import JobSiteSelect from '../../components/widgets/JobSiteSelect';
import {useNavigate} from 'react-router-dom';
import {KEY_COMPANY_ID} from "../../constants/Constants";
import URLConstants from "../../constants/URLConstants";
import {fetchPOST} from "../../utils/NetworkUtils";
import {toast} from "react-toastify";
import CustomSelect from "../../components/widgets/CustomSelect";
// import Select from "react-select";

const NewAuditTask = () => {
    const localCompanyId = localStorage.getItem(KEY_COMPANY_ID);

    // const localDivisionId = useSelector((state) => state.auth.selectedDivision);
    const [validated, setValidated] = useState(false);

    const history = useNavigate();

    const [name, setName] = useState('');
    const [shortDesc, setShortDesc] = useState('');
    const [longDesc, setLongDesc] = useState('');
    const [companyId, setCompanyId] = useState('');
    const [divisionId, setDivisionId] = useState('');
    const [jobSiteId, setJobSiteId] = useState('');
    const [auditTypeId, setAuditTypeId] = useState('');

    const dispatch = useDispatch();

    useEffect(() => {

    }, []);



    const onAuditTaskSubmit = (event) => {
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
            company_id: localCompanyId !== null ? localCompanyId : companyId,
            division_id: divisionId,
            job_site_id: jobSiteId,
            audit_type_id: auditTypeId,
        };
        postAuditTask(postData);
    };

    const postAuditTask = async (data) => {
        try {
            const url = URLConstants.AUDIT_TASKS_URL;
            await fetchPOST(url, data);
            history('../../private/audit-tasks');
        } catch (error) {
            toast(error.message || 'Failed');
        }
    };

    const onNameChangeHandler = (event) => {
        // console.log(event.target.value);
        setName(event.target.value);
    };

    const onShortDescChangeHandler = (event) => {
        console.log(event.target.value);
        setShortDesc(event.target.value);
    };

    const onLongDescChangeHandler = (event) => {
        console.log(event.target.value);
        setLongDesc(event.target.value);
    };


    const onAuditTypeChangeHandler = (event) => {
        console.log(event.target.value);
        setAuditTypeId(event.target.value);
    };

    return (
        <Row>
            <Col>
                <Card>
                    <Card.Header>
                        Add Audit Task
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
                    <Card.Body>
                        <Form noValidate validated={validated} onSubmit={onAuditTaskSubmit}>
                            {/* Name Field */}
                            <Row>
                                <Col md={6}>
                                    <Form.Group className="mb-3" controlId="formBasicEmail">
                                        <Form.Label>Name</Form.Label>
                                        <Form.Control
                                            required
                                            type="text"
                                            placeholder="Name"
                                            onChange={onNameChangeHandler}
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
                                        />
                                    </Form.Group>
                                </Col>

                                <Col md={6}>
                                    <Form.Group className="mb-3" controlId="formBasicEmail">
                                        <Form.Label>Description</Form.Label>
                                        <Form.Control
                                            as="textarea"
                                            placeholder="Description"
                                            onChange={onLongDescChangeHandler}
                                        />
                                    </Form.Group>
                                </Col>

                                {/* Company id Field */}
                                {localCompanyId === null && (
                                    <Col md={6}>
                                        {/* Company id */}
                                        <Form.Group className="mb-3" controlId="formBasicEmail">
                                            <Form.Label>Company Name</Form.Label>
                                            <CompanySelect
                                                onChange={(value) => {
                                                    setCompanyId(value);
                                                }}
                                            />
                                        </Form.Group>
                                    </Col>
                                )}

                                    {/* Division Field */}
                                <Col md={6}>
                                    {/* Division id */}
                                    <Form.Group className="mb-3" controlId="formBasicEmail">
                                        <Form.Label>Division Name</Form.Label>
                                        <DivisionSelect
                                            onChange={(value) => setDivisionId(value)}
                                            companyId={
                                                localCompanyId !== null ? localCompanyId : companyId
                                            }
                                        />
                                    </Form.Group>
                                </Col>

                                <Col md={6}>
                                    {/* Job Site Id */}
                                    <Form.Group className="mb-3" controlId="formBasicEmail">
                                        <Form.Label>Project</Form.Label>
                                        <JobSiteSelect
                                            onChange={(value) => {
                                                setJobSiteId(value);
                                            }}
                                            companyId={companyId}
                                            divisionId={divisionId}
                                        />
                                    </Form.Group>
                                </Col>

                                    <Col md={6}>
                                    <Form.Group className="mb-3" controlId="formBasicEmail">
                                        <Form.Label>Audit Type</Form.Label>
                                        <CustomSelect
                                            params={{url:URLConstants.AUDIT_TYPES_URL}}

                                            onChange={(value)=>{
                                                setAuditTypeId(value);
                                            }}

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

export default NewAuditTask;
