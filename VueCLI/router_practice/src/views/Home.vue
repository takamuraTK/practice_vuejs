<template>
  <div>
    <h3>Home</h3>
    <button @click="toUsers">Go to Users</button>
    <p>{{ count }}</p>
    <p>{{ doubleCounter }}</p>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  computed: {
    count() {
      return this.$store.state.count;
    },
    ...mapGetters(["doubleCounter"]),
  },
  methods: {
    toUsers() {
      this.$router.push({
        name: "users-id-profile",
        params: { id: 1 },
      });
    },
  },
};
</script>
