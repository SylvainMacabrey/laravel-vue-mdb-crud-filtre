import { createRouter, createWebHistory } from 'vue-router';
import Login from '../components/Login.vue';
import Dashboard from '../components/Dashboard.vue';
import CreateTask from '../components/CreateTask.vue';
import EditTask from '../components/EditTask.vue';
import useAPI from '../store';

const routes = [
    {
        path: '/login',
        name: 'Login',
        component: Login
    },
    {
        path: '/',
        name: 'Dashboard',
        component: Dashboard,
        meta: {requiresAuth: true}
    },
    {
        path: '/create',
        name: 'CreateTask',
        component: CreateTask,
        meta: {requiresAuth: true}
    },
    {
        path: '/edit/:id',
        name: 'EditTask',
        component: EditTask,
        meta: {requiresAuth: true},
        props: true
    }
];

const router = createRouter({
    history: createWebHistory(),
    routes
});

router.beforeEach((to, from, next) => {
    const { token, user } = useAPI();
    console.log("token ", token.value, localStorage.getItem("token"))
    if (to.meta.requiresAuth && !localStorage.getItem("token")) {
        next({name: 'Login'});
    } else {
        next();
    }
});

export default router;
