<template>
    <div class="flex flex-col justify-center items-center space-y-8 mt-10 p-5 rounded-2xl">

        <p class="text-2xl font-medium text-gray-700">
            Votre assistant financier simplifié.
        </p>

        <p class="text-center text-lg leading-relaxed max-w-md text-gray-600">
            Notez vos entrées d'argent et vos dépenses en quelques clics. Meffin vous offre une vue claire de votre
            budget mensuel.
        </p>


        <button class="btn btn-primary" @click="login">
            Commencer maintenant
        </button>
    </div>
</template>

<script lang="ts">
import {useAuth0} from "@auth0/auth0-vue";

export default {
    name: "Landing",
    setup() {
        const auth0 = useAuth0()

        return {
            login() {
                auth0.loginWithRedirect()
            }
        }
    }
};
</script>
