<template>
  <div class="contain">
    <PageTitle label="考勤" />
    <div class="searchContain">
      <p class="label">月份：</p>
      <el-date-picker v-model="date" type="month"></el-date-picker>
      <el-button @click="getAttendance" class="searchBtn" type="primary">查询</el-button>
    </div>
    <el-calendar v-if="dataList.length !== 0" v-model="month">
      <template slot="dateCell" slot-scope="{date, data}">
        <p>{{ data.day.split('-').slice(1).join('-') }}</p>
        <div v-for="(item,index) in dataList" :key="index">
          <div v-if="_.isArray(item.clockIn)">
            <p class="itemText">
              {{$moment(data.day).format('YYYY-MM-DD') === $moment(item.date).format('YYYY-MM-DD') ?
              item.clockIn[0].trim() ? '上班：' + item.clockIn[0] : '上班未打卡':''}}
            </p>
            <p class="itemText">
              {{$moment(data.day).format('YYYY-MM-DD') === $moment(item.date).format('YYYY-MM-DD') ?
              item.clockIn[1].trim() ? '下班：' + item.clockIn[1] : '下班未打卡':''}}
            </p>
          </div>
          <p
            v-else
          >{{$moment(data.day).format('YYYY-MM-DD') === $moment(item.date).format('YYYY-MM-DD')?item.clockIn:''}}</p>
        </div>
      </template>
    </el-calendar>
    <div v-else class="noData">
      <icon name="暂无数据" w="150px" h="150px" />
    </div>
  </div>
</template>

<script>
import PageTitle from '../components/PageTitle';
import { mapState } from 'vuex';
export default {
    components: { PageTitle },
    data () {
        return {
            dataList: [],
            date: '',
            month: ''
        };
    },
    computed: {
        ...mapState({
            user: state => state.user.user
        })
    },
    methods: {
        getAttendance () {
            this.$http
                .post('/api/getAttendance', {
                    date: this.date,
                    userId: this.user._id
                })
                .then(res => {
                    let { success, msg, clockInList } = res;
                    if (success) {
                        let data = [];
                        this.month = this.$moment(this.date).format('YYYY-MM');
                        clockInList.forEach(item => {
                            data.push({
                                date: this.month + '-' + item.date,
                                clockIn: this._.isArray(item.clockIn)
                                    ? item.clockIn[0].split('\n')
                                    : item.clockIn
                            });
                        });
                        this.dataList = data;
                    } else {
                        this.$alert(msg);
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
.searchContain {
  display: flex;
  flex-direction: row;
  align-self: center;
  justify-content: center;
  align-items: center;
  margin-bottom: 10px;
}
.label {
  width: 50px;
}
.searchBtn {
  margin-left: 20px;
}
.noData {
  display: flex;
  align-self: center;
}
.itemText {
  line-height: 20px;
}
</style>
