<template>
    <div class="bg-indigo-600 text-white p-4 sm:p-6 rounded-lg shadow-md flex justify-between items-center">
        <h2 class="text-lg sm:text-xl font-semibold">Solde du mois</h2>
        <p class="text-xl lg:text-3xl">
            {{ formatAmount(solde) }}
        </p>
    </div>
</template>

<script setup>
import { useCurrency } from "@/composables/use-currency";

const { formatAmount } = useCurrency();

defineProps({
    solde: String
});
</script>