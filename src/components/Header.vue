<template>
    <div class="mb-4">
        <nav class="p-2 lg:p-4 shadow-md">
            <div class="container mx-auto flex justify-between items-center">
                <Logo :inline="true" />
                <MobileNavButton @toggle-menu="mobileMenuOpen = !mobileMenuOpen" />
                <MobileNav :isOpen="mobileMenuOpen" :isAuthenticated="isAuthenticated" :isLoading="isLoading" :user="user" :login="login" :logout="logout"  @closeMenu="mobileMenuOpen = false"/>
                <Nav :isAuthenticated="isAuthenticated" :isLoading="isLoading" :user="user" :login="login" :logout="logout" />
            </div>
        </nav>
    </div>
</template>

<script lang="ts">
import { useAuth0 } from '@auth0/auth0-vue';
import { ref } from "vue";
import Logo from './nav/Logo.vue';
import MobileNavButton from './nav/MobileNavButton.vue';
import MobileNav from './nav/MobileNav.vue';
import Nav from './nav/Nav.vue';
import {onBeforeRouteLeave} from "vue-router";

const mobileMenuOpen = ref(false);

export default {
    name: "Header",
    components: {
        Logo,
        MobileNavButton,
        MobileNav,
        Nav
    },
    setup() {
        const auth0 = useAuth0();

        onBeforeRouteLeave(() => {
            mobileMenuOpen.value = false;
            return true;  // this is important; it confirms the navigation action
        });

        return {
            isAuthenticated: auth0.isAuthenticated,
            isLoading: auth0.isLoading,
            user: auth0.user,
            login() {
                auth0.loginWithRedirect()
            },
            logout() {
                auth0.logout({
                    logoutParams: {
                        returnTo: window.location.origin
                    }
                });
            },
            mobileMenuOpen
        };
    }
};
</script>
