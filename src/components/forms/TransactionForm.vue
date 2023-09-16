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
                <div v-if="newItem.is_fixed">
                    <label for="dayOfMonth" class="block text-sm font-medium text-gray-700">Tous les (jour du
                        mois):</label>
                    <select id="dayOfMonth" v-model="newItem.day_of_month" class="mt-1 select select-bordered w-full">
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
                               class="mt-2 checkbox checkbox-info" @change="handleOnlyThisMonthChange"/>
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
import {ref, defineProps, defineEmits, computed} from 'vue';

interface Props {
    modelValue: {
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
    'Salaire',
    'Cadeau',
    'Freelance',
    'Investissement',
    'Autre'
]);

const newCustomCategory = ref('');

const categories = computed(() => {
    return type === 'expense' ? expenseCategories.value : incomeCategories.value;
});

const {modelValue, type} = defineProps<Props>();
const emit = defineEmits();

const handleOnlyThisMonthChange = () => {
    if (onlyThisMonth.value) {
        const today = new Date();
        const lastDayOfThisMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0);
        newItem.value.endDate = lastDayOfThisMonth.toISOString().split('T')[0];
    } else {
        newItem.value.endDate = ''; // reset the end date if unchecked
    }
};

const adding = ref(false);
const newItem = ref({amount: 0, description: '', is_fixed: false, day_of_month: '', endDate: '', category: 'Aucune'});

const startAdd = () => {
    adding.value = true;
};

const addItem = () => {
    if (newItem.value.category === 'Autre' && newCustomCategory.value) {
        newItem.value.category = newCustomCategory.value;
    } else if (newItem.value.category === 'Autre' && !newCustomCategory.value) {
        newItem.value.category = 'Aucune';
    }
    modelValue.push({...newItem.value});
    emit('update:modelValue', modelValue);
    adding.value = false;
    newItem.value = {amount: 0, description: '', is_fixed: false, day_of_month: '', endDate: '', category: 'Aucune'}; // reset with default category
    newCustomCategory.value = ''; // reset the custom category field
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
