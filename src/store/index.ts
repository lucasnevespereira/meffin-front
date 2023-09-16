import {defineStore} from "pinia";

interface Transaction {
    amount: number;
    description: string;
    is_fixed: boolean;
    day_of_month: number;
    endDate: string;
}

export const useTransactionsStore = defineStore({
    id: 'transactions',

    state: () => ({
        incomes: [] as Transaction[],
        expenses: [] as Transaction[],
    }),

    actions: {
        addIncome(income: Transaction) {
            this.incomes.push(income);
        },

        addExpense(expense: Transaction) {
            this.expenses.push(expense);
        },

        removeIncome(index: number) {
            this.incomes.splice(index, 1);
        },

        removeExpense(index: number) {
            this.expenses.splice(index, 1);
        },

        // You can also add actions to fetch data from an API, etc.
    },
});