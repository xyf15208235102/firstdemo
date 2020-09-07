/**
 *鼠标左键单击事件

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
  <div>
    <div id="cesium_wrapper" />
  </div>
</template>
<script>
import { getPosition } from '../utils/util'
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
  mounted () {
    console.log(this.Cesium)
    // eslint-disable-next-line no-undef
    const viewer = new Cesium.Viewer('cesium_wrapper')
    this.viewer = viewer
    // this.leftClick()
    this.rightClick()
    getPosition(this.viewer, 1, (position) => {
      console.log(position)
    })
    const redBox = viewer.entities.add({
      id: '001',
      name: 'Red box with black outline',
      position: Cesium.Cartesian3.fromDegrees(104.06591447589923, 30.630028033786726, -0.0020530597916422126),
      cylinder: {
        length: 400000.0,
        topRadius: 0.0,
        bottomRadius: 200000.0,
        material: Cesium.Color.RED
      }
    })

    viewer.zoomTo(viewer.entities)
  },
  beforeMount () {
    // 解除左键单击事件
    this.cHander.removeInputAction(Cesium.ScreenSpaceEventType.LEFT_CLICK)
    this.cHander.removeInputAction(Cesium.ScreenSpaceEventType.RIGHT_CLICK)
  },
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
      this.viewer.screenSpaceEventHandler.setInputAction(function (movement) {
        // 获取鼠标点的对应椭球面位置：世界坐标（Cartesian3）
        var position = viewer.scene.camera.pickEllipsoid(movement.position, viewer.scene.globe.ellipsoid)
        console.log('世界坐标', position)
        // 获取加载地形后对应的经纬度和高程：地标坐标
        var ray = viewer.camera.getPickRay(movement.position)
        var position = viewer.scene.globe.pick(ray, viewer.scene)
        console.log('地标坐标', position)
        // 获取倾斜摄影或模型点击处的坐标：场景坐标
        var position = viewer.scene.pickPosition(movement.position)
        console.log('场景坐标', position)
        // 获取点击处屏幕坐标 ：屏幕坐标
        console.log('屏幕坐标', movement.position)
      }, Cesium.ScreenSpaceEventType.RIGHT_CLICK)
    }
  }

}
</script>
<style scoped>
</style>
