<script setup lang="ts">
defineProps({
    label: {
        type: String,
        required: true
    },
    amount: {
        type: Number,
        required: true
    },
    currency: {
        type: String,
        default: "euro"
    }
})

</script>

<template>

    <div class="card w-full shadow-xl text-primary">
        <div class="card-body text-center">
            <p class="text-xl font-light  tracking-wider">{{ label }}</p>
            <p class="text-3xl font-bold tracking-wider">{{ amount }} €</p>
        </div>
    </div>

</template>