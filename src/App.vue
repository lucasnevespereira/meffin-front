<template>
    <div id="app" class="flex flex-col h-screen">
        <Header />
        <div class="container mx-auto flex-grow">
            <error />
            <div class="mt-5">
                <router-view />
            </div>
        </div>
        <footer class="bg-gray-100 text-center py-3">
            <div class="h-10 w-10 bg-gray-200 rounded logo mx-auto"></div>
            <p class="mt-2">
                Sample project provided by
                <a href="https://auth0.com" class="text-blue-500 hover:underline">Auth0</a>
            </p>
        </footer>
    </div>
</template>

<script lang="ts">
import Error from "./components/Error.vue";
import Header from "./components/Header.vue";

export default {
    components: {
        Header,
        Error
    }
};
</script>
