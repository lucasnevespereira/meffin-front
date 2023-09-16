<template>
    <div class="container mx-auto p-4 space-y-8">
        <Landing v-if="!isAuthenticated"/>
        <div v-else>
            <div class="text-center mb-6">
                <h1 class="text-2xl sm:text-3xl md:text-4xl font-bold">{{ currentMonth }}</h1>
            </div>
            <MonthlyBill :incomes="incomes" :expenses="expenses" :solde="solde" />
        </div>
    </div>
</template>

<script lang="ts">
import Landing from "../components/Landing.vue";
import { useAuth0 } from "@auth0/auth0-vue";
import { useTransactionsStore } from "../store";
import {computed} from "vue";
import MonthlyBill from "../components/MonthlyBill.vue";

export default {
    name: "home-view",
    components: {
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

        const solde = computed(() => {
            const totalIncome = store.incomes.reduce((sum, i) => sum + i.amount, 0);
            const totalExpense = store.expenses.reduce((sum, e) => sum + e.amount, 0);
            return totalIncome - totalExpense;
        });

        return {
            incomes: store.incomes,
            expenses: store.expenses,
            isAuthenticated: auth0.isAuthenticated,
            currentMonth,
            solde
        };
    }
};
</script>
