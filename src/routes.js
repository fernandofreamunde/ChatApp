import chat from './components/Chat.vue';
import login from './components/Login.vue';
import register from './components/Register.vue';
import LandingPage from './components/LandingPage.vue';
import notImplemented from './components/NotImplemented.vue';

export default [
    {path:'/', component:LandingPage},
    {path:'/login', component:login},
    {path:'/register', component:register},
    {path:'/woops', component:notImplemented},
    {path:'/chat', component:chat},
] 
