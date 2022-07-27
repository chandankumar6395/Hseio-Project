/* eslint-disable camelcase */
// import { Button, Card, Col, Form, Row, Table } from 'react-bootstrap';
import React, { useEffect, useState } from 'react';
// import { useDispatch } from 'react-redux';
import { Link, NavLink } from 'react-router-dom';
import { GridActionsCellItem } from '@mui/x-data-grid-pro';
import EditIcon from '@mui/icons-material/Edit';
import TVIcon from '@mui/icons-material/Tv';
import { Helmet } from 'react-helmet-async';
import { Grid, Typography, Button } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { toast } from 'react-toastify';
// import { loadTrainingCourseTypeList } from '../../store/actions/training_courses_type';
import { CustomBreadcrumbs, CustomDivider } from '../../utils/MUIStyle';
import CustomDataTable from '../../components/CustomDataTable';
import { fetchGET } from '../../utils/NetworkUtils';
import URLConstants from '../../constants/URLConstants';

const COLUMNS = [
  { field: 'id', headerName: 'ID', width: 90 },
  { field: 'name', headerName: 'Name', width: 90 },
  { field: 'short_desc', headerName: 'Short Desc', width: 90 },
  { field: 'long_desc', headerName: 'Description', width: 90 },
  {
    field: 'actions',
    type: 'actions',
    headerName: 'Actions',
    width: 100,
    getActions: (params) => [
      <GridActionsCellItem
        icon={<EditIcon />}
        component={NavLink}
        to={`edit/${params.row.id}`}
        label="Edit"
      />,
      <GridActionsCellItem
        component={NavLink}
        to={`view/${params.row.id}`}
        icon={<TVIcon />}
        label="View"
      />,
    ],
  },
];

