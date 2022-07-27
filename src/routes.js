import React from 'react';

import async from './components/Async';

// All pages that rely on 3rd party components (other than MUI) are
// loaded asynchronously, to keep the initial JS bundle to a minimum size

// Layouts
import AuthLayout from './layouts/Auth';
import DashboardLayout from './layouts/Dashboard';
import DocLayout from './layouts/Doc';
// import PresentationLayout from './layouts/Presentation';

// Guards
import AuthGuard from './components/guards/AuthGuard';

// Auth components
import SignIn from './pages/auth/SignIn';
import SignUp from './pages/auth/SignUp';
import ResetPassword from './pages/auth/ResetPassword';
import Page404 from './pages/auth/Page404';
import Page500 from './pages/auth/Page500';

// Components
import Accordion from './pages/components/Accordion';
import Alerts from './pages/components/Alerts';
import Avatars from './pages/components/Avatars';
import Badges from './pages/components/Badges';
import Buttons from './pages/components/Buttons';
import Cards from './pages/components/Cards';
import Chips from './pages/components/Chips';
import Dialogs from './pages/components/Dialogs';
import Lists from './pages/components/Lists';
import Menus from './pages/components/Menus';
import Pagination from './pages/components/Pagination';
import Progress from './pages/components/Progress';
import Snackbars from './pages/components/Snackbars';
import Tooltips from './pages/components/Tooltips';

// Form components
import SelectionCtrls from './pages/forms/SelectionControls';
import Selects from './pages/forms/Selects';
import TextFields from './pages/forms/TextFields';

// Icon components
import MaterialIcons from './pages/icons/MaterialIcons';

// Page components
import Blank from './pages/pages/Blank';
import InvoiceDetails from './pages/pages/InvoiceDetails';
import InvoiceList from './pages/pages/InvoiceList';
import Orders from './pages/pages/Orders';
import Pricing from './pages/pages/Pricing';
import Settings from './pages/pages/Settings';
import Projects from './pages/pages/Projects';
import Chat from './pages/pages/Chat';

// Table components
import SimpleTable from './pages/tables/SimpleTable';
import AdvancedTable from './pages/tables/AdvancedTable';

// Documentation
import Welcome from './pages/docs/Welcome';
import GettingStarted from './pages/docs/GettingStarted';
import Routing from './pages/docs/Routing';
import Auth0 from './pages/docs/auth/Auth0';
import Cognito from './pages/docs/auth/Cognito';
import Firebase from './pages/docs/auth/Firebase';
import JWT from './pages/docs/auth/JWT';
import Guards from './pages/docs/Guards';
import EnvironmentVariables from './pages/docs/EnvironmentVariables';
import Deployment from './pages/docs/Deployment';
import Theming from './pages/docs/Theming';
import APICalls from './pages/docs/APICalls';
import Redux from './pages/docs/Redux';
import Internationalization from './pages/docs/Internationalization';
import ESLintAndPrettier from './pages/docs/ESLintAndPrettier';
import Support from './pages/docs/Support';
import Changelog from './pages/docs/Changelog';

// Landing
// import Landing from './pages/presentation/Landing';

