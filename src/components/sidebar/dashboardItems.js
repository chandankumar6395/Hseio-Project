import { Sliders, Users } from 'react-feather';
import {
  Bookmarks,
  Business,
  BusinessCenter,
  CollectionsBookmark,
  Contacts,
  Directions,
  LibraryBooks,
  ListAlt,
  RemoveRedEye,
  Settings,
  SupervisedUserCircle,
  Work,
} from '@mui/icons-material';
import {
  KEY_TYPE_ID,
  TYPE_COMPANY_OWNER,
  TYPE_DIVISION_OWNER,
  TYPE_EMPLOYEE,
  TYPE_JOB_SITE_OWNER,
  TYPE_SYSTEM_ADMIN,
} from '../../hseadmin/constants/Constants';

// import { faListCheck,
//   faTachometerAlt,
//   faBuilding,
//   faBuildingShield,
//   faUsers,
//   faFileSignature,
//   faUserTie,
//   faCertificate,
//   faDigging,
//   faUser,
//   faEye,
//   faGraduationCap, faBook} from '@fortawesome/free-solid-svg-icons';

// eslint-disable-next-line no-unused-vars
const pagesSection = [
  // {
  //   href: '/dashboard',
  //   icon: Sliders,
  //   title: 'Dashboard',
  //   children: [
  //     {
  //       href: '/dashboard/default',
  //       title: 'Default',
  //     },
  //     {
  //       href: '/dashboard/analytics',
  //       title: 'Analytics',
  //     },
  //     {
  //       href: '/dashboard/saas',
  //       title: 'SaaS',
  //     },
  //   ],
  // },
  {
    href: '/private/dashboard',
    icon: Sliders,
    title: 'Dashboard',
  },
  {
    href: '/private/companies',
    icon: BusinessCenter,
    title: 'Companies',
  },
  {
    href: '/private/divisions',
    icon: Business,
    title: 'Divisions',
  },
  {
    href: '/private/employees',
    icon: SupervisedUserCircle,
    title: 'Employees',
  },
  {
    href: '/private/clients',
    icon: Contacts,
    title: 'Clients',
  },
  {
    href: '/private/certificates',
    icon: CollectionsBookmark,
    title: 'Certificates',
  },
  {
    href: '/private/job-sites',
    icon: Directions,
    title: 'Projects',
  },
  {
    href: '/private/training-courses',
    icon: LibraryBooks,
    title: 'Training Materials',
  },
  {
    href: '/private/users',
    icon: Users,
    title: 'Users',
  },
  // {
  //   href: '/private/sample-certificates',
  //   icon: Bookmarks,
  //   title: 'Sample Certificates',
  // },
  {
    href: '/private/audits',
    icon: RemoveRedEye,
    title: 'Audits',
    children: [
      {
        href: '/private/audit-add',
        title: 'Add Audit',
      },
      {
        href: '/private/audit-print',
        title: 'Print Audit',
      },
      {
        href: '/private/audit-types',
        title: 'Types',
      },
      {
        href: '/private/audit-tasks',
        title: 'Tasks',
      },
      {
        href: '/private/audit-task-categories',
        title: 'Task Categories',
      },
      {
        href: '/private/audit-Reports',
        title: 'Task Reports',
      },
      {
        href: '/private/questions',
        title: 'Questions',
      },
      {
        href: '/private/answers',
        title: 'Answers',
      },
    ],
  },
  {
    href: '/private/training',
    icon: ListAlt,
    title: 'Training',
    children: [
      {
        href: '/private/training-events',
        title: 'Events',
      },
      {
        href: '/private/training-event-employees',
        title: 'Event Employee',
      },
      {
        href: '/private/training-event-employee-statuses',
        title: 'Event Employee Status',
      },
      {
        href: '/private/training-event-statuses ',
        title: 'Event Status',
      },
    ],
  },
  {
    href: '/private/tasks',
    icon: Work,
    title: 'Tasks',
    children: [
      {
        href: '/private/tasks',
        title: 'Task',
      },
      {
        href: '/private/task-categories',
        title: 'Categories',
      },
      {
        href: '/private/task-comment-documents',
        title: 'Comment Document',
      },
      {
        href: '/private/task-comments ',
        title: 'Comments',
      },
    ],
  },
  // {
  //   href: '/pages',
  //   icon: Layout,
  //   title: 'Pages',
  //   children: [
  //     {
  //       href: '/pages/profile',
  //       title: 'Profile',
  //     },
  //     {
  //       href: '/pages/settings',
  //       title: 'Settings',
  //     },
  //     {
  //       href: '/pages/pricing',
  //       title: 'Pricing',
  //     },
  //     {
  //       href: '/pages/chat',
  //       title: 'Chat',
  //     },
  //     {
  //       href: '/pages/blank',
  //       title: 'Blank Page',
  //     },
  //   ],
  // },
  // {
  //   href: '/projects',
  //   icon: Briefcase,
  //   title: 'Projects',
  //   badge: '8',
  // },
  // {
  //   href: '/orders',
  //   icon: ShoppingCart,
  //   title: 'Orders',
  // },
  // {
  //   href: '/invoices',
  //   icon: CreditCard,
  //   title: 'Invoices',
  //   children: [
  //     {
  //       href: '/invoices',
  //       title: 'List',
  //     },
  //     {
  //       href: '/invoices/detail',
  //       title: 'Detail',
  //     },
  //   ],
  // },
  // {
  //   href: '/tasks',
  //   icon: CheckSquare,
  //   title: 'Tasks - 1',
  //   badge: '17',
  // },
  // {
  //   href: '/calendar',
  //   icon: Calendar,
  //   title: 'Calendar',
  // },
  // {
  //   href: '/auth',
  //   icon: Users,
  //   title: 'Auth',
  //   children: [
  //     {
  //       href: '/auth/sign-in',
  //       title: 'Sign In',
  //     },
  //     {
  //       href: '/auth/sign-up',
  //       title: 'Sign Up',
  //     },
  //     {
  //       href: '/auth/reset-password',
  //       title: 'Reset Password',
  //     },
  //     {
  //       href: '/auth/404',
  //       title: '404 Page',
  //     },
  //     {
  //       href: '/auth/500',
  //       title: '500 Page',
  //     },
  //   ],
  // },
];

