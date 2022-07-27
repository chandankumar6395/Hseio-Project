import { configureStore } from '@reduxjs/toolkit';
import counterReducer from './slices/counter';
import authReducers from '../hseadmin/store/reducers/auth';
import industryReducers from '../hseadmin/store/reducers/industries';
import addressReducers from '../hseadmin/store/reducers/addresses';
import typeReducers from '../hseadmin/store/reducers/types';
import certificateReducers from '../hseadmin/store/reducers/certificates';
import sampleCertificateReducers from '../hseadmin/store/reducers/sample_certificates';
import employeeReducers from '../hseadmin/store/reducers/employees';
import companyReducers from '../hseadmin/store/reducers/companies';
import userReducers from '../hseadmin/store/reducers/user';
import clientReducers from '../hseadmin/store/reducers/clients';
import jobSiteReducers from '../hseadmin/store/reducers/jobSites';
import logoReducers from '../hseadmin/store/reducers/logos';
import documentReducers from '../hseadmin/store/reducers/documents';
import photoReducers from '../hseadmin/store/reducers/photos';
import bannerReducers from '../hseadmin/store/reducers/banners';
import trainingCourseReducers from '../hseadmin/store/reducers/training_courses';
import trainingCourseTypeReducers from '../hseadmin/store/reducers/training_courses_type';
import dashboardReducer from '../hseadmin/store/reducers/dashboard';
import taskUserReducer from '../hseadmin/store/reducers/task_users';
import employeeDocumentReducer from '../hseadmin/store/reducers/employee_documents';
import taskReducer from '../hseadmin/store/reducers/tasks';
import divisionReducers from '../hseadmin/store/reducers/divisions';
import trainingEventReducer from '../hseadmin/store/reducers/trainingEvents';
import jobSiteCrewReducer from '../hseadmin/store/reducers/jobSiteCrews';
import jobSiteCrewMemberReducer from '../hseadmin/store/reducers/job_site_crew_members';
import auditTaskCategoryQuestionReducer from '../hseadmin/store/reducers/audit_task_category_questions';
import auditTaskCategoriesReducer from '../hseadmin/store/reducers/audit_task_categories';
import auditReportAnswersReducer from '../hseadmin/store/reducers/audit_report_answers';
import answerReducer from '../hseadmin/store/reducers/answers';
import auditTaskReducer from '../hseadmin/store/reducers/audit_tasks';
import auditReportReducer from '../hseadmin/store/reducers/audit_reports';
import auditTypeReducer from '../hseadmin/store/reducers/audit_types';
import auditReportDocumentReducer from '../hseadmin/store/reducers/audit_report_document';
import questionReducer from '../hseadmin/store/reducers/questions';
import trainingCoursesTrainingEventsReducer from '../hseadmin/store/reducers/ training_courses_training_events';
import trainingEventEmployeeReducer from '../hseadmin/store/reducers/training_event_employees';
import trainingEventEmployeeStatusReducer from '../hseadmin/store/reducers/training_event_employee_statuses';
import trainingEventStatusReducer from '../hseadmin/store/reducers/training_event_statuses';
import taskCategoryReducer from '../hseadmin/store/reducers/task_categories';
import taskCommentReducer from '../hseadmin/store/reducers/task_comments';
import taskCommentDocumentReducer from '../hseadmin/store/reducers/task_comment_documents';
import tasksManagerReducer from '../hseadmin/store/reducers/tasks_managers';
import incidentReducer from '../hseadmin/store/reducers/incidents';

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    auth: authReducers,
    industry: industryReducers,
    address: addressReducers,
    type: typeReducers,
    certificate: certificateReducers,
    employee: employeeReducers,
    company: companyReducers,
    user: userReducers,
    client: clientReducers,
    jobSite: jobSiteReducers,
    logo: logoReducers,
    document: documentReducers,
    banner: bannerReducers,
    photoReducers,
    trainingCourse: trainingCourseReducers,
    trainingCourseType: trainingCourseTypeReducers,
    dashboardReducer,
    employeeDocumentReducer,
    division: divisionReducers,
    trainingEvent: trainingEventReducer,
    // eslint-disable-next-line no-undef
    jobSiteCrew: jobSiteCrewReducer,
    // eslint-disable-next-line no-undef
    jobSiteCrewMember: jobSiteCrewMemberReducer,
    auditTaskCategoryQuestion: auditTaskCategoryQuestionReducer,
    auditTaskCategories: auditTaskCategoriesReducer,
    auditReportAnswers: auditReportAnswersReducer,
    answer: answerReducer,
    auditTask: auditTaskReducer,
    auditReport: auditReportReducer,
    auditType: auditTypeReducer,
    samplecertificate: sampleCertificateReducers,
    auditReportDocument: auditReportDocumentReducer,
    question: questionReducer,
    trainingCoursesTrainingEvents: trainingCoursesTrainingEventsReducer,
    trainingEventEmployee: trainingEventEmployeeReducer,
    trainingEventEmployeeStatus: trainingEventEmployeeStatusReducer,
    trainingEventStatus: trainingEventStatusReducer,
    task: taskReducer,
    taskCategory: taskCategoryReducer,
    taskUser: taskUserReducer,
    taskComment: taskCommentReducer,
    taskCommentDocument: taskCommentDocumentReducer,
    tasksManager: tasksManagerReducer,
    incident: incidentReducer,
  },
});
