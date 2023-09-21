<template>
    <div class="bg-gray-50 p-2 sm:p-4 rounded mt-2 sm:mt-4">
        <div class="flex justify-between items-center mb-2">
            <h2 class="text-lg sm:text-xl font-semibold">{{ title }}</h2>

            <!-- Discrete Select for View Mode -->
            <div class="relative">
                <div class="w-32">
                    <select
                        class="form-select w-full h-9 text-gray-900 bg-gray-100 border-none rounded-lg mt-1 focus:ring focus:ring-blue-200 focus:outline-none"
                        v-model="viewMode"
                    >
                        <option :value="VIEW_MODE_ALL">{{ VIEW_MODE_LABEL_ALL }}</option>
                        <option :value="VIEW_MODE_CATEGORY">{{ VIEW_MODE_LABEL_CATEGORY }}</option>
                    </select>
                </div>
            </div>

        </div>

        <!-- Transaction List -->
        <template v-if="viewMode === VIEW_MODE_CATEGORY">
            <template v-for="(category, categoryIndex) in sortedCategories" :key="categoryIndex">
                <div class="mb-2">
                    <div
                        class="flex justify-between items-center cursor-pointer"
                        @click="toggleCategory(categoryIndex)"
                    >
                        <span class="font-semibold">{{ category.category }}</span>
                        <span class="text-gray-500">
              <font-awesome-icon :icon="category.expanded ? 'arrow-down' : 'arrow-right'" />
              {{ category.totalAmount.toFixed(2) }}€
            </span>
                    </div>
                    <ul
                        v-if="category.expanded"
                        class="pl-4 space-y-2"
                        :key="`category_${categoryIndex}`"
                    >
                        <li
                            v-for="(transaction, transactionIndex) in category.transactions"
                            :key="transactionIndex"
                            class="flex justify-between items-center"
                        >
                            <span>{{ transaction.description }}</span>
                            <div class="flex items-center space-x-2">
                <span
                    v-if="transaction.is_fixed && transaction.day_of_month > 0"
                    class="text-sm bg-blue-100 text-blue-600 px-2 py-1 rounded"
                ><b>{{ transaction.day_of_month }}</b></span>
                                <span
                                    v-else-if="!transaction.is_fixed && transaction.day_of_month > 0"
                                    class="text-sm bg-yellow-100 text-yellow-600 px-2 py-1 rounded"
                                ><b>{{ transaction.day_of_month }}</b></span>
                                <span
                                    v-else-if="transaction.endDate.length > 0"
                                    class="text-sm bg-yellow-100 text-yellow-600 px-2 py-1 rounded"
                                >{{ formatDate(transaction.endDate) }}</span>
                                <span
                                    :class="transaction.isIncome ? 'text-green-500' : 'text-red-500'"
                                    class="font-bold"
                                >{{ transaction.amount }}€</span>
                            </div>
                        </li>
                    </ul>
                </div>
            </template>
        </template>

        <template v-else>
            <ul class="pl-4 space-y-2">
                <li
                    v-for="(item, index) in sortedItems"
                    :key="index"
                    class="flex justify-between items-center"
                >
                    <span>{{ item.description }}</span>
                    <div class="flex items-center space-x-2">
            <span
                v-if="item.is_fixed && item.day_of_month > 0"
                class="text-sm bg-blue-100 text-blue-600 px-2 py-1 rounded"
            ><b>{{ item.day_of_month }}</b></span>
                        <span
                            v-else-if="!item.is_fixed && item.day_of_month > 0"
                            class="text-sm bg-yellow-100 text-yellow-600 px-2 py-1 rounded"
                        ><b>{{ item.day_of_month }}</b></span>
                        <span
                            v-else-if="item.endDate.length > 0"
                            class="text-sm bg-yellow-100 text-yellow-600 px-2 py-1 rounded"
                        >{{ formatDate(item.endDate) }}</span>
                        <span :class="amountColor" class="font-bold">{{ item.amount }}€</span>
                    </div>
                </li>
            </ul>
        </template>
    </div>
</template>

<script setup>
import { computed, defineProps, ref } from 'vue';
import { formatDate } from '@/utils/date';

const props = defineProps({
    title: String,
    items: Array,
    isIncome: Boolean,
});

const VIEW_MODE_ALL = 'all';
const VIEW_MODE_LABEL_ALL = 'Tout';
const VIEW_MODE_CATEGORY = 'category';
const VIEW_MODE_LABEL_CATEGORY = 'Par Catégorie';

const viewMode = ref(VIEW_MODE_ALL); // Default view mode is "Tout"

const amountColor = computed(() => {
    return props.isIncome ? 'text-green-500' : 'text-red-500';
});

const OTHER_CATEGORY = 'Autres';

const categories = ref([]);

// Group transactions by category
const groupedCategories = {};

for (const item of props.items) {
    const category = item.category || OTHER_CATEGORY; // Use the constant if no category is specified
    if (!groupedCategories[category]) {
        groupedCategories[category] = [];
    }
    groupedCategories[category].push(item);
}

for (const category in groupedCategories) {
    const transactions = groupedCategories[category];
    const totalAmount = transactions.reduce(
        (total, transaction) => total + parseFloat(transaction.amount),
        0
    );

    categories.value.push({
        category,
        transactions,
        expanded: false,
        totalAmount,
    });
}

const sortedCategories = computed(() => {
    return categories.value.slice().sort((a, b) => {
        // Move "Other" category to the end
        if (a.category === OTHER_CATEGORY) return 1;
        if (b.category === OTHER_CATEGORY) return -1;
        return a.category.localeCompare(b.category);
    });
});

const sortedItems = computed(() => {
    return props.items.slice().sort((a, b) => {
        if (a.day_of_month === 0) return 1;
        if (b.day_of_month === 0) return -1;
        return a.day_of_month - b.day_of_month;
    });
});

const toggleCategory = (index) => {
    sortedCategories.value[index].expanded = !sortedCategories.value[index].expanded;
};
</script>
