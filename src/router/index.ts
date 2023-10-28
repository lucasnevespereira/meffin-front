import { createRouter as createVueRouter, createWebHistory, Router } from "vue-router";
import Profile from "@/views/Profile.vue";
import Transactions from "@/views/Transactions.vue";
import { createAuthGuard } from "@auth0/auth0-vue";
import { App } from 'vue';
import Home from "@/views/Home.vue";



export function createRouter(app: App): Router {
  return createVueRouter({
    routes: [
      {
        path: "/",
        name: "home",
        component: Home
      },
      {
        path: "/profile",
        name: "profile",
        component: Profile,
        beforeEnter: createAuthGuard(app)
      },
      {
        path: "/transactions",
        name: "transactions",
        component: Transactions,
        beforeEnter: createAuthGuard(app)
      },
      {
        path: "/:catchAll(.*)",
        redirect: "/"
      }
    ],
    history: createWebHistory()
  })
}
