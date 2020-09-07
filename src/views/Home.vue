/* eslint-disable no-undef */
/**
 * 鼠标左键单击事件

Cesium.ScreenSpaceEventType.LEFT_CLICK

鼠标左键双击事件

Cesium.ScreenSpaceEventType.LEFT_DOUBLE_CLICK

鼠标左键按下事件

Cesium.ScreenSpaceEventType.LEFT_DOWN

鼠标左键抬起事件

Cesium.ScreenSpaceEventType.LEFT_UP

鼠标中键单击事​​件

Cesium.ScreenSpaceEventType.MIDDLE_CLICK

鼠标中键按下事件

Cesium.ScreenSpaceEventType.MIDDLE_DOWN

鼠标中键抬起事件

Cesium.ScreenSpaceEventType.MIDDLE_UP

鼠标移动事件

Cesium.ScreenSpaceEventType.MOUSE_MOVE

触摸表面上的双指事件的结束

Cesium.ScreenSpaceEventType.PINCH_END

触摸表面上双指移动事件

Cesium.ScreenSpaceEventType.PINCH_MOVE

触摸表面上双指事件的开始

Cesium.ScreenSpaceEventType.PINCH_START

鼠标右键单击事件

Cesium.ScreenSpaceEventType.RIGHT_CLICK

鼠标右键按下事件

Cesium.ScreenSpaceEventType.RIGHT_DOWN

鼠标滚轮事件

Cesium.ScreenSpaceEventType.WHEEL
 */
<template>
  <div id="cesium_wrapper">
  </div>
</template>
<script>
export default {
  name: '',
  components: {},
  data () {
    return {
      viewer: ''// cesium实例
    }
  },
  computed: {
    cHander () {
      return new Cesium.ScreenSpaceEventHandler(this.viewer.canvas)
    }
  },
  watch: {},
  methods: {
    leftClick () {
      // todo：在椭球下点击创建点
      const viewer = this.viewer
      this.viewer.screenSpaceEventHandler.setInputAction(function (event) {
        // 屏幕坐标转世界坐标——关键点
        var ray = viewer.camera.getPickRay(event.position)
        var cartesian = viewer.scene.globe.pick(ray, viewer.scene)
        // 将笛卡尔坐标转换为地理坐标
        var cartographic = Cesium.Cartographic.fromCartesian(cartesian)
        // 将弧度转为度的十进制度表示
        var lon = Cesium.Math.toDegrees(cartographic.longitude)
        var lat = Cesium.Math.toDegrees(cartographic.latitude)
        // 获取海拔高度
        var height1 = viewer.scene.globe.getHeight(cartographic)
        var height2 = cartographic.height
        console.log(lon, lat, height2)
      }, Cesium.ScreenSpaceEventType.LEFT_CLICK)
    },
    rightClick () {
      // todo：在椭球下点击创建点
      const viewer = this.viewer
      this.viewer.screenSpaceEventHandler.setInputAction(function (clickEvent) {
        var ray1 = viewer.camera.getPickRay(clickEvent.position)
        var cartesian = viewer.scene.globe.pick(ray1, viewer.scene)
        console.log('地形高度点', cartesian)
        var pick = viewer.scene.pickPosition(clickEvent.position)
        var pickModel = viewer.scene.pick(clickEvent.position)
        if (pickModel && pick && !pickModel.id) {
          var height = Cesium.Cartographic.fromCartesian(pick).height
          var lat = Cesium.Math.toDegrees(Cesium.Cartographic.fromCartesian(pick).latitude)
          var lng = Cesium.Math.toDegrees(Cesium.Cartographic.fromCartesian(pick).longitude)
          cartesian = Cesium.Cartesian3.fromDegrees(lng, lat, height)
          console.log('模型高度点', cartesian)
        }
      }, Cesium.ScreenSpaceEventType.RIGHT_CLICK)
    }
  },
  mounted () {
    // eslint-disable-next-line no-undef
    const viewer = new Cesium.Viewer('cesium_wrapper')
    this.viewer = viewer
    this.leftClick()
    this.rightClick()
  },
  beforeMount () {
    // 解除左键单击事件
    this.cHander.removeInputAction(Cesium.ScreenSpaceEventType.LEFT_CLICK)
    this.cHander.removeInputAction(Cesium.ScreenSpaceEventType.RIGHT_CLICK)
  }

}
</script>
<style scoped>
</style>
