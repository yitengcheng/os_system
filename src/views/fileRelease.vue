<template>
  <div class="contain">
    <PageTitle label="文件发布" />
    <el-form
      class="formContain"
      ref="form"
      :model="form"
      :rules="rules"
      label-width="110px"
      label-position="right"
    >
      <FormInput label="标题" :form="form" value="title" @onChange="onChange" maxlength="10" />
      <FormSelect
        :options="branchList"
        label="抄送至"
        :form="form"
        value="copyTo"
        @onChange="onChange"
        :multiple="true"
      />
      <FormInput
        type="textarea"
        maxlength="30"
        :showWordLimit="true"
        :autosize="{ minRows: 6, maxRows: 6 }"
        label="描述"
        :form="form"
        value="desc"
        resize="none"
        @onChange="onChange"
      />
      <FormUpload
        label="附件"
        listType="text"
        :form="form"
        value="file"
        @onChange="onChange"
        accept=".doc, .docx"
      ></FormUpload>
      <el-button type="primary" class="submitBtn" @click="doSubmit">确认发文</el-button>
    </el-form>
  </div>
</template>

<script>
import PageTitle from '../components/PageTitle';
import FormInput from '../components/form/formInput';
import FormSelect from '../components/form/formSelect';
import FormUpload from '../components/form/formUpload';
import { mapState } from 'vuex';
export default {
    components: { PageTitle, FormInput, FormSelect, FormUpload },
    data () {
        return {
            form: {
                title: '',
                desc: '',
                copyTo: [],
                file: []
            },
            rules: {
                title: [{ required: true, message: '请填写标题', trigger: 'blur' }],
                desc: [{ required: true, message: '请填写描述', trigger: 'blur' }],
                copyTo: [
                    {
                        required: true,
                        message: '请选择抄送至哪个部门',
                        trigger: 'change'
                    }
                ],
                file: [{ required: true, message: '请上传附件', trigger: 'blur' }]
            },
            branchList: []
        };
    },
    computed: {
        ...mapState({
            user: state => state.user.user
        })
    },
    mounted () {
        this.getBranch();
    },
    methods: {
        onChange (value, formType) {
            this.form[formType] = value;
            console.log(this.form);
        },
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
        doSubmit () {
            this.$refs.form.validate(valid => {
                if (valid) {
                    this.$http
                        .post('/api/profileRelease', {
                            userId: this.user._id,
                            profile: this.form
                        })
                        .then(res => {
                            let { success, msg } = res;
                            if (success) {
                                this.$alert('发布成功');
                                this.$refs.form && this.$refs.form.resetFields();
                            } else {
                                this.$alert(msg);
                            }
                        });
                } else {
                    this.$alert('请认真核对信息');
                }
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
.formContain {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-self: center;
  width: 800px;
}
.submitBtn {
  display: flex;
  align-self: center;
  justify-content: center;
  width: 125px;
}
</style>
