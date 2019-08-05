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
      :dialogVisible="ModelVisible"
      @close="closeModel(true)"
      @doCancel="closeModel(true)"
      @doConfirm="doConfirm"
    >
      <div slot="content">
        <el-form class="formContain" :model="persons.permissionList" ref="persons">
          <FormSelect
            :options="persons.permissionList"
            label="权限"
            :form="persons.permissionList"
            value="position"
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
    accessManager: 'accessManager',
    personnel: '人员管理的权限',
    authority: '权限管理',
    filesUpload: '文件发布的权限',
    information: 'information',
    officeSupplies: '办公用品管理的权限',
    HRM: '人力资源管理的权限',
    conferenceRoom: '会议室管理的权限',
    carManagement: 'carManagement'
};
export default {
    components: { PageTitle, ElTable, showModel, FormSelect },
    data () {
        return {
            ModelVisible: false,
            persons: [
                {
                    name: '范泽华',
                    branch: '电子商务',
                    position: '四级',
                    _id: '4231423214',
                    permissionList: { label: Map['admin'], value: 'dsfsdfds' }
                }
            ],
            noSelf: true,
            tableKey: [
                { prop: 'name', label: '姓名', width: '150' },
                { prop: 'branch', label: '部门', width: '150' },
                { prop: 'position', label: '职位', width: '150' },
                { prop: 'permissions', label: '权限', width: '500' },
                { label: '操作', width: '150' }
            ]
        };
    },
    mounted () {
    // this.getPersons();
    },
    computed: {
        ...mapState({
            user: state => state.user.user
        })
    },
    methods: {
        closeModel () {
            this.ModelVisible = false;
        },
        onChange (value, formType) {
            this.persons[formType] = value;
        },
        doConfirm () {},
        getPersons () {
            this.$http.post('/api/getPersons').then(res => {
                let { success, msg, persons } = res;
                if (success) {
                    let tmp = {};
                    let a = [];
                    this.user._id = this.user._id;
                    persons.forEach(item => {
                        if (item._id !== this.user._id) {
                            tmp.name = item.name;
                            tmp.branch = item.branch.name;
                            tmp.position = item.position.position;
                            tmp._id = item._id;
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
        edit (data) {
            console.log('-=-=', data);
            this.ModelVisible = true;
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
