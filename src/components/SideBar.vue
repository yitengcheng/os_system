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
        v-show="item.showFlag"
      >{{item.title}}</el-menu-item>
      <el-submenu v-else :index="index.toString()" v-show="item.showFlag">
        <template slot="title">
          <span class="menuItem">{{item.title}}</span>
        </template>
        <div v-for="(object,i) in item.childern" :key="i">
          <el-menu-item
            :index="object.path"
            v-if="!object.childern"
            class="menuChildrenItem"
            v-show="object.showFlag"
          >{{object.title}}</el-menu-item>
          <el-menu-item-group v-else :title="object.title" class="menuChildrenItem">
            <el-menu-item
              :index="chirldItem.path"
              class="menuChildrenItem"
              v-for="(chirldItem,j) in object.childern"
              :key="j"
              v-show="chirldItem.showFlag"
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
import menu from '../config/menu_config';
export default {
    components: { Login },
    data () {
        return {
            activeIndex: '/',
            menuList: menu
        };
    },
    computed: {
        ...mapState({
            userInfo: state => state.user.user
        })
    },
    methods: {
        refeshList (user) {
            this.menuList.forEach(item => {
                if (item.hasJudge) {
                    if (item.title === '审批管理') {
                        if (user && user.position.rank <= 3) {
                            item.showFlag = true;
                        } else {
                            item.showFlag = false;
                        }
                    } else if (item.title === '系统管理') {
                        item.showFlag = this.$utils.hasPermission(user, [
                            'admin',
                            'personnel',
                            'accessManager'
                        ]);
                        item.childern.forEach(childern => {
                            if (childern.hasJudge) {
                                if (childern.title === '人员管理') {
                                    childern.showFlag = this.$utils.hasPermission(user, [
                                        'admin',
                                        'personnel'
                                    ]);
                                } else if (childern.title === '权限管理') {
                                    childern.showFlag = this.$utils.hasPermission(user, [
                                        'admin',
                                        'accessManager'
                                    ]);
                                }
                            }
                        });
                    } else if (item.title === '企业办公') {
                        item.showFlag = this.$utils.hasPermission(user, [
                            'admin',
                            'filesUpload',
                            'information',
                            'officeSupplies',
                            'HRM',
                            'conferenceRoom',
                            'carManagement'
                        ]);
                        item.childern.forEach(childern => {
                            if (childern.title === '文件发布') {
                                childern.showFlag = this.$utils.hasPermission(user, [
                                    'admin',
                                    'filesUpload'
                                ]);
                            } else if (childern.title === '信息发布') {
                                childern.showFlag = this.$utils.hasPermission(user, [
                                    'admin',
                                    'information'
                                ]);
                            } else if (childern.title === '办公用品管理') {
                                childern.showFlag = this.$utils.hasPermission(user, [
                                    'admin',
                                    'officeSupplies'
                                ]);
                            } else if (childern.title === '人力资源管理') {
                                childern.showFlag = this.$utils.hasPermission(user, [
                                    'admin',
                                    'HRM'
                                ]);
                            } else if (childern.title === '会议室管理') {
                                childern.showFlag = this.$utils.hasPermission(user, [
                                    'admin',
                                    'conferenceRoom'
                                ]);
                            } else if (childern.title === '车辆管理') {
                                childern.showFlag = this.$utils.hasPermission(user, [
                                    'admin',
                                    'carManagement'
                                ]);
                            }
                        });
                    } else if (item.title === '个人办公' || item.title === '公共资源') {
                        item.showFlag = !!this.userInfo;
                    }
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
