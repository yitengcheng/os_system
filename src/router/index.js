import Vue from 'vue';
import Router from 'vue-router';
import Main from './../views/main';
import Audit from './../views/audit';
// 系统管理
import Personnel from './../views/personnel.vue';
import AddPersonnel from './../views/addPersonnel.vue';
import Permissions from './../views/permissions.vue';
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
import VehicleManagement from './../views/vehicleManagement';

// 个人办公
import Schedule from './../views/schedule';
import FileExchange from './../views/fileExchange';
import PasswordManagement from './../views/passwordManagement';
import PersonalAddressBook from './../views/personalAddressBook';
import Attendance from './../views/attendance';

Vue.use(Router);

export default new Router({
    // base: 'oa',
    mode: 'history',
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
        },
        {
            path: '/vehicleManagement',
            name: 'vehicleManagement',
            component: VehicleManagement
        },
        {
            path: '/schedule',
            name: 'schedule',
            component: Schedule
        },
        {
            path: '/fileExchange',
            name: 'fileExchange',
            component: FileExchange
        },
        {
            path: '/passwordManagement',
            name: 'passwordManagement',
            component: PasswordManagement
        },
        {
            path: '/personalAddressBook',
            name: 'personalAddressBook',
            component: PersonalAddressBook
        },
        {
            path: '/audit',
            name: 'audit',
            component: Audit
        },
        {
            path: '/permissions',
            name: 'permissions',
            component: Permissions
        },
        {
            path: '/attendance',
            name: 'attendance',
            component: Attendance
        }
    ]
});
