<template>
  <div>
    <el-table
      :show-summary="showSummary"
      ref="filterTable"
      style="width: 100%"
      :max-height="maxHeight"
      :border="border"
      :data="tableData"
      :stripe="stripe"
    >
      <el-table-column v-if="hasCheck" type="selection" width="55"></el-table-column>
      <el-table-column
        :fixed="data.fixed"
        :prop="data.prop"
        :label="data.label"
        :width="data.width"
        v-for="(data,index) in tableKey"
        :key="index"
      >
        <template slot-scope="scope">
          <slot v-if="!data.prop" :data="scope"></slot>
          <p class="itemText" v-else>{{scope.row[data.prop]}}</p>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
    props: [
        'showSummary',
        'maxHeight',
        'border',
        'stripe',
        'hasCheck',
        'tableKey',
        'tableData'
    ],
    methods: {
        resetDateFilter () {
            this.$refs.filterTable.clearFilter('date');
        },
        clearFilter () {
            this.$refs.filterTable.clearFilter();
        },
        filterHandler (value, row, column) {
            const property = column['property'];
            return row[property] === value;
        }
    }
};
</script>
<style lang='scss' scoped>
.itemText {
  font-size: 12px;
  color: #666;
}
.itemTextColor {
  font-size: 12px;
  color: #666;
  background-color: aquamarine;
}
</style>
