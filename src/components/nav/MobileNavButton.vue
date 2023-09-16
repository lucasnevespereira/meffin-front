<template>
    <button @click="toggleMenu" class="lg:hidden">
        <font-awesome-icon icon="bars"/>
    </button>
</template>

<script>
export default {
    methods: {
        toggleMenu() {
            this.$emit('toggle-menu');
        }
    }
}
</script>
