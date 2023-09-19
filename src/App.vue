<template>
    <div id="app" class="flex flex-col h-screen">
        <Header/>
        <div class="container mx-auto flex-grow">
            <div class="mt-5">
                <router-view/>
            </div>
        </div>
        <Footer/>
    </div>
</template>

<script lang="ts">
import Error from "./components/Error.vue";
import Header from "./components/Header.vue";
import Footer from "./components/Footer.vue";
import {useTransactionsStore} from "@/store/transactions";
import {useAuth0} from "@auth0/auth0-vue";
import { watch} from "vue";

export default {
    components: {
        Footer,
        Header,
        Error
    },
    setup() {
        const store = useTransactionsStore();
        const auth0 = useAuth0();
        watch(() => auth0.user.value, async (newUser) => {
            if (newUser) {
                const userId = newUser.sub;
                if (userId) {
                    await store.fetchTransactions(userId);
                }
            }
        }, { immediate: true });
    }
};
</script>
