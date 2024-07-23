<template>
  <div class="container flex flex-col sm:p-0 p-2 lg:p-10 sm:mx-auto">
    <div class="flex justify-between items-center text-primary">
      <h2 class="text-2xl lg:text-3xl lg:p-5 text-primary font-bold">
        Catégories
      </h2>
    </div>
    <div class="lg:p-5">
      <ul class="divide-y divide-gray-200 mb-4">
        <h5 class="text-primary">Catégories par défault</h5>
        <li
          v-for="(category, index) in defaultCategories"
          :key="index"
          class="py-4"
        >
          <div class="flex justify-between items-center">
            <div class="flex items-center">
              <div
                class="w-4 h-4 mr-2"
                :style="{ backgroundColor: category.color || '#ccc' }"
              ></div>
              <span class="text-sm md:text-base font-bold text-gray-700">{{
                category.name
              }}</span>
            </div>
            <div class="flex items-center">
              <span class="text-xs md:text-sm italic text-gray-600 lowercase">{{
                category.type === TransactionType.EXPENSE ? "Dépense" : "Revenu"
              }}</span>
            </div>
          </div>
        </li>
      </ul>

      <ul
        v-if="store.categories.length > 0"
        class="divide-y divide-gray-200 mb-4"
      >
        <h5 class="text-primary">Mes catégories</h5>
        <li
          v-for="(category, index) in store.categories"
          :key="index"
          class="py-4"
        >
          <div class="flex justify-between items-center">
            <div class="flex items-center">
              <div
                class="w-4 h-4 mr-2"
                :style="{ backgroundColor: category.color || '#ccc' }"
              ></div>
              <span class="text-sm md:text-base font-bold text-gray-700">{{
                category.name
              }}</span>
            </div>
            <div class="flex items-center">
              <span
                class="text-xs md:text-sm italic text-gray-600 lowercase mr-3"
                >{{
                  category.type === TransactionType.EXPENSE
                    ? "Dépense"
                    : "Revenu"
                }}</span
              >
              <button
                @click="editCategory(category)"
                class="btn btn-secondary btn-xs hidden"
              >
                Modifier
              </button>
              <button
                @click="showDeleteModal = true"
                class="btn btn-error btn-outline btn-xs ml-2"
              >
                Supprimer
              </button>
            </div>
            <div
              v-if="showDeleteModal"
              class="fixed inset-0 flex items-center justify-center z-50"
            >
              <div class="modal modal-open">
                <div class="modal-box">
                  <h2 class="text-xl">Confirmer Suppresion</h2>
                  <p>Voulez-vous vraiment supprimer cette catégorie?</p>
                  <div class="modal-action">
                    <button @click="showDeleteModal = false" class="btn">
                      Annuller
                    </button>
                    <button
                      @click="deleteCategory(category)"
                      class="btn btn-danger"
                    >
                      Supprimer
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </li>
      </ul>

      <button @click="showModal = true" class="btn btn-sm btn-primary mt-4">
        Ajouter Catégorie
      </button>

      <div
        v-if="showModal"
        class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50"
      >
        <div
          class="bg-white p-6 rounded-lg shadow-lg w-11/12 md:w-1/2 lg:w-1/3"
        >
          <h3 class="text-lg font-bold mb-4">Ajouter une nouvelle catégorie</h3>
          <div class="flex flex-col mb-4">
            <label for="newCategoryName" class="text-primary"
              >Nom de la Catégorie</label
            >
            <input
              v-model="newCategoryName"
              id="newCategoryName"
              class="input input-bordered input-sm"
              type="text"
              placeholder="Entrez le nom de la catégorie"
            />
          </div>
          <div class="flex flex-col mb-4">
            <label for="newCategoryType" class="text-primary"
              >Type de Catégorie</label
            >
            <select
              v-model="newCategoryType"
              id="newCategoryType"
              class="select select-bordered select-sm"
            >
              <option value="expense">Dépense</option>
              <option value="income">Revenu</option>
            </select>
          </div>
          <div class="flex gap-2">
            <div class="flex flex-col mb-4">
              <label for="newCategoryColor" class="text-primary">Couleur</label>
              <input
                v-model="newCategoryColor"
                id="newCategoryColor"
                class="input input-bordered input-sm"
                type="color"
              />
            </div>
          </div>

          <div class="flex justify-end">
            <button
              @click="showModal = false"
              class="btn btn-sm btn-secondary btn-outline mr-2"
            >
              Annuler
            </button>
            <button @click="addCategory" class="btn btn-sm btn-primary">
              Ajouter
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from "vue";
import { defaultCategories } from "@/utils/categories";
import { TransactionType } from "@/enum";
import { useCategoriesStore } from "@/store/categories";
import { useAuth0 } from "@auth0/auth0-vue";

const store = useCategoriesStore();
const auth0 = useAuth0();

watch(
  () => auth0.user.value,
  async (newUser) => {
    if (newUser) {
      const userId = newUser.sub;
      if (userId) {
        await store.fetchCategories(userId);
      }
    }
  },
  { immediate: true },
);

const newCategoryName = ref("");
const newCategoryType = ref("expense");
const newCategoryColor = ref("#000000");
const showModal = ref(false);
const showDeleteModal = ref(false);

const addCategory = async () => {
  const userId = auth0.user.value?.sub;
  if (newCategoryName.value.trim() !== "" && userId) {
    const categoryPayload = {
      userId: userId,
      name: newCategoryName.value,
      type: newCategoryType.value,
      color: newCategoryColor.value,
    };
    await store.addCategory(categoryPayload);

    // Reset the form fields
    newCategoryName.value = "";
    newCategoryType.value = "expense";
    newCategoryColor.value = "#000000";
    showModal.value = false;

    store.fetchCategories(userId);
  }
};

const editCategory = (category: Category) => {
  //TODO: edit category => Implement logic to edit the selected category
};

const deleteCategory = async (category: Category) => {
  await store.removeCategory(category.id as string);
  showDeleteModal.value = false;
};
</script>

<style scoped></style>
