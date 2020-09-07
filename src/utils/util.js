// @ts-nocheck
/**
 * 获取cesium左键单击的坐标
 *
 * @param   {[type]}  viewer  cesium实例
 * @param   {[type]}  type    1:屏幕坐标  2:世界坐标  3:地理坐标  4:经纬度坐标
 *
 * @return  {[type]}          返回的坐标
 */
export const getPosition = (viewer, type, cb) => {
  // 得到当前三维场景
  const scene = viewer.scene
  // 得到当前三维场景的椭球体
  const ellipsoid = scene.globe.ellipsoid
  let longitude = ''
  let latitude = ''
  let height = ''
  let pick = '' // 屏幕坐标
  let cartesian = '' // 世界坐标,笛卡尔
  let cartographic = '' // 地理坐标
  // 定义当前场景的画布元素的事件处理
  const handler = new Cesium.ScreenSpaceEventHandler(scene.canvas)
  // 设置鼠标移动事件的处理函数，这里负责监听x,y坐标值变化
  handler.setInputAction(function (movement) {
    const box = viewer.scene.pick(movement.position)
    // console.log(box)
    // 屏幕坐标
    pick = movement.position
    // 通过指定的椭球或者地图对应的坐标系，将鼠标的二维坐标转换为对应椭球体三维坐标(世界坐标，笛卡尔)
    cartesian = viewer.camera.pickEllipsoid(pick, ellipsoid)
    if (cartesian) {
      // 将笛卡尔坐标转换为地理坐标(弧度)
      cartographic = ellipsoid.cartesianToCartographic(cartesian)
      // 将弧度转为度的十进制度表示
      longitude = Cesium.Math.toDegrees(cartographic.longitude)
      latitude = Cesium.Math.toDegrees(cartographic.latitude)
      // 获取相机高度
      height = Math.ceil(viewer.camera.positionCartographic.height)
      if (type === 1) {
        cb(pick)
      } else if (type === 2) {
        cb(cartesian)
      } else if (type === 3) {
        cb(cartographic)
      } else if (type === 4) {
        cb({
          longitude,
          latitude,
          height
        })
      }
    }
  }, Cesium.ScreenSpaceEventType.LEFT_CLICK)
}
