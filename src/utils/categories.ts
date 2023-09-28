import {computed, ref} from 'vue';
import {TransactionType} from "@/enum";

export const defaultCategory = 'Aucune';

export const otherCategory = 'Autres';

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