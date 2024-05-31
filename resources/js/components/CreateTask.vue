<template>
    <NavBar></NavBar>
    <MDBContainer class="d-flex justify-content-center" style="margin-top: 20px;">
        <form @submit.prevent="valideForm">
            <MDBInput type="text" label="Nom de la tâche" id="formTitle" v-model="form.title" wrapperClass="mb-4" />
            <MDBRow class="mb-4">
                <MDBCol>
                    <MDBInput type="date" label="Date d'échéance" id="formDueDate" v-model="form.dueDate" />
                </MDBCol>
                <MDBCol>
                    <MDBInput type="date" label="Date de validation" id="formValidationDate" v-model="form.validationDate" />
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
                    <MDBBadge v-for="assignUser in assignUsers" badge="success" pill class="d-inline hover-red" :key="assignUser.id" @click="unassign(assignUser.id)">{{ initialName(assignUser.name) }}</MDBBadge>
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
    import { initialName } from '../tools';
    import router from '../router';

    const { users, getUsers, createTask } = useAPI();

    onMounted(() => getUsers());

    const dropdown = ref(false);

    const assignUsers = ref([]);

    const form = reactive({
        title: '',
        dueDate: '',
        validationDate: '',
    });

    const assign = (user) => {
        console.log("assign ", users.value, user)
        assignUsers.value.push(user);
    }

    const unassign = (userId) => {
        const filteredAssignUsers = assignUsers.value.filter(assignUser => assignUser.id !== userId);
        assignUsers.value = filteredAssignUsers;
    }

    const valideForm = async () => {
        const ids = assignUsers.value.map(assignUser => assignUser.id);
        await createTask({ ...form }, ids);
        await router.push({name: 'Dashboard'});
    }
</script>
