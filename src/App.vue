<template>
    <div id="app" class="flex flex-col h-screen">
        <Header />
        <div class="container mx-auto flex-grow">
            <error />
            <div class="mt-5">
                <router-view />
            </div>
        </div>
        <Footer />
    </div>
</template>

<script lang="ts">
import Error from "./components/Error.vue";
import Header from "./components/Header.vue";
import Footer from "./components/Footer.vue";

export default {
    components: {
        Footer,
        Header,
        Error
    }
};
</script>
