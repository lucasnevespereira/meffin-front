<script setup lang="ts">

import {defineProps, ref} from 'vue';
import {FontAwesomeIcon} from "@fortawesome/vue-fontawesome";

defineProps({
  label: {
    type: String,
    required: true
  },
  amount: {
    type: Number,
    required: true
  },
  transactions: {
    type: Array as () => Transaction[],
    default: () => []
  },
  currency: {
    type: String,
    default: "euro"
  },
})

const showDetails = ref(false);

const toggleDetails = () => {
  showDetails.value = !showDetails.value;
};

</script>

<template>
  <div class="card shadow p-8 lg:p-5 flex flex-col items-start">
    <div @click="toggleDetails" class="flex flex-row items-center justify-between w-full cursor-pointer">
      <p class="text-md lg:text-xl font-light">{{ label }}</p>
      <div class="flex ">
        <span class="text-md lg:text-2xl font-bold text-primary">{{ amount }} €</span>
      </div>

    </div>
    <div v-if="showDetails" class="mt-4 w-full">
      <ul>
        <li class="text-sm text-secondary-200" v-for="transaction in transactions" :key="transaction.id">
          {{ transaction.description }} - {{ transaction.amount }} €
        </li>
      </ul>
    </div>
  </div>
</template>

<style scoped>

</style>