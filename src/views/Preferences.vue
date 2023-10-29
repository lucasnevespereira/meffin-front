<template>
    <div class="container flex flex-col p-10">
        <div class="flex justify-between items-center text-primary">
            <h2 class="text-3xl p-5 text-primary font-bold">Preferences</h2>
        </div>

        <div class="mt-8">
            <h3 class="text-lg text primary flex items-center">
                <font-awesome-icon icon="tags" class="mr-2"/>
                Mes Catégories
            </h3>
            <!-- List of Categories -->
            <ul class="divide-y divide-gray-200 mt-4 mb-4">
                <li v-for="(category, index) in categories" :key="index" class="py-4">
                    <div class="flex justify-between items-center">
                        <div class="flex items-center">
                            <div class="w-4 h-4 mr-2" :style="{ backgroundColor: category.color }"></div>
                            <span class="text-sm md:text-base font-bold text-gray-700">{{ category.name }}</span>
                            <div class="ml-3">
                                <span v-if="category.type === 'expense'" class="badge badge-error badge-outline">dépense</span>
                                <span v-else-if="category.type === 'income'" class="badge badge-success badge-outline">entrées</span>
                            </div>
                        </div>
                        <div class="flex items-center">
                            <button @click="editCategory(category)" class="btn btn-secondary btn-xs">
                                Modifier
                            </button>
                            <button @click="deleteCategory(category)" class="btn btn-error btn-outline btn-xs ml-2">
                                Supprimer
                            </button>
                        </div>
                    </div>
                </li>
            </ul>

            <!-- Add Category Button -->
            <button @click="addCategory" class="btn btn-primary">Ajouter Catégorie</button>
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue';

// Sample categories data
const categories = ref([
    { name: 'Logement', color: '#32CBFF', type: 'expense' },
    { name: 'Transports', color: '#FECEF1', type: 'expense' },
    { name: 'Abonnements', color: '#00A5E0', type: 'expense'},
    { name: 'Travail', color: '#89A1EF', type: 'income' },
    { name: 'Cadeau', color: '#EF9CDA', type: 'income' },
    { name: 'Freelance', color: '#1E5782', type: 'income'},
]);

const addCategory = () => {
    // Implement logic to add a new category to the categories array
};

const editCategory = (category) => {
    // Implement logic to edit the selected category
};

const deleteCategory = (category) => {
    // Implement logic to delete the selected category
};
</script>

<style scoped>
/* Add your custom styles here */
</style>
