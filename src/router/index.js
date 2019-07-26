import Vue from 'vue';
import Router from 'vue-router';
import Main from './../views/Main';
// 系统管理
import Personnel from './../views/personnel.vue';
import AddPersonnel from './../views/addPersonnel.vue';
// 公共资源
import PublicAddressBook from './../views/publicAddressBook';
import MessageBoard from './../views/messageBoard';
import DataCenter from './../views/dataCenter';
import DataDetail from './../views/dataDetail';

// 企业办公
import FileRelease from './../views/fileRelease';
import InformationIssue from './../views/informationIssue';
import OfficeSupplies from './../views/officeSupplies';
import HumanResources from './../views/humanResources';
import ConferenceRoom from './../views/conferenceRoom';

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
        },
        {
            path: '/dataCenter',
            name: 'dataCenter',
            component: DataCenter
        },
        {
            path: '/dataDetail',
            name: 'dataDetail',
            component: DataDetail
        },
        {
            path: '/fileRelease',
            name: 'fileRelease',
            component: FileRelease
        },
        {
            path: '/informationIssue',
            name: 'informationIssue',
            component: InformationIssue
        },
        {
            path: '/officeSupplies',
            name: 'officeSupplies',
            component: OfficeSupplies
        },
        {
            path: '/humanResources',
            name: 'humanResources',
            component: HumanResources
        },
        {
            path: '/conferenceRoom',
            name: 'conferenceRoom',
            component: ConferenceRoom
        }
    ]
});
