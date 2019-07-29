<template>
  <div class="contain">
    <PageTitle label="日程安排" />
    <el-calendar class="item">
      <!-- 这里使用的是 2.5 slot 语法，对于新项目请使用 2.6 slot 语法-->
      <template slot="dateCell" slot-scope="{date, data}" @onClick="test">
        <el-button
          :class="data.isSelected ? 'is-selected' : ''"
          @click.native.prevent="test(data)"
        >{{ data.day.split('-').slice(1).join('-') }}</el-button>
        <div v-for="(item,index) in schedule" :key="index">
          <div
            v-if="data.day === item.date"
            class="info"
          >{{data.day === item.date ? item.planList[0].desc : ''}}</div>
          <el-button
            v-if="data.day === item.date"
            class="look-info"
            type="text"
            @click.native.prevent="lookInfo(item)"
          >{{data.day === item.date ? '详情':''}}</el-button>
        </div>
      </template>
    </el-calendar>
    <showModel
      title="添加日程"
      :dialogVisible="ModelVisible"
      @close="closeModel(true)"
      @doCancel="closeModel(true)"
      @doConfirm="doConfirm"
    >
      <div slot="content">
        <el-input
          class="input"
          :autosize="{ minRows: 7, maxRows: 7}"
          maxlength="200"
          show-word-limit
          type="textarea"
          resize="none"
          v-model="input"
          placeholder="请输入留言"
        ></el-input>
      </div>
    </showModel>
  </div>
</template>

<script>
import PageTitle from '../components/PageTitle';
import showModel from '../components/showModel';
import FormInput from '../components/form/formInput';
import { mapState } from 'vuex';

export default {
    components: { PageTitle, showModel, FormInput },
    data () {
        return {
            ModelVisible: false,
            input: '',
            schedule: '',
            date: ''
        };
    },
    computed: {
        ...mapState({
            user: state => state.user.user
        })
    },
    mounted () {
        this.getschedule();
    },
    methods: {
        test (data) {
            this.ModelVisible = true;
            this.date = data.day;
        },
        getschedule () {
            this.$http
                .post('/api/getSchedule', { userId: this.user._id })
                .then(res => {
                    let { success, msg, scheduleList } = res;
                    if (success) {
                        this.schedule = scheduleList;
                    } else {
                        this.$alert(msg);
                    }
                });
        },
        doConfirm () {
            this.$http
                .post('/api/addSchedule', {
                    userId: this.user._id,
                    date: this.date,
                    desc: this.input
                })
                .then(res => {
                    let { success, msg } = res;
                    if (success) {
                        this.$alert('添加成功');
                        this.date = '';
                        this.input = '';
                        this.ModelVisible = false;
                        this.getschedule();
                    } else {
                        this.$alert(msg);
                    }
                });
        },
        lookInfo (data) {
            this.$alert(data.planList[0].desc);
        },
        closeModel () {
            this.ModelVisible = false;
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
.item {
  flex-direction: column;
}
.info {
  width: 100px;
  word-break: keep-all;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  margin-top: 5px;
}
.look-info {
  float: right;
}
.is-selected {
  color: #1989fa;
}
.input {
  height: 145px;
  width: 500px;
}
</style>
