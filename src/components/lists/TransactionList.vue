<template>
  <div>
    <ul class="divide-y divide-gray-200">
      <li v-for="(item, index) in items" :key="index" class="py-4">
        <div class="flex flex-col">
          <div class="flex justify-between items-center">
            <div class="flex-1">
              <span class="text-sm md:text-base font-bold text-gray-700">{{
                item.description
              }}</span>
              <span :class="itemColor" class="ml-4 text-sm md:text-base"
                >{{ item.amount }} €</span
              >
            </div>
            <div class="text-sm md:text-base">
              <span
                v-if="item.is_fixed && item.day_of_month > 0"
                class="mr-4 hidden sm:inline text-blue-600"
                >Tous les <b>{{ item.day_of_month }}</b></span
              >
              <span
                v-else-if="item.day_of_month > 0"
                class="hidden sm:inline text-yellow-600"
                >Le <b>{{ item.day_of_month }} ce mois</b></span
              >
              <span
                v-else-if="!item.is_fixed && item.endDate.length > 0"
                class="mr-4 hidden sm:inline text-yellow-600"
                >Jusqu'au {{ formatDate(item.endDate) }}</span
              >

              <span
                v-if="item.is_fixed"
                class="bg-blue-200 text-blue-700 py-1 px-3 rounded-full text-xs uppercase ml-1"
                >Fixe</span
              >
              <span
                v-else
                class="bg-yellow-200 text-yellow-700 py-1 px-3 rounded-full text-xs uppercase ml-1"
              >
                Temp
              </span>
            </div>
            <div class="flex items-center ml-4">
              <button @click="editTransaction(item)" class="btn btn-xs">
                <font-awesome-icon icon="pencil" />
              </button>
              <button
                @click="emit('removeItem', item.id)"
                class="btn btn-xs ml-1"
              >
                <font-awesome-icon icon="trash" />
              </button>
            </div>
          </div>
          <div v-if="editMode && editedTransactionId === item.id">
            <TransactionEditForm
              :editedTransaction="editedTransaction as Transaction"
              @updateTransaction="updateTransaction"
              @cancelEdit="cancelEdit"
            />
          </div>
        </div>
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from "vue";
import { formatDate } from "@/utils/date";
import TransactionEditForm from "@/components/forms/TransactionEditForm.vue";
import { useTransactionsStore } from "@/store/transactions";
import { TransactionType } from "@/enum";

const store = useTransactionsStore();

interface Props {
  items: Transaction[];
  type: TransactionType;
}

const { items, type } = defineProps<Props>();
const emit = defineEmits(["removeItem"]);

const itemColor = computed(() => {
  return type === TransactionType.INCOME ? "text-green-700" : "text-red-700";
});

const editMode = ref(false);
const editedTransactionId = ref<string | null>(null);
const editedTransaction = ref<Transaction | null>(null);

// trigger the edit mode and populate the form for a specific transaction
const editTransaction = (transaction: Transaction) => {
  editedTransaction.value = { ...transaction }; // Create a copy of the transaction
  editedTransactionId.value = transaction.id;
  editMode.value = true;
};

const cancelEdit = () => {
  editMode.value = false;
  editedTransaction.value = null;
  editedTransactionId.value = null;
};

const updateTransaction = () => {
  if (editedTransaction.value) {
    console.log("edited transaction is_fixed", editedTransaction);
    store.updateTransaction(editedTransaction.value);

    // After updating, exit edit mode
    editMode.value = false;
    editedTransaction.value = null;
    editedTransactionId.value = null;
  }
};
</script>
