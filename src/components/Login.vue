<template>
  <div>
    <el-button
      v-if="!user"
      class="el-icon-user-solid button"
      type="text"
      @click="modelVisible = true"
    >登录</el-button>
    <div class="user" v-else>
      <div class="user" @click="toUserDetail">
        <el-image :src="user.head ||'static/default.png'" class="head"></el-image>
        <div class="userName">{{user.name}}</div>
      </div>

      <el-button
        @click="logoutVisible = true"
        size="mini"
        circle
        icon="el-icon-switch-button"
        class="logout"
      ></el-button>
    </div>
    <showModel
      title="登录"
      :dialogVisible="modelVisible"
      @close="closeModel"
      @doCancel="doRegister"
      @doConfirm="doConfirm"
      cancel="注册"
    >
      <div slot="content">
        <el-form :model="userInfo" ref="login" class="loginWrapper" :rules="rules">
          <el-form-item label="用户名" label-width="70px" class="loginItem" prop="name">
            <el-input @change="onChangeName" v-model="userInfo.name" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="密码" label-width="70px" class="loginItem" prop="password">
            <el-input
              @change="onChangePassword"
              show-password
              v-model="userInfo.password"
              autocomplete="off"
            ></el-input>
          </el-form-item>
        </el-form>
      </div>
    </showModel>
    <showModel
      title="提示"
      :dialogVisible="logoutVisible"
      @close="closeModel"
      @doCancel="closeModel"
      @doConfirm="logout"
    >
      <div slot="content">
        <p>是否确认退出登录</p>
      </div>
    </showModel>
  </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex';
import showModel from './showModel';
export default {
    components: { showModel },
    data () {
        return {
            modelVisible: false,
            logoutVisible: false,
            userInfo: {
                name: '',
                password: ''
            },
            name: '',
            password: '',
            rules: {
                name: [
                    { required: true, message: '请输入用户名称', trigger: 'blur' },
                    { min: 3, max: 16, message: '长度在 3 到 16 位', trigger: 'blur' }
                ],
                password: [
                    { required: true, message: '请输入密码', trigger: 'blur' },
                    { min: 3, max: 16, message: '长度在 3 到 16 位', trigger: 'blur' }
                ]
            }
        };
    },
    computed: {
        ...mapState({
            user: state => state.user.user
        })
    },
    methods: {
        ...mapMutations('user', ['updateUser']),
        closeModel () {
            this.modelVisible = false;
            this.logoutVisible = false;
            this.modifyVisible = false;
            this.$refs.login.resetFields();
        },
        doRegister () {
            this.closeModel();
            this.$router.push({
                name: 'Register'
            });
        },
        onChangeName () {
            this.name = this.userInfo.name;
        },
        onChangePassword () {
            this.password = this.userInfo.password;
        },
        doConfirm () {
            this.closeModel();
            this.$http
                .post('/api/login', {
                    name: this.name,
                    password: this.password
                })
                .then(res => {
                    let { success, msg, user } = res;
                    if (success) {
                        this.updateUser(user);
                    } else {
                        this.$alert(msg);
                    }
                });
        },
        toUserDetail () {
            this.$router.push({
                name: 'UserDetail'
            });
        },
        logout () {
            this.updateUser('');
            this.closeModel();
            this.$router.replace({
                path: '/'
            });
        }
    }
};
</script>
<style lang='scss' scoped>
.button {
  display: flex;
  flex-direction: column;
  align-items: center;
  font-size: 14px;
  line-height: 20px;
}
.user {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.head {
  width: 70px;
  height: 70px;
  border-radius: 50%;
  margin-bottom: 10px;
}
.userName {
  color: #409eff;
  margin-bottom: 10px;
  font-size: 14px;
}
.loginWrapper {
  display: flex;
  align-items: center;
  flex-direction: column;
}
.loginItem {
  width: 250px;
}
.logout {
  background-color: rgba(245, 108, 108, 1);
  color: #fff;
  border-color: rgba(0, 0, 0, 0);
}
.modify {
  display: flex;
  font-size: 12px;
  justify-content: flex-end;
  padding-right: 180px;
  color: #666;
}
</style>
