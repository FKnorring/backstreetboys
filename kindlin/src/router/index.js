import { createRouter, createWebHashHistory } from "vue-router";
import Home from "../views/Home.vue";
import SignUp from "../views/SignUp.vue";
import Login from "../views/Login.vue";
import Profile from "../views/Profile.vue";
import CompleteProfile from "../views/CompleteProfile.vue";
import Organizer from "../views/Organizer.vue";

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/Sign-up",
    name: "Sign-up",
    component: SignUp,
  },
  {
    path: "/Login",
    name: "Login",
    component: Login,
  },
  {
    path: "/Profile",
    name: "Profile",
    component: Profile,
  },
  {
    path: "/CompleteProfile",
    name: "CompleteProfile",
    component: CompleteProfile,
  },
  {
    path: "/Organizer",
    name: "Organizer",
    component: Organizer,
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
  const publicPages = ["/login", "/sign-up"];
  const authRequired = !publicPages.includes(to.path);
  const loggedIn = localStorage.getItem("user");

  if (authRequired && !loggedIn) {
    if (!authRequired) {
      return next();
    } else {
      return next("/login");
    }
  }

  next();
});

export default router;