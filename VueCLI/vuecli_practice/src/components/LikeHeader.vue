<template>
  <div>
    <slot name="title" :user="user"></slot>
    <slot name="number"></slot>
  </div>
</template>

<script>
export default {
  data() {
    return {
      user: {
        firstName: "Jack",
        lastName: "Donald",
      },
    };
  },
};
</script>
