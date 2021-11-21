import { createWebHistory, createRouter } from "vue-router";
import SortingVisualizer from "../views/SortingVisualizer.vue";
import Pathfinding from "../views/Pathfinding.vue";

const routes = [
    {
        path: "/sort",
        name: "SortingVisualizer",
        component: SortingVisualizer,
    },
    {
        path: "/path",
        name: "Pathfinding",
        component: Pathfinding,
    },
    // ** Non-exist path return to sort algo
    {
        path: "/:catchAll(.*)",
        redirect: { name: "SortingVisualizer" },
    },
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;
