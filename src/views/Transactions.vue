<template>
  <div class="container">
    <div class="row align-items-center profile-header">
        Mes transactions {{user.nickname}}
    </div>
  </div>
</template>

<script lang="ts">
import { useAuth0 } from '@auth0/auth0-vue';

export default {
  name: "transactions-view",
  setup() {
    const auth0 = useAuth0();
    return {
      user: auth0.user,
    }
  }
};
</script>

