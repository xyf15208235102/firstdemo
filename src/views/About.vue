<template>
  <div>
    {{count}}
    <van-button @click="addCount(5)" type="default">默认按钮</van-button>
  </div>
</template>
<script>
import { mapState, mapMutations } from 'vuex'
export default {
  name: '',
  components: {},
  data () {
    return {}
  },
  computed: {
    ...mapState({
      count: state => state.count
    })
  },
  watch: {},
  methods: {
    ...mapMutations(['addCount'])
  }
}
</script>
<style scoped>
</style>
