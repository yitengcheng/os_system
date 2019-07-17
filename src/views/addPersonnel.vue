<template>
  <div class="contain">
    <PageTitle label="添加人员" />
    <el-form class="formContain" :model="form" label-width="110px" label-position="right">
      <FormInput label="姓名" :form="form" value="name" @onChange="onChange" />
      <FormInput label="部门" :form="form" value="branch" @onChange="onChange" />
      <FormInput label="职位" :form="form" value="position" @onChange="onChange" />
      <FormInput label="联系方式" :form="form" value="phone" @onChange="onChange" />
      <FormInput label="登录系统用户名" :form="form" value="userName" @onChange="onChange" />
      <FormInput label="登录系统密码" :form="form" value="password" @onChange="onChange" />
      <FormRadio :checks="['男','女']" label="性别" :form="form" value="sex" @onChange="onChange" />
      <FormDateTime
        options="[]"
        label="生日"
        type="date"
        :form="form"
        value="birthday"
        @onChange="onChange"
      />
      <el-button type="success" class="submitBtn" @click="doSubmit">确认</el-button>
    </el-form>
  </div>
</template>

<script>
import FormInput from '../components/form/formInput';
import FormRadio from '../components/form/formRadio';
import FormDateTime from '../components/form/formDateTime';
import PageTitle from '../components/PageTitle';
export default {
    components: { PageTitle, FormInput, FormRadio, FormDateTime },
    data () {
        return {
            form: {
                name: '',
                branch: '',
                position: '',
                phone: '',
                userName: '',
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
        },
        doSubmit () {
            this.$router.back();
        }
    }
};
</script>
<style lang='scss' scoped>
.contain {
  display: flex;
  flex-direction: column;
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
  align-self: center;
  width: 300px;
}
</style>
