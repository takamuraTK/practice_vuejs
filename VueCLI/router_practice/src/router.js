import Vue from 'vue'
import Router from 'vue-router'
const Home = () => import('./views/Home.vue');
import Users from './views/Users.vue'
import UsersPosts from './views/UsersPosts.vue'
import UsersProfile from './views/UsersProfile.vue'
import HeaderHome from './views/HeaderHome.vue'
import HeaderUsers from './views/HeaderUsers.vue'

Vue.use(Router)
// useはプラグインを適応させる。プラグインとはVueプロジェクトに対してグローバルで使えるものを指す。
export default new Router({
  mode: "history",
  routes: [
    {
      path: '/',
      components: {
        default: Home,
        header: HeaderHome
      },
      beforeEnter(to, from, next) {
        next();
      }
    },
    {
      path: '/users/:id',
      components: {
        default: Users,
        header: HeaderUsers
      },
      props: {
        default: true,
        header: false
      },
      children: [
        { path: "posts/", component: UsersPosts },
        { path: "profile/", component: UsersProfile, name: 'users-id-profile' }
      ]
    },
    {
      path: '*',
      redirect: '/'
    }
  ],
  scrollBehavior() {
    return {
      selector: '#next-user'
    };
  }
})
