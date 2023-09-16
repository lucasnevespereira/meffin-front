<template>
    <div>
        <div v-if="adding" class="space-y-4">
            <div class="flex space-x-4">
                <input v-model="newItem.amount" placeholder="Montant" type="number" class="input input-bordered w-1/2" />
                <input v-model="newItem.description" placeholder="Description" class="input input-bordered w-1/2" />
            </div>
            <div class="flex space-x-4">
                <input type="date" v-model="newItem.date" placeholder="Date" class="input input-bordered w-1/2" />
                <label class="cursor-pointer inline-flex items-center">
                    <input type="checkbox" v-model="newItem.is_fixed" class="checkbox checkbox-primary" />
                    <span class="ml-2">{{ fixedLabel }}</span>
                </label>
            </div>
            <div class="flex space-x-4">
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
    modelValue: { amount: number, description: string, is_fixed: boolean, date: string }[];
    type: "income" | "expense";
}

const { modelValue, type } = defineProps<Props>();
const emit = defineEmits();

const adding = ref(false);
const newItem = ref({ amount: 0, description: '', is_fixed: false, date: '' });

const startAdd = () => {
    adding.value = true;
};

const addItem = () => {
    modelValue.push({ ...newItem.value });
    emit('update:modelValue', modelValue);
    adding.value = false;
    newItem.value = { amount: 0, description: '', is_fixed: false, date: '' };
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
