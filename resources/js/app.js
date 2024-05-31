import './bootstrap';

import 'mdb-vue-ui-kit/css/mdb.min.css';

import { createApp } from 'vue';
import router from './router';
import Login from './components/Login.vue';
import Dashboard from './components/Dashboard.vue';
import NavBar from './components/NavBar.vue';
import CreateTask from './components/CreateTask.vue';
import EditTask from './components/EditTask.vue';

createApp({
    components: {
        Login,
        Dashboard,
        NavBar,
        CreateTask,
        EditTask
    }
}).use(router).mount('#app')
