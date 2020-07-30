// 引入mockjs
import { mock } from 'mockjs'
// const Mock = require('mockjs')
// const qs = require('qs')
// 获取 mock.Random 对象
// const Random = Mock.Random

mock('getList', {
  'data|1-10': [{
    'sid|+1': 1,
    date: '@date("yyyy-MM-dd")',
    name: '@csentence()',
    address: '@county(true)',
    region: '双流区'
  }]
})
