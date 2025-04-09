import { createRouter, createWebHistory } from "vue-router";

import UserLogin from "src/components/UserLogin.vue";
import ApplicationsPage from "src/pages/leftdrawer/ApplicationsPage.vue";
import HomePage from "src/components/HomePage.vue";
import SubmissionsPage from "src/pages/leftdrawer/SubmissionsPage.vue";
import PaymentsPage from "src/pages/leftdrawer/PaymentsPage.vue";
import BasvuruForm from "src/pages/leftdrawer/BasvuruForm.vue";
import CalendarPage from "src/pages/leftdrawer/CalendarPage.vue";
import StudentProfile from "src/pages/StudentProfile.vue"; // Yeni import

const routes = [
  { path: "/", name: "Login", component: UserLogin },
  { path: "/home", name: "Home", component: HomePage },
  {
    path: "/basvuru-ilanlari",
    name: "ApplicationsPage",
    component: ApplicationsPage,
  },
  { path: "/basvuru-form", name: "BasvuruForm", component: BasvuruForm },
  { path: "/payments", name: "PaymentsPage", component: PaymentsPage },
  { path: "/submissions", name: "SubmissionsPage", component: SubmissionsPage },
  { path: "/calendars", name: "CalendarPage", component: CalendarPage },
  {
    path: "/student-profile",
    name: "StudentProfile",
    component: StudentProfile,
  }, // Yeni route
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
