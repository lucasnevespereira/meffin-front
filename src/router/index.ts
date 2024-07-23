import { createRouter as createVueRouter, createWebHistory, Router } from "vue-router";
import Profile from "@/views/Profile.vue";
import Transactions from "@/views/Transactions.vue";
import { createAuthGuard } from "@auth0/auth0-vue";
import { App } from 'vue';
import Dashboard from "@/views/Dashboard.vue";
import Preferences from "@/views/Preferences.vue";
import Categories from "@/views/Categories.vue";



export function createRouter(app: App): Router {
  return createVueRouter({
    routes: [
      {
        path: "/",
        name: "dashboard",
        component: Dashboard
      },
      {
        path: "/profile",
        name: "profile",
        component: Profile,
        beforeEnter: createAuthGuard(app)
      },
      {
        path: "/preferences",
        name: "preferences",
        component: Preferences,
        beforeEnter: createAuthGuard(app)
      },
      {
        path: "/categories",
        name: "categories",
        component: Categories,
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
