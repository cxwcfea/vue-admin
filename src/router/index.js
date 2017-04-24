import Vue from 'vue';
import Router from 'vue-router';
import Home from '@/components/Home';
import Login from '@/components/Login';
import menuModule from '@/store/modules/menu';
import { isLoggedIn } from '@/common/auth';

Vue.use(Router);

// Menu should have 2 levels.
function generateRoutesFromMenu(menu = [], routes = []) {
  for (let i = 0, l = menu.length; i < l; i += 1) {
    const item = menu[i];
    if (item.path) {
      routes.push(item);
    }
    if (!item.component) {
      generateRoutesFromMenu(item.children, routes);
    }
  }
  return routes;
}

const router = new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home,
      meta: { requiresAuth: true },
      children: [
        ...generateRoutesFromMenu(menuModule.state.items),
      ],
    },
    {
      path: '/login',
      name: 'Login',
      component: Login,
      beforeEnter: (to, from, next) => {
        if (isLoggedIn()) {
          next('/');
        } else {
          next();
        }
      },
    },
    {
      path: '*',
      redirect: '/',
    },
  ],
});

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    // this route requires auth, check if logged in
    // if not, redirect to login page.
    if (!isLoggedIn()) {
      next({
        path: '/login',
        query: { redirect: to.fullPath },
      });
    } else {
      next();
    }
  } else {
    next(); // 确保一定要调用 next()
  }
});

export default router;
