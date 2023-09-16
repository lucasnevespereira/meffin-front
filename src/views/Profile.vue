<template>
    <div class="container mx-auto">
        <div class="flex items-center mb-6">
            <div class="w-1/4 md:w-1/6">
                <img
                        :src="user?.picture"
                        alt="User's profile picture"
                        class="rounded-full md:w-3/4 mx-auto md:mx-0"
                />
            </div>
            <div class="w-3/4 md:w-5/6 text-center md:text-left ml-4">
                <h2 class="text-xl font-bold">{{ user?.name }}</h2>
                <p class="text-gray-500">{{ user?.email }}</p>
            </div>
        </div>

        <div class="row">
            <highlightjs language="json" :code="JSON.stringify(user, null, 2)" />
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
