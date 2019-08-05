<template>
  <div class="contain">
    <PageTitle label="权限管理" />
    <div class="table">
      <ElTable
        class="eltable"
        :stripe="true"
        :tableData="persons"
        :tableKey="tableKey"
        :border="true"
      >
        <div slot-scope="data">
          <el-button @click.native.prevent="edit(data.data.row)" size="small">修改</el-button>
        </div>
      </ElTable>
    </div>
    <showModel
      title="权限"
      :dialogVisible="modelVisible"
      @close="closeModel"
      @doCancel="closeModel"
      @doConfirm="doConfirm"
    >
      <div slot="content">
        <el-form class="formContain" :model="person" ref="person" :rules="rules">
          <FormSelect
            :options="permissionsList"
            label="权限"
            :form="person"
            value="permissions"
            :multiple="true"
            @onChange="onChange"
          />
        </el-form>
      </div>
    </showModel>
  </div>
</template>

<script>
import PageTitle from '../components/PageTitle';
import ElTable from '../components/elComponent/el-table';
import FormSelect from '../components/form/formSelect';
import showModel from '../components/showModel';
import { mapState } from 'vuex';
const map = {
    admin: '管理员',
    accessManager: '权限分配者',
    personnel: '人员管理的权限',
    filesUpload: '文件发布的权限',
    information: '信息发布的权限',
    officeSupplies: '办公用品管理的权限',
    HRM: '人力资源管理的权限',
    conferenceRoom: '会议室管理的权限',
    carManagement: '车辆管理的权限'
};
export default {
    components: { PageTitle, ElTable, showModel, FormSelect },
    data () {
        return {
            modelVisible: false,
            persons: [],
            noSelf: true,
            tableKey: [
                { prop: 'name', label: '姓名', width: '150' },
                { prop: 'branch', label: '部门', width: '150' },
                { prop: 'position', label: '职位', width: '150' },
                { prop: 'permissions', label: '权限', width: '500' },
                { label: '操作', width: '150' }
            ],
            person: {
                permissions: []
            },
            permissionsList: [],
            rules: {
                permissions: [
                    { required: true, message: '请选择此用户权限', trigger: 'blur' }
                ]
            },
            targetUser: {}
        };
    },
    mounted () {
        this.getPersons();
        this.getPermissions();
    },
    computed: {
        ...mapState({
            user: state => state.user.user
        })
    },
    methods: {
        closeModel () {
            this.modelVisible = false;
            this.$refs.person && this.$refs.person.resetFields();
        },
        onChange (value, formType) {
            this.person[formType] = value;
        },
        doConfirm () {
            this.$refs.person.validate(vaild => {
                if (vaild) {
                    this.$http
                        .post('/api/modifyPermissions', {
                            userId: this.user._id,
                            targetUserId: this.targetUser.userId,
                            permissions: this.person.permissions
                        })
                        .then(res => {
                            let { success, msg } = res;
                            this.$alert(success ? '修改成功' : msg);
                            this.getPersons();
                            this.closeModel();
                        });
                } else {
                    this.$alert('请认真核对信息');
                }
            });
        },
        getPersons () {
            this.persons = [];
            this.$http.post('/api/getPersons').then(res => {
                let { success, msg, persons } = res;
                if (success) {
                    let tmp = {};
                    let a = [];
                    persons.forEach(item => {
                        if (item._id !== this.user._id) {
                            tmp.name = item.name;
                            tmp.branch = item.branch.name;
                            tmp.position = item.position.position;
                            tmp.userId = item._id;
                            tmp.permissionList = item.permissions;
                            item.permissions.forEach(element => {
                                a.push(map[element]);
                            });
                            tmp.permissions = a.join(',');
                            this.persons.push(tmp);
                            tmp = {};
                            a = [];
                        }
                    });
                } else {
                    this.$alert(msg);
                }
            });
        },
        getPermissions () {
            this.$http.post('/api/getPermissions').then(res => {
                let { success, msg, permissions } = res;
                if (success) {
                    this.permissionsList = permissions;
                } else {
                    this.$alert(msg);
                }
            });
        },
        edit (data) {
            this.modelVisible = true;
            this.targetUser = data;
        }
    }
};
</script>
<style lang='scss' scoped>
.contain {
  display: flex;
  flex: 1;
  flex-direction: column;
  padding: 10px;
}
.table {
  display: flex;
  flex-direction: column;
  align-self: center;
  width: 1000px;
  padding: 20px;
}
.addBtn {
  width: 60px;
}
.eltable {
  display: flex;
  align-self: center;
  flex: 1;
  margin-top: 10px;
}
</style>
