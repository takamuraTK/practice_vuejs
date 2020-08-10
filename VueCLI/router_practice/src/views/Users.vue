<template>
  <div>
    <h3>Users</h3>
    <ul>
      <li>
        <router-link to="/users/1">user1</router-link>
      </li>
      <li>
        <router-link to="/users/2">user2</router-link>
      </li>
    </ul>
    <hr />
    <h1>User No. {{ id }}</h1>
    <div style="height: 700px;"></div>
    <router-link
      id="next-user"
      :to="{ name: 'users-id-profile', params: {id: Number(id) + 1}, query: {lang: 'ja'}, hash: '#next-user'}"
    >次のユーザー</router-link>
  </div>
</template>

<script>
export default {
  props: ["id"],
};
</script>
