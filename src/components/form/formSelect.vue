<template>
  <el-form-item :label="label" :prop="value">
    <el-select class="select" v-model="input" :placeholder="place" @change="onChange">
      <el-option
        v-for="(option,index) in options"
        :key="index"
        :label="option.label"
        :value="option.value"
      ></el-option>
    </el-select>
  </el-form-item>
</template>

<script>
export default {
    props: ['form', 'label', 'value', 'options', 'placeholder'],
    watch: {
        input: {
            handler (newValue, oldValue) {
                this.input = newValue;
            }
        },
        form: {
            handler (newValue, oldValue) {
                this.input = newValue[this.value] || '';
            },
            deep: true
        }
    },
    data () {
        return {
            input: '',
            place: ''
        };
    },
    mounted () {
        this.input = this.form[this.value] || '';
        this.place = this.placeholder || '请选择' + this.label;
    },
    methods: {
        onChange (value) {
            this.input = value;
            this.$emit('onChange', value, this.value);
        },
        reset () {
            this.input = '';
        }
    }
};
</script>
<style lang='scss' scoped>
.select {
  width: 100%;
}
</style>
