import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import('../views/Home')
  },
  {
    path: '/students',
    name: 'Students',
    component: () => import('../views/Students')
  },
  {
    path: '/courses',
    name: 'Courses',
    component: () => import('../views/Courses')
  },
  {
    path: '/create-course',
    name: 'CreateCourse',
    component: () => import('../views/CreateCourse')
  },
  {
    path: '*',
    name: 'notFound',
    component: () => import('../views/404')
  },
  {
    path: '/add-student',
    name: 'AddStudent',
    component: () => import('../views/AddStudent')
  },
  {
    path: '/edit-student',
    name: 'EditStudent',
    component: () => import('../views/EditStudent')
  },
  {
    path: '/edit-course',
    name: 'EditCourse',
    component: () => import('../views/EditCourse')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
