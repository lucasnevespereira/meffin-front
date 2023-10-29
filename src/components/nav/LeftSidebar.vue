<script setup lang="ts">
import {useAuth0} from '@auth0/auth0-vue';

const auth0 = useAuth0();
const user = auth0.user
const logout = () => {
    auth0.logout({
        logoutParams: {
            returnTo: window.location.origin
        }
    });
}

</script>

<template>
    <div class="w-1/5">
        <div class="wrapper flex flex-col min-h-screen sticky z-10 top-0">
            <!-- Logo -->
            <div class="m-5">
                <router-link to="/">
                    <img src="/logo.svg" alt="Logo" class="w-16 h-16"/>
                </router-link>
            </div>

            <!-- Navigation -->
            <div class="space-y-4 m-5 flex-1">
                <router-link to="/" class="btn btn-secondary w-full flex justify-start">     <font-awesome-icon icon="gauge" class="mr-2"/>Dashboard</router-link>
                <router-link to="/transactions" class="btn btn-secondary w-full flex justify-start items-center">
                    <font-awesome-icon icon="wallet" class="mr-2"/>
                    Transactions
                </router-link>
            </div>

            <!-- Bottom Buttons -->
            <div class="m-5">
                <router-link to="/profile" class="btn btn-secondary w-full flex justify-start">
                    <img :src="user.picture" alt="User's profile picture" class="w-8 rounded-full">
                    Mon Profil
                </router-link>
                <router-link to="/preferences" class="btn btn-secondary w-full flex justify-start">
                    <font-awesome-icon icon="cog" class="mr-2"/>
                    Préferences
                </router-link>
                <button class="btn btn-secondary w-full flex justify-start" @click.prevent="logout">
                    <font-awesome-icon icon="power-off" class="mr-2"/>
                    Déconnexion
                </button>
            </div>
        </div>
    </div>
</template>
<style>
.wrapper {
    width: 90%;
    margin: auto;
}
</style>