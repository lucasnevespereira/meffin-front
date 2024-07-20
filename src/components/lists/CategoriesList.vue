<script setup lang="ts">
import CategoryCard from "@/components/cards/CategoryCard.vue";
import {computed, ref} from "vue";
import {defaultCategory, otherCategory} from "@/utils/categories";

const props = defineProps({
  expenses: {
    type: Array as () => Transaction[],
    required: true,
  }
});

// Initialize a dictionary to group expenses by category
const groupedExpenses = ref<{ [key: string]: { label: string, transactions: Transaction[], total: number } }>({});


// Group transactions by category
for (const item of props.expenses) {
  // Determine the category
  let category = item.category || otherCategory;
  if ([defaultCategory, '', otherCategory].includes(category)) {
    category = otherCategory;
  }

  // Initialize category in dictionary if not already present
  if (!groupedExpenses.value[category]) {
    groupedExpenses.value[category] = { transactions: [], total: 0, label: category };
  }

  // Add the transaction to the appropriate category
  groupedExpenses.value[category].transactions.push(item);

  // Update the total amount for the category
  groupedExpenses.value[category].total += item.amount;
}

// sort groupedExpenses by total amount
const sorted = Object.values(groupedExpenses.value).sort((a, b) => b.total - a.total);


</script>

<template>
  <div class="p-1 lg:p-5 scroll-container w-full">
    <div class="w-full" v-for="(expense, index) in sorted" :key="index">
      <CategoryCard :label="expense.label" :amount="expense.total" :transactions="expense.transactions"/>
    </div>
  </div>
</template>

<style scoped>
.scroll-container {
  max-height: 500px;
  overflow-y: auto;
}
</style>