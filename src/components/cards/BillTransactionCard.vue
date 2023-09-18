<template>
    <div class="bg-gray-50 p-4 rounded mt-4">
        <h2 class="text-xl font-semibold mb-2">{{ title }}</h2>
        <ul class="pl-4 space-y-2">
            <li v-for="(item, index) in items" :key="index" class="flex justify-between items-center">
                <span>{{ item.description }}</span>
                <div class="flex items-center space-x-2">
                    <span v-if="item.is_fixed" class="text-sm bg-blue-100 text-blue-600 px-2 py-1 rounded">Le {{ item.day_of_month }}</span>
                    <span v-else-if="isLastDayOfThisMonth(item.endDate)" class="text-sm bg-yellow-100 text-yellow-600 px-2 py-1 rounded">Seulement ce mois</span>
                    <span v-else class="text-sm bg-yellow-100 text-yellow-600 px-2 py-1 rounded">Jusqu'au {{formatDate(item.endDate)}}</span>

                    <span :class="amountColor" class="font-semibold">{{ item.amount }}€</span>
                </div>
            </li>
        </ul>
    </div>
</template>

<script setup>
import { computed, defineProps } from 'vue';
import { formatDate, isLastDayOfThisMonth } from "@/utils/date";

const props = defineProps({
    title: String,
    items: Array,
    isIncome: Boolean
});

const amountColor = computed(() => {
    return props.isIncome ? 'text-green-500' : 'text-red-500';
});

</script>