// Protected routes
// import ProtectedPage from './pages/protected/ProtectedPage';
// import CompanyList from './hseadmin/pages/companies/CompanyList';
import CompanyListNew from './hseadmin/pages/companies/CompanyListNew';
import EmployeeListNew from './hseadmin/pages/employees/EmployeeListNew';
import ViewEmployee from './hseadmin/pages/employees/ViewEmployee';
import ViewDivision from './hseadmin/pages/divisions/ViewDivision';
import DivisionListNew from './hseadmin/pages/divisions/DivisionListNew';
import ClientListNew from './hseadmin/pages/clients/ClientListNew';
import JobSiteListNew from './hseadmin/pages/job-sites/JobSiteListNew';
import ViewJobSite from './hseadmin/pages/job-sites/ViewJobSite';
import ViewUser from './hseadmin/pages/users/ViewUser';
import UserListNew from './hseadmin/pages/users/UserListNew';
import ViewTrainingCourse from './hseadmin/pages/training-courses/ViewTrainingCourse';
import TrainingCourseListNew from './hseadmin/pages/training-courses/TrainingCourseListNew';
import DailyAuditTask from './hseadmin/pages/audit-tasks/DailyAuditTask';
import WeeklyAuditTask from './hseadmin/pages/audit-tasks/WeeklyAuditTask';
// import MonthlyAuditTask from './hseadmin/pages/audit-tasks/MonthlyAuditTask';
import AddAuditForm from './hseadmin/pages/audit-tasks/AddAudit';
import EditAuditForm from './hseadmin/pages/audit-tasks/EditAudit';
import PrintAuditForm from './hseadmin/pages/audit-tasks/PrintAudit';
import ViewAuditTask from './hseadmin/pages/audit-tasks/ViewAuditTask';
import AuditTaskListNew from './hseadmin/pages/audit-tasks/AuditTaskListNew';
import AuditTypeListNew from './hseadmin/pages/audit-types/AuditTypeListNew';
import ViewAuditType from './hseadmin/pages/audit-types/ViewAuditType';
import AuditTaskCategoriesListNew from './hseadmin/pages/audit-task-categories/AuditTaskCategoriesListNew';
import ViewAuditTaskCategories from './hseadmin/pages/audit-task-categories/ViewAuditTaskCategories';
import Dashboard from './hseadmin/pages/dashboard/Dashboard';
import ViewAuditReport from './hseadmin/pages/audit-reports/ViewAuditReport';
import AuditReportListNew from './hseadmin/pages/audit-reports/AuditReportListNew';
import TaskListNew from './hseadmin/pages/tasks/TaskListNew';
import ViewTask from './hseadmin/pages/tasks/ViewTask';
import ViewTrainingEvent from './hseadmin/pages/training-events/ViewTrainingEvent';
import TrainingEventListNew from './hseadmin/pages/training-events/TrainingEventListNew';
import ViewTrainingEventEmployee from './hseadmin/pages/training-event-employees/ViewTrainingEventEmployee';
import TrainingEventEmployeeListNew from './hseadmin/pages/training-event-employees/TrainingEventEmployeeListNew';
import QuestionListNew from './hseadmin/pages/questions/QuestionListNew';
import ViewQuestion from './hseadmin/pages/questions/ViewQuestion';
import ViewTaskCategories from './hseadmin/pages/task-categories/ViewTaskCategories';
import TaskCategoriesListNew from './hseadmin/pages/task-categories/TaskCategoriesListNew';
import TrainingEventEmployeeStatusListNew from './hseadmin/pages/training-event-employee-statuses/TrainingEventEmployeeStatusListNew';
import ViewTrainingEventEmployeeStatus from './hseadmin/pages/training-event-employee-statuses/ViewTrainingEventEmployeeStatus';
import TrainingEventStatusListNew from './hseadmin/pages/training-event-statuses/TrainingEventStatusListNew';
import ViewTrainingEventStatus from './hseadmin/pages/training-event-statuses/ViewTrainingEventStatus';
import ViewAnswer from './hseadmin/pages/answers/ViewAnswer';
import AnswerListNew from './hseadmin/pages/answers/AnswerListNew';
import SampleCertificateListNew from './hseadmin/pages/sample-certificates/SampleCertificateListNew';
import EditSampleCertificate from './hseadmin/pages/sample-certificates/EditSampleCertificate';
import ViewSampleCertificate from './hseadmin/pages/sample-certificates/ViewSampleCertificate';
import AddSampleCertificate from './hseadmin/pages/sample-certificates/AddSampleCertificate';
import ViewCertificate from './hseadmin/pages/certificates/ViewCertificate';
import CertificateListNew from './hseadmin/pages/certificates/CertificateListNew';
import ViewTaskCommentDocument from './hseadmin/pages/task-comment-documents/ViewTaskCommentDocument';
import TaskCommentDocumentListNew from './hseadmin/pages/task-comment-documents/TaskCommentDocumentListNew';
import TaskCommentListNew from './hseadmin/pages/tasks-comments/TaskCommentListNew';
import ViewTaskComment from './hseadmin/pages/tasks-comments/ViewTaskComment';
import ViewCompany from './hseadmin/pages/companies/ViewCompany';
import ViewClient from './hseadmin/pages/clients/ViewClient';
import NewDivisionMUI from './hseadmin/pages/divisions/NewDivisionMUI';
import EquipmentListNew from './hseadmin/pages/equipments/EquipmentListNew';
import NewEquipmentMUI from './hseadmin/pages/equipments/NewEquipmentMUI';
import EditEquipment from './hseadmin/pages/equipments/EditEquipment';
import ViewEquipment from './hseadmin/pages/equipments/ViewEquipment';
import NewEquipmentTypeMUI from './hseadmin/pages/equipment-types/NewEquipmentTypeMUI';
import EquipmentTypeListNew from './hseadmin/pages/equipment-types/EquipmentTypeListNew';
import EditEquipmentTypeMUI from './hseadmin/pages/equipment-types/EditEquipmentTypeMUI';
import ViewEquipmentType from './hseadmin/pages/equipment-types/ViewEquipmentType';
import NewIncidentMUI from './hseadmin/pages/incidents/NewIncidentMUI';
import IncidentListNew from './hseadmin/pages/incidents/IncidentListNew';
import EditIncidentMUI from './hseadmin/pages/incidents/EditIncidentMUI';
import ViewIncident from './hseadmin/pages/incidents/ViewIncident';
import NewIncidentTypeMUI from './hseadmin/pages/incident-types/NewIncidentTypeMUI';
import IncidentTypeListNew from './hseadmin/pages/incident-types/IncidentTypeListNew';
import EditIncidentType from './hseadmin/pages/incident-types/EditIncidentType';
import ViewIncidentType from './hseadmin/pages/incident-types/ViewIncidentType';
import NewCompanyMUI from './hseadmin/pages/companies/NewCompanyMUI';
import EditCompanyMUI from './hseadmin/pages/companies/EditCompanyMUI';
import EditDivisionMUI from './hseadmin/pages/divisions/EditDivisionMUI';
import NewEmployeeMUI from './hseadmin/pages/employees/NewEmployeeMUI';
import EditEmployeeMUI from './hseadmin/pages/employees/EditEmployeeMUI';
import NewClientMUI from './hseadmin/pages/clients/NewClientMUI';
import NewCertificateMUI from './hseadmin/pages/certificates/NewCertificateMUI';
import EditCertificateMUI from './hseadmin/pages/certificates/EditCertificateMUI';
import NewJobSiteMUI from './hseadmin/pages/job-sites/NewJobSiteMUI';
import EditJobSiteMUI from './hseadmin/pages/job-sites/EditJobSiteMUI';
import NewTrainingCourseMUI from './hseadmin/pages/training-courses/NewTrainingCourseMUI';
import EditTrainingCourseMUI from './hseadmin/pages/training-courses/EditTrainingCourseMUI';
import NewUserMUI from './hseadmin/pages/users/NewUserMUI';
import EditUserMUI from './hseadmin/pages/users/EditUserMUI';
import NewAuditTypeMUI from './hseadmin/pages/audit-types/NewAuditTypeMUI';
import EditAuditTypeMUI from './hseadmin/pages/audit-types/EditAuditTypeMUI';
import EditClient from './hseadmin/pages/clients/EditClient';
import NewAuditTaskMUI from './hseadmin/pages/audit-tasks/NewAuditTaskMUI';
import EditAuditTaskMUI from './hseadmin/pages/audit-tasks/EditAuditTaskMUI';
import NewAuditTaskCategoriesMUI from './hseadmin/pages/audit-task-categories/NewAuditTaskCategoriesMUI';
import EditAuditTaskCategoriesMUI from './hseadmin/pages/audit-task-categories/EditAuditTaskCategoriesMUI';
import NewAuditReportMUI from './hseadmin/pages/audit-reports/NewAuditReportMUI';
import EditAuditReportMUI from './hseadmin/pages/audit-reports/EditAuditReportMUI';
import NewQuestionMUI from './hseadmin/pages/questions/NewQuestionMUI';
import EditQuestionMUI from './hseadmin/pages/questions/EditQuestionMUI';
import NewTrainingEventMUI from './hseadmin/pages/training-events/NewTrainingEventMUI';
import EditTrainingEventMUI from './hseadmin/pages/training-events/EditTrainingEventMUI';
import NewTrainingEventEmployeeMUI from './hseadmin/pages/training-event-employees/NewTrainingEventEmployeeMUI';
import EditTrainingEventEmployeeMUI from './hseadmin/pages/training-event-employees/EditTrainingEventEmployeeMUI';
import NewTrainingEventStatusMUI from './hseadmin/pages/training-event-statuses/NewTrainingEventStatusMUI';
import EditTrainingEventStatusMUI from './hseadmin/pages/training-event-statuses/EditTrainingEventStatusMUI';
import NewTrainingEventEmployeeStatusMUI from './hseadmin/pages/training-event-employee-statuses/NewTrainingEventEmployeeStatusMUI';
import EditTrainingEventEmployeeStatusMUI from './hseadmin/pages/training-event-employee-statuses/EditTrainingEventEmployeeStatusMUI';
import NewAnswerMUI from './hseadmin/pages/answers/NewAnswerMUI';
import EditAnswerMUI from './hseadmin/pages/answers/EditAnswerMUI';
import NewTaskMUI from './hseadmin/pages/tasks/NewTaskMUI';
import EditTaskMUI from './hseadmin/pages/tasks/EditTaskMUI';
import NewTaskCategoriesMUI from './hseadmin/pages/task-categories/NewTaskCategoriesMUi';
import EditTaskCategoriesMUI from './hseadmin/pages/task-categories/EditTaskCategoriesMUI';
import NewTaskCommentDocumentMUI from './hseadmin/pages/task-comment-documents/NewTaskCommentDocumentMUI';
import EditTaskCommentDocumentMUI from './hseadmin/pages/task-comment-documents/EditTaskCommentDocumentMUI';
import NewTaskCommentMUI from './hseadmin/pages/tasks-comments/NewTaskCommentMUI';
import EditTaskCommentMUI from './hseadmin/pages/tasks-comments/EditTaskCommentMUI';
import NewInspection from './hseadmin/pages/inspections/NewInspection';
import InspectionList from './hseadmin/pages/inspections/InspectionList';
import EditInspection from './hseadmin/pages/inspections/EditInspection';
import ViewInspection from './hseadmin/pages/inspections/ViewInspection';
import NewJobWorkAuthorization from './hseadmin/pages/job-work-authorizations/NewJobWorkAuthorization';
import JobWorkAuthorizationListNew from './hseadmin/pages/job-work-authorizations/JobWorkAuthorizationListNew';
import EditJobWorkAuthorization from './hseadmin/pages/job-work-authorizations/EditJobWorkAuthorization';
import ViewNewJobWorkAuthorization from './hseadmin/pages/job-work-authorizations/ViewNewJobWorkAuthorization';
import ViewJob from './hseadmin/pages/jobs/ViewJob';
import NewJobMUI from './hseadmin/pages/jobs/NewJobMUI';
import JobListNew from './hseadmin/pages/jobs/JobListNew';
import EditJobMUI from './hseadmin/pages/jobs/EditJobMUI';
import NewJobItem from './hseadmin/pages/job-items/NewJobItem';
import JobItemList from './hseadmin/pages/job-items/JobItemList';
import EditJobItem from './hseadmin/pages/job-items/EditJobItem';
import ViewJobItem from './hseadmin/pages/job-items/ViewJobItem';
import TrainingCourseTypeList from './hseadmin/pages/training-course-types/TrainingCourseTypeList';
import NewTrainingCourseType from './hseadmin/pages/training-course-types/NewTrainingCourseType';
import EditTrainingCourseType from './hseadmin/pages/training-course-types/EditTrainingCourseType';
import ViewTrainingCourseType from './hseadmin/pages/training-course-types/ViewTrainingCourseType';
import ViewIndustry from './hseadmin/pages/industries/ViewIndustry';
import IndustryList from './hseadmin/pages/industries/IndustryList';
import NewIndustry from './hseadmin/pages/industries/NewIndustry';
import EditIndustry from './hseadmin/pages/industries/EditIndustry';
import ViewAddress from './hseadmin/pages/addresses/ViewAddress';
import AddressList from './hseadmin/pages/addresses/AddressList';
import NewAddress from './hseadmin/pages/addresses/NewAddress';
import EditAddress from './hseadmin/pages/addresses/EditAddress';
import ViewJobSiteCrew from './hseadmin/pages/job-site-crews/ViewJobSiteCrew';
import EditJobSiteCrew from './hseadmin/pages/job-site-crews/EditJobSiteCrew';
import JobSiteCrewMemberList from './hseadmin/pages/Job-site-crew-members/JobSiteCrewMemberList';
import NewJobSiteCrewMember from './hseadmin/pages/Job-site-crew-members/NewJobSiteCrewMember';
import EditJobSiteCrewMember from './hseadmin/pages/Job-site-crew-members/EditJobSiteCrewMember';
import ViewJobSiteCrewMember from './hseadmin/pages/Job-site-crew-members/ViewJobSiteCrewMember';
import NewJobSiteCrew from './hseadmin/pages/job-site-crews/NewJobSiteCrew';
import JobSiteCrewList from './hseadmin/pages/job-site-crews/JobSiteCrewList';
import AuditReportAnswerList from './hseadmin/pages/audit-report-answers/AuditReportAnswerList';
import NewAuditReportAnswers from './hseadmin/pages/audit-report-answers/NewAuditReportAnswers';
import EditAuditReportAnswers from './hseadmin/pages/audit-report-answers/EditAuditReportAnswers';
import ViewAuditReportAnswer from './hseadmin/pages/audit-report-answers/ViewAuditReportAnswer';
import InjuryClassList from './hseadmin/pages/Injury-classes/InjuryClassList';
import NewInjuryClass from './hseadmin/pages/Injury-classes/NewInjuryClass';
import EditInjuryClass from './hseadmin/pages/Injury-classes/EditInjuryClass';
import ViewInjuryClass from './hseadmin/pages/Injury-classes/ViewInjuryClass';
import NewIncidentInjuries from './hseadmin/pages/incident-injuries/NewIncidentInjuries';
import IncidentInjuriesList from './hseadmin/pages/incident-injuries/IncidentInjuriesList';
import EditIncidentInjuries from './hseadmin/pages/incident-injuries/EditIncidentInjuries';
import ViewIncidentInjuries from './hseadmin/pages/incident-injuries/ViewIncidentInjuries';
import NewRequiredCdlEndorsement from './hseadmin/pages/required-cdl-endorsement/NewRequiredCdlEndorsement';
import RequiredCdlEndorsementList from './hseadmin/pages/required-cdl-endorsement/RequiredCdlEndorsementList';
import EditRequiredCdlEndorsement from './hseadmin/pages/required-cdl-endorsement/EditRequiredCdlEndorsement';
import ViewRequiredCdlEndorsement from './hseadmin/pages/required-cdl-endorsement/ViewRequiredCdlEndorsement';
import NewRequiredCertification from './hseadmin/pages/required-certifications/NewRequiredCertification';
import RequiredCertificationList from './hseadmin/pages/required-certifications/RequiredCertificationList';
import EditRequiredCertification from './hseadmin/pages/required-certifications/EditRequiredCertification';
import ViewRequiredCertification from './hseadmin/pages/required-certifications/ViewRequiredCertification';
import BodyPartsList from './hseadmin/pages/body-parts/BodyPartsList';
import NewBodyParts from './hseadmin/pages/body-parts/NewBodyParts';
import EditBodyParts from './hseadmin/pages/body-parts/EditBodyParts';
import ViewBodyParts from './hseadmin/pages/body-parts/ViewBodyParts';
import NewIncidentVehicle from './hseadmin/pages/incident-vehicles/NewIncidentVehicle';
import IncidentVehicleList from './hseadmin/pages/incident-vehicles/IncidentVehicleList';
import EditIncidentVehicle from './hseadmin/pages/incident-vehicles/EditIncidentVehicle';
import ViewIncidentVehicle from './hseadmin/pages/incident-vehicles/ViewIncidentVehicle';
import NewRequiredPpes from './hseadmin/pages/required-ppes/NewRequiredPpesList';
import RequiredPpesList from './hseadmin/pages/required-ppes/RequiredPpesList';
import EditRequiredPpes from './hseadmin/pages/required-ppes/EditRequiredPpes';
import ViewRequiredPpes from './hseadmin/pages/required-ppes/ViewRequiredPpes';
import NewRequiredInspection from './hseadmin/pages/required-inspections/NewRequiredInspection';
import RequiredInspectionList from './hseadmin/pages/required-inspections/RequiredInspectionList';
import EditRequiredInspection from './hseadmin/pages/required-inspections/EditRequiredInspection';
import ViewRequiredInspection from './hseadmin/pages/required-inspections/ViewRequiredInspection';
import JobSiteAuditReports from './hseadmin/pages/audit-tasks/JobSiteAuditReports';
import EquipmentAuditReports from './hseadmin/pages/audit-tasks/EquipmentAuditReports';
import PerformAuditTask from './hseadmin/pages/audit-tasks/PerformAuditTask';
import ListAuditTask from './hseadmin/pages/audit-tasks/ListAuditTask';
import NewManHours from './hseadmin/pages/man-hours/NewManHours';
import ManHoursList from './hseadmin/pages/man-hours/ManHoursList';
import EditManHours from './hseadmin/pages/man-hours/EditManHours';
import ViewManHours from './hseadmin/pages/man-hours/ViewManHours';

