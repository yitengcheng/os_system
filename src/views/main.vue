<template>
  <div>
    <div class="companyInfoContain">
      <div class="companyItem">
        <icon name="职员" w="150px" h="150px" />
        <div class="infoContain">
          <p class="infoTitle">总人数</p>
          <p class="info">50人</p>
        </div>
      </div>
      <div class="companyItem">
        <icon name="男毕业生" w="150px" h="150px" />
        <div class="infoContain">
          <p class="infoTitle">研究生以上学历</p>
          <p class="info">30人</p>
        </div>
      </div>
      <div class="companyItem">
        <icon name="老人" w="150px" h="150px" />
        <div class="infoContain">
          <p class="infoTitle">返聘人数</p>
          <p class="info">10人</p>
        </div>
      </div>
      <div class="companyItem">
        <icon name="留言板" w="150px" h="150px" />
        <div class="infoContain">
          <p class="infoTitle">留言板</p>
          <p class="info">10条</p>
        </div>
      </div>
      <div class="companyItem">
        <icon name="文件" w="150px" h="150px" />
        <div class="infoContain">
          <p class="infoTitle">公司发文</p>
          <p class="info">20份</p>
        </div>
      </div>
    </div>
    <div class="wordCloudContain">
      <WordCloud></WordCloud>
      <v-chart :options="option"></v-chart>
    </div>
    <showModel
      title=" "
      :dialogVisible="ModelVisible"
      @close="closeModel(true)"
      @doConfirm="closeModel(true)"
      confirm="关闭"
      :hiddenCancel="true"
    >
      <div slot="content" class="class-info">
        <h1 class="class-title">{{information.title}}</h1>
        <p class="class-desc">
          <span class="class-space"></span>
          {{information.desc}}
        </p>
        <div class="class-author">{{information.author}}</div>
        <div class="class-createTime">{{information.createTime}}</div>
      </div>
    </showModel>
  </div>
</template>

<script>
import WordCloud from '../components/WordCloud';
import showModel from '../components/showModel';
import { mapState } from 'vuex';
export default {
    components: { WordCloud, showModel },
    data () {
        return {
            ModelVisible: false,
            information: {
                title: '',
                desc: '',
                createTime: '',
                author: ''
            },
            option: {
                color: ['#3398DB'],
                tooltip: {
                    trigger: 'axis',
                    axisPointer: {
                        type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
                    }
                },
                grid: {
                    left: '3%',
                    right: '4%',
                    bottom: '3%',
                    containLabel: true
                },
                xAxis: [
                    {
                        type: 'category',
                        axisLabel: { interval: 0, rotate: 30 },
                        data: [
                            '高层',
                            '企管中心',
                            '招商部',
                            '物流管理部',
                            '电子商务部',
                            '辅助产业部',
                            '财务部',
                            '行政部',
                            '物管部',
                            '搬运队',
                            '外场保洁'
                        ],
                        axisTick: {
                            alignWithLabel: true
                        }
                    }
                ],
                yAxis: [
                    {
                        type: 'value'
                    }
                ],
                series: [
                    {
                        name: '部门',
                        type: 'bar',
                        barWidth: '60%',
                        data: [3, 1, 5, 10, 2, 2, 2, 7, 1, 3, 3]
                    }
                ]
            }
        };
    },
    mounted () {
        this.getNewInformation();
    },
    computed: {
        ...mapState({
            user: state => state.user.user
        })
    },
    watch: {
        user: {
            handler (newValue, oldValue) {
                if (this.user) {
                    this.ModelVisible = true;
                }
            },
            deep: true
        }
    },
    methods: {
        getNewInformation () {
            this.$http.post('/api/getNewInformation').then(res => {
                let { success, msg, information } = res;
                if (success) {
                    this.information = information;
                } else {
                    this.$alert(msg);
                }
            });
        },
        closeModel () {
            this.ModelVisible = false;
        },
        doConfirm () {}
    }
};
</script>
<style lang='scss' scoped>
.companyInfoContain {
  display: flex;
  height: 450px;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  background-color: #f3f3f3;
}
.companyItem {
  display: flex;
  flex-direction: row;
  width: 350px;
  background-color: #fff;
  padding: 10px;
  margin: 20px;
}
.infoContain {
  display: flex;
  flex: 1;
  flex-direction: column;
  align-items: flex-end;
  justify-content: space-between;
  padding: 20px 30px;
}
.infoTitle {
  font-size: 28px;
}
.info {
  font-size: 18px;
}
.wordCloudContain {
  display: flex;
  flex: 1;
  align-items: center;
  justify-content: center;
  padding: 20px;
  background-color: #f3f3f3;
}
.class-info {
  width: 700px;
}
.class-title {
  font-weight: 900;
  font-size: 20px;
  margin-bottom: 40px;
  text-align: center;
}
.class-space {
  margin-left: 31px;
}
.class-desc {
  font-weight: 500;
  font-size: 16px;
  margin-bottom: 40px;
}
.class-author {
  font-weight: 500;
  font-size: 16px;
  margin-bottom: 5px;
  text-align: end;
  margin-right: 12px;
}
.class-createTime {
  font-weight: 500;
  font-size: 16px;
  text-align: end;
  margin-right: 12px;
}
</style>
