<template>
  <div class="main">
    <Header :text="text" @click.native="changeTitle" />
    <div id="container" class="content"></div>
    <Footer />
  </div>
</template>
<script>
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { mapState, mapMutations, mapActions } from 'vuex'
import { getList } from '@/api/home'
export default {
  name: '',
  components: { Header, Footer },
  data () {
    return {

    }
  },
  computed: {
    ...mapState({
      text: state => state.text
    })
  },
  watch: {},
  methods: {
    ...mapMutations(['aaa']),
    ...mapActions(['asyncaaa']),
    changeTitle () {
      // this.$store.commit('aaa', 'header')
      this.$store.dispatch('asyncaaa', 'async')
    }
  },
  mounted () {
    const map = new AMap.Map('container', {
      zoom: 11, // 级别
      center: [116.397428, 39.90923], // 中心点坐标
      viewMode: '3D'// 使用3D视图
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
  #container {
    flex: 1;
  }
}
.headText {
  font-size: 32px;
}
</style>
