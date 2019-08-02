<template>
  <div class="contain">
    <PageTitle label="文件交换" />
    <div class="tableContain">
      <div class="buttonContain">
        <el-button type="primary" @click="showModel('sendModelFlag')">发送文件</el-button>
      </div>
      <ElTable :stripe="true" :border="true" :tableKey="labels" :tableData="tableData">
        <div slot-scope="data">
          <el-button
            v-for="(url,index) in data.data.row.filePath"
            :key="index"
            @click.native.prevent="downLoad(url)"
            type="text"
            size="small"
          >{{`附件${index+1}`}}</el-button>
        </div>
      </ElTable>
    </div>
    <showModel
      title="发送文件"
      :dialogVisible="sendModelFlag"
      @close="closeModel('sendModelFlag')"
      @doCancel="closeModel('sendModelFlag')"
      @doConfirm="sendToPerson"
    >
      <div slot="content">
        <el-form
          :model="sendFileInfo"
          ref="sendFileInfo"
          class="modelContain"
          :rules="sendRules"
          label-width="100px"
          label-position="right"
        >
          <FormSelect
            label="部门"
            :form="sendFileInfo"
            value="branchId"
            @onChange="getPersons"
            :options="branchList"
          />
          <FormSelect
            v-if="sendFileInfo.branchId"
            label="接收人"
            :form="sendFileInfo"
            value="toUserId"
            @onChange="onChange"
            :options="personList"
          />
          <FormInput
            label="标题"
            :form="sendFileInfo"
            value="title"
            maxlength="10"
            @onChange="onChange"
          />
          <FormInput
            label="描述"
            :form="sendFileInfo"
            value="desc"
            type="textarea"
            rows="3"
            :showWordLimit="true"
            maxlength="50"
            @onChange="onChange"
          />
          <FormUpload
            label="文件"
            value="filePath"
            :form="sendFileInfo"
            accept=".doc, .docx, .xlsx, .xls"
            listType="text"
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
import FormSelect from '../components/form/formSelect';
import FormUpload from '../components/form/formUpload';
import { mapState } from 'vuex';
export default {
    components: {
        PageTitle,
        ElTable,
        showModel,
        FormInput,
        FormSelect,
        FormUpload
    },
    data () {
        return {
            labels: [
                {
                    prop: 'title',
                    label: '标题',
                    width: '200'
                },
                {
                    prop: 'desc',
                    label: '描述',
                    width: '250'
                },
                {
                    prop: 'initiator',
                    label: '发送人',
                    width: '200'
                },
                {
                    label: '操作',
                    width: '200'
                }
            ],
            tableData: [],
            branchList: [],
            personList: [],
            sendModelFlag: false,
            sendFileInfo: {
                branchId: '',
                toUserId: '',
                title: '',
                desc: '',
                filePath: []
            },
            sendRules: {
                branchId: [{ required: true, message: '请选择部门', trigger: 'blur' }],
                toUserId: [
                    { required: true, message: '请选择接收人', trigger: 'blur' }
                ],
                title: [{ required: true, message: '请填写标题', trigger: 'blur' }],
                desc: [{ required: true, message: '请填写描述', trigger: 'blur' }],
                filePath: [
                    { required: true, message: '请选择上传文件', trigger: 'blur' }
                ]
            }
        };
    },
    mounted () {
        this.getBranch();
        this.getFileExchanges();
    },
    computed: {
        ...mapState({
            user: state => state.user.user
        })
    },
    methods: {
        getBranch () {
            this.$http.post('/api/getBranchs').then(res => {
                let { success, branchs } = res;
                if (success) {
                    branchs.forEach(item => {
                        this.branchList.push({ label: item.name, value: item._id });
                    });
                }
            });
        },
        getPersons (value, formType) {
            this.personList = [];
            this.$http
                .post('/api/getPersonsForBranch', { branchId: value })
                .then(res => {
                    let { success, persons } = res;
                    this.sendFileInfo[formType] = value;
                    if (success) {
                        persons.forEach(item => {
                            this.user._id !== item._id &&
                this.personList.push({ label: item.name, value: item._id });
                        });
                    }
                });
        },
        getFileExchanges () {
            this.$http
                .post('/api/getFileExchanges', { userId: this.user._id })
                .then(res => {
                    let { FileExchangeList, msg, success } = res;
                    if (success) {
                        this.tableData = FileExchangeList;
                    } else {
                        this.$alert(msg);
                    }
                });
        },
        onChange (value, formType) {
            this.sendFileInfo[formType] = value;
        },
        closeModel (model) {
            this[model] = false;
            this.$refs.sendFileInfo && this.$refs.sendFileInfo.resetFields();
        },
        showModel (model) {
            this[model] = true;
        },
        sendToPerson () {
            if (!this.user) {
                return this.$alert('请先登录账户');
            }
            this.$refs.sendFileInfo.validate(valid => {
                if (valid) {
                    this.$http
                        .post('/api/sendToUser', {
                            userId: this.user._id,
                            ...this.sendFileInfo
                        })
                        .then(res => {
                            let { success, msg } = res;
                            if (success) {
                                this.$alert('发送成功');
                                this.closeModel('sendModelFlag');
                            } else {
                                this.closeModel('sendModelFlag');
                                this.$alert(msg);
                            }
                        });
                } else {
                    this.$alert('请认真核对信息');
                }
            });
        },
        downLoad (file) {
            window.open(file.url);
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
  width: 400px;
  flex-direction: column;
}
</style>
