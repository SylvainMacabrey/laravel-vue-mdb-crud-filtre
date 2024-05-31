import axios from 'axios';
import { ref } from "vue";
import axiosClient from '../axios';
import { formatDate } from '../tools';

export default function useAPI() {
    const user = ref({});
    const users = ref([]);
    const token = ref(null);
    const task = ref({});
    const tasks = ref([]);
    const linksPagination = ref([]);
    const currentPage = ref(1);
    const lastPage = ref(0);
    const isFinish = ref('');

    //filter
    const taskName = ref('');
    const dueDate = ref('');
    const validationDate = ref('');

    const authenticate = async (data) => {
        const response = await axios.post('api/login', data);
        console.log(response.data)
        token.value = response.data.token;
        user.value = response.data.user;
        localStorage.setItem("token", response.data.token)
        console.log(token.value)
    }

    const getUsers = async () => {
        const response = await axiosClient.get("users");
        users.value = response.data.users;
    }

    const getTasks = async (page) => {
        const url = `task?page=${ page }&title=${ taskName.value }&due_date=${ dueDate.value }&validation_date=${ validationDate.value }&is_finish=${ isFinish.value }`;
        console.log("url", url)
        const response = await axiosClient.get(url);
        console.log("getTasks ", response);
        tasks.value = response.data.tasks.data;
        linksPagination.value = response.data.tasks.links;
        currentPage.value = response.data.tasks.current_page;
        lastPage.value = response.data.tasks.last_page;
    }

    const getTask = async (id) => {
        const response = await axiosClient.get(`task/${ id }`);
        const data = response.data.task;
        task.value = {
            title: data.title,
            due_date: formatDate(data.due_date, "en-CA"),
            validation_date: formatDate(data.validation_date, "en-CA"),
            users: response.data.users
        };
    }

    const putIsFinish = async (task) => {
        const response = await axiosClient.put(`task/updateisfinish/${ task.id }`, {
            is_finish: !task.is_finish
        });
        console.log(response);
        getTasks(currentPage);
    }

    const createTask = async (form, users) => {
        console.log("createTask ", form, users)
        try {
            const response = await axiosClient.post(`task`, {
                title: form.title,
                due_date: form.dueDate,
                validation_date: form.validationDate,
                users: users
            });
            console.log(response);
        } catch (error) {
            console.error("error ", error);
        }
    }

    const editTask = async (id, users) => {
        console.log("editTask ", task, users)
        try {
            const response = await axiosClient.put(`task/${ id }`, {
                title: task.value.title,
                due_date: task.value.due_date,
                validation_date: task.value.validation_date,
                users: users
            });
            console.log(response);
        } catch (error) {
            console.error("error ", error);
        }
    }

    const deleteTask = async (id) => {
        if(!window.confirm('Supprimer ce client ?')) return;
        await axiosClient.delete(`/task/${ id }`);
    }

    return {
        token,
        user,
        users,
        task,
        tasks,
        taskName,
        dueDate,
        validationDate,
        linksPagination,
        currentPage,
        lastPage,
        isFinish,
        authenticate,
        getUsers,
        getTask,
        getTasks,
        putIsFinish,
        createTask,
        editTask,
        deleteTask
    };
}
