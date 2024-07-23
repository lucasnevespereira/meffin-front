import { computed, ref } from 'vue';
import { TransactionType } from "@/enum";

export const defaultCategory = 'Aucune';
export const otherCategory = 'Autres';

export const defaultCategories = ref<Category[]>([
    { name: 'Maison', color: '#FF6633', type: TransactionType.EXPENSE },
    { name: 'Transports', color: '#6699FF', type: TransactionType.EXPENSE },
    { name: 'Banque', color: '#FF33FF', type: TransactionType.EXPENSE },
    { name: 'Abonnements', color: '#99E6E6', type: TransactionType.EXPENSE },
    { name: 'Sorties', color: '#FFB399', type: TransactionType.EXPENSE },
    { name: 'Divers', color: '#FF9933', type: TransactionType.EXPENSE },
    { name: 'Travail', color: '#FF6633', type: TransactionType.INCOME },
    { name: 'Investissement', color: '#FF4D4D', type: TransactionType.INCOME },
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