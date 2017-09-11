import Vue from 'vue';
import App from '../components/App.vue';
import VueRouter from 'vue-router';
import Chat from '../components/Chat.vue';
import User from '../components/User.vue';

Vue.use(VueRouter);

const routes = [
  { path: '', component: Chat},
  { path: '/chat', component: Chat },
  { path: '/user', component: User }
];

const router = new VueRouter({
  routes
});

const app = new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
