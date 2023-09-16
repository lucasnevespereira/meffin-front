<template>
    <div v-if="isOpen" class="absolute top-16 left-0 w-full lg:hidden">
        <!-- If user is not authenticated and not loading -->
        <div v-if="!isAuthenticated && !isLoading">
            <button id="qsLoginBtn" class="btn btn-primary block w-full" @click.prevent="login">Login</button>
        </div>
        <!-- If user is authenticated -->
        <div v-if="isAuthenticated" class="bg-base-100 py-4">
            <div class="flex items-center mb-4 px-4">
                <img :src="user.picture" alt="User's profile picture" class="rounded-full w-8 h-8 mr-4">
                <h6>{{ user.name }}</h6>
            </div>
            <ul class="space-y-2 px-4">
                <li class="flex items-center">
                    <font-awesome-icon icon="user" class="mr-3"/>
                    <router-link to="/profile" class="hover:text-primary">Profile</router-link>
                </li>
                <li class="flex items-center">
                    <font-awesome-icon icon="wallet" class="mr-3"/>
                    <router-link to="/transactions" class="hover:text-primary">Transactions</router-link>
                </li>
                <li class="flex items-center">
                    <font-awesome-icon icon="power-off" class="mr-3"/>
                    <a id="qsLogoutBtn" href="#" class="hover:text-primary" @click.prevent="logout">Log out</a>
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        isOpen: {
            type: Boolean,
            default: false
        },
        isAuthenticated: Boolean,
        isLoading: Boolean,
        user: Object,
        login: Function,
        logout: Function
    }
}
</script>
