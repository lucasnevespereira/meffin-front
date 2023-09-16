<template>
    <div>
        <div v-if="adding" class="space-y-4">
            <!-- Description & Amount Field -->
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                    <label for="description" class="block text-sm font-medium text-gray-700">Description:</label>
                    <input id="description" v-model="newItem.description" placeholder="Description" class="mt-1 input input-bordered w-full" />
                </div>

                <div>
                    <label for="amount" class="block text-sm font-medium text-gray-700">Montant:</label>
                    <input id="amount" v-model="newItem.amount" placeholder="Montant" type="number" class="mt-1 input input-bordered w-full" />
                </div>
            </div>

            <!-- Fixed Entry Checkbox & Day of Month or Stop Date -->
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                <div v-if="newItem.is_fixed">
                    <label for="dayOfMonth" class="block text-sm font-medium text-gray-700">Tous les (jour du mois):</label>
                    <select id="dayOfMonth" v-model="newItem.day_of_month" class="mt-1 select select-bordered w-full">
                        <option disabled="disabled" selected="selected" value="">Sélectionnez un jour</option>
                        <option v-for="day in 31" :key="day" :value="day">{{ day }}</option>
                    </select>
                </div>

                <div v-else>
                    <label for="stopDate" class="block text-sm font-medium text-gray-700">Date d'arrêt:</label>
                    <input id="stopDate" type="date" v-model="newItem.endDate" class="mt-1 input input-bordered w-full" />
                </div>

                <div>
                    <label for="isFixed" class="block text-sm font-medium text-gray-700">{{ fixedLabel }}:</label>
                    <input id="isFixed" type="checkbox" v-model="newItem.is_fixed" class="mt-2 checkbox checkbox-primary" />
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
import { ref, defineProps, defineEmits, computed } from 'vue';

interface Props {
    modelValue: { amount: number, description: string, is_fixed: boolean, day_of_month?: number | string, endDate?: string }[];
    type: "income" | "expense";
}

const { modelValue, type } = defineProps<Props>();
const emit = defineEmits();

const adding = ref(false);
const newItem = ref({ amount: 0, description: '', is_fixed: false, day_of_month: '', endDate: '' });

const startAdd = () => {
    adding.value = true;
};

const addItem = () => {
    console.log(newItem.value)
    modelValue.push({ ...newItem.value });
    emit('update:modelValue', modelValue);
    adding.value = false;
    newItem.value = { amount: 0, description: '', is_fixed: false, day_of_month: '', endDate: '' };
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
