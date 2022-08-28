import { createRouter, createWebHistory } from "vue-router";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "map",
      component: () => import("../views/MapView.vue"),
      children: [
        {
          path: "vraag/:questionnr",
          name: "vraag",
          props: true,
          component: () => import("../views/QuestionView.vue"),
        },
      ],
    },
  ],
});

export default router;
