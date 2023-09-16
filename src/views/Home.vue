<template>
  <div>
      <hero v-if="!isAuthenticated" />
      <div v-else>
        <h1>Dashboard</h1>
      </div>
  </div>
</template>

<script lang="ts">
import Hero from "../components/Hero.vue";
import {useAuth0} from "@auth0/auth0-vue";

export default {
  name: "home-view",
  components: {
    Hero,
  },
    setup(){
      const auth0 = useAuth0();

      return {
          isAuthenticated: auth0.isAuthenticated,
      }
    }
};
</script>

<style lang="css" scoped>
.next-steps .fa-link {
    margin-right: 5px;
}
</style>
