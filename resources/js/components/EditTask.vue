<template>
    <NavBar></NavBar>
    <MDBContainer class="d-flex justify-content-center" style="margin-top: 20px;">
        <form @submit.prevent="valideForm">
            <MDBInput type="text" label="Nom de la tâche" id="formTitle" v-model="task.title" wrapperClass="mb-4" />
            <MDBRow class="mb-4">
                <MDBCol>
                    <MDBInput type="date" label="Date d'échéance" id="formDueDate" v-model="task.due_date" />
                </MDBCol>
                <MDBCol>
                    <MDBInput type="date" label="Date de validation" id="formValidationDate" v-model="task.validation_date" />
                </MDBCol>
            </MDBRow>
            <MDBDropdown v-model="dropdown" style="width: inherit;">
                <MDBDropdownToggle @click="dropdown = !dropdown" style="width: -webkit-fill-available;">Éxécution</MDBDropdownToggle>
                <MDBDropdownMenu aria-labelledby="dropdownMenuButton" style="width: inherit;">
                    <MDBDropdownItem v-for="user in users" :key="user.id" href="#" @click="assign(user)">{{ user.name }}</MDBDropdownItem>
                </MDBDropdownMenu>
            </MDBDropdown>
            <MDBRow class="mb-4">
                <MDBCol>
                    <MDBBadge v-for="assignUser in task.users" badge="success" pill class="d-inline hover-red" :key="assignUser.id" @click="unassign(assignUser.id)">{{ initialName(assignUser.name) }}</MDBBadge>
                </MDBCol>
            </MDBRow>
            <MDBBtn color="primary" block class="mb-4" type="submit"> Enregistrer </MDBBtn>
        </form>
    </MDBContainer>
</template>

<script setup>
    import NavBar from './NavBar.vue';
    import { MDBContainer, MDBRow, MDBCol, MDBInput, MDBCheckbox, MDBBtn, MDBIcon, MDBDropdown, MDBDropdownToggle, MDBDropdownMenu, MDBDropdownItem, MDBBadge } from 'mdb-vue-ui-kit';
    import { reactive, onMounted, ref } from "vue";
    import useAPI from "../store";
    import { initialName, formatDate } from '../tools';
    import router from '../router';

    const props = defineProps(['id'])

    const { users, task, getUsers, getTask, editTask } = useAPI();

    onMounted(() => {
        getUsers();
        getTask(props.id);
        console.log("task ", task);
    });

    const dropdown = ref(false);

    const assign = (user) => {
        console.log("assign ", task.value.users, user)
        task.value.users.push(user);
    }

    const unassign = (userId) => {
        const filteredAssignUsers = task.value.users.filter(assignUser => assignUser.id !== userId);
        task.value.users = filteredAssignUsers;
    }

    const valideForm = async () => {
        const ids = task.value.users.map(assignUser => assignUser.id);
        await editTask(props.id, ids);
        await router.push({name: 'Dashboard'});
    }
</script>
