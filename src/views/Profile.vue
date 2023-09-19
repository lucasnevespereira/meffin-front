<template>
    <div class="container mx-auto p-8">

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
            </div>
        </div>

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

        <div class="w-full">
            <button @click="showDeleteModal = true"
                    class="btn btn-secondary mx-auto lg:mx-0 flex items-center space-x-2 mt-4">
                <span>Supprimer le compte</span>
            </button>
        </div>


        <Loader class="mt-2" v-if="isLoading"/>
        <error class="mt-2" v-if="errorMsg.length > 0" :message="errorMsg" @dismiss="errorMsg = ''"/>
    </div>
</template>

<script lang="ts">
import {useAuth0} from '@auth0/auth0-vue';
import {ref} from "vue";
import {deleteUser} from "@/services/authService";
import Loader from "@/components/Loader.vue";
import error from "@/components/Error.vue";

export default {
    name: "profile-view",
    components: {error, Loader},
    setup() {
        const auth0 = useAuth0();
        const showDeleteModal = ref(false);
        const isLoading = ref(false);
        const errorMsg = ref("");

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
                    //error.value = "Failed to delete user account.";
                    isLoading.value = false;
                }
            }
        };
        return {
            user: auth0.user,
            confirmDelete,
            isLoading,
            errorMsg,
            showDeleteModal
        }
    }
};
</script>
