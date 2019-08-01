<template>
  <div class="contain">
    <PageTitle label="人员管理" />
    <div class="tableContain">
      <div>
        <el-button type="primary" class="addBtn" @click="addPerson">添加人员</el-button>
      </div>
      <ElTable :stripe="true" :border="true" :tableKey="labels" :tableData="tableData">
        <div slot-scope="data">
          <el-button @click.native.prevent="deleteRow(data.data.row)" type="text" size="small">移除</el-button>
        </div>
      </ElTable>
    </div>
  </div>
</template>

<script>
import ElTable from '../components/elComponent/el-table';
import PageTitle from '../components/PageTitle';
import { mapState } from 'vuex';
let educationBackground = ['高中', '中专', '大专', '本科', '硕士', '博士'];
let workStatus = ['无', '在职', '离职中', '离职'];
export default {
    components: { ElTable, PageTitle },
    data () {
        return {
            labels: [
                {
                    prop: 'branch',
                    label: '部门',
                    width: '130'
                },
                {
                    prop: 'position',
                    label: '级别',
                    width: '80'
                },
                {
                    prop: 'name',
                    label: '姓名',
                    width: '130'
                },
                {
                    prop: 'sex',
                    label: '性别',
                    width: '80'
                },
                {
                    prop: 'createTime',
                    label: '入职时间',
                    width: '130'
                },
                {
                    prop: 'email',
                    label: '电子邮箱',
                    width: '150'
                },
                {
                    prop: 'educationBackground',
                    label: '学历',
                    width: '130'
                },
                {
                    prop: 'restart',
                    label: '返聘',
                    width: '130'
                },
                {
                    prop: 'workStatus',
                    label: '工作状态',
                    width: '130'
                },
                {
                    label: '操作',
                    width: '180'
                }
            ],
            tableData: []
        };
    },
    computed: {
        ...mapState({
            user: state => state.user.user
        })
    },
    mounted () {
        this.getPersons();
    },
    methods: {
        getPersons () {
            this.tableData = [];
            this.$http.post('/api/getPersons').then(res => {
                let { success, msg, persons } = res;
                if (success) {
                    persons.forEach(person => {
                        this.tableData.push({
                            name: person.name,
                            sex: person.sex === '0' ? '男' : '女',
                            branch: person.branch.name,
                            position: person.position.position,
                            createTime: this.$moment(person.createTime).format('YYYY-MM-DD'),
                            email: person.email,
                            educationBackground:
                educationBackground[person.educationBackground] || '无',
                            restart: person.restart === '0' ? '是' : '否',
                            workStatus: workStatus[person.workStatus],
                            personId: person._id
                        });
                    });
                } else {
                    this.$alert(msg);
                }
            });
        },
        deleteRow (person) {
            this.$confirm('是否将此员工移除', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            })
                .then(() => {
                    this.$http
                        .post('/api/removePerson', {
                            personId: person.personId,
                            userId: this.user._id
                        })
                        .then(res => {
                            let { success, msg } = res;
                            if (success) {
                                this.$alert('已成功移除这个员工');
                                this.getPersons();
                            } else {
                                this.$alert(msg);
                            }
                        });
                })
                .catch(() => {});
        },
        addPerson () {
            this.$router.push({
                path: '/addPersonnel'
            });
        }
    }
};
</script>
<style lang='scss' scoped>
.contain {
  display: flex;
  flex: 1;
  flex-direction: column;
  justify-content: center;
  padding: 10px;
}
.addBtn {
  margin-bottom: 20px;
}
.tableContain {
  display: flex;
  flex-direction: column;
  align-self: center;
}
</style>
