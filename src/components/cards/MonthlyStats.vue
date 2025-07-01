<script setup lang="ts">
import { useCurrency } from "@/composables/use-currency";

const { formatAmount, getCurrencySymbol } = useCurrency();

defineProps({
  savedAmount: {
    type: String,
    required: true
  },
  income: {
    type: String,
    required: true
  },
  expenses: {
    type: String,
    required: true
  }
})
</script>

<template>
  <div class="monthly-stats p-1">
    <div class="stats shadow">
      <div class="stat">
        <div class="stat-title text-sm lg:text-xl">Solde</div>
        <div class="stat-value flex items-center text-xl lg:text-3xl" :class="Number(savedAmount) > 0 ? 'text-green-700': 'text-red-700'">
          {{ formatAmount(savedAmount) }}
        </div>
      </div>
    </div>
    <div class="stats shadow hidden md:block">
      <div class="stat">
        <div class="stat-title">Entrées</div>
        <div class="stat-value text-green-700 flex items-center text-xl lg:text-3xl">+ {{ formatAmount(income) }}</div>
      </div>
    </div>
    <div class="stats shadow hidden md:block">
      <div class="stat">
        <div class="stat-title">Sorties</div>
        <div class="stat-value text-red-700 flex items-center text-xl lg:text-3xl">- {{ formatAmount(expenses) }}</div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.monthly-stats {
  display: grid;
  grid-template-columns: 2fr 1fr 1fr;
  grid-gap: .5rem;

  @media screen and (max-width: 768px) {
    grid-template-columns: auto;
  }
}
</style>


