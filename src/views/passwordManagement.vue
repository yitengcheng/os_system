<template>
  <div class="contain">
    <PageTitle label="密码管理" />
    <div class="tableContain">
      <div class="buttonContain">
        <el-button type="primary" @click="showModel('addModelFlag')">添加账号信息</el-button>
      </div>
      <ElTable :stripe="true" :border="true" :tableKey="labels" :tableData="tableData">
        <div slot-scope="data">
          <el-button
            @click.native.prevent="showModel('addModelFlag',data.data.row)"
            type="text"
            size="small"
          >编辑</el-button>
          <el-button
            @click.native.prevent="deleteAccount(data.data.row)"
            type="text"
            size="small"
          >删除</el-button>
        </div>
      </ElTable>
    </div>
    <showModel
      title="账户信息"
      :dialogVisible="addModelFlag"
      @close="closeModel('addModelFlag')"
      @doCancel="closeModel('addModelFlag')"
      @doConfirm="accountAddAndUpdate"
    >
      <div slot="content">
        <el-form
          :model="accountInfo"
          ref="accountInfo"
          class="modelContain"
          :rules="addRules"
          label-width="100px"
          label-position="right"
        >
          <FormInput
            label="描述"
            :form="accountInfo"
            value="desc"
            maxlength="15"
            @onChange="onChange"
          />
          <FormInput
            label="账号"
            :form="accountInfo"
            value="accountNumber"
            maxlength="20"
            @onChange="onChange"
          />
          <FormInput
            label="密码"
            :form="accountInfo"
            value="accountPassword"
            maxlength="20"
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
import FormInput from '../components/form/formInput';
import { mapState } from 'vuex';
export default {
    components: {
        PageTitle,
        ElTable,
        showModel,
        FormInput
    },
    data () {
        return {
            labels: [
                {
                    prop: 'desc',
                    label: '描述',
                    width: '150'
                },
                {
                    prop: 'accountNumber',
                    label: '账号',
                    width: '200'
                },
                {
                    prop: 'accountPassword',
                    label: '密码',
                    width: '200'
                },
                {
                    prop: 'createTime',
                    label: '日期',
                    width: '200'
                },
                {
                    label: '操作',
                    width: '200'
                }
            ],
            addModelFlag: false,
            accountInfo: {
                desc: '',
                accountNumber: '',
                accountPassword: ''
            },
            addRules: {
                desc: [{ required: true, message: '请填写描述', trigger: 'blur' }],
                accountNumber: [
                    { required: true, message: '请填写账号', trigger: 'blur' }
                ],
                accountPassword: [
                    { required: true, message: '请填写密码', trigger: 'blur' }
                ]
            },
            tableData: []
        };
    },
    mounted () {
        this.getAccount();
    },
    computed: {
        ...mapState({
            user: state => state.user.user
        })
    },
    methods: {
        showModel (model, targetAccount) {
            this[model] = true;
            targetAccount
                ? (this.accountInfo = targetAccount)
                : (this.accountInfo = {});
        },
        closeModel (model) {
            this[model] = false;
        },
        onChange (value, formType) {
            this.accountInfo[formType] = value;
        },
        getAccount () {
            this.tableData = [];
            this.$http
                .post('/api/getPassword', { userId: this.user._id })
                .then(res => {
                    let { success, msg, passwordList } = res;
                    if (success) {
                        this.tableData = passwordList;
                    }
                });
        },
        accountAddAndUpdate () {
            this.$refs.accountInfo.validate(valid => {
                if (valid) {
                    let url = this.accountInfo.accountId
                        ? '/api/updatePassword'
                        : '/api/addPassword';
                    let tip = this.accountInfo.accountId ? '修改成功' : '添加成功';
                    this.$http
                        .post(url, {
                            userId: this.user._id,
                            ...this.accountInfo
                        })
                        .then(res => {
                            let { success, msg } = res;
                            this.$refs.accountInfo && this.$refs.accountInfo.resetFields();
                            this.closeModel('addModelFlag');
                            this.$alert(tip);
                            this.getAccount();
                        });
                } else {
                    this.$alert('请认真核对信息');
                }
            });
        },
        deleteAccount (account) {
            this.$confirm(`是否删除账号：${account.accountNumber}`, '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            })
                .then(() => {
                    this.$http
                        .post('/api/removePassword', {
                            userId: this.user._id,
                            accountId: account.accountId
                        })
                        .then(res => {
                            let { success, msg } = res;
                            if (success) {
                                this.getAccount();
                            } else {
                                this.$alert(msg);
                            }
                        });
                })
                .catch(() => {});
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
.tableContain {
  display: flex;
  align-self: center;
  flex-direction: column;
}
.buttonContain {
  margin-bottom: 10px;
  display: flex;
  justify-content: flex-end;
}
.modelContain {
  display: flex;
  flex-direction: column;
  align-items: center;
}
</style>
