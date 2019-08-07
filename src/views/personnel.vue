<template>
  <div class="contain">
    <PageTitle label="人员管理" />
    <div class="tableContain">
      <div class="buttonContain">
        <el-button type="primary" class="addBtn" @click="addPerson">添加人员</el-button>
        <download-excel
          class="downExcel"
          :data="tableData"
          :fields="json_fields"
          title="贵州亿隆和泰物流有限公司员工基本信息"
          worksheet="员工列表"
          name="员工列表.xls"
        >导出Excel</download-excel>
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
let workStatus = ['实习', '在职', '离职中', '离职'];
let maritalStatus = ['未婚', '已婚', '离异', '丧偶'];
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
                    prop: 'duty',
                    label: '职务',
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
            tableData: [],
            json_fields: {
                序号: 'serialNumber',
                姓名: 'name',
                性别: 'sex',
                生日: 'birthday',
                身份证: 'identity',
                学历: 'educationBackground',
                婚姻状况: 'maritalStatus',
                户籍所在地: 'censusRegisteruty',
                职务: 'duty',
                现居住地: 'placeOfResidence',
                联系电话: 'phone',
                是否党员: 'hasPartyMember',
                入党时间: 'joinThePartyTime',
                所在党支部: 'partyBranch'
            },
            json_meta: [
                [
                    {
                        key: 'charset',
                        value: 'utf-8'
                    }
                ]
            ]
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
                    persons.forEach((person, index) => {
                        this.tableData.push({
                            serialNumber: index + 1,
                            name: person.name,
                            sex: person.sex === '0' ? '男' : '女',
                            birthday: this.$moment(person.birthday).format('YYYY-MM-DD'),
                            identity: person.identity || '无',
                            educationBackground:
                educationBackground[person.educationBackground] || '无',
                            maritalStatus: maritalStatus[person.maritalStatus * 1],
                            censusRegisteruty: person.censusRegisteruty,
                            duty: person.duty,
                            placeOfResidence: person.placeOfResidence,
                            phone: person.phone,
                            hasPartyMember: person.hasPartyMember === '0' ? '是' : '否',
                            joinThePartyTime: person.joinThePartyTime || '无',
                            partyBranch: person.partyBranch || '无',
                            branch: person.branch.name,
                            position: person.position.position,
                            createTime: this.$moment(person.createTime).format('YYYY-MM-DD'),
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
@import "../assets/scss/baseAttribute.scss";
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
.buttonContain {
  display: flex;
  flex-direction: row;
}
.downExcel {
  margin-left: 20px;
  width: 80px;
  height: 30px;
  line-height: 30px;
  border: 1px solid $color-background;
  background-color: $color-background;
  color: #fff;
  font-size: 12px;
  text-align: center;
  border-radius: 3px;
}
</style>
