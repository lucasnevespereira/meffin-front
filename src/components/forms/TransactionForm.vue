<template>
    <div>
        <div v-if="adding" class="space-y-4">
            <!-- Description & Amount Field -->
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                    <label for="description" class="block text-sm font-medium text-gray-700">Description:</label>
                    <input id="description" v-model="newItem.description" placeholder="Description"
                           class="mt-1 input input-bordered w-full"/>
                </div>

                <div>
                    <label for="amount" class="block text-sm font-medium text-gray-700">Montant:</label>
                    <input id="amount" v-model="newItem.amount" placeholder="Montant" type="number"
                           class="mt-1 input input-bordered w-full"/>
                </div>
            </div>

            <!-- Fixed Entry Checkbox & Day of Month or Stop Date -->
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                <div v-if="newItem.is_fixed || onlyThisMonth">
                    <label for="dayOfMonth" class="block text-sm font-medium text-gray-700"> Jour du
                        mois:</label>
                    <select id="dayOfMonth" v-model.number="newItem.day_of_month"
                            class="mt-1 select select-bordered w-full">
                        <option disabled="disabled" selected="selected" value="">Sélectionnez un jour</option>
                        <option v-for="day in 31" :key="day" :value="day">{{ day }}</option>
                    </select>
                </div>

                <div v-else>
                    <div v-if="!onlyThisMonth">
                        <label for="stopDate" class="block text-sm font-medium text-gray-700">Date d'arrêt:</label>
                        <input id="stopDate" type="date" v-model="newItem.endDate"
                               class="mt-1 input input-bordered w-full"/>
                    </div>
                </div>

                <div class="flex">
                    <div v-if="!onlyThisMonth" class="mr-4">
                        <label for="isFixed" class="block text-sm font-medium text-gray-700">{{ fixedLabel }}:</label>
                        <input id="isFixed" type="checkbox" v-model="newItem.is_fixed"
                               class="mt-2 checkbox checkbox-primary"/>
                    </div>

                    <div>
                        <label for="onlyThisMonth" class="block text-sm font-medium text-gray-700">Seulement ce
                            mois-ci:</label>
                        <input id="onlyThisMonth" type="checkbox" v-model="onlyThisMonth"
                               class="mt-2 checkbox checkbox-primary" @change="handleOnlyThisMonthChange"/>
                    </div>
                </div>


            </div>

            <!-- Category Selection & Custom Addition -->
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                <div>
                    <label for="category" class="block text-sm font-medium text-gray-700">Catégorie:</label>
                    <select id="category" v-model="newItem.category" class="mt-1 select select-bordered w-full">
                        <option value="Aucune" selected>Aucune</option>
                        <option v-for="category in categories" :key="category" :value="category">{{ category }}</option>
                    </select>
                </div>

                <div v-if="newItem.category === 'Autre'">
                    <label for="customCategory" class="block text-sm font-medium text-gray-700">Catégorie
                        Personnalisée:</label>
                    <input id="customCategory" v-model="newCustomCategory" placeholder="Enter catégorie personnalisée"
                           class="mt-1 input input-bordered w-full"/>
                </div>
            </div>

            <!-- Buttons -->
            <div class="flex space-x-4 mt-4">
                <button @click="addItem" class="btn btn-primary">Valider</button>
                <button @click="cancelAdd" class="btn btn-error btn-outline">Annuler</button>
            </div>
        </div>

        <button v-else @click="startAdd" class="btn btn-primary">{{ addButtonLabel }}</button>
    </div>
</template>


<script setup lang="ts">
import {ref, defineProps, computed} from 'vue';
import {getLastDayOfThisMonth} from "@/utils/date";
import {useTransactionsStore} from "@/store/transactions";
import {useAuth0} from "@auth0/auth0-vue";

const store = useTransactionsStore();
const auth0 = useAuth0();

interface Props {
    modelValue: {
        type: string,
        amount: number,
        description: string,
        is_fixed: boolean,
        day_of_month?: number | string,
        endDate?: string,
        category?: string
    }[];
    type: "income" | "expense";
}

const onlyThisMonth = ref(false);

const expenseCategories = ref([
    'Maison',
    'Transports',
    'Banque',
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

const newCustomCategory = ref('');

const categories = computed(() => {
    return type === 'expense' ? expenseCategories.value : incomeCategories.value;
});

const {type} = defineProps<Props>();

const handleOnlyThisMonthChange = () => {
    if (onlyThisMonth.value) {
        const lastDayOfThisMonth = getLastDayOfThisMonth();
        newItem.value.endDate = lastDayOfThisMonth.toISOString().split('T')[0];
    } else {
        newItem.value.endDate = ''; // reset the end date if unchecked
    }
};

const adding = ref(false);
const newItem = ref({
    type: type,
    amount: 0,
    description: '',
    is_fixed: false,
    day_of_month: 0,
    endDate: '',
    category: 'Aucune'
});

const startAdd = () => {
    adding.value = true;
};

const resetNewItem = () => {
    newItem.value = {
        type: type,
        amount: 0,
        description: '',
        is_fixed: false,
        day_of_month: 0,
        endDate: '',
        category: 'Aucune'
    };
    newCustomCategory.value = '';
}

const addItem = () => {
    if (newItem.value.category === 'Autre' && newCustomCategory.value) {
        newItem.value.category = newCustomCategory.value;
    } else if (newItem.value.category === 'Autre' && !newCustomCategory.value) {
        newItem.value.category = 'Aucune';
    }

    const userId = auth0.user.value?.sub as string;
    const newTransaction: CreateTransaction = {
        userId,
        type: newItem.value.type,
        amount: newItem.value.amount,
        description: newItem.value.description,
        is_fixed: newItem.value.is_fixed,
        day_of_month: newItem.value.day_of_month,
        endDate: newItem.value.endDate,
    }
    console.log("new transaction", newTransaction)
    store.addTransaction(newTransaction);
    adding.value = false;
    resetNewItem();
};


const cancelAdd = () => {
    adding.value = false;
};

const fixedLabel = computed(() => {
    return type === "income" ? "Entrée fixe" : "Dépense fixe";
});

const addButtonLabel = computed(() => {
    return type === "income" ? "Ajouter une entrée" : "Ajouter une dépense";
});
</script>
