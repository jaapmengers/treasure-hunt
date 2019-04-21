import Vue from 'vue';
import Router from 'vue-router';
import Home from './views/Home.vue';
import Question from './components/Question.vue';
import Settings from './components/Settings.vue';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
      children: [
        {
          path: 'vraag/:questionnr',
          name: 'vraag',
          props: true,
          component: Question,
        },
        {
          path: 'settings',
          name: 'settings',
          component: Settings,
        },
      ],
    },
  ],
});
