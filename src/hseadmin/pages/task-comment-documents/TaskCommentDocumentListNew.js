import { GridActionsCellItem } from '@mui/x-data-grid-pro';
import EditIcon from '@mui/icons-material/Edit';
import TVIcon from '@mui/icons-material/Tv';
import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { Helmet } from 'react-helmet-async';
import { Button, Grid, Typography } from '@mui/material';
import { Link, NavLink } from 'react-router-dom';
import AddIcon from '@mui/icons-material/Add';
import { CustomBreadcrumbs, CustomDivider } from '../../utils/MUIStyle';
import URLConstants from '../../constants/URLConstants';
import { fetchGET } from '../../utils/NetworkUtils';
import CustomDataTable from '../../components/CustomDataTable';

const COLUMNS = [
  { field: 'id', headerName: 'ID', width: 90 },
  {
    field: 'task_comment',
    headerName: 'Task Comment',
    width: 90,

    renderCell: (params) => {
      // eslint-disable-next-line camelcase
      const { task_comment } = params.row;
      // eslint-disable-next-line camelcase
      return <span>{task_comment && task_comment.notes}</span>;
    },
  },
  {
    field: 'document_id',
    headerName: 'Document',
    width: 150,

    renderCell: (params) => {
      const value = params.row.document;
      return <a href={value.url}>{value.name}</a>;
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
const TaskCommentDocumentListNew = () => {
  const [taskCommentDocument, setTaskCommentDocument] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // console.log('inside useEffect search text box');

    const timer = setTimeout(async () => {
      fetchTaskCommentDocuments();
    }, 400);

    return () => {
      clearTimeout(timer);
    };
  }, []);
  const fetchTaskCommentDocuments = async () => {
    try {
      setLoading(true);
      const response = await fetchGET(
        `${URLConstants.TASK_COMMENT_DOCUMENTS_URL}?limit=100&page=1`
      );

      setTaskCommentDocument(response.data);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      toast(error.message || 'Failed');
    }
  };
  return (
    <>
      <Helmet title="Task Comment Documents" />

      <Grid justifyContent="space-between" container spacing={10}>
        <Grid item>
          <Typography variant="h3" gutterBottom display="inline">
            Task Comment Document
          </Typography>

          <CustomBreadcrumbs aria-label="Breadcrumb" mt={2}>
            <Link component={NavLink} to="/">
              Dashboard
            </Link>
            <Typography>Task Comment Documents</Typography>
          </CustomBreadcrumbs>
        </Grid>
        <Grid item>
          <div>
            <NavLink to="/private/task-comment-documents/add">
              <Button variant="contained" color="primary">
                <AddIcon />
                Add Task Comment Document
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
            rows={taskCommentDocument}
            loading={loading}
          />
        </Grid>
      </Grid>
    </>
  );
};
export default TaskCommentDocumentListNew;
