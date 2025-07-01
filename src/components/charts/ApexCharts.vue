<script lang="ts" setup>
import { groupTransactionsByCategory } from "@/utils/categories";
import { ref } from "vue";

const props = defineProps<{
  expenses: Transaction[];
}>();

const grouped = ref(groupTransactionsByCategory(props.expenses));
</script>
<template>
  <div>{{ grouped }}</div>
</template>
