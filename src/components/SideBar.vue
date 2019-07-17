<template>
  <el-menu
    :default-active="activeIndex"
    class="aside"
    background-color="#003592"
    text-color="#fff"
    active-text-color="#fff"
    :router="true"
  >
    <Login class="login"></Login>
    <div v-for="(item,index) in menuList" :key="index">
      <el-menu-item
        v-if="!item.childern"
        class="menuItem"
        :index="item.path"
        v-show="(item.showFlag)"
      >{{item.title}}</el-menu-item>
      <el-submenu v-else :index="index.toString()">
        <template slot="title">
          <span class="menuItem">{{item.title}}</span>
        </template>
        <div v-for="(object,i) in item.childern" :key="i">
          <el-menu-item
            :index="object.path"
            v-if="!object.childern"
            class="menuChildrenItem"
          >{{object.title}}</el-menu-item>
          <el-menu-item-group v-else :title="object.title" class="menuChildrenItem">
            <el-menu-item
              :index="chirldItem.path"
              class="menuChildrenItem"
              v-for="(chirldItem,j) in object.childern"
              :key="j"
            >{{chirldItem.title}}</el-menu-item>
          </el-menu-item-group>
        </div>
      </el-submenu>
    </div>
  </el-menu>
</template>

<script>
import Login from './Login';
import { mapState } from 'vuex';
export default {
    components: { Login },
    data () {
        return {
            activeIndex: '/',
            menuList: [
                {
                    path: '/',
                    title: '首页',
                    showFlag: true,
                    hasJudge: false
                },
                {
                    path: '/audit',
                    title: '审批管理',
                    showFlag: true,
                    hasJudge: false
                },
                {
                    title: '系统管理',
                    showFlag: true,
                    hasJudge: false,
                    childern: [
                        {
                            path: '/personnel',
                            title: '人员管理',
                            showFlag: true,
                            hasJudge: false
                        },
                        {
                            path: '/permissions',
                            title: '权限管理',
                            showFlag: true,
                            hasJudge: false
                        }
                    ]
                },
                {
                    title: '公共资源',
                    showFlag: true,
                    hasJudge: false,
                    childern: [
                        {
                            path: '/publicAddressBook',
                            title: '公共通讯录',
                            showFlag: true,
                            hasJudge: false
                        },
                        {
                            path: '/dataCenter',
                            title: '资料中心',
                            showFlag: true,
                            hasJudge: false
                        },
                        {
                            path: '/messageBoard',
                            title: '留言板',
                            showFlag: true,
                            hasJudge: false
                        }
                    ]
                },
                {
                    title: '企业办公',
                    showFlag: true,
                    hasJudge: false,
                    childern: [
                        {
                            path: '/fileRelease',
                            title: '文件发布',
                            showFlag: true,
                            hasJudge: false
                        },
                        {
                            path: '/informationIssue',
                            title: '信息发布',
                            showFlag: true,
                            hasJudge: false
                        },
                        {
                            path: '/officeSupplies ',
                            title: '办公用品管理',
                            showFlag: true,
                            hasJudge: false
                        },
                        {
                            path: '/humanResources',
                            title: '人力资源管理',
                            showFlag: true,
                            hasJudge: false
                        },
                        {
                            path: '/conferenceRoom',
                            title: '会议室管理',
                            showFlag: true,
                            hasJudge: false
                        },
                        {
                            path: '/vehicleManagement',
                            title: '车辆管理',
                            showFlag: true,
                            hasJudge: false
                        }
                    ]
                },
                {
                    path: '/',
                    title: '个人办公',
                    showFlag: true,
                    hasJudge: false,
                    childern: [
                        {
                            path: '/fileExchange',
                            title: '文件交换',
                            showFlag: true,
                            hasJudge: false
                        },
                        {
                            path: '/schedule',
                            title: '日程安排',
                            showFlag: true,
                            hasJudge: false
                        },
                        {
                            path: '/personalAddressBook',
                            title: '个人通讯录',
                            showFlag: true,
                            hasJudge: false
                        },
                        {
                            path: '/workFor',
                            title: '工作记事',
                            showFlag: true,
                            hasJudge: false
                        },
                        {
                            path: '/passwordManagement',
                            title: '密码管理',
                            showFlag: true,
                            hasJudge: false
                        }
                    ]
                }
            ]
        };
    },
    computed: {
        ...mapState({
            userInfo: state => state.user.user
        })
    },
    methods: {
        refeshList (value) {
            this.menuList.forEach(item => {
                if (item.hasJudge) {
                    let flag = this._.findIndex(value.permissions, o => {
                        return o === 'watchImage';
                    });
                    item.showFlag = flag !== -1;
                }
            });
        }
    },
    mounted () {
        this.refeshList(this.userInfo);
    },
    watch: {
        userInfo (val, oldVal) {
            this.refeshList(val);
        }
    }
};
</script>
<style lang='scss' scoped>
.aside {
  display: flex;
  width: 150px;
  flex-direction: column;
  border-right: 1px solid #545c64;
  overflow: hidden;
}
.menuItem {
  text-align: center;
  font-size: 12px;
}
.login {
  display: flex;
  justify-content: center;
  align-items: center;
}
.imageContainer {
  display: flex;
  flex: 1;
  align-items: flex-end;
}
.foot-image {
  width: 150px;
  height: 150px;
  margin-bottom: 20px;
}
.menuChildrenItem {
  font-size: 12px;
}
</style>
