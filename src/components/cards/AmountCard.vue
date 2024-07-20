<script setup lang="ts">
import {TransactionType} from "@/enum";

defineProps({
    label: {
        type: String,
        required: true
    },
    amount: {
        type: String,
        required: true
    },
    currency: {
        type: String,
        default: "euro"
    },
})

</script>

<template>
  <div class="card w-full sm:w-1/2 md:w-1/3 lg:w-full text-primary mb-4 sm:mb-0">
    <div class="card-body text-center p-1 lg:p-2">
      <p class="text-sm lg:text-xl font-light tracking-wider">{{ label }}</p>
      <p class="text-sm lg:text-3xl font-bold tracking-wider" :class="Number(amount) > 0 ? 'text-green-500': 'text-red-500'">{{ amount }} €</p>
    </div>
  </div>

</template>