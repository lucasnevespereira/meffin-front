import {ref, computed} from 'vue';
import {TransactionType} from "@/enum";

const defaultCategory = 'Aucune';

const otherCategory = 'Autre';

const expenseCategories = ref([
    'Maison',
    'Transports',
    'Banque',
    'Assurance',
    'Abonnements',
    'Sorties',
    'Divers',
    'Autre'
]);

const incomeCategories = ref([
    'Travail',
    'Cadeau',
    'Freelance',
    'Investissement',
    'Autre'
]);

export function useCategories(type: String) {
    const categories = computed(() => (type === TransactionType.EXPENSE ? expenseCategories.value : incomeCategories.value));

    return {
        otherCategory,
        defaultCategory,
        categories,
        expenseCategories,
        incomeCategories,
    };
}