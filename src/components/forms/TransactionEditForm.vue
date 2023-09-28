<template>
    <div>
        <div class="mt-2">
            <div>
                <label for="editDescription" class="block text-sm font-medium text-gray-700">Description:</label>
                <input id="editDescription" v-model="editedTransaction.description"
                       class="mt-1 input input-bordered w-full"/>
            </div>
            <div>
                <label for="editAmount" class="block text-sm font-medium text-gray-700">Montant:</label>
                <input id="editAmount" v-model="editedTransaction.amount" type="number"
                       class="mt-1 input input-bordered w-full"/>
            </div>

            <!-- Fixed Entry Checkbox & Day of Month or Stop Date -->
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                <div v-if="editedTransaction.is_fixed || onlyThisMonth">
                    <label for="editDayOfMonth" class="block text-sm font-medium text-gray-700"> Jour du mois:</label>
                    <select id="editDayOfMonth" v-model.number="editedTransaction.day_of_month"
                            class="mt-1 select select-bordered w-full">
                        <option disabled="disabled" selected="selected" value="">Sélectionnez un jour</option>
                        <option v-for="day in 31" :key="day" :value="day">{{ day }}</option>
                    </select>
                </div>

                <div v-else>
                    <div v-if="!onlyThisMonth">
                        <label for="editEndDate" class="block text-sm font-medium text-gray-700">Date d'arrêt:</label>
                        <input id="editEndDate" type="date" v-model="editedTransaction.endDate"
                               class="mt-1 input input-bordered w-full"/>
                    </div>
                </div>

                <div class="flex">
                    <div v-if="!onlyThisMonth" class="mr-4">
                        <label for="editIsFixed" class="block text-sm font-medium text-gray-700">{{
                            fixedLabel
                            }}:</label>
                        <input id="editIsFixed" type="checkbox" v-model="editedTransaction.is_fixed"
                               class="mt-2 checkbox checkbox-primary"/>
                    </div>

                    <div>
                        <label for="editOnlyThisMonth" class="block text-sm font-medium text-gray-700">Seulement ce
                            mois-ci:</label>
                        <input id="editOnlyThisMonth" type="checkbox" v-model="onlyThisMonth"
                               class="mt-2 checkbox checkbox-primary" @change="handleOnlyThisMonthChange"/>
                    </div>
                </div>
            </div>

            <!-- Category Selection & Custom Addition -->
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                <div>
                    <label for="editCategory" class="block text-sm font-medium text-gray-700">Catégorie:</label>
                    <select id="editCategory" v-model="editedTransaction.category"
                            class="mt-1 select select-bordered w-full">
                        <option :value="defaultCategory" :selected="editedTransaction.category === defaultCategory">
                            {{ defaultCategory }}
                        </option>
                        <option v-for="category in categoriesOptions" :key="category" :value="category">{{
                            category
                            }}
                        </option>
                    </select>
                </div>

                <div v-if="editedTransaction.category === 'Autre'">
                    <label for="editCustomCategory" class="block text-sm font-medium text-gray-700">Catégorie
                        Personnalisée:</label>
                    <input id="editCustomCategory" v-model="editedCustomCategory"
                           placeholder="Enter catégorie personnalisée" class="mt-1 input input-bordered w-full"/>
                </div>
            </div>

            <div class="flex space-x-4 mt-4">
                <button @click="saveEdit" class="btn btn-primary">Sauvegarder</button>
                <button @click="emit('cancelEdit')" class="btn btn-error btn-outline ml-2">Annuler</button>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import {ref, computed} from 'vue';
import {getLastDayOfThisMonth} from "@/utils/date";
import {useCategories} from '@/utils/categories';
import {TransactionType} from '@/enum'

interface Props {
    editedTransaction: Transaction | null;
}

const {editedTransaction} = defineProps<Props>();
const emit = defineEmits(['updateTransaction', 'cancelEdit']);

const {categories, defaultCategory, otherCategory} = useCategories(editedTransaction?.type as string);

const onlyThisMonth = ref(false);
const editedCustomCategory = ref('');


const categoriesOptions = computed(() => {
    if (!editedTransaction) return [];

    const selectedCategories = categories.value

    if (!selectedCategories) return [];

    if (!selectedCategories.includes(editedTransaction.category) && editedTransaction.category !== defaultCategory) {
        selectedCategories.push(editedTransaction.category);
    }

    return selectedCategories;
});

const fixedLabel = computed(() => {
    return editedTransaction?.type === TransactionType.INCOME ? "Entrée fixe" : "Dépense fixe";
});

const handleOnlyThisMonthChange = () => {
    if (editedTransaction) {
        if (onlyThisMonth.value) {
            const lastDayOfThisMonth = getLastDayOfThisMonth();
            editedTransaction.endDate = lastDayOfThisMonth.toISOString().split('T')[0];
        } else {
            editedTransaction.endDate = ''; // reset the end date if unchecked
        }
    }
};

const saveEdit = () => {
    if (editedTransaction) {
        if (editedTransaction.category === otherCategory && editedCustomCategory.value) {
            editedTransaction.category = editedCustomCategory.value;
        } else if (editedTransaction.category === otherCategory && !editedCustomCategory.value) {
            editedTransaction.category = defaultCategory; // Change to default category if custom category is empty
        }
        emit('updateTransaction', editedTransaction);
    }
}
</script>