const pagesSectionSystemAdmin = [
  {
    href: '/private/dashboard',
    icon: Sliders,
    title: 'Dashboard',
  },
  {
    href: '/private/companies',
    icon: BusinessCenter,
    title: 'Companies',
  },
  {
    href: '/private/clients',
    icon: Contacts,
    title: 'Clients',
  },
  {
    href: '/private/divisions',
    icon: Business,
    title: 'Divisions',
  },
  {
    href: '/private/job-sites',
    icon: Directions,
    title: 'Projects',
  },
  {
    href: '/private/employees',
    icon: SupervisedUserCircle,
    title: 'Employees',
  },
  {
    href: '/private/users',
    icon: Users,
    title: 'Users',
  },

  {
    href: '/private/equipments',
    icon: Work,
    title: 'Equipment',
  },
  {
    href: '/private/incidents',
    icon: Bookmarks,
    title: 'Incidents',
  },
  // {
  //   href: '/private/inspections',
  //   icon: Bookmarks,
  //   title: 'Inspections',
  // },
  // {
  //   href: '/private/jobs',
  //   icon: Bookmarks,
  //   title: 'Job Briefing',
  //   // children: [
  //   //   {
  //   //     href: '/private/jobs',
  //   //     title: 'Jobs',
  //   //   },
  //   //   {
  //   //     href: '/private/job-items',
  //   //     title: 'Job Items',
  //   //   },
  //   //   {
  //   //     href: '/private/job-work-authorizations',
  //   //     title: 'Job Work Authorizations',
  //   //   },
  //   // ],
  // },
  {
    href: '/private/audit-tasks',
    icon: RemoveRedEye,
    title: 'Audit Forms',
  },
  {
    href: '/private/perofrm-audit',
    icon: LibraryBooks,
    title: 'Perform Audit',
    children: [
      // {
      //   href: '/private/perform-audit-task',
      //   icon: RemoveRedEye,
      //   title: 'Perform Audit Task',
      // },
      // {
      //   href: '/private/list-audit-task',
      //   icon: RemoveRedEye,
      //   title: 'List Audit Task',
      // },
      {
        href: '/private/job-site-audit-reports/1',
        icon: RemoveRedEye,
        title: 'Job Site Audit',
      },
      {
        href: '/private/equipment-audit-reports/2',
        icon: RemoveRedEye,
        title: 'Equipment Audit',
      },
      // {
      //   href: '/private/monthly-audits-reports/3',
      //   icon: RemoveRedEye,
      //   title: 'Monthly Audit',
      // },
    ],
  },
  {
    href: '/private/certificates',
    icon: CollectionsBookmark,
    title: 'Certificates',
  },
  // {
  //   href: '/private/training-courses',
  //   icon: LibraryBooks,
  //   title: 'Training Materials',
  // },
  // {
  //   href: '/private/training-events',
  //   icon: LibraryBooks,
  //   title: 'Training Events',
  // },
  // {
  //   href: '/private/sample-certificates',
  //   icon: Bookmarks,
  //   title: 'Sample Certificates',
  // },

  {
    href: '/private/setting',
    icon: Settings,
    title: 'Setting',
    children: [
      {
        href: '/private/audit-task-categories',
        title: 'Audit Form Categories',
      },
      // {
      //   href: '/private/audits',
      //   icon: RemoveRedEye,
      //   title: 'Audits',
      //   children: [
      //     {
      //       href: '/private/audit-types',
      //       title: 'Types',
      //     },
      //     {
      //       href: '/private/audit-tasks',
      //       title: 'Tasks',
      //     },
      //     {
      //       href: '/private/audit-task-categories',
      //       title: 'Task Categories',
      //     },
      //     {
      //       href: '/private/audit-Reports',
      //       title: 'Task Reports',
      //     },
      //     {
      //       href: '/private/questions',
      //       title: 'Questions',
      //     },
      //     {
      //       href: '/private/answers',
      //       title: 'Answers',
      //     },
      //   ],
      // },
      // {
      //   href: '/private/training',
      //   icon: ListAlt,
      //   title: 'Training',
      //   children: [
      //     {
      //       href: '/private/training-events',
      //       title: 'Events',
      //     },
      //     {
      //       href: '/private/training-event-employees',
      //       title: 'Event Employee',
      //     },
      //     {
      //       href: '/private/training-event-employee-statuses',
      //       title: 'Event Employee Status',
      //     },
      //     {
      //       href: '/private/training-event-statuses ',
      //       title: 'Event Status',
      //     },
      //   ],
      // },
      // {
      //   href: '/private/tasks',
      //   icon: Work,
      //   title: 'Tasks',
      //   children: [
      //     {
      //       href: '/private/tasks',
      //       title: 'Task',
      //     },
      //     {
      //       href: '/private/task-categories',
      //       title: 'Categories',
      //     },
      //     {
      //       href: '/private/task-comment-documents',
      //       title: 'Comment Document',
      //     },
      //     {
      //       href: '/private/task-comments ',
      //       title: 'Comments',
      //     },
      //   ],
      // },
      // {
      //   href: '/private/addresses',
      //   title: 'Addresses',
      // },
      {
        href: '/private/industries',
        title: 'Industries',
      },
      // {
      //   href: '/private/job-site-crews',
      //   title: 'Job Site Crews',
      // },
      // {
      //   href: '/private/job-site-crew-members',
      //   title: 'Job Site Crew Members',
      // },
      // {
      //   href: '/private/audit-report-answers',
      //   title: 'Audit Report Answers',
      // },
      {
        href: '/private/equipment-types',
        title: 'Equipment Types',
      },
      {
        href: '/private/incident-types',
        title: 'Incident Types',
      },

      {
        href: '/private/training-course-types',
        title: 'Training Material Types',
      },
    ],
  },
];

