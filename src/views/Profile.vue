<template>
    <div class="container flex flex-1 flex-col p-10">
        <div class="flex justify-center lg:justify-between items-center text-center text-primary">
            <h2 class="text-3xl p-5 text-primary font-bold">Mon Profil</h2>
        </div>
        
        <!-- User Info Section -->
        <div class="flex flex-col md:flex-row items-center mb-10">
            <div class="w-full md:w-1/4 mb-4 md:mb-0">
                <img
                        :src="user?.picture"
                        alt="User's profile picture"
                        class="profile-pic rounded-full w-32 h-32 object-cover mx-auto md:mx-0 shadow-lg"
                />
            </div>
            <div class="w-full md:w-3/4 text-center md:text-left ml-0 md:ml-8">
                <h2 class="text-2xl md:text-3xl font-bold mb-2">{{ user?.name }}</h2>
                <p class="text-lg text-gray-600">{{ user?.email }}</p>
                <p class="mt-2 text-sm text-gray-500">Username: {{ user?.nickname }}</p>
                <p class="mt-2 text-sm text-gray-500">User ID: {{ currentUser?.id }}</p>
                <p class="mt-2 text-sm text-gray-500">Auth0 ID: {{ currentUser?.auth0Id }}</p>
                <p class="mt-2 text-sm text-gray-500">Currency: {{ currency }}</p>
            </div>
        </div>

        <!-- Currency Selection Section -->
        <div class="bg-base-100 rounded-lg p-6 mb-6 shadow-md">
            <h3 class="text-xl font-semibold mb-4 text-primary">Préférences</h3>
            
            <div class="form-control w-full max-w-xs">
                <label class="label">
                    <span class="label-text font-medium">Devise</span>
                </label>
                <select 
                    v-model="selectedCurrency" 
                    @change="updateCurrency"
                    class="select select-bordered w-full"
                    :disabled="isUpdatingCurrency || !currentUser"
                >
                    <option value="EUR">EUR - Euro</option>
                    <option value="USD">USD - Dollar américain</option>
                    <option value="GBP">GBP - Livre sterling</option>
                    <option value="CAD">CAD - Dollar canadien</option>
                    <option value="AUD">AUD - Dollar australien</option>
                    <option value="CHF">CHF - Franc suisse</option>
                    <option value="JPY">JPY - Yen japonais</option>
                </select>
                <label class="label" v-if="isUpdatingCurrency">
                    <span class="label-text-alt text-info">Mise à jour...</span>
                </label>
            </div>
        </div>

        <!-- Delete Account Section -->
        <div class="bg-base-100 rounded-lg p-6 shadow-md">
            <h3 class="text-xl font-semibold mb-4 text-error">Zone de danger</h3>
            <p class="text-gray-600 mb-4">Cette action est irréversible. Toutes vos données seront supprimées définitivement.</p>
            
            <button @click="showDeleteModal = true"
                    class="btn btn-error btn-outline mx-auto lg:mx-0 flex items-center space-x-2">
                <span>Supprimer le compte</span>
            </button>
        </div>

        <!-- Delete Confirmation Modal -->
        <div v-if="showDeleteModal" class="fixed inset-0 flex items-center justify-center z-50">
            <div class="modal modal-open">
                <div class="modal-box">
                    <h2 class="text-xl">Confirmer Suppresion</h2>
                    <p>Voulez-vous vraiment supprimer votre compte ?</p>
                    <div class="modal-action">
                        <button @click="showDeleteModal = false" class="btn">Annuller</button>
                        <button @click="confirmDelete" class="btn btn-danger">Supprimer</button>
                    </div>
                </div>
            </div>
        </div>

        <Loader class="mt-2" v-if="isLoading"/>
        <error class="mt-2" v-if="errorMsg.length > 0" :message="errorMsg" @dismiss="errorMsg = ''"/>
    </div>
</template>

<script lang="ts">
import {useAuth0} from '@auth0/auth0-vue';
import {ref, computed, onMounted, watch} from "vue";
import {deleteUser} from "@/services/authService";
import Loader from "@/components/Loader.vue";
import error from "@/components/Error.vue";
import {FontAwesomeIcon} from "@fortawesome/vue-fontawesome";
import { useUserStore } from "@/store/user";
import { Currency } from "@/enum";

export default {
    name: "profile-view",
    components: {FontAwesomeIcon, error, Loader},
    setup() {
        const auth0 = useAuth0();
        const userStore = useUserStore();
        const showDeleteModal = ref(false);
        const isLoading = ref(false);
        const errorMsg = ref("");
        const selectedCurrency = ref<Currency>(userStore.getCurrency());

        // Computed properties
        const currentUser = computed(() => userStore.currentUser);
        const currency = computed(() => userStore.getCurrency());
        const isUpdatingCurrency = computed(() => userStore.getIsUpdatingCurrency());
        
           
        // Watch for changes in currentUser and update selectedCurrency
        watch(currentUser, (newUser) => {
            if (newUser?.currency) {
                selectedCurrency.value = newUser.currency;
                console.log('User currency updated in store:', newUser.currency);
            }
        }, { immediate: true });

        const updateCurrency = async () => {
            if (!userStore.currentUser?.id) {
                errorMsg.value = "Utilisateur non trouvé";
                return;
            }

            try {
                await userStore.updateCurrency(selectedCurrency.value);
                console.log('Currency updated successfully');
            } catch (error) {
                errorMsg.value = "Erreur lors de la mise à jour de la devise";
                console.error('Failed to update currency:', error);
            }
        };

        const confirmDelete = async () => {
            showDeleteModal.value = false;
            isLoading.value = true;
            const userId = auth0.user.value?.sub
            if (userId) {
                try {
                    await deleteUser(userId);
                    await auth0.logout({
                        logoutParams: {
                            returnTo: window.location.origin
                        }
                    });
                } catch (e) {
                    errorMsg.value = "Une erreur est survenue";
                    console.error(e);
                } finally {
                    isLoading.value = false;
                }
            }
        };
        
        return {
            user: auth0.user,
            currentUser,
            currency,
            selectedCurrency,
            isUpdatingCurrency,
            updateCurrency,
            confirmDelete,
            isLoading,
            errorMsg,
            showDeleteModal
        }
    }
};
</script>