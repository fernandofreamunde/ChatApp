import login from './components/Login.vue';
import register from './components/Register.vue';
import notImplemented from './components/NotImplemented.vue';
import chat from './components/Chat.vue';

export default [
    {path:'/login', component:login},
    {path:'/register', component:register},
    {path:'/woops', component:notImplemented},
    {path:'/chat', component:chat},
] 
