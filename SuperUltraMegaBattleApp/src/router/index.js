import { createRouter, createWebHistory } from "vue-router";

import AccueilView from "@/views/AccueilView.vue";
import SearchView from "@/views/SearchView.vue";
import DleView from "@/views/DleView.vue";

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
    {
    path: '/game',
    name: 'game',
    component: DleView
    }
  ],
});

export default router;
