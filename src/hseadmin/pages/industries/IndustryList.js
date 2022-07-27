import React, { useEffect, useState } from 'react';
// import { useDispatch } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { GridActionsCellItem } from '@mui/x-data-grid-pro';
import EditIcon from '@mui/icons-material/Edit';
import TVIcon from '@mui/icons-material/Tv';
import { Helmet } from 'react-helmet-async';
import { Grid, Typography, Button, Link } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
// import CustomPagination from '../../components/CustomPagination';
// import { useState } from '@types/react';
import { toast } from 'react-toastify';
// import { loadIndustries } from '../../store/actions/industries';
import { CustomBreadcrumbs, CustomDivider } from '../../utils/MUIStyle';
import CustomDataTable from '../../components/CustomDataTable';
import { fetchGET } from '../../utils/NetworkUtils';
import URLConstants from '../../constants/URLConstants';

const COLUMNS = [
  { field: 'id', headerName: 'ID', width: 90 },
  { field: 'name', headerName: 'Industry', width: 90 },
  {
    field: 'parent_industry',
    headerName: 'Parent Industry',
    width: 150,
    valueFormatter: (params) => {
      return params.value ? params.value.name : '';
    },
    renderCell: (params) => {
      const { parent_industry: parentIndustry } = params.row;
      return <span> {parentIndustry ? parentIndustry.name : ''}</span>;
    },
  },
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

const IndustryList = () => {
  // const [sort, setSort] = useState('id');
  // const [direction, setDirection] = useState('asc');
  const [industries, setIndustries] = useState([]);
  const [loading, setLoading] = useState(false);

  // const dispatch = useDispatch();

  // const [page, setPage] = useState(1);
  // const [searchText, setSearchText] = useState('');

  useEffect(() => {
    console.log('inside useEffect search text box');

    const timer = setTimeout(async () => {
      fetchIndustries();
    }, 400);

    return () => {
      clearTimeout(timer);
    };
  }, []);

  // const industries = useSelector((state) => state.industry.industries);
  // const pagination = useSelector((state) => state.industry.pagination);

  useEffect(() => {
    // fetchIndustries();
  }, []);

  const fetchIndustries = async () => {
    try {
      setLoading(true);
      const response = await fetchGET(
        `${URLConstants.INDUSTRIES_URL}?limit=100&page=1`
      );

      setIndustries(response.data);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      toast(error.message || 'Failed');
    }
    // await dispatch(loadIndustries(1));
  };

  // const onSearchTextChangeHandler = (event) => {
  //   setSearchText(event.target.value);
  // };
  //
  // const loadNextPage = async () => {
  //   setPage((prevState) => prevState + 1);
  //   await dispatch(loadIndustries(page + 1, searchText, sort, direction));
  // };
  // const loadPrevPage = async () => {
  //   setPage((prevState) => prevState - 1);
  //   await dispatch(loadIndustries(page - 1, searchText, sort, direction));
  // };

  // const renderTable = () => {
  //   return industries.map((industry) => {
  //     return (
  //       <tr key={industry.id}>
  //         <td>{industry.id}</td>
  //         <td>{industry.name}</td>
  //         <td>
  //           {industry.parent_industry != null
  //             ? industry.parent_industry.name
  //             : ''}
  //         </td>
  //         <td>
  //           <Link to={`/private/industries/view/${industry.id}`}>
  //             <Button
  //               variant="dark"
  //               size="sm"
  //               style={{
  //                 marginBottom: '4px',
  //                 marginRight: '4px',
  //                 backgroundColor: '#007bff',
  //               }}
  //             >
  //               View
  //             </Button>
  //           </Link>
  //           <Link to={`/private/industries/edit/${industry.id}`}>
  //             <Button
  //               variant="dark"
  //               size="sm"
  //               style={{ marginBottom: '4px', marginRight: '4px' }}
  //             >
  //               Edit
  //             </Button>
  //           </Link>
  //         </td>
  //         {/* http://localhost:3000/indusries/edit/1   */}
  //       </tr>
  //     );
  //   });
  // };
  //
  // useEffect(() => {
  //   // console.log('inside useeffect');
  //   // fetchIndustries();
  // }, [sort, direction]);

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
  //       {title}
  //       {arrow}
  //     </>
  //   );
  // };

  return (
    <>
      <Helmet title="Industries" />

      <Grid justifyContent="space-between" container spacing={10}>
        <Grid item>
          <Typography variant="h3" gutterBottom display="inline">
            Industries
          </Typography>

          <CustomBreadcrumbs aria-label="Breadcrumb" mt={2}>
            <Link component={NavLink} to="/">
              Dashboard
            </Link>
            <Typography>Industries</Typography>
          </CustomBreadcrumbs>
        </Grid>
        <Grid item>
          <div>
            <NavLink to="/private/industries/add">
              <Button variant="contained" color="primary">
                <AddIcon />
                Add Industry
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
            rows={industries}
            loading={loading}
          />
        </Grid>
      </Grid>
    </>
    // <Row>
    //   <Col>
    //     <Card>
    //       <Card.Header>
    //         List of Industry
    //         <NavLink to="/private/industries/add">
    //           <Button
    //             className="btn-sm"
    //             variant="primary"
    //             type="button"
    //             style={{ float: 'right' }}
    //           >
    //             Add Industry
    //           </Button>
    //         </NavLink>
    //       </Card.Header>
    //       <Card.Body>
    //         <CustomPagination
    //           pagination={pagination}
    //           loadPrevPage={loadPrevPage}
    //           loadNextPage={loadNextPage}
    //         />
    //         <Form.Group className="mb-3" controlId="formBasicEmail">
    //           <Form.Control
    //             required
    //             type="text"
    //             placeholder="Search by name"
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
    //                     style={{ cursor: 'pointer' }}
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
    //                 <th>
    //                   <span
    //                     onClick={() =>
    //                       onArrowClickHandler('ParentIndustries.name')
    //                     }
    //                     aria-hidden="true"
    //                   >
    //                     {renderHeaderTitle(
    //                       'Parent Industry',
    //                       'ParentIndustries.name'
    //                     )}
    //                   </span>
    //                 </th>
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

export default IndustryList;
