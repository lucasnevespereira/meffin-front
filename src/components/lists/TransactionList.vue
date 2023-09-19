<template>
    <div>
        <ul class="divide-y divide-gray-200">
            <li v-for="(item, index) in items" :key="index" class="flex justify-between items-center py-4">
                <div class="flex-1">
                    <span class="text-sm md:text-base font-bold text-gray-700">{{ item.description }}</span>
                    <span :class="itemColor" class="ml-4 text-sm md:text-base">{{ item.amount }} €</span>
                </div>
                <div class="text-sm md:text-base">
                    <span v-if="item.is_fixed && item.day_of_month > 0" class="mr-4 hidden sm:inline text-blue-600">Tous les <b>{{
                        item.day_of_month
                        }}</b></span>
                    <span v-else-if="item.day_of_month > 0"
                          class="hidden sm:inline text-yellow-600">Le <b>{{ item.day_of_month }} ce mois</b></span>
                    <span v-else-if="!item.is_fixed && item.endDate.length > 0"
                          class="mr-4 hidden sm:inline text-yellow-600">Jusqu'au {{ formatDate(item.endDate) }}</span>
                    <span v-if="item.is_fixed"
                          class="bg-blue-200 text-blue-700 py-1 px-3 rounded-full text-xs uppercase">Fixe</span>
                </div>
                <button @click="emit('removeItem', item.id)" class="btn btn-xs bg-accent ml-4">x</button>
            </li>
        </ul>
    </div>
</template>


<script setup lang="ts">
import {defineProps, defineEmits, computed} from 'vue';
import {formatDate} from "@/utils/date";

interface Props {
    items: {
        id: string,
        amount: number,
        description: string,
        is_fixed: boolean,
        endDate: string,
        day_of_month: number
    }[];
    type: "income" | "expense";
}

const {items, type} = defineProps<Props>();
const emit = defineEmits(['removeItem']);

const itemColor = computed(() => {
    return type === "income" ? "text-green-500" : "text-red-500";
});


</script>