const pagesSectionCompany = [
  {
    href: '/private/dashboard',
    icon: Sliders,
    title: 'Dashboard',
  },
  {
    href: '/private/divisions',
    icon: Business,
    title: 'Divisions',
  },
  {
    href: '/private/employees',
    icon: SupervisedUserCircle,
    title: 'Employees',
  },
  {
    href: '/private/clients',
    icon: Contacts,
    title: 'Clients',
  },
  {
    href: '/private/job-sites',
    icon: Directions,
    title: 'Projects',
  },
  {
    href: '/private/equipments',
    icon: Work,
    title: 'Equipment',
  },
  {
    href: '/private/incidents',
    icon: Bookmarks,
    title: 'Incidents',
  },
  {
    href: '/private/certificates',
    icon: CollectionsBookmark,
    title: 'Certificates',
  },
  // {
  //   href: '/private/training-courses',
  //   icon: LibraryBooks,
  //   title: 'Training Materials',
  //   children: [
  //     {
  //       href: '/private/training-courses',
  //       title: 'Training Materials',
  //     },
  //     {
  //       href: '/private/training-course-types',
  //       title: 'Training Material Types',
  //     },
  //   ],
  // },
  {
    href: '/private/audit-tasks',
    icon: RemoveRedEye,
    title: 'Audit Forms',
  },
  {
    href: '/private/perofrm-audit',
    icon: LibraryBooks,
    title: 'Perform Audit',
    children: [
      {
        href: '/private/job-site-audit-reports/1',
        icon: RemoveRedEye,
        title: 'Job Site Audit',
      },
      {
        href: '/private/equipment-audit-reports/2',
        icon: RemoveRedEye,
        title: 'Equipment Audit',
      },
      // {
      //   href: '/private/monthly-audits-reports/3',
      //   icon: RemoveRedEye,
      //   title: 'Monthly Audit',
      // },
    ],
  },
];

