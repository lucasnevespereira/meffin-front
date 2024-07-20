
<script lang="ts">
import TransactionList from "@/components/lists/TransactionList.vue";
import TransactionForm from "@/components/forms/TransactionForm.vue";

import {useTransactionsStore} from '@/store/transactions';
import {useAuth0} from "@auth0/auth0-vue";
import {computed, ref, watch} from "vue";
import Loader from "@/components/Loader.vue";
import {TransactionType} from "@/enum";
import {FontAwesomeIcon} from "@fortawesome/vue-fontawesome";


export default {
    computed: {
        TransactionType() {
            return TransactionType
        }
    },
    components: {
        FontAwesomeIcon,
        Loader,
        TransactionForm,
        TransactionList,
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
            handleRemoveTransaction,
            currentMonth
        }
    }
};
</script>

<template>
    <div class="container mx-auto space-y-8 sm:p-0 p-4 lg:p-10 sm:mx-auto">
        <div class="flex justify-between items-center text-primary">
            <h2 class="text-3xl p-5 text-primary font-bold">Transactions</h2>
            <div class="flex items-center">
              <font-awesome-icon icon="calendar-days" class="mr-2 mb-1 text-lg"/>
              <p class="text-sm lg:text-lg  text-center">{{ currentMonth }}</p>
            </div>
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

