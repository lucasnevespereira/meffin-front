<script setup lang="ts">
import Footer from "./components/Footer.vue";
import {useAuth0} from "@auth0/auth0-vue";
import {ref, watch, onMounted} from "vue";
import Landing from "@/components/Landing.vue";
import Header from "@/components/Header.vue";
import LeftSidebar from "@/components/nav/LeftSidebar.vue";
import { useUserStore } from "@/store/user";

const auth0 = useAuth0();
const userStore = useUserStore();
const isAuthenticated = ref(auth0.isAuthenticated.value);

// Watch for authentication changes
watch(() => auth0.isAuthenticated.value, async (newIsAuthenticated) => {
    console.log('Auth state changed:', newIsAuthenticated);
    isAuthenticated.value = newIsAuthenticated;
    
    if (newIsAuthenticated && auth0.user.value) {
        try {
            console.log('User authenticated, syncing with database...');
            console.log('Auth0 user data:', auth0.user.value);
            // Sync user with database when they authenticate
            await userStore.syncUser(auth0.user.value);
            console.log('User sync completed');
        } catch (error) {
            console.error('Failed to sync user:', error);
            // You might want to show an error message to the user here
        }
    } else if (!newIsAuthenticated) {
        console.log('User logged out, clearing user data');
        // Clear user data when they log out
        userStore.clearUser();
    }
});

// Watch for user profile changes (this is the key fix)
watch(() => auth0.user.value, async (newUser) => {
    console.log('User profile changed:', newUser);
    if (newUser && auth0.isAuthenticated.value && Object.keys(newUser).length > 0) {
        try {
            console.log('User profile loaded, syncing with database...');
            console.log('Auth0 user data:', newUser);
            await userStore.syncUser(newUser);
            console.log('User sync completed from profile change');
        } catch (error) {
            console.error('Failed to sync user from profile change:', error);
        }
    }
}, { immediate: true });

// Handle initial load when user is already authenticated
onMounted(async () => {
    console.log('App mounted, checking auth state...');
    if (auth0.isAuthenticated.value && auth0.user.value && Object.keys(auth0.user.value).length > 0) {
        try {
            console.log('User already authenticated, syncing...');
            console.log('Auth0 user data:', auth0.user.value);
            await userStore.syncUser(auth0.user.value);
            console.log('Initial sync completed');
        } catch (error) {
            console.error('Failed to sync user on mount:', error);
        }
    } else {
        console.log('No user authenticated on mount or user profile not loaded');
    }
});
</script>

<template>
    <div id="app bg-secondary">
        <div class="flex flex-col min-h-screen" v-if="!isAuthenticated">
            <Header/>
            <Landing />
            <Footer/>
        </div>
        <div class="flex flex-col lg:flex-row min-h-screen" v-else>
            <LeftSidebar class="hidden lg:block"/>
            <Header class="block lg:hidden"/>
            <div class="lg:w-4/5 rounded-3xl max-w-full min-h-full lg:min-h-fit m-2 lg:m-5">
                <router-view/>
            </div>
          <Footer class="lg:hidden"/>
        </div>
    </div>
</template>