import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import { useFirebaseAuth } from 'vuefire'
import { onAuthStateChanged } from 'firebase/auth'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('../views/LoginView.vue')
    },
    {
      path: '/admin',
      name: 'admin',
      component: () => import('../views/admin/adminLayout.vue'),
      meta: { requireAuth: true },
      children: [
        {
          path: '/admin/casas',
          name: 'casas',
          component: () => import('../views/admin/adminCasasView.vue')
        },
        {
          path: '/admin/editar-casa/:id',
          name: 'editar-casa',
          component: () => import('../views/admin/editarCasaView.vue')
        },
        {
          path: '/admin/agregar-casa',
          name: 'agregar-casa',
          component: () => import('../views/admin/agregarCasaView.vue')
        },
      ]
    },

  ]
})

router.beforeEach(async (to, from, next) => {
  const requireAuth = to.matched.find((url) => url.meta.requireAuth);

  if (requireAuth) {
    try {
      await authenticateUser(next);
    } catch (error) {
      console.log(error);
      next({name: 'login'});
    }
  } else {
    next();
  }
});

const authenticateUser = (next) => {
  return new Promise((resolve, reject) => {
    const auth = useFirebaseAuth();
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      unsubscribe();
      if (user) {
        resolve();
      } else {
        reject(new Error('User not authenticated'));
      }
    });
  });
};

export default router