// Dashboard components
const Default = async(() => import('./pages/dashboards/Default'));
const Analytics = async(() => import('./pages/dashboards/Analytics'));
const SaaS = async(() => import('./pages/dashboards/SaaS'));

// Form components
const Pickers = async(() => import('./pages/forms/Pickers'));
const Editors = async(() => import('./pages/forms/Editors'));
const Formik = async(() => import('./pages/forms/Formik'));

// Icon components
const FeatherIcons = async(() => import('./pages/icons/FeatherIcons'));
const Profile = async(() => import('./pages/pages/Profile'));
const Tasks = async(() => import('./pages/pages/Tasks'));
const Calendar = async(() => import('./pages/pages/Calendar'));

// Table components
const DataGrid = async(() => import('./pages/tables/DataGrid'));

// Chart components
const Chartjs = async(() => import('./pages/charts/Chartjs'));
const ApexCharts = async(() => import('./pages/charts/ApexCharts'));

// Maps components
const GoogleMaps = async(() => import('./pages/maps/GoogleMaps'));
const VectorMaps = async(() => import('./pages/maps/VectorMaps'));

const routes = [
  {
    path: '/',
    element: (
      <AuthGuard>
        <DashboardLayout />
      </AuthGuard>
    ),
    children: [
      {
        path: '',
        element: <Dashboard />,
      },
    ],
  },
  {
    path: 'companies',
    element: <DashboardLayout />,
    children: [
      {
        path: '',
        element: <CompanyListNew />,
      },
    ],
  },
  {
    path: 'dashboard',
    element: <DashboardLayout />,
    children: [
      {
        path: 'default',
        element: <Default />,
      },
      {
        path: 'analytics',
        element: <Analytics />,
      },
      {
        path: 'saas',
        element: <SaaS />,
      },
    ],
  },
  {
    path: 'pages',
    element: <DashboardLayout />,
    children: [
      {
        path: 'profile',
        element: <Profile />,
      },
      {
        path: 'settings',
        element: <Settings />,
      },
      {
        path: 'pricing',
        element: <Pricing />,
      },
      {
        path: 'chat',
        element: <Chat />,
      },
      {
        path: 'blank',
        element: <Blank />,
      },
    ],
  },
  {
    path: 'projects',
    element: <DashboardLayout />,
    children: [
      {
        path: '',
        element: <Projects />,
      },
    ],
  },
  {
    path: 'invoices',
    element: <DashboardLayout />,
    children: [
      {
        path: '',
        element: <InvoiceList />,
      },
      {
        path: 'detail',
        element: <InvoiceDetails />,
      },
    ],
  },
  {
    path: 'orders',
    element: <DashboardLayout />,
    children: [
      {
        path: '',
        element: <Orders />,
      },
    ],
  },

  {
    path: 'tasks',
    element: <DashboardLayout />,
    children: [
      {
        path: '',
        element: <Tasks />,
      },
    ],
  },
  {
    path: 'calendar',
    element: <DashboardLayout />,
    children: [
      {
        path: '',
        element: <Calendar />,
      },
    ],
  },
  {
    path: 'auth',
    element: <AuthLayout />,
    children: [
      {
        path: 'sign-in',
        element: <SignIn />,
      },
      {
        path: 'sign-up',
        element: <SignUp />,
      },
      {
        path: 'reset-password',
        element: <ResetPassword />,
      },
      {
        path: '404',
        element: <Page404 />,
      },
      {
        path: '500',
        element: <Page500 />,
      },
    ],
  },
  {
    path: 'components',
    element: <DashboardLayout />,
    children: [
      {
        path: 'accordion',
        element: <Accordion />,
      },
      {
        path: 'alerts',
        element: <Alerts />,
      },
      {
        path: 'avatars',
        element: <Avatars />,
      },
      {
        path: 'badges',
        element: <Badges />,
      },
      {
        path: 'buttons',
        element: <Buttons />,
      },
      {
        path: 'cards',
        element: <Cards />,
      },
      {
        path: 'chips',
        element: <Chips />,
      },
      {
        path: 'dialogs',
        element: <Dialogs />,
      },
      {
        path: 'lists',
        element: <Lists />,
      },
      {
        path: 'menus',
        element: <Menus />,
      },
      {
        path: 'pagination',
        element: <Pagination />,
      },
      {
        path: 'progress',
        element: <Progress />,
      },
      {
        path: 'snackbars',
        element: <Snackbars />,
      },
      {
        path: 'tooltips',
        element: <Tooltips />,
      },
    ],
  },
  {
    path: 'forms',
    element: <DashboardLayout />,
    children: [
      {
        path: 'pickers',
        element: <Pickers />,
      },
      {
        path: 'selection-controls',
        element: <SelectionCtrls />,
      },
      {
        path: 'selects',
        element: <Selects />,
      },
      {
        path: 'text-fields',
        element: <TextFields />,
      },
      {
        path: 'editors',
        element: <Editors />,
      },
      {
        path: 'formik',
        element: <Formik />,
      },
    ],
  },
  {
    path: 'tables',
    element: <DashboardLayout />,
    children: [
      {
        path: 'simple-table',
        element: <SimpleTable />,
      },
      {
        path: 'advanced-table',
        element: <AdvancedTable />,
      },
      {
        path: 'data-grid',
        element: <DataGrid />,
      },
    ],
  },
  {
    path: 'icons',
    element: <DashboardLayout />,
    children: [
      {
        path: 'material-icons',
        element: <MaterialIcons />,
      },
      {
        path: 'feather-icons',
        element: <FeatherIcons />,
      },
    ],
  },
  {
    path: 'charts',
    element: <DashboardLayout />,
    children: [
      {
        path: 'chartjs',
        element: <Chartjs />,
      },
      {
        path: 'apexcharts',
        element: <ApexCharts />,
      },
    ],
  },
  {
    path: 'maps',
    element: <DashboardLayout />,
    children: [
      {
        path: 'google-maps',
        element: <GoogleMaps />,
      },
      {
        path: 'vector-maps',
        element: <VectorMaps />,
      },
    ],
  },
  {
    path: 'documentation',
    element: <DocLayout />,
    children: [
      {
        path: 'welcome',
        element: <Welcome />,
      },
      {
        path: 'getting-started',
        element: <GettingStarted />,
      },
      {
        path: 'routing',
        element: <Routing />,
      },
      {
        path: 'auth/auth0',
        element: <Auth0 />,
      },
      {
        path: 'auth/cognito',
        element: <Cognito />,
      },
      {
        path: 'auth/firebase',
        element: <Firebase />,
      },
      {
        path: 'auth/jwt',
        element: <JWT />,
      },
      {
        path: 'guards',
        element: <Guards />,
      },
      {
        path: 'environment-variables',
        element: <EnvironmentVariables />,
      },
      {
        path: 'deployment',
        element: <Deployment />,
      },
      {
        path: 'theming',
        element: <Theming />,
      },
      {
        path: 'api-calls',
        element: <APICalls />,
      },
      {
        path: 'redux',
        element: <Redux />,
      },
      {
        path: 'internationalization',
        element: <Internationalization />,
      },
      {
        path: 'eslint-and-prettier',
        element: <ESLintAndPrettier />,
      },
      {
        path: 'support',
        element: <Support />,
      },
    ],
  },
  {
    path: 'changelog',
    element: <DocLayout />,
    children: [
      {
        path: '',
        element: <Changelog />,
      },
    ],
  },
  {
    path: 'private',
    element: (
      <AuthGuard>
        <DashboardLayout />
      </AuthGuard>
    ),
    children: [
      {
        path: '',
        element: <Dashboard />,
      },
      { path: 'dashboard', element: <Dashboard /> },
      // companies
      { path: 'companies', element: <CompanyListNew /> },
      { path: 'companies/add', element: <NewCompanyMUI /> },
      { path: 'companies/edit/:id', element: <EditCompanyMUI /> },
      { path: 'companies/view/:id', element: <ViewCompany /> },
      // employees
      { path: 'employees', element: <EmployeeListNew /> },
      { path: 'employees/add', element: <NewEmployeeMUI /> },
      { path: 'employees/edit/:id', element: <EditEmployeeMUI /> },
      { path: 'employees/view/:id', element: <ViewEmployee /> },
      // divisions
      { path: 'divisions', element: <DivisionListNew /> },
      { path: 'divisions/add', element: <NewDivisionMUI /> },
      { path: 'divisions/edit/:id', element: <EditDivisionMUI /> },
      { path: 'divisions/view/:id', element: <ViewDivision /> },
      // clients
      { path: 'clients', element: <ClientListNew /> },
      { path: 'clients/add', element: <NewClientMUI /> },
      { path: 'clients/edit/:id', element: <EditClient /> },
      { path: 'clients/view/:id', element: <ViewClient /> },

      // jobSite
      { path: 'job-sites', element: <JobSiteListNew /> },
      { path: 'job-sites/add', element: <NewJobSiteMUI /> },
      { path: 'job-sites/edit/:id', element: <EditJobSiteMUI /> },
      { path: 'job-sites/view/:id', element: <ViewJobSite /> },
      // users
      { path: 'users', element: <UserListNew /> },
      { path: 'users/add', element: <NewUserMUI /> },
      { path: 'users/edit/:id', element: <EditUserMUI /> },
      { path: 'users/view/:id', element: <ViewUser /> },

      // training courses
      { path: 'training-courses', element: <TrainingCourseListNew /> },
      { path: 'training-courses/add', element: <NewTrainingCourseMUI /> },
      { path: 'training-courses/edit/:id', element: <EditTrainingCourseMUI /> },
      { path: 'training-courses/view/:id', element: <ViewTrainingCourse /> },

      // training course types
      { path: 'training-course-types', element: <TrainingCourseTypeList /> },
      { path: 'training-course-types/add', element: <NewTrainingCourseType /> },
      {
        path: 'training-course-types/edit/:id',
        element: <EditTrainingCourseType />,
      },
      {
        path: 'training-course-types/view/:id',
        element: <ViewTrainingCourseType />,
      },

      // audit tasks
      { path: 'audit-tasks', element: <AuditTaskListNew /> },
      {
        path: 'daily-audits-reports/:id',
        element: <DailyAuditTask />,
      },
      {
        path: 'weekly-audits-reports/:id',
        element: <WeeklyAuditTask />,
      },
      {
        path: 'job-site-audit-reports/:id',
        element: <JobSiteAuditReports />,
      },
      {
        path: 'equipment-audit-reports/:id',
        element: <EquipmentAuditReports />,
      },
      // {
      //   path: 'monthly-audits-reports/:id',
      //   element: <MonthlyAuditTask />,
      // },
      {
        path: 'perform-audit-task',
        element: <PerformAuditTask />,
      },
      {
        path: 'list-audit-task',
        element: <ListAuditTask />,
      },
      { path: 'add-audit-form/:id', element: <AddAuditForm /> },
      { path: 'edit-audit-form/:id', element: <EditAuditForm /> },
      { path: 'print-audit-form/:id', element: <PrintAuditForm /> },
      { path: 'audit-tasks/add', element: <NewAuditTaskMUI /> },
      { path: 'audit-tasks/edit/:id', element: <EditAuditTaskMUI /> },
      { path: 'audit-tasks/view/:id', element: <ViewAuditTask /> },

      // audit types
      { path: 'audit-types', element: <AuditTypeListNew /> },
      { path: 'audit-types/add', element: <NewAuditTypeMUI /> },
      { path: 'audit-types/edit/:id', element: <EditAuditTypeMUI /> },
      { path: 'audit-types/view/:id', element: <ViewAuditType /> },

      // Training Events
      { path: 'training-events', element: <TrainingEventListNew /> },
      { path: 'training-events/add', element: <NewTrainingEventMUI /> },
      { path: 'training-events/edit/:id', element: <EditTrainingEventMUI /> },
      { path: 'training-events/view/:id', element: <ViewTrainingEvent /> },

      // Training Events Employee
      {
        path: 'training-event-employees',
        element: <TrainingEventEmployeeListNew />,
      },
      {
        path: 'training-event-employees/add',
        element: <NewTrainingEventEmployeeMUI />,
      },
      {
        path: 'training-event-employees/edit/:id',
        element: <EditTrainingEventEmployeeMUI />,
      },
      {
        path: 'training-event-employees/view/:id',
        element: <ViewTrainingEventEmployee />,
      },

      // audit task categories
      {
        path: 'audit-task-categories',
        element: <AuditTaskCategoriesListNew />,
      },
      {
        path: 'audit-task-categories/add',
        element: <NewAuditTaskCategoriesMUI />,
      },
      {
        path: 'audit-task-categories/edit/:id',
        element: <EditAuditTaskCategoriesMUI />,
      },
      {
        path: 'audit-task-categories/view/:id',
        element: <ViewAuditTaskCategories />,
      },
      // audit reports
      { path: 'audit-reports', element: <AuditReportListNew /> },
      { path: 'audit-reports/add', element: <NewAuditReportMUI /> },
      { path: 'audit-reports/edit/:id', element: <EditAuditReportMUI /> },
      { path: 'audit-reports/view/:id', element: <ViewAuditReport /> },
      // tasks
      { path: 'tasks', element: <TaskListNew /> },
      { path: 'tasks/add', element: <NewTaskMUI /> },
      { path: 'tasks/edit/:id', element: <EditTaskMUI /> },
      { path: 'tasks/view/:id', element: <ViewTask /> },

      // questions
      { path: 'questions', element: <QuestionListNew /> },
      { path: 'questions/add', element: <NewQuestionMUI /> },
      { path: 'questions/edit/:id', element: <EditQuestionMUI /> },
      { path: 'questions/view/:id', element: <ViewQuestion /> },

      // task categories
      { path: 'task-categories', element: <TaskCategoriesListNew /> },
      { path: 'task-categories/add', element: <NewTaskCategoriesMUI /> },
      { path: 'task-categories/edit/:id', element: <EditTaskCategoriesMUI /> },
      { path: 'task-categories/view/:id', element: <ViewTaskCategories /> },
      // Training Events
      {
        path: 'training-event-employee-statuses',
        element: <TrainingEventEmployeeStatusListNew />,
      },
      {
        path: 'training-event-employee-statuses/add',
        element: <NewTrainingEventEmployeeStatusMUI />,
      },
      {
        path: 'training-event-employee-statuses/edit/:id',
        element: <EditTrainingEventEmployeeStatusMUI />,
      },
      {
        path: 'training-event-employee-statuses/view/:id',
        element: <ViewTrainingEventEmployeeStatus />,
      },

      // training event status
      {
        path: 'training-event-statuses',
        element: <TrainingEventStatusListNew />,
      },
      {
        path: 'training-event-statuses/add',
        element: <NewTrainingEventStatusMUI />,
      },
      {
        path: 'training-event-statuses/edit/:id',
        element: <EditTrainingEventStatusMUI />,
      },
      {
        path: 'training-event-statuses/view/:id',
        element: <ViewTrainingEventStatus />,
      },

      // answers
      { path: 'answers', element: <AnswerListNew /> },
      { path: 'answers/add', element: <NewAnswerMUI /> },
      { path: 'answers/edit/:id', element: <EditAnswerMUI /> },
      { path: 'answers/view/:id', element: <ViewAnswer /> },

      // sample certificate
      { path: 'sample-certificates', element: <SampleCertificateListNew /> },
      { path: 'sample-certificates/add', element: <AddSampleCertificate /> },
      {
        path: 'sample-certificates/edit/:id',
        element: <EditSampleCertificate />,
      },
      {
        path: 'sample-certificates/view/:id',
        element: <ViewSampleCertificate />,
      },
      // task comment document
      {
        path: 'task-comment-documents',
        element: <TaskCommentDocumentListNew />,
      },
      {
        path: 'task-comment-documents/add',
        element: <NewTaskCommentDocumentMUI />,
      },
      {
        path: 'task-comment-documents/edit/:id',
        element: <EditTaskCommentDocumentMUI />,
      },
      {
        path: 'task-comment-documents/view/:id',
        element: <ViewTaskCommentDocument />,
      },
      // certificates
      { path: 'certificates', element: <CertificateListNew /> },
      { path: 'certificates/add', element: <NewCertificateMUI /> },
      { path: 'certificates/edit/:id', element: <EditCertificateMUI /> },
      { path: 'certificates/view/:id', element: <ViewCertificate /> },
      // task comment
      { path: 'task-comments', element: <TaskCommentListNew /> },
      { path: 'task-comments/add', element: <NewTaskCommentMUI /> },
      { path: 'task-comments/edit/:id', element: <EditTaskCommentMUI /> },
      { path: 'task-comments/view/:id', element: <ViewTaskComment /> },

      // equipment
      { path: 'equipments', element: <EquipmentListNew /> },
      { path: 'equipments/add', element: <NewEquipmentMUI /> },
      { path: 'equipments/edit/:id', element: <EditEquipment /> },
      { path: 'equipments/view/:id', element: <ViewEquipment /> },

      // equipment types
      { path: 'equipment-types', element: <EquipmentTypeListNew /> },
      { path: 'equipment-types/add', element: <NewEquipmentTypeMUI /> },
      { path: 'equipment-types/edit/:id', element: <EditEquipmentTypeMUI /> },
      { path: 'equipment-types/view/:id', element: <ViewEquipmentType /> },

      // incidents
      { path: 'incidents/add', element: <NewIncidentMUI /> },
      { path: 'incidents', element: <IncidentListNew /> },
      { path: 'incidents/edit/:id', element: <EditIncidentMUI /> },
      { path: 'incidents/view/:id', element: <ViewIncident /> },

      // incident types
      { path: 'incident-types/add', element: <NewIncidentTypeMUI /> },
      { path: 'incident-types', element: <IncidentTypeListNew /> },
      { path: 'incident-types/edit/:id', element: <EditIncidentType /> },
      { path: 'incident-types/view/:id', element: <ViewIncidentType /> },

      // required inspections
      { path: 'required-inspections/add', element: <NewRequiredInspection /> },
      { path: 'required-inspections', element: <RequiredInspectionList /> },
      {
        path: 'required-inspections/edit/:id',
        element: <EditRequiredInspection />,
      },
      {
        path: 'required-inspections/view/:id',
        element: <ViewRequiredInspection />,
      },

      // Required Cdl Endorsement
      {
        path: 'required-cdl-endorsements',
        element: <RequiredCdlEndorsementList />,
      },
      {
        path: 'required-cdl-endorsements/add',
        element: <NewRequiredCdlEndorsement />,
      },
      {
        path: 'required-cdl-endorsements/edit/:id',
        element: <EditRequiredCdlEndorsement />,
      },
      {
        path: 'required-cdl-endorsements/view/:id',
        element: <ViewRequiredCdlEndorsement />,
      },
      // required certifications
      {
        path: 'required-certifications/add',
        element: <NewRequiredCertification />,
      },
      {
        path: 'required-certifications',
        element: <RequiredCertificationList />,
      },
      {
        path: 'required-certifications/edit/:id',
        element: <EditRequiredCertification />,
      },
      {
        path: 'required-certifications/view/:id',
        element: <ViewRequiredCertification />,
      },

      // inspections
      { path: 'required-ppes/add', element: <NewRequiredPpes /> },
      { path: 'required-ppes', element: <RequiredPpesList /> },
      { path: 'required-ppes/edit/:id', element: <EditRequiredPpes /> },
      { path: 'required-ppes/view/:id', element: <ViewRequiredPpes /> },

      // inspections
      { path: 'inspections/add', element: <NewInspection /> },
      { path: 'inspections', element: <InspectionList /> },
      { path: 'inspections/edit/:id', element: <EditInspection /> },
      { path: 'inspections/view/:id', element: <ViewInspection /> },

      // incident injuries
      { path: 'incident-injuries', element: <IncidentInjuriesList /> },
      { path: 'incident-injuries/add', element: <NewIncidentInjuries /> },
      { path: 'incident-injuries/edit/:id', element: <EditIncidentInjuries /> },
      { path: 'incident-injuries/view/:id', element: <ViewIncidentInjuries /> },

      // incident vehicles
      { path: 'incident-vehicles', element: <IncidentVehicleList /> },
      { path: 'incident-vehicles/add', element: <NewIncidentVehicle /> },
      { path: 'incident-vehicles/edit/:id', element: <EditIncidentVehicle /> },
      { path: 'incident-vehicles/view/:id', element: <ViewIncidentVehicle /> },

      // body parts
      { path: 'body-parts', element: <BodyPartsList /> },
      { path: 'body-parts/add', element: <NewBodyParts /> },
      { path: 'body-parts/edit/:id', element: <EditBodyParts /> },
      { path: 'body-parts/view/:id', element: <ViewBodyParts /> },

      // job Work Authorizations
      {
        path: 'job-work-authorizations/add',
        element: <NewJobWorkAuthorization />,
      },
      {
        path: 'job-work-authorizations',
        element: <JobWorkAuthorizationListNew />,
      },
      {
        path: 'job-work-authorizations/edit/:id',
        element: <EditJobWorkAuthorization />,
      },
      {
        path: 'job-work-authorizations/view/:id',
        element: <ViewNewJobWorkAuthorization />,
      },

      // jobs
      { path: 'jobs/view/:id', element: <ViewJob /> },
      { path: 'jobs', element: <JobListNew /> },
      { path: 'jobs/add', element: <NewJobMUI /> },
      { path: 'jobs/edit/:id', element: <EditJobMUI /> },

      // job items
      { path: 'job-items/view/:id', element: <ViewJobItem /> },
      { path: 'job-items', element: <JobItemList /> },
      { path: 'job-items/add', element: <NewJobItem /> },
      { path: 'job-items/edit/:id', element: <EditJobItem /> },

      // Industry
      { path: 'industries/view/:id', element: <ViewIndustry /> },
      { path: 'industries', element: <IndustryList /> },
      { path: 'industries/add', element: <NewIndustry /> },
      { path: 'industries/edit/:id', element: <EditIndustry /> },

      // Addresses
      { path: 'addresses/view/:id', element: <ViewAddress /> },
      { path: 'addresses', element: <AddressList /> },
      { path: 'addresses/add', element: <NewAddress /> },
      { path: 'addresses/edit/:id', element: <EditAddress /> },

      // Injury-classes
      { path: 'injury-classes/view/:id', element: <ViewInjuryClass /> },
      { path: 'injury-classes', element: <InjuryClassList /> },
      { path: 'injury-classes/add', element: <NewInjuryClass /> },
      { path: 'injury-classes/edit/:id', element: <EditInjuryClass /> },

      // Job-site-crews
      { path: 'job-site-crews/view/:id', element: <ViewJobSiteCrew /> },
      { path: 'job-site-crews', element: <JobSiteCrewList /> },
      { path: 'job-site-crews/add', element: <NewJobSiteCrew /> },
      { path: 'job-site-crews/edit/:id', element: <EditJobSiteCrew /> },

      // man hours
      { path: 'man-hours/view/:id', element: <ViewManHours /> },
      { path: 'man-hours', element: <ManHoursList /> },
      { path: 'man-hours/add', element: <NewManHours /> },
      { path: 'man-hours/edit/:id', element: <EditManHours /> },

      // job-site-crew-members
      {
        path: 'job-site-crew-members/view/:id',
        element: <ViewJobSiteCrewMember />,
      },
      { path: 'job-site-crew-members', element: <JobSiteCrewMemberList /> },
      { path: 'job-site-crew-members/add', element: <NewJobSiteCrewMember /> },
      {
        path: 'job-site-crew-members/edit/:id',
        element: <EditJobSiteCrewMember />,
      },

      // audit report answers
      { path: 'audit-report-answers', element: <AuditReportAnswerList /> },
      { path: 'audit-report-answers/add', element: <NewAuditReportAnswers /> },
      {
        path: 'audit-report-answers/edit/:id',
        element: <EditAuditReportAnswers />,
      },
      {
        path: 'audit-report-answers/view/:id',
        element: <ViewAuditReportAnswer />,
      },
    ],
  },
  {
    path: '*',
    element: <AuthLayout />,
    children: [
      {
        path: '*',
        element: <Page404 />,
      },
    ],
  },
];

export default routes;
