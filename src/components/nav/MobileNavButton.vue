<template>
    <button @click="toggleMenu" class="lg:hidden mr-2">
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
