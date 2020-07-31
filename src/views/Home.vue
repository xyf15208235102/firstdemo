<template>
  <div class="main">
    <Header :text="text" @click.native="changeTitle" />
    <div class="content">
      <div id="imap"></div>
      <div id="echarts"></div>
    </div>
    <div @click="login()">{{userName}}</div>
    <div @click="changeNum(Math.random().toFixed(2))">{{num}}</div>
    <van-field v-model="value"  />
    <Footer />
  </div>
</template>
<script>
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { mapState, mapMutations, mapActions } from 'vuex'
import { getList } from '@/api/home'
import echarts from 'echarts'
const data = [['2000-06-05', 116], ['2000-06-06', 129], ['2000-06-07', 135], ['2000-06-08', 86], ['2000-06-09', 73], ['2000-06-10', 85], ['2000-06-11', 73], ['2000-06-12', 68], ['2000-06-13', 92], ['2000-06-14', 130], ['2000-06-15', 245], ['2000-06-16', 139], ['2000-06-17', 115], ['2000-06-18', 111], ['2000-06-19', 309], ['2000-06-20', 206], ['2000-06-21', 137], ['2000-06-22', 128], ['2000-06-23', 85], ['2000-06-24', 94], ['2000-06-25', 71], ['2000-06-26', 106], ['2000-06-27', 84], ['2000-06-28', 93], ['2000-06-29', 85], ['2000-06-30', 73], ['2000-07-01', 83], ['2000-07-02', 125], ['2000-07-03', 107], ['2000-07-04', 82], ['2000-07-05', 44], ['2000-07-06', 72], ['2000-07-07', 106], ['2000-07-08', 107], ['2000-07-09', 66], ['2000-07-10', 91], ['2000-07-11', 92], ['2000-07-12', 113], ['2000-07-13', 107], ['2000-07-14', 131], ['2000-07-15', 111], ['2000-07-16', 64], ['2000-07-17', 69], ['2000-07-18', 88], ['2000-07-19', 77], ['2000-07-20', 83], ['2000-07-21', 111], ['2000-07-22', 57], ['2000-07-23', 55], ['2000-07-24', 60]]

const dateList = data.map(function (item) {
  return item[0]
})
const valueList = data.map(function (item) {
  return item[1]
})
export default {
  name: '',
  components: { Header, Footer },
  data () {
    return {
      myChart: '',
      first: 'xu',
      second: 'yunfeng',
      value: '123'
    }
  },
  computed: {
    ...mapState({
      text: state => state.text,
      userName: state => {
        return state.app.userName
      },
      num: state => state.num
    }),
    full: {
      get () {
        console.log('调用了getter属性')
        return this.first + ' ' + this.second
      },
      set (val) {
        console.log('调用了setter属性')
        console.log(val)
        // this.full = val
      }
    }
  },
  watch: {
    userName (nextValue, preValue) {
      // console.log(nextValue, preValue)
      this.updateEcharts(nextValue)
    }
  },
  methods: {
    inputChange (e) {
      this.value = e
    },
    fullName () {
      this.first = Math.random().toFixed(2)
    },
    changeNum () {
      // this.$store.commit('inputChange', Math.random().toFixed(2))
    },
    ...mapMutations(['aaa', 'changeNum']),
    ...mapActions(['asyncaaa', 'login']),
    changeTitle () {
      // this.$store.commit('aaa', 'header')
      this.$store.dispatch('asyncaaa', 'async')
    },
    updateEcharts (name) {
      this.myChart.setOption({
        title: {
          left: 'center',
          text: name
        }
      })
    },
    getMogic (array) {
      for (let index = 0; index < array.length; index++) {
        const element = array[index]
        if (element === index) {
          return element
        }
      }
      return -1
    }
  },
  mounted () {
    // console.log(this.$store.state.app)
    const map = new AMap.Map('imap', {
      zoom: 11, // 级别
      center: [103.639998, 31.005274], // 中心点坐标
      viewMode: '3D'// 使用3D视图
    })

    // 基于准备好的dom，初始化echarts实例
    var myChart = echarts.init(document.getElementById('echarts'))
    this.myChart = myChart
    // 绘制图表
    myChart.setOption({

      // Make gradient line here
      visualMap: [{
        show: false,
        type: 'continuous',
        seriesIndex: 0,
        min: 0,
        max: 400
      }, {
        show: false,
        type: 'continuous',
        seriesIndex: 1,
        dimension: 0,
        min: 0,
        max: dateList.length - 1
      }],

      title: [{
        left: 'center',
        text: 'Gradient along the y axis'
      }, {
        top: '55%',
        left: 'center',
        text: 'Gradient along the x axis'
      }],
      tooltip: {
        trigger: 'axis'
      },
      xAxis: [{
        data: dateList
      }, {
        data: dateList,
        gridIndex: 1
      }],
      yAxis: [{
        splitLine: { show: false }
      }, {
        splitLine: { show: false },
        gridIndex: 1
      }],
      grid: [{
        bottom: '60%'
      }, {
        top: '60%'
      }],
      series: [{
        type: 'line',
        showSymbol: false,
        data: valueList
      }, {
        type: 'line',
        showSymbol: false,
        data: valueList,
        xAxisIndex: 1,
        yAxisIndex: 1
      }]
    })

    // this.$axios.get('aboutList', {}).then(res => {
    //   console.log(res)
    // })
    this.$axios({
      url: '/domian/list.json',
      methods: 'get',
      params: {}
    }).then(res => console.log(res))
    getList({ pageNum: 1, pageSize: 10, requestCode: 'CHN' }).then(res => {
      // console.log(res)
    })
  }
}
</script>
<style lang="less" scoped>
.main {
  width: 100%;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  // position: absolute;
  // top: 0px;
  .content {
    flex: 1;
    #imap {
      width: 100%;
      height: 160px;
    }
    #echarts {
      width: 100%;
      height: 300px;
    }
  }
}
.headText {
  font-size: 32px;
}
</style>
