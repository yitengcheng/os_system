import Vue from 'vue';
import Router from 'vue-router';
import Main from './../views/Main';
// 系统管理
import Personnel from './../views/personnel.vue';
import AddPersonnel from './../views/addPersonnel.vue';
// 公共资源
import PublicAddressBook from './../views/publicAddressBook';
import MessageBoard from './../views/messageBoard';

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
        },
        {
            path: '/personnel',
            name: 'personnel',
            component: Personnel
        },
        {
            path: '/addPersonnel',
            name: 'addPersonnel',
            component: AddPersonnel
        },
        {
            path: '/messageBoard',
            name: 'messageBoard',
            component: MessageBoard
        }
    ]
});