const pagesSectionDivision = [
  {
    href: '/private/dashboard',
    icon: Sliders,
    title: 'Dashboard',
  },
  {
    href: '/private/employees',
    icon: SupervisedUserCircle,
    title: 'Employees',
  },
  {
    href: '/private/job-sites',
    icon: Directions,
    title: 'Projects',
  },
  {
    href: '/private/clients',
    icon: Contacts,
    title: 'Clients',
  },
  {
    href: '/private/equipments',
    icon: Work,
    title: 'Equipment',
  },
  {
    href: '/private/incidents',
    icon: Bookmarks,
    title: 'Incidents',
  },
  // {
  //   href: '/private/Training',
  //   icon: LibraryBooks,
  //   title: 'Training',
  //   children: [
  //     // {
  //     //   href: '/private/training-events',
  //     //   icon: RemoveRedEye,
  //     //   title: 'Training Events',
  //     // },
  //     {
  //       href: '/private/training-courses',
  //       icon: RemoveRedEye,
  //       title: 'Training Materials',
  //     },
  //   ],
  // },
  {
    href: '/private/audit-tasks',
    icon: RemoveRedEye,
    title: 'Audit Forms',
  },
  {
    href: '/private/perofrm-audit',
    icon: LibraryBooks,
    title: 'Perform Audit',
    children: [
      {
        href: '/private/job-site-audit-reports/1',
        icon: RemoveRedEye,
        title: 'Job Site Audit',
      },
      {
        href: '/private/equipment-audit-reports/2',
        icon: RemoveRedEye,
        title: 'Equipment Audit',
      },
      // {
      //   href: '/private/monthly-audits-reports/3',
      //   icon: RemoveRedEye,
      //   title: 'Monthly Audit',
      // },
    ],
  },
];

