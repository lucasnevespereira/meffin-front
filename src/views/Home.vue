<template>
    <div>
        <Landing v-if="!isAuthenticated"/>
        <div v-else>
            <h1>Dashboard</h1>
            <ul v-for="(income, index) in incomes" :key="index">
                {{ income.description }} - {{ income.amount }}€
            </ul>

            <ul v-for="(expense, index) in expenses" :key="index">
                {{ expense.description }} - {{ expense.amount }}€
            </ul>
        </div>
    </div>
</template>

<script lang="ts">
import Landing from "../components/Landing.vue";
import {useAuth0} from "@auth0/auth0-vue";
import {useTransactionsStore} from "../store";

export default {
    name: "home-view",
    components: {
        Landing,
    },
    setup() {
        const store = useTransactionsStore();
        const auth0 = useAuth0();

        return {
            incomes: store.incomes,
            expenses: store.expenses,
            isAuthenticated: auth0.isAuthenticated,
        }
    }
};
</script>