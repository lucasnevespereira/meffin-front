<!-- Your Main Component -->

<template>
    <div class="p-6 bg-white rounded-xl shadow-md space-y-8">
        <div class="text-center mb-4 border-b pb-2">
            <h2 class="text-2xl font-semibold">Récapitulatif du mois</h2>
        </div>

        <BillTransactionCard :items="incomes" title="Entrées" :isIncome="true" />
        <BillTransactionCard :items="expenses" title="Dépenses" :isIncome="false" />
        <BillBalanceCard :solde="solde" />
    </div>
</template>

<script>
import BillTransactionCard from "./cards/BillTransactionCard.vue";
import BillBalanceCard from "./cards/BillBalanceCard.vue";

export default {
    components: {
        BillBalanceCard,
        BillTransactionCard
    },
    props: {
        incomes: Array,
        expenses: Array,
        solde: Number
    }
};
</script>
