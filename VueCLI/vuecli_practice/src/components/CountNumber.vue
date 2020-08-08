<template>
  <div>
    <h2>{{ title | lowerCase }}</h2>
    <p v-border:solid.shadow="{width: '5px', color: 'red'}">Home</p>
    <p>{{ number }}</p>
    <button @click="number += 1">+1</button>
  </div>
</template>

<script>
import { tokyoNumber } from "@/tokyoNumber";

export default {
  mixins: [tokyoNumber],
};
</script>
