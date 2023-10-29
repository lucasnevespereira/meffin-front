<script setup lang="ts">
import Home from "./views/Home.vue";
import Footer from "./components/Footer.vue";
import {useTransactionsStore} from "@/store/transactions";
import {useAuth0} from "@auth0/auth0-vue";
import {ref, watch} from "vue";
import Landing from "@/components/Landing.vue";
import Header from "@/components/Header.vue";
import LeftSidebar from "@/components/nav/LeftSidebar.vue";


const auth0 = useAuth0();
const isAuthenticated = ref(auth0.isAuthenticated.value);
watch(() => auth0.isAuthenticated.value, (newIsAuthenticated) => {
    isAuthenticated.value = newIsAuthenticated;
});

</script>

<template>
    <div id="app" class="min-h-screen bg-secondary">
        <div class="flex flex-col" v-if="!isAuthenticated">
            <Header/>
            <Landing/>
            <Footer/>
        </div>
        <div class="flex flex-col lg:flex-row" v-else>
            <LeftSidebar class="hidden lg:block"/>
            <Header class="block lg:hidden"/>
            <div class="lg:w-4/5 rounded-3xl bg-base-100 max-w-full min-h-fit m-5">
                <router-view/>
            </div>
        </div>
    </div>
</template>


