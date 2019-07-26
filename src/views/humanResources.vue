<template>
  <div class="contain">
    <PageTitle label="人力资源管理" />
    <ElTable class="table" :stripe="true" :border="true" :tableKey="labels" :tableData="tableData">
      <div slot-scope="data">
        <el-button
          @click.native.prevent="showAdjust(data.data.$index, data.data.row)"
          type="text"
          size="small"
        >岗位调整</el-button>
        <el-button
          v-if="data.data.row.workStatus === '在职'"
          @click.native.prevent="applyForLeave(data.data.$index, data.data.row)"
          type="text"
          size="small"
        >申请离职</el-button>
        <el-button
          v-if="data.data.row.workStatus === '离职中'"
          @click.native.prevent="confirmLeave(data.data.$index, data.data.row)"
          type="text"
          size="small"
        >确认离职</el-button>
      </div>
    </ElTable>
    <showModel
      title="岗位调整"
      :dialogVisible="adjustFlag"
      @close="closeModel"
      @doCancel="closeModel"
      @doConfirm="adjustPosition"
    >
      <div slot="content">
        <el-form :model="adjust" ref="adjust" class="adjustContain" :rules="rules">
          <FormSelect
            :options="branchList"
            label="部门"
            :form="adjust"
            value="branchId"
            @onChange="onChange"
          />
          <FormSelect
            :options="positionList"
            label="职位"
            :form="adjust"
            value="positionId"
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
import showModel from '../components/showModel';
import FormSelect from '../components/form/formSelect';
export default {
    components: { PageTitle, ElTable, showModel, FormSelect },
    data () {
        return {
            labels: [
                {
                    prop: 'branch',
                    label: '部门',
                    width: '150'
                },
                {
                    prop: 'position',
                    label: '职位',
                    width: '150'
                },
                {
                    prop: 'name',
                    label: '姓名',
                    width: '150'
                },
                {
                    prop: 'sex',
                    label: '性别',
                    width: '150'
                },
                {
                    prop: 'age',
                    label: '年龄',
                    width: '150'
                },
                {
                    prop: 'workStatus',
                    label: '状态',
                    width: '150'
                },
                {
                    label: '操作',
                    width: '200'
                }
            ],
            tableData: [],
            adjustFlag: false,
            targetUser: {},
            adjust: {
                branchId: '',
                positionId: ''
            },
            rules: {
                branchId: [{ required: true, message: '请选择部门', trigger: 'blur' }],
                positionId: [{ required: true, message: '请选择职位', trigger: 'blur' }]
            },
            branchList: [],
            positionList: []
        };
    },
    mounted () {
        this.getPerson();
        this.getBranchs();
        this.getPositions();
    },
    methods: {
        getBranchs () {
            this.$http.post('/api/getBranchs').then(res => {
                let { success, branchs } = res;
                if (success) {
                    branchs.forEach(item => {
                        this.branchList.push({ label: item.name, value: item._id });
                    });
                }
            });
        },
        getPositions () {
            this.$http.post('/api/getPositions').then(res => {
                let { success, positions } = res;
                if (success) {
                    positions.forEach(item => {
                        this.positionList.push({ label: item.position, value: item._id });
                    });
                }
            });
        },
        onChange (value, formType) {
            this.adjust[formType] = value;
        },
        getPerson () {
            this.$http.post('/api/getPersons').then(res => {
                let { success, msg, persons } = res;
                if (success) {
                    this.tableData = [];
                    persons.forEach(person => {
                        this.tableData.push({
                            name: person.name,
                            branch: person.branch.name,
                            position: person.position.position,
                            sex: person.sex === '0' ? '男' : '女',
                            age: this.$utils.getAge(person.birthday),
                            workStatus: person.workStatus === '1' ? '在职' : '离职中',
                            id: person._id
                        });
                    });
                } else {
                    this.$alert(msg);
                }
            });
        },
        closeModel () {
            this.adjustFlag = false;
        },
        showAdjust (index, user) {
            this.targetUser = user;
            this.adjustFlag = true;
        },
        adjustPosition () {
            this.$refs.adjust.validate(valid => {
                if (valid) {
                    this.$http
                        .post('/api/postAdjustment', {
                            targetId: this.targetUser.id,
                            ...this.adjust
                        })
                        .then(res => {
                            let { msg, success } = res;
                            this.$refs.adjust.resetFields();
                            if (success) {
                                this.closeModel();
                                this.getPerson();
                            } else {
                                this.$alert(msg);
                            }
                        });
                } else {
                    this.closeModel();
                    this.$refs.adjust && this.$refs.adjust.resetFields();
                    this.$alert('请注意核对信息');
                }
            });
        },
        applyForLeave (index, user) {
            this.$http.post('/api/applyForLeave', { targetId: user.id }).then(res => {
                let { msg, success } = res;
                success ? this.getPerson() : this.$alert(msg);
            });
        },
        confirmLeave (index, user) {
            this.$http.post('/api/confirmLeave', { targetId: user.id }).then(res => {
                let { msg, success } = res;
                success ? this.getPerson() : this.$alert(msg);
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
.table {
  display: flex;
  align-self: center;
}
.adjustContain {
  display: flex;
  align-items: center;
  flex-direction: column;
}
</style>
