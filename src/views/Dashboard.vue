<script setup lang="ts">

import {FontAwesomeIcon} from "@fortawesome/vue-fontawesome";
import AmountCard from "@/components/cards/AmountCard.vue";
import DoughnutChart from "@/components/charts/DoughnutChart.vue";
import {computed, watch} from "vue";
import {useTransactionsStore} from "@/store/transactions";
import Loader from "@/components/Loader.vue";
import {useAuth0} from "@auth0/auth0-vue";


const monthNames = [
    "Janvier", "Février", "Mars", "Avril", "Mai", "Juin", "Juillet",
    "Août", "Septembre", "Octobre", "Novembre", "Décembre"
];
const currentDate = new Date();
const currentMonth = monthNames[currentDate.getMonth()] + ' ' + currentDate.getFullYear();


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

const isFetching = computed(() => store.isFetching)
const expenses = computed(() => store.expenses)
const totalIncome = computed(() => store.incomes ? store.incomes.reduce((sum, i) => sum + i.amount, 0) : 0)
const totalExpense = computed(() => store.expenses ? store.expenses.reduce((sum, e) => sum + e.amount, 0) : 0)
const solde = computed(() => {
    const balance = totalIncome.value - totalExpense.value;
    return balance.toFixed(2);
});
</script>

<template>
    <div class="container flex flex-col sm:p-0 p-4 lg:p-10 sm:mx-auto">
        <div class="flex justify-between items-center text-primary">
            <h2 class="text-3xl p-5 text-primary font-bold">Dashboard</h2>
            <div class="flex items-center">
                <p class="p-5 text-lg text-center">{{ currentMonth }}</p>
            </div>
        </div>
        <Loader v-if="isFetching"/>
        <div v-else>
            <div class="amount-card-container flex lg:flex-grow w-full lg:space-x-5 pt-5">
                <AmountCard label="Entrées" :amount="totalIncome.toFixed(2)"/>
                <AmountCard label="Sorties" :amount="totalExpense.toFixed(2)"/>
                <AmountCard label="Solde" :amount="solde"/>
            </div>
            <div class="max-w-full">
                <DoughnutChart :expenses="expenses"/>
            </div>
        </div>
    </div>

</template>

<style scoped>
.amount-card-container {}

@media screen and (max-width: 768px) {
  .amount-card-container {
    overflow-x: scroll;
    display: flex;
    padding: 0;
  }
}
</style>