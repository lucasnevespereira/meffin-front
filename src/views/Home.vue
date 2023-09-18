<template>
    <div class="container mx-auto p-4 space-y-8">
        <Landing v-if="!isAuthenticated && !isFetching"/>
        <div v-else>
            <Loader v-if="isFetching" />
            <div v-else>
                <div class="text-center mb-6">
                    <h1 class="text-2xl sm:text-3xl md:text-4xl font-bold">{{ currentMonth }}</h1>
                </div>
                <MonthlyBill v-if="incomes.length > 0 || expenses.length > 0" :incomes="incomes" :expenses="expenses" :solde="solde"/>
                <div v-else class="flex flex-col items-center space-y-4">
                    <p class="text-gray-600">Pas de transactions ce mois-ci.</p>
                    <router-link to="/transactions" class="btn btn-primary">Ajouter des transactions</router-link>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import Landing from "@/components/Landing.vue";
import {useAuth0} from "@auth0/auth0-vue";
import {useTransactionsStore} from "@/store/transactions";
import {computed} from "vue";
import MonthlyBill from "@/components/MonthlyBill.vue";
import Loader from "@/components/Loader.vue";

export default {
    name: "home-view",
    components: {
        Loader,
        MonthlyBill,
        Landing,
    },
    setup() {
        const store = useTransactionsStore();
        const auth0 = useAuth0();
        const monthNames = [
            "Janvier", "Février", "Mars", "Avril", "Mai", "Juin", "Juillet",
            "Août", "Septembre", "Octobre", "Novembre", "Décembre"
        ];
        const currentDate = new Date();
        const currentMonth = monthNames[currentDate.getMonth()] + ' ' + currentDate.getFullYear();
        const isFetching = computed(() => store.isFetching)
        const incomes = computed(() =>  store.incomes)
        const expenses = computed(() =>  store.expenses)
        const solde = computed(() => {
            const totalIncome = store.incomes ? store.incomes.reduce((sum, i) => sum + i.amount, 0) : 0;
            const totalExpense = store.expenses ? store.expenses.reduce((sum, e) => sum + e.amount, 0) : 0;
            return totalIncome - totalExpense;
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
