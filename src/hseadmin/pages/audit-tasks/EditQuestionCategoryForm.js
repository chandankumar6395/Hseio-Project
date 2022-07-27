import { Col, Form, Row } from 'react-bootstrap';
import React, { useEffect, useState } from 'react';
import { Button } from '@mui/material';
import { toast } from 'react-toastify';
import URLConstants from '../../constants/URLConstants';
import { fetchGET, fetchPUT } from '../../utils/NetworkUtils';

const EditQuestionCategoryForm = (props) => {
  const { CatID } = props;
  console.log('===================Gyan>>>>', CatID);
  const [validated, setValidated] = useState(false);
  const [name, setName] = useState('');
  const [auditTaskCategory, setAuditTaskCategory] = useState(null);
  // const [auditTaskId, setAuditTaskId] = useState(null);

  useEffect(() => {
    if (auditTaskCategory != null) {
      setName(auditTaskCategory.name);
      // setAuditTaskId(auditTaskCategory.audit_tasks.id);
    }
  }, [auditTaskCategory]);

  useEffect(() => {
    loadAuditTaskCategory();
  }, []);

  const loadAuditTaskCategory = async () => {
    // await dispatch(getAuditTaskCategories(id));
    try {
      const url = `${URLConstants.GET_AUDIT_TASK_CATEGORY_URL}/${CatID}.json`;
      const response = await fetchGET(url);
      console.log('==========> category Data', response.data);
      setAuditTaskCategory(response.data);
    } catch (error) {
      toast(error.message || 'Failed');
    }
  };

  const onAuditTaskCategoriesSubmit = (event) => {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }

    setValidated(true);
    event.preventDefault();
    // console.log('onAuditTaskCategoriesSubmit', auditTasks);
    const postData = {
      id: CatID,
      name,
      // audit_tasks: [{ id: auditTaskId }],
    };
    postAuditTaskCategories(postData);
  };

  const postAuditTaskCategories = async (data) => {
    console.log('Post Date===>', data);
    try {
      const url = `${URLConstants.GET_AUDIT_TASK_CATEGORY_URL}/${CatID}.json`;
      await fetchPUT(url, data);
    } catch (error) {
      toast(error.message || 'Failed');
    }
  };

  const onNameChangeHandler = (event) => {
    console.log(event.target.value);
    setName(event.target.value);
  };

  return (
    <>
      <Form
        noValidate
        validated={validated}
        onSubmit={onAuditTaskCategoriesSubmit}
      >
        <Row>
          <Col md={12}>
            {/* Job Stages */}
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Edit Category</Form.Label>
              <Form.Control
                type="text"
                value={name}
                onChange={onNameChangeHandler}
              />
            </Form.Group>
          </Col>
        </Row>
        <Button variant="contained" type="submit" color="primary">
          Submit
        </Button>
      </Form>
    </>
  );
};

export default EditQuestionCategoryForm;
