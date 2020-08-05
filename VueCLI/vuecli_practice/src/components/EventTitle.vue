<template>
  <div>
    <label for="title">タイトル</label>
    <input id="title" type="text" :value="value" @input="$emit('input', $event.target.value)" />
    <p>{{ value }}</p>
  </div>
</template>

<script>
export default {
  props: ["value"],
};
</script>
