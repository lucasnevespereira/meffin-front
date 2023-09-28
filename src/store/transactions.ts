import {defineStore} from "pinia";
import {
    fetchUserTransactions,
    createTransaction,
    updateTransaction,
    deleteTransaction
} from "../services/transactionService";
import {TransactionType} from "@/enum";


export const useTransactionsStore = defineStore({
    id: 'transactions',

    state: () => ({
        incomes: [] as Transaction[],
        expenses: [] as Transaction[],
        isFetching: false,
        error: null as string | null,
    }),

    actions: {
        async addTransaction(transaction: CreateTransaction) {
            this.isFetching = true
            console.log("adding transaction")
            try {
                const response = await createTransaction(transaction);
                if (response && response.data) {
                    if (transaction.type === TransactionType.INCOME) {
                        this.incomes.push(response.data);
                    } else if (transaction.type === TransactionType.EXPENSE) {
                        this.expenses.push(response.data);
                    }
                }
            } catch (error) {
                this.error = "Failed to add transaction.";
                console.error(error);
            } finally {
                this.isFetching = false
            }
        },
        async updateTransaction(updatedTransaction: Transaction) {
            this.isFetching = true;

            try {
                const response = await updateTransaction(updatedTransaction);
                if (response && response.data) {
                    if (updatedTransaction.type === TransactionType.INCOME) {
                        const index = this.incomes.findIndex(t => t.id === updatedTransaction.id);
                        if (index !== -1) {
                            this.incomes[index] = response.data;
                        }
                    } else if (updatedTransaction.type === TransactionType.EXPENSE) {
                        const index = this.expenses.findIndex(t => t.id === updatedTransaction.id);
                        if (index !== -1) {
                            this.expenses[index] = response.data;
                        }
                    }
                }
            } catch (error) {
                this.error = "Failed to update transaction.";
                console.error(error);
            } finally {
                this.isFetching = false;
            }
        },
        async removeTransaction(transactionId: string) {
            this.isFetching = true
            try {
                console.log("deleting transactions")
                await deleteTransaction(transactionId);

                // Remove the transaction from the state
                this.incomes = this.incomes.filter(t => t.id !== transactionId);
                this.expenses = this.expenses.filter(t => t.id !== transactionId);
            } catch (error) {
                this.error = "Failed to remove transaction.";
                console.error(this.error);
            } finally {
                this.isFetching = false
            }
        },
        async fetchTransactions(userId: string) {
            this.isFetching = true;
            this.error = null;
            console.log("fetching transactions")

            try {
                const response = await fetchUserTransactions(userId);
                if (response && response.data) {
                    this.incomes = response.data.incomes;
                    this.expenses = response.data.expenses;
                }
            } catch (error) {
                this.error = "Failed to fetch transactions.";
                console.error(this.error);
            } finally {
                this.isFetching = false;
            }
        },
    },
});
