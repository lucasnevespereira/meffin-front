<template>
    <div class="container mx-auto p-4 space-y-8">
        <div class="text-center">
            <h1 class="text-4xl font-extrabold">Mes transactions</h1>
            <p class="text-xl font-medium">Bonjour, {{ user.nickname }}</p>
        </div>

        <div class="p-6 bg-white rounded-xl shadow-md space-y-6">
            <h2 class="text-2xl font-bold">Mes entrées</h2>
            <TransactionList :items="incomes" type="income" @removeItem="handleRemoveTransaction"/>
            <TransactionForm :modelValue="incomes" type="income"
                             @update:modelValue="updatedIncomes => incomes = updatedIncomes"
                             @addTransaction="handleAddTransaction"/>
        </div>

        <div class="my-6 border-b-2"></div>

        <div class="p-6 bg-white rounded-xl shadow-md space-y-6">
            <h2 class="text-2xl font-bold mt-6">Mes dépenses</h2>
            <TransactionList :items="expenses" type="expense" @removeItem="handleRemoveTransaction"></TransactionList>
            <TransactionForm :modelValue="expenses" type="expense"
                             @update:modelValue="updatedExpenses => expenses = updatedExpenses"
                             @addTransaction="handleAddTransaction"/>
        </div>
    </div>
</template>

<script lang="ts">
import TransactionList from "@/components/lists/TransactionList.vue";
import TransactionForm from "@/components/forms/TransactionForm.vue";

import {useTransactionsStore} from '@/store/transactions';
import {useAuth0} from "@auth0/auth0-vue";
import {onMounted} from "vue";


export default {
    components: {
        TransactionForm,
        TransactionList,
    },
    setup() {
        const store = useTransactionsStore();
        const auth0 = useAuth0();

        const handleAddTransaction = (type: string, transaction: Transaction) => {
            const userId = auth0.user.value?.sub;
            if (userId) {
                store.addTransaction({userId, ...transaction});
            }
        };

        const handleRemoveTransaction = (transactionId: string) => {
            store.removeTransaction(transactionId);
        };


        return {
            user: auth0.user,
            incomes: store.incomes,
            expenses: store.expenses,
            handleAddTransaction,
            handleRemoveTransaction
        }
    }
};
</script>
