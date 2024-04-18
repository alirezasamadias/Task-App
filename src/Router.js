import { createRouter, createWebHistory } from 'vue-router';
// Components
import Home from  '@/Pages/Home';
import Todo from  '@/Pages/Todo';
import Weather from  '@/Pages/Weather';
import Profile from  '@/Pages/Profile';

// routes
const routes = [
    { path: '/' , name: 'home' , component: Home },

    { path: '/todo' , name: 'todo' , component: Todo },

    { path: '/weather' , name: 'weather' , component: Weather }, 

    { path: '/profile' , name: 'profile' , component: Profile }
];

const router = createRouter({
    history: createWebHistory(),
    routes
});

export default router;