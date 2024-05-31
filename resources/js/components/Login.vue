<template>
    <div>
        <router-link :to="'/'">Dashboard</router-link>
        <h1>login</h1>
        <form @submit.prevent="login">
            <input type="email" name="email" v-model="form.email">
            <input type="password" name="password" v-model="form.password">
            <button type="submit">Se connecter</button>
        </form>
    </div>
</template>

<script setup>
    import { reactive } from 'vue';
    import useAPI from '../store';
    import router from "../router/index.js"

    const { token, authenticate, getToken } = useAPI();

    const form = reactive({
            email: '',
            password: '',
        });

    const login = async () => {
        await authenticate({ ...form });
        await router.push({name: 'Dashboard'});
        console.log("token login ", token.value)
    }

</script>
