<template>
    <div class="container mx-auto p-4 space-y-8">
        <div class="text-center">
            <h1 class="text-4xl font-extrabold">Mes transactions</h1>
            <p class="text-xl font-medium">Bonjour, {{ user.nickname }}</p>
        </div>

        <Loader v-if="isFetching"/>

        <div class="p-6 bg-white rounded-xl shadow-md space-y-6">
            <h2 class="text-2xl font-bold">Mes entrées</h2>
            <TransactionList :items="incomes" :type="TransactionType.INCOME" @removeItem="handleRemoveTransaction"/>
            <TransactionForm :modelValue="incomes" :type="TransactionType.INCOME"/>
        </div>

        <div class="my-6 border-b-2"></div>

        <div class="p-6 bg-white rounded-xl shadow-md space-y-6">
            <h2 class="text-2xl font-bold mt-6">Mes dépenses</h2>
            <TransactionList :items="expenses" :type="TransactionType.EXPENSE"
                             @removeItem="handleRemoveTransaction"></TransactionList>
            <TransactionForm :modelValue="expenses" :type="TransactionType.EXPENSE"/>
        </div>
    </div>
</template>

<script lang="ts">
import TransactionList from "@/components/lists/TransactionList.vue";
import TransactionForm from "@/components/forms/TransactionForm.vue";

import {useTransactionsStore} from '@/store/transactions';
import {useAuth0} from "@auth0/auth0-vue";
import {computed, ref} from "vue";
import Loader from "@/components/Loader.vue";
import {TransactionType} from "@/enum";


export default {
    computed: {
        TransactionType() {
            return TransactionType
        }
    },
    components: {
        Loader,
        TransactionForm,
        TransactionList,
    },
    setup() {
        const store = useTransactionsStore();
        const auth0 = useAuth0();

        const handleRemoveTransaction = (transactionId: string) => {
            store.removeTransaction(transactionId);
        };

        const incomes = computed(() => store.incomes)
        const expenses = computed(() => store.expenses)
        const isFetching = computed(() => store.isFetching)

        const sortedIncomes = computed(() => {
            return incomes.value.slice().sort((a, b) => {
                if (a.day_of_month === 0) return 1;
                if (b.day_of_month === 0) return -1;
                return a.day_of_month - b.day_of_month;
            });
        });

        const sortedExpenses = computed(() => {
            return expenses.value.slice().sort((a, b) => {
                if (a.day_of_month === 0) return 1;
                if (b.day_of_month === 0) return -1;
                return a.day_of_month - b.day_of_month;
            });
        });

        return {
            user: auth0.user,
            incomes: sortedIncomes,
            expenses: sortedExpenses,
            isFetching: isFetching,
            handleRemoveTransaction
        }
    }
};
</script>
