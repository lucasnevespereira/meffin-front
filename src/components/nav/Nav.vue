<template>
    <div class="hidden lg:flex items-center">
        <!-- If user is not authenticated and not loading -->
        <div v-if="!isAuthenticated && !isLoading">
            <button id="qsLoginBtn" class="btn btn-primary" @click.prevent="login">Login</button>
        </div>
        <!-- If user is authenticated -->
        <div v-if="isAuthenticated" class="dropdown dropdown-end">
            <div tabindex="0" class="avatar">
                <img :src="user.picture" alt="User's profile picture" class="rounded-full w-12">
            </div>
            <ul tabindex="0" class="p-2 shadow menu dropdown-content bg-base-100 rounded-box w-52">
                <li>
                    <router-link to="/profile">
                        <i class="fa fa-user mr-2"></i> Profile
                    </router-link>
                </li>
                <li>
                    <router-link to="/transactions">
                        <i class="fa fa-wallet mr-2"></i> Transactions
                    </router-link>
                </li>
                <li>
                    <a href="#" @click.prevent="logout">
                        <i class="fa fa-power-off mr-2"></i> Log out
                    </a>
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        isAuthenticated: Boolean,
        isLoading: Boolean,
        user: Object,
        login: Function,
        logout: Function
    }
}
</script>

<style>
.avatar img {
    max-width: 60%;
}

.avatar:hover {
    cursor: pointer;
}
</style>
