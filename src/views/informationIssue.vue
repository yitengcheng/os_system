<template>
  <div class="contain">
    <PageTitle label="信息发布" />
    <el-form
      class="formContain"
      ref="form"
      :model="form"
      label-width="110px"
      label-position="right"
      :rules="rules"
    >
      <FormInput label="标题" :form="form" value="title" @onChange="onChange" maxlength="10" />
      <FormInput
        type="textarea"
        maxlength="200"
        :showWordLimit="true"
        :autosize="{ minRows: 6, maxRows: 6 }"
        label="正文"
        :form="form"
        value="desc"
        resize="none"
        @onChange="onChange"
      />
      <el-button class="confirmBtn" type="primary" @click="sent">确认发布</el-button>
    </el-form>
  </div>
</template>

<script>
import PageTitle from '../components/PageTitle';
import FormInput from '../components/form/formInput';
import { mapState } from 'vuex';
export default {
    components: { PageTitle, FormInput },
    data () {
        return {
            rules: {
                title: { required: true, message: '请填写标题', trigger: 'blur' },
                desc: { required: true, message: '请填写正文', trigger: 'blur' }
            },
            form: {
                title: '',
                desc: ''
            }
        };
    },
    computed: {
        ...mapState({
            user: state => state.user.user
        })
    },
    methods: {
        onChange (value, formType) {
            this.form[formType] = value;
        },
        sent () {
            if (!this.user._id) {
                this.$alert('请先登录');
                return;
            }
            this.$refs.form.validate(valid => {
                if (valid) {
                    this.$http
                        .post('/api/informationIssue', {
                            information: this.form,
                            userId: this.user._id
                        })
                        .then(res => {
                            let { success, msg } = res;
                            if (success) {
                                this.$refs.form.resetFields();
                                this.$alert('发布成功');
                            } else {
                                this.$alert(msg);
                            }
                        });
                } else {
                    this.$alert('信息填写有误，请重新填写');
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
.confirmBtn {
  width: 125px;
  height: 45px;
  align-self: center;
}
</style>
