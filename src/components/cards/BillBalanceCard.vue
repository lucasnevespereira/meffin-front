<template>
    <div class="bg-indigo-600 text-white p-4 sm:p-6 rounded-lg shadow-md flex justify-between items-center">
        <h2 class="text-lg sm:text-xl font-semibold">Solde du mois</h2>
        <p class="text-xl lg:text-3xl">
            <font-awesome-icon icon="euro-sign" class="mr-2"/> {{ solde }}
        </p>
    </div>
</template>

<script>
export default {
    props: {
        solde: String
    }
};
</script>