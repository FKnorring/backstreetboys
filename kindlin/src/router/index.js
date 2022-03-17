import { createRouter, createWebHashHistory } from "vue-router";
import Home from "../views/Home.vue";
import SignUp from "../views/SignUp.vue";
import Login from "../views/Login.vue";
import Profile from "../views/Profile.vue";
import CompleteProfile from "../views/CompleteProfile.vue";
import Organizer from "../views/Organizer.vue";
import PreviousMatches from "../views/PreviousMatches.vue";
import UpcomingEvents from "../views/UpcomingEvents.vue";
import EventStage from "../views/EventStage.vue";
import LiveEvent from "../views/LiveEvent.vue";
import MyEvents from "../views/MyEvents.vue"

const routes = [
  {
    path: "/UpcomingEvents",
    name: "UpcomingEvents",
    component: UpcomingEvents,
  },
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
  {
    path: "/PreviousMatches",
    name: "PreviousMatches",
    component: PreviousMatches,
  },
  {
    path: "/EventStage",
    name: "EventStage",
    component: EventStage,
  },
  {
    path: "/LiveEvent",
    name: "LiveEvent",
    component: LiveEvent,
  },
  {
    path: "/MyEvents",
    name: "MyEvents",
    component: MyEvents,
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
    return next();
    //return next(from.path);
  } else if (loggedIn) {
    return next();
  }

  next();
});

export default router;