const TrainingCourseTypeList = () => {
  // const dispatch = useDispatch();
  const [trainingCourseType, setTrainingCourseType] = useState([]);
  const [loading, setLoading] = useState(false);

  // const [page, setPage] = useState(1);
  // const [searchText, setSearchText] = useState('');
  // const [sort, setSort] = useState('name');
  // const [direction, setDirection] = useState('asc');

  useEffect(() => {
    console.log('inside useEffect search text box');

    const timer = setTimeout(async () => {
      fetchTrainingCourseTypes();
    }, 400);

    return () => {
      clearTimeout(timer);
    };
  }, []);

  // const training_course_types = useSelector(
  //   (state) => state.trainingCourseType.training_course_types
  // );
  // const pagination = useSelector(
  //   (state) => state.trainingCourseType.pagination
  // );

  useEffect(() => {
    // fetchTrainingCourseTypes();
  }, []);

  const fetchTrainingCourseTypes = async () => {
    // await dispatch(loadTrainingCourseTypeList(1));
    try {
      setLoading(true);
      const response = await fetchGET(
        `${URLConstants.TRAINING_COURSE_TYPES_URL}?limit=100&page=1`
      );

      setTrainingCourseType(response.data);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      toast(error.message || 'Failed');
    }
  };

  // const onSearchTextChangeHandler = (event) => {
  //   setSearchText(event.target.value);
  // };
  //
  // const loadNextPage = async () => {
  //   setPage((prevState) => prevState + 1);
  //   await dispatch(
  //     loadTrainingCourseTypeList(page + 1, searchText, sort, direction)
  //   );
  // };
  // const loadPrevPage = async () => {
  //   setPage((prevState) => prevState - 1);
  //   await dispatch(
  //     loadTrainingCourseTypeList(page - 1, searchText, sort, direction)
  //   );
  // };

  // const renderTable = () => {
  //   return training_course_types.map((trainingCourseType) => {
  //     return (
  //       <tr key={trainingCourseType.id}>
  //         <td>{trainingCourseType.id}</td>
  //         <td>{trainingCourseType.name}</td>
  //         <td>{trainingCourseType.short_desc}</td>
  //         <td>{trainingCourseType.long_desc}</td>
  //         <td>
  //           <Link to={`view/${trainingCourseType.id}`}>
  //             <Button
  //               variant="dark"
  //               size="sm"
  //               style={{ marginBottom: '4px', marginRight: '4px' }}
  //             >
  //               View
  //             </Button>
  //           </Link>
  //           <Link to={`edit/${trainingCourseType.id}`}>
  //             <Button
  //               variant="dark"
  //               size="sm"
  //               style={{ marginBottom: '4px', marginRight: '4px' }}
  //             >
  //               Edit
  //             </Button>
  //           </Link>
  //         </td>
  //       </tr>
  //     );
  //   });
  // };
  // useEffect(() => {
  //   // console.log('inside useffect');
  //   // fetchTrainingCourseTypes();
  // }, [sort, direction]);
  //
  // const onArrowClickHandler = (title) => {
  //   setSort(title);
  //   if (direction === 'asc') {
  //     setDirection('desc');
  //   } else {
  //     setDirection('asc');
  //   }
  // };
  // const renderHeaderTitle = (title, sortName) => {
  //   let arrow = '';
  //
  //   if (sort === sortName) {
  //     if (direction === 'asc') {
  //       arrow = <span>&#8593;</span>;
  //     } else {
  //       arrow = <span>&#8595;</span>;
  //     }
  //   } else {
  //     arrow = '';
  //   }
  //
  //   return (
  //     <>
  //       <>
  //         {title}
  //         {arrow}
  //       </>
  //     </>
  //   );
  // };

  return (
    <>
      <Helmet title="Training Material Types" />

      <Grid justifyContent="space-between" container spacing={10}>
        <Grid item>
          <Typography variant="h3" gutterBottom display="inline">
            Training Material Types
          </Typography>

          <CustomBreadcrumbs aria-label="Breadcrumb" mt={2}>
            <Link component={NavLink} to="/">
              Dashboard
            </Link>
            <Typography>Training Material Types</Typography>
          </CustomBreadcrumbs>
        </Grid>
        <Grid item>
          <div>
            <NavLink to="/private/training-course-types/add">
              <Button variant="contained" color="primary">
                <AddIcon />
                Add Training Material Type
              </Button>
            </NavLink>
          </div>
        </Grid>
      </Grid>

      <CustomDivider my={6} />
      <Grid container spacing={6}>
        <Grid item xs={12}>
          <CustomDataTable
            columns={COLUMNS}
            rows={trainingCourseType}
            loading={loading}
          />
        </Grid>
      </Grid>
    </>
    // <Row>
    //   <Col>
    //     <Card>
    //       <Card.Header>
    //         List of Training Course Type
    //         <NavLink to="add">
    //           <Button
    //             className="btn-sm"
    //             variant="primary"
    //             type="button"
    //             style={{ float: 'right' }}
    //           >
    //             Add Training Course Type
    //           </Button>
    //         </NavLink>
    //       </Card.Header>
    //       <Card.Body>
    //         <CustomPagination
    //           pagination={pagination}
    //           loadPrevPage={loadPrevPage}
    //           loadNextPage={loadNextPage}
    //         />
    //
    //         <Form.Group className="mb-3" controlId="formBasicEmail">
    //           <Form.Control
    //             required
    //             type="text"
    //             placeholder="Search"
    //             onChange={onSearchTextChangeHandler}
    //           />
    //         </Form.Group>
    //         <div className="table-responsive">
    //           <Table striped bordered hover>
    //             <thead>
    //               <tr>
    //                 <th>
    //                   <span
    //                     onClick={() => onArrowClickHandler('id')}
    //                     aria-hidden="true"
    //                   >
    //                     {renderHeaderTitle('ID', 'id')}
    //                   </span>
    //                 </th>
    //                 <th>
    //                   <span
    //                     onClick={() => onArrowClickHandler('name')}
    //                     aria-hidden="true"
    //                   >
    //                     {renderHeaderTitle('Name', 'name')}
    //                   </span>
    //                 </th>
    //                 <th>Short Desc</th>
    //                 <th>Long Desc</th>
    //                 <th>Action</th>
    //               </tr>
    //             </thead>
    //             <tbody>{renderTable()}</tbody>
    //           </Table>
    //         </div>
    //         <CustomPagination
    //           pagination={pagination}
    //           loadPrevPage={loadPrevPage}
    //           loadNextPage={loadNextPage}
    //         />
    //       </Card.Body>
    //
    //       {/* <Card.Footer style={{marginBottom:'10px'}}> */}
    //
    //       {/* </Card.Footer> */}
    //     </Card>
    //   </Col>
    // </Row>
  );
};

export default TrainingCourseTypeList;
