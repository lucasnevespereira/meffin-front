<template>
    <div class="p-2 sm:p-6 bg-white rounded-xl shadow-md space-y-4 sm:space-y-8">
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
        solde: String
    },
};
</script>
