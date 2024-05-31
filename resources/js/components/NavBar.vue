<template>
    <MDBNavbar light bg="primary" expand="lg" container>
        <MDBNavbarBrand href="#" style="color: azure;">Dashboard</MDBNavbarBrand>
        <MDBCollapse id="navbarNav">
            <MDBNavbarNav>
                <MDBNavbarItem to="/" active> Tâches </MDBNavbarItem>
                <MDBNavbarItem to="/create"> Nouvelle tâche </MDBNavbarItem>
            </MDBNavbarNav>
        </MDBCollapse>
    </MDBNavbar>
</template>



<script setup>
    import { MDBNavbar, MDBNavbarBrand, MDBNavbarNav, MDBNavbarItem, MDBCollapse } from 'mdb-vue-ui-kit';
    import { ref } from 'vue';
</script>
