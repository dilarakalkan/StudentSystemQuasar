import { createRouter, createWebHistory } from "vue-router";

import UserLogin from "src/components/UserLogin.vue";
import ApplicationsPage from "src/pages/leftdrawer/ApplicationsPage.vue";
import HomePage from "src/components/HomePage.vue";
import CalendarPage from "src/pages/leftdrawer/CalendarPage.vue";
import SubmissionsPage from "src/pages/leftdrawer/SubmissionsPage.vue";
import PaymentsPage from "src/pages/leftdrawer/PaymentsPage.vue";
import BasvuruForm from "src/pages/leftdrawer/BasvuruForm.vue";

const routes = [
  { path: "/", name: "Login", component: UserLogin },
  { path: "/home", name: "Home", component: HomePage },
  {
    path: "/basvuru-ilanlari",
    name: "ApplicationsPage",
    component: ApplicationsPage,
  },
  {
    path: "/calendar",
    name: "CalendarPage",
    component: () => import("pages/leftdrawer/CalendarPage.vue"),
  },
  { path: "/basvuru-form", name: "BasvuruForm", component: BasvuruForm },

  { path: "/payments", name: "PaymentsPage", component: PaymentsPage },
  { path: "/submissions", name: "SubmissionsPage", component: SubmissionsPage },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;

// const routes = [
//   { path: "/", name: "Login", component: UserLogin },

//   {
//     path: "/giris",
//     component: HomePage,
//     children: [
//       {
//         path: "/home",
//         name: "HomePage",
//         component: () => import("src/components/HomePage.vue"),
//       },
//       {
//         path: "basvuru-ilanlari",
//         name: "ApplicationsAlt",
//         component: () => import("src/pages/leftdrawer/ApplicationsPage.vue"),
//       },
//       {
//         path: "calendar",
//         name: "Calendar",
//         component: () => import("src/pages/leftdrawer/CalendarPage.vue"),
//       },
//       {
//         path: "submissions",
//         name: "Submissions",
//         component: SubmissionsPage,
//       },
//       {
//         path: "courses",
//         name: "Courses",
//         component: CoursesPage,
//       },
//       {
//         path: "exams",
//         name: "Exams",
//         component: ExamsPage,
//       },
//
//     ],
//   },
// ];
