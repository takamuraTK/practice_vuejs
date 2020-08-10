<template>
  <nav style="width: 700px; margin: auto; padding-top:20px;">
    <h2>Home</h2>
    <router-link to="/" class="link" active-class="link--active" exact>Home</router-link>
    <router-link
      :to="{ name: 'users-id-profile', params: {id: 1}, query: {lang: 'ja'}, hash: '#next-user'}"
      class="link"
      active-class="link--active"
      exact
    >Users</router-link>
  </nav>
</template>

<style scoped>
.link {
  margin-right: 10px;
}
.link--active {
  font-size: 20px;
}
</style>
