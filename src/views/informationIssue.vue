<template>
  <div class="contain">
    <PageTitle label="信息发布" />
    <el-form class="formContain" :model="form" label-width="110px" label-position="right">
      <FormInput label="标题" :form="form" value="title" @onChange="onChange" />
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
      <el-button class="confirmBtn" type="primary">确认发布</el-button>
    </el-form>
  </div>
</template>

<script>
import PageTitle from '../components/PageTitle';
import FormInput from '../components/form/formInput';
export default {
    components: { PageTitle, FormInput },
    data () {
        return {
            form: {
                title: '',
                desc: ''
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
.confirmBtn {
  width: 125px;
  height: 45px;
  align-self: center;
}
</style>
