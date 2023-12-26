<template>
    <div class="hidden lg:flex items-center">
        <div v-if="!isAuthenticated && !isLoading">
            <button id="qsLoginBtn" class="btn btn-primary" @click.prevent="login">Se Connecter</button>
        </div>
        <div v-if="isAuthenticated" class="dropdown dropdown-end">
            <div tabindex="0" class="avatar flex" @click="toggleDropdown">
                <img :src="user.picture" alt="User's profile picture" class="rounded-full w-10">
            </div>
            <ul v-if="isDropdownOpen" tabindex="0" class="p-2 shadow menu dropdown-content bg-base-100 rounded-box w-52"
                ref="dropdownContent">
                <li>
                    <router-link to="/profile" @click="closeDropdown">
                        <font-awesome-icon icon="user" class="mr-2"/> Mon Profil
                    </router-link>
                </li>
                <li>
                    <router-link to="/transactions" @click="closeDropdown">
                        <font-awesome-icon icon="wallet" class="mr-2"/> Transactions
                    </router-link>
                </li>
                <li>
                    <a href="#" @click.prevent="logout">
                        <font-awesome-icon icon="power-off" class="mr-3"/> Se Déconnecter
                    </a>
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
import {ref} from 'vue';

export default {
    props: {
        isAuthenticated: Boolean,
        isLoading: Boolean,
        user: Object,
        login: Function,
        logout: Function
    },
    setup() {
        const isDropdownOpen = ref(false);

        const toggleDropdown = () => {
            isDropdownOpen.value = !isDropdownOpen.value;
        };

        const closeDropdown = () => {
            isDropdownOpen.value = false;
        };

        return {
            isDropdownOpen,
            toggleDropdown,
            closeDropdown
        };
    }
}


</script>

<style>
.avatar img {
    max-width: 50%;
}

.avatar:hover {
    cursor: pointer;
}
</style>
