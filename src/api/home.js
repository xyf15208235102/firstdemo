import { server } from './index'

export function getList (params) {
  return server({
    url: 'station/getStatusList',
    method: 'get',
    params
  })
}
