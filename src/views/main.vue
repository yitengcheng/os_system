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
  </div>
</template>

<script>
import WordCloud from '../components/WordCloud';
export default {
    components: { WordCloud },
    data () {
        return {
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
    computed: {},
    methods: {}
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
</style>
