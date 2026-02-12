import { createRouter, createWebHistory } from "vue-router";

import AccueilView from "@/views/AccueilView.vue";
import SearchView from "@/views/SearchView.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "accueil",
      component: AccueilView,
    },
    {
      path: "/search/:id",
      name: "search",
      component: SearchView,
      props: true,
    },
  ],
});

export default router;
