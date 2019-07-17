<template>
  <div>
    <PageTitle label="添加人员" />
    <el-form
      class="formContain"
      :rules="rules"
      :model="form"
      label-width="110px"
      label-position="right"
    >
      <FormInput label="姓名" :form="form" value="name" @onChange="onChange" :rules="rules" />
    </el-form>
  </div>
</template>

<script>
import FormInput from '../components/form/formInput';
import PageTitle from '../components/PageTitle';
export default {
    components: { PageTitle, FormInput },
    data () {
        return {
            form: {
                name: '',
                branch: '',
                position: '',
                phone: '',
                password: '',
                sex: '',
                birthday: ''
            },
            rules: []
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
.formContain {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-self: center;
  width: 800px;
}
</style>
