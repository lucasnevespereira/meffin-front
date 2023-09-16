<template>
  <div>
      <Landing v-if="!isAuthenticated" />
      <div v-else>
        <h1>Dashboard</h1>
      </div>
  </div>
</template>

<script lang="ts">
import Landing from "../components/Landing.vue";
import {useAuth0} from "@auth0/auth0-vue";

export default {
  name: "home-view",
  components: {
    Landing,
  },
    setup(){
      const auth0 = useAuth0();

      return {
          isAuthenticated: auth0.isAuthenticated,
      }
    }
};
</script>