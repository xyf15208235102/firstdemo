import { mock } from 'mockjs'

mock('/domian/list.json', {
  code: 0,
  msg: 'success',
  'data|8-15': [{
    'sid|+1': 1,
    date: '@date("yyyy-MM-dd")',
    name: '@csentence()',
    address: '@county(true)',
    region: '双流区'
  }]
})
