<template>
  <div>
    <LikeHeader>
      <template v-slot:title="slotProps">
        <h1>トータルのいいね数</h1>
        {{ slotProps }}
      </template>
      <template v-slot:number>
        <h2>{{ number }}</h2>
      </template>
    </LikeHeader>
    <LikeNumber :number="number" v-on:my-click="incrementNumber"></LikeNumber>
    <LikeNumber :number="number"></LikeNumber>
    <button @click="currentComponent = 'Home'">Home</button>
    <button @click="currentComponent = 'About'">About</button>
    <component :is="currentComponent"></component>
  </div>
</template>

<script>
import LikeHeader from "./components/LikeHeader.vue";
import About from "./components/About.vue";
import Home from "./components/Home.vue";

export default {
  data() {
    return {
      number: 16,
      currentComponent: "Home",
    };
  },
  components: {
    LikeHeader,
    About,
    Home,
  },
  methods: {
    incrementNumber(value) {
      this.number = value;
    },
  },
};
</script>
