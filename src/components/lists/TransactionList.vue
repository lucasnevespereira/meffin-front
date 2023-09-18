<template>
    <div>
        <ul class="divide-y divide-gray-200">
            <li v-for="(item, index) in items" :key="index" class="flex justify-between items-center py-4">
                <div class="flex-1">
                    <span class="font-medium text-gray-700">{{ item.description }}</span>
                    <span :class="itemColor" class="ml-4">{{ item.amount }} €</span>
                </div>
                <div>
                    <span v-if="item.is_fixed" class="mr-4">Tous les {{ item.day_of_month }} du mois</span>
                    <span v-else-if="isLastDayOfThisMonth(item.endDate)" class="mr-4">Seulement ce mois</span>
                    <span v-else class="mr-4">Jusqu'au {{ formatDate(item.endDate) }}</span>
                    <span v-if="item.is_fixed"
                          class="bg-blue-200 text-blue-700 py-1 px-3 rounded-full text-xs uppercase">Fixe</span>
                </div>
                <button @click="emit('removeItem', item.id)" class="btn btn-xs btn-error ml-4">X</button>
            </li>
        </ul>
    </div>
</template>

<script setup lang="ts">
import {defineProps, defineEmits, computed} from 'vue';
import {formatDate, isLastDayOfThisMonth} from "../../utils/date";

interface Props {
    items: {
        id: string,
        amount: number,
        description: string,
        is_fixed: boolean,
        endDate: string,
        day_of_month?: number
    }[];
    type: "income" | "expense";
}

const {items, type} = defineProps<Props>();
const emit = defineEmits(['removeItem']);

const itemColor = computed(() => {
    return type === "income" ? "text-green-500" : "text-red-500";
});


</script>