const pagesSectionJobSite = [
  {
    href: '/private/dashboard',
    icon: Sliders,
    title: 'Dashboard',
  },
  {
    href: '/private/employees',
    icon: SupervisedUserCircle,
    title: 'Employees',
  },
  {
    href: '/private/equipments',
    icon: LibraryBooks,
    title: 'Equipment',
  },
  // {
  //   href: '/private/inspections',
  //   icon: Bookmarks,
  //   title: 'Inspections',
  // },
  {
    href: '/private/incidents',
    icon: LibraryBooks,
    title: 'Incidents',
  },
  // {
  //   href: '/private/jobs',
  //   icon: LibraryBooks,
  //   title: 'Job Briefing',
  // },
  {
    href: '/private/audit-tasks',
    icon: RemoveRedEye,
    title: 'Audit Forms',
  },
  {
    href: '/private/perofrm-audit',
    icon: LibraryBooks,
    title: 'Perform Audit',
    children: [
      {
        href: '/private/job-site-audit-reports/1',
        icon: RemoveRedEye,
        title: 'Job Site Audit',
      },
      {
        href: '/private/equipment-audit-reports/2',
        icon: RemoveRedEye,
        title: 'Equipment Audit',
      },
      // {
      //   href: '/private/monthly-audits-reports/3',
      //   icon: RemoveRedEye,
      //   title: 'Monthly Audit',
      // },
    ],
  },
  // {
  //   href: '/private/Training',
  //   icon: LibraryBooks,
  //   title: 'Training',
  //   children: [
  //     // {
  //     //   href: '/private/training-events',
  //     //   icon: RemoveRedEye,
  //     //   title: 'Training Events',
  //     // },
  //     {
  //       href: '/private/training-courses',
  //       icon: RemoveRedEye,
  //       title: 'Training Materials',
  //     },
  //   ],
  // },
  {
    href: '/private/setting',
    icon: Settings,
    title: 'Setting',
    children: [
      {
        href: '/private/audit-task-categories',
        title: 'Audit Form Categories',
      },
      // {
      //   href: '/private/audits',
      //   icon: RemoveRedEye,
      //   title: 'Audits',
      //   children: [
      //     {
      //       href: '/private/audit-types',
      //       title: 'Types',
      //     },
      //     {
      //       href: '/private/audit-tasks',
      //       title: 'Tasks',
      //     },
      //     {
      //       href: '/private/audit-task-categories',
      //       title: 'Task Categories',
      //     },
      //     {
      //       href: '/private/audit-Reports',
      //       title: 'Task Reports',
      //     },
      //     {
      //       href: '/private/questions',
      //       title: 'Questions',
      //     },
      //     {
      //       href: '/private/answers',
      //       title: 'Answers',
      //     },
      //   ],
      // },
      // {
      //   href: '/private/training',
      //   icon: ListAlt,
      //   title: 'Training',
      //   children: [
      //     {
      //       href: '/private/training-events',
      //       title: 'Events',
      //     },
      //     {
      //       href: '/private/training-event-employees',
      //       title: 'Event Employee',
      //     },
      //     {
      //       href: '/private/training-event-employee-statuses',
      //       title: 'Event Employee Status',
      //     },
      //     {
      //       href: '/private/training-event-statuses ',
      //       title: 'Event Status',
      //     },
      //   ],
      // },
      // {
      //   href: '/private/tasks',
      //   icon: Work,
      //   title: 'Tasks',
      //   children: [
      //     {
      //       href: '/private/tasks',
      //       title: 'Task',
      //     },
      //     {
      //       href: '/private/task-categories',
      //       title: 'Categories',
      //     },
      //     {
      //       href: '/private/task-comment-documents',
      //       title: 'Comment Document',
      //     },
      //     {
      //       href: '/private/task-comments ',
      //       title: 'Comments',
      //     },
      //   ],
      // },
      // {
      //   href: '/private/addresses',
      //   title: 'Addresses',
      // },
      {
        href: '/private/industries',
        title: 'Industries',
      },
      // {
      //   href: '/private/job-site-crews',
      //   title: 'Job Site Crews',
      // },
      // {
      //   href: '/private/job-site-crew-members',
      //   title: 'Job Site Crew Members',
      // },
      // {
      //   href: '/private/audit-report-answers',
      //   title: 'Audit Report Answers',
      // },
      {
        href: '/private/equipment-types',
        title: 'Equipment Types',
      },
      {
        href: '/private/incident-types',
        title: 'Incident Types',
      },

      {
        href: '/private/training-course-types',
        title: 'Training Material Types',
      },
    ],
  },
];

