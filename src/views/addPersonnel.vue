<template>
  <div class="contain">
    <PageTitle label="添加人员" />

    <el-form
      class="formContain"
      :model="form"
      ref="form"
      label-width="130px"
      label-position="right"
      :rules="rules"
    >
      <div class="selectModel">
        <el-radio v-model="identityFlag" :label="true">身份证扫描</el-radio>
        <el-radio v-model="identityFlag" :label="false">手动录入</el-radio>
      </div>
      <FormUpload
        v-if="identityFlag"
        label="身份证"
        :form="form"
        showList="hidden"
        value="identityImg"
        accept=".jpg, .png, .jpeg"
        @onChange="getIdentityInfo"
      />
      <FormInput
        :disabled="identityFlag"
        label="姓名"
        :form="form"
        value="name"
        @onChange="onChange"
        maxlength="5"
      />
      <FormSelect
        :options="branchList"
        label="部门"
        :form="form"
        value="branch"
        @onChange="onChange"
      />
      <FormSelect
        :options="positionList"
        label="级别"
        :form="form"
        value="position"
        @onChange="onChange"
      />
      <FormInput label="职务" :form="form" value="duty" @onChange="onChange" maxlength="10" />
      <FormInput
        :disabled="identityFlag"
        label="身份证"
        :form="form"
        value="identity"
        @onChange="onChange"
        maxlength="18"
      />
      <FormInput
        :disabled="identityFlag"
        label="户籍所在地"
        :form="form"
        value="censusRegisteruty"
        @onChange="onChange"
        maxlength="50"
      />
      <FormInput
        label="现居住地"
        :form="form"
        value="placeOfResidence"
        @onChange="onChange"
        maxlength="50"
      />
      <FormRadio
        label="婚姻状况"
        :checks="['未婚','已婚','离异','丧偶']"
        :form="form"
        value="maritalStatus"
        @onChange="onChange"
      />
      <FormInput label="电话" :form="form" value="phone" @onChange="onChange" maxlength="11" />
      <FormInput label="登录系统用户名" :form="form" value="userName" @onChange="onChange" maxlength="15" />
      <FormInput label="登录系统密码" :form="form" value="password" @onChange="onChange" maxlength="20" />
      <FormRadio
        :disabled="identityFlag"
        :checks="['男','女']"
        label="性别"
        :form="form"
        value="sex"
        @onChange="onChange"
      />
      <FormRadio
        :checks="['是','否']"
        label="是否入党"
        :form="form"
        value="hasPartyMember"
        @onChange="onChange"
      />
      <FormInput
        v-if="form.hasPartyMember === 0"
        label="所在党支部"
        :form="form"
        value="partyBranch"
        @onChange="onChange"
        maxlength="20"
      />
      <FormDateTime
        v-if="form.hasPartyMember === 0"
        options="[]"
        label="入党时间"
        type="date"
        :form="form"
        value="joinThePartyTime"
        @onChange="onChange"
      />
      <FormRadio
        :checks="['高中','中专','大专','本科','硕士','博士']"
        label="学历"
        :form="form"
        value="educationBackground"
        @onChange="onChange"
      />
      <FormRadio
        :checks="['是','否']"
        label="返聘人员"
        :form="form"
        value="restart"
        @onChange="onChange"
      />
      <FormDateTime
        :disabled="identityFlag"
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
import FormInput from "../components/form/formInput";
import FormRadio from "../components/form/formRadio";
import FormSelect from "../components/form/formSelect";
import FormDateTime from "../components/form/formDateTime";
import FormUpload from "../components/form/formUpload";
import PageTitle from "../components/PageTitle";
import { mapState } from "vuex";
export default {
    components: {
        PageTitle,
        FormInput,
        FormRadio,
        FormDateTime,
        FormSelect,
        FormUpload
    },
    data() {
        let validatorIsvalidPhone = (rule, value, callback) => {
            if (value === "") {
                callback(new Error("请输入手机号"));
            } else if (value.length !== 11) {
                callback(new Error("手机号长度有误"));
            } else if (!this.$utils.isvalidPhone(value)) {
                callback(new Error("请输入正确手机号"));
            } else {
                callback();
            }
        };
        let validatorJoinThePartyTime = (rule, value, callback) => {
            if (value === "" && this.form.hasPartyMember === 0) {
                callback(new Error("请选择入党时间"));
            } else {
                callback();
            }
        };
        let validatorIdentity = (rule, value, callback) => {
            if (value === "") {
                callback(new Error("请输入身份证号"));
            } else if (value.length !== 18) {
                callback(new Error("身份证号长度有误"));
            } else if (!this.$utils.isIdentityCode(value)) {
                callback(new Error("请输入正确身份证号"));
            } else {
                callback();
            }
        };
        let validatorPartyBranch = (rule, value, callback) => {
            if (value === "" && this.form.hasPartyMember === 0) {
                callback(new Error("请填写所在党支部"));
            } else {
                callback();
            }
        };
        return {
            identityFlag: true,
            form: {
                identityImg: [],
                name: "",
                branch: "",
                position: "",
                phone: "",
                duty: "",
                identity: "",
                censusRegisteruty: "",
                placeOfResidence: "",
                maritalStatus: 0,
                hasPartyMember: 1,
                joinThePartyTime: "",
                partyBranch: "",
                userName: "",
                password: "",
                sex: 0,
                educationBackground: 2,
                restart: 1,
                birthday: ""
            },
            rules: {
                name: [{ required: true, message: "请输入姓名", trigger: "blur" }],
                branch: [{ required: true, message: "请选择部门", trigger: "blur" }],
                position: [{ required: true, message: "请选择级别", trigger: "blur" }],
                duty: [{ required: true, message: "请输入职务", trigger: "blur" }],
                identity: [
                    { required: true, validator: validatorIdentity, trigger: "blur" }
                ],
                censusRegisteruty: [
                    { required: true, message: "请输入户籍所在地", trigger: "blur" }
                ],
                placeOfResidence: [
                    { required: true, message: "请输入现居住地", trigger: "blur" }
                ],
                maritalStatus: [
                    { required: true, message: "请选择婚姻状况", trigger: "blur" }
                ],
                hasPartyMember: [
                    { required: true, message: "请选择是否入党", trigger: "blur" }
                ],
                joinThePartyTime: [
                    { validator: validatorJoinThePartyTime, trigger: "blur" }
                ],
                partyBranch: [{ validator: validatorPartyBranch, trigger: "blur" }],
                phone: [
                    { required: true, validator: validatorIsvalidPhone, trigger: "blur" }
                ],
                userName: [
                    { required: true, message: "请输入登录系统账户", trigger: "blur" }
                ],
                password: [
                    { required: true, message: "请输入登录系统密码", trigger: "blur" }
                ],
                sex: [{ required: true, message: "请选择性别", trigger: "blur" }],
                educationBackground: [
                    { required: true, message: "请选择学历", trigger: "blur" }
                ],
                restart: [
                    { required: true, message: "请选择是否为返聘人员", trigger: "blur" }
                ],
                birthday: [{ required: true, message: "请选择生日", trigger: "blur" }]
            },
            branchList: [],
            positionList: []
        };
    },
    computed: {
        ...mapState({
            user: state => state.user.user
        })
    },
    mounted() {
        this.$http.post("/api/getBranchs").then(res => {
            let { success, branchs } = res;
            if (success) {
                branchs.forEach(item => {
                    this.branchList.push({ label: item.name, value: item._id });
                });
            }
        });
        this.$http.post("/api/getPositions").then(res => {
            let { success, positions } = res;
            if (success) {
                positions.forEach(item => {
                    this.positionList.push({ label: item.position, value: item._id });
                });
            }
        });
    },
    methods: {
        onChange(value, formType) {
            this.form[formType] = value;
        },
        getIdentityInfo(value) {
            let file = value[value.length - 1];
            this.$http
                .post("/api/getIdentityInfo", { file, userId: this.user._id })
                .then(res => {
                    let { success, msg, data } = res;
                    if (success) {
                        let { name, address, birthday, sex, identity } = data;
                        this.form["name"] = name;
                        this.form["identity"] = identity;
                        this.form["censusRegisteruty"] = address;
                        this.form["birthday"] = birthday;
                        this.form["sex"] = sex;
                    } else {
                        this.$alert(msg);
                    }
                });
        },
        doSubmit() {
            this.$refs.form.validate(valid => {
                if (valid) {
                    this.$http
                        .post("/api/addPerson", { user: this.form, userId: this.user._id })
                        .then(res => {
                            let { success, msg } = res;
                            if (success) {
                                this.$confirm("创建成功,点击确定回到上一页面", "提示", {
                                    confirmButtonText: "确定",
                                    type: "success"
                                })
                                    .then(() => {
                                        this.$router.back();
                                    })
                                    .catch(() => {});
                            } else {
                                this.$alert(msg);
                            }
                        });
                } else {
                    this.$alert("请认真核对信息");
                }
            });
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
.selectModel {
  display: flex;
  flex: 1;
  align-self: center;
  align-items: center;
  justify-items: center;
  margin-bottom: 20px;
}
</style>
