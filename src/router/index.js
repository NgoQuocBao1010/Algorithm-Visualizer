import { createWebHistory, createRouter } from "vue-router";
import SortingVisualizer from "../views/SortingVisualizer.vue";
import Pathfinding from "../views/Pathfinding.vue";

const routes = [
    {
        path: "/sort",
        name: "SortingVisualizer",
        component: SortingVisualizer,
        meta: {
            name: "Sort Visualizer",
        },
    },
    {
        path: "/path",
        name: "Pathfinding",
        component: Pathfinding,
        meta: {
            name: "Pathfinding Visualizer",
        },
    },
    // ** Non-exist path return to sort algo
    {
        path: "/:catchAll(.*)",
        redirect: { name: "SortingVisualizer" },
        meta: {
            name: "404 Not found",
        },
    },
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

router.beforeEach((to, from, next) => {
    document.title = `${to.meta.name} | Algo Visulizer`;
    return next();
});

export default router;
