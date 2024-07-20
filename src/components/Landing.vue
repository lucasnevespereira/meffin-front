<template>
    <div class="flex flex-grow flex-col justify-center items-center space-y-6 rounded-2xl">

        <p class="text-2xl font-medium text-light">
            Votre assistant financier simplifié.
        </p>

        <p class="text-center text-lg leading-relaxed max-w-md text-light">
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