const pagesSectionEmployee = [
  {
    href: '/private/dashboard',
    icon: Sliders,
    title: 'Dashboard',
  },
  {
    href: '/private/certificates',
    icon: CollectionsBookmark,
    title: 'Certificates',
  },
];
/*
const elementsSection = [
  {
    href: '/components',
    icon: Grid,
    title: 'Components',
    children: [
      {
        href: '/components/alerts',
        title: 'Alerts',
      },
      {
        href: '/components/accordion',
        title: 'Accordion',
      },
      {
        href: '/components/avatars',
        title: 'Avatars',
      },
      {
        href: '/components/badges',
        title: 'Badges',
      },
      {
        href: '/components/buttons',
        title: 'Buttons',
      },
      {
        href: '/components/cards',
        title: 'Cards',
      },
      {
        href: '/components/chips',
        title: 'Chips',
      },
      {
        href: '/components/dialogs',
        title: 'Dialogs',
      },
      {
        href: '/components/lists',
        title: 'Lists',
      },
      {
        href: '/components/menus',
        title: 'Menus',
      },
      {
        href: '/components/pagination',
        title: 'Pagination',
      },
      {
        href: '/components/progress',
        title: 'Progress',
      },
      {
        href: '/components/snackbars',
        title: 'Snackbars',
      },
      {
        href: '/components/tooltips',
        title: 'Tooltips',
      },
    ],
  },
  {
    href: '/charts',
    icon: PieChart,
    title: 'Charts',
    children: [
      {
        href: '/charts/chartjs',
        title: 'Chart.js',
      },
      {
        href: '/charts/apexcharts',
        title: 'ApexCharts',
      },
    ],
  },
  {
    href: '/forms',
    icon: CheckSquare,
    title: 'Forms',
    children: [
      {
        href: '/forms/pickers',
        title: 'Pickers',
      },
      {
        href: '/forms/selection-controls',
        title: 'Selection Controls',
      },
      {
        href: '/forms/selects',
        title: 'Selects',
      },
      {
        href: '/forms/text-fields',
        title: 'Text Fields',
      },
      {
        href: '/forms/editors',
        title: 'Editors',
      },
      {
        href: '/forms/formik',
        title: 'Formik',
      },
    ],
  },
  {
    href: '/tables',
    icon: List,
    title: 'Tables',
    children: [
      {
        href: '/tables/simple-table',
        title: 'Simple Table',
      },
      {
        href: '/tables/advanced-table',
        title: 'Advanced Table',
      },
      {
        href: '/tables/data-grid',
        title: 'Data Grid',
      },
    ],
  },
  {
    href: '/icons',
    icon: Heart,
    title: 'Icons',
    children: [
      {
        href: '/icons/material-icons',
        title: 'Material Icons',
      },
      {
        href: '/icons/feather-icons',
        title: 'Feather Icons',
      },
    ],
  },
  {
    href: '/maps',
    icon: Map,
    title: 'Maps',
    children: [
      {
        href: '/maps/google-maps',
        title: 'Google Maps',
      },
      {
        href: '/maps/vector-maps',
        title: 'Vector Maps',
      },
    ],
  },
];

const docsSection = [
  {
    href: '/documentation/welcome',
    icon: BookOpen,
    title: 'Documentation',
  },
  {
    href: '/changelog',
    icon: List,
    title: 'Changelog',
    badge: 'v4.1.0',
  },
];
*/

export const getPageSection = () => {
  const typeId = +localStorage.getItem(KEY_TYPE_ID);

  if (typeId === TYPE_SYSTEM_ADMIN) {
    return pagesSectionSystemAdmin;
  }
  if (typeId === TYPE_COMPANY_OWNER) {
    return pagesSectionCompany;
  }
  if (typeId === TYPE_DIVISION_OWNER) {
    return pagesSectionDivision;
  }
  if (typeId === TYPE_JOB_SITE_OWNER) {
    return pagesSectionJobSite;
  }
  if (typeId === TYPE_EMPLOYEE) {
    return pagesSectionEmployee;
  }
  return pagesSection;
};

const navItems = [
  {
    title: 'Pages',
    pages: getPageSection(),
  },
  // {
  //   title: 'Elements',
  //   pages: elementsSection,
  // },
  // {
  //   title: 'Mira Pro',
  //   pages: docsSection,
  // },
];

export default navItems;
