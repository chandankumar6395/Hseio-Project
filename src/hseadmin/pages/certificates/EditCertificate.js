/* eslint-disable no-unused-vars */
import { Button, Card, Col, Form, Row } from 'react-bootstrap';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import Select from 'react-select';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFilePdf } from '@fortawesome/free-regular-svg-icons';
import { toast } from 'react-toastify';
import moment from 'moment';
import { toLocalDate, toServerDate } from '../../utils/Utils';
import {
  getCertificate,
  updateCertificate,
} from '../../store/actions/certificates';
import { loadEmployees } from '../../store/actions/employees';
import { loadTrainingCourseList } from '../../store/actions/training_courses';
import { uploadDocumentFile } from '../../store/actions/documents';

const EditCertificate = () => {
  const [validated, setValidated] = useState(false);

  const history = useNavigate();

  const [name, setName] = useState('');
  const [shortDesc, setShortDesc] = useState('');
  const [longDesc, setLongDesc] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [score, setScore] = useState('');
  const [employeeId, setEmployeeId] = useState('');
  const [documentId, setDocumentId] = useState('');
  const [trainingCourseId, setTrainingCourseId] = useState('');

  const dispatch = useDispatch();
  const certificate = useSelector((state) => state.certificate.certificate);
  const { id } = useParams();
  const document = useSelector((state) => state.document.document);
  const employees = useSelector((state) => state.employee.employees);
  const trainingCourses = useSelector(
    (state) => state.trainingCourse.training_courses
  );

  const [selectedEmployeeOption, setSelectedEmployeeOption] = useState({});
  const [selectedTrainingCourseOption, setSelectedTrainingCourseOption] =
    useState({});
  useEffect(() => {
    if (certificate != null) {
      setName(certificate.name);
      setShortDesc(certificate.short_desc);
      setLongDesc(certificate.long_desc);
      setStartDate(certificate.start_date);
      setEndDate(certificate.end_date);
      setScore(certificate.score);
      setEmployeeId(certificate.employee_id);
      setTrainingCourseId(certificate.training_course_id);
      setDocumentId(certificate.document_id);
      setSelectedEmployeeOption({
        value: certificate.employee_id,
        label: `${certificate.employee.user.first_name} ${certificate.employee.user.last_name}`,
      });
      setSelectedTrainingCourseOption({
        value: certificate.training_course_id,
        label: `${certificate.training_course.name}`,
      });
    }
  }, [certificate]);

  useEffect(() => {
    // console.log('param is ' + params.id);
    loadCertificate();
    fetchEmployees();
    fetchTrainingCourses();
  }, []);

  const fetchEmployees = async () => {
    await dispatch(loadEmployees());
  };

  const fetchTrainingCourses = async () => {
    await dispatch(loadTrainingCourseList(1, '', 200));
  };
  const loadCertificate = async () => {
    await dispatch(getCertificate(id));
  };

  const onCertificateSubmit = (event) => {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
      const date = new Date();
      const offset = date.getTimezoneOffset();
      console.log('time offset----->', offset);
      console.log('time----->', certificate.start_date_time);
      const dt = moment(certificate.start_date_time).format('YYYY-MM-DDTHH:MM');
      console.log('time----->', dt);
      console.log('time----->', dt);

      toLocalDate(certificate.start_date_time);
    } else if (employeeId === null || employeeId === '') {
      toast('Please select Employee' || 'Failed');
    } else if (trainingCourseId === null || trainingCourseId === '') {
      toast('Please select Training Course' || 'Failed');
    } else if (documentId === null) {
      toast('Please select Certificate Document' || 'Failed');
    } else {
      const postData = {
        id,
        name,
        short_desc: shortDesc,
        long_desc: longDesc,
        start_date: toServerDate(startDate),
        end_date: toServerDate(endDate),
        score,
        document_id: document === null ? certificate.document_id : document.id,
        employee_id: employeeId,
        training_course_id: trainingCourseId,
      };
      postCertificate(postData);
    }
    setValidated(true);
    event.preventDefault();
  };

  const postCertificate = async (data) => {
    await dispatch(updateCertificate(data));
    history('../../private/certificates');
  };

  const onNameChangeHandler = (event) => {
    setName(event.target.value);
  };

  const onShortDescChangeHandler = (event) => {
    setShortDesc(event.target.value);
  };

  const onLongDescChangeHandler = (event) => {
    setLongDesc(event.target.value);
  };

  const onIssueDateChangeHandler = (event) => {
    // console.log(event.target.value);
    setStartDate(event.target.value);
  };
  const onExpirationDateChangeHandler = (event) => {
    // console.log(event.target.value);
    setEndDate(event.target.value);
  };
  const onScoreChangeHandler = (event) => {
    // console.log(event.target.value);
    setScore(event.target.value);
  };

  // On file select (from the pop up)
  const onDocumentFileChange = (event) => {
    // const {files} = event.target;
    // Object.values(files).forEach(function (file, index) {
    //   // myformData.append(index, file);
    //   // console.log('index = ', index, ` file = ${file}`);
    // });
    // console.log(event.target.files[0]);
    onDocumentFileUpload(event.target.files[0]);
  };

  // On file upload (click the upload button)
  const onDocumentFileUpload = async (value) => {
    // Create an object of formData
    const formData = new FormData();

    // Update the formData object
    formData.append('document', value, value.name);

    await dispatch(uploadDocumentFile(formData));
  };

  const onEmployeeChangeHandler = (selectedOption) => {
    setEmployeeId(+selectedOption.value);
    setSelectedEmployeeOption({
      value: selectedOption.value,
      label: selectedOption.label,
    });
    // console.log(selectedOption.value);
  };

  const onTrainingCourseChangeHandler = (selectedOption) => {
    setTrainingCourseId(+selectedOption.value);
    setSelectedTrainingCourseOption({
      value: selectedOption.value,
      label: selectedOption.label,
    });
    // console.log(selectedOption.value);
  };

  const renderDocument = () => {
    if (document === null) {
      return (
        <>
          {certificate !== null && certificate.document !== null && (
            // eslint-disable-next-line jsx-a11y/img-redundant-alt
            <p>
              <a href={certificate.document.url}>
                <FontAwesomeIcon icon={faFilePdf} size="3x" />{' '}
                {certificate.document.name}
              </a>
            </p>
          )}
        </>
      );
    }
    return (
      <>
        <p>
          <a href={document.url}>
            <FontAwesomeIcon icon={faFilePdf} size="3x" /> {document.name}
          </a>
        </p>
      </>
    );
  };

  return (
    <Row>
      <Col>
        <Card>
          <Card.Header>
            Edit Certificate
            <>
              <Button
                className="btn-sm"
                variant="primary"
                type="button"
                style={{ float: 'right' }}
                onClick={() => {
                  history(-1);
                }}
              >
                Back
              </Button>
            </>
          </Card.Header>
          <Card.Body>
            <Form
              noValidate
              validated={validated}
              onSubmit={onCertificateSubmit}
            >
              {renderDocument()}
              <Row>
                <Col md={12}>
                  {/* Employee Certificate Docunment */}
                  <Form.Group controlId="formFile" className="mb-3">
                    <Form.Label>Employee Certificate Document</Form.Label>
                    <Form.Control
                      type="file"
                      accept="application/pdf"
                      onChange={onDocumentFileChange}
                    />
                  </Form.Group>
                </Col>
                <Col md={6}>
                  {/* Select Employee */}
                  <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Select Employee</Form.Label>
                    <Select
                      required
                      options={employees.map((employee) => {
                        return {
                          value: employee.id,
                          label: `${employee.user.first_name} ${employee.user.last_name}`,
                        };
                      })}
                      value={selectedEmployeeOption}
                      onChange={onEmployeeChangeHandler}
                    />
                    <Form.Control.Feedback type="invalid">
                      Please provide a valid name.
                    </Form.Control.Feedback>
                  </Form.Group>
                </Col>
                <Col md={6}>
                  {/* Training Course id */}
                  <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Select Training Course</Form.Label>
                    <Select
                      required
                      options={trainingCourses.map((trainingCourse) => {
                        return {
                          value: trainingCourse.id,
                          label: trainingCourse.name,
                        };
                      })}
                      onChange={onTrainingCourseChangeHandler}
                      value={selectedTrainingCourseOption}
                    />
                    <Form.Control.Feedback type="invalid">
                      Please provide a valid name.
                    </Form.Control.Feedback>
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
                      value={name}
                    />
                    <Form.Control.Feedback type="invalid">
                      Please provide a valid name.
                    </Form.Control.Feedback>
                  </Form.Group>
                </Col>
                <Col md={6}>
                  {/* Short Desc */}
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
                  {/* Long Desc */}
                  <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Long Desc</Form.Label>
                    <Form.Control
                      as="textarea"
                      rows={2}
                      placeholder="Long Desc"
                      onChange={onLongDescChangeHandler}
                      value={longDesc}
                    />
                  </Form.Group>
                </Col>
                <Col md={6}>
                  {/* Issue Date */}
                  <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Issue Date</Form.Label>
                    <Form.Control
                      required
                      type="date"
                      placeholder="Start Date"
                      onChange={onIssueDateChangeHandler}
                      value={startDate}
                    />
                    <Form.Control.Feedback type="invalid">
                      Please provide a valid start date.
                    </Form.Control.Feedback>
                  </Form.Group>
                </Col>
                <Col md={6}>
                  {/* Expiration Date */}
                  <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Expiration Date</Form.Label>
                    <Form.Control
                      required
                      type="date"
                      placeholder="End Date"
                      onChange={onExpirationDateChangeHandler}
                      value={endDate}
                    />
                    <Form.Control.Feedback type="invalid">
                      Please provide a valid end date.
                    </Form.Control.Feedback>
                  </Form.Group>
                </Col>
                <Col md={6}>
                  {/* Score Field */}
                  <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Score</Form.Label>
                    <Form.Control
                      type="Number"
                      placeholder="Score"
                      onChange={onScoreChangeHandler}
                      value={score}
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

export default EditCertificate;
