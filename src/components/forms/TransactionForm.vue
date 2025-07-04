<template>
  <div>
    <div v-if="adding" class="space-y-4">
      <!-- Description & Amount Field -->
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label
            for="description"
            class="block text-sm font-medium text-gray-700"
            >Description:</label
          >
          <input
            id="description"
            v-model="newItem.description"
            placeholder="Description"
            class="mt-1 input input-bordered w-full"
          />
        </div>

        <div>
          <label for="amount" class="block text-sm font-medium text-gray-700"
            >Montant:</label
          >
          <input
            id="amount"
            v-model="newItem.amount"
            placeholder="Montant"
            type="number"
            class="mt-1 input input-bordered w-full"
          />
        </div>
      </div>

      <!-- Fixed Entry Checkbox & Day of Month or Stop Date -->
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
        <div v-if="newItem.is_fixed || onlyThisMonth">
          <label
            for="dayOfMonth"
            class="block text-sm font-medium text-gray-700"
          >
            Jour du mois:</label
          >
          <select
            id="dayOfMonth"
            v-model.number="newItem.day_of_month"
            class="mt-1 select select-bordered w-full"
          >
            <option disabled selected value="">Sélectionnez un jour</option>
            <option v-for="day in 31" :key="day" :value="day">{{ day }}</option>
          </select>
        </div>

        <div v-else>
          <div v-if="!onlyThisMonth">
            <label
              for="stopDate"
              class="block text-sm font-medium text-gray-700"
              >Date d'arrêt:</label
            >
            <input
              id="stopDate"
              type="date"
              v-model="newItem.endDate"
              class="mt-1 input input-bordered w-full"
            />
          </div>
        </div>

        <div class="flex">
          <div v-if="!onlyThisMonth" class="mr-4">
            <label for="isFixed" class="block text-sm font-medium text-gray-700"
              >{{ fixedLabel }}:</label
            >
            <input
              id="isFixed"
              type="checkbox"
              v-model="newItem.is_fixed"
              class="mt-2 checkbox checkbox-primary"
            />
          </div>

          <div>
            <label
              for="onlyThisMonth"
              class="block text-sm font-medium text-gray-700"
              >Seulement ce mois-ci:</label
            >
            <input
              id="onlyThisMonth"
              type="checkbox"
              v-model="onlyThisMonth"
              class="mt-2 checkbox checkbox-primary"
              @change="handleOnlyThisMonthChange"
            />
          </div>
        </div>
      </div>

      <!-- Category Selection & Custom Addition -->
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
        <div>
          <label for="category" class="block text-sm font-medium text-gray-700"
            >Catégorie:</label
          >
          <select
            id="category"
            v-model="newItem.category"
            class="mt-1 select select-bordered w-full"
          >
            <option :value="defaultCategory" selected>Aucune</option>
            <option
              v-for="category in categories"
              :key="category.name"
              :value="category.id"
            >
              {{ category.name }}
            </option>
          </select>
        </div>
      </div>

      <!-- Buttons -->
      <div class="flex space-x-4 mt-4">
        <button @click="addItem" class="btn btn-primary">Valider</button>
        <button @click="cancelAdd" class="btn btn-error btn-outline">
          Annuler
        </button>
      </div>
    </div>

    <button v-else @click="startAdd" class="btn btn-primary">
      {{ addButtonLabel }}
    </button>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from "vue";
import { getLastDayOfThisMonth } from "@/utils/date";
import { useTransactionsStore } from "@/store/transactions";
import { useAuth0 } from "@auth0/auth0-vue";
import {
  otherCategory,
  defaultCategory,
  defaultIncomeCategories,
  defaultExpenseCategories,
} from "@/utils/categories";
import { TransactionType } from "@/enum";
import { useCategoriesStore } from "@/store/categories";

const store = useTransactionsStore();
const categoriesStore = useCategoriesStore();
const auth0 = useAuth0();

interface Props {
  modelValue: {
    type: string;
    amount: number;
    description: string;
    is_fixed: boolean;
    day_of_month?: number | string;
    endDate?: string;
    category?: string;
  }[];
  type: TransactionType;
}

const { type } = defineProps<Props>();

const categorizedCategories = computed(() => {
  if (!Array.isArray(categoriesStore.categories)) {
    return {
      income: [...defaultIncomeCategories],
      expense: [...defaultExpenseCategories],
    };
  }

  return {
    income: [
      ...defaultIncomeCategories,
      ...categoriesStore.categories.filter(
        (category: Category) => category.type === TransactionType.INCOME,
      ),
    ],
    expense: [
      ...defaultExpenseCategories,
      ...categoriesStore.categories.filter(
        (category: Category) => category.type === TransactionType.EXPENSE,
      ),
    ],
  };
});

const categories = computed(() => {
  return type === TransactionType.INCOME
    ? categorizedCategories.value.income
    : categorizedCategories.value.expense;
});

const onlyThisMonth = ref(false);

const handleOnlyThisMonthChange = () => {
  if (onlyThisMonth.value) {
    const lastDayOfThisMonth = getLastDayOfThisMonth();
    newItem.value.endDate = lastDayOfThisMonth.toISOString().split("T")[0];
  } else {
    newItem.value.endDate = ""; // reset the end date if unchecked
  }
};

const adding = ref(false);
const newItem = ref({
  type: type,
  amount: 0,
  description: "",
  is_fixed: false,
  day_of_month: 0,
  endDate: "",
  category: defaultCategory,
});

const startAdd = () => {
  adding.value = true;
};

const resetNewItem = () => {
  newItem.value = {
    type: type,
    amount: 0,
    description: "",
    is_fixed: false,
    day_of_month: 0,
    endDate: "",
    category: defaultCategory,
  };
};

const addItem = () => {
  //   if (newItem.value.category === otherCategory && newCustomCategory.value) {
  //     newItem.value.category = newCustomCategory.value;
  //   } else if (
  //     newItem.value.category === otherCategory &&
  //     !newCustomCategory.value
  //   ) {
  //     newItem.value.category = defaultCategory;
  //   }

  const userId = auth0.user.value?.sub as string;
  const newTransaction: CreateTransaction = {
    userId,
    type: newItem.value.type,
    amount: newItem.value.amount,
    description: newItem.value.description,
    is_fixed: newItem.value.is_fixed,
    day_of_month: newItem.value.day_of_month,
    endDate: newItem.value.endDate,
    category: newItem.value.category,
  };
  store.addTransaction(newTransaction);
  adding.value = false;
  resetNewItem();
};

const cancelAdd = () => {
  adding.value = false;
};

const fixedLabel = computed(() => {
  return type === TransactionType.INCOME ? "Entrée fixe" : "Dépense fixe";
});

const addButtonLabel = computed(() => {
  return type === TransactionType.INCOME
    ? "Ajouter une entrée"
    : "Ajouter une dépense";
});
</script>
