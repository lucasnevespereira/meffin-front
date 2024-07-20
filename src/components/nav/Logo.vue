<script setup lang="ts">
import {onMounted} from "vue";

const props = defineProps({
  inline: {
    type: Boolean,
    default: false
  }
})

onMounted(() => {
  console.log('Logo component mounted')
  console.log('inline prop value:', props.inline)
})
</script>

<template>
    <router-link to="/" class="normal-case text-2xl font-bold flex items-center">
        <div class="h-12 w-12 md:h-16 md:w-16 lg:w-24 lg:h-24 rounded logo mx-auto flex items-center">
            <img src="/logos/logo-meffin.svg" alt="Meffin Logo" class="h-full w-full object-contain">
        </div>
      <span v-if="props.inline" class="text-primary font-bold text-md lg:text-3xl">Meffin</span>
    </router-link>
</template>


