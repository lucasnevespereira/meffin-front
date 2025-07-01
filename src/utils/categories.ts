import { computed, ref } from 'vue';
import { TransactionType } from "@/enum";

export const defaultCategory = 'Aucune';
export const otherCategory = 'Autres';

export const defaultCategories = ref<Category[]>([
    { id: "1", name: 'Maison', color: '#FF6633', type: TransactionType.EXPENSE },
    { id: "2", name: 'Transports', color: '#6699FF', type: TransactionType.EXPENSE },
    { id: "3", name: 'Banque', color: '#FF33FF', type: TransactionType.EXPENSE },
    { id: "4", name: 'Abonnements', color: '#99E6E6', type: TransactionType.EXPENSE },
    { id: "5", name: 'Sorties', color: '#FFB399', type: TransactionType.EXPENSE },
    { id: "6", name: 'Divers', color: '#FF9933', type: TransactionType.EXPENSE },
    { id: "7", name: 'Travail', color: '#FF6633', type: TransactionType.INCOME },
    { id: "8", name: 'Investissement', color: '#FF4D4D', type: TransactionType.INCOME },
]);
export const defaultExpenseCategories = defaultCategories.value.filter(category => category.type === TransactionType.EXPENSE);
export const defaultIncomeCategories = defaultCategories.value.filter(category => category.type === TransactionType.INCOME);


export const expenseCategories = ref([
    'Maison',
    'Transports',
    'Banque',
    'Assurance',
    'Abonnements',
    'Sorties',
    'Divers',
    'Autres'
]);

export const incomeCategories = ref([
    'Travail',
    'Cadeau',
    'Freelance',
    'Investissement',
    'Autres'
]);

export function useCategories(type: String) {
    return computed(() => (type === TransactionType.EXPENSE ? expenseCategories.value : incomeCategories.value))
}

export function getCategoryColor(categoryName: string) {
    const category = defaultCategories.value.find(category => category.name === categoryName);
    return category ? category.color : '#000';
}

export const groupTransactionsByCategory = (transactions: Transaction[]): GroupedTransaction[] => {
    const groupedTransactions: { [key: string]: GroupedTransaction } = {};

    // Group transactions by category
    for (const item of transactions) {
        // Determine the category
        let categoryName = item.category;
        if ([defaultCategory, '', otherCategory].includes(categoryName)) {
            categoryName = otherCategory;
        }

        // Initialize category in dictionary if not already present
        if (!groupedTransactions[categoryName]) {
            groupedTransactions[categoryName] = { transactions: [], total: 0, label: categoryName };
        }

        // Add the transaction to the appropriate category
        groupedTransactions[categoryName].transactions.push(item);

        // Update the total amount for the category
        groupedTransactions[categoryName].total += item.amount;
    }

    // Sort groupedTransactions by total amount
    return Object.values(groupedTransactions).sort((a, b) => b.total - a.total);
}