import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";

const routes: Array<RouteRecordRaw> = [
  { path: "/", component: () => import("@/modules/test/web/TestPage.vue") },
  {
    path: "/tickets",
    component: () => import("@/modules/ticket/web/TicketPage.vue"),
  },
  {
    path: "/new",
    component: () => import("@/modules/ticket/web/TicketNewPage.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
