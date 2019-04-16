import Vue from 'vue';
import Router from 'vue-router';
import Home from './views/Home.vue';
import Question from './components/Question.vue';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
      children: [
        {
          path: 'vraag',
          name: 'Vraag',
          component: Question,
        },
      ],
    },
  ],
});
