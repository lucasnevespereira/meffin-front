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

            <!-- TODO: add additional fields -->

            <div class="mt-4">
                <button @click="saveEdit" class="btn btn-primary">Sauvegarder</button>
                <button @click="emit('cancelEdit')" class="btn btn-error btn-outline ml-2">Annuler</button>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import {defineProps, defineEmits} from 'vue';

interface Props {
    editedTransaction: Transaction | null;
}

const {editedTransaction} = defineProps<Props>();
const emit = defineEmits(['updateTransaction', 'cancelEdit']);

const saveEdit = () => {
    if (editedTransaction) {
        emit('updateTransaction', editedTransaction)
    }
}

</script>
