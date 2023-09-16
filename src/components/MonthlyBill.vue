<template>
    <div class="p-6 bg-white rounded-xl shadow-md space-y-8">
        <!-- Header -->
        <div class="text-center mb-4 border-b pb-2">
            <h2 class="text-2xl font-semibold">Récapitulatif du mois</h2>
        </div>

        <!-- Incomes Section -->
        <div class="bg-gray-50 p-4 rounded">
            <h2 class="text-xl font-semibold mb-2">Entrées</h2>
            <ul class="pl-4">
                <li v-for="(income, index) in incomes" :key="index" class="mb-1 flex justify-between">
                    <span>{{ income.description }}</span>
                    <span class="text-green-500">{{ income.amount }}€</span>
                </li>
            </ul>
        </div>

        <!-- Expenses Section -->
        <div class="bg-gray-50 p-4 rounded mt-4">
            <h2 class="text-xl font-semibold mb-2">Dépenses</h2>
            <ul class="pl-4">
                <li v-for="(expense, index) in expenses" :key="index" class="mb-1 flex justify-between">
                    <span>{{ expense.description }}</span>
                    <span class="text-red-500">{{ expense.amount }}€</span>
                </li>
            </ul>
        </div>

        <!-- Solde Section -->
        <div class="mt-6 bg-indigo-600 text-white p-6 rounded-lg shadow-md flex justify-between items-center">
            <h2 class="text-xl font-semibold">Solde du mois</h2>
            <p class="text-3xl">
                <font-awesome-icon icon="euro-sign" class="mr-2"/> {{ solde }}
            </p>
        </div>
    </div>
</template>


<script>
export default {
    props: {
        incomes: Array,
        expenses: Array,
        solde: Number
    }
};
</script>
