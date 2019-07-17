import Vue from 'vue';
import Router from 'vue-router';
import Main from './../views/Main';
// 公共资源
import PublicAddressBook from './../views/publicAddressBook';

Vue.use(Router);

export default new Router({
    routes: [
        {
            path: '/',
            name: 'main',
            component: Main
        },
        {
            path: '/publicAddressBook',
            name: 'publicAddressBook',
            component: PublicAddressBook
        }
    ]
});
