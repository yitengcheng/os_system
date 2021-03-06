<template>
  <div class="contain">
    <PageTitle label="车辆管理" />
    <div class="tableContain">
      <div class="titleContain">
        <div class="searchContain">
          <p>月份：</p>
          <el-date-picker v-model="date" type="month"></el-date-picker>
          <el-button type="primary" @click="getCarRecord" class="searchBtn">搜索</el-button>
          <download-excel
            class="downExcel"
            :data="tableData"
            :fields="json_fields"
            :title="excelTitle"
            worksheet="用车列表"
            name="用车列表.xls"
          >导出Excel</download-excel>
        </div>
        <el-button type="primary" @click="showModel('addModelFlag')">添加车辆</el-button>
        <el-button type="primary" @click="showModel('subscribeModelFlag')">预约使用车辆</el-button>
      </div>
      <ElTable :stripe="true" :border="true" :tableKey="labels" :tableData="tableData">
        <div slot-scope="data">
          <el-button
            v-if="data.data.row.status === '未完成'"
            @click.native.prevent="showConfirModel(data.data.row)"
            type="text"
            size="small"
          >确认公里数</el-button>
        </div>
      </ElTable>
    </div>
    <showModel
      title="添加车辆信息"
      :dialogVisible="addModelFlag"
      @close="closeModel('addModelFlag')"
      @doCancel="closeModel('addModelFlag')"
      @doConfirm="addCar"
    >
      <div slot="content">
        <el-form
          :model="carInfo"
          ref="carInfo"
          class="modelContain"
          :rules="addRules"
          label-width="100px"
          label-position="right"
        >
          <FormSelect
            label="部门"
            :form="carInfo"
            value="branchId"
            @onChange="getPersons"
            :options="branchList"
          />
          <FormSelect
            v-if="carInfo.branchId"
            label="员工"
            :form="carInfo"
            value="carOwner"
            @onChange="onChangeCarinfo"
            :options="personList"
          />
          <FormInput
            style="width:300px"
            label="车牌"
            :form="carInfo"
            value="plate"
            maxlength="7"
            @onChange="onChangeCarinfo"
          />
        </el-form>
      </div>
    </showModel>
    <showModel
      title="预约使用车辆"
      :dialogVisible="subscribeModelFlag"
      @close="closeModel('subscribeModelFlag')"
      @doCancel="closeModel('subscribeModelFlag')"
      @doConfirm="subscribeCar"
    >
      <div slot="content">
        <el-form
          :model="subscribeCarInfo"
          ref="subscribeCarInfo"
          class="modelContain"
          :rules="subscribeRules"
          label-width="100px"
          label-position="right"
        >
          <FormSelect
            label="车辆"
            :form="subscribeCarInfo"
            value="carId"
            @onChange="onChangeSubscribeinfo"
            :options="carList"
          />
          <FormInput
            style="width:300px"
            label="用途"
            :form="subscribeCarInfo"
            value="application"
            maxlength="30"
            @onChange="onChangeSubscribeinfo"
          />
          <FormDateTime
            label="预约时间"
            :form="subscribeCarInfo"
            value="serviceTime"
            @onChange="onChangeSubscribeinfo"
          />
        </el-form>
      </div>
    </showModel>
    <showModel
      title="确认公里数"
      :dialogVisible="confirmModelFlag"
      @close="closeModel('confirmModelFlag')"
      @doCancel="closeModel('confirmModelFlag')"
      @doConfirm="confirmMileage"
    >
      <div slot="content">
        <el-form
          :model="mileageInfo"
          ref="mileageInfo"
          class="modelContain"
          :rules="confirmRules"
          label-width="100px"
          label-position="right"
        >
          <FormInput
            label="起始公里数"
            :form="mileageInfo"
            value="startingKm"
            maxlength="7"
            @onChange="onChangeConfirminfo"
          />
          <FormInput
            label="结束公里数"
            :form="mileageInfo"
            value="endingKm"
            maxlength="7"
            @onChange="onChangeConfirminfo"
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
import FormDateTime from '../components/form/formDateTime';
import { mapState } from 'vuex';
export default {
    components: {
        PageTitle,
        ElTable,
        showModel,
        FormInput,
        FormDateTime,
        FormSelect
    },
    data () {
        let validatorIsvalidPlate = (rule, value, callback) => {
            if (value === '') {
                callback(new Error('请输入车牌号'));
            } else if (value.length !== 7) {
                callback(new Error('车牌号长度有误'));
            } else if (!this.$utils.isvalidPlate(value)) {
                callback(new Error('请输入正确车牌号'));
            } else {
                callback();
            }
        };
        let validatorIsInteger = (rule, value, callback) => {
            if (value === '') {
                callback(
                    new Error(
                        `请输入${rule.field === 'startingKm' ? '起始里程数' : '结束里程数'}`
                    )
                );
            } else if (!this.$utils.isInteger(value)) {
                callback(new Error('请输入正确的里程数'));
            } else {
                callback();
            }
        };
        return {
            labels: [
                {
                    prop: 'carOwner',
                    label: '车主',
                    width: '120'
                },
                {
                    prop: 'plate',
                    label: '车牌',
                    width: '120'
                },
                {
                    prop: 'application',
                    label: '用途',
                    width: '150'
                },
                {
                    prop: 'startingKm',
                    label: '起始里程数',
                    unit: 'km',
                    width: '120'
                },
                {
                    prop: 'endingKm',
                    label: '结束里程数',
                    unit: 'km',
                    width: '120'
                },
                {
                    prop: 'mileage',
                    label: '本次里程',
                    unit: 'km',
                    width: '120'
                },
                {
                    prop: 'expenseAccount',
                    label: '费用',
                    unit: '元',
                    width: '120'
                },
                {
                    prop: 'status',
                    label: '状态',
                    width: '120'
                },
                {
                    prop: 'serviceTime',
                    label: '预约时间',
                    width: '150'
                },
                {
                    label: '操作',
                    width: '150'
                }
            ],
            json_fields: {
                序号: 'serialNumber',
                车主: 'carOwner',
                车牌: 'plate',
                用途: 'application',
                起始公里: 'startingKm',
                结束公里: 'endingKm',
                本次里程: 'mileage',
                费用: 'expenseAccount',
                时间: 'serviceTime'
            },
            tableData: [],
            addModelFlag: false,
            subscribeModelFlag: false,
            confirmModelFlag: false,
            excelTitle: '',
            date: '',
            carInfo: {
                branchId: '',
                carOwner: '',
                plate: ''
            },
            subscribeCarInfo: {
                carId: '',
                application: '',
                serviceTime: ''
            },
            mileageInfo: {
                startingKm: '',
                endingKm: ''
            },
            branchList: [],
            personList: [],
            carList: [],
            targetRecord: {},
            addRules: {
                carOwner: [{ required: true, message: '请选择员工', trigger: 'blur' }],
                branchId: [{ required: true, message: '请选择部门', trigger: 'blur' }],
                plate: [
                    { required: true, validator: validatorIsvalidPlate, trigger: 'blur' }
                ],
                carModel: [{ required: true, message: '请输入车型', trigger: 'blur' }]
            },
            subscribeRules: {
                carId: [{ required: true, message: '请选择车辆', trigger: 'blur' }],
                application: [
                    { required: true, message: '请填写用途', trigger: 'blur' }
                ],
                serviceTime: [
                    { required: true, message: '请选择预约时间', trigger: 'blur' }
                ]
            },
            confirmRules: {
                startingKm: [
                    { required: true, validator: validatorIsInteger, trigger: 'blur' }
                ],
                endingKm: [
                    { required: true, validator: validatorIsInteger, trigger: 'blur' }
                ]
            }
        };
    },
    computed: {
        ...mapState({
            user: state => state.user.user
        })
    },
    mounted () {
        this.getCarRecord();
        this.getCar();
        this.getBranch();
    },
    methods: {
        getCar () {
            this.$http.post('/api/getCars', { userId: this.user._id }).then(res => {
                let { success, carList } = res;
                if (success) {
                    carList.forEach(item => {
                        this.carList.push({
                            label: `${item.carOwner} ${item.plate}`,
                            value: item.carId
                        });
                    });
                }
            });
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
        getPersons (value, formType) {
            this.personList = [];
            this.$http
                .post('/api/getPersonsForBranch', { branchId: value })
                .then(res => {
                    let { success, persons } = res;
                    this.carInfo[formType] = value;
                    if (success) {
                        persons.forEach(item => {
                            this.personList.push({ label: item.name, value: item._id });
                        });
                    }
                });
        },
        getCarRecord () {
            this.tableData = [];
            this.$http
                .post('/api/getCarRecord', { userId: this.user._id, date: this.date })
                .then(res => {
                    let { success, msg, carRecordList } = res;
                    if (success) {
                        carRecordList.forEach((item, index) => {
                            this.tableData.push({
                                serialNumber: index + 1,
                                carOwner: item.carOwner,
                                plate: item.plate,
                                carModel: item.carModel,
                                application: item.application,
                                startingKm: item.startingKm || 0,
                                endingKm: item.endingKm || 0,
                                mileage: item.mileage || 0,
                                expenseAccount: item.mileage ? item.mileage * 1 : 0,
                                status: item.status === '1' ? '未完成' : '完成',
                                serviceTime: item.serviceTime,
                                recordId: item.recordId
                            });
                        });
                        this.excelTitle = this.date
                            ? this.$moment(this.date).format('MM') + '月车辆使用记录表'
                            : '车辆使用记录表';
                    } else {
                        this.$alert(msg);
                    }
                });
        },
        onChangeCarinfo (value, formType) {
            this.carInfo[formType] = value;
        },
        onChangeSubscribeinfo (value, formType) {
            this.subscribeCarInfo[formType] = value;
        },
        onChangeConfirminfo (value, formType) {
            this.mileageInfo[formType] = value;
        },
        closeModel (model) {
            this[model] = false;
            this.$refs.carInfo && this.$refs.carInfo.resetFields();
            this.$refs.subscribeCarInfo && this.$refs.subscribeCarInfo.resetFields();
            this.$refs.mileageInfo && this.$refs.mileageInfo.resetFields();
        },
        showModel (model) {
            this[model] = true;
        },
        showConfirModel (carRecord) {
            this.confirmModelFlag = true;
            this.targetRecord = carRecord;
        },
        addCar () {
            this.$refs.carInfo.validate(valid => {
                if (valid) {
                    this.$http
                        .post('/api/addCar', {
                            userId: this.user._id,
                            car: this.carInfo
                        })
                        .then(res => {
                            let { msg, success } = res;
                            if (success) {
                                this.closeModel('addModelFlag');
                            } else {
                                this.$alert(msg);
                            }
                        });
                } else {
                    this.closeModel();
                    this.$alert('请注意核对信息');
                }
            });
        },
        subscribeCar () {
            this.$refs.subscribeCarInfo.validate(valid => {
                if (valid) {
                    this.$http
                        .post('/api/bookingOfVehicles', {
                            userId: this.user._id,
                            ...this.subscribeCarInfo
                        })
                        .then(res => {
                            let { msg, success } = res;
                            if (success) {
                                this.closeModel('subscribeModelFlag');
                                this.getCarRecord();
                            } else {
                                this.$alert(msg);
                            }
                        });
                } else {
                    this.$alert('请注意核对信息');
                }
            });
        },
        confirmMileage () {
            this.$refs.mileageInfo.validate(valid => {
                if (valid) {
                    this.$http
                        .post('/api/confirmMileage', {
                            userId: this.user._id,
                            recordId: this.targetRecord.recordId,
                            ...this.mileageInfo
                        })
                        .then(res => {
                            let { msg, success } = res;
                            if (success) {
                                this.closeModel('confirmModelFlag');
                                this.getCarRecord();
                            } else {
                                this.$alert(msg);
                            }
                        });
                } else {
                    this.$alert('请注意核对信息');
                }
            });
        }
    }
};
</script>
<style lang='scss' scoped>
@import "../assets/scss/baseAttribute";
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
.titleContain {
  margin-bottom: 10px;
  display: flex;
}
.modelContain {
  display: flex;
  flex-direction: column;
  align-items: center;
}
.searchContain {
  display: flex;
  flex: 1;
  flex-direction: row;
  align-items: center;
}
.searchBtn {
  margin-left: 10px;
}
.downExcel {
  margin-left: 20px;
  width: 80px;
  height: 30px;
  line-height: 30px;
  border: 1px solid $color-background;
  background-color: $color-background;
  color: #fff;
  font-size: 12px;
  text-align: center;
  border-radius: 3px;
}
</style>
