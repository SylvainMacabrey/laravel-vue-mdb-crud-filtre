<template>
    <NavBar></NavBar>
    <MDBContainer style="margin-top: 20px;">
        <h1>Tâches</h1>
        <MDBRow class="mb-4">
            <MDBCol>
                <MDBInput type="text" label="Nom de la tâche" id="formTaskName" v-model="taskName" />
            </MDBCol>
            <MDBCol>
                <MDBInput type="date" label="Échéance" id="formDueDate" v-model="dueDate" />
            </MDBCol>
            <MDBCol>
                <MDBInput type="date" label="Validation" id="formValidationDate" v-model="validationDate" />
            </MDBCol>
            <MDBCol>
                <MDBDropdown v-model="dropdown" style="width: inherit;">
                    <MDBDropdownToggle @click="dropdown = !dropdown" style="width: inherit;">{{ labelIsFinish }}</MDBDropdownToggle>
                    <MDBDropdownMenu aria-labelledby="dropdownMenuButton" style="width: inherit;">
                        <MDBDropdownItem href="#" @click="isFinishClick(2)">Toute les tâches</MDBDropdownItem>
                        <MDBDropdownItem href="#" @click="isFinishClick(1)">Tâches terminées</MDBDropdownItem>
                        <MDBDropdownItem href="#" @click="isFinishClick(0)">Tâches en cours</MDBDropdownItem>
                    </MDBDropdownMenu>
                </MDBDropdown>
            </MDBCol>
        </MDBRow>
    </MDBContainer>
    <MDBContainer style="margin-top: 20px;">
        <MDBTable class="align-middle mb-0 bg-white">
            <thead class="bg-light">
                <tr>
                    <th></th>
                    <th>Échéance</th>
                    <th>Validé le</th>
                    <th>Nom de la tache</th>
                    <th>En charge de l'éxécution</th>
                    <th></th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="task in tasks" :key="task.id">
                    <td>
                        <MDBCheckbox v-model="task.is_finish" @click="putIsFinish(task)" />
                    </td>
                    <td>{{ formatDate(task.due_date) }}</td>
                    <td>{{ formatDate(task.validation_date) }}</td>
                    <td>{{ task.title }}</td>
                    <td>
                        <MDBBadge v-for="initialName in allInitialName(task.users)" badge="success" pill class="d-inline" :key="initialName">{{ initialName }}</MDBBadge>
                    </td>
                    <td>
                        <MDBBtn color="link" size="sm" rounded class="fw-bold" :ripple="{ color: 'dark' }" @click="router.push({name: 'EditTask', params: { id: task.id }})">Modifier</MDBBtn>
                        <MDBBtn color="danger" size="sm" rounded class="fw-bold" :ripple="{ color: 'dark' }" @click="destroyTask(task.id)">Supprimer</MDBBtn>

                    </td>
                </tr>
            </tbody>
        </MDBTable>
    </MDBContainer>
    <MDBContainer style="margin-top: 20px;">
        <MDBPagination circle class="d-flex justify-content-center">
            <MDBPageNav prev @click="getTasks(currentPage - 1)" v-if="currentPage !== 1"></MDBPageNav>
            <MDBPageItem v-for="link in listLinks(linksPagination)" :active="link.active" @click="getTasks(parseInt(link.label))" href="#" :key="link.label">
                {{ link.label }}
            </MDBPageItem>
            <MDBPageNav next @click="getTasks(currentPage + 1)" v-if="currentPage !== lastPage"></MDBPageNav>
        </MDBPagination>
    </MDBContainer>
</template>

<script setup>
    import NavBar from './NavBar.vue';
    import { MDBContainer, MDBInput, MDBBtn, MDBIcon, MDBRow, MDBCol, MDBTable, MDBBadge, MDBCheckbox, MDBPagination, MDBPageNav, MDBPageItem, MDBDropdown, MDBDropdownToggle, MDBDropdownMenu, MDBDropdownItem } from 'mdb-vue-ui-kit';
    import { onMounted, watch,  ref  } from "vue";
    import useAPI from '../store';
    import { allInitialName, formatDate, listLinks } from '../tools'
    import router from '../router';

    const dropdown = ref(false);
    const labelIsFinish = ref("Toute les tâches");

    const  { tasks, taskName, dueDate, validationDate, linksPagination, currentPage, lastPage, isFinish, getTasks, putIsFinish, deleteTask } = useAPI();

    onMounted(() => getTasks(1));

    watch(taskName, (newTaskName, oldTaskName) => getTasks(1));

    watch(dueDate, (newDueDate, oldDueDate) => getTasks(1));

    watch(validationDate, (newValidationDate, oldValidationDate) => getTasks(1));

    watch(isFinish, (newIsFinish, oldIsFinish) => getTasks(1));

    const isFinishClick = (value) => {
        const text = [
            "Tâches en cours",
            "Tâches terminées",
            "Toutes les tâches"
        ];
        isFinish.value = value !== 2 ? value : '';
        labelIsFinish.value = text[value]
    }

    const destroyTask = async (id) => {
        await deleteTask(id);
        await getTasks(1);
    }

</script>
