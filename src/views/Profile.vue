<template>
    <div class="container mx-auto p-8">

        <div class="flex flex-col md:flex-row items-center mb-10">
            <div class="w-full md:w-1/4 mb-4 md:mb-0">
                <img
                    :src="user?.picture"
                    alt="User's profile picture"
                    class="profile-pic rounded-full w-32 h-32 object-cover mx-auto md:mx-0 shadow-lg"
                />
            </div>
            <div class="w-full md:w-3/4 text-center md:text-left ml-0 md:ml-8">
                <h2 class="text-2xl md:text-3xl font-bold mb-2">{{ user?.name }}</h2>
                <p class="text-lg text-gray-600">{{ user?.email }}</p>
                <p class="mt-2 text-sm text-gray-500">Username: {{ user?.nickname }}</p>
            </div>
        </div>

    </div>
</template>

<script lang="ts">
import { useAuth0 } from '@auth0/auth0-vue';

export default {
    name: "profile-view",
    setup() {
        const auth0 = useAuth0();
        return {
            user: auth0.user,
        }
    }
};
</script>

<style>
.profile-pic {

}
</style>
