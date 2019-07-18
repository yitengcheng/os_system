<template>
  <div class="contain">
    <PageTitle label="文件发布" />
    <el-form class="formContain" :model="form" label-width="110px" label-position="right">
      <FormInput label="标题" :form="form" value="title" @onChange="onChange" />
      <FormCheckbox
        label="抄送至"
        :checks="['行政部','物流管理部','招商部','财务部','全体员工']"
        :form="form"
        value="copyTo"
        @onChange="onChange"
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
      <FormUpload label="附件" listType="text" :form="form" value="file" @onChange="onChange"></FormUpload>
    </el-form>
  </div>
</template>

<script>
import PageTitle from '../components/PageTitle';
import FormInput from '../components/form/formInput';
import FormCheckbox from '../components/form/formCheckbox';
import FormUpload from '../components/form/formUpload';
export default {
    components: { PageTitle, FormInput, FormCheckbox, FormUpload },
    data () {
        return {
            form: {
                title: '',
                desc: '',
                copyTo: '',
                file: ''
            }
        };
    },
    computed: {},
    methods: {
        onChange (value, formType) {
            this.form[formType] = value;
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
</style>
