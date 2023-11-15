<template>
    <div v-if="isOpen" class="absolute top-16 left-0 w-full bg-base-100 lg:hidden z-10">
        <div v-if="!isAuthenticated && !isLoading" class="px-4 py-2">
            <button id="qsLoginBtn" class="btn btn-primary block w-full" @click.prevent="login">Se Connecter</button>
        </div>
        <div v-if="isAuthenticated" class="py-4">
            <div class="flex items-center mb-4 px-4">
                <img :src="user.picture" alt="User's profile picture" class="rounded-full w-8 h-8 mr-4">
                <h6>{{ user.name }}</h6>
            </div>
            <ul class="space-y-4 px-4">
              <li class="flex items-center p-2 hover:bg-base-200 rounded">
                <router-link to="/" class="hover:text-primary flex items-center w-full" @click.native="$emit('closeMenu')">
                  <font-awesome-icon icon="gauge" class="mr-3"/>
                  Dashboard
                </router-link>
              </li>
                <li class="flex items-center p-2 hover:bg-base-200 rounded">
                    <router-link to="/transactions" class="hover:text-primary flex items-center w-full" @click.native="$emit('closeMenu')">
                        <font-awesome-icon icon="wallet" class="mr-3"/>
                        Transactions
                    </router-link>
                </li>
              <li class="flex items-center p-2 hover:bg-base-200 rounded">
                <router-link to="/profile" class="hover:text-primary flex items-center w-full" @click.native="$emit('closeMenu')">
                  <font-awesome-icon icon="user" class="mr-3"/>
                  Mon Profil
                </router-link>
              </li>
                <li class="flex items-center p-2 hover:bg-base-200 rounded">
                    <a id="qsLogoutBtn" href="#" class="hover:text-primary flex items-center w-full" @click.prevent="logout">
                        <font-awesome-icon icon="power-off" class="mr-3"/>
                        Déconnexion
                    </a>
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
