<template>
    <div class="mx-auto px-2 sm:px-4 space-y-8 toto">
        <Loader v-if="isFetching"/>
        <div class="py-5">
            <div class="text-center mb-6">
                <h1 class="text-2xl sm:text-3xl md:text-4xl font-bold">{{ currentMonth }}</h1>
            </div>
            <MonthlyBill v-if="incomes && incomes.length > 0 || expenses && expenses.length > 0" :incomes="incomes"
                         :expenses="expenses" :solde="solde"/>
            <div v-else class="flex flex-col items-center space-y-4">
                <p class="text-gray-600">Pas de transactions ce mois-ci.</p>
                <router-link to="/transactions" class="btn btn-primary">Ajouter des transactions</router-link>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import Landing from "@/components/Landing.vue";
import {useAuth0} from "@auth0/auth0-vue";
import {useTransactionsStore} from "@/store/transactions";
import {computed, watch} from "vue";
import MonthlyBill from "@/components/MonthlyBill.vue";
import Loader from "@/components/Loader.vue";
import Header from "@/components/Header.vue";
import Footer from "@/components/Footer.vue";

export default {
    name: "home-view",
    components: {
        Header,
        Footer,
        Loader,
        MonthlyBill,
        Landing,
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
        }, {immediate: true});
        const monthNames = [
            "Janvier", "Février", "Mars", "Avril", "Mai", "Juin", "Juillet",
            "Août", "Septembre", "Octobre", "Novembre", "Décembre"
        ];
        const currentDate = new Date();
        const currentMonth = monthNames[currentDate.getMonth()] + ' ' + currentDate.getFullYear();
        const isFetching = computed(() => store.isFetching)
        const incomes = computed(() => store.incomes)
        const expenses = computed(() => store.expenses)
        const solde = computed(() => {
            const totalIncome = store.incomes ? store.incomes.reduce((sum, i) => sum + i.amount, 0) : 0;
            const totalExpense = store.expenses ? store.expenses.reduce((sum, e) => sum + e.amount, 0) : 0;
            const balance = totalIncome - totalExpense;
            return balance.toFixed(2);
        });

        return {
            incomes: incomes,
            expenses: expenses,
            isFetching: isFetching,
            isAuthenticated: auth0.isAuthenticated,
            user: auth0.user,
            currentMonth,
            solde
        };
    }
};
</script>

<style scoped>
</style